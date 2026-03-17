import { FC, useState, Suspense, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { ChainSwitcher } from '@components/ChainSwitcher'
import { ThemeToggle } from '@/context/ThemeContext'
import { LazyComponentFallback, lazyLoadComponent, prefetchComponents } from '@/lib/performance'
import { BRANDING } from '@/config/branding'

// Lazy load heavy page components for code splitting
const Dashboard = lazyLoadComponent(() => import('@components/Dashboard'))
const Staking = lazyLoadComponent(() => import('@components/Staking'))
const Bridge = lazyLoadComponent(() => import('@components/Bridge'))
const Achievements = lazyLoadComponent(() => import('@components/Achievements'))
const Governance = lazyLoadComponent(() => import('@components/governance/Governance'))
const Liquidity = lazyLoadComponent(() => import('@components/liquidity/Liquidity'))
const RewardsDashboard = lazyLoadComponent(() => import('@components/rewards/RewardsDashboard'))
const RevenueShare = lazyLoadComponent(() => import('@components/revenue/RevenueShare'))
const ProjectInfo = lazyLoadComponent(() => import('@components/ProjectInfo'))
const TransactionHistory = lazyLoadComponent(() => import('@components/TransactionHistory'))
const UserSettings = lazyLoadComponent(() => import('@components/UserSettings'))
const Footer = lazyLoadComponent(() => import('@components/Footer'))
const ContractLab = lazyLoadComponent(() => import('@components/admin/ContractLab'))

// Prefetch functions for optimization
const componentPrefetches = [
  () => import('@components/Dashboard'),
  () => import('@components/Staking'),
  () => import('@components/Bridge'),
  () => import('@components/governance/Governance'),
  () => import('@components/liquidity/Liquidity'),
  () => import('@components/admin/ContractLab'),
]

type Page = 'dashboard' | 'staking' | 'bridge' | 'achievements' | 'governance' | 'liquidity' | 'rewards' | 'revenue' | 'info' | 'history' | 'settings' | 'lab'

interface NavItem {
  id: Page
  title: string
  icon: string
  description: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', title: 'Dashboard', icon: '📊', description: 'View your portfolio' },
  { id: 'staking', title: 'Staking', icon: '💰', description: 'Stake & earn rewards' },
  { id: 'governance', title: 'Governance', icon: '🗳️', description: 'Vote on proposals' },
  { id: 'liquidity', title: 'Liquidity', icon: '💧', description: 'Manage pools' },
  { id: 'lab', title: 'Contract Lab', icon: '🧪', description: 'ABI-driven transactions' },
  { id: 'rewards', title: 'Rewards', icon: '🎁', description: 'Claim rewards' },
  { id: 'revenue', title: 'Revenue', icon: '💵', description: 'Revenue sharing' },
  { id: 'bridge', title: 'Bridge', icon: '🌉', description: 'Cross-chain transfers' },
  { id: 'achievements', title: 'Achievements', icon: '🏆', description: 'Collect NFTs' },
  { id: 'history', title: 'History', icon: '⏱️', description: 'Transaction history' },
  { id: 'info', title: 'Project Info', icon: 'ℹ️', description: 'Protocol details' },
]

export const App: FC = () => {
  const { isConnected, address } = useAccount()
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [showSettings, setShowSettings] = useState(false)

  // Prefetch components for better UX
  useEffect(() => {
    prefetchComponents(componentPrefetches)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'staking':
        return <Staking />
      case 'governance':
        return <Governance />
      case 'liquidity':
        return <Liquidity />
      case 'lab':
        return <ContractLab />
      case 'rewards':
        return <RewardsDashboard />
      case 'revenue':
        return <RevenueShare />
      case 'bridge':
        return <Bridge />
      case 'achievements':
        return <Achievements />
      case 'history':
        return <TransactionHistory />
      case 'info':
        return <ProjectInfo />
      default:
        return <Dashboard />
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
        {/* Header */}
        <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              src={BRANDING.logos.mark}
              alt={BRANDING.name}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <h1 className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-2xl font-bold text-transparent">
                {BRANDING.name}
              </h1>
              <p className="text-xs text-slate-400">Omnichain DeFi Platform</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <ChainSwitcher />
            <ThemeToggle />
            {isConnected && address && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-right backdrop-blur-sm"
              >
                <p className="text-xs text-slate-400">Connected Wallet</p>
                <p className="font-mono text-sm text-white">{address.slice(0, 6)}...{address.slice(-4)}</p>
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-slate-800/50 transition text-slate-400 hover:text-white"
              title="Settings"
            >
              ⚙️
            </motion.button>
            <ConnectKitButton />
          </div>
        </div>
      </motion.header>

      {!isConnected ? (
        // Not Connected State
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center py-20"
        >
          <div className="text-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={BRANDING.logos.primary}
              alt={BRANDING.shortName}
              className="mx-auto mb-6 h-24 w-24"
            />
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-4xl font-bold text-transparent"
            >
              Welcome to {BRANDING.name}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-slate-400"
            >
              {BRANDING.tagline}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-slate-500"
            >
              Connect your wallet to get started
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <ConnectKitButton />
            </motion.div>
          </div>
        </motion.main>
      ) : (
        // Connected State
        <div className="flex min-h-screen">
          {/* Sidebar Navigation */}
          <motion.aside 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm"
          >
            <nav className="space-y-2 p-4">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setCurrentPage(item.id)}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative w-full overflow-hidden rounded-xl px-4 py-3 text-left transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Additional Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-slate-700/50 p-4"
            >
              <p className="text-xs font-medium text-slate-500">LINKS</p>
              <div className="mt-3 space-y-2">
                <motion.a 
                  whileHover={{ x: 4 }}
                  href="#" 
                  className="block text-xs text-slate-400 transition hover:text-slate-300"
                >
                  📖 Documentation
                </motion.a>
                <motion.a 
                  whileHover={{ x: 4 }}
                  href="#" 
                  className="block text-xs text-slate-400 transition hover:text-slate-300"
                >
                  🐦 Twitter
                </motion.a>
                <motion.a 
                  whileHover={{ x: 4 }}
                  href="#" 
                  className="block text-xs text-slate-400 transition hover:text-slate-300"
                >
                  💬 Discord
                </motion.a>
              </div>
            </motion.div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-5xl px-6 py-8"
              >
                <Suspense fallback={<LazyComponentFallback />}>
                  {renderPage()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
      </div>

      {/* Settings Modal Overlay */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 overflow-y-auto p-4"
            >
              <div className="flex items-start justify-center min-h-full pt-20">
                <motion.div
                  className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-900 backdrop-blur-xl p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
                  >
                    ✕
                  </button>
                  <UserSettings />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </ErrorBoundary>
  )
}

export default App
