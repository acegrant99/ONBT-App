# ONBT Branding Guide

**Last Updated:** February 21, 2026  
**Status:** ✅ Complete

---

## 🎨 Brand Identity

### Official Name
**Omnichain Nabat (ONBT)** - The decentralized token ecosystem with achievements

### Tagline
"The decentralized token ecosystem with achievements"

### Short Name
ONBT

---

## 🖼️ Logo Assets

All logos are hosted on **Pinata IPFS** for maximum availability and decentralization.

### Primary Logo
**Usage:** Main branding, marketing materials, presentations  
**Format:** Square (1:1 aspect ratio)  
**URL:** 
```
https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafybeiathkcuucabxdrikkk7ew5hryc7bapldu2winwelohc3n6nuuwdwy
```

**Code Reference:** `BRANDING.logos.primary`

---

### Alternative Logo
**Usage:** Alternate branding contexts  
**Format:** Square (1:1 aspect ratio)  
**URL:**
```
https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafybeif6dkgik52f7wb5jxuc67bwtdqtejcsm3hqcldlksjdw74udhewme
```

**Code Reference:** `BRANDING.logos.alternative`

---

### Horizontal Logo
**Usage:** Headers, footers, navigation bars  
**Format:** Rectangular (wider format)  
**URL:**
```
https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafybeihxra6rc5nheyaxcsfcsqsdmf4rnzdhstsd44e5oqilurzhccf2pi
```

**Code Reference:** `BRANDING.logos.horizontal`

---

### Icon / Mark
**Usage:** Favicons, small UI elements, app icons  
**Format:** Square mark/icon only  
**URL:**
```
https://harlequin-adjacent-bovid-525.mypinata.cloud/ipfs/bafkreigjb7v4h7ttwigkjxwlz357iml5h7njn7thtwnljor5e5m527cghq
```

**Code Reference:** `BRANDING.logos.mark`

---

## 🎯 Brand Colors

```typescript
{
  primary: '#7c3aed',     // Purple - Primary brand color
  secondary: '#10b981',   // Green - Secondary accent
  accent: '#3b82f6',      // Blue - Call-to-action
  danger: '#ef4444',      // Red - Destructive actions
  warning: '#f59e0b',     // Orange - Warnings
  success: '#10b981',     // Green - Success states
}
```

**Code Reference:** `BRANDING.colors`

---

## 🔗 Official Links

### Social Media
- **Twitter:** https://twitter.com/onbtprotocol
- **Discord:** https://discord.gg/onbt
- **GitHub:** https://github.com/onbt-protocol

### Web
- **Website:** https://onbt.io
- **Documentation:** https://docs.onbt.io
- **Terms of Service:** https://onbt.io/terms
- **Privacy Policy:** https://onbt.io/privacy

**Code Reference:** `BRANDING.social` and `BRANDING.links`

---

## 💻 Using Branding in Code

### Import the Branding Config
```tsx
import { BRANDING } from '@config/branding'
```

### Use Logos in Components
```tsx
{/* Header with logo */}
<img src={BRANDING.logos.mark} alt="ONBT" className="h-8 w-8" />

{/* Welcome screen with primary logo */}
<img src={BRANDING.logos.primary} alt="ONBT" className="h-24 w-24" />

{/* Footer with horizontal logo */}
<img src={BRANDING.logos.horizontal} alt="ONBT" className="h-6" />
```

### Use Brand Name
```tsx
<h1>{BRANDING.name}</h1>
<p>{BRANDING.tagline}</p>
<a href={BRANDING.social.twitter}>Follow us on Twitter</a>
```

### Use Brand Colors
```tsx
<div style={{ color: BRANDING.colors.primary }}>
  Purple text
</div>
```

---

## 📦 Configuration File Location

All branding configuration is centralized in:
```
frontend/src/config/branding.ts
```

This ensures consistency across the entire application.

---

## 🔄 Integration Points

### Automatic Integration
The following have been automatically updated to use branding:

1. **App Header** (`App.tsx`)
   - Logo displayed in header
   - Brand name displayed
   - Responsive logo sizing

2. **ConnectKit Provider** (`providers.tsx`)
   - App name
   - App description
   - App icon
   - Website URL

3. **Welcome Screen** (`App.tsx`)
   - Primary logo display
   - Brand tagline
   - App description

4. **Footer** (`App.tsx`)
   - Brand name in copyright notice

---

## 🎨 Brand Guidelines

### Logo Usage
- ✅ **DO:** Use logos on solid backgrounds
- ✅ **DO:** Maintain aspect ratio
- ✅ **DO:** Provide adequate white space
- ❌ **DON'T:** Stretch or distort logos
- ❌ **DON'T:** Change colors
- ❌ **DON'T:** Remove transparency (where applicable)

### Color Usage
- ✅ **DO:** Use primary color (#7c3aed) for main actions
- ✅ **DO:** Use accent color (#3b82f6) for secondary actions
- ✅ **DO:** Use danger/warning colors appropriately for states
- ❌ **DON'T:** Use brand colors without sufficient contrast to text
- ❌ **DON'T:** Change or modify brand colors

### Typography
- Font: Inter (via Google Fonts)
- Primary headings: Bold weight
- Body text: Regular weight
- Small text: 12px or larger for readability

---

## 🚀 Deployment Checklist

- [x] Branding config created (`branding.ts`)
- [x] App.tsx updated with logo and branding
- [x] Providers.tsx updated with branding info
- [x] All logo URLs are working (Pinata hosted)
- [x] Brand colors defined
- [x] Social links configured
- [x] Documentation complete

---

## 📝 Notes

- All assets are hosted on Pinata IPFS for decentralized access
- Logo URLs include Pinata gateway tokens for reliable access
- Branding is centralized for easy updates
- All components reference branding config for consistency

---

**Ready to deploy with official ONBT branding!** 🚀
