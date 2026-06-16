'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentListClient({ initialStudents }) {
  const [students, setstudents] = useState(initialStudents)
  const [updatingId, setUpdatingId] = useState(null)
  const router = useRouter()

  async function toggleUserStatus(user) {
    setUpdatingId(user.student_id)
    const newStatus =
      user.users.status === 'Active' ? 'Inactive' : 'Active'

    try {
      const res = await fetch('/api/users/toggle-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.student_id,
          status: newStatus
        })
      })

      const result = await res.json()

      if (!res.ok) {
        console.error(result.error)
        return
      }

      // optimistic UI update
    setstudents(prev =>
      prev.map(student =>
        student.student_id === user.student_id
          ? {
              ...student,
              users: {
                ...student.users,
                status: newStatus,
              },
            }
          : student
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
      <table border="1" cellPadding="10" className="system-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.users.status}</td>

              <td>
                <button
                  className="button"
                  disabled={updatingId === student.id}
                  onClick={() => toggleUserStatus(student)}
                >
                  {updatingId === student.id
                    ? 'Saving...'
                    : student.users.status === 'Active'
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