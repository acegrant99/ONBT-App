import {
  OAppOmniGraphHardhat,
  OmniPointHardhat,
} from "@layerzerolabs/ua-devtools-evm-hardhat";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import { ExecutorOptionType } from "@layerzerolabs/lz-v2-utilities";

const baseOft: OmniPointHardhat = {
  eid: EndpointId.BASE_V2_MAINNET,
  contractName: "OmnichainNabatOFT",
  address: "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5",
};

const arbitrumOft: OmniPointHardhat = {
  eid: EndpointId.ARBITRUM_V2_MAINNET,
  contractName: "OmnichainNabatOFT",
  address: "0x169aC761Ebb210B5A93B68B44DA394776a7B230C",
};

const sendLibrary = "0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862";
const receiveLibraryBase = "0xc70AB6f32772f59fBfc23889Caf4BA3376C84bAf";
const receiveLibraryArbitrum = "0x7B9E184e07a6EE1D1D323C42E89eF3d93ea0f2e0";

const graph: OAppOmniGraphHardhat = {
  contracts: [{ contract: baseOft }, { contract: arbitrumOft }],
  connections: [
    {
      from: baseOft,
      to: arbitrumOft,
      config: {
        sendLibrary,
        receiveLibraryConfig: {
          receiveLibrary: receiveLibraryBase,
          gracePeriod: 0,
        },
        sendConfig: {
          executorConfig: {
            maxMessageSize: 4294967295,
            executor: "0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4",
          },
          ulnConfig: {
            confirmations: 10,
            requiredDVNs: [
              "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc",
              "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
            ],
            optionalDVNs: [],
            optionalDVNThreshold: 0,
          },
        },
        receiveConfig: {
          ulnConfig: {
            confirmations: 10,
            requiredDVNs: [
              "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc",
              "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
            ],
            optionalDVNs: [],
            optionalDVNThreshold: 0,
          },
        },
        enforcedOptions: [
          {
            msgType: 1,
            optionType: ExecutorOptionType.LZ_RECEIVE,
            gas: 200000,
            value: 0,
          },
        ],
      },
    },
    {
      from: arbitrumOft,
      to: baseOft,
      config: {
        sendLibrary,
        receiveLibraryConfig: {
          receiveLibrary: receiveLibraryArbitrum,
          gracePeriod: 0,
        },
        sendConfig: {
          executorConfig: {
            maxMessageSize: 4294967295,
            executor: "0x31CAe3B7fB82d847621859fb1585353c5720660D",
          },
          ulnConfig: {
            confirmations: 20,
            requiredDVNs: [
              "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc",
              "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
            ],
            optionalDVNs: [],
            optionalDVNThreshold: 0,
          },
        },
        receiveConfig: {
          ulnConfig: {
            confirmations: 20,
            requiredDVNs: [
              "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc",
              "0x8ddf0b8b88f1adba6e3e3c7d546ae06f1b55f5d5",
            ],
            optionalDVNs: [],
            optionalDVNThreshold: 0,
          },
        },
        enforcedOptions: [
          {
            msgType: 1,
            optionType: ExecutorOptionType.LZ_RECEIVE,
            gas: 200000,
            value: 0,
          },
        ],
      },
    },
  ],
};

export default graph;
