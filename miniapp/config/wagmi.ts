import { createConfig, http } from 'wagmi';
import { base, arbitrum, mainnet } from 'wagmi/chains';
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors';
import { getAppUrl } from '@/config/app-url';
import { CHAIN_CONFIG } from '@/config/contracts';

const appName = 'ONabat';
const appUrl = getAppUrl();
const appIcon = `${appUrl}/branding/onabat-logo-dark.png`;
const isBrowser = typeof window !== 'undefined';
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const enableWalletConnect = Boolean(walletConnectProjectId && isBrowser);
const defaultBaseRpcUrl = process.env.NODE_ENV === 'development'
  ? 'https://base-rpc.publicnode.com'
  : CHAIN_CONFIG.base.rpcUrl;
const baseRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || defaultBaseRpcUrl;
const arbitrumRpcUrl = process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || CHAIN_CONFIG.arbitrum.rpcUrl;

export const wagmiConfig = createConfig({
  chains: [base, arbitrum, mainnet],
  connectors: [
    metaMask({
      dappMetadata: {
        name: appName,
        url: appUrl,
      },
    }),
    injected({ shimDisconnect: true }),
    ...(enableWalletConnect
      ? [
          walletConnect({
            projectId: walletConnectProjectId!,
            showQrModal: true,
            telemetryEnabled: false,
            disableProviderPing: true,
            metadata: {
              name: appName,
              description: 'ONabat omnichain miniapp',
              url: appUrl,
              icons: [appIcon],
            },
          }),
        ]
      : []),
    coinbaseWallet({
      appName,
      preference: {
        options: 'all',
        telemetry: false,
      },
    }),
  ],
  transports: {
    [base.id]: http(baseRpcUrl, { timeout: 10_000, retryCount: 1 }),
    [arbitrum.id]: http(arbitrumRpcUrl, { timeout: 10_000, retryCount: 1 }),
    [mainnet.id]: http('https://cloudflare-eth.com', { timeout: 10_000, retryCount: 1 }),
  },
});
