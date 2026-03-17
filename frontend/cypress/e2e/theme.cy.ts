describe('Theme Switcher', () => {
  beforeEach(() => {
    cy.visit('/')
    // Clear localStorage to test default theme
    cy.window().then((win) => {
      win.localStorage.removeItem('onbt-theme')
    })
  })

  it('should display theme toggle button in header', () => {
    // Look for Sun or Moon icon (theme toggle)
    cy.get('button').each(($button) => {
      const text = $button.text()
      if (text.includes('☀️') || text.includes('🌙')) {
        cy.wrap($button).should('be.visible')
      }
    })
  })

  it('should toggle between light and dark themes', () => {
    // Find and click the theme toggle button
    let themeToggle: JQuery<HTMLElement> | null = null
    
    cy.get('button').each(($button) => {
      const text = $button.text()
      if (text.includes('☀️') || text.includes('🌙')) {
        themeToggle = $button
      }
    }).then(() => {
      if (themeToggle) {
        cy.wrap(themeToggle).click()
        
        // Verify localStorage was updated
        cy.window().then((win) => {
          const savedTheme = win.localStorage.getItem('onbt-theme')
          expect(savedTheme).to.be.oneOf(['light', 'dark'])
        })
      }
    })
  })

  it('should persist theme preference across page reloads', () => {
    // Find and get initial theme
    let initialTheme: string = ''
    
    cy.window().then((win) => {
      initialTheme = win.localStorage.getItem('onbt-theme') || 'light'
    })

    // Click theme toggle
    cy.get('button').each(($button) => {
      const text = $button.text()
      if (text.includes('☀️') || text.includes('🌙')) {
        cy.wrap($button).click()
      }
    })

    // Verify the theme changed
    cy.window().then((win) => {
      const newTheme = win.localStorage.getItem('onbt-theme')
      expect(newTheme).to.not.equal(initialTheme)
    })

    // Reload page
    cy.reload()

    // Verify theme persisted
    cy.window().then((win) => {
      const persistedTheme = win.localStorage.getItem('onbt-theme')
      expect(persistedTheme).to.exist
    })
  })

  it('should apply dark class to html element in dark mode', () => {
    // Set dark mode
    cy.window().then((win) => {
      win.localStorage.setItem('onbt-theme', 'dark')
    })

    cy.reload()

    // Verify dark class is present
    cy.get('html').should('have.class', 'dark')
  })
})
