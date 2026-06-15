// page.js

import CompanyListClient from './CompanyListClient'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies')
    .select('*')

  if (error) {
    console.log(error)
  }
console.log(data)
  return (
    <CompanyListClient
      initialCompanies={data || []}
    />
  )
}