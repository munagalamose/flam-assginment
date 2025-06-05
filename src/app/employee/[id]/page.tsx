'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { Rating } from '@/components/Rating'
import { generateMockPerformanceHistory, generateMockProjects, generateMockFeedback } from '@/lib/api'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface EmployeeDetailsProps {
  params: {
    id: string
  }
}

export default function EmployeeDetails({ params }: EmployeeDetailsProps) {
  const { employees } = useStore()
  const employeeId = parseInt(params.id)
  const employee = employees.find((emp) => emp.id === employeeId)

  const [performanceHistory, setPerformanceHistory] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [feedback, setFeedback] = useState<any[]>([])

  useEffect(() => {
    if (employee) {
      setPerformanceHistory(generateMockPerformanceHistory(employeeId))
      setProjects(generateMockProjects())
      setFeedback(generateMockFeedback())
    }
  }, [employee, employeeId])

  if (!employee) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Employee not found
          </h1>
          <Link
            href="/"
            className="inline-flex items-center text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <Image
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                width={120}
                height={120}
                className="rounded-full mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{employee.email}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{employee.department}</p>
              <div className="mt-4">
                <Rating rating={employee.performanceRating} size="lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Performance History
            </h2>
            <div className="space-y-4">
              {performanceHistory.map((history, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      {history.year}
                    </span>
                    <Rating rating={history.rating} size="sm" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    {history.review}
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {history.achievements.map((achievement: string, i: number) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Current Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Role: {project.role}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {project.completion}% Complete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Feedback
            </h2>
            <div className="space-y-4">
              {feedback.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {item.reviewer}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    {item.comment}
                  </p>
                  <Rating rating={item.rating} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 