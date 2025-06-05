import Image from 'next/image'
import Link from 'next/link'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid'
import { Rating } from './Rating'
import { Employee } from '@/store/useStore'

interface EmployeeCardProps {
  employee: Employee
  isBookmarked: boolean
  onToggleBookmark: (id: number) => void
}

export const EmployeeCard = ({
  employee,
  isBookmarked,
  onToggleBookmark,
}: EmployeeCardProps) => {
  const { id, firstName, lastName, email, department, performanceRating, image } = employee

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Image
            src={image}
            alt={`${firstName} ${lastName}`}
            width={64}
            height={64}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-x-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {firstName} {lastName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{email}</p>
              </div>
              <button
                onClick={() => onToggleBookmark(id)}
                className="flex-none"
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {isBookmarked ? (
                  <BookmarkSolid className="h-6 w-6 text-primary-500" />
                ) : (
                  <BookmarkIcon className="h-6 w-6 text-gray-400 hover:text-primary-500 transition-colors" />
                )}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/20 px-2.5 py-0.5 text-sm font-medium text-primary-700 dark:text-primary-300">
                {department}
              </span>
              <div className="flex items-center gap-1.5">
                <Rating rating={performanceRating} size="sm" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Performance
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Age: </span>
              <span className="text-gray-900 dark:text-white">{employee.age}</span>
            </div>
          </div>
          <Link
            href={`/employee/${id}`}
            className="inline-flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
} 