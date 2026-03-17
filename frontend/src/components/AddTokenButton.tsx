import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import { TOKEN_METADATA, CHAINS } from '@/config/contracts'

interface AddTokenButtonProps {
  className?: string
}

export const AddTokenButton: FC<AddTokenButtonProps> = ({ className = '' }) => {
  const { chainId } = useAccount()
  const [isAdding, setIsAdding] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const addTokenToWallet = async () => {
    if (!window.ethereum || !chainId) {
      setStatus('error')
      return
    }

    const currentChainId = chainId === CHAINS.ARBITRUM ? CHAINS.ARBITRUM : CHAINS.BASE
    const tokenData = TOKEN_METADATA[currentChainId]

    setIsAdding(true)
    setStatus('idle')

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenData.address,
            symbol: tokenData.symbol,
            decimals: tokenData.decimals,
            image: tokenData.logo,
          },
        },
      })

      if (wasAdded) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error adding token to wallet:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      setIsAdding(false)
    }
  }

  const getButtonText = () => {
    if (isAdding) return 'Adding...'
    if (status === 'success') return '✓ Added!'
    if (status === 'error') return 'Failed'
    return '+ Add ONBT to Wallet'
  }

  const getButtonStyles = () => {
    let baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 '
    
    if (status === 'success') {
      return baseStyles + 'bg-green-500 text-white cursor-default'
    }
    if (status === 'error') {
      return baseStyles + 'bg-red-500 text-white cursor-default'
    }
    if (isAdding) {
      return baseStyles + 'bg-gray-400 text-white cursor-wait'
    }
    
    return baseStyles + 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg active:scale-95 cursor-pointer'
  }

  if (!window.ethereum) {
    return null
  }

  return (
    <button
      onClick={addTokenToWallet}
      disabled={isAdding || status !== 'idle'}
      className={`${getButtonStyles()} ${className}`}
      title="Add ONBT token to your wallet"
    >
      {getButtonText()}
    </button>
  )
}

export default AddTokenButton
