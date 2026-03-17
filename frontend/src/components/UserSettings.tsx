import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Bell, Sun, Languages, Shield, LogOut } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface UserSettings {
  darkMode: boolean
  notifications: boolean
  priceAlerts: boolean
  language: string
  autoConnect: boolean
  showBalances: boolean
  theme: 'dark' | 'light'
}

interface ToggleItem {
  label: string
  key: keyof UserSettings
  type: 'toggle'
  description: string
}

interface SelectOption {
  value: string
  label: string
}

interface SelectItem {
  label: string
  key: keyof UserSettings
  type: 'select'
  options: SelectOption[]
  description: string
}

type SettingItem = ToggleItem | SelectItem

interface SettingsSection {
  id: string
  title: string
  icon: LucideIcon
  items: SettingItem[]
}

export const UserSettings: FC = () => {
  const { address, isConnected } = useAccount()
  const [settings, setSettings] = useState<UserSettings>({
    darkMode: true,
    notifications: true,
    priceAlerts: true,
    language: 'en',
    autoConnect: true,
    showBalances: true,
    theme: 'dark',
  })
  const [expandedSection, setExpandedSection] = useState<string | null>('notifications')

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center py-12"
      >
        <div className="text-center">
          <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-300">Connect wallet to manage settings</p>
        </div>
      </motion.div>
    )
  }

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const sections: SettingsSection[] = [
    {
      id: 'notifications',
      title: '🔔 Notifications',
      icon: Bell,
      items: [
        {
          label: 'Enable Notifications',
          key: 'notifications',
          type: 'toggle',
          description: 'Get notified about important protocol events',
        },
        {
          label: 'Price Alerts',
          key: 'priceAlerts',
          type: 'toggle',
          description: 'Alert when ONBT price moves significantly',
        },
      ],
    },
    {
      id: 'appearance',
      title: '🎨 Appearance',
      icon: Sun,
      items: [
        {
          label: 'Dark Mode',
          key: 'darkMode',
          type: 'toggle',
          description: 'Use dark theme (recommended)',
        },
      ],
    },
    {
      id: 'privacy',
      title: '🔒 Privacy & Security',
      icon: Shield,
      items: [
        {
          label: 'Auto-Connect Wallet',
          key: 'autoConnect',
          type: 'toggle',
          description: 'Automatically connect wallet on page load',
        },
        {
          label: 'Show Balances',
          key: 'showBalances',
          type: 'toggle',
          description: 'Display asset balances publicly',
        },
      ],
    },
    {
      id: 'language',
      title: '🌍 Language',
      icon: Languages,
      items: [
        {
          label: 'Language',
          key: 'language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'zh', label: '中文' },
          ],
          description: 'Choose your preferred language',
        },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-slate-700/50 pb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Settings className="h-8 w-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400">Manage your preferences and account settings</p>
          </div>
        </div>

        {/* Connected Account Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 rounded-lg border border-purple-500/30 bg-purple-900/20 p-4"
        >
          <p className="text-xs text-purple-200 mb-2">Connected Account</p>
          <p className="font-mono text-sm text-purple-100">{address}</p>
        </motion.div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const Icon = section.icon
          const isExpanded = expandedSection === section.id

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 backdrop-blur-xl hover:border-purple-500/50 transition text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-purple-400" />
                    <span className="font-semibold text-white">{section.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 space-y-3 rounded-xl border border-slate-700/30 bg-slate-900/50 p-4"
                  >
                    {section.items.map((item, itemIdx) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIdx * 0.05 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">{item.label}</p>
                            <p className="text-xs text-slate-400">{item.description}</p>
                          </div>

                          {item.type === 'toggle' && (
                            <motion.button
                              onClick={() =>
                                updateSetting(item.key as keyof UserSettings, !settings[item.key as keyof UserSettings])
                              }
                              className={`relative h-6 w-11 rounded-full transition ${
                                settings[item.key as keyof UserSettings]
                                  ? 'bg-purple-600'
                                  : 'bg-slate-700'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.div
                                className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white"
                                animate={{
                                  x: settings[item.key as keyof UserSettings] ? 20 : 0,
                                }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            </motion.button>
                          )}

                          {item.type === 'select' && (
                            <select
                              value={String(settings[item.key as keyof UserSettings])}
                              onChange={(e) =>
                                updateSetting(item.key as keyof UserSettings, e.target.value)
                              }
                              aria-label={item.label}
                              className="rounded-lg bg-slate-800 border border-slate-600 px-3 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                            >
                              {'options' in item && item.options?.map((opt: SelectOption) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-red-500/30 bg-red-900/10 p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-300">
          <Shield className="h-5 w-5" />
          Danger Zone
        </h3>
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg border border-red-500/50 bg-red-900/20 px-4 py-3 text-sm font-medium text-red-200 hover:bg-red-900/40 transition flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Disconnect Wallet
          </motion.button>
          <p className="text-xs text-red-300/70">
            This will disconnect your wallet from the application
          </p>
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-blue-500/30 bg-blue-900/20 p-4 backdrop-blur-sm"
      >
        <p className="text-sm text-blue-200">
          💡 <strong className="font-semibold">Tip:</strong> Your settings are saved locally in your browser. 
          Make sure to export your preferences if you switch devices.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default UserSettings
