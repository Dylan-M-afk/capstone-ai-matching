// proxy.js
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(request) {
  // console.log('cookies:', request.cookies.getAll())
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // console.log("Info: ")
  // console.log(user)
  // console.log(path)

  // Redirect unauthenticated users to login
  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role
    const path = request.nextUrl.pathname

    const allowedPaths = {
      admin: '/admin',
      company: '/company',
      user: '/user',
    }

    const allowedPrefix = allowedPaths[role]

    // If the path doesn't start with the user's allowed prefix, redirect
    if (allowedPrefix && !path.startsWith(allowedPrefix)) {
      return NextResponse.redirect(new URL(`${allowedPrefix}/dashboard`, request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/company/:path*',
    '/user/:path*',
    '/login',
  ],
}