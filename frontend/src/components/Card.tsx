/**
 * Enhanced Card Component with hover animations
 */

import { FC, ReactNode, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover, fadeInUp } from '@/lib/animations'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  animated?: boolean
  interactive?: boolean
}

const CardComponent: FC<CardProps> = ({
  title,
  description,
  icon,
  children,
  animated = true,
  interactive = true,
  className,
  ...props
}) => {
  const CardElement = (
    <div
      className={cn(
        'rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm',
        interactive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {(title || icon) && (
        <div className="mb-4 flex items-start justify-between">
          <div>
            {title && <h3 className="font-semibold text-white">{title}</h3>}
            {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
          </div>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>
      )}
      {children}
    </div>
  )

  if (!animated) return CardElement

  return (
    <motion.div
      variants={interactive ? cardHover : fadeInUp}
      initial={interactive ? 'rest' : 'initial'}
      whileHover={interactive ? 'hover' : undefined}
      whileTap={interactive ? 'tap' : undefined}
      animate={interactive ? undefined : 'animate'}
    >
      {CardElement}
    </motion.div>
  )
}

export const Card = CardComponent
export default CardComponent
