import React, { ReactNode, ErrorInfo } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorCount: number
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState(prev => ({
      errorCount: prev.errorCount + 1
    }))
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4"
        >
          <div className="w-full max-w-md space-y-4">
            <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-red-800/20 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0" />
                <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
              </div>

              <p className="mt-3 text-sm text-slate-300">
                We encountered an error while rendering this page. Our team has been notified.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-mono text-red-300 bg-slate-900/50 rounded p-2 overflow-x-auto">
                    {this.state.error.toString()}
                  </p>
                  {this.state.error.stack && (
                    <details className="text-xs text-slate-400">
                      <summary className="cursor-pointer hover:text-slate-300">Stack trace</summary>
                      <pre className="mt-2 bg-slate-900/50 rounded p-2 text-red-300 overflow-x-auto text-[10px]">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={this.resetError}
                  className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white hover:from-red-500 hover:to-red-600 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition"
                >
                  Home
                </button>
              </div>

              {this.state.errorCount > 3 && (
                <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3">
                  <p className="text-xs text-yellow-200">
                    ⚠️ Multiple errors detected. Try clearing your browser cache or using a different browser.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}
