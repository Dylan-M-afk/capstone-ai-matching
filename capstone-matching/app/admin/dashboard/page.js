import { createClient } from '@/utils/supabase/server'
import DashboardCards from './DashboardCards'
import Link from 'next/link'

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

      <div className="sd-container">
        <p className="page-header">Company Dashboard</p>
        <div className="sd-content-container drop-shadow-2xl">
          <p className="sd-body-text">
            Welcome to the Admin Dashboard. From here you can view all and manage all existing students and companies.
              Check the Create Company page to create company accounts for new clients.
          </p>

          <div className='sd-btn-row'>
            <Link href="/admin/user-list">
              <button className="button">
                User Management
              </button>
            </Link>
            <Link href="/admin/company-list">
              <button className="button">
                Create Management
              </button>
            </Link>
            <Link href="/admin/account-management">
              <button className="button">
                Company Creation
              </button>
            </Link>
          </div>

        </div>

      </div>
      <p className="page-header-stats"> System Stats</p>
      <DashboardCards stats={stats} />
    </div>
  )
}