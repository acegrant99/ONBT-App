import { FC } from 'react'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  width?: string
  height?: string
  circle?: boolean
  count?: number
  className?: string
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  width = 'w-full',
  height = 'h-4',
  circle = false,
  count = 1,
  className = '',
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`${width} ${height} ${circle ? 'rounded-full' : 'rounded-lg'} bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 ${className}`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

export const CardSkeleton: FC = () => (
  <motion.div
    className="rounded-xl border border-slate-700/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 space-y-4"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <SkeletonLoader height="h-6" className="w-1/3" />
    <div className="space-y-2">
      <SkeletonLoader height="h-4" />
      <SkeletonLoader height="h-4" className="w-2/3" />
    </div>
    <SkeletonLoader height="h-10" />
  </motion.div>
)

export const TableRowSkeleton: FC = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <SkeletonLoader width="w-1/4" height="h-4" />
        <SkeletonLoader width="w-1/4" height="h-4" />
        <SkeletonLoader width="w-1/4" height="h-4" />
        <SkeletonLoader width="w-1/4" height="h-4" />
      </div>
    ))}
  </div>
)

export const DashboardSkeleton: FC = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="space-y-2">
      <SkeletonLoader height="h-8" className="w-1/3" />
      <SkeletonLoader height="h-4" className="w-2/3" />
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>

    {/* Chart Skeleton */}
    <div className="rounded-xl border border-slate-700/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6">
      <SkeletonLoader height="h-6" className="w-1/4 mb-6" />
      <div className="h-64">
        <SkeletonLoader height="h-full" circle={false} />
      </div>
    </div>
  </div>
)

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  color = 'text-purple-500'
}) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.svg
      className={`${sizeClass[size]} ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0110 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}
