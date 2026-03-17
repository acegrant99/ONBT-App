import React, { createContext, useContext, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Theme Provider Component
 * Manages application theme using localStorage and Tailwind CSS dark mode
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('onbt-theme') as Theme | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
      setThemeState(initialTheme)
      applyTheme(initialTheme)
    } catch (error) {
      console.warn('Failed to load theme:', error)
      applyTheme('dark')
    }
    setIsLoaded(true)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const htmlElement = document.documentElement

    if (newTheme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }

    // Also set body background for smoother transition
    if (newTheme === 'dark') {
      document.body.style.backgroundColor = '#0f172a' // slate-900
      document.body.style.color = '#f1f5f9' // slate-100
    } else {
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#1e293b' // slate-800
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('onbt-theme', newTheme)
    applyTheme(newTheme)

    // Dispatch custom event for components that need to react to theme change
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }))
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!isLoaded) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * Theme Toggle Button Component
 */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-slate-200 dark:bg-slate-800
        text-slate-800 dark:text-slate-200
        hover:bg-slate-300 dark:hover:bg-slate-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        dark:focus:ring-offset-slate-900
        ${className}
      `}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" strokeWidth={2} />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={2} />
      )}
    </button>
  )
}
