'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserList() {
  const [users, setUsers] = useState([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchUsers() {
      let { data: users, error } = await supabase
        .from('users')
        .select('uuid, role, status, created_at')

      if (error) {
        console.log(error)
        return
      }
      console.log(users)
      setUsers(users || [])
    }

    fetchUsers()
  }, [])

  async function deactivateUser(userUuid) {
    const { error } = await supabase
      .from('users')
      .update({ status: 'inactive' })
      .eq('uuid', userUuid)

    if (error) {
      console.log(error)
      return
    }

    // update UI instantly
    setUsers(prev =>
      prev.map(user =>
        user.uuid === userUuid
          ? { ...user, status: 'inactive' }
          : user
      )
    )
  }

  return (
    <div>
      <h2>System Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.uuid}>
              <td>{user.uuid}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => deactivateUser(user.uuid)}>
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