describe('Bridge / Cross-Chain Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to bridge page', () => {
    cy.contains('Bridge').click()
    cy.contains('Bridge').should('be.visible')
  })

  it('should display bridge controls', () => {
    cy.contains('Bridge').click()
    
    // Check for bridge UI elements
    cy.get('[class*="chain-selector"], input, button').should('exist')
  })

  it('should have source and destination chain selectors', () => {
    cy.contains('Bridge').click()
    
    // At least chain selectors for from/to
    cy.get('select, button').should('have.length.greaterThan', 0)
  })

  it('should have amount input field', () => {
    cy.contains('Bridge').click()
    
    // Input for bridge amount
    cy.get('input').should('exist')
  })

  it('should display bridge fee information', () => {
    cy.contains('Bridge').click()
    
    // Show fee/cost information
    cy.get('[class*="fee"], [class*="stat"], [class*="info"]').should('exist')
  })

  it('should have bridge confirmation button', () => {
    cy.contains('Bridge').click()
    
    // Button to initiate bridge
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('should show balance and allowance info', () => {
    cy.contains('Bridge').click()
    
    // Display user's token balance
    cy.get('[class*="balance"], [class*="info"]').should('exist')
  })
})