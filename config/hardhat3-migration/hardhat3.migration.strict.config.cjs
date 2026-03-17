require("dotenv/config");
require("@nomicfoundation/hardhat-ethers");

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
		cache: "./cache-hardhat3-migration-strict",
		artifacts: "./artifacts-hardhat3-migration-strict",
	},
};
