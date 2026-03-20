require("dotenv/config");
require("@nomicfoundation/hardhat-verify");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

module.exports = {
	solidity: {
		compilers: [
			{
				version: "0.8.22",
				settings: { optimizer: { enabled: true, runs: 1 }, viaIR: true },
			},
			{
				version: "0.8.24",
				settings: { optimizer: { enabled: true, runs: 1 }, viaIR: true },
			},
		],
	},
	networks: {
		base: {
			url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
			accounts,
			chainId: 8453,
		},
		arbitrum: {
			url: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
			accounts,
			chainId: 42161,
		},
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
					apiURL: "https://api.etherscan.io/v2/api?chainid=8453",
					browserURL: "https://basescan.org"
				}
			},
			{
				network: "arbitrum",
				chainId: 42161,
				urls: {
					apiURL: "https://api.etherscan.io/v2/api?chainid=42161",
					browserURL: "https://arbiscan.io"
				}
			}
		]
	},
};
