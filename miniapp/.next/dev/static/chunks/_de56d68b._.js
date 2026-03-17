(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/config/app-url.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAppUrl",
    ()=>getAppUrl,
    "getServerAppUrl",
    ()=>getServerAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEV_APP_URL = 'http://localhost:3000';
function getAppUrl() {
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.origin) {
        return window.location.origin;
    }
    if ("TURBOPACK compile-time truthy", 1) return DEV_APP_URL;
    //TURBOPACK unreachable
    ;
}
function getServerAppUrl() {
    if ("TURBOPACK compile-time truthy", 1) return DEV_APP_URL;
    //TURBOPACK unreachable
    ;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/config/abis/OmnichainNabatOFT.abi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auto-extracted from compiled artifact: OmnichainNabatOFT.json
// Do not edit manually — re-run scripts/sync-abis.mjs to regenerate
__turbopack_context__.s([
    "OmnichainNabatOFT_ABI",
    ()=>OmnichainNabatOFT_ABI
]);
const OmnichainNabatOFT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_lzEndpoint",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountSD",
                "type": "uint256"
            }
        ],
        "name": "AmountSDOverflowed",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDelegate",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidEndpointCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidLocalDecimals",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "options",
                "type": "bytes"
            }
        ],
        "name": "InvalidOptions",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LzTokenUnavailable",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "NoPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "msgValue",
                "type": "uint256"
            }
        ],
        "name": "NotEnoughNative",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "OnlyEndpoint",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
            }
        ],
        "name": "OnlyPeer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlySelf",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "result",
                "type": "bytes"
            }
        ],
        "name": "SimulationResult",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountLD",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountLD",
                "type": "uint256"
            }
        ],
        "name": "SlippageExceeded",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "eid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "msgType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "options",
                        "type": "bytes"
                    }
                ],
                "indexed": false,
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
            }
        ],
        "name": "EnforcedOptionSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "inspector",
                "type": "address"
            }
        ],
        "name": "MsgInspectorSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "guid",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "srcEid",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "toAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountReceivedLD",
                "type": "uint256"
            }
        ],
        "name": "OFTReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "guid",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "dstEid",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountSentLD",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountReceivedLD",
                "type": "uint256"
            }
        ],
        "name": "OFTSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "name": "PeerSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "preCrimeAddress",
                "type": "address"
            }
        ],
        "name": "PreCrimeSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "SEND",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "SEND_AND_CALL",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "origin",
                "type": "tuple"
            }
        ],
        "name": "allowInitializePath",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "approvalRequired",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "_msgType",
                "type": "uint16"
            },
            {
                "internalType": "bytes",
                "name": "_extraOptions",
                "type": "bytes"
            }
        ],
        "name": "combineOptions",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimalConversionRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endpoint",
        "outputs": [
            {
                "internalType": "contract ILayerZeroEndpointV2",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "msgType",
                "type": "uint16"
            }
        ],
        "name": "enforcedOptions",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "enforcedOption",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "isComposeMsgSender",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
            }
        ],
        "name": "isPeer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "lzReceive",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "uint32",
                                "name": "srcEid",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "sender",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "uint64",
                                "name": "nonce",
                                "type": "uint64"
                            }
                        ],
                        "internalType": "struct Origin",
                        "name": "origin",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "guid",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "executor",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "message",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraData",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct InboundPacket[]",
                "name": "_packets",
                "type": "tuple[]"
            }
        ],
        "name": "lzReceiveAndRevert",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "lzReceiveSimulate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "msgInspector",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "nextNonce",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "nonce",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oApp",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oAppVersion",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "senderVersion",
                "type": "uint64"
            },
            {
                "internalType": "uint64",
                "name": "receiverVersion",
                "type": "uint64"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oftVersion",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            },
            {
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "peers",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "preCrime",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "to",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraOptions",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "composeMsg",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "oftCmd",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
            }
        ],
        "name": "quoteOFT",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxAmountLD",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OFTLimit",
                "name": "oftLimit",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "feeAmountLD",
                        "type": "int256"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    }
                ],
                "internalType": "struct OFTFeeDetail[]",
                "name": "oftFeeDetails",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amountSentLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountReceivedLD",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OFTReceipt",
                "name": "oftReceipt",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "to",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraOptions",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "composeMsg",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "oftCmd",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
            },
            {
                "internalType": "bool",
                "name": "_payInLzToken",
                "type": "bool"
            }
        ],
        "name": "quoteSend",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessagingFee",
                "name": "msgFee",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "to",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraOptions",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "composeMsg",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "oftCmd",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessagingFee",
                "name": "_fee",
                "type": "tuple"
            },
            {
                "internalType": "address",
                "name": "_refundAddress",
                "type": "address"
            }
        ],
        "name": "send",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "guid",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "nativeFee",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lzTokenFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct MessagingFee",
                        "name": "fee",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct MessagingReceipt",
                "name": "msgReceipt",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amountSentLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountReceivedLD",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OFTReceipt",
                "name": "oftReceipt",
                "type": "tuple"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
            }
        ],
        "name": "setDelegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "eid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "msgType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "options",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
            }
        ],
        "name": "setEnforcedOptions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_msgInspector",
                "type": "address"
            }
        ],
        "name": "setMsgInspector",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
            }
        ],
        "name": "setPeer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_preCrime",
                "type": "address"
            }
        ],
        "name": "setPreCrime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sharedDecimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/config/abis/ONBTOmnichainStaking.abi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auto-extracted from compiled artifact: ONBTOmnichainStaking.json
// Do not edit manually — re-run scripts/sync-abis.mjs to regenerate
__turbopack_context__.s([
    "ONBTOmnichainStaking_ABI",
    ()=>ONBTOmnichainStaking_ABI
]);
const ONBTOmnichainStaking_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_lzEndpoint",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_onbtToken",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "_localEid",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "_hubChainEid",
                "type": "uint32"
            },
            {
                "internalType": "bool",
                "name": "_isHub",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDelegate",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidEndpointCall",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "options",
                "type": "bytes"
            }
        ],
        "name": "InvalidOptions",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LzTokenUnavailable",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "NoPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "msgValue",
                "type": "uint256"
            }
        ],
        "name": "NotEnoughNative",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "OnlyEndpoint",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
            }
        ],
        "name": "OnlyPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "enum ONBTOmnichainStaking.Achievement",
                "name": "achievement",
                "type": "uint8"
            }
        ],
        "name": "AchievementUnlocked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Compounded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "srcEid",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CrossChainStakeSynced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "delegator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromDelegate",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "toDelegate",
                "type": "address"
            }
        ],
        "name": "DelegateChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "delegate",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "previousBalance",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newBalance",
                "type": "uint256"
            }
        ],
        "name": "DelegateVotesChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "eid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "msgType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "options",
                        "type": "bytes"
                    }
                ],
                "indexed": false,
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
            }
        ],
        "name": "EnforcedOptionSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
            }
        ],
        "name": "LeaderboardUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "name": "PeerSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldRate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newRate",
                "type": "uint256"
            }
        ],
        "name": "RewardRateUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "RewardTokenAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "RewardTokenRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "RewardsClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "RewardsSynced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockup",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "lockupEnd",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Unstaked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MAX_LOCKUP",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MIN_STAKE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MSG_CLAIM_REWARDS",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MSG_COMPOUND",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MSG_STAKE",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MSG_SYNC_REWARDS",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MSG_UNSTAKE",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "achievementNFT",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "achievementsBitmap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "addRewardToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "origin",
                "type": "tuple"
            }
        ],
        "name": "allowInitializePath",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseRewardRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "_msgType",
                "type": "uint16"
            },
            {
                "internalType": "bytes",
                "name": "_extraOptions",
                "type": "bytes"
            }
        ],
        "name": "combineOptions",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "compound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "compoundWithFee",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "name": "crossChainStakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "delegatee",
                "type": "address"
            }
        ],
        "name": "delegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "delegatedVotes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "delegates",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "delegatorCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "earned",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "emergencyWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endpoint",
        "outputs": [
            {
                "internalType": "contract ILayerZeroEndpointV2",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "msgType",
                "type": "uint16"
            }
        ],
        "name": "enforcedOptions",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "enforcedOption",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getCurrentDelegate",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getLeaderboardRank",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockup",
                "type": "uint8"
            }
        ],
        "name": "getLockupBonus",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockup",
                "type": "uint8"
            }
        ],
        "name": "getLockupDuration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRewardTokens",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getStakeInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lockupEnd",
                "type": "uint256"
            },
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockup",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "pendingRewards",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isLocked",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "name": "getTopStakers",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getVotingPower",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "globalTotalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "enum ONBTOmnichainStaking.Achievement",
                "name": "achievement",
                "type": "uint8"
            }
        ],
        "name": "hasAchievement",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "hubChainEid",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "isComposeMsgSender",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isHub",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isRewardToken",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "localEid",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "localTotalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "",
                "type": "uint8"
            }
        ],
        "name": "lockupBonuses",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "",
                "type": "uint8"
            }
        ],
        "name": "lockupDurations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "lzReceive",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "nextNonce",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "nonce",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oAppVersion",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "senderVersion",
                "type": "uint64"
            },
            {
                "internalType": "uint64",
                "name": "receiverVersion",
                "type": "uint64"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "onbtToken",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "peers",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_dstEid",
                "type": "uint32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_options",
                "type": "bytes"
            },
            {
                "internalType": "bool",
                "name": "_payInLzToken",
                "type": "bool"
            }
        ],
        "name": "quote",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessagingFee",
                "name": "fee",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isStake",
                "type": "bool"
            }
        ],
        "name": "quoteStakeSyncFee",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessagingFee",
                "name": "fee",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "removeRewardToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardPerSecond",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            }
        ],
        "name": "setAchievementNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
            }
        ],
        "name": "setDelegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "eid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "msgType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "options",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
            }
        ],
        "name": "setEnforcedOptions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
            }
        ],
        "name": "setPeer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newRate",
                "type": "uint256"
            }
        ],
        "name": "setRewardRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockup",
                "type": "uint8"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockup",
                "type": "uint8"
            }
        ],
        "name": "stakeWithFee",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "stakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lockupEnd",
                "type": "uint256"
            },
            {
                "internalType": "enum ONBTOmnichainStaking.LockupPeriod",
                "name": "lockupPeriod",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pendingRewards",
                "type": "uint256"
            },
            {
                "internalType": "uint32",
                "name": "sourceChain",
                "type": "uint32"
            },
            {
                "internalType": "uint256",
                "name": "votingPower",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalCompounded",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastActionTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "topStakers",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "totalClaimedByToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalVotingPower",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstakeWithFee",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userRank",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/config/abis/ONBTPrivateSaleOApp.abi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auto-extracted from compiled artifact: ONBTPrivateSaleOApp.json
// Do not edit manually — re-run scripts/sync-abis.mjs to regenerate
__turbopack_context__.s([
    "ONBTPrivateSaleOApp_ABI",
    ()=>ONBTPrivateSaleOApp_ABI
]);
const ONBTPrivateSaleOApp_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_lzEndpoint",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_onbtToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_saleAllocation",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "ERC1967InvalidImplementation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ERC1967NonPayable",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDelegate",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidEndpointCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidInitialization",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LzTokenUnavailable",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "NoPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "msgValue",
                "type": "uint256"
            }
        ],
        "name": "NotEnoughNative",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitializing",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "OnlyEndpoint",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
            }
        ],
        "name": "OnlyPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UUPSUnauthorizedCallContext",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "slot",
                "type": "bytes32"
            }
        ],
        "name": "UUPSUnsupportedProxiableUUID",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldRecipient",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newRecipient",
                "type": "address"
            }
        ],
        "name": "FundsRecipientUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "enabled",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rateWad",
                "type": "uint256"
            }
        ],
        "name": "PaymentTokenUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "name": "PeerSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "name": "SaleWindowUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "paymentToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "onbtOut",
                "type": "uint256"
            }
        ],
        "name": "TokensPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "UnsoldWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "UPGRADE_INTERFACE_VERSION",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "origin",
                "type": "tuple"
            }
        ],
        "name": "allowInitializePath",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "buyWithETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymentToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "buyWithToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endpoint",
        "outputs": [
            {
                "internalType": "contract ILayerZeroEndpointV2",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fundsRecipient",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_fundsRecipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_saleStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_saleEnd",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "_paymentTokens",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_rateWads",
                "type": "uint256[]"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "isComposeMsgSender",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "lzReceive",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "nextNonce",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "nonce",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oAppVersion",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "senderVersion",
                "type": "uint64"
            },
            {
                "internalType": "uint64",
                "name": "receiverVersion",
                "type": "uint64"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "onbtToken",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "paymentTokenEnabled",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "peers",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "purchased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "paymentToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "name": "quotePurchase",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "onbtOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "remainingTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saleAllocation",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saleEnd",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saleStart",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
            }
        ],
        "name": "setDelegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_fundsRecipient",
                "type": "address"
            }
        ],
        "name": "setFundsRecipient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "enabled",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "rateWad",
                "type": "uint256"
            }
        ],
        "name": "setPaymentToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            },
            {
                "internalType": "bool[]",
                "name": "enabledFlags",
                "type": "bool[]"
            },
            {
                "internalType": "uint256[]",
                "name": "rateWads",
                "type": "uint256[]"
            }
        ],
        "name": "setPaymentTokensBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
            }
        ],
        "name": "setPeer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_saleStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_saleEnd",
                "type": "uint256"
            }
        ],
        "name": "setSaleWindow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "tokenRateWad",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSold",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawPaymentToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawUnsoldONBT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/config/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ARBITRUM_USDC_ADDRESS",
    ()=>ARBITRUM_USDC_ADDRESS,
    "ARBITRUM_USDT_ADDRESS",
    ()=>ARBITRUM_USDT_ADDRESS,
    "BASE_USDC_ADDRESS",
    ()=>BASE_USDC_ADDRESS,
    "BASE_USDT_ADDRESS",
    ()=>BASE_USDT_ADDRESS,
    "CHAIN_CONFIG",
    ()=>CHAIN_CONFIG,
    "ERC20_PAYMENT_ABI",
    ()=>ERC20_PAYMENT_ABI,
    "LOCKUP_INFO",
    ()=>LOCKUP_INFO,
    "LZ_ENDPOINT_ID",
    ()=>LZ_ENDPOINT_ID,
    "LockupPeriod",
    ()=>LockupPeriod,
    "ONBT_ACHIEVEMENT_NFT_ABI",
    ()=>ONBT_ACHIEVEMENT_NFT_ABI,
    "ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS",
    ()=>ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS,
    "ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS",
    ()=>ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS,
    "ONBT_ARBITRUM_ADDRESS",
    ()=>ONBT_ARBITRUM_ADDRESS,
    "ONBT_GOVERNOR_ABI",
    ()=>ONBT_GOVERNOR_ABI,
    "ONBT_GOVERNOR_ARBITRUM_ADDRESS",
    ()=>ONBT_GOVERNOR_ARBITRUM_ADDRESS,
    "ONBT_GOVERNOR_BASE_ADDRESS",
    ()=>ONBT_GOVERNOR_BASE_ADDRESS,
    "ONBT_INCENTIVE_CONTROLLER_ARBITRUM_ADDRESS",
    ()=>ONBT_INCENTIVE_CONTROLLER_ARBITRUM_ADDRESS,
    "ONBT_INCENTIVE_CONTROLLER_BASE_ADDRESS",
    ()=>ONBT_INCENTIVE_CONTROLLER_BASE_ADDRESS,
    "ONBT_INSURANCE_FUND_ARBITRUM_ADDRESS",
    ()=>ONBT_INSURANCE_FUND_ARBITRUM_ADDRESS,
    "ONBT_INSURANCE_FUND_BASE_ADDRESS",
    ()=>ONBT_INSURANCE_FUND_BASE_ADDRESS,
    "ONBT_LIQUIDITY_MANAGER_ARBITRUM_ADDRESS",
    ()=>ONBT_LIQUIDITY_MANAGER_ARBITRUM_ADDRESS,
    "ONBT_LIQUIDITY_MANAGER_BASE_ADDRESS",
    ()=>ONBT_LIQUIDITY_MANAGER_BASE_ADDRESS,
    "ONBT_OFT_ABI",
    ()=>ONBT_OFT_ABI,
    "ONBT_PRIVATE_SALE_ABI",
    ()=>ONBT_PRIVATE_SALE_ABI,
    "ONBT_PRIVATE_SALE_ADDRESS",
    ()=>ONBT_PRIVATE_SALE_ADDRESS,
    "ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS",
    ()=>ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
    "ONBT_PRIVATE_SALE_BASE_ADDRESS",
    ()=>ONBT_PRIVATE_SALE_BASE_ADDRESS,
    "ONBT_REVENUE_ROUTER_ARBITRUM_ADDRESS",
    ()=>ONBT_REVENUE_ROUTER_ARBITRUM_ADDRESS,
    "ONBT_REVENUE_ROUTER_BASE_ADDRESS",
    ()=>ONBT_REVENUE_ROUTER_BASE_ADDRESS,
    "ONBT_REWARDS_POOL_ARBITRUM_ADDRESS",
    ()=>ONBT_REWARDS_POOL_ARBITRUM_ADDRESS,
    "ONBT_REWARDS_POOL_BASE_ADDRESS",
    ()=>ONBT_REWARDS_POOL_BASE_ADDRESS,
    "ONBT_STABILIZER_ARBITRUM_ADDRESS",
    ()=>ONBT_STABILIZER_ARBITRUM_ADDRESS,
    "ONBT_STABILIZER_BASE_ADDRESS",
    ()=>ONBT_STABILIZER_BASE_ADDRESS,
    "ONBT_STAKING_ABI",
    ()=>ONBT_STAKING_ABI,
    "ONBT_STAKING_ADDRESS",
    ()=>ONBT_STAKING_ADDRESS,
    "ONBT_STAKING_ARBITRUM_ADDRESS",
    ()=>ONBT_STAKING_ARBITRUM_ADDRESS,
    "ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS",
    ()=>ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS,
    "ONBT_STAKING_ROUTER_BASE_ADDRESS",
    ()=>ONBT_STAKING_ROUTER_BASE_ADDRESS,
    "ONBT_TOKEN_ABI",
    ()=>ONBT_TOKEN_ABI,
    "ONBT_TOKEN_ADDRESS",
    ()=>ONBT_TOKEN_ADDRESS,
    "ONBT_VAULT_ARBITRUM_ADDRESS",
    ()=>ONBT_VAULT_ARBITRUM_ADDRESS,
    "ONBT_VAULT_BASE_ADDRESS",
    ()=>ONBT_VAULT_BASE_ADDRESS,
    "ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS",
    ()=>ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS,
    "ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS",
    ()=>ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS,
    "PRIVATE_SALE_ADDRESSES",
    ()=>PRIVATE_SALE_ADDRESSES,
    "PRIVATE_SALE_PAYMENT_TOKENS",
    ()=>PRIVATE_SALE_PAYMENT_TOKENS,
    "TOKEN_INFO",
    ()=>TOKEN_INFO
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Contract Configuration for ONBT DeFi Ecosystem
 * ABIs sourced from compiled Hardhat artifacts — full read/write coverage.
 * To regenerate ABI files: node scripts/sync-abis.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$OmnichainNabatOFT$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/abis/OmnichainNabatOFT.abi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$ONBTOmnichainStaking$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/abis/ONBTOmnichainStaking.abi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$ONBTPrivateSaleOApp$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/abis/ONBTPrivateSaleOApp.abi.ts [app-client] (ecmascript)");
;
;
;
const ONBT_TOKEN_ADDRESS = ("TURBOPACK compile-time value", "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5") || '0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5'; // Base current
const ONBT_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x169aC761Ebb210B5A93B68B44DA394776a7B230C") || '0x169aC761Ebb210B5A93B68B44DA394776a7B230C'; // Arbitrum current
const ONBT_PRIVATE_SALE_BASE_ADDRESS = ("TURBOPACK compile-time value", "0xEA52c0c5Cb4962490d1132d9c255aa044296576e") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ONBT_PRIVATE_SALE_ADDRESS || '0xEA52c0c5Cb4962490d1132d9c255aa044296576e';
const ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE") || '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE';
const ONBT_PRIVATE_SALE_ADDRESS = ONBT_PRIVATE_SALE_BASE_ADDRESS;
const BASE_USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const BASE_USDT_ADDRESS = '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2';
const ARBITRUM_USDC_ADDRESS = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
const ARBITRUM_USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
const PRIVATE_SALE_ADDRESSES = {
    8453: ONBT_PRIVATE_SALE_BASE_ADDRESS,
    42161: ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS
};
const PRIVATE_SALE_PAYMENT_TOKENS = {
    8453: {
        USDC: BASE_USDC_ADDRESS,
        USDT: BASE_USDT_ADDRESS
    },
    42161: {
        USDC: ARBITRUM_USDC_ADDRESS,
        USDT: ARBITRUM_USDT_ADDRESS
    }
};
const ONBT_STAKING_ADDRESS = ("TURBOPACK compile-time value", "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe") || '0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe';
const ONBT_STAKING_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44") || '0x4E8cF6632fdFD031019c748B041e1c2dC447fa44';
const ONBT_VAULT_BASE_ADDRESS = ("TURBOPACK compile-time value", "0xFd06Ecbd22b208f398E4d822904F7114642eF9b9") || '0xFd06Ecbd22b208f398E4d822904F7114642eF9b9';
const ONBT_REWARDS_POOL_BASE_ADDRESS = ("TURBOPACK compile-time value", "0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85") || '0x0e2a7bA0A315fa4A0702f54161D8D571E2F04D85';
const ONBT_YIELD_DISTRIBUTOR_BASE_ADDRESS = ("TURBOPACK compile-time value", "0x8c91384EbF767C1C434d127c82020380F4A8afC7") || '0x8c91384EbF767C1C434d127c82020380F4A8afC7';
const ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS = ("TURBOPACK compile-time value", "0x11EEEB62b2b2B66475642f82502989D671fC5855") || '0x11EEEB62b2b2B66475642f82502989D671fC5855';
const ONBT_STAKING_ROUTER_BASE_ADDRESS = ("TURBOPACK compile-time value", "0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B") || '0x7b1E4982755A17bfBbD2d249BC1079C2d31E959B';
const ONBT_GOVERNOR_BASE_ADDRESS = ("TURBOPACK compile-time value", "0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9") || '0xf41971b179C0ae6f2CdBdA9b57F407b1C9bF20c9';
const ONBT_LIQUIDITY_MANAGER_BASE_ADDRESS = ("TURBOPACK compile-time value", "0xb362Af3da1497A551C08F79bC03CbA12D2b7e908") || '0xb362Af3da1497A551C08F79bC03CbA12D2b7e908';
const ONBT_INSURANCE_FUND_BASE_ADDRESS = ("TURBOPACK compile-time value", "0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE") || '0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE';
const ONBT_STABILIZER_BASE_ADDRESS = ("TURBOPACK compile-time value", "0x26D75024c2491636a1A1145a3d6966788EF54667") || '0x26D75024c2491636a1A1145a3d6966788EF54667';
const ONBT_INCENTIVE_CONTROLLER_BASE_ADDRESS = ("TURBOPACK compile-time value", "0x7b06795D31482fef0213b24E8ad5f348692A73BD") || '0x7b06795D31482fef0213b24E8ad5f348692A73BD';
const ONBT_REVENUE_ROUTER_BASE_ADDRESS = ("TURBOPACK compile-time value", "0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0") || '0xCBFFd3F88d5C97D06F6306181493D56f70E7fBb0';
const ONBT_VAULT_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x85fE97c69350Be8B9A6bC026006907E34324CD6A") || '0x85fE97c69350Be8B9A6bC026006907E34324CD6A';
const ONBT_REWARDS_POOL_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1") || '0x794171E674B0D06fe6FCBF9D0446Ff0C57b2b9E1';
const ONBT_YIELD_DISTRIBUTOR_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x2085ca5081480e8634eF4295ef477fe8cE97B892") || '0x2085ca5081480e8634eF4295ef477fe8cE97B892';
const ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb") || '0xe01194AE772Bf7f7eD55F94681efDc6FFeBf0BEb';
const ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64") || '0xd731eAA2c32d85B55cdf8c9cEba114350ba46c64';
const ONBT_GOVERNOR_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854") || '0x1e8C140ab269de2E1b1ff76113eb7C9F01F92854';
const ONBT_LIQUIDITY_MANAGER_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3") || '0x5889E566a2175C2d504d8e4D1Ad0A979dCa854a3';
const ONBT_INSURANCE_FUND_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x85BB4B6268446a71110db6f296885AA1EE36c695") || '0x85BB4B6268446a71110db6f296885AA1EE36c695';
const ONBT_STABILIZER_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587") || '0x6e6C6d7Fc80bD1d52c291Fad3425dEC43f464587';
const ONBT_INCENTIVE_CONTROLLER_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50") || '0xc19273A6F0BBC4Fe6B9B8717FeAa0980448dDA50';
const ONBT_REVENUE_ROUTER_ARBITRUM_ADDRESS = ("TURBOPACK compile-time value", "0xa66CA14df740B142d8E2DE515A8743ad1eE25850") || '0xa66CA14df740B142d8E2DE515A8743ad1eE25850';
const LZ_ENDPOINT_ID = {
    BASE: 30184,
    ARBITRUM: 30110
};
const ONBT_OFT_ABI = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$OmnichainNabatOFT$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OmnichainNabatOFT_ABI"];
const ONBT_TOKEN_ABI = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$OmnichainNabatOFT$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OmnichainNabatOFT_ABI"];
const ERC20_PAYMENT_ABI = [
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'spender',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [
            {
                name: '',
                type: 'uint8'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                type: 'string'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
const ONBT_PRIVATE_SALE_ABI = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$ONBTPrivateSaleOApp$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBTPrivateSaleOApp_ABI"];
const ONBT_STAKING_ABI = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$abis$2f$ONBTOmnichainStaking$2e$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBTOmnichainStaking_ABI"];
const ONBT_ACHIEVEMENT_NFT_ABI = [
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'getAchievementsByOwner',
        outputs: [
            {
                name: '',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'getAchievement',
        outputs: [
            {
                name: 'achievementType',
                type: 'uint8'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'rarity',
                type: 'uint8'
            },
            {
                name: 'unlockedAt',
                type: 'uint256'
            },
            {
                name: 'originChain',
                type: 'uint32'
            },
            {
                name: 'originalRecipient',
                type: 'address'
            },
            {
                name: 'transfers',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalMinted',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
const ONBT_GOVERNOR_ABI = [
    // ── View: proposal state (enum: 0=Pending 1=Active 2=Canceled 3=Defeated 4=Succeeded 5=Queued 6=Executed)
    {
        inputs: [
            {
                name: 'proposalId',
                type: 'uint256'
            }
        ],
        name: 'state',
        outputs: [
            {
                name: '',
                type: 'uint8'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    // ── View: get full proposal details
    {
        inputs: [
            {
                name: 'proposalId',
                type: 'uint256'
            }
        ],
        name: 'getProposal',
        outputs: [
            {
                name: 'proposer',
                type: 'address'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'forVotes',
                type: 'uint256'
            },
            {
                name: 'againstVotes',
                type: 'uint256'
            },
            {
                name: 'abstainVotes',
                type: 'uint256'
            },
            {
                name: 'startBlock',
                type: 'uint256'
            },
            {
                name: 'endBlock',
                type: 'uint256'
            },
            {
                name: 'currentState',
                type: 'uint8'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    // ── View: get voter receipt for a proposal
    {
        inputs: [
            {
                name: 'proposalId',
                type: 'uint256'
            },
            {
                name: 'voter',
                type: 'address'
            }
        ],
        name: 'getReceipt',
        outputs: [
            {
                name: 'hasVoted',
                type: 'bool'
            },
            {
                name: 'support',
                type: 'uint8'
            },
            {
                name: 'votes',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    // ── View: public state variable getters
    {
        inputs: [],
        name: 'proposalCount',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'votingPeriod',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'proposalThreshold',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'quorumPercentage',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'stakingContract',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    // ── Write: cast vote (support: 0=Against 1=For 2=Abstain)
    {
        inputs: [
            {
                name: 'proposalId',
                type: 'uint256'
            },
            {
                name: 'support',
                type: 'uint8'
            }
        ],
        name: 'castVote',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    // ── Write: create proposal (hub only)
    {
        inputs: [
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'targets',
                type: 'address[]'
            },
            {
                name: 'values',
                type: 'uint256[]'
            },
            {
                name: 'calldatas',
                type: 'bytes[]'
            }
        ],
        name: 'propose',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];
var LockupPeriod = /*#__PURE__*/ function(LockupPeriod) {
    LockupPeriod[LockupPeriod["NONE"] = 0] = "NONE";
    LockupPeriod[LockupPeriod["DAYS_30"] = 1] = "DAYS_30";
    LockupPeriod[LockupPeriod["DAYS_90"] = 2] = "DAYS_90";
    LockupPeriod[LockupPeriod["DAYS_180"] = 3] = "DAYS_180";
    LockupPeriod[LockupPeriod["DAYS_365"] = 4] = "DAYS_365";
    return LockupPeriod;
}({});
const LOCKUP_INFO = [
    {
        period: 0,
        label: 'No Lockup',
        days: 0,
        bonus: '1x',
        multiplier: 10000
    },
    {
        period: 1,
        label: '30 Days',
        days: 30,
        bonus: '1.2x',
        multiplier: 12000
    },
    {
        period: 2,
        label: '90 Days',
        days: 90,
        bonus: '1.5x',
        multiplier: 15000
    },
    {
        period: 3,
        label: '180 Days',
        days: 180,
        bonus: '2x',
        multiplier: 20000
    },
    {
        period: 4,
        label: '365 Days',
        days: 365,
        bonus: '3x',
        multiplier: 30000
    }
];
const CHAIN_CONFIG = {
    base: {
        chainId: 8453,
        name: 'Base',
        rpcUrl: 'https://mainnet.base.org',
        blockExplorer: 'https://basescan.org',
        tokenAddress: ONBT_TOKEN_ADDRESS
    },
    arbitrum: {
        chainId: 42161,
        name: 'Arbitrum One',
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        blockExplorer: 'https://arbiscan.io',
        tokenAddress: ONBT_ARBITRUM_ADDRESS
    }
};
const TOKEN_INFO = {
    name: 'Omnichain Nabat Token',
    symbol: 'ONBT',
    decimals: 18,
    totalSupply: '1000000000',
    website: 'https://nabat.finance',
    description: 'ONabat (ONBT) is an immutable omnichain fungible token built on LayerZero'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/config/wagmi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wagmiConfig",
    ()=>wagmiConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$arbitrum$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/arbitrum.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/mainnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$coinbaseWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/connectors/dist/esm/coinbaseWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$metaMask$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/connectors/dist/esm/metaMask.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$walletConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/connectors/dist/esm/walletConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/app-url.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
;
;
;
;
;
const appName = 'ONabat';
const appUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppUrl"])();
const appIcon = `${appUrl}/branding/onabat-logo-dark.png`;
const isBrowser = ("TURBOPACK compile-time value", "object") !== 'undefined';
const walletConnectProjectId = ("TURBOPACK compile-time value", "1f2d65cb861ed0eacdf3b1050177b402");
const enableWalletConnect = Boolean(walletConnectProjectId && isBrowser);
const defaultBaseRpcUrl = ("TURBOPACK compile-time truthy", 1) ? 'https://base-rpc.publicnode.com' : "TURBOPACK unreachable";
const baseRpcUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BASE_RPC_URL || defaultBaseRpcUrl;
const arbitrumRpcUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ARBITRUM_RPC_URL || __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.rpcUrl;
const wagmiConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$arbitrum$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"]
    ],
    connectors: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$metaMask$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaMask"])({
            dappMetadata: {
                name: appName,
                url: appUrl
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injected"])({
            shimDisconnect: true
        }),
        ...enableWalletConnect ? [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$walletConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletConnect"])({
                projectId: walletConnectProjectId,
                showQrModal: true,
                telemetryEnabled: false,
                disableProviderPing: true,
                metadata: {
                    name: appName,
                    description: 'ONabat omnichain miniapp',
                    url: appUrl,
                    icons: [
                        appIcon
                    ]
                }
            })
        ] : [],
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$coinbaseWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coinbaseWallet"])({
            appName,
            preference: {
                options: 'all',
                telemetry: false
            }
        })
    ],
    transports: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(baseRpcUrl, {
            timeout: 10_000,
            retryCount: 1
        }),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$arbitrum$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(arbitrumRpcUrl, {
            timeout: 10_000,
            retryCount: 1
        }),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])('https://cloudflare-eth.com', {
            timeout: 10_000,
            retryCount: 1
        })
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientProviders",
    ()=>ClientProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$OnchainKitProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/OnchainKitProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/wagmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/app-url.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/mainnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const QUERY_DEFAULTS = {
    defaultOptions: {
        queries: {
            staleTime: 10_000,
            retry: 1
        }
    }
};
const appName = 'ONabat';
// Suppress known-benign OnchainKit basename resolution errors.
// When ConnectWallet renders with a connected address, OnchainKit attempts to verify
// the basename via mainnet ENS forward resolution. If the CCIP gateway returns a contract
// revert (e.g. "Internal error"), getName() logs it at console.error level even though
// it gracefully falls back to showing the address. Silence only this specific message.
if ("TURBOPACK compile-time truthy", 1) {
    const _origConsoleError = console.error.bind(console);
    console.error = (...args)=>{
        const msg = typeof args[0] === 'string' ? args[0] : '';
        if (msg.includes('basename forward resolution verification') || msg.includes('ENS forward resolution verification') || msg.includes('Error resolving Base names')) {
            return; // suppress known-benign OnchainKit resolution noise
        }
        _origConsoleError(...args);
    };
}
// Public mainnet client using Cloudflare's CORS-friendly RPC (avoids eth.merkle.io CORS errors)
const mainnetPublicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
    chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"],
    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])('https://cloudflare-eth.com')
});
function ClientProviders({ children }) {
    _s();
    // Create queryClient in useState to preserve across renders
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ClientProviders.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"](QUERY_DEFAULTS)
    }["ClientProviders.useState"]);
    const appUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppUrl"])();
    const appLogoUrl = `${appUrl}/branding/onabat-logo-dark.png`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiConfig"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$OnchainKitProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnchainKitProvider"], {
                apiKey: ("TURBOPACK compile-time value", "Ck1CtwszM8g7cfJBSEo1oSo7xk8iIhMB"),
                chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"],
                analytics: false,
                defaultPublicClients: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id]: mainnetPublicClient
                },
                config: {
                    appearance: {
                        mode: 'auto',
                        name: appName,
                        logo: appLogoUrl
                    },
                    wallet: {
                        display: 'modal',
                        preference: 'all'
                    }
                },
                miniKit: {
                    enabled: true,
                    autoConnect: true,
                    notificationProxyUrl: '/api/notify'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/providers.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/providers.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/providers.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(ClientProviders, "5zngDA1VozijrQ91qVZyu+ehQ4Q=");
_c = ClientProviders;
var _c;
__turbopack_context__.k.register(_c, "ClientProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_de56d68b._.js.map