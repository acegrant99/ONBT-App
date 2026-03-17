/**
 * Enhanced Wallet Connection Component
 */

import { FC } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { motion } from 'framer-motion'
import { Wallet, LogOut } from 'lucide-react'
import { formatAddress } from '@/lib/utils'
import { toastWalletAction } from '@/lib/toast'
import { Button } from './Button'
import { fadeInUp } from '@/lib/animations'

export const WalletConnection: FC = () => {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    const injected = connectors.find((c) => c.id === 'injected')
    if (injected) {
      connect({ connector: injected })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toastWalletAction('disconnect', true)
  }

  if (isConnected && address) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="flex items-center gap-2"
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-white">{formatAddress(address)}</p>
          {chain && <p className="text-xs text-slate-400">{chain.name}</p>}
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<LogOut size={16} />}
          onClick={handleDisconnect}
        >
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate">
      <Button
        variant="primary"
        size="md"
        icon={<Wallet size={18} />}
        onClick={handleConnect}
        isLoading={isPending}
      >
        Connect Wallet
      </Button>
    </motion.div>
  )
}
