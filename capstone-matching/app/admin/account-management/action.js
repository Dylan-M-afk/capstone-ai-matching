'use server'

import { createClient } from '@/utils/supabase/server'

export async function createCompany({ companyName, contactPerson, accessCode }) {
  const supabase = await createClient()
  if (!companyName || !contactPerson || !accessCode) {
    return { error: 'Missing fields' }
  }

  const { data, error } = await supabase
    .from('companies')
    .insert([
      {
        company_name: companyName,
        contact_person: contactPerson,
        access_code: accessCode
      }
    ])
    .select()

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { success: true, data }
}