'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserList() {
  const [users, setUsers] = useState([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('public.users')
        .select('*')

      if (error) {
        console.log(error)
        return
      }
      console.log(data)
      setUsers(data || [])
    }

    fetchUsers()
  }, [])

  // async function deactivateUser(userId) {
  //   const { error } = await supabase
  //     .from('users')
  //     .update({ status: 'inactive' })
  //     .eq('id', userId)

  //   if (error) {
  //     console.log(error)
  //     return
  //   }

  //   // update UI after change
  //   setUsers(prev =>
  //     prev.map(user =>
  //       user.id === userId
  //         ? { ...user, status: 'inactive' }
  //         : user
  //     )
  //   )
  // }

  return (
    <div>
      <h2>System Users</h2>

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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}