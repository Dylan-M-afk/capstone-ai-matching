'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="login-register-container">
      <div className="login-register-btn-row">

        <Link href="user-list">
          <button className="button">
            User List
          </button>
        </Link>

        <Link href="company-list">
          <button className="button">
            Company List
          </button>
        </Link>

        <Link href="account-management">
          <button className="button">
            Account Management
          </button>
        </Link>

      </div>
    </div>
  );
}
