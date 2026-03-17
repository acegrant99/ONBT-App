require("dotenv/config");

require("@nomicfoundation/hardhat-ethers");

try {
	require("@nomicfoundation/hardhat-verify");
} catch {
	// verify plugin optional for local migration checks
}

const { EndpointId } = require("@layerzerolabs/lz-definitions");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

module.exports = {
	solidity: {
		version: "0.8.22",
		settings: {
			optimizer: {
				enabled: true,
				runs: 1,
			},
			viaIR: true,
		},
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache-hardhat3-migration",
		artifacts: "./artifacts-hardhat3-migration",
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
		base: {
			url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
			accounts,
			chainId: 8453,
			eid: EndpointId.BASE_V2_MAINNET,
			timeout: 300000,
			pollingInterval: 2000,
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
	},
	sourcify: {
		enabled: true,
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY || "",
	},
};
