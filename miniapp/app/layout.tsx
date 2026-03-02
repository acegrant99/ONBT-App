import type { Metadata } from 'next';
import { ClientProviders } from '@/providers';
import './globals.css';

const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'https://www.nabat.finance';

// Farcaster Mini App embed
const FC_MINIAPP = JSON.stringify({
  version: '1',
  imageUrl: `${ROOT_URL}/branding/onabat-logo-dark.png`,
  button: {
    title: 'Open ONabat',
    action: {
      type: 'launch_miniapp',
      name: 'ONabat',
      url: ROOT_URL,
      splashImageUrl: `${ROOT_URL}/branding/onabat-logo-dark.png`,
      splashBackgroundColor: '#0f1f1c',
    },
  },
});

export const metadata: Metadata = {
  title: 'ONabat — Omnichain ONBT',
  description: 'Buy, bridge, and stake ONBT across Base and Arbitrum. Powered by LayerZero V2.',
  icons: {
    icon: `${ROOT_URL}/branding/onabat-logo-dark.png`,
    apple: `${ROOT_URL}/branding/onabat-logo-dark.png`,
  },
  openGraph: {
    title: 'ONabat — Omnichain ONBT',
    description: 'Buy, bridge, and stake ONBT across Base and Arbitrum.',
    url: ROOT_URL,
    siteName: 'ONabat',
    images: [
      {
        url: `${ROOT_URL}/branding/onabat-logo-dark.png`,
        width: 1200,
        height: 628,
        alt: 'ONabat',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONabat — Omnichain ONBT',
    description: 'Buy, bridge, and stake ONBT across Base and Arbitrum.',
    images: [`${ROOT_URL}/branding/onabat-logo-dark.png`],
  },
  // Farcaster / Coinbase Wallet meta — rendered via Next.js metadata, no manual <head> needed
  other: {
    'base:app_id': '69a3aa8e4036d91576063bba',
    'fc:miniapp': FC_MINIAPP,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
