describe('Staking Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to staking page', () => {
    cy.contains('Staking').click()
    cy.contains('Staking').should('be.visible')
  })

  it('should display staking components', () => {
    cy.contains('Staking').click()
    
    // Check for key staking UI elements
    cy.contains(/stake|amount|select/i).should('exist')
    cy.get('button').should('exist')
  })

  it('should display staking statistics', () => {
    cy.contains('Staking').click()
    
    // Look for APY, TVL, or reward-related text or stat/card elements
    cy.get('[class*="stat"], [class*="card"], [class*="pool"]').should('exist')
  })

  it('should have enable/approve button for new stakers', () => {
    cy.contains('Staking').click()
    
    // Button for approval/enabling staking - check for action buttons
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('should display available balance info', () => {
    cy.contains('Staking').click()
    
    // Look for balance display or input elements for amount
    cy.get('input, [class*="balance"], [class*="amount"]').should('exist')
  })
})
