// LayerZero Chain IDs and Endpoint Addresses
// Reference: https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids

export const LayerZeroChainIds = {
  ethereum: 101,
  bsc: 102,
  avalanche: 106,
  polygon: 109,
  arbitrum: 110,
  optimism: 111,
  base: 184,
} as const;

// LayerZero Endpoint addresses for each chain
export const LayerZeroEndpoints = {
  // Mainnet Endpoints
  ethereum: "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
  bsc: "0x3c2269811836af69497E5F486A85D7316753cf62",
  avalanche: "0x3c2269811836af69497E5F486A85D7316753cf62",
  polygon: "0x3c2269811836af69497E5F486A85D7316753cf62",
  arbitrum: "0x3c2269811836af69497E5F486A85D7316753cf62",
  optimism: "0x3c2269811836af69497E5F486A85D7316753cf62",
  base: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  
  // Testnet Endpoints
  baseSepolia: "0x6EDCE65403992e310A62460808c4b910D972f10f",
  goerli: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
  mumbai: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
} as const;

// Gas limits for cross-chain operations
export const GasLimits = {
  send: 200000,
  sendAndCall: 400000,
} as const;

// Trusted remote addresses (to be set after deployment)
export interface TrustedRemote {
  [chainId: number]: string;
}

export const ChainConfig = {
  ethereum: {
    lzChainId: LayerZeroChainIds.ethereum,
    endpoint: LayerZeroEndpoints.ethereum,
    name: "Ethereum",
  },
  base: {
    lzChainId: LayerZeroChainIds.base,
    endpoint: LayerZeroEndpoints.base,
    name: "Base",
  },
  baseSepolia: {
    lzChainId: 10245, // Base Sepolia testnet chain ID
    endpoint: LayerZeroEndpoints.baseSepolia,
    name: "Base Sepolia",
  },
  bsc: {
    lzChainId: LayerZeroChainIds.bsc,
    endpoint: LayerZeroEndpoints.bsc,
    name: "BSC",
  },
  polygon: {
    lzChainId: LayerZeroChainIds.polygon,
    endpoint: LayerZeroEndpoints.polygon,
    name: "Polygon",
  },
  arbitrum: {
    lzChainId: LayerZeroChainIds.arbitrum,
    endpoint: LayerZeroEndpoints.arbitrum,
    name: "Arbitrum",
  },
  optimism: {
    lzChainId: LayerZeroChainIds.optimism,
    endpoint: LayerZeroEndpoints.optimism,
    name: "Optimism",
  },
  avalanche: {
    lzChainId: LayerZeroChainIds.avalanche,
    endpoint: LayerZeroEndpoints.avalanche,
    name: "Avalanche",
  },
} as const;
