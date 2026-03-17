module.exports = [
"[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runActionPreflight",
    ()=>runActionPreflight
]);
function decodeRevertReason(error) {
    const rawError = error instanceof Error ? error.message : String(error);
    const normalized = rawError.replace(/\s+/g, ' ').trim();
    const explicitRevert = normalized.match(/execution reverted(?::| with reason string)?\s*['"]?([^'".]+)['"]?/i);
    if (explicitRevert?.[1]) {
        return {
            decodedReason: explicitRevert[1].trim(),
            rawError
        };
    }
    const viemShortMessage = normalized.match(/shortMessage:\s*([^,}]+)/i);
    if (viemShortMessage?.[1]) {
        return {
            decodedReason: viemShortMessage[1].trim(),
            rawError
        };
    }
    if (/insufficient funds/i.test(normalized)) {
        return {
            decodedReason: 'Insufficient native gas balance for this transaction.',
            rawError
        };
    }
    if (/user rejected|rejected the request|denied transaction/i.test(normalized)) {
        return {
            decodedReason: 'Signature was rejected in wallet confirmation.',
            rawError
        };
    }
    return {
        rawError
    };
}
function firstFailedCheck(checks = []) {
    for (const check of checks){
        if (!check.ok) return check.reason;
    }
    return null;
}
async function runActionPreflight(input) {
    if (!input.account) {
        return {
            ok: false,
            copy: 'Connect your wallet before submitting this transaction.',
            decodedReason: 'Wallet is not connected.'
        };
    }
    if (input.connectedChainId !== input.targetChainId) {
        return {
            ok: false,
            copy: `Switch wallet network to chain ${input.targetChainId} before continuing.`,
            decodedReason: `Wallet is connected to chain ${input.connectedChainId ?? 'unknown'}.`
        };
    }
    const failedCheck = firstFailedCheck(input.checks);
    if (failedCheck) {
        return {
            ok: false,
            copy: failedCheck,
            decodedReason: failedCheck
        };
    }
    if (!input.publicClient) {
        return {
            ok: false,
            copy: 'Chain RPC client unavailable. Retry in a few seconds.',
            decodedReason: 'RPC client missing or not initialized.'
        };
    }
    try {
        await input.publicClient.simulateContract({
            account: input.account,
            address: input.request.address,
            abi: input.request.abi,
            functionName: input.request.functionName,
            args: input.request.args,
            value: input.request.value
        });
    } catch (error) {
        const { decodedReason, rawError } = decodeRevertReason(error);
        return {
            ok: false,
            copy: `${input.actionLabel} preflight failed${decodedReason ? `: ${decodedReason}` : ' during simulation.'}`,
            decodedReason,
            rawError
        };
    }
    return {
        ok: true,
        copy: `${input.actionLabel} is simulation-safe. Confirm the same details in your wallet before signing.`
    };
}
}),
"[project]/lib/txStatus.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GLOBAL_TX_STATUS_EVENT",
    ()=>GLOBAL_TX_STATUS_EVENT,
    "publishGlobalTxStatus",
    ()=>publishGlobalTxStatus
]);
const GLOBAL_TX_STATUS_EVENT = 'onbt:global-tx-status';
function publishGlobalTxStatus(status) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/hooks/useWalletTransactions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletTransactions",
    ()=>useWalletTransactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const BASE_CHAIN_ID = 8453;
function useWalletTransactions(tokenAddress) {
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: BASE_CHAIN_ID
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'wallet-transactions',
            address,
            tokenAddress
        ],
        enabled: Boolean(address && tokenAddress && publicClient),
        staleTime: 30_000,
        refetchInterval: 60_000,
        queryFn: async ()=>{
            if (!address || !tokenAddress || !publicClient) return [];
            const latestBlock = await publicClient.getBlockNumber();
            const fromBlock = latestBlock > 5000n ? latestBlock - 5000n : 0n;
            const [inLogs, outLogs] = await Promise.all([
                publicClient.getLogs({
                    address: tokenAddress,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
                    eventName: 'Transfer',
                    args: {
                        to: address
                    },
                    fromBlock,
                    toBlock: latestBlock
                }),
                publicClient.getLogs({
                    address: tokenAddress,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
                    eventName: 'Transfer',
                    args: {
                        from: address
                    },
                    fromBlock,
                    toBlock: latestBlock
                })
            ]);
            const toTx = (log, direction)=>{
                const args = log.args;
                if (!args) return null;
                const amount = args.value ?? 0n;
                const counterpart = direction === 'in' ? args.from ?? '0x0' : args.to ?? '0x0';
                return {
                    hash: log.transactionHash ?? '0x0',
                    type: direction,
                    amountFormatted: parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(amount)).toLocaleString(undefined, {
                        maximumFractionDigits: 4
                    }),
                    counterpart,
                    blockNumber: log.blockNumber ?? 0n,
                    chainId: BASE_CHAIN_ID,
                    chainLabel: 'Base'
                };
            };
            const txs = [
                ...inLogs.map((l)=>toTx(l, 'in')).filter((t)=>t !== null),
                ...outLogs.map((l)=>toTx(l, 'out')).filter((t)=>t !== null)
            ].sort((a, b)=>b.blockNumber > a.blockNumber ? 1 : -1).slice(0, 20);
            return txs;
        }
    });
}
}),
"[project]/hooks/useBackendOverview.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBackendOverview",
    ()=>useBackendOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
;
function useBackendOverview() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'backend-overview'
        ],
        queryFn: async ()=>{
            const response = await fetch('/api/chains/overview', {
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error(`Backend overview failed with status ${response.status}`);
            }
            return response.json();
        },
        refetchInterval: 20_000,
        staleTime: 10_000,
        placeholderData: (previousData)=>previousData,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always'
    });
}
}),
"[project]/hooks/useQuantumPrediction.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQuantumPrediction",
    ()=>useQuantumPrediction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
;
function useQuantumPrediction() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'quantum-prediction'
        ],
        queryFn: async ()=>{
            const response = await fetch('/api/quantum/predict', {
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error(`Quantum prediction failed with status ${response.status}`);
            }
            return response.json();
        },
        refetchInterval: 30_000,
        staleTime: 15_000,
        placeholderData: (previousData)=>previousData,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always'
    });
}
}),
"[project]/hooks/useMiniApp.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMiniApp",
    ()=>useMiniApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useMiniKit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useMiniKit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useIsInMiniApp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useIsInMiniApp.js [app-ssr] (ecmascript)");
'use client';
;
;
function useMiniApp() {
    const { setMiniAppReady, isMiniAppReady, context } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useMiniKit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMiniKit"])();
    const { isInMiniApp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useIsInMiniApp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsInMiniApp"])();
    const calledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (calledRef.current) return;
        calledRef.current = true;
        // Signal to the Farcaster client that the app is fully loaded,
        // hiding the splash screen. No-op if not running inside a frame.
        setMiniAppReady();
    }, [
        setMiniAppReady
    ]);
    return {
        isInMiniApp: !!isInMiniApp,
        isMiniAppReady,
        context
    };
}
}),
"[project]/hooks/useGlobalTxStatus.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGlobalTxStatus",
    ()=>useGlobalTxStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
;
;
function useGlobalTxStatus() {
    const [globalTxStatus, setGlobalTxStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onStatus = (event)=>{
            const customEvent = event;
            setGlobalTxStatus(customEvent.detail);
        };
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GLOBAL_TX_STATUS_EVENT"], onStatus);
        return ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GLOBAL_TX_STATUS_EVENT"], onStatus);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!globalTxStatus) return;
        if (globalTxStatus.stage !== 'success' && globalTxStatus.stage !== 'error') return;
        const timeout = setTimeout(()=>{
            setGlobalTxStatus((current)=>{
                if (!current) return null;
                return current.updatedAt === globalTxStatus.updatedAt ? null : current;
            });
        }, globalTxStatus.stage === 'success' ? 8000 : 12000);
        return ()=>clearTimeout(timeout);
    }, [
        globalTxStatus
    ]);
    return globalTxStatus;
}
}),
"[project]/config/app-shell.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APP_TABS",
    ()=>APP_TABS,
    "TX_LABEL_BY_SOURCE",
    ()=>TX_LABEL_BY_SOURCE,
    "TX_MESSAGE_BY_STAGE",
    ()=>TX_MESSAGE_BY_STAGE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$registry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/registry.tsx [app-ssr] (ecmascript)");
;
const APP_TABS = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$registry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_TABS"],
    {
        key: 'about',
        label: 'About',
        icon: 'ℹ️'
    },
    {
        key: 'quantum-ai',
        label: 'AI · Rayay',
        icon: '✦'
    }
];
const TX_LABEL_BY_SOURCE = {
    token: 'Token transfer',
    bridge: 'Bridge transaction',
    staking: 'Staking transaction',
    governance: 'Governance delegation',
    'private-sale': 'Private sale transaction'
};
const TX_MESSAGE_BY_STAGE = {
    pending: 'Awaiting wallet confirmation',
    confirming: 'Confirming onchain',
    success: 'Confirmed',
    error: 'Failed'
};
}),
"[project]/App.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ONBTMiniApp",
    ()=>ONBTMiniApp,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/token/ui/TokenInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/ui/PrivateSaleInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/governance/ui/GovernanceInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/bridge/ui/BridgeInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/staking/ui/StakingInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/shell/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AppFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AppFooter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AppHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AppHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AboutPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AboutPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$CdpCliPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/CdpCliPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$HeroSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/HeroSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$MiniAppActionPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/MiniAppActionPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AbiDrivenStudio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AbiDrivenStudio.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$MiniAppNotificationCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/MiniAppNotificationCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAgentKitPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumAgentKitPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAiLauncher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumAiLauncher.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumSignalPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumSignalPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$ShellStyles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/ShellStyles.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$TabsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/TabsSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$TxStatusBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/TxStatusBanner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/app-shell.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBackendOverview$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBackendOverview.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useQuantumPrediction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useQuantumPrediction.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMiniApp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useMiniApp.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useGlobalTxStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useGlobalTxStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$wallet$2f$ui$2f$WalletPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/wallet/ui/WalletPanel.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function ONBTMiniApp() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('token');
    const [retrainingQuantum, setRetrainingQuantum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const quantumAdminToken = process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN;
    // MiniKit: fires sdk.actions.ready() once on mount, hiding the splash screen.
    const { isInMiniApp, context: miniAppContext } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMiniApp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMiniApp"])();
    // Global tx status — auto-clears after success/error; driven by publishGlobalTxStatus events.
    const globalTxStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useGlobalTxStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalTxStatus"])();
    const { data: backendOverview, isFetching: backendRefreshing, isError: backendHasError, error: backendError, refetch: refetchBackendOverview } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBackendOverview$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBackendOverview"])();
    const { data: quantumPrediction, isFetching: quantumRefreshing, isError: quantumHasError, error: quantumError, refetch: refetchQuantumPrediction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useQuantumPrediction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuantumPrediction"])();
    const explorerBase = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.blockExplorer;
    const explorerArbitrum = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.blockExplorer;
    const hasNotificationDetails = Boolean(miniAppContext?.client.notificationDetails);
    const isMiniAppAdded = Boolean(miniAppContext?.client.added || hasNotificationDetails);
    const miniAppFid = miniAppContext?.user.fid;
    const renderActivePanel = ()=>{
        if (activeTab === 'token') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenInterface"], {}, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 84,
            columnNumber: 39
        }, this);
        if (activeTab === 'bridge') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BridgeInterface"], {}, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 85,
            columnNumber: 40
        }, this);
        if (activeTab === 'staking') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StakingInterface"], {}, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 86,
            columnNumber: 41
        }, this);
        if (activeTab === 'governance') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GovernanceInterface"], {}, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 87,
            columnNumber: 44
        }, this);
        if (activeTab === 'private-sale') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PrivateSaleInterface"], {}, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 88,
            columnNumber: 46
        }, this);
        if (activeTab === 'quantum-ai') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAgentKitPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuantumAgentKitPanel"], {
            activeTab: activeTab,
            prediction: quantumPrediction
        }, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this);
        if (activeTab === 'wallet') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$wallet$2f$ui$2f$WalletPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletPanel"], {}, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 95,
            columnNumber: 40
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AboutPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AboutPanel"], {
            baseExplorer: explorerBase,
            arbitrumExplorer: explorerArbitrum,
            baseTokenAddress: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"],
            arbitrumTokenAddress: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_ARBITRUM_ADDRESS"]
        }, void 0, false, {
            fileName: "[project]/App.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    };
    const triggerQuantumRetrain = async ()=>{
        try {
            setRetrainingQuantum(true);
            const headers = {};
            if (quantumAdminToken) {
                headers['x-quantum-admin-token'] = quantumAdminToken;
            }
            const response = await fetch('/api/quantum/retrain', {
                method: 'POST',
                headers
            });
            if (!response.ok) {
                throw new Error(`Retrain request failed with status ${response.status}`);
            }
            await refetchQuantumPrediction();
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'governance',
                stage: 'error',
                errorMessage: error instanceof Error ? error.message : 'Failed to trigger retrain'
            });
        } finally{
            setRetrainingQuantum(false);
        }
    };
    const backendAgeMs = backendOverview?.generatedAt ? Math.max(Date.now() - Date.parse(backendOverview.generatedAt), 0) : Number.POSITIVE_INFINITY;
    const quantumAgeMs = quantumPrediction?.generatedAt ? Math.max(Date.now() - Date.parse(quantumPrediction.generatedAt), 0) : Number.POSITIVE_INFINITY;
    const tabFreshness = {
        token: {
            ageMs: backendAgeMs,
            refreshing: backendRefreshing,
            staleAfterMs: 30_000
        },
        bridge: {
            ageMs: backendAgeMs,
            refreshing: backendRefreshing,
            staleAfterMs: 30_000
        },
        staking: {
            ageMs: backendAgeMs,
            refreshing: backendRefreshing,
            staleAfterMs: 30_000
        },
        'private-sale': {
            ageMs: backendAgeMs,
            refreshing: backendRefreshing,
            staleAfterMs: 30_000
        },
        governance: {
            ageMs: quantumAgeMs,
            refreshing: quantumRefreshing,
            staleAfterMs: 35_000
        },
        about: {
            ageMs: Math.max(backendAgeMs, quantumAgeMs),
            refreshing: backendRefreshing || quantumRefreshing,
            staleAfterMs: 45_000
        }
    };
    const refreshStaleData = ()=>{
        void refetchBackendOverview();
        void refetchQuantumPrediction();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-root min-h-screen text-[color:var(--brand-ink)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$ShellStyles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShellStyles"], {}, void 0, false, {
                fileName: "[project]/App.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AppHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppHeader"], {}, void 0, false, {
                fileName: "[project]/App.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$HeroSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroSection"], {}, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    globalTxStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$TxStatusBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TxStatusBanner"], {
                        status: globalTxStatus
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 158,
                        columnNumber: 28
                    }, this),
                    backendHasError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-2xl border border-rose-300 bg-rose-50/92 px-4 py-3 text-sm text-rose-900 shadow-[0_14px_28px_rgba(190,24,93,0.12)] backdrop-blur",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-900",
                                            children: "Telemetry Offline"
                                        }, void 0, false, {
                                            fileName: "[project]/App.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        backendError instanceof Error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "rounded-2xl border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-900",
                                            children: backendError.message
                                        }, void 0, false, {
                                            fileName: "[project]/App.tsx",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/App.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void refetchBackendOverview(),
                                    className: "rounded-md border border-rose-300 bg-white px-3 py-1 text-xs font-medium text-rose-900 transition-colors hover:bg-rose-100",
                                    children: "Retry"
                                }, void 0, false, {
                                    fileName: "[project]/App.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/App.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-6 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$MiniAppNotificationCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppNotificationCard"], {
                                        isInMiniApp: isInMiniApp,
                                        fid: miniAppFid,
                                        isAdded: isMiniAppAdded,
                                        hasNotificationDetails: hasNotificationDetails
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$MiniAppActionPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppActionPanel"], {}, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$CdpCliPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CdpCliPanel"], {}, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumSignalPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuantumSignalPanel"], {
                                        activeTab: activeTab,
                                        prediction: quantumPrediction,
                                        refreshing: quantumRefreshing,
                                        retraining: retrainingQuantum,
                                        hasError: quantumHasError,
                                        errorText: quantumError instanceof Error ? quantumError.message : undefined,
                                        onRetry: ()=>void refetchQuantumPrediction(),
                                        onRetrain: ()=>void triggerQuantumRetrain()
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "grid gap-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6 xl:sticky xl:top-28",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AbiDrivenStudio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AbiDrivenStudio"], {
                                    activeTab: activeTab,
                                    prediction: quantumPrediction
                                }, void 0, false, {
                                    fileName: "[project]/App.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$TabsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsSection"], {
                                        tabs: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_TABS"],
                                        activeTab: activeTab,
                                        onChangeTab: setActiveTab,
                                        freshnessByTab: tabFreshness,
                                        onRefreshStale: refreshStaleData
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "content-stage pb-8",
                                        children: renderActivePanel()
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/App.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAiLauncher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuantumAiLauncher"], {
                activeTab: activeTab,
                prediction: quantumPrediction
            }, void 0, false, {
                fileName: "[project]/App.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AppFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppFooter"], {}, void 0, false, {
                fileName: "[project]/App.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/App.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ONBTMiniApp;
}),
];

//# sourceMappingURL=_5716ee87._.js.map