/**
 * Enhanced Input Component with validation and icons
 */

import { FC, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  icon?: ReactNode
  hint?: string
}

export const Input: FC<InputProps> = ({
  label,
  error,
  success,
  icon,
  hint,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
            icon && 'pl-10',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
              : success
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500/50'
                : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500/50',
            className
          )}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
        {success && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle size={18} />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1 text-sm text-slate-400">{hint}</p>
      )}
    </div>
  )
}

export default Input
