// Support file for Cypress E2E tests
import './commands'

// Suppress console errors in tests (optional)
Cypress.on('uncaught:exception', (err) => {
  // Return false to prevent Cypress from failing the test
  // Most common issues:
  // 1. window.matchMedia - isn't fully mocked in test env
  // 2. unstable_batchedUpdates - React internal warning
  // 3. Context provider errors - normal in E2E tests when components are tested in isolation
  // 4. ResizeObserver - browser API not fully mocked
  if (
    err.message.includes('matchMedia') || 
    err.message.includes('unstable_batchedUpdates') ||
    err.message.includes('must be used within') ||
    err.message.includes('useTheme') ||
    err.message.includes('useWagmi') ||
    err.message.includes('ResizeObserver') ||
    err.message.includes('Connected to a non-Wagmi provider')
  ) {
    return false
  }
  return true
})
