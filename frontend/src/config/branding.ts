/**
 * ONBT Branding Configuration
 * Contains logos, colors, and brand assets
 */

export const BRANDING = {
  name: 'ONBT Ecosystem',
  tagline: 'The decentralized token ecosystem with achievements',
  shortName: 'ONBT',

  // Logo URLs (Pinata IPFS hosted)
  logos: {
    // Main logo
    primary: 'https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy',

    // Alternative logo
    alternative: 'https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafybeif6dkgik52f7wb5jxuc67bwtdqtejcsm3hqcldlksjdw74udhewme',

    // Horizontal logo for header/footer
    horizontal: 'https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafybeihxra6rc5nheyaxcsfcsqsdmf4rnzdhstsd44e5oqilurzhccf2pi',

    // Icon/mark only
    mark: 'https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafkreigjb7v4h7ttwigkjxwlz357iml5h7njn7thtwnljor5e5m527cghq',
  },

  // Brand colors
  colors: {
    primary: '#7c3aed', // Purple
    secondary: '#10b981', // Green
    accent: '#3b82f6', // Blue
    danger: '#ef4444', // Red
    warning: '#f59e0b', // Orange
    success: '#10b981', // Green
  },

  // Social links
  social: {
    twitter: 'https://twitter.com/onbtprotocol',
    discord: 'https://discord.gg/onbt',
    github: 'https://github.com/onbt-protocol',
    website: 'https://onbt.io',
  },

  // Links
  links: {
    documentation: 'https://docs.onbt.io',
    terms: 'https://onbt.io/terms',
    privacy: 'https://onbt.io/privacy',
  },
}

export default BRANDING
