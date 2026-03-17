require("dotenv/config");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");
require("solidity-coverage");
// import "./tasks/wire-oft.js"; // Commented out temporarily

try {
	require("@layerzerolabs/toolbox-hardhat");
} catch (_err) {
	// Optional plugin: skip when not installed to keep core compile/verify workflow stable.
}

const { EndpointId } = require("@layerzerolabs/lz-definitions");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

module.exports = {
	solidity: {
		compilers: [
			{
				version: "0.8.22",
				settings: {
					optimizer: {
						enabled: true,
						runs: 1,
					},
					viaIR: true,
				},
			},
			{
				version: "0.8.24",
				settings: {
					optimizer: {
						enabled: true,
						runs: 1,
					},
					viaIR: true,
				},
			}
		],
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts"
	},
	networks: {
		hardhat: {
			chainId: 31337,
		},
		ethereum: {
			url: process.env.ETHEREUM_RPC_URL || "",
			accounts,
			chainId: 1,
		},
		sepolia: {
			url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
			accounts,
			chainId: 11155111,
		},
		arbitrum: {
			url: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
			accounts,
			chainId: 42161,
			eid: EndpointId.ARBITRUM_V2_MAINNET,
		},
		arbitrumSepolia: {
			url: process.env.ARBITRUM_SEPOLIA_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc",
			accounts,
			chainId: 421614,
		},
		base: {
			url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
			accounts,
			chainId: 8453,
			eid: EndpointId.BASE_V2_MAINNET,
			timeout: 300000,
			pollingInterval: 2000,
		},
		baseBlockscout: {
			url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
			accounts,
			chainId: 8453,
			timeout: 300000,
			pollingInterval: 2000,
		},
		baseRoutescan: {
			url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
			accounts,
			chainId: 8453,
			timeout: 300000,
			pollingInterval: 2000,
		},
		baseSepolia: {
			url: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
			accounts,
			chainId: 84532,
		},
		optimism: {
			url: process.env.OPTIMISM_RPC_URL || "https://mainnet.optimism.io",
			accounts,
			chainId: 10,
			eid: EndpointId.OPTIMISM_V2_MAINNET,
		},
		polygon: {
			url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
			accounts,
			chainId: 137,
			eid: EndpointId.POLYGON_V2_MAINNET,
		},
		bsc: {
			url: process.env.BSC_RPC_URL || "https://bsc-dataseed1.binance.org",
			accounts,
			chainId: 56,
			eid: EndpointId.BSC_V2_MAINNET,
		},
		avalanche: {
			url: process.env.AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc",
			accounts,
			chainId: 43114,
			eid: EndpointId.AVALANCHE_V2_MAINNET,
		},
		arbitrumBlockscout: {
			url: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
			accounts,
			chainId: 42161,
		},
		arbitrumRoutescan: {
			url: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
			accounts,
			chainId: 42161,
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS === "true",
		currency: "USD",
	},
	sourcify: {
		enabled: true,
	},
	etherscan: {
		apiKey: {
			base: process.env.ETHERSCAN_API_KEY || "",
			arbitrum: process.env.ETHERSCAN_API_KEY || "",
			arbitrumOne: process.env.ETHERSCAN_API_KEY || "",
		},
		customChains: [
			{
				network: "base",
				chainId: 8453,
				urls: {
					apiURL: "https://api.etherscan.io/v2/api",
					browserURL: "https://basescan.org"
				}
			},
			{
				network: "arbitrum",
				chainId: 42161,
				urls: {
					apiURL: "https://api.etherscan.io/v2/api",
					browserURL: "https://arbiscan.io"
				}
			},
			{
				network: "arbitrumSepolia",
				chainId: 421614,
				urls: {
					apiURL: "https://api-sepolia.arbiscan.io/api",
					browserURL: "https://sepolia.arbiscan.io"
				}
			},
			{
				network: "baseSepolia",
				chainId: 84532,
				urls: {
					apiURL: "https://api-sepolia.basescan.org/api",
					browserURL: "https://sepolia.basescan.org"
				}
			},
			{
				network: "baseBlockscout",
				chainId: 8453,
				urls: {
					apiURL: "https://base.blockscout.com/api",
					browserURL: "https://base.blockscout.com"
				}
			},
			{
				network: "arbitrumBlockscout",
				chainId: 42161,
				urls: {
					apiURL: "https://arbitrum.blockscout.com/api",
					browserURL: "https://arbitrum.blockscout.com"
				}
			},
			{
				network: "baseSepoliaBlockscout",
				chainId: 84532,
				urls: {
					apiURL: "https://base-sepolia.blockscout.com/api",
					browserURL: "https://base-sepolia.blockscout.com"
				}
			},
			{
				network: "arbitrumSepoliaBlockscout",
				chainId: 421614,
				urls: {
					apiURL: "https://arbitrum-sepolia.blockscout.com/api",
					browserURL: "https://arbitrum-sepolia.blockscout.com"
				}
			},
			{
				network: "baseRoutescan",
				chainId: 8453,
				urls: {
					apiURL: "https://api.routescan.io/v2/network/mainnet/evm/8453/etherscan/api",
					browserURL: "https://basescan.org"
				}
			},
			{
				network: "arbitrumRoutescan",
				chainId: 42161,
				urls: {
					apiURL: "https://api.routescan.io/v2/network/mainnet/evm/42161/etherscan/api",
					browserURL: "https://arbiscan.io"
				}
			}
		]
	},
};