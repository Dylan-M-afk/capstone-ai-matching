'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()

  async function handleSignIn(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (error) {
      console.log(error)
      return
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single()

    console.log('profile:', profile)
    console.log('error:', error)

    const roleRedirects = {
      admin: '/admin/dashboard',
      company: '/company/dashboard',
      student: '/user/dashboard',
    }

    router.push(roleRedirects[profile?.role] ?? '/user/dashboard')
  }

  return (
    <form onSubmit={handleSignIn} className="rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="login-form-label">
          Email:
        </label>
        <input className="login-form-field" id="email" type="text" name="email" placeholder="example@exmail.com" />
      </div>
      <div className="mb-6">
        <label className="login-form-label">
          Password:
        </label>
        <input className="login-form-field" id="password" name="password" type="password" placeholder="******************" />
      </div>
      <div className="flex items-center">
        <button className="button" type="submit">
          Log In
        </button>
      </div>
    </form>
  )
}