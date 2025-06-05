'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { fetchEmployees } from '@/lib/api'
import { SearchBar } from '@/components/SearchBar'
import { EmployeeCard } from '@/components/EmployeeCard'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const {
    employees,
    setEmployees,
    searchTerm,
    selectedDepartments,
    selectedRatings,
    isBookmarked,
    toggleBookmark
  } = useStore()

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees()
      setEmployees(data)
    }
    loadEmployees()
  }, [setEmployees])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      searchTerm === '' ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(employee.department)

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.includes(employee.performanceRating)

    return matchesSearch && matchesDepartment && matchesRating
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Directory
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and track employee performance across departments
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => useStore.getState().setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => document.getElementById('filters')?.focus()}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          <SearchBar />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No employees found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                isBookmarked={isBookmarked(employee.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
} 