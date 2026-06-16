import { createClient } from '@/utils/supabase/server'
import DashboardCards from './DashboardCards'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    studentsResult,
    companiesResult,
    applicationsResult,
    jobsResult,
  ] = await Promise.all([
    supabase
      .from('student_profiles')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('companies')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('applications')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('job_posts')
      .select('*', { count: 'exact', head: true }),
  ])

  const stats = {
    students: studentsResult.count ?? 0,
    companies: companiesResult.count ?? 0,
    applications: applicationsResult.count ?? 0,
    jobs: jobsResult.count ?? 0,
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <DashboardCards stats={stats} />
    </div>
  )
}