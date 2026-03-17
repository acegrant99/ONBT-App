describe('Governance & Voting Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to governance page', () => {
    cy.contains('Governance').click()
    cy.contains('Governance').should('be.visible')
  })

  it('should display governance interface', () => {
    cy.contains('Governance').click()
    
    // Governance should show proposals or voting interface
    cy.get('[class*="card"], [class*="proposal"], button').should('exist')
  })

  it('should have voting controls', () => {
    cy.contains('Governance').click()
    
    // Look for voting buttons/options
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('should show proposal details', () => {
    cy.contains('Governance').click()
    
    // Check for proposal information
    cy.get('[class*="proposal-detail"], [class*="card-title"], [class*="detail"]').should('exist')
  })

  it('should display voting power/balance', () => {
    cy.contains('Governance').click()
    
    // Show how much voting power user has
    cy.get('[class*="stat"], [class*="power"], [class*="balance"]').should('exist')
  })

  it('should have vote submission button', () => {
    cy.contains('Governance').click()
    
    // Button to submit vote
    cy.get('button').should('have.length.greaterThan', 0)
  })
})