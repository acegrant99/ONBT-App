/**
 * Enhanced Button Component with animations and variants
 */

import { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { buttonHover } from '@/lib/animations'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg',
  secondary: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700',
  outline: 'border-2 border-slate-600 text-slate-100 hover:border-purple-500 hover:text-white',
  ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/50',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <motion.button
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading && (
        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !isLoading && <span>{icon}</span>}
      {children}
    </motion.button>
  )
}

export default Button
