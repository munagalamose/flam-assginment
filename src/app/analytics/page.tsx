'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function AnalyticsPage() {
  const { employees } = useStore()
  const [departmentData, setDepartmentData] = useState<{
    labels: string[]
    data: number[]
  }>({ labels: [], data: [] })
  const [performanceData, setPerformanceData] = useState<{
    labels: string[]
    data: number[]
  }>({ labels: [], data: [] })

  useEffect(() => {
    // Calculate department distribution
    const deptCount = new Map<string, number>()
    employees.forEach((emp) => {
      deptCount.set(emp.department, (deptCount.get(emp.department) || 0) + 1)
    })

    // Calculate performance rating distribution
    const perfCount = new Map<number, number>()
    employees.forEach((emp) => {
      perfCount.set(emp.performanceRating, (perfCount.get(emp.performanceRating) || 0) + 1)
    })

    setDepartmentData({
      labels: Array.from(deptCount.keys()),
      data: Array.from(deptCount.values()),
    })

    setPerformanceData({
      labels: Array.from(perfCount.keys()).map(String),
      data: Array.from(perfCount.values()),
    })
  }, [employees])

  const departmentChartData = {
    labels: departmentData.labels,
    datasets: [
      {
        label: 'Employees by Department',
        data: departmentData.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const performanceChartData = {
    labels: performanceData.labels,
    datasets: [
      {
        label: 'Performance Rating Distribution',
        data: performanceData.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Employee performance and department analytics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Department Distribution
          </h2>
          <div className="h-[400px] relative">
            <Bar
              data={departmentChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Performance Rating Distribution
          </h2>
          <div className="h-[400px] relative">
            <Pie
              data={performanceChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Employees
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {employees.length}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Average Performance
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(employees.reduce((acc, emp) => acc + emp.performanceRating, 0) / employees.length || 0).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Departments
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(employees.map(emp => emp.department)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 