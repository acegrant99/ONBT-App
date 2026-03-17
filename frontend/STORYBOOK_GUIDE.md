# Storybook Component Library Documentation

## Overview
Storybook is an interactive development environment for building and testing UI components in isolation. All component stories are stored in the `src/` directory alongside their components.

## Setup

### Installation
Storybook is already installed as a dev dependency. To verify:
```bash
npm list @storybook/react-vite
```

### Configuration Files
- **Main config:** `.storybook/main.ts` - Storybook configuration
- **Preview config:** `.storybook/preview.ts` - Global settings and decorators
- **Custom styles:** `.storybook/preview.ts` imports `src/index.css`

## Running Storybook

### Start Development Server
```bash
npm run storybook
```
Opens Storybook at `http://localhost:6006`

### Build Static Storybook
```bash
npm run build-storybook
```
Generates a static HTML build in `storybook-static/` directory

### Deploy Storybook
After building, deploy the `storybook-static/` folder to any static host:
- GitHub Pages
- Vercel
- Netlify
- AWS S3

## Creating Component Stories

### File Naming
Stories use the `.stories.tsx` convention:
```
src/components/Button.stories.tsx
src/context/ThemeToggle.stories.tsx
```

### Basic Story Structure
```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}
```

## Existing Stories

### 1. **Button.stories.tsx**
Stories for the Button component:
- **Primary:** Default primary button variant
- **Secondary:** Secondary button variant
- **Disabled:** Disabled button state
- **Loading:** Loading/disabled state

### 2. **ThemeToggle.stories.tsx**
Stories for the Theme Switcher (Phase 2A):
- **Default:** Theme toggle button in isolation
- **InHeader:** Theme toggle positioned in a header context

## Story Features

### Controls (Knobs)
Storybook automatically generates interactive controls for component props:
- Change `children` text
- Toggle `disabled` state
- Select `variant` from options

### Docs Tab
Auto-generated documentation showing:
- Component description
- Props table with types
- Available stories
- Source code

### Canvas Tab
Live preview of the component with interactive controls

## Best Practices

### 1. Story Organization
Use descriptive folder structure:
```
Components/
  Button
  Card
  Input
UI/
  Header
  Footer
Forms/
  LoginForm
  SettingsForm
```

### 2. Meaningful Story Names
```typescript
// Good
export const PrimaryButton: Story = { ... }
export const DisabledState: Story = { ... }
export const LoadingWithSpinner: Story = { ... }

// Avoid
export const Story1: Story = { ... }
export const Test: Story = { ... }
```

### 3. Document Props
```typescript
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // Auto-generate docs
  argTypes: {
    variant: {
      description: 'Visual style variant',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    disabled: {
      description: 'Whether button is disabled',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>
```

### 4. Show Real-World Usage
```typescript
export const InForm: Story = {
  render: () => (
    <form>
      <input type="text" placeholder="Enter name" />
      <Button variant="primary">Submit</Button>
    </form>
  ),
}
```

### 5. Test Different States
```typescript
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}
```

## Component Examples to Add

Consider creating stories for these existing components:
1. **Card** - Display cards with different styles
2. **Input** - Text input with validation states
3. **Modal** - Modal dialog component
4. **PaymentStatus** - Payment status indicators
5. **Navigation** - Navigation menu items
6. **Dashboard** - Dashboard grid layouts
7. **Charts** - Recharts visualizations

## Addons

### Installed Addons
- **@storybook/addon-essentials** - Essential addons (docs, controls, actions)
- **@storybook/addon-interactions** - Interaction testing

### Useful Addons to Add
```bash
npm install --save-dev @storybook/addon-a11y  # Accessibility checks
npm install --save-dev @storybook/addon-coverage  # Code coverage
```

## Stories Configuration

### .storybook/main.ts
```typescript
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
  docs: { autodocs: 'tag' },
}
```

### .storybook/preview.ts
```typescript
const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}
```

## Theming Support

Since the project supports dark/light themes, stories automatically respect the theme:
- Storybook uses Tailwind CSS from `src/index.css`
- Dark mode works via `dark:` classes
- Theme toggle affects story preview

## Development Workflow

1. **Create Component** → `src/components/MyComponent.tsx`
2. **Create Story** → `src/components/MyComponent.stories.tsx`
3. **Run Storybook** → `npm run storybook`
4. **Iterate** → Edit component, see live updates
5. **Test** → Use Storybook controls to test variants
6. **Document** → Stories serve as documentation

## CI/CD Integration

### GitHub Pages Deployment
```yaml
- name: Build Storybook
  run: npm run build-storybook

- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./storybook-static
```

## Common Patterns

### Loading State
```typescript
export const Loading: Story = {
  args: { isLoading: true },
}
```

### Error State
```typescript
export const Error: Story = {
  args: { error: 'Something went wrong' },
}
```

### Empty State
```typescript
export const Empty: Story = {
  args: { items: [] },
}
```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
- [Controls API](https://storybook.js.org/docs/react/essentials/controls)
- [Interactions](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
