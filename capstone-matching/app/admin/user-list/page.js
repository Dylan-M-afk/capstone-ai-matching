'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

export default function UserList() {
  const [users, setUsers] = useState([])


  useEffect(() => {
    async function fetchUsers() {
      const { data: users, error } = await supabase
        .from('users')
        .select("*")

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      setUsers(users || [])
    }

    fetchUsers()
  }, [])

    async function deactivateUser(userId) {
    const { error } = await supabase
      .from('users')
      .update({ status: 'inactive' })
      .eq('id', userId)

    if (error) {
      console.log(error)
      return
    }

    // update UI instantly
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'inactive' }
          : user
      )
    )
  }

  return (
    <div className='table-container'>
      <h2>Student Users</h2>

      <table border="1" cellPadding="10" className='system-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              {/* <td key={user.student_id}>{user.program}</td> */}
                <td>
                <button className='button' onClick={() => deactivateUser(user.id)}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}