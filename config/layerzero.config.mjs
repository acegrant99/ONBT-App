const config = {
  contracts: [
    {
      contractName: "OmnichainNabatOFT",
      address: "0x49CC2d976bfA93D90E9975e52Fd9DC57043b406c",
      endpointId: 30184, // Base mainnet EID
    },
    {
      contractName: "OmnichainNabatOFT",
      address: "0x42bB5FD891c070A64d31752855E94A01edDd766E",
      endpointId: 30110, // Arbitrum mainnet EID
    },
  ],
  connections: [
    {
      from: 30184,
      to: 30110,
      executor: {
        address: "0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4",
      },
      dvn: {
        confirmations: 10,
        required: [
          "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc", // Google Cloud Oracle
          "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5", // Polyhedra
        ],
        optional: [],
        optionalThreshold: 0,
      },
    },
    {
      from: 30110,
      to: 30184,
      executor: {
        address: "0x31CAe3B7fB82d847621859fb1585353c5720660D",
      },
      dvn: {
        confirmations: 20,
        required: [
          "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc", // Google Cloud Oracle
          "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5", // Polyhedra
        ],
        optional: [],
        optionalThreshold: 0,
      },
    },
  ],
};

export default config;
