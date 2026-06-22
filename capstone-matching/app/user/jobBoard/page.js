import { createClient } from '@/utils/supabase/server'
import StudentJobBoardClient from './StudentJobBoardClient'

export default async function Home() {
  const supabase = await createClient()

  const { data: job_postings, error: jobsError } = await supabase
    .from('job_posts')
    .select(`
      *,
      companies!job_posts_company_id_fkey (
        company_name
      ),
      applications (
        status
      )
    `)

  if (jobsError) {
    console.error('Error fetching job postings:', jobsError)
    return (
      <p className="profile-form-error-text">
        Could not load job postings: {jobsError.message}
      </p>
    )
  }

  return <StudentJobBoardClient initialJobs={job_postings || []} />
}