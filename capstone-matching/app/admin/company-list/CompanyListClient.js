'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyListClient({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies)
  const [updatingId, setUpdatingId] = useState(null)
  const router = useRouter()

  async function toggleUserStatus(user) {
    setUpdatingId(user.id)

    const newStatus =
      user.status === 'Active' ? 'Inactive' : 'Active'

    try {
      const res = await fetch('/api/users/toggle-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          status: newStatus
        })
      })

      const result = await res.json()

      if (!res.ok) {
        console.error(result.error)
        return
      }

      // optimistic UI update
      setCompanies(prev =>
        prev.map(company =>
          company.id === user.id
            ? { ...company, status: newStatus }
            : company
        )
      )
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="table-container">
      <p className="page-header">Company Managament</p>
      <div className="table-actions">
        <button
          className="button"
          onClick={() => router.push('/admin/account-management')}
        >
          Create New Company
        </button>
      </div>

      <table border="1" cellPadding="10" className="system-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>{company.company_name}</td>
              <td>{company.contact_person}</td>
              <td>{company.status}</td>

              <td>
                <button
                  className="button"
                  disabled={updatingId === company.id}
                  onClick={() => toggleUserStatus(company)}
                >
                  {updatingId === company.id
                    ? 'Saving...'
                    : company.status === 'Active'
                      ? 'Deactivate'
                      : 'Activate'}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}