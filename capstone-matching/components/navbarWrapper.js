'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import NavBar from './navbar'

export default function NavbarWrapper({ initialRole }) {
  const [role, setRole] = useState(initialRole)

  useEffect(() => {
    const supabase = createClient()

    // Fetch role for a given user id
    const fetchRole = async (userId) => {
      if (!userId) {
        setRole(null)
        return
      }
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()
      setRole(profile?.role ?? null)
    }

    // Subscribe to auth changes (sign-in, sign-out, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await fetchRole(session?.user?.id ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return <NavBar role={role} />
}