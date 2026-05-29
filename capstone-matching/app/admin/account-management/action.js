'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

export async function createCompany({
  companyName,
  contactPerson,
  email,
  accessCode
}) {

  // utils/supabase/admin.js


  

  if (!companyName || !contactPerson || !email || !accessCode) {
    return { error: 'Missing fields' }
  }

  // Generate temporary password
  const password = Math.random().toString(36).slice(-12)

  // Create auth user
  const { data: newUser, error: userError } =
    await supabase.auth.admin.createUser({
      email: email,
      password: accessCode,
      email_confirm: true,
      user_metadata: {
        role: 'company'
      }
    })

  if (userError) {
    console.error(userError)
    return { error: userError.message }
  }

  // Update company record
  const { data, error } = await supabase
    .from('companies')
    .update({
      company_name: companyName,
      contact_person: contactPerson,
      access_code: accessCode,
    })
    .eq('company_id', newUser.user.id)
    .select()

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return {
    success: true,
    data,
    temporaryPassword: password
  }
}