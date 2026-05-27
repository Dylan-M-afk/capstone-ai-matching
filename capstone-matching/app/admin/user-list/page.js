'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserList() {
  const [users, setUsers] = useState([])

  const supabase = createClient()

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
      console.log(users)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Student Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.student_id}>
              <td key={user.student_id}>{user.id}</td>
              <td key={user.student_id}>{user.role}</td>
              {/* <td key={user.student_id}>{user.program}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}