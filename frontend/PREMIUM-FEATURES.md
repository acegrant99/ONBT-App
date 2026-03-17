# Premium Frontend Features Guide

## 🎨 UI Components (Radix UI)

Headless, accessible components with full customization:

```tsx
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tabs from '@radix-ui/react-tabs'
import * as Switch from '@radix-ui/react-switch'
import * as Slider from '@radix-ui/react-slider'
import * as Progress from '@radix-ui/react-progress'
import * as Avatar from '@radix-ui/react-avatar'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
```

### Example: Dialog Modal

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open Modal</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-6 rounded-lg">
      <Dialog.Title>Modal Title</Dialog.Title>
      <Dialog.Description>Modal content here</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

---

## ✨ Animations (Framer Motion)

Smooth, performant animations with pre-built variants:

```tsx
import { motion } from 'framer-motion'
import { fadeInUp, scaleIn, cardHover } from '@/lib/animations'

// Fade in animation
<motion.div
  variants={fadeInUp}
  initial="initial"
  animate="animate"
  exit="exit"
>
  Content
</motion.div>

// Card with hover effect
<motion.div
  variants={cardHover}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
>
  Card content
</motion.div>

// Custom animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Available Animation Variants

- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `scaleOut`, `rotateIn`, `blurIn`
- `slideInBottom`, `slideInTop`, `slideInLeft`, `slideInRight`
- `bounce`, `pulse`, `shake`, `glow`
- `cardHover`, `buttonHover`
- `modalOverlay`, `modalContent`
- `staggerContainer` (for animating children)

---

## 🔔 Toast Notifications (React Hot Toast)

Beautiful, customizable toast notifications:

```tsx
import { toastSuccess, toastError, toastLoading, toastPromise, toastTransaction } from '@/lib/toast'

// Success toast
toastSuccess('Transaction completed!')

// Error toast
toastError('Something went wrong')

// Loading toast
const toastId = toastLoading('Processing...')
// Later: toast.dismiss(toastId)

// Promise toast (auto-handles loading/success/error)
toastPromise(
  myPromise,
  {
    loading: 'Processing...',
    success: 'Done!',
    error: 'Failed!',
  }
)

// Transaction toast with block explorer link
toastTransaction(txHash, chainId)
```

---

## 🎯 Icons (Lucide React)

Beautiful, consistent icons:

```tsx
import { Wallet, Send, ArrowRight, Check, X, Menu, Settings } from 'lucide-react'

<Wallet className="h-5 w-5" />
<Send size={20} color="white" />
<ArrowRight strokeWidth={2} />
```

Browse all icons: https://lucide.dev/icons/

---

## 📝 Forms (React Hook Form + Zod)

Type-safe form validation:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid address'),
})

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('amount')} />
      {errors.amount && <span>{errors.amount.message}</span>}
      
      <input {...register('address')} />
      {errors.address && <span>{errors.address.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## 📊 Charts (Recharts)

Beautiful, responsive charts:

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
]

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#7c3aed" />
  </LineChart>
</ResponsiveContainer>
```

---

## 🛠 Utility Functions

### className Merging (cn)

```tsx
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class', className)} />
```

### Number Formatting

```tsx
import { formatNumber, formatUSD, formatPercent, formatTokenAmount } from '@/lib/utils'

formatNumber(1234567) // "1.23M"
formatUSD(1234.56) // "$1,234.56"
formatPercent(12.5) // "12.50%"
formatTokenAmount(BigInt('1000000000000000000'), 18) // "1.0"
```

### Address Formatting

```tsx
import { formatAddress, isValidAddress } from '@/lib/utils'

formatAddress('0x1234...5678') // "0x1234...5678"
isValidAddress('0x...') // true/false
```

### Date/Time

```tsx
import { formatRelativeTime, formatDate, formatDuration } from '@/lib/utils'

formatRelativeTime(new Date()) // "2 hours ago"
formatDate(new Date()) // "January 1, 2026"
formatDuration(startDate, endDate) // "2 days"
```

### Copy to Clipboard

```tsx
import { copyToClipboard } from '@/lib/utils'

await copyToClipboard('0x1234...')
```

---

## 🎣 Custom Hooks

### Copy with Toast

```tsx
import { useCopyToClipboard } from '@/lib/hooks'

const { copy, copied } = useCopyToClipboard()

<button onClick={() => copy(address, 'Address')}>
  {copied ? 'Copied!' : 'Copy'}
</button>
```

### User Preferences

```tsx
import { useUserPreferences } from '@/lib/hooks'

const { theme, setTheme, slippage, setSlippage } = useUserPreferences()
```

### Modal State

```tsx
import { useModal } from '@/lib/hooks'

const { isOpen, open, close, toggle } = useModal()

<button onClick={open}>Open Modal</button>
<Dialog.Root open={isOpen} onOpenChange={close}>
  ...
</Dialog.Root>
```

### Countdown Timer

```tsx
import { useCountdown } from '@/lib/hooks'

const { days, hours, minutes, seconds, formatted } = useCountdown(endTimestamp)

<div>{formatted}</div> // "2d 5h 30m 15s"
```

### Responsive Breakpoints

```tsx
import { useBreakpoint } from '@/lib/hooks'

const { isMobile, isTablet, isDesktop, width } = useBreakpoint()

{isMobile ? <MobileView /> : <DesktopView />}
```

### Auto-Refresh

```tsx
import { useAutoRefresh } from '@/lib/hooks'

useAutoRefresh(() => {
  refetchBalance()
  refetchStakingInfo()
}, 10000) // Refresh every 10 seconds
```

### Scroll Position

```tsx
import { useScrollPosition } from '@/lib/hooks'

const { scrollY, isScrolled } = useScrollPosition()

<header className={cn('header', isScrolled && 'scrolled')} />
```

### Element Visibility

```tsx
import { useInView } from '@/lib/hooks'

const { ref, isInView } = useInView()

<div ref={ref}>
  {isInView && <AchievementAnimation />}
</div>
```

---

## 📦 Additional Premium Dependencies

- **date-fns**: Modern date utility library
- **qrcode.react**: QR code generation for wallet addresses
- **ethereum-blockies-base64**: Generate wallet avatar images
- **react-markdown + remark-gfm**: Render markdown content
- **react-countdown**: Countdown timer component
- **react-confetti**: Celebration effects for achievements
- **use-sound**: Sound effects (optional)
- **vaul**: Drawer/bottom sheet component

---

## 🎨 Example: Enhanced Card Component

```tsx
import { motion } from 'framer-motion'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'
import { cardHover, fadeInUp } from '@/lib/animations'
import { cn, formatNumber } from '@/lib/utils'

interface CardProps {
  title: string
  value: string
  tooltip?: string
  className?: string
}

export function EnhancedCard({ title, value, tooltip, className }: CardProps) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        'rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        {tooltip && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="text-slate-500 hover:text-slate-300">
                  <Info size={16} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className="rounded bg-slate-950 px-3 py-2 text-sm text-white shadow-lg">
                {tooltip}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold text-white">{formatNumber(value)}</p>
    </motion.div>
  )
}
```

---

## 🚀 Getting Started

All premium dependencies are installed and configured. Import what you need:

```tsx
// Animations
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

// Toasts
import { toastSuccess, toastError } from '@/lib/toast'

// Icons
import { Wallet, Send } from 'lucide-react'

// Utils
import { cn, formatNumber } from '@/lib/utils'

// Hooks
import { useCopyToClipboard, useModal } from '@/lib/hooks'

// UI Components
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
```

Check the dev server console for RPC configuration status!
