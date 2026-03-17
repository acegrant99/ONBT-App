# Cypress Testing Documentation

## Overview
This project uses Cypress for end-to-end testing. All tests are located in the `cypress/e2e/` directory.

## Setup

### Installation
Cypress is already installed as a dev dependency. To verify:
```bash
npm list cypress
```

### Configuration
- **Config file:** `cypress.config.ts`
- **Base URL:** `http://localhost:5173` (Vite dev server)
- **Viewport:** 1280x720
- **Video recording:** Enabled
- **Screenshots on failure:** Enabled

## Running Tests

### Open Cypress UI (Interactive)
```bash
npm run cypress:open
```
This opens the Cypress Test Runner where you can see tests in real-time.

### Run Tests Headless
```bash
npm run cypress:run
```
Runs all tests in headless mode (no UI).

### Run E2E Tests (Chrome)
```bash
npm run test:e2e
```
Runs all E2E tests in Chrome browser headless mode.

## Test Files

### 1. **navigation.cy.ts**
Tests basic app navigation and page loading:
- App loads correctly
- Navigation items visible
- Page navigation works
- Settings button visible
- Wallet connection button visible

### 2. **theme.cy.ts**
Tests the dark/light theme switcher (Phase 2A feature):
- Theme toggle button visible
- Theme toggles between light/dark
- Theme preference persists across reloads
- Dark class applied to html element
- localStorage updates correctly

### 3. **wallet.cy.ts**
Tests wallet connection features:
- Connect wallet button visible when disconnected
- Settings button accessible
- Chain switcher visible
- Welcome message displays
- Header layout proper

### 4. **accessibility.cy.ts**
Tests accessibility and UI standards:
- Page title set correctly
- App logo visible
- Buttons have text or aria-label
- Links have meaningful text
- Focus management works
- Color contrast in dark/light modes
- Mobile viewport support

## Custom Commands

### getByTestId(testId: string)
Gets elements by their `data-testid` attribute:
```typescript
cy.getByTestId('button').click()
```

### visitApp()
Visits the app and verifies header loads:
```typescript
cy.visitApp()
```

## Best Practices

1. **Use data-testid:** Add `data-testid` to elements you want to test:
   ```jsx
   <button data-testid="submit-btn">Submit</button>
   ```

2. **Wait for elements:** Use `cy.get()` with proper selectors
   ```typescript
   cy.get('[data-testid="modal"]').should('exist')
   ```

3. **Test user flows:** Focus on complete user journeys, not implementation details

4. **Clear state:** Use `beforeEach` to set up fresh state for each test

5. **Handle async:** Cypress automatically waits for elements and network calls

## Adding New Tests

1. Create a new `.cy.ts` file in `cypress/e2e/`
2. Use the same structure:
   ```typescript
   describe('Feature Name', () => {
     beforeEach(() => {
       cy.visit('http://localhost:5173')
     })

     it('should test something', () => {
       // Test code
     })
   })
   ```

3. Run `npm run cypress:open` to see your test immediately

## CI/CD Integration

To run tests in CI/CD pipelines:
```bash
# Start dev server in background
npm run dev &

# Wait for server to start
sleep 5

# Run tests
npm run test:e2e
```

## Troubleshooting

### Tests timeout
- Increase `defaultCommandTimeout` in `cypress.config.ts`
- Check if dev server is running on port 5173

### Element not found
- Verify element exists in the DOM
- Check selector is correct
- Use `cy.debug()` to inspect state

### Network errors
- Mock network calls using `cy.intercept()`
- Check API URLs in component code

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)
