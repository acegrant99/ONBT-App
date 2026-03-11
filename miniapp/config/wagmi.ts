import { createConfig, http } from 'wagmi';
import { base, arbitrum } from 'wagmi/chains';
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors';
import { CHAIN_CONFIG } from '@/config/contracts';

const appName = 'ONabat';
const appUrl = process.env.NEXT_PUBLIC_URL || 'https://www.nabat.finance';
const appIcon = `${appUrl}/branding/onabat-logo-dark.png`;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const baseRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || CHAIN_CONFIG.base.rpcUrl;
const arbitrumRpcUrl = process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || CHAIN_CONFIG.arbitrum.rpcUrl;

export const wagmiConfig = createConfig({
  chains: [base, arbitrum],
  connectors: [
    metaMask({
      dappMetadata: {
        name: appName,
        url: appUrl,
      },
    }),
    injected({ shimDisconnect: true }),
    ...(walletConnectProjectId
      ? [
          walletConnect({
            projectId: walletConnectProjectId,
            showQrModal: true,
            metadata: {
              name: appName,
              description: 'ONabat omnichain miniapp',
              url: appUrl,
              icons: [appIcon],
            },
          }),
        ]
      : []),
    coinbaseWallet({ appName }),
  ],
  transports: {
    [base.id]: http(baseRpcUrl, { timeout: 10_000, retryCount: 1 }),
    [arbitrum.id]: http(arbitrumRpcUrl, { timeout: 10_000, retryCount: 1 }),
  },
});
