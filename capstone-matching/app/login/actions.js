'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// Logic for handling signIn
export async function signIn(formData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (error) redirect('/error')

  redirect('/dashboard')
}

// Logic for handling signUp
export async function signUp(formData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  })

  if (error) {
    console.log(error)
    redirect('/error')
  } 

  redirect('/check-your-email') // since confirmation email is sent
}