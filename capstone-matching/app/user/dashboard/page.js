import Link from 'next/link'

export default function Home() {
  return (
    <div className="sd-container">
      <p className="page-header">Student Dashboard</p>
      <div className="sd-content-container drop-shadow-2xl">
        <p className="sd-body-text">
          Welcome to the Student Dashboard. From here you can access the profile page to import your resume 
            and update your profile. Check the job board to view and apply for available postings.
        </p>

        <div className='sd-btn-row'>
          <Link href="/user/profile">
            <button className="button">Student Profile</button>  
          </Link>
          <Link href="/user/jobBoard">
            <button className="button">Job Board</button>  
          </Link>
        </div>

      </div>

    </div>
  );
}
