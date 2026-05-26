'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/server';

export default function userList() {
    const router = useRouter()
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
        const supabase = createClient()
        //TODO update Query to reflect required information: need Db normalization
        const { data, error } = await supabase
            .from('users')
            .select('*')
            setUsers(data)
        }
        fetchUsers()
    },[])

    async function deactivateUser(userId) {
        const supabase = createClient()
        const {} = await supabase
        .from('users')
        // make sure this is the purpose of the "status" col
        .update({ status: 'inactive' })
        .eq('id', userId)
    }

 

return (
  <div>
    <h2>System Users</h2>

    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
            <td>
              <button onClick={() => deactivateUser(user.id)}>
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

