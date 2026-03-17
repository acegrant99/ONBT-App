import type { Meta, StoryObj } from '@storybook/react'
import { PaymentStatus, type PaymentStatus as PaymentStatusType } from '../components/PaymentStatus'

const meta = {
  title: 'Components/PaymentStatus',
  component: PaymentStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = {
  args: {
    status: 'pending' as PaymentStatusType,
    message: 'Transaction is pending...',
    hash: '0x1234567890abcdef',
  },
}

export const Confirmed: Story = {
  args: {
    status: 'success' as PaymentStatusType,
    message: 'Transaction confirmed!',
    hash: '0x1234567890abcdef',
  },
}

export const Failed: Story = {
  args: {
    status: 'error' as PaymentStatusType,
    message: 'Transaction failed',
    hash: '0x1234567890abcdef',
  },
}

export const Submitted: Story = {
  args: {
    status: 'pending' as PaymentStatusType,
    message: 'Transaction submitted to network',
    hash: '0x1234567890abcdef',
  },
}

export const PendingWithMessage: Story = {
  args: {
    status: 'pending' as PaymentStatusType,
    message: 'Waiting for confirmation...',
    hash: '0xabc123def456',
  },
  render: (args: any) => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-400 mb-2">Transaction Status</p>
        <PaymentStatus {...args} />
      </div>
      <div className="text-xs text-slate-500">
        Waiting for confirmation on the blockchain...
      </div>
    </div>
  ),
}

export const AllStatuses: Story = {
  args: {
    status: 'pending' as PaymentStatusType,
    message: 'Status preview',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm text-slate-400 mb-2">Pending</h4>
        <PaymentStatus status="pending" message="Waiting for confirmation..." hash="0x1234" />
      </div>
      <div>
        <h4 className="text-sm text-slate-400 mb-2">Success</h4>
        <PaymentStatus status="success" message="Transaction confirmed!" hash="0x1234" />
      </div>
      <div>
        <h4 className="text-sm text-slate-400 mb-2">Error</h4>
        <PaymentStatus status="error" message="Transaction failed" hash="0x1234" />
      </div>
    </div>
  ),
}
