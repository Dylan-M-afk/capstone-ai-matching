'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserList() {
  const [users, setUsers] = useState([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchUsers() {
      const { data:profile, error } = await supabase
        .from('student_profiles')
        .select('*')

      if (error) {
        console.log(error)
        return
      }
      
      setUsers(profile || [])
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
              <td>{user.student_id}</td>
              <td>{user.name}</td>
              <td>{user.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}