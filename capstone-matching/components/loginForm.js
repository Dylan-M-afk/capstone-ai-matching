'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.get('email'),
        password: formData.get('password'),
      })

      if (signInError) {
        console.error('Sign-in error:', signInError)
        setError('Invalid Email or Password')
        setSubmitting(false)
        return
      }

      if (!data?.user?.id) {
        console.error('Sign-in succeeded but no user was returned:', data)
        setError('Something went wrong signing in. Please try again.')
        setSubmitting(false)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        console.error('Failed to fetch role:', profileError)
      }

      const roleRedirects = {
        admin: '/admin/dashboard',
        company: '/company/dashboard',
        student: '/user/dashboard',
      }

      const destination = roleRedirects[profile?.role] ?? '/user/dashboard'

      router.push(destination)
    } catch (err) {
      console.error('Unexpected error during sign-in:', err)
      setError('Unexpected error signing in. Please try again.')
      setSubmitting(false)
    }
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
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  )
}