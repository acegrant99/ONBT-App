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
"[project]/App.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/App.tsx'\n\nExpected ';', '}' or <eof>");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];

//# sourceMappingURL=_f16c1f5e._.js.map