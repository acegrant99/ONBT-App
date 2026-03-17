import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from '../context/ThemeContext'

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InHeader: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="bg-slate-900 dark:bg-white p-4 flex items-center justify-between">
      <h1 className="text-white dark:text-slate-900">Header</h1>
      <ThemeToggle />
    </div>
  ),
}
