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
};
