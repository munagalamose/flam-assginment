import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  performanceRating: number
  image: string
}

interface EmployeeStore {
  employees: Employee[]
  bookmarkedEmployees: number[]
  setEmployees: (employees: Employee[]) => void
  toggleBookmark: (employeeId: number) => void
  isBookmarked: (employeeId: number) => boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedDepartments: string[]
  setSelectedDepartments: (departments: string[]) => void
  selectedRatings: number[]
  setSelectedRatings: (ratings: number[]) => void
}

export const useStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      bookmarkedEmployees: [],
      setEmployees: (employees) => set({ employees }),
      toggleBookmark: (employeeId) =>
        set((state) => {
          const newBookmarks = state.bookmarkedEmployees.includes(employeeId)
            ? state.bookmarkedEmployees.filter(id => id !== employeeId)
            : [...state.bookmarkedEmployees, employeeId]
          return { bookmarkedEmployees: newBookmarks }
        }),
      isBookmarked: (employeeId) => get().bookmarkedEmployees.includes(employeeId),
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),
      selectedDepartments: [],
      setSelectedDepartments: (departments) => set({ selectedDepartments: departments }),
      selectedRatings: [],
      setSelectedRatings: (ratings) => set({ selectedRatings: ratings }),
    }),
    {
      name: 'employee-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
) 