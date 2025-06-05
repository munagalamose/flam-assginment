import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface RatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export const Rating = ({ rating, size = 'md' }: RatingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const iconClass = sizeClasses[size]

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? (
            <StarSolid className={`${iconClass} text-yellow-400`} />
          ) : (
            <StarOutline className={`${iconClass} text-gray-300 dark:text-gray-600`} />
          )}
        </span>
      ))}
    </div>
  )
} 