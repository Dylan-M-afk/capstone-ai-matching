'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="sd-container">
      <p className="page-header">Company Dashboard</p>
      <div className="sd-content-container drop-shadow-2xl">
        <p className="sd-body-text">
          Welcome to the Company Dashboard. From here you can access the Current Posting page to view 
          applicants to existing job postings. Check the Create Posting page to create new job postings for student applicants.
        </p>

        <div className='sd-btn-row'>
          <Link href="postings">
            <button className="button">
              Current Postings
            </button>
          </Link>
          <Link href="create-posting">
            <button className="button">
              Create Posting
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

