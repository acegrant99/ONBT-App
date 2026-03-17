describe('App Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the application', () => {
    cy.get('header').should('exist')
    cy.contains('ONBT').should('be.visible')
  })

  it('should display main navigation items', () => {
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Staking').should('be.visible')
    cy.contains('Governance').should('be.visible')
    cy.contains('Bridge').should('be.visible')
  })

  it('should navigate to different pages', () => {
    // Navigate to Staking
    cy.contains('Staking').click()
    cy.contains('Staking').closest('button').should('have.class')
    
    // Navigate to Governance
    cy.contains('Governance').click()
    cy.contains('Governance').closest('button').should('have.class')
  })

  it('should display settings button', () => {
    cy.get('button').contains('⚙️').should('be.visible')
  })

  it('should have ConnectKit button', () => {
    cy.get('button').should('exist')
    // ConnectKit button typically has certain text or styling
    cy.contains('Connect Wallet', { matchCase: false }).should('exist').or(cy.get('button').filter(':contains("0x")').should('exist'))
  })
})
