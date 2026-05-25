'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('');

  async function handleSignIn(e) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (error) {
      console.log(error)
      setError('Invalid Email or Password')
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
        {error && <p className="login-form-error-text ">{error}</p>}
      </div>
      
      <div className="flex items-center">
        <button className="button" type="submit">
          Log In
        </button>
      </div>

    </form>
  )
}