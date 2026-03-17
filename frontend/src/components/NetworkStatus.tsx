import { FC } from 'react'
import { motion } from 'framer-motion'
import { DEPLOYMENT_INFO } from '@/config/projectInfo'

interface NetworkStatusProps {
  chainId?: number
  isConnected: boolean
}

export const NetworkStatus: FC<NetworkStatusProps> = ({ chainId, isConnected }) => {
  const getNetworkInfo = () => {
    if (!isConnected || !chainId) {
      return { name: 'Not Connected', color: 'text-slate-400', dotColor: 'bg-slate-400' }
    }

    switch (chainId) {
      case 8453:
        return { 
          name: 'Base (Hub)', 
          color: 'text-blue-400', 
          dotColor: 'bg-blue-400',
          eid: DEPLOYMENT_INFO.networks.base.layerZeroEid,
        }
      case 42161:
        return { 
          name: 'Arbitrum (Spoke)', 
          color: 'text-indigo-400', 
          dotColor: 'bg-indigo-400',
          eid: DEPLOYMENT_INFO.networks.arbitrum.layerZeroEid,
        }
      default:
        return { 
          name: `Unsupported (${chainId})`, 
          color: 'text-orange-400', 
          dotColor: 'bg-orange-400' 
        }
    }
  }

  const networkInfo = getNetworkInfo()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm"
    >
      <span className={`h-2 w-2 rounded-full ${networkInfo.dotColor} animate-pulse`}></span>
      <span className={`text-xs font-medium ${networkInfo.color}`}>
        {networkInfo.name}
      </span>
      {networkInfo.eid && (
        <span className="text-xs text-slate-500">
          EID {networkInfo.eid}
        </span>
      )}
    </motion.div>
  )
}

export default NetworkStatus
