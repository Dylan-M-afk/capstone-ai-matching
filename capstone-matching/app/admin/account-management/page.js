'use client'

import { useState } from 'react'
import { createCompany } from './action'

export default function CompanyPage() {

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function generateCode() {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setAccessCode(code)
    return code
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await createCompany({
        companyName,
        contactPerson,
        accessCode: accessCode || generateCode()
      })

      if (result?.error) throw new Error(result.error)

      setCompanyName('')
      setContactPerson('')
      setAccessCode('')

      alert('Company created!')

    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="flex justify-center mt-10">

      <div className="w-[70%] bg-capstone-blue border-[3px] border-black rounded p-8">

        <p className="text-4xl font-bold border-b-[10px] border-black inline-block mb-8">
          Create Company
        </p>

        <form onSubmit={handleSubmit}>

          <div className="flex justify-between gap-10 flex-wrap">

            {/* LEFT SIDE */}
            <div className="flex-1 min-w-[300px]">

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Company Name:
                </label>

                <input
                  className="w-full bg-white border-2 border-black rounded px-3 py-2"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Contact Person:
                </label>

                <input
                  className="w-full bg-white border-2 border-black rounded px-3 py-2"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 min-w-[300px]">

              <div className="mb-6">
                <label className="block text-lg font-bold mb-2">
                  Access Code:
                </label>

                <div className="flex gap-3">

                  <input
                    className="flex-1 bg-gray-100 border-2 border-black rounded px-3 py-2"
                    value={accessCode}
                    readOnly
                  />

                  <button
                    type="button"
                    onClick={generateCode}
                    className="bg-capstone-green hover:bg-capstone-green-strong border-2 border-black rounded px-4 py-2 font-bold"
                  >
                    Generate
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="flex flex-col items-center mt-6">

            {error && (
              <div className="mb-4">
                <p className="text-red-600 font-bold text-lg">
                  {error}
                </p>
              </div>
            )}

            <button
              className="bg-capstone-green hover:bg-capstone-green-strong border-2 border-black rounded px-6 py-3 font-bold text-lg disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Company'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}