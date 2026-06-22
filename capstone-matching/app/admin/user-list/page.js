// page.js

import StudentListClient from './StudentListClient'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('student_profiles')
    .select(`*, users(status)`)

  if (error) {
    console.log(error)
  }
console.log(data)
  return (
    <StudentListClient
      initialStudents={data || []}
    />
  )
}