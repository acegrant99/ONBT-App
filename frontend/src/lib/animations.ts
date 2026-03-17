/**
 * Framer Motion animation variants for consistent animations across the app
 */

import { Variants } from 'framer-motion'

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Fade in from bottom (slide up)
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
}

/**
 * Fade in from top (slide down)
 */
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
}

/**
 * Scale in animation (pop effect)
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

/**
 * Scale out animation
 */
export const scaleOut: Variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
}

/**
 * Rotate in animation
 */
export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -10 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 10 },
}

/**
 * Blur in animation
 */
export const blurIn: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)' },
}

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

/**
 * Modal overlay animation
 */
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Modal content animation
 */
export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
}

/**
 * Slide in from bottom (drawer effect)
 */
export const slideInBottom: Variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
}

/**
 * Slide in from top
 */
export const slideInTop: Variants = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
}

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
}

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
}

/**
 * Bounce animation
 */
export const bounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

/**
 * Pulse animation
 */
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

/**
 * Shake animation (for errors)
 */
export const shake: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
}

/**
 * Card hover animation
 */
export const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: { scale: 0.98 },
}

/**
 * Button hover animation
 */
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: { scale: 0.95 },
}

/**
 * Glow effect animation
 */
export const glow: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(124, 58, 237, 0.5)',
      '0 0 30px rgba(124, 58, 237, 0.8)',
      '0 0 20px rgba(124, 58, 237, 0.5)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

/**
 * Container animation for staggered children
 */
export const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Item animation for use with container
 */
export const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
}

/**
 * Transition configurations
 */
export const transitions = {
  default: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  fast: {
    duration: 0.15,
    ease: 'easeInOut',
  },
  slow: {
    duration: 0.5,
    ease: 'easeInOut',
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
}
