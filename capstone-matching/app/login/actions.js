'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (error){
    console.log(error)
    redirect('/error')
  } 
  redirect('/login')
}