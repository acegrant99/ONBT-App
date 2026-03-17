import type { Metadata } from 'next';
import { SafeArea } from '@coinbase/onchainkit/minikit';
import '@coinbase/onchainkit/styles.css';
import { ClientProviders } from '@/providers';
import { getServerAppUrl } from '@/config/app-url';
import { minikitConfig } from '@/minikit.config';
import './globals.css';

const ROOT_URL = getServerAppUrl();

const FC_MINIAPP = JSON.stringify({
  version: minikitConfig.miniapp.version,
  imageUrl: minikitConfig.miniapp.heroImageUrl,
  button: {
    title: `Open ${minikitConfig.miniapp.name}`,
    action: {
      type: 'launch_miniapp',
      name: minikitConfig.miniapp.name,
      url: minikitConfig.miniapp.homeUrl,
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
    },
  },
});

export const metadata: Metadata = {
  title: 'ONabat — Omnichain ONBT',
  description: minikitConfig.miniapp.description,
  icons: {
    icon: minikitConfig.miniapp.iconUrl,
    apple: minikitConfig.miniapp.iconUrl,
  },
  openGraph: {
    title: minikitConfig.miniapp.ogTitle,
    description: minikitConfig.miniapp.ogDescription,
    url: ROOT_URL,
    siteName: minikitConfig.miniapp.name,
    images: [
      {
        url: minikitConfig.miniapp.ogImageUrl,
        width: 1200,
        height: 628,
        alt: minikitConfig.miniapp.name,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: minikitConfig.miniapp.ogTitle,
    description: minikitConfig.miniapp.ogDescription,
    images: [minikitConfig.miniapp.ogImageUrl],
  },
  other: {
    'base:app_id': '69a3aa8e4036d91576063bba',
    'fc:miniapp': FC_MINIAPP,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <SafeArea>{children}</SafeArea>
        </ClientProviders>
      </body>
    </html>
  );
}
