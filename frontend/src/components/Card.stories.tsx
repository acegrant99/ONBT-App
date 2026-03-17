import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../components/Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'Card description goes here',
    children: 'Card content goes here',
  },
}

export const WithIcon: Story = {
  args: {
    title: 'Dashboard Stats',
    description: 'Your portfolio overview',
    icon: '📊',
    children: 'Total Value: $1,234.56',
  },
}

export const Interactive: Story = {
  args: {
    title: 'Interactive Card',
    description: 'Click to interact',
    icon: '🎯',
    interactive: true,
    children: 'This card is interactive and responds to hover',
  },
}

export const WithAnimation: Story = {
  args: {
    title: 'Animated Card',
    description: 'With fade-in animation',
    icon: '✨',
    animated: true,
    children: 'This card fades in on load',
  },
}

export const DarkMode: Story = {
  args: {
    title: 'Dark Mode Card',
    children: 'Optimized for dark mode viewing',
  },
  decorators: [
    (StoryComponent: any) => (
      <div className="dark bg-slate-900 p-4 rounded-lg">
        <StoryComponent />
      </div>
    ),
  ],
}

export const CardGrid: Story = {
  args: {
    title: 'Card Grid',
    children: 'Card grid preview',
  },
  render: (): JSX.Element => (
    <div className="grid grid-cols-2 gap-4">
      <Card title="Card 1" icon="1️⃣">
        First card in grid
      </Card>
      <Card title="Card 2" icon="2️⃣">
        Second card in grid
      </Card>
      <Card title="Card 3" icon="3️⃣">
        Third card in grid
      </Card>
      <Card title="Card 4" icon="4️⃣">
        Fourth card in grid
      </Card>
    </div>
  ),
}

export const WithComplexContent: Story = {
  args: {
    title: 'Portfolio Holdings',
    description: 'Your current asset allocation',
    icon: '💼',
    children: (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>ETH</span>
          <span className="text-green-400">+2.5%</span>
        </div>
        <div className="flex justify-between">
          <span>USDC</span>
          <span className="text-slate-400">-0.1%</span>
        </div>
        <div className="flex justify-between">
          <span>DAI</span>
          <span className="text-blue-400">+0.0%</span>
        </div>
      </div>
    ),
  },
}
