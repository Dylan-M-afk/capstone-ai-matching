'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function CompanyList() {
  const [companies, setCompanies] = useState([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase
        .from('companies')
        .select('company_id, company_name, contact_person, access_code, status')

      if (error) {
        console.log(error)
        return
      }
      console.log(data)
      setCompanies(data || [])
    }

    fetchCompanies()
  }, [])

  return (
    <div>
      <h2>System Company Register</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Business Name</th>
            <th>Primary Contact</th>
            <th>Access Code</th>
            <th>System Status</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(company => (
            <tr key={company.company_id}>
              <td>{company.company_id}</td>
              <td>{company.company_name}</td>
              <td>{company.contact_person}</td>
              <td>{company.access_code}</td>
              <td>{company.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}