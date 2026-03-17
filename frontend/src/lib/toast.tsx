/**
 * Toast notification utilities using react-hot-toast
 */

import toast, { Toaster, ToastOptions } from 'react-hot-toast'

/**
 * Default toast configuration
 */
export const toastConfig: ToastOptions = {
  duration: 4000,
  position: 'bottom-right',
  style: {
    background: '#1e293b',
    color: '#fff',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    padding: '16px',
  },
  iconTheme: {
    primary: '#7c3aed',
    secondary: '#fff',
  },
}

/**
 * Success toast
 */
export const toastSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...toastConfig,
    duration: 3000,
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
    ...options,
  })
}

/**
 * Error toast
 */
export const toastError = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...toastConfig,
    duration: 5000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
    ...options,
  })
}

/**
 * Loading toast
 */
export const toastLoading = (message: string, options?: ToastOptions) => {
  return toast.loading(message, { ...toastConfig, ...options })
}

/**
 * Promise toast (shows loading, then success/error)
 */
export const toastPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((err: any) => string)
  },
  options?: ToastOptions
) => {
  return toast.promise(promise, messages, { ...toastConfig, ...options })
}

/**
 * Transaction toast with hash
 */
export const toastTransaction = (
  hash: string,
  chainId: number,
  options?: ToastOptions
) => {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    8453: 'https://basescan.org',
    42161: 'https://arbiscan.io',
  }
  
  const explorerUrl = explorers[chainId] || 'https://etherscan.io'
  
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto flex w-full max-w-md rounded-lg bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Transaction Submitted</p>
              <p className="mt-1 text-sm text-gray-400">
                <a
                  href={`${explorerUrl}/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 underline"
                >
                  View on Explorer
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-gray-400 hover:text-white focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ),
    { ...toastConfig, duration: 10000, ...options }
  )
}

/**
 * Wallet action toast
 */
export const toastWalletAction = (
  action: 'connect' | 'disconnect' | 'switch',
  success: boolean = true,
  options?: ToastOptions
) => {
  const messages = {
    connect: success ? 'Wallet connected successfully' : 'Failed to connect wallet',
    disconnect: success ? 'Wallet disconnected' : 'Failed to disconnect wallet',
    switch: success ? 'Network switched successfully' : 'Failed to switch network',
  }
  
  if (success) {
    return toastSuccess(messages[action], options)
  } else {
    return toastError(messages[action], options)
  }
}

/**
 * Copy to clipboard toast
 */
export const toastCopy = (label: string = 'Address', options?: ToastOptions) => {
  return toastSuccess(`${label} copied to clipboard!`, options)
}

/**
 * Custom toast component for Toaster provider
 */
export { Toaster }

/**
 * Default Toaster configuration
 */
export const toasterConfig = {
  position: 'bottom-right' as const,
  toastOptions: toastConfig,
  containerStyle: {
    bottom: 20,
    right: 20,
  },
}
