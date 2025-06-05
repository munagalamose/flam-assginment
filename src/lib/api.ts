import { Employee } from '@/store/useStore'

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Product',
  'Design',
  'Operations'
]

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch('https://dummyjson.com/users?limit=20')
  const data = await response.json()

  return data.users.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    department: departments[Math.floor(Math.random() * departments.length)],
    performanceRating: Math.floor(Math.random() * 5) + 1,
    image: user.image
  }))
}

export const generateMockPerformanceHistory = (employeeId: number) => {
  const history = []
  const currentYear = new Date().getFullYear()
  
  for (let i = 0; i < 5; i++) {
    history.push({
      year: currentYear - i,
      rating: Math.floor(Math.random() * 5) + 1,
      review: `Annual performance review for ${currentYear - i}`,
      achievements: [
        'Exceeded quarterly targets',
        'Led successful project completion',
        'Improved team productivity'
      ].slice(0, Math.floor(Math.random() * 3) + 1)
    })
  }
  
  return history
}

export const generateMockProjects = () => {
  const projects = [
    'Website Redesign',
    'Mobile App Development',
    'Data Migration',
    'Cloud Infrastructure',
    'Marketing Campaign',
    'Customer Portal',
    'Internal Tools',
    'Security Audit'
  ]
  
  return Array(Math.floor(Math.random() * 4) + 2)
    .fill(null)
    .map(() => ({
      name: projects[Math.floor(Math.random() * projects.length)],
      status: ['In Progress', 'Completed', 'On Hold'][Math.floor(Math.random() * 3)],
      role: ['Lead', 'Member', 'Contributor'][Math.floor(Math.random() * 3)],
      completion: Math.floor(Math.random() * 100)
    }))
}

export const generateMockFeedback = () => {
  const feedback = [
    'Excellent team player with strong communication skills',
    'Consistently delivers high-quality work',
    'Takes initiative and shows leadership potential',
    'Great problem-solving abilities',
    'Needs improvement in time management',
    'Strong technical skills and quick learner',
    'Positive attitude and helpful to colleagues',
    'Could improve documentation practices'
  ]
  
  return Array(Math.floor(Math.random() * 3) + 2)
    .fill(null)
    .map(() => ({
      date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      comment: feedback[Math.floor(Math.random() * feedback.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      reviewer: ['Manager', 'Peer', 'Client'][Math.floor(Math.random() * 3)]
    }))
} 