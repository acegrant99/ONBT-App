describe('Page Load & Performance', () => {
  beforeEach(() => {
    // Measure page load performance
    cy.visit('/')
  })

  it('should load main page quickly', () => {
    // Page should be interactive within 3 seconds
    cy.get('header', { timeout: 3000 }).should('exist')
    cy.get('[class*="button"], button', { timeout: 3000 }).should('exist')
  })

  it('should load dashboard page', () => {
    cy.contains('Dashboard').click()
    // Should load content within 2 seconds
    cy.get('[class*="card"], [class*="chart"]', { timeout: 2000 }).should('exist')
  })

  it('should load staking page', () => {
    cy.contains('Staking').click()
    cy.get('[class*="card"], [class*="button"]', { timeout: 2000 }).should('exist')
  })

  it('should load governance page', () => {
    cy.contains('Governance').click()
    cy.get('[class*="card"], [class*="proposal"]', { timeout: 2000 }).should('exist')
  })

  it('should load bridge page', () => {
    cy.contains('Bridge').click()
    cy.get('[class*="card"], input', { timeout: 2000 }).should('exist')
  })

  it('should handle rapid navigation', () => {
    // Navigate through multiple pages quickly
    cy.contains('Dashboard').click()
    cy.wait(300)
    cy.contains('Staking').click()
    cy.wait(300)
    cy.contains('Governance').click()
    cy.wait(300)
    cy.contains('Bridge').click()
    
    // Should still render without errors
    cy.get('[class*="button"]').should('exist')
  })

  it('should not have visible error messages', () => {
    cy.visit('/')
    
    // Check for common error message patterns in UI
    cy.get('[class*="error"], [class*="alert"], [role="alert"]').should('not.exist')
  })

  it('should display loading states appropriately', () => {
    cy.visit('/')
    
    // Loading skeletons or spinners should be present during data fetching
    // Or they should load quickly and disappear
    cy.get('[class*="skeleton"], [class*="loading"], [class*="spinner"]').then(($loader) => {
      if ($loader.length > 0) {
        // Wait for loaders to disappear
        cy.wrap($loader).should('not.exist', { timeout: 5000 })
      }
    })
  })

  it('should handle missing images gracefully', () => {
    // Images should have alt text
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
    })
  })
})
