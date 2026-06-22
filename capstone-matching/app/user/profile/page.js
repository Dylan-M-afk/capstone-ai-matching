import { createClient } from '@/utils/supabase/server'
import StudentProfileClient from './StudentProfileClient'

export default async function Home() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('Error fetching user:', authError)
    return <p className="profile-form-error-text">Please log in to view your profile.</p>
  }

  // Get student profile associated with auth account
  const { data: profile, error: profileError } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('student_id', user.id)
    .single()

  if (profileError) {
    console.error('Error fetching profile:', profileError)
    return (
      <p className="profile-form-error-text">
        Could not load profile: {profileError.message}
      </p>
    )
  }

  return <StudentProfileClient initialData={profile || {}} />
}