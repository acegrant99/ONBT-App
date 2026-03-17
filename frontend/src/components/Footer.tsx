import { FC } from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Globe, Mail, ExternalLink } from 'lucide-react'
import { BRANDING } from '@/config/branding'

interface FooterLink {
  label: string
  href: string
  icon?: FC<{ className?: string }>
  external?: boolean
}

const FOOTER_SECTIONS = [
  {
    title: 'Protocol',
    links: [
      { label: 'Documentation', href: 'https://nabat.finance/docs' },
      { label: 'Smart Contracts', href: 'https://github.com/acegrant99/ONBT-App' },
      { label: 'Security Audits', href: 'https://nabat.finance/audits' },
      { label: 'Whitepaper', href: 'https://nabat.finance/whitepaper' },
    ],
  },
  {
    title: 'Governance',
    links: [
      { label: 'Proposals', href: '#governance' },
      { label: 'Voting', href: '#governance' },
      { label: 'Treasury', href: '#revenue' },
      { label: 'Forum', href: 'https://forum.nabat.finance' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: 'https://discord.gg/nabat' },
      { label: 'Twitter', href: 'https://twitter.com/nabatonchain' },
      { label: 'Telegram', href: 'https://t.me/nabatofficial' },
      { label: 'GitHub', href: 'https://github.com/acegrant99' },
    ],
  },
]

const SOCIAL_LINKS: FooterLink[] = [
  {
    label: 'Website',
    href: 'https://nabat.finance',
    icon: Globe,
    external: true,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/nabatonchain',
    icon: Twitter,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/acegrant99/ONBT-App',
    icon: Github,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:nabatomnichain@gmail.com',
    icon: Mail,
    external: true,
  },
]

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-black/50"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <img src={BRANDING.logos.mark} alt={BRANDING.name} className="h-8 w-8 rounded-full" />
              <div>
                <h3 className="text-sm font-bold text-white">{BRANDING.name}</h3>
                <p className="text-xs text-slate-400">Omnichain DeFi</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Building the future of omnichain finance with LayerZero V2 technology.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-400 hover:text-purple-400 transition"
                    title={link.label}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {FOOTER_SECTIONS.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-sm font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-200 transition flex items-center gap-1 group"
                      whileHover={{ x: 2 }}
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/30" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xs text-slate-400"
          >
            <p>
              © {currentYear} {BRANDING.name}. All rights reserved.
            </p>
            <p className="mt-1">
              Built with ❤️ on{' '}
              <motion.a
                href="https://layerzero.network"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ color: '#a855f7' }}
                className="text-slate-300 hover:text-purple-400 transition"
              >
                LayerZero V2
              </motion.a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-4 text-xs text-slate-400"
          >
            <motion.a
              href="https://nabat.finance/privacy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#e2e8f0' }}
              className="hover:text-slate-200 transition"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="https://nabat.finance/terms"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#e2e8f0' }}
              className="hover:text-slate-200 transition"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="https://nabat.finance/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#e2e8f0' }}
              className="hover:text-slate-200 transition"
            >
              Disclaimer
            </motion.a>
          </motion.div>
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 rounded-lg border border-green-500/30 bg-green-900/20 p-3"
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-200">
              Protocol Status: <strong>FULLY OPERATIONAL</strong> • Last Updated: Feb 21, 2026
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
