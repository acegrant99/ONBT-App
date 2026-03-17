import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/Input'
import { Wallet, Lock } from 'lucide-react'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    type: 'email',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter secure password',
    type: 'password',
    hint: 'Must be at least 8 characters',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Wallet Address',
    placeholder: '0x...',
    icon: <Wallet size={16} />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    error: 'Insufficient balance',
    value: '1000',
  },
}

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'john_doe',
    success: true,
    value: 'john_doe',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Readonly Field',
    placeholder: 'This is disabled',
    disabled: true,
    value: 'Disabled',
  },
}

export const PasswordField: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    icon: <Lock size={16} />,
  },
}

export const NumberInput: Story = {
  args: {
    label: 'Amount (ONBT)',
    type: 'number',
    placeholder: '0.00',
    min: '0',
    step: '0.01',
  },
}

export const FormLayout: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Name" placeholder="John Doe" />
      <Input label="Email" placeholder="john@example.com" type="email" />
      <Input label="Message" placeholder="Your message..." />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  ),
}
