import type { Meta, StoryObj } from '@storybook/react'
import {
  DashboardSkeleton,
  CardSkeleton,
  TableRowSkeleton,
  LoadingSpinner,
} from '../components/LoadingSkeletons'

const meta = {
  title: 'Components/LoadingSkeletons',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const DashboardLoading: StoryObj = {
  render: () => <DashboardSkeleton />,
}

export const StakingLoading: StoryObj = {
  render: () => <TableRowSkeleton />,
}

export const BridgeLoading: StoryObj = {
  render: () => <CardSkeleton />,
}

export const ChartLoading: StoryObj = {
  render: () => <LoadingSpinner />,
}

export const CardLoading: StoryObj = {
  render: () => <CardSkeleton />,
}

export const MultipleSkeletons: StoryObj = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="bg-slate-800 p-4 rounded-lg">
        <p className="text-sm text-slate-400 mb-4">Dashboard Loading</p>
        <DashboardSkeleton />
      </div>
      <div className="bg-slate-800 p-4 rounded-lg">
        <p className="text-sm text-slate-400 mb-4">Card Loading</p>
        <CardSkeleton />
      </div>
      <div className="bg-slate-800 p-4 rounded-lg">
        <p className="text-sm text-slate-400 mb-4">Table Loading</p>
        <TableRowSkeleton />
      </div>
    </div>
  ),
}
