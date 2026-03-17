/**
 * Enhanced Payment Status Component with animations
 */

import { FC } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PaymentStatus = 'pending' | 'success' | 'error'

interface PaymentStatusProps {
  status: PaymentStatus
  message: string
  hash?: string
  explorerUrl?: string
}

export const PaymentStatus: FC<PaymentStatusProps> = ({
  status,
  message,
  hash,
  explorerUrl,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 animate-spin" />
      case 'success':
        return <CheckCircle className="h-6 w-6" />
      case 'error':
        return <XCircle className="h-6 w-6" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-blue-500/10 border-blue-500/50 text-blue-400'
      case 'success':
        return 'bg-green-500/10 border-green-500/50 text-green-400'
      case 'error':
        return 'bg-red-500/10 border-red-500/50 text-red-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'rounded-lg border p-4 flex items-center gap-4',
        getStatusColor()
      )}
    >
      <div className={status === 'pending' ? 'text-amber-400' : undefined}>
        {getStatusIcon()}
      </div>
      <div className="flex-1">
        <p className="font-medium text-white">{message}</p>
        {hash && explorerUrl && (
          <a
            href={`${explorerUrl}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm underline hover:opacity-80"
          >
            View transaction
          </a>
        )}
      </div>
    </motion.div>
  )
}
