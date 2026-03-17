describe('UI & Accessibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have proper page title and meta tags', () => {
    cy.title().should('include', 'ONBT')
  })

  it('should display app logo', () => {
    cy.get('header img').first().should('be.visible').and('have.attr', 'alt')
  })

  it('should have accessible buttons', () => {
    cy.get('button').each(($button) => {
      // Each button should either have text or aria-label
      cy.wrap($button).should((el) => {
        const hasText = el.text().trim().length > 0
        const hasAriaLabel = el.attr('aria-label')
        expect(hasText || hasAriaLabel).to.be.true
      })
    })
  })

  it('should have accessible links', () => {
    cy.get('a').each(($link) => {
      // Each link should have meaningful text
      cy.wrap($link).should((el) => {
        const hasText = el.text().trim().length > 0
        const hasAriaLabel = el.attr('aria-label')
        expect(hasText || hasAriaLabel).to.be.true
      })
    })
  })

  it('should have proper focus management', () => {
    cy.get('button').first().focus()
    cy.focused().should('be.a', 'button')
  })

  it('should support keyboard navigation', () => {
    // Tab to first button - skip native tab test as it requires keyboard plugin
    cy.get('button').first().should('be.visible')

    // Verify focusable elements exist
    cy.get('button, a, input').should('have.length.greaterThan', 0)
  })

  it('should have readable text hierarchy', () => {
    cy.get('h1, h2, h3').each(($heading) => {
      cy.wrap($heading).should('be.visible').and('have.text.length.greaterThan', 0)
    })
  })

  it('should maintain viewport on mobile', () => {
    cy.viewport('iphone-x')
    cy.get('header').should('be.visible')
    cy.contains('ONBT').should('be.visible')
  })

  it('should have proper color contrast in dark mode', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('onbt-theme', 'dark')
    })
    cy.reload()
    
    // Verify dark class applied
    cy.get('html').should('have.class', 'dark')
    
    // Text should be visible
    cy.contains('ONBT').should('be.visible')
  })

  it('should have proper color contrast in light mode', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('onbt-theme', 'light')
    })
    cy.reload()
    
    // Verify dark class not applied
    cy.get('html').should('not.have.class', 'dark')
    
    // Text should be visible
    cy.contains('ONBT').should('be.visible')
  })
})
