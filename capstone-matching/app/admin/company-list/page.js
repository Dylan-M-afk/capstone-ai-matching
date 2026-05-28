'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

export default function CompanyList() {
  const [companies, setCompanies] = useState([])


  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase
        .from('users')
        .select("*")
        .eq('role', 'company')

      if (error) {
        console.log(error)
        return
      }
      setCompanies(data || [])
    }

    fetchCompanies()
  }, [])

  async function deactivateUser(userId) {
    const { error } = await supabase
      .from('users')
      .update({ status: 'Inactive' })
      .eq('id', userId)

    console.log("test")
    if (error) {
      console.log(error)
      return
    }

    // update UI instantly
    setCompanies(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'inactive' }
          : user
      )
    )
  }

 return (
    <div className='table-container'>
      <table border="1" cellPadding="10" className='system-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(user => (
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