'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="login-register-container">
      <div className="login-register-btn-row">

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
  );
}
