'use client'

import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { EmployeeCard } from '@/components/EmployeeCard'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function BookmarksPage() {
  const { employees, bookmarkedEmployees, isBookmarked, toggleBookmark } = useStore()
  const bookmarkedEmployeesList = employees.filter((emp) => bookmarkedEmployees.includes(emp.id))

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bookmarked Employees
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your saved employee profiles
        </p>
      </div>

      {bookmarkedEmployeesList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You haven't bookmarked any employees yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse Employees
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEmployeesList.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              isBookmarked={isBookmarked(employee.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </main>
  )
} 