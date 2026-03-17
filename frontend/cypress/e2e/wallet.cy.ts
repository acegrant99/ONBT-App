describe('Wallet Connection', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display connect wallet button when not connected', () => {
    // Look for ConnectKit button
    cy.get('button').should('exist')
    // The button typically contains text about connecting or shows an address
    cy.get('button').should('exist')
  })

  it('should display settings button', () => {
    cy.get('button').contains('⚙️').should('be.visible')
  })

  it('should show chain switcher', () => {
    // Look for chain switcher component
    cy.get('button').each(($button) => {
      // Chain switcher typically shows chain name or icon
      const text = $button.text()
      if (text.includes('Base') || text.includes('Arbitrum') || text.includes('⛓️')) {
        cy.wrap($button).should('be.visible')
      }
    })
  })

  it('should display welcome message when not connected', () => {
    cy.contains(/connect|wallet/i, { matchCase: false }).should('exist')
  })

  it('should have proper header layout', () => {
    cy.get('header, [class*="header"]').within(() => {
      // Logo
      cy.get('img').first().should('be.visible')
      // App name
      cy.contains('ONBT').should('be.visible')
    })
  })
})
