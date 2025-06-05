import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useStore } from '@/store/useStore'

const departments = [
  'All Departments',
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Product',
  'Design',
  'Operations'
]

const ratings = [1, 2, 3, 4, 5]

export const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings
  } = useStore()

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedDepartments[0] || 'All Departments'}
          onChange={(e) => {
            const value = e.target.value
            setSelectedDepartments(value === 'All Departments' ? [] : [value])
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">Filter by rating:</span>
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => {
              setSelectedRatings(
                selectedRatings.includes(rating)
                  ? selectedRatings.filter((r) => r !== rating)
                  : [...selectedRatings, rating]
              )
            }}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedRatings.includes(rating)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {rating}★
          </button>
        ))}
      </div>
    </div>
  )
} 