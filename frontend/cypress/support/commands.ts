// Custom commands for Cypress tests

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`)
})

Cypress.Commands.add('visitApp', () => {
  cy.visit('http://localhost:5173')
  cy.get('[class*="header"], nav, header').should('exist')
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
      visitApp(): Chainable<void>
    }
  }
}

export {}
