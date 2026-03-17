module.exports = [
"[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChainSelector",
    ()=>ChainSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const CHAIN_OPTIONS = [
    {
        id: 8453,
        label: 'Base'
    },
    {
        id: 42161,
        label: 'Arbitrum'
    }
];
function ChainSelector({ label, selectedChainId, onSelectChain }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "mb-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/70",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ChainSelector.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex rounded-lg border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] p-1 gap-1",
                children: CHAIN_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelectChain(option.id),
                        className: `px-3 py-1.5 rounded-md text-sm transition-colors ${selectedChainId === option.id ? 'bg-[color:var(--brand-forest)] text-white' : 'text-[color:var(--brand-ink)]/80 hover:bg-[color:var(--brand-leaf)]/15'}`,
                        children: option.label
                    }, option.id, false, {
                        fileName: "[project]/components/ChainSelector.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ChainSelector.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChainSelector.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MiniAppExternalLink",
    ()=>MiniAppExternalLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useOpenUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useOpenUrl.js [app-ssr] (ecmascript)");
'use client';
;
;
function isModifiedEvent(event) {
    return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}
function MiniAppExternalLink({ href, onClick, openInMiniApp = true, rel = 'noopener noreferrer', target = '_blank', children, ...props }) {
    const openUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useOpenUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenUrl"])();
    const handleClick = (event)=>{
        onClick?.(event);
        if (event.defaultPrevented || !openInMiniApp || isModifiedEvent(event)) {
            return;
        }
        event.preventDefault();
        openUrl(href);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        ...props,
        href: href,
        target: target,
        rel: rel,
        onClick: handleClick,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/MiniAppExternalLink.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/WalletIdentityBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletIdentityBadge",
    ()=>WalletIdentityBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function WalletIdentityBadge({ address, className = '', label = 'Connected wallet' }) {
    const shortAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>`${address.slice(0, 6)}...${address.slice(-4)}`, [
        address
    ]);
    const initials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>`${address.slice(2, 4)}${address.slice(-2)}`.toUpperCase(), [
        address
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `inline-flex items-center gap-3 rounded-2xl border border-slate-900/12 bg-white/88 px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.08)] ${className}`.trim(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-700 to-cyan-500 font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-[0.12em] text-white",
                children: initials
            }, void 0, false, {
                fileName: "[project]/components/WalletIdentityBadge.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/WalletIdentityBadge.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 font-['IBM_Plex_Mono'] rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-sm font-semibold text-slate-900",
                        children: shortAddress
                    }, void 0, false, {
                        fileName: "[project]/components/WalletIdentityBadge.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WalletIdentityBadge.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/WalletIdentityBadge.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/OnchainSdkPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnchainSdkPanel",
    ()=>OnchainSdkPanel,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const sdkItems = [
    {
        id: 'onchainkit',
        name: 'OnchainKit',
        network: 'Base',
        capabilities: [
            'Wallet UI',
            'Identity',
            'Transaction Components'
        ],
        fileRef: 'integrations/coinbase/onchainkit.mjs'
    },
    {
        id: 'wallet-sdk',
        name: 'Coinbase Wallet SDK',
        network: 'Base',
        capabilities: [
            'Connect Wallet',
            'Network Switching',
            'Sign Message'
        ],
        fileRef: 'integrations/coinbase/wallet-sdk.mjs'
    },
    {
        id: 'cdp-sdk',
        name: 'CDP SDK',
        network: 'Base',
        capabilities: [
            'Programmatic Wallets',
            'Transfers',
            'Contract Invocation'
        ],
        fileRef: 'integrations/coinbase/cdp-sdk.mjs'
    },
    {
        id: 'multi-chain',
        name: 'Multi-chain SDK Stubs',
        network: 'Arbitrum / Optimism / Polygon / BSC / Avalanche / Ethereum',
        capabilities: [
            'Cross-chain Utilities',
            'Network Expansion Path'
        ],
        fileRef: 'integrations/*/*-sdk.mjs'
    }
];
function envReady(value) {
    return Boolean(value && value.trim().length > 0 && !value.includes('your_'));
}
function OnchainSdkPanel() {
    const onchainKitReady = envReady(("TURBOPACK compile-time value", "Ck1CtwszM8g7cfJBSEo1oSo7xk8iIhMB"));
    const walletConnectReady = envReady(("TURBOPACK compile-time value", "1f2d65cb861ed0eacdf3b1050177b402"));
    const appUrlReady = envReady(("TURBOPACK compile-time value", "https://www.nabat.finance"));
    const baseAddressReady = envReady(("TURBOPACK compile-time value", "0x05aA0C1753254dB789148250d2eC8A39B0b2EDB5"));
    const arbAddressReady = envReady(("TURBOPACK compile-time value", "0x169aC761Ebb210B5A93B68B44DA394776a7B230C"));
    const stakingBaseReady = envReady(("TURBOPACK compile-time value", "0xf51Be12A17cb6B1B45Ae3c067be2f2A969c45Dfe"));
    const stakingArbitrumReady = envReady(("TURBOPACK compile-time value", "0x4E8cF6632fdFD031019c748B041e1c2dC447fa44"));
    const saleBaseReady = envReady(("TURBOPACK compile-time value", "0xEA52c0c5Cb4962490d1132d9c255aa044296576e"));
    const saleArbitrumReady = envReady(("TURBOPACK compile-time value", "0xD9df789dc6BA5C27D3b591d58F9A02a87C6250FE"));
    const fidReady = envReady(("TURBOPACK compile-time value", "2702510"));
    const builderCodeReady = envReady(("TURBOPACK compile-time value", "bc_2prua292"));
    const readinessItems = [
        {
            label: 'Public App URL',
            ok: appUrlReady
        },
        {
            label: 'OnchainKit API Key',
            ok: onchainKitReady
        },
        {
            label: 'WalletConnect Project ID',
            ok: walletConnectReady
        },
        {
            label: 'Hub ONBT Address (Base)',
            ok: baseAddressReady
        },
        {
            label: 'Destination ONBT Address (Arbitrum)',
            ok: arbAddressReady
        },
        {
            label: 'Staking Address (Base)',
            ok: stakingBaseReady
        },
        {
            label: 'Staking Address (Arbitrum)',
            ok: stakingArbitrumReady
        },
        {
            label: 'Private Sale Address (Base)',
            ok: saleBaseReady
        },
        {
            label: 'Private Sale Address (Arbitrum)',
            ok: saleArbitrumReady
        },
        {
            label: 'Farcaster FID',
            ok: fidReady
        },
        {
            label: 'Base Builder Code',
            ok: builderCodeReady
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                        children: "🧩 Onchain SDK Stack"
                    }, void 0, false, {
                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-sm font-semibold text-[color:var(--brand-ink)]/75",
                        children: "This miniapp now uses the onchain SDK modules mapped from your integrations workspace for wallet UX, transactions, and chain-ready expansion."
                    }, void 0, false, {
                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OnchainSdkPanel.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                children: sdkItems.map((sdk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-lg border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/90",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-sm font-semibold text-[color:var(--brand-ink)]",
                                                children: sdk.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                                children: sdk.network
                                            }, void 0, false, {
                                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "text-[10px] px-2 py-1 rounded-full border border-[color:var(--brand-leaf)]/30 text-[color:var(--brand-forest)] bg-[color:var(--brand-sand)]",
                                        children: "Active"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-3 space-y-1 text-xs text-[color:var(--brand-ink)]/75",
                                children: sdk.capabilities.map((capability)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            capability
                                        ]
                                    }, capability, true, {
                                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-3 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand-ink)]/65",
                                children: [
                                    "Source: ",
                                    sdk.fileRef
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, sdk.id, true, {
                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/OnchainSdkPanel.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 rounded-lg border border-[color:var(--brand-sun)]/45 bg-[color:var(--brand-sun)]/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]",
                        children: "⚙️ Runtime Readiness"
                    }, void 0, false, {
                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",
                        children: readinessItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2 rounded-md bg-[color:var(--brand-cream)] px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `rounded-full border px-2.5 py-1 font-semibold ${item.ok ? 'border-emerald-300 bg-emerald-50 text-[color:var(--brand-forest)]' : 'border-rose-300 bg-rose-50 text-red-700'}`,
                                        children: item.ok ? 'Ready' : 'Missing'
                                    }, void 0, false, {
                                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.label, true, {
                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OnchainSdkPanel.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/OnchainSdkPanel.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = OnchainSdkPanel;
}),
"[project]/components/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/token/ui/TokenInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/bridge/ui/BridgeInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/staking/ui/StakingInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/governance/ui/GovernanceInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/ui/PrivateSaleInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnchainSdkPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OnchainSdkPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/components/shell/AppHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppHeader",
    ()=>AppHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/wallet/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$Wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/wallet/components/Wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$ConnectWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/wallet/components/ConnectWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$WalletDropdown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/wallet/components/WalletDropdown.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$WalletDropdownDisconnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/wallet/components/WalletDropdownDisconnect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$WalletDropdownLink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/wallet/components/WalletDropdownLink.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useMiniKit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useMiniKit.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const STACK_BUTTONS = [
    'Base',
    'Arbitrum',
    'MiniKit',
    'AgentKit',
    'CLI'
];
function AppHeader({ aiTakeoverEnabled = false }) {
    const { context } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useMiniKit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMiniKit"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const clientLabel = context?.client?.platformType || 'browser';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "brand-surface sticky top-0 z-50 border-b border-slate-900/10 bg-white/78 backdrop-blur-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "reveal-up rounded-[1.2rem] border border-slate-900/12 bg-white/90 px-3 py-3 shadow-[0_16px_34px_rgba(15,23,42,0.12)] sm:px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-11 w-11 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-cyan-50 border border-slate-900/12 flex items-center justify-center shadow-sm ring-1 ring-blue-200/45",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/branding/onabat-logo-light.png",
                                        alt: "ONabat logo",
                                        width: 32,
                                        height: 32,
                                        className: "h-8 w-8 object-contain",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "brand-display rounded-2xl border border-slate-900/12 bg-white px-3 py-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 truncate",
                                            children: "ONabat"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 37,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "rounded-full border border-slate-900/10 bg-slate-50 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                                                    children: [
                                                        "Client ",
                                                        clientLabel
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                                    lineNumber: 39,
                                                    columnNumber: 19
                                                }, this),
                                                STACK_BUTTONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "rounded-full border border-cyan-300/40 bg-cyan-50 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-950",
                                                        children: item
                                                    }, item, false, {
                                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                                        lineNumber: 46,
                                                        columnNumber: 21
                                                    }, this)),
                                                aiTakeoverEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-800",
                                                    children: "RAYAY Takeover Active"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 38,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppHeader.tsx",
                            lineNumber: 25,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3 lg:min-w-[290px] lg:justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$Wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Wallet"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$ConnectWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectWallet"], {}, void 0, false, {
                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$WalletDropdown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletDropdown"], {
                                        children: [
                                            address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 pb-2 pt-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-['IBM_Plex_Mono'] text-xs text-slate-500",
                                                    children: [
                                                        address.slice(0, 6),
                                                        "…",
                                                        address.slice(-4)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppHeader.tsx",
                                                lineNumber: 71,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$WalletDropdownLink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletDropdownLink"], {
                                                icon: "wallet",
                                                href: address ? `https://basescan.org/address/${address}` : 'https://basescan.org',
                                                rel: "noopener noreferrer",
                                                children: "View on Basescan"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppHeader.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$wallet$2f$components$2f$WalletDropdownDisconnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletDropdownDisconnect"], {}, void 0, false, {
                                                fileName: "[project]/components/shell/AppHeader.tsx",
                                                lineNumber: 84,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AppHeader.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AppHeader.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/AppHeader.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/AppHeader.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/shell/AppHeader.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shell/AppHeader.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/CdpCliPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CdpCliPanel",
    ()=>CdpCliPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const CLI_COMMANDS = [
    {
        icon: '🚀',
        label: 'Scaffold',
        hint: 'create-onchain',
        command: 'npx create-onchain --mini'
    },
    {
        icon: '🧾',
        label: 'Manifest',
        hint: 'minikit:manifest',
        command: 'npm run minikit:manifest'
    },
    {
        icon: '🤖',
        label: 'AgentKit',
        hint: 'wallet + actions',
        command: 'AgentKit.from({ walletProvider, actionProviders })'
    },
    {
        icon: '🔐',
        label: 'CDP Rail',
        hint: 'wallet providers',
        command: 'cdpApiActionProvider() + cdpSmartWalletActionProvider()'
    }
];
const BENEFIT_BUTTONS = [
    'Scaffold Fast',
    'Manifest Ready',
    'CDP Wallet Rail',
    'MiniKit Native'
];
function CdpCliPanel() {
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCopyCommand = async (command)=>{
        try {
            await navigator.clipboard.writeText(command);
            setFeedback(`Copied: ${command}`);
        } catch  {
            setFeedback('Copy failed in this browser session.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brand-panel reveal-up stagger-3 p-4 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "Base CDP / CLI"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this),
                                    BENEFIT_BUTTONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950",
                                            children: item
                                        }, item, false, {
                                            fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "brand-display rounded-full border border-slate-900/12 bg-white px-4 py-2 text-sm font-extrabold text-slate-900",
                                children: "Official command rail"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pulse-bars",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "inline-flex items-center rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950",
                        children: "Base-native product shell"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1",
                                children: "CLI Sequence"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 grid gap-2 sm:grid-cols-2",
                                children: CLI_COMMANDS.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void handleCopyCommand(entry.command),
                                        title: entry.command,
                                        className: "visual-icon-tile w-full justify-between text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: entry.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: entry.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                                lineNumber: 75,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full border border-slate-900/10 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700",
                                                children: entry.hint
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                                lineNumber: 79,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, entry.command, true, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1",
                                children: "Benefits"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 grid gap-2 sm:grid-cols-2",
                                children: BENEFIT_BUTTONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-slate-50/90 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                                        children: item
                                    }, item, false, {
                                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            feedback ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900",
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: "https://github.com/coinbase/onchainkit/tree/main/examples/minikit-example",
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/60",
                        children: "Open MiniKit example"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: "https://github.com/coinbase/agentkit/tree/main/typescript/examples/langchain-cdp-smart-wallet-chatbot",
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/60",
                        children: "Open CDP smart wallet example"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: "https://github.com/coinbase/onchainkit/tree/main/packages/create-onchain",
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/60",
                        children: "Open create-onchain CLI"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/CdpCliPanel.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/CdpCliPanel.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/CdpCliPanel.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/PriceTicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PriceTicker",
    ()=>PriceTicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * PriceTicker — live ONBT price widget with framer-motion flash animations.
 *
 * Shows: current USD price, 24h % change, 24h volume, a live-pulse dot.
 * Flashes green/red when the price moves between 30-second intervals.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLivePrice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLivePrice.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function formatPrice(p) {
    if (p === 0) return '0.00';
    if (p < 0.000001) return p.toExponential(4);
    if (p < 0.001) return p.toFixed(8);
    if (p < 1) return p.toFixed(6);
    return p.toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    });
}
function formatVolume(v) {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
    return `$${v.toFixed(0)}`;
}
function formatMarketCap(mc) {
    if (mc >= 1_000_000_000) return `$${(mc / 1_000_000_000).toFixed(2)}B`;
    if (mc >= 1_000_000) return `$${(mc / 1_000_000).toFixed(2)}M`;
    if (mc >= 1_000) return `$${(mc / 1_000).toFixed(1)}K`;
    return mc > 0 ? `$${mc.toFixed(0)}` : '—';
}
function PriceTicker({ tokenAddress, chainId = 8453, className = '' }) {
    const { data, isFetching, isError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLivePrice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLivePrice"])(tokenAddress, chainId);
    const prevPriceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [flashDir, setFlashDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!data?.priceUsd) return;
        const prev = prevPriceRef.current;
        if (prev !== null && prev !== data.priceUsd) {
            const dir = parseFloat(data.priceUsd) > parseFloat(prev) ? 'up' : 'down';
            setFlashDir(dir);
            const t = setTimeout(()=>setFlashDir(null), 1000);
            prevPriceRef.current = data.priceUsd;
            return ()=>clearTimeout(t);
        }
        prevPriceRef.current = data.priceUsd;
    }, [
        data?.priceUsd
    ]);
    // Loading skeleton
    if (!data && isFetching) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `inline-flex items-center gap-2 ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-3 w-20 animate-pulse rounded bg-slate-200"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/shell/PriceTicker.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this);
    }
    // Error / no data
    if (isError || !data) return null;
    const isPrivateSale = data.source === 'private-sale';
    const price = parseFloat(data.priceUsd);
    const change24h = data.priceChange24h;
    const isUp24h = change24h >= 0;
    const flashBg = flashDir === 'up' ? 'rgba(16,185,129,0.18)' : flashDir === 'down' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.92)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        },
        className: `inline-flex flex-wrap items-center gap-2 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    backgroundColor: flashBg
                },
                transition: {
                    duration: 0.9,
                    ease: 'easeOut'
                },
                className: "flex items-center gap-2 rounded-full border border-slate-900/12 px-3 py-1.5 shadow-sm",
                style: {
                    backgroundColor: 'rgba(255,255,255,0.92)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400",
                        children: "ONBT"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            y: flashDir === 'up' ? 4 : flashDir === 'down' ? -4 : 0,
                            opacity: 0.6
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            duration: 0.25
                        },
                        className: `font-['IBM_Plex_Mono'] text-[13px] font-bold tabular-nums ${flashDir === 'up' ? 'text-emerald-700' : flashDir === 'down' ? 'text-rose-700' : 'text-slate-900'}`,
                        children: [
                            "$",
                            formatPrice(price)
                        ]
                    }, data.priceUsd, true, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            isPrivateSale ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 rounded-full border border-violet-300/60 bg-violet-50/85 px-2.5 py-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-[0.1em] text-violet-700",
                        children: "Private Sale"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0.5
                },
                animate: {
                    opacity: 1
                },
                className: `flex items-center gap-1 rounded-full border px-2.5 py-1 font-['IBM_Plex_Mono'] text-[11px] font-bold ${isUp24h ? 'border-emerald-300/60 bg-emerald-50/85 text-emerald-800' : 'border-rose-300/60 bg-rose-50/85 text-rose-800'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: isUp24h ? '▲' : '▼'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            Math.abs(change24h).toFixed(2),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] opacity-60",
                        children: "24h"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this)
                ]
            }, `change-${change24h}`, true, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this),
            data.volume24h > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-1 sm:flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-['IBM_Plex_Mono'] text-[9px] font-semibold uppercase tracking-wider text-slate-400",
                        children: "Vol"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-['IBM_Plex_Mono'] text-[11px] font-bold text-slate-700",
                        children: formatVolume(data.volume24h)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this),
            (data.marketCap > 0 || data.fdv > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-1 lg:flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-['IBM_Plex_Mono'] text-[9px] font-semibold uppercase tracking-wider text-slate-400",
                        children: "MCap"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-['IBM_Plex_Mono'] text-[11px] font-bold text-slate-700",
                        children: formatMarketCap(data.marketCap || data.fdv)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/PriceTicker.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative inline-flex h-2.5 w-2.5",
                title: "Live price",
                children: isFetching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/PriceTicker.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/PriceTicker.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/components/shell/PriceTicker.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/PriceTicker.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/PriceTicker.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/HeroSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$PriceTicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/PriceTicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const BENEFIT_BUTTONS = [
    'Trade ONBT',
    'Bridge Fast',
    'Stake Live',
    'Vote Onchain'
];
const ROUTE_BUTTONS = [
    'Base 8453',
    'Arbitrum 42161',
    'OnchainKit + Wagmi'
];
function HeroSection({ takeoverPlan }) {
    const aiActive = Boolean(takeoverPlan?.enabled);
    const heading = aiActive ? takeoverPlan?.headline || 'RAYAY command mode' : 'Tap the ONBT flow you want.';
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!sectionRef.current) return;
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context(()=>{
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });
            tl.from('[data-hero-badge]', {
                opacity: 0,
                y: -8,
                duration: 0.35,
                stagger: 0.08
            }).from('[data-hero-heading]', {
                opacity: 0,
                y: 14,
                duration: 0.4
            }, '-=0.15').from('[data-hero-cta] > *', {
                opacity: 0,
                y: 8,
                duration: 0.3,
                stagger: 0.06
            }, '-=0.2').from('[data-hero-ticker]', {
                opacity: 0,
                scale: 0.95,
                duration: 0.35
            }, '-=0.15').from('[data-hero-metric]', {
                opacity: 0,
                y: 10,
                duration: 0.32,
                stagger: 0.07
            }, '-=0.25').from('[data-hero-orb]', {
                opacity: 0,
                scale: 0.7,
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, '-=0.3');
        }, sectionRef);
        return ()=>ctx.revert();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: `brand-hero hero-graphic mb-5 rounded-3xl p-4 sm:p-6 ${aiActive ? 'takeover-glow takeover-pulse' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mesh-overlay",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/shell/HeroSection.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                "data-hero-badge": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "inline-flex items-center rounded-full border border-slate-900/15 bg-white/95 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "LayerZero V2 Omnichain Interface"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    aiActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-800",
                                        children: "RAYAY Visibility Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-hero-heading": true,
                                className: "brand-display max-w-3xl rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-2 text-left text-3xl font-extrabold leading-[1.02] text-slate-900 sm:text-[3.25rem]",
                                children: heading
                            }, void 0, false, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 max-w-3xl",
                                "data-hero-cta": true,
                                children: BENEFIT_BUTTONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "cta-button rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.08)]",
                                        children: item
                                    }, item, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-hero-ticker": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$PriceTicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriceTicker"], {
                                    tokenAddress: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"],
                                    chainId: 8453
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/HeroSection.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/HeroSection.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-3 text-xs sm:grid-cols-3 sm:text-sm lg:max-w-[520px]",
                        children: ROUTE_BUTTONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-hero-metric": true,
                                className: "motion-card metric-card rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-3 text-left font-['IBM_Plex_Mono'] font-semibold text-slate-900",
                                children: item
                            }, item, false, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/HeroSection.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/HeroSection.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none mt-3 hidden items-center justify-end lg:flex",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-hero-orb": true,
                    className: "hero-orb relative flex h-14 w-14 items-center justify-center rounded-full border border-slate-900/12 bg-white/85 backdrop-blur-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/branding/onabat-logo-light.png",
                            alt: "ONabat",
                            width: 32,
                            height: 32,
                            className: "h-8 w-8 object-contain logo-float",
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/components/shell/HeroSection.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hero-ring absolute inset-[-6px] rounded-full border border-cyan-300/50"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/HeroSection.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/HeroSection.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/HeroSection.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/HeroSection.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/MiniAppActionPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MiniAppActionPanel",
    ()=>MiniAppActionPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useComposeCast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useComposeCast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useMiniKit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useMiniKit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useOpenUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useOpenUrl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useViewProfile$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useViewProfile.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function MiniAppActionPanel() {
    const { context } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useMiniKit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMiniKit"])();
    const { composeCast, isPending: isComposingCast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useComposeCast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposeCast"])();
    const openUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useOpenUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenUrl"])();
    const viewProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useViewProfile$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useViewProfile"])();
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedbackTone, setFeedbackTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('neutral');
    const user = context?.user;
    const client = context?.client;
    const userLabel = user?.displayName || user?.username || 'Miniapp visitor';
    const initials = userLabel.split(/\s+/).filter(Boolean).slice(0, 2).map((part)=>part[0]?.toUpperCase() || '').join('') || 'ON';
    const safeArea = client?.safeAreaInsets || {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    const hasContext = Boolean(context);
    const hasNotificationDetails = Boolean(client?.notificationDetails);
    const isAdded = Boolean(client?.added || hasNotificationDetails);
    const shareUrl = 'https://www.nabat.finance';
    const statusPills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            hasContext ? 'MiniKit connected' : 'Browser preview',
            isAdded ? 'Saved in Farcaster' : 'Not yet saved',
            hasNotificationDetails ? 'Notifications issued' : 'No notification token'
        ], [
        hasContext,
        isAdded,
        hasNotificationDetails
    ]);
    const feedbackClassName = feedbackTone === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : feedbackTone === 'error' ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-slate-200 bg-slate-50 text-slate-700';
    const handleComposeCast = ()=>{
        setFeedback(null);
        try {
            composeCast({
                text: 'Tracking ONBT across Base and Arbitrum inside ONabat. Omnichain trading, bridging, staking, and governance in one miniapp.',
                embeds: [
                    shareUrl
                ]
            });
            setFeedbackTone('success');
            setFeedback('Cast composer opened with an ONabat share draft.');
        } catch (error) {
            setFeedbackTone('error');
            setFeedback(error instanceof Error ? error.message : 'Unable to open the cast composer.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "action-panel reveal-up stagger-2 mb-6 rounded-3xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "inline-flex items-center rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "MiniKit Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    statusPills.map((pill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "chip-pulse inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950",
                                            children: pill
                                        }, pill, false, {
                                            fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 sm:flex-row sm:items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mini-orb flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-700 to-cyan-400 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_24px_rgba(14,116,144,0.22)]",
                                        children: initials
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-sm font-semibold text-slate-900",
                                                children: userLabel
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 89,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-sm font-semibold text-slate-700",
                                                children: user?.fid ? `FID ${user.fid}` : 'No FID'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 95,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-sm font-semibold text-slate-700",
                                                children: client?.platformType ? `Client ${client.platformType}` : 'Open in Farcaster'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                                        children: [
                                            "Safe Top ",
                                            safeArea.top,
                                            "px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                                        children: [
                                            "Safe Bottom ",
                                            safeArea.bottom,
                                            "px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                                        children: [
                                            "Notifications ",
                                            hasNotificationDetails ? 'Ready' : 'Pending'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                                        children: [
                                            "Miniapp ",
                                            isAdded ? 'Added' : 'Not Added'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full flex-col gap-2 xl:w-auto xl:min-w-[250px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>viewProfile(),
                                disabled: !user?.fid,
                                className: "cta-button rounded-2xl border border-slate-900/12 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300",
                                children: "View Farcaster Profile"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleComposeCast,
                                disabled: !hasContext || isComposingCast,
                                className: "cta-button rounded-2xl border border-cyan-300/55 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400",
                                children: isComposingCast ? 'Opening Cast Composer...' : 'Share ONabat in a Cast'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>openUrl('https://base.org/builders/minikit'),
                                className: "cta-button rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50",
                                children: "Open MiniKit Builder Docs"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            feedback ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 rounded-2xl border px-3 py-2 text-sm ${feedbackClassName}`,
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/MiniAppNotificationCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MiniAppNotificationCard",
    ()=>MiniAppNotificationCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useAddFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useAddFrame.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useNotification$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/minikit/hooks/useNotification.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function MiniAppNotificationCard({ isInMiniApp, fid, isAdded, hasNotificationDetails }) {
    const addFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useAddFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAddFrame"])();
    const sendNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$minikit$2f$hooks$2f$useNotification$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotification"])();
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedbackTone, setFeedbackTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('neutral');
    const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!isInMiniApp) {
            return {
                label: 'Browser',
                detail: 'Open in Farcaster'
            };
        }
        if (!isAdded) {
            return {
                label: 'Not Added',
                detail: 'Add miniapp'
            };
        }
        if (!hasNotificationDetails) {
            return {
                label: 'Token Pending',
                detail: 'Await client token'
            };
        }
        return {
            label: 'Notifications Ready',
            detail: 'Push live'
        };
    }, [
        hasNotificationDetails,
        isAdded,
        isInMiniApp
    ]);
    const feedbackClassName = feedbackTone === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : feedbackTone === 'error' ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-slate-200 bg-slate-50 text-slate-700';
    const handleAddFrame = async ()=>{
        setIsAdding(true);
        setFeedback(null);
        try {
            const details = await addFrame();
            if (details) {
                setFeedbackTone('success');
                setFeedback('ONabat was added successfully. Notification delivery is ready to test.');
            } else {
                setFeedbackTone('neutral');
                setFeedback('Add flow completed without notification details. Farcaster may require a permission refresh.');
            }
        } catch (error) {
            setFeedbackTone('error');
            setFeedback(error instanceof Error ? error.message : 'Failed to add the miniapp.');
        } finally{
            setIsAdding(false);
        }
    };
    const handleSendTest = async ()=>{
        setIsSending(true);
        setFeedback(null);
        try {
            const delivered = await sendNotification({
                title: 'ONabat alert',
                body: 'Notifications are live for this miniapp session.'
            });
            if (delivered) {
                setFeedbackTone('success');
                setFeedback('Test notification submitted to Farcaster. Check your client inbox.');
            } else {
                setFeedbackTone('error');
                setFeedback('Notification request was rejected. Confirm the miniapp is added and notifications are enabled in Farcaster.');
            }
        } catch (error) {
            setFeedbackTone('error');
            setFeedback(error instanceof Error ? error.message : 'Failed to send a test notification.');
        } finally{
            setIsSending(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mb-6 rounded-3xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "inline-flex items-center rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "Farcaster Notifications"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    fid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "inline-flex items-center rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-900",
                                        children: [
                                            "FID ",
                                            fid
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2 sm:grid-cols-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
                                        children: status.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
                                        children: status.detail
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `rounded-2xl border px-3 py-3 text-left font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)] ${hasNotificationDetails ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-slate-900/10 bg-white/92 text-slate-900'}`,
                                        children: hasNotificationDetails ? 'Push Ready' : 'Push Locked'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleAddFrame(),
                                disabled: !isInMiniApp || isAdding || isAdded,
                                className: "rounded-2xl border border-slate-900/12 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300",
                                children: isAdding ? 'Adding...' : isAdded ? 'Miniapp Added' : 'Add to Farcaster'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleSendTest(),
                                disabled: !isInMiniApp || !hasNotificationDetails || isSending,
                                className: "rounded-2xl border border-cyan-300/55 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400",
                                children: isSending ? 'Sending...' : 'Send Test Ping'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            feedback ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 rounded-2xl border px-3 py-2 text-sm ${feedbackClassName}`,
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/TabsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsSection",
    ()=>TabsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function TabsSection({ tabs, activeTab, onChangeTab, featuredTabs = [], freshnessByTab = {}, onRefreshStale }) {
    const activeTabMeta = tabs.find((item)=>item.key === activeTab);
    const staleTabs = tabs.filter((tab)=>{
        const freshness = freshnessByTab[tab.key];
        if (!freshness) return false;
        const staleAfter = freshness.staleAfterMs ?? 30_000;
        return freshness.ageMs > staleAfter;
    });
    const formatAge = (ageMs)=>{
        if (!Number.isFinite(ageMs) || ageMs < 0) return '--';
        if (ageMs < 1000) return '<1s';
        if (ageMs < 60_000) return `${Math.floor(ageMs / 1000)}s`;
        return `${Math.floor(ageMs / 60_000)}m`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brand-panel reveal-up mb-6 p-3 sm:p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6",
                children: tabs.map((tab)=>{
                    const isFeatured = featuredTabs.includes(tab.key);
                    const freshness = freshnessByTab[tab.key];
                    const freshnessText = freshness ? freshness.refreshing ?? false ? 'live' : `age ${formatAge(freshness.ageMs ?? 0)}` : undefined;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onChangeTab(tab.key),
                        "aria-label": freshnessText ? `${tab.label} ${freshnessText}` : tab.label,
                        className: `tab-pill flex min-h-[56px] items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${activeTab === tab.key ? 'tab-pill-active' : ''} ${activeTab === tab.key ? 'border-slate-900/20 bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.22)]' : isFeatured ? 'border-blue-300/60 bg-blue-50/70 text-blue-900' : 'border-slate-900/12 bg-white/92 text-slate-700 hover:border-slate-900/28 hover:bg-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex min-w-0 items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: tab.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/TabsSection.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: tab.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/TabsSection.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/TabsSection.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            freshness && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                className: `shrink-0 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${freshness.refreshing ?? false ? 'bg-white/20 text-white' : activeTab === tab.key ? 'bg-white/20 text-white' : (freshness.ageMs ?? 0) > (freshness.staleAfterMs ?? 30_000) ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'}`,
                                children: freshnessText
                            }, void 0, false, {
                                fileName: "[project]/components/shell/TabsSection.tsx",
                                lineNumber: 60,
                                columnNumber: 17
                            }, this)
                        ]
                    }, tab.key, true, {
                        fileName: "[project]/components/shell/TabsSection.tsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/shell/TabsSection.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700",
                    children: [
                        "Active ",
                        activeTabMeta?.label
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/TabsSection.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/TabsSection.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            staleTabs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/35 bg-amber-50 px-3 py-2 text-xs text-amber-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-amber-400/65 bg-white px-3 py-1 font-medium text-amber-900",
                        children: [
                            "Stale ",
                            staleTabs.map((tab)=>tab.label).join(', ')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/TabsSection.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    onRefreshStale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRefreshStale,
                        className: "rounded-md border border-amber-400/65 bg-white px-2 py-1 font-medium text-amber-900 transition-colors hover:bg-amber-100",
                        children: "Refresh"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TabsSection.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/TabsSection.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/TabsSection.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/TxStatusBanner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TxStatusBanner",
    ()=>TxStatusBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/app-shell.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
;
;
;
function TxStatusBanner({ status }) {
    const tone = status.stage === 'error' ? 'border-rose-300 bg-rose-50/95 text-rose-900' : status.stage === 'success' ? 'border-emerald-300 bg-emerald-50/95 text-emerald-900' : 'border-slate-900/12 bg-white/88 text-[color:var(--brand-ink)]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mb-6 rounded-2xl border px-4 py-3 text-sm shadow-[0_12px_26px_rgba(15,23,42,0.08)] ${tone}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-3 gap-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold uppercase tracking-wide",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TX_LABEL_BY_SOURCE"][status.source]
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TxStatusBanner.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-1 font-semibold",
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TxStatusBanner.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TX_MESSAGE_BY_STAGE"][status.stage]
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TxStatusBanner.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    status.txHash && status.explorerBaseUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${status.explorerBaseUrl}/tx/${status.txHash}`,
                        className: "text-cyan-700 underline-offset-2 hover:underline",
                        children: "View transaction"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TxStatusBanner.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/TxStatusBanner.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            status.errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "mt-1 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-1 text-left text-xs font-semibold text-rose-700",
                children: status.errorMessage
            }, void 0, false, {
                fileName: "[project]/components/shell/TxStatusBanner.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/TxStatusBanner.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/AboutPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AboutPanel",
    ()=>AboutPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnchainSdkPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OnchainSdkPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
;
;
;
function AboutPanel({ baseExplorer, arbitrumExplorer, baseTokenAddress, arbitrumTokenAddress }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "mb-4 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-2xl font-semibold brand-display",
                children: "About ONBT"
            }, void 0, false, {
                fileName: "[project]/components/shell/AboutPanel.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 text-[color:var(--brand-ink)]/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85",
                        children: "Omnichain Nabat Token (ONBT) is a LayerZero V2 Omnichain Fungible Token (OFT) that exists natively across multiple blockchains."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "🔗 Supported Chains"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Base"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 30,
                                                columnNumber: 19
                                            }, this),
                                            " (Hub Chain) - EID 30184"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Arbitrum"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 31,
                                                columnNumber: 19
                                            }, this),
                                            " - EID 30110"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "✨ Features"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Unified Supply:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 37,
                                                columnNumber: 19
                                            }, this),
                                            " 1 billion ONBT across all chains"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 37,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Native Transfers:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 38,
                                                columnNumber: 19
                                            }, this),
                                            " Seamless cross-chain bridging"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Omnichain Staking:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 39,
                                                columnNumber: 19
                                            }, this),
                                            " Stake on any chain, earn everywhere"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Cross-Chain Governance:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 40,
                                                columnNumber: 19
                                            }, this),
                                            " Vote from any supported chain"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Achievement NFTs:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this),
                                            " Portable NFTs across all chains"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "No Wrapping:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 42,
                                                columnNumber: 19
                                            }, this),
                                            " Same token on every chain"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Secure:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 43,
                                                columnNumber: 19
                                            }, this),
                                            " Powered by LayerZero V2"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "📜 Contracts"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Base"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 50,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: `${baseExplorer}/address/${baseTokenAddress}`,
                                                className: "font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all",
                                                children: baseTokenAddress
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Arbitrum"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 59,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: `${arbitrumExplorer}/address/${arbitrumTokenAddress}`,
                                                className: "font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all",
                                                children: arbitrumTokenAddress
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-sun)]/20 rounded-lg border border-[color:var(--brand-sun)]/40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "w-full rounded-2xl border border-[color:var(--brand-sun)]/50 bg-white/92 px-3 py-2 text-left text-sm font-semibold text-[color:var(--brand-ink)]/85",
                            children: "⚡ LayerZero-Native: This miniapp exclusively features LayerZero-enabled contracts. All functionality leverages omnichain messaging for true cross-chain interoperability."
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AboutPanel.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnchainSdkPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OnchainSdkPanel"], {}, void 0, false, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AboutPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/AboutPanel.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/AppFooter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppFooter",
    ()=>AppFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
;
;
function AppFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "brand-surface mt-12 rounded-t-2xl border-t border-slate-900/10 bg-white/72 backdrop-blur",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "reveal-up stagger-1 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-display rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-900",
                                        children: "About ONBT"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AppFooter.tsx",
                                        lineNumber: 11,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                        children: "Omnichain OFT"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AppFooter.tsx",
                                        lineNumber: 12,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AppFooter.tsx",
                                lineNumber: 10,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "reveal-up stagger-2 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-display rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-900",
                                        children: "Resources"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AppFooter.tsx",
                                        lineNumber: 17,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                            href: "https://www.nabat.finance",
                                            className: "rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                                            children: "Website"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 20,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                            href: "https://docs.layerzero.network",
                                            className: "rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                                            children: "LayerZero Docs"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 23,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "reveal-up stagger-3 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-display rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-900",
                                        children: "Community"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AppFooter.tsx",
                                        lineNumber: 30,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                            href: "https://x.com/NBT_V2",
                                            className: "rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                                            children: "Twitter"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                            href: "https://discord.gg/nabatfinance",
                                            className: "rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                                            children: "Discord"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                            href: "https://t.me/NabatOmnichainGovernment",
                                            className: "rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                                            children: "Telegram"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/AppFooter.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 border-t border-slate-900/10 pt-8 text-center font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.12em] text-slate-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600",
                            children: "© 2026 ONabat"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                            href: "https://base.org/builders/minikit",
                            className: "inline-flex rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-700 transition-colors hover:text-cyan-800",
                            children: "Built on Base with MiniKit"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/AppFooter.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/shell/AppFooter.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shell/AppFooter.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/ShellStyles.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShellStyles",
    ()=>ShellStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ShellStyles() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
        children: `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;700&display=swap');

      :root {
        --brand-ink: #0d1628;
        --brand-muted: #4a5a77;
        --brand-forest: #0b5e71;
        --brand-leaf: #1d4ed8;
        --brand-sun: #ea580c;
        --brand-sand: #f1f5fb;
        --brand-cream: #f8fbff;
      }

      body {
        margin: 0;
        font-family: 'Plus Jakarta Sans', 'Segoe UI Variable', 'Segoe UI', sans-serif;
        letter-spacing: 0.002em;
        color: var(--brand-ink);
        background: #edf2f8;
      }

      .brand-display {
        font-family: 'Sora', 'Segoe UI Variable', sans-serif;
        letter-spacing: -0.018em;
      }

      .brand-root {
        position: relative;
        min-height: 100vh;
        background:
          radial-gradient(900px 540px at -10% -12%, rgba(29, 78, 216, 0.14), transparent 62%),
          radial-gradient(760px 420px at 110% -10%, rgba(11, 94, 113, 0.14), transparent 58%),
          linear-gradient(180deg, #f5f8fd 0%, #edf3fb 46%, #e8eef8 100%);
      }

      .brand-root::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
        background-size: 34px 34px;
        mask-image: radial-gradient(circle at 50% 10%, black 14%, transparent 72%);
        opacity: 0.28;
        z-index: 0;
      }

      .brand-root > * {
        position: relative;
        z-index: 1;
      }

      .brand-surface {
        box-shadow: 0 22px 52px rgba(10, 20, 40, 0.16);
      }

      .brand-card {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(245, 250, 255, 0.88));
        border: 1px solid rgba(10, 20, 40, 0.12);
        box-shadow: 0 18px 44px rgba(10, 20, 40, 0.12);
        backdrop-filter: blur(7px);
      }

      .brand-hero {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(10, 20, 40, 0.12);
        background:
          linear-gradient(132deg, rgba(255, 255, 255, 0.98), rgba(245, 248, 255, 0.95)),
          radial-gradient(circle at 84% 18%, rgba(29, 78, 216, 0.15), transparent 48%);
        box-shadow: 0 18px 40px rgba(10, 20, 40, 0.12);
      }

      .brand-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
            radial-gradient(110% 140% at 0% 0%, rgba(14, 165, 233, 0.2), transparent 58%),
            radial-gradient(120% 130% at 100% 100%, rgba(2, 132, 199, 0.12), transparent 60%);
      }

      .hero-graphic::before,
      .hero-graphic::after {
        content: '';
        position: absolute;
        pointer-events: none;
        border-radius: 999px;
      }

      .hero-graphic::before {
        width: 320px;
        height: 320px;
        right: -100px;
        top: -120px;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.28), transparent 70%);
        opacity: 0.52;
        animation: driftA 13s ease-in-out infinite;
      }

      .hero-graphic::after {
        width: 280px;
        height: 280px;
        left: -90px;
        bottom: -120px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.24), transparent 70%);
        opacity: 0.45;
        animation: driftB 15s ease-in-out infinite;
      }

      .mesh-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
        background-size: 24px 24px;
        mask-image: radial-gradient(circle at 20% 25%, black 18%, transparent 76%);
        opacity: 0.32;
      }

      .motion-card {
        transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
        border-radius: 0.95rem;
      }

      .motion-card:hover {
        transform: translateY(-4px);
        border-color: rgba(3, 105, 161, 0.52);
        box-shadow: 0 16px 38px rgba(10, 20, 40, 0.14);
      }

      .metric-card {
        animation: metricFloat 6.4s ease-in-out infinite;
      }

      .metric-card:nth-child(2) {
        animation-delay: 180ms;
      }

      .metric-card:nth-child(3) {
        animation-delay: 360ms;
      }

      .content-stage {
        animation: contentIn 380ms ease;
      }

      .logo-float {
        animation: logoFloat 3.2s ease-in-out infinite;
      }

      .hero-ring {
        animation: ringPulse 2.8s ease-in-out infinite;
      }

      .reveal-up {
        animation: revealUp 420ms ease both;
      }

      .stagger-1 {
        animation-delay: 80ms;
      }

      .stagger-2 {
        animation-delay: 140ms;
      }

      .stagger-3 {
        animation-delay: 210ms;
      }

      .brand-button {
        border: 1px solid rgba(3, 105, 161, 0.45);
        background: linear-gradient(120deg, #1d4ed8, #0891b2);
        color: #ffffff;
        box-shadow: 0 10px 24px rgba(3, 105, 161, 0.3);
        transition: transform 180ms ease, filter 180ms ease;
      }

      .brand-button:hover {
        transform: translateY(-1px);
        filter: brightness(1.04);
      }

      .brand-button:disabled {
        filter: grayscale(0.2) brightness(0.9);
        box-shadow: none;
        cursor: not-allowed;
      }

      .brand-input {
        color: var(--brand-ink);
        background: rgba(255, 255, 255, 0.85);
        border-color: rgba(8, 145, 178, 0.28);
        caret-color: var(--brand-leaf);
      }

      .brand-input::placeholder {
        color: rgba(71, 85, 105, 0.8);
      }

      .brand-panel {
        position: relative;
        overflow: hidden;
        border-radius: 1.2rem;
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(242, 248, 255, 0.9));
        box-shadow: 0 18px 44px rgba(10, 20, 40, 0.12);
        backdrop-filter: blur(8px);
      }

      .brand-panel::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.45), transparent 28%),
            radial-gradient(120% 90% at 0% 0%, rgba(37, 99, 235, 0.12), transparent 58%);
      }

      .brand-panel > * {
        position: relative;
        z-index: 1;
      }

      .scanline-panel::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: linear-gradient(to bottom, rgba(2, 6, 23, 0.06) 1px, transparent 1px);
        background-size: 100% 4px;
        opacity: 0.22;
        mask-image: linear-gradient(to bottom, black 0%, transparent 82%);
      }

      .kicker-label {
        font-family: 'IBM Plex Mono', 'Segoe UI', monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(11, 18, 35, 0.58);
      }

      .status-rail {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: linear-gradient(90deg, rgba(29, 78, 216, 0.11), rgba(14, 165, 233, 0.08));
        border-radius: 0.72rem;
        padding: 0.45rem 0.62rem;
      }

      .status-rail-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #0284c7;
        box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.2);
      }

      .telemetry-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.7rem;
        border-top: 1px solid rgba(10, 20, 40, 0.1);
        padding: 0.46rem 0;
      }

      .telemetry-row:first-child {
        border-top: none;
        padding-top: 0;
      }

      .telemetry-key {
        font-family: 'IBM Plex Mono', 'Segoe UI', monospace;
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(11, 18, 35, 0.64);
      }

      .telemetry-value {
        font-weight: 700;
        color: #0b1223;
      }

      .brand-secondary-button {
        border: 1px solid rgba(8, 145, 178, 0.3);
        background: rgba(255, 255, 255, 0.85);
        color: var(--brand-ink);
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
      }

      .brand-secondary-button:hover {
        transform: translateY(-1px);
        border-color: rgba(8, 145, 178, 0.52);
        background: rgba(255, 255, 255, 0.98);
      }

      .brand-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        border-radius: 9999px;
        border: 1px solid rgba(10, 20, 40, 0.14);
        background: rgba(255, 255, 255, 0.84);
        padding: 0.26rem 0.62rem;
      }

      .brand-pill-soft {
        border-color: rgba(3, 105, 161, 0.22);
        background: rgba(230, 244, 255, 0.8);
      }

      .brand-stat-card {
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(238, 246, 255, 0.88));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
      }

      .brand-highlight-bar {
        border: 1px solid rgba(3, 105, 161, 0.24);
        background: linear-gradient(90deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.12));
      }

      .visual-orb-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.5rem;
      }

      .visual-icon-tile {
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: rgba(255, 255, 255, 0.92);
        border-radius: 0.95rem;
        padding: 0.52rem;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-weight: 700;
        font-size: 11px;
        color: var(--brand-ink);
        box-shadow: 0 10px 20px rgba(10, 20, 40, 0.08);
        transition: transform 220ms ease, border-color 220ms ease;
      }

      .visual-icon-tile:hover {
        transform: translateY(-2px);
        border-color: rgba(8, 145, 178, 0.45);
      }

      .visual-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #0891b2;
        box-shadow: 0 0 0 4px rgba(8, 145, 178, 0.18);
        animation: visualDotPulse 2.8s ease-in-out infinite;
      }

      .signal-constellation {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem;
      }

      .pulse-bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 20px;
      }

      .pulse-bars span {
        width: 4px;
        border-radius: 999px;
        background: linear-gradient(180deg, #0ea5e9, #1d4ed8);
        animation: pulseBars 1.4s ease-in-out infinite;
      }

      .pulse-bars span:nth-child(2) { animation-delay: 120ms; }
      .pulse-bars span:nth-child(3) { animation-delay: 240ms; }
      .pulse-bars span:nth-child(4) { animation-delay: 360ms; }
      .pulse-bars span:nth-child(5) { animation-delay: 480ms; }

      .action-panel {
        position: relative;
        overflow: hidden;
      }

      .action-panel::before {
        content: '';
        position: absolute;
        inset: -20% -10%;
        pointer-events: none;
        background:
          radial-gradient(40% 40% at 12% 18%, rgba(37, 99, 235, 0.12), transparent 72%),
          radial-gradient(36% 36% at 88% 22%, rgba(14, 165, 233, 0.1), transparent 74%),
          linear-gradient(120deg, transparent 18%, rgba(255, 255, 255, 0.26) 48%, transparent 76%);
        transform: translate3d(-8%, 0, 0);
        animation: panelSweep 11s ease-in-out infinite;
      }

      .action-panel > * {
        position: relative;
        z-index: 1;
      }

      .chip-pulse {
        animation: chipPulse 3.8s ease-in-out infinite;
      }

      .mini-orb {
        animation: orbDrift 4.8s ease-in-out infinite;
      }

      .cta-button {
        transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease, border-color 220ms ease;
      }

      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
      }

      .tab-pill {
        position: relative;
        overflow: hidden;
      }

      .tab-pill-active::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(125deg, rgba(255, 255, 255, 0.14), transparent 42%, rgba(125, 211, 252, 0.12));
        animation: activeTabGlow 3.2s ease-in-out infinite;
      }

      .tab-pill::after {
        content: '';
        position: absolute;
        top: 0;
        left: -45%;
        width: 34%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.38), transparent);
        opacity: 0;
        transition: opacity 220ms ease;
      }

      .tab-pill:hover::after {
        opacity: 1;
        animation: tabSweep 1s ease;
      }

      .takeover-glow {
        position: relative;
      }

      .takeover-glow::after {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        border: 1px solid rgba(245, 158, 11, 0.4);
        pointer-events: none;
      }

      .takeover-pulse {
        animation: takeoverPulse 2.6s ease-in-out infinite;
      }

      .module-shell {
        position: relative;
        overflow: hidden;
        border-radius: 1.25rem;
      }

      .module-shell::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(37, 99, 235, 0.1), transparent 52%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.1), transparent 58%);
      }

      .module-shell-token {
        border-color: rgba(8, 145, 178, 0.4) !important;
      }

      .module-shell-token::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(16, 185, 129, 0.16), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.15), transparent 58%);
      }

      .module-shell-bridge {
        border-color: rgba(37, 99, 235, 0.35) !important;
      }

      .module-shell-bridge::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(59, 130, 246, 0.18), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(56, 189, 248, 0.14), transparent 58%);
      }

      .module-shell-staking {
        border-color: rgba(22, 163, 74, 0.35) !important;
      }

      .module-shell-staking::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(34, 197, 94, 0.16), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(245, 158, 11, 0.14), transparent 58%);
      }

      .module-shell-governance {
        border-color: rgba(59, 130, 246, 0.34) !important;
      }

      .module-shell-governance::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(96, 165, 250, 0.18), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.13), transparent 58%);
      }

      .module-shell-sale {
        border-color: rgba(56, 189, 248, 0.35) !important;
      }

      .module-shell-sale::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(56, 189, 248, 0.16), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.14), transparent 58%);
      }

      .module-grid-bg {
        position: relative;
      }

      .module-grid-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px);
        background-size: 24px 24px;
        mask-image: linear-gradient(to bottom, black 20%, transparent 86%);
      }

      .glass-tile {
        border: 1px solid rgba(15, 23, 42, 0.1);
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(7px);
        border-radius: 1rem;
      }

      @keyframes contentIn {
        from {
          opacity: 0;
          transform: translateY(7px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes revealUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes logoFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }

      @keyframes ringPulse {
        0%,
        100% {
          opacity: 0.55;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.08);
        }
      }

      @keyframes driftA {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-16px, 12px);
        }
      }

      @keyframes driftB {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(16px, -14px);
        }
      }

      @keyframes tabSweep {
        from {
          left: -45%;
        }
        to {
          left: 130%;
        }
      }

      @keyframes takeoverPulse {
        0%,
        100% {
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
        }
        50% {
          box-shadow: 0 26px 64px rgba(245, 158, 11, 0.22);
        }
      }

      @keyframes metricFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      @keyframes panelSweep {
        0%,
        100% {
          transform: translate3d(-8%, 0, 0) rotate(0deg);
          opacity: 0.78;
        }
        50% {
          transform: translate3d(8%, -2%, 0) rotate(2deg);
          opacity: 1;
        }
      }

      @keyframes chipPulse {
        0%,
        100% {
          transform: translateY(0);
          box-shadow: 0 0 0 0 rgba(14, 165, 233, 0);
        }
        50% {
          transform: translateY(-1px);
          box-shadow: 0 0 0 5px rgba(14, 165, 233, 0.08);
        }
      }

      @keyframes orbDrift {
        0%,
        100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-4px) scale(1.02);
        }
      }

      @keyframes activeTabGlow {
        0%,
        100% {
          opacity: 0.65;
        }
        50% {
          opacity: 1;
        }
      }

      @keyframes visualDotPulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(8, 145, 178, 0.12);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(8, 145, 178, 0.2);
        }
      }

      @keyframes pulseBars {
        0%,
        100% {
          height: 7px;
          opacity: 0.7;
        }
        50% {
          height: 20px;
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        .brand-root::before {
          opacity: 0.2;
        }

        .hero-graphic::before {
          width: 240px;
          height: 240px;
          right: -130px;
        }

        .hero-graphic::after {
          width: 220px;
          height: 220px;
          left: -120px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal-up,
        .content-stage,
        .logo-float,
        .hero-ring,
        .hero-graphic::before,
        .hero-graphic::after,
        .takeover-pulse,
        .metric-card,
        .action-panel::before,
        .chip-pulse,
        .mini-orb,
        .tab-pill-active::before {
          animation: none !important;
        }

        .pulse-bars span,
        .visual-dot {
          animation: none !important;
        }

        .motion-card,
        .brand-secondary-button,
        .brand-button,
        .cta-button {
          transition: none !important;
        }
      }
    `
    }, void 0, false, {
        fileName: "[project]/components/shell/ShellStyles.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/QuantumSignalPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuantumSignalPanel",
    ()=>QuantumSignalPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function QuantumSignalPanel({ activeTab, prediction, refreshing, retraining = false, hasError, errorText, onRetry, onRetrain }) {
    const progressWidthClass = (probability)=>{
        if (probability >= 0.95) return 'w-full';
        if (probability >= 0.85) return 'w-5/6';
        if (probability >= 0.7) return 'w-4/5';
        if (probability >= 0.55) return 'w-3/5';
        if (probability >= 0.4) return 'w-2/5';
        if (probability >= 0.25) return 'w-1/4';
        if (probability > 0) return 'w-[12%]';
        return 'w-[6%]';
    };
    const trendHeightClass = (probability)=>{
        if (probability >= 0.9) return 'h-8';
        if (probability >= 0.75) return 'h-7';
        if (probability >= 0.6) return 'h-6';
        if (probability >= 0.45) return 'h-5';
        if (probability >= 0.3) return 'h-4';
        return 'h-3';
    };
    const [liquidityTweak, setLiquidityTweak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [bridgeTweak, setBridgeTweak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [governanceTweak, setGovernanceTweak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [compactMode, setCompactMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, [
        liquidityTweak,
        bridgeTweak,
        governanceTweak,
        compactMode
    ]);
    const tabIntentLabel = {
        token: 'Transfer readiness',
        bridge: 'Bridge execution safety',
        staking: 'Staking opportunity quality',
        governance: 'Governance participation quality',
        'private-sale': 'Private sale timing quality',
        about: 'Ecosystem posture',
        'quantum-ai': 'AI strategy readiness',
        wallet: 'Wallet activity'
    };
    const signal = prediction?.signal ?? 'caution';
    const signalLabel = signal === 'risk-on' ? 'Risk-on' : 'Caution';
    const confidenceValue = prediction?.confidence ?? 0;
    const confidenceClass = confidenceValue >= 0.72 ? 'text-emerald-700' : confidenceValue >= 0.5 ? 'text-amber-700' : 'text-rose-700';
    const signalClass = signal === 'risk-on' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-orange-300 bg-orange-50 text-orange-900';
    const recommendationList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!prediction) {
            return [
                'Syncing telemetry',
                'Awaiting next pulse'
            ];
        }
        if (activeTab === 'bridge') {
            return signal === 'risk-on' ? [
                'Bridge route stable',
                'Default slippage OK'
            ] : [
                'Split bridge size',
                'Delay non-urgent'
            ];
        }
        if (activeTab === 'staking') {
            return signal === 'risk-on' ? [
                'Normal horizons',
                'Regular compounding'
            ] : [
                'Shorter horizons',
                'Claim then hold'
            ];
        }
        if (activeTab === 'governance') {
            return signal === 'risk-on' ? [
                'Vote windows open',
                'Delegate refresh OK'
            ] : [
                'Prioritize key votes',
                'Re-check before final'
            ];
        }
        if (activeTab === 'private-sale') {
            return signal === 'risk-on' ? [
                'Entry window favorable',
                'Stagger entries'
            ] : [
                'Smaller staged buys',
                'Preserve dry powder'
            ];
        }
        return signal === 'risk-on' ? [
            'Execution favorable',
            'Normal cadence'
        ] : [
            'Defensive pacing',
            'Low slippage first'
        ];
    }, [
        activeTab,
        prediction,
        signal
    ]);
    const constellation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return [
            {
                icon: '💧',
                label: 'Liquidity',
                value: prediction ? `${Math.round(prediction.features.liquidity_health * 100)}%` : '--'
            },
            {
                icon: '🌉',
                label: 'Bridge',
                value: prediction ? `${Math.round(prediction.features.bridge_reliability * 100)}%` : '--'
            },
            {
                icon: '🗳️',
                label: 'Gov',
                value: prediction ? `${Math.round(prediction.features.governance_participation * 100)}%` : '--'
            },
            {
                icon: signal === 'risk-on' ? '🟢' : '🟠',
                label: 'Mode',
                value: signalLabel
            }
        ];
    }, [
        prediction,
        signal,
        signalLabel
    ]);
    const scenario = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!prediction) {
            return {
                probability: 0,
                signal: 'caution'
            };
        }
        const clamp01 = (value)=>Math.min(1, Math.max(0, value));
        const liquidity = clamp01(prediction.features.liquidity_health + liquidityTweak / 100);
        const bridge = clamp01(prediction.features.bridge_reliability + bridgeTweak / 100);
        const governance = clamp01(prediction.features.governance_participation + governanceTweak / 100);
        const weighted = liquidity * 0.45 + bridge * 0.35 + governance * 0.2;
        const uncertaintyPenalty = (1 - prediction.confidence) * 0.15;
        const probability = clamp01(weighted - uncertaintyPenalty);
        return {
            probability,
            signal: probability >= 0.55 ? 'risk-on' : 'caution'
        };
    }, [
        prediction,
        liquidityTweak,
        bridgeTweak,
        governanceTweak
    ]);
    const recentDelta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const history = prediction?.recent ?? [];
        if (history.length < 2) return 0;
        return history[history.length - 1].probabilityHealthy - history[0].probabilityHealthy;
    }, [
        prediction?.recent
    ]);
    const trendLabel = recentDelta > 0.02 ? 'Improving' : recentDelta < -0.02 ? 'Softening' : 'Stable';
    const trendClass = recentDelta > 0.02 ? 'text-emerald-700' : recentDelta < -0.02 ? 'text-rose-700' : 'text-[color:var(--brand-ink)]/80';
    const signalButtons = [
        signalLabel,
        tabIntentLabel[activeTab],
        trendLabel,
        prediction ? `${(confidenceValue * 100).toFixed(1)}% confidence` : 'Confidence --'
    ];
    if (hasError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "mb-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Quantum signal is temporarily unavailable.",
                            errorText ? ` ${errorText}` : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRetry,
                        className: "brand-secondary-button rounded-md px-3 py-1 text-xs font-medium",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
            lineNumber: 224,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brand-panel mb-6 p-4 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "Quantum Telemetry"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    signalButtons.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-950",
                                            children: item
                                        }, item, false, {
                                            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-sm font-semibold text-slate-900",
                                children: "Quantum Signal"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCompactMode((current)=>!current),
                                className: "rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50",
                                children: compactMode ? 'Show Details' : 'Hide Details'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            onRetrain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onRetrain,
                                disabled: retraining,
                                className: "rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60",
                                children: retraining ? 'Retraining...' : 'Retrain'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${signalClass}`,
                                children: signalLabel
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                        children: [
                            "Healthy ",
                            prediction ? `${(prediction.probabilityHealthy * 100).toFixed(1)}%` : '--'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold ${confidenceClass}`,
                        children: [
                            "Confidence ",
                            prediction ? `${(prediction.confidence * 100).toFixed(1)}%` : '--'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                        children: [
                            "Mode ",
                            prediction?.mode ?? '--'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-left text-sm font-semibold text-slate-900",
                        children: [
                            prediction?.label ?? '--',
                            " ",
                            refreshing ? 'refreshing...' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 rounded-xl border border-slate-200 bg-white/90 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/65",
                        children: "Signal Constellation"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "signal-constellation mt-2",
                        children: constellation.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "visual-icon-tile w-full justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-slate-900/10 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700",
                                        children: item.value
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.label, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    !compactMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-1.5 text-xs sm:text-sm",
                        children: recommendationList.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-1.5 text-[color:var(--brand-ink)]/85",
                                children: [
                                    "• ",
                                    item
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 324,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-2 overflow-hidden rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `block h-full rounded-full transition-all duration-500 ease-out ${scenario.signal === 'risk-on' ? 'bg-emerald-500/80' : 'bg-orange-500/80'} ${progressWidthClass(scenario.probability)}`
                        }, void 0, false, {
                            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                            lineNumber: 336,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex items-end gap-1 h-10",
                        "aria-label": "Recent quantum signal trend",
                        children: (prediction?.recent ?? []).map((point, idx)=>{
                            const height = Math.max(10, Math.round(point.probabilityHealthy * 32));
                            const barClass = point.signal === 'risk-on' ? 'bg-emerald-500/75 border-emerald-600/35' : 'bg-orange-500/75 border-orange-600/35';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: `${(point.probabilityHealthy * 100).toFixed(1)}%`,
                                className: `w-2 rounded-sm border transition-all duration-500 ease-out ${barClass} ${trendHeightClass(point.probabilityHealthy)}`
                            }, `${point.generatedAt}-${idx}`, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 351,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, this),
            !compactMode && prediction?.confidenceEngine?.components && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 rounded-xl border border-slate-200 bg-white/90 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/65",
                        children: [
                            "Confidence Engine v",
                            prediction.confidenceEngine.version
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-1.5 text-xs sm:grid-cols-5",
                        children: [
                            {
                                key: 'modelMargin',
                                label: 'Model Margin'
                            },
                            {
                                key: 'featureConsensus',
                                label: 'Feature Consensus'
                            },
                            {
                                key: 'temporalStability',
                                label: 'Temporal Stability'
                            },
                            {
                                key: 'backendReliability',
                                label: 'Backend Reliability'
                            },
                            {
                                key: 'trendAlignment',
                                label: 'Trend Alignment'
                            }
                        ].map(({ key, label })=>{
                            const value = prediction.confidenceEngine.components[key];
                            const pct = Math.round(value * 100);
                            const colorClass = pct >= 70 ? 'text-emerald-700' : pct >= 45 ? 'text-amber-700' : 'text-rose-700';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-lg border border-slate-200 bg-white/80 px-2 py-2 text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 379,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-sm font-bold ${colorClass}`,
                                        children: [
                                            pct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 380,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 h-1 overflow-hidden rounded-full bg-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `block h-full rounded-full transition-all duration-500 ${pct >= 70 ? 'bg-emerald-500/80' : pct >= 45 ? 'bg-amber-500/80' : 'bg-rose-500/80'} ${progressWidthClass(value)}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                            lineNumber: 382,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 381,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 378,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 362,
                columnNumber: 9
            }, this),
            !compactMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card mt-3 rounded-xl px-3 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-ink)]/65",
                                children: "Scenario Lab"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "What-if simulation"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold",
                                                children: "Liquidity bias"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold",
                                                children: [
                                                    liquidityTweak > 0 ? `+${liquidityTweak}` : liquidityTweak,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        "aria-label": "Liquidity bias",
                                        title: "Liquidity bias",
                                        min: -30,
                                        max: 30,
                                        step: 5,
                                        value: liquidityTweak,
                                        onChange: (event)=>setLiquidityTweak(Number(event.target.value)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold",
                                                children: "Bridge bias"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 427,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold",
                                                children: [
                                                    bridgeTweak > 0 ? `+${bridgeTweak}` : bridgeTweak,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        "aria-label": "Bridge bias",
                                        title: "Bridge bias",
                                        min: -30,
                                        max: 30,
                                        step: 5,
                                        value: bridgeTweak,
                                        onChange: (event)=>setBridgeTweak(Number(event.target.value)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 425,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold",
                                                children: "Governance bias"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold",
                                                children: [
                                                    governanceTweak > 0 ? `+${governanceTweak}` : governanceTweak,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        "aria-label": "Governance bias",
                                        title: "Governance bias",
                                        min: -30,
                                        max: 30,
                                        step: 5,
                                        value: governanceTweak,
                                        onChange: (event)=>setGovernanceTweak(Number(event.target.value)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 443,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 406,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-pill brand-pill-soft mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs sm:text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                children: [
                                    "Simulated Healthy Probability:",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: prediction ? `${(scenario.probability * 100).toFixed(1)}%` : '--'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 465,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${scenario.signal === 'risk-on' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-orange-300 bg-orange-50 text-orange-800'}`,
                                children: [
                                    "Simulated ",
                                    scenario.signal === 'risk-on' ? 'Risk-on' : 'Caution'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 467,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 462,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 396,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/AbiDrivenStudio.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbiDrivenStudio",
    ()=>AbiDrivenStudio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$arbitrum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/arbitrum.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const CONTRACT_PRESETS = [
    {
        id: 'token',
        label: 'ONBT Omnichain Token',
        description: 'ERC-20 and LayerZero OFT methods for transfers and bridge prep.',
        addresses: {
            8453: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"],
            42161: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_ARBITRUM_ADDRESS"]
        },
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"]
    },
    {
        id: 'staking',
        label: 'ONBT Omnichain Staking',
        description: 'Stake, claim, and rewards operations across chains.',
        addresses: {
            8453: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"],
            42161: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ARBITRUM_ADDRESS"]
        },
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"]
    },
    {
        id: 'private-sale',
        label: 'ONBT Private Sale',
        description: 'Sale quotas, pricing, and purchase-related contract methods.',
        addresses: {
            8453: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_BASE_ADDRESS"],
            42161: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS"]
        },
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"]
    }
];
const BLOCKED_WRITE_FUNCTIONS = new Set([
    'renounceOwnership',
    'transferOwnership',
    'setPeer',
    'setDelegate'
]);
const HIGH_RISK_WRITE_FUNCTIONS = new Set([
    'send',
    'stake',
    'withdraw',
    'claimRewards',
    'approve',
    'transfer',
    'buyWithETH',
    'buyWithUSDC',
    'buyWithUSDT'
]);
const ALLOWED_WRITE_FUNCTIONS = {
    token: new Set([
        'approve',
        'transfer',
        'send'
    ]),
    staking: new Set([
        'stake',
        'unstake',
        'claimRewards',
        'compound',
        'delegate'
    ]),
    'private-sale': new Set([
        'buyWithETH',
        'buyWithToken'
    ])
};
const FUNCTION_LABELS = {
    balanceOf: 'Wallet Balance',
    totalSupply: 'Total Supply',
    allowance: 'Allowance Check',
    approve: 'Set Spending Allowance',
    transfer: 'Transfer Tokens',
    transferFrom: 'Transfer From Allowance',
    quoteSend: 'Bridge Fee Quote',
    send: 'Bridge Transfer',
    stake: 'Stake Tokens',
    unstake: 'Unstake Tokens',
    claimRewards: 'Claim Rewards',
    pendingRewards: 'Pending Rewards',
    buyWithETH: 'Buy With ETH',
    buyWithUSDC: 'Buy With USDC',
    buyWithUSDT: 'Buy With USDT',
    getUserInfo: 'User Sale Profile',
    saleInfo: 'Sale Configuration',
    owner: 'Contract Owner',
    transferOwnership: 'Transfer Ownership'
};
const CATEGORY_LABELS = {
    balances: 'Balances And State',
    transfers: 'Transfers And Bridging',
    staking: 'Staking And Rewards',
    governance: 'Governance',
    permissions: 'Permissions',
    admin: 'Admin',
    pricing: 'Pricing And Sale',
    other: 'Other'
};
const CATEGORY_ORDER = [
    'balances',
    'transfers',
    'staking',
    'governance',
    'permissions',
    'pricing',
    'admin',
    'other'
];
const READ_CATEGORY_STYLES = {
    balances: {
        bg: 'from-sky-500/15 to-cyan-500/10',
        border: 'border-sky-400/45',
        text: 'text-sky-950',
        ring: 'ring-sky-400',
        shadow: 'shadow-[0_0_18px_rgba(14,165,233,0.35)]',
        hover: 'hover:shadow-[0_0_12px_rgba(14,165,233,0.2)]',
        icon: '💧'
    },
    transfers: {
        bg: 'from-indigo-500/15 to-blue-500/10',
        border: 'border-indigo-400/45',
        text: 'text-indigo-950',
        ring: 'ring-indigo-400',
        shadow: 'shadow-[0_0_18px_rgba(99,102,241,0.35)]',
        hover: 'hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]',
        icon: '🚀'
    },
    staking: {
        bg: 'from-emerald-500/15 to-green-500/10',
        border: 'border-emerald-400/45',
        text: 'text-emerald-950',
        ring: 'ring-emerald-400',
        shadow: 'shadow-[0_0_18px_rgba(52,211,153,0.35)]',
        hover: 'hover:shadow-[0_0_12px_rgba(52,211,153,0.2)]',
        icon: '🔒'
    },
    governance: {
        bg: 'from-violet-500/15 to-purple-500/10',
        border: 'border-violet-400/45',
        text: 'text-violet-950',
        ring: 'ring-violet-400',
        shadow: 'shadow-[0_0_18px_rgba(139,92,246,0.35)]',
        hover: 'hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]',
        icon: '🏛️'
    },
    permissions: {
        bg: 'from-amber-400/15 to-yellow-400/10',
        border: 'border-amber-400/45',
        text: 'text-amber-950',
        ring: 'ring-amber-400',
        shadow: 'shadow-[0_0_18px_rgba(251,191,36,0.35)]',
        hover: 'hover:shadow-[0_0_12px_rgba(251,191,36,0.2)]',
        icon: '🔐'
    },
    admin: {
        bg: 'from-slate-300/15 to-gray-200/10',
        border: 'border-slate-300/45',
        text: 'text-slate-600',
        ring: 'ring-slate-300',
        shadow: 'shadow-[0_0_12px_rgba(148,163,184,0.25)]',
        hover: 'hover:shadow-[0_0_8px_rgba(148,163,184,0.15)]',
        icon: '⚙️'
    },
    pricing: {
        bg: 'from-orange-400/15 to-amber-400/10',
        border: 'border-orange-400/45',
        text: 'text-orange-950',
        ring: 'ring-orange-400',
        shadow: 'shadow-[0_0_18px_rgba(251,146,60,0.35)]',
        hover: 'hover:shadow-[0_0_12px_rgba(251,146,60,0.2)]',
        icon: '💵'
    },
    other: {
        bg: 'from-slate-200/15 to-slate-100/10',
        border: 'border-slate-200/45',
        text: 'text-slate-700',
        ring: 'ring-slate-200',
        shadow: 'shadow-[0_0_10px_rgba(148,163,184,0.2)]',
        hover: 'hover:shadow-[0_0_8px_rgba(148,163,184,0.1)]',
        icon: '◦'
    }
};
function stringifyResult(value) {
    return JSON.stringify(value, (_key, candidate)=>typeof candidate === 'bigint' ? candidate.toString() : candidate, 2);
}
function humanizeFunctionName(name) {
    if (FUNCTION_LABELS[name]) return FUNCTION_LABELS[name];
    return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (char)=>char.toUpperCase());
}
function categorizeFunction(name) {
    if (/balance|supply|get|pending|quote|info|state|name|symbol|decimals/i.test(name)) return 'balances';
    if (/send|transfer|bridge|mint|burn/i.test(name)) return 'transfers';
    if (/stake|unstake|reward|claim|lockup/i.test(name)) return 'staking';
    if (/vote|proposal|delegate|govern/i.test(name)) return 'governance';
    if (/allowance|approve|permit/i.test(name)) return 'permissions';
    if (/buy|sale|price|quota|tier/i.test(name)) return 'pricing';
    if (/owner|admin|set|pause|upgrade|peer|delegate/i.test(name)) return 'admin';
    return 'other';
}
function tupleComponents(param) {
    const maybeTuple = param;
    return maybeTuple.components || [];
}
function parseTupleObject(clean) {
    try {
        const parsed = JSON.parse(clean);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('Tuple must be a JSON object');
        }
        return parsed;
    } catch  {
        throw new Error('Tuple input must be valid JSON object');
    }
}
function parseByParam(raw, param) {
    const solidityType = param.type;
    const clean = raw.trim();
    if (solidityType.endsWith('[]')) {
        const itemType = solidityType.slice(0, -2);
        const itemParam = {
            ...param,
            type: itemType
        };
        if (!clean) return [];
        if (itemType.startsWith('tuple')) {
            try {
                const parsed = JSON.parse(clean);
                if (!Array.isArray(parsed)) throw new Error();
                return parsed.map((entry)=>{
                    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
                        throw new Error('Tuple array entry must be an object');
                    }
                    const obj = entry;
                    return tupleComponents(itemParam).map((component, index)=>{
                        const key = component.name || `arg${index}`;
                        return parseByParam(String(obj[key] ?? ''), component);
                    });
                });
            } catch  {
                throw new Error('Tuple array input must be valid JSON array');
            }
        }
        return clean.split(',').map((part)=>parseByParam(part, itemParam));
    }
    if (solidityType.startsWith('uint') || solidityType.startsWith('int')) {
        if (!clean) throw new Error(`Missing number for type ${solidityType}`);
        return BigInt(clean);
    }
    if (solidityType === 'bool') {
        return clean.toLowerCase() === 'true' || clean === '1';
    }
    if (solidityType === 'address') {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(clean)) throw new Error('Invalid address argument');
        return clean;
    }
    if (solidityType.startsWith('bytes')) {
        if (!clean.startsWith('0x')) throw new Error('Bytes input must be 0x-prefixed');
        return clean;
    }
    if (solidityType === 'tuple' || solidityType.startsWith('tuple')) {
        const tupleObj = parseTupleObject(clean);
        return tupleComponents(param).map((component, index)=>{
            const key = component.name || `arg${index}`;
            return parseByParam(String(tupleObj[key] ?? ''), component);
        });
    }
    return clean;
}
function defaultForInput(name, type, walletAddress) {
    if (type === 'tuple' || type.startsWith('tuple')) {
        return '{}';
    }
    if (type.endsWith('[]')) {
        return '';
    }
    if (type === 'address' && walletAddress && /(owner|account|user|to|recipient)/i.test(name || '')) {
        return walletAddress;
    }
    if (type.startsWith('uint') || type.startsWith('int')) {
        return '0';
    }
    if (type === 'bool') {
        return 'false';
    }
    return '';
}
function recommendedFunctionNames(tab, signal) {
    if (tab === 'bridge') {
        return signal === 'risk-on' ? [
            'quoteSend',
            'send',
            'balanceOf'
        ] : [
            'quoteSend',
            'balanceOf'
        ];
    }
    if (tab === 'staking') {
        return signal === 'risk-on' ? [
            'stake',
            'claimRewards',
            'pendingRewards'
        ] : [
            'pendingRewards',
            'getStakeInfo'
        ];
    }
    if (tab === 'private-sale') {
        return signal === 'risk-on' ? [
            'buyWithETH',
            'buyWithUSDC',
            'getUserInfo'
        ] : [
            'getUserInfo',
            'saleInfo'
        ];
    }
    if (tab === 'governance') {
        return [
            'balanceOf',
            'delegates',
            'allowance'
        ];
    }
    return [
        'balanceOf',
        'totalSupply',
        'name'
    ];
}
function AbiDrivenStudio({ activeTab, prediction }) {
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const [selectedContractId, setSelectedContractId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('token');
    // Keep SSR and initial client render deterministic to avoid hydration mismatch.
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(8453);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('read');
    const [selectedFunctionName, setSelectedFunctionName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [inputValues, setInputValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [payableValue, setPayableValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('0');
    const [isBusy, setIsBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [readResult, setReadResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [writeHash, setWriteHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusText, setStatusText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [confirmationText, setConfirmationText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    const selectedContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>CONTRACT_PRESETS.find((preset)=>preset.id === selectedContractId) || CONTRACT_PRESETS[0], [
        selectedContractId
    ]);
    const contractFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>selectedContract.abi.filter((item)=>item.type === 'function'), [
        selectedContract
    ]);
    const readFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>contractFunctions.filter((fn)=>fn.stateMutability === 'view' || fn.stateMutability === 'pure'), [
        contractFunctions
    ]);
    const writeFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>contractFunctions.filter((fn)=>(fn.stateMutability === 'nonpayable' || fn.stateMutability === 'payable') && ALLOWED_WRITE_FUNCTIONS[selectedContractId].has(fn.name)), [
        contractFunctions,
        selectedContractId
    ]);
    const selectedFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>mode === 'read' ? readFunctions.find((fn)=>fn.name === selectedFunctionName) : writeFunctions.find((fn)=>fn.name === selectedFunctionName), [
        mode,
        readFunctions,
        writeFunctions,
        selectedFunctionName
    ]);
    const selectedFunctionLabel = selectedFunction ? humanizeFunctionName(selectedFunction.name) : '';
    const selectedFunctionCategory = selectedFunction ? categorizeFunction(selectedFunction.name) : 'other';
    const requiresRiskConfirmation = mode === 'write' && !!selectedFunction && HIGH_RISK_WRITE_FUNCTIONS.has(selectedFunction.name);
    const blockedWrite = mode === 'write' && !!selectedFunction && BLOCKED_WRITE_FUNCTIONS.has(selectedFunction.name);
    const requiredPhrase = selectedFunction ? `EXECUTE ${selectedFunction.name}` : '';
    const suggestedFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const names = recommendedFunctionNames(activeTab, prediction?.signal);
        return names.filter((name)=>contractFunctions.some((fn)=>fn.name === name));
    }, [
        activeTab,
        contractFunctions,
        prediction?.signal
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (chain?.id === 8453 || chain?.id === 42161) {
            setSelectedChainId(chain.id);
        }
    }, [
        chain?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedFunction) {
            setInputValues({});
            return;
        }
        const next = {};
        selectedFunction.inputs.forEach((input, index)=>{
            const key = `${input.name || 'arg'}:${index}`;
            next[key] = defaultForInput(input.name, input.type, address);
        });
        setInputValues(next);
        setConfirmationText('');
    }, [
        selectedFunction,
        address
    ]);
    const activeAddress = selectedContract.addresses[selectedChainId];
    const applySmartTemplate = (template)=>{
        if (!selectedFunction) return;
        if (template === 'reset') {
            const reset = {};
            selectedFunction.inputs.forEach((input, index)=>{
                const key = `${input.name || 'arg'}:${index}`;
                reset[key] = defaultForInput(input.name, input.type, address);
            });
            setInputValues(reset);
            setPayableValue('0');
            return;
        }
        const patched = {
            ...inputValues
        };
        selectedFunction.inputs.forEach((input, index)=>{
            const key = `${input.name || 'arg'}:${index}`;
            if (template === 'wallet-self') {
                if (address && input.type === 'address') {
                    patched[key] = address;
                }
                return;
            }
            if (template === 'numeric-smoke') {
                if (input.type.startsWith('uint') || input.type.startsWith('int')) {
                    patched[key] = '1';
                }
                if (input.type === 'bool') {
                    patched[key] = 'false';
                }
            }
        });
        setInputValues(patched);
        if (template === 'numeric-smoke' && selectedFunction.stateMutability === 'payable') {
            setPayableValue('0.0001');
        }
    };
    const runReadDirect = async (fn)=>{
        if (!publicClient) return;
        setMode('read');
        setIsBusy(true);
        setStatusText('Reading…');
        setReadResult('');
        try {
            const result = await publicClient.readContract({
                address: activeAddress,
                abi: selectedContract.abi,
                functionName: fn.name,
                args: []
            });
            setReadResult(stringifyResult(result));
            setStatusText('Read successful.');
        } catch (error) {
            setStatusText(error instanceof Error ? error.message : 'Read failed');
        } finally{
            setIsBusy(false);
        }
    };
    const runRead = async ()=>{
        if (!selectedFunction || !publicClient) return;
        setIsBusy(true);
        setStatusText('Running contract read...');
        setReadResult('');
        try {
            const args = selectedFunction.inputs.map((input, index)=>{
                const key = `${input.name || 'arg'}:${index}`;
                return parseByParam(inputValues[key] || '', input);
            });
            const result = await publicClient.readContract({
                address: activeAddress,
                abi: selectedContract.abi,
                functionName: selectedFunction.name,
                args
            });
            setReadResult(stringifyResult(result));
            setStatusText('Read successful.');
        } catch (error) {
            setStatusText(error instanceof Error ? error.message : 'Read failed');
        } finally{
            setIsBusy(false);
        }
    };
    const runWrite = async ()=>{
        if (!selectedFunction || !publicClient) return;
        if (blockedWrite) {
            setStatusText(`Write blocked by studio safety policy: ${selectedFunction.name}`);
            return;
        }
        if (requiresRiskConfirmation && confirmationText !== requiredPhrase) {
            setStatusText(`Type \"${requiredPhrase}\" to confirm this high-risk write.`);
            return;
        }
        if (!address || !walletClient) {
            setStatusText('Connect wallet to submit write transactions.');
            return;
        }
        if (chain?.id !== selectedChainId) {
            switchChain({
                chainId: selectedChainId
            });
            setStatusText('Switching wallet chain. Retry after network switch.');
            return;
        }
        setIsBusy(true);
        setStatusText('Preparing transaction...');
        setWriteHash('');
        try {
            const args = selectedFunction.inputs.map((input, index)=>{
                const key = `${input.name || 'arg'}:${index}`;
                return parseByParam(inputValues[key] || '', input);
            });
            const value = selectedFunction.stateMutability === 'payable' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(payableValue || '0') : undefined;
            const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
                actionLabel: `ABI studio write (${selectedFunction.name})`,
                account: address,
                connectedChainId: chain?.id,
                targetChainId: selectedChainId,
                publicClient,
                request: {
                    address: activeAddress,
                    abi: selectedContract.abi,
                    functionName: selectedFunction.name,
                    args,
                    value
                }
            });
            if (!preflight.ok) {
                setStatusText(preflight.copy);
                return;
            }
            const hash = await walletClient.writeContract({
                account: address,
                chain: selectedChainId === 8453 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$arbitrum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arbitrum"],
                address: activeAddress,
                abi: selectedContract.abi,
                functionName: selectedFunction.name,
                args,
                value
            });
            setWriteHash(hash);
            setStatusText('Transaction submitted. Waiting for confirmation...');
            await publicClient.waitForTransactionReceipt({
                hash
            });
            setStatusText('Transaction confirmed.');
        } catch (error) {
            setStatusText(error instanceof Error ? error.message : 'Write failed');
        } finally{
            setIsBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brand-panel scanline-panel mb-6 p-4 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Contract Console"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "ABI Studio"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "Live ABI Actions"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 578,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-pill text-xs text-[color:var(--brand-ink)]/80",
                        children: [
                            "Quantum mode: ",
                            prediction?.signal ?? 'caution'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 582,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 570,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "status-rail mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-rail-dot",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                children: selectedContract.label
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 590,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 593,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 589,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-lg px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Contract Profile"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 601,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                "aria-label": "Contract profile",
                                title: "Contract profile",
                                value: selectedContractId,
                                onChange: (event)=>setSelectedContractId(event.target.value),
                                className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                                children: CONTRACT_PRESETS.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: preset.id,
                                        children: preset.label
                                    }, preset.id, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 612,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-slate-700",
                                children: selectedContract.description
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-lg px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Execution Chain"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                                label: "",
                                selectedChainId: selectedChainId,
                                onSelectChain: setSelectedChainId
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 626,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-slate-700 break-all",
                                children: activeAddress
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 631,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 599,
                columnNumber: 7
            }, this),
            suggestedFunctions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-highlight-bar mb-3 rounded-xl px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                        children: "Quantum Suggestions"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 639,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex flex-wrap gap-1.5",
                        children: suggestedFunctions.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setMode('read');
                                    setSelectedFunctionName(name);
                                },
                                className: "brand-pill text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45",
                                children: humanizeFunctionName(name)
                            }, name, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 644,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 642,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 638,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-800",
                                children: "Explore"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 660,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-[color:var(--brand-ink)]/45",
                                children: "contract reads"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 659,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: readFunctions.map((fn)=>{
                            const cat = categorizeFunction(fn.name);
                            const cs = READ_CATEGORY_STYLES[cat] ?? READ_CATEGORY_STYLES.other;
                            const isActive = mode === 'read' && selectedFunctionName === fn.name;
                            const isBusyHere = isBusy && isActive;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    const alreadyActive = mode === 'read' && selectedFunctionName === fn.name;
                                    setMode('read');
                                    setSelectedFunctionName(fn.name);
                                    if (!alreadyActive && fn.inputs.length === 0) void runReadDirect(fn);
                                },
                                className: [
                                    'relative flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 select-none',
                                    `bg-gradient-to-br ${cs.bg}`,
                                    cs.border,
                                    cs.text,
                                    isActive ? `ring-2 ring-offset-1 ${cs.ring} ${cs.shadow}` : cs.hover,
                                    isBusyHere ? 'animate-pulse' : ''
                                ].join(' '),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "leading-none",
                                        children: cs.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 690,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: humanizeFunctionName(fn.name)
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 691,
                                        columnNumber: 17
                                    }, this),
                                    fn.inputs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-white/55 px-1 text-[9px] font-bold leading-tight",
                                        children: fn.inputs.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 693,
                                        columnNumber: 19
                                    }, this),
                                    isBusyHere && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-cyan-400 opacity-75"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 698,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, fn.name, true, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 672,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 665,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 658,
                columnNumber: 7
            }, this),
            writeFunctions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-800",
                                children: "Actions"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 710,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-[color:var(--brand-ink)]/45",
                                children: "on-chain writes · wallet required"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 713,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: writeFunctions.map((fn)=>{
                            const isActive = mode === 'write' && selectedFunctionName === fn.name;
                            const isHighRisk = HIGH_RISK_WRITE_FUNCTIONS.has(fn.name);
                            const isBusyHere = isBusy && isActive;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setMode('write');
                                    setSelectedFunctionName(fn.name);
                                },
                                className: [
                                    'relative flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 select-none',
                                    isHighRisk ? 'bg-gradient-to-br from-rose-500/15 to-red-400/10 border-rose-400/50 text-rose-950' : 'bg-gradient-to-br from-amber-400/15 to-orange-300/10 border-amber-400/50 text-amber-950',
                                    isActive ? isHighRisk ? 'ring-2 ring-offset-1 ring-rose-400 shadow-[0_0_18px_rgba(244,63,94,0.35)]' : 'ring-2 ring-offset-1 ring-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.35)]' : isHighRisk ? 'hover:shadow-[0_0_12px_rgba(244,63,94,0.2)]' : 'hover:shadow-[0_0_12px_rgba(251,191,36,0.2)]',
                                    isBusyHere ? 'animate-pulse' : ''
                                ].join(' '),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "leading-none",
                                        children: isHighRisk ? '⚡' : '✍️'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 740,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: humanizeFunctionName(fn.name)
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 741,
                                        columnNumber: 19
                                    }, this),
                                    fn.inputs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-white/55 px-1 text-[9px] font-bold leading-tight",
                                        children: fn.inputs.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 743,
                                        columnNumber: 21
                                    }, this),
                                    isBusyHere && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-amber-400 opacity-75"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 748,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, fn.name, true, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 721,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 715,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 708,
                columnNumber: 9
            }, this),
            selectedFunction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card space-y-2.5 rounded-xl px-3 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "brand-pill text-xs text-[color:var(--brand-ink)]/80",
                                        children: selectedFunctionLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 762,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "brand-pill brand-pill-soft text-xs text-[color:var(--brand-ink)]/60",
                                        children: CATEGORY_LABELS[selectedFunctionCategory]
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 763,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 761,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setSelectedFunctionName('');
                                    setReadResult('');
                                    setStatusText('');
                                    setWriteHash('');
                                },
                                className: "rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5 text-xs text-slate-500 transition-colors hover:text-slate-800",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 765,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 760,
                        columnNumber: 11
                    }, this),
                    mode === 'write' && blockedWrite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-rose-400/35 bg-rose-50/80 px-2.5 py-2 text-xs text-rose-900",
                        children: [
                            "Blocked: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: selectedFunction.name
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 776,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 775,
                        columnNumber: 13
                    }, this),
                    mode === 'read' && selectedFunction.inputs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs italic text-[color:var(--brand-ink)]/50",
                        children: "No arguments — result loaded on click."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 781,
                        columnNumber: 13
                    }, this),
                    selectedFunction.inputs.map((input, index)=>{
                        const key = `${input.name || 'arg'}:${index}`;
                        const value = inputValues[key] ?? '';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand-ink)]/70",
                                    children: [
                                        input.name || `arg${index}`,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "opacity-55",
                                            children: [
                                                "(",
                                                input.type,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                            lineNumber: 790,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 789,
                                    columnNumber: 17
                                }, this),
                                input.type === 'bool' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    "aria-label": `${input.name || `arg${index}`} (${input.type})`,
                                    title: `${input.name || `arg${index}`} (${input.type})`,
                                    value: value,
                                    onChange: (e)=>setInputValues((c)=>({
                                                ...c,
                                                [key]: e.target.value
                                            })),
                                    className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "false",
                                            children: "false"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                            lineNumber: 800,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "true",
                                            children: "true"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                            lineNumber: 801,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 793,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: value,
                                    onChange: (e)=>setInputValues((c)=>({
                                                ...c,
                                                [key]: e.target.value
                                            })),
                                    className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                                    placeholder: input.type === 'tuple' || input.type.startsWith('tuple') ? '{"field":"value"}' : input.type.endsWith('[]') ? 'comma,separated' : input.type
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 804,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                            lineNumber: 788,
                            columnNumber: 15
                        }, this);
                    }),
                    requiresRiskConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-1 rounded-full border border-amber-300/50 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-800",
                                children: [
                                    "Type ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono font-bold",
                                        children: requiredPhrase
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 825,
                                        columnNumber: 22
                                    }, this),
                                    " to confirm"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 824,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                "aria-label": "Confirmation phrase",
                                title: "Confirmation phrase",
                                value: confirmationText,
                                onChange: (e)=>setConfirmationText(e.target.value),
                                placeholder: requiredPhrase,
                                className: "brand-input w-full rounded-md border border-amber-300 px-2 py-1.5 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 827,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 823,
                        columnNumber: 13
                    }, this),
                    mode === 'write' && selectedFunction.stateMutability === 'payable' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--brand-ink)]/70",
                                children: "ETH value"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 841,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                "aria-label": "Native value in ETH",
                                title: "Native value in ETH",
                                min: "0",
                                step: "0.000001",
                                value: payableValue,
                                onChange: (e)=>setPayableValue(e.target.value),
                                className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 842,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 840,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 pt-0.5",
                        children: [
                            selectedFunction.inputs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>applySmartTemplate('wallet-self'),
                                className: "brand-pill text-[10px] text-[color:var(--brand-ink)]/65 hover:border-[color:var(--brand-forest)]/45",
                                children: "Fill wallet"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 857,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: mode === 'read' ? runRead : runWrite,
                                disabled: isBusy || !selectedFunctionName || blockedWrite,
                                className: [
                                    'rounded-xl px-4 py-1.5 text-sm font-semibold transition-all duration-150 disabled:opacity-50',
                                    mode === 'write' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:shadow-[0_0_18px_rgba(245,158,11,0.45)]' : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_2px_8px_rgba(14,165,233,0.3)] hover:shadow-[0_0_18px_rgba(14,165,233,0.45)]',
                                    isBusy ? 'animate-pulse' : ''
                                ].join(' '),
                                children: isBusy ? '⏳ Working…' : mode === 'read' ? '🔍 Read' : '⚡ Execute'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 865,
                                columnNumber: 13
                            }, this),
                            statusText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-[color:var(--brand-ink)]/55",
                                children: statusText
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 880,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 855,
                        columnNumber: 11
                    }, this),
                    readResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "max-h-48 overflow-auto rounded-xl border border-sky-200/50 bg-sky-50/70 p-2.5 text-xs text-[color:var(--brand-ink)]/85 shadow-inner",
                        children: readResult
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 885,
                        columnNumber: 13
                    }, this),
                    writeHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-300/50 bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-emerald-900 break-all",
                        children: [
                            "✓ ",
                            writeHash
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 891,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 759,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
        lineNumber: 569,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/QuantumAgentKitPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuantumAgentKitPanel",
    ()=>QuantumAgentKitPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSignMessage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSignMessage.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function QuantumAgentKitPanel({ activeTab, prediction, takeoverEnabled = false, onActivateTakeover, onDeactivateTakeover, onApplyAbiConfiguration, onResetAbiConfiguration }) {
    const DEPENDENCY_CHECK_INTERVAL_MS = 5 * 60 * 1000;
    const AUTO_TAKEOVER_CONFIDENCE_THRESHOLD = 0.72;
    const AUTO_TAKEOVER_CONFIDENCE_FALLBACK = 0.8;
    const agentkitAdminToken = ("TURBOPACK compile-time value", "QuantumLayer") || process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN || 'QuantumLayer';
    const [prompt, setPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [response, setResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRunningTask, setIsRunningTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [taskResult, setTaskResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflight, setPreflight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [githubScout, setGithubScout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [envHealth, setEnvHealth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dependencyHealth, setDependencyHealth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [websiteEdit, setWebsiteEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [abiConfig, setAbiConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [strategyLab, setStrategyLab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cloudDeploy, setCloudDeploy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [qpandaTask, setQpandaTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [qpandaShots, setQpandaShots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1024');
    const [qpandaChipId, setQpandaChipId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [qpandaTaskIdInput, setQpandaTaskIdInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [qpandaOriginIr, setQpandaOriginIr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [qpandaDescribe, setQpandaDescribe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('ONBT Bell-state check');
    const [qpandaWaitResult, setQpandaWaitResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quantumDiagnostics, setQuantumDiagnostics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [autoStrategyEnabled, setAutoStrategyEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dependencyClockMs, setDependencyClockMs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Date.now());
    const [autoTakeoverEnabled, setAutoTakeoverEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoTakeoverStatus, setAutoTakeoverStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [walletMode, setWalletMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('auto');
    const [accessProfile, setAccessProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accessLoading, setAccessLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastAutoTakeoverKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])('');
    const lastAutoStrategyKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])('');
    const { address: connectedWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { signMessageAsync } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSignMessage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSignMessage"])();
    const toSafeHeaderValue = (value)=>value.replace(/[\r\n]/g, '').replace(/[^\x20-\xFF]/g, '').trim();
    const buildSafeHeaders = (headers)=>{
        const sanitized = Object.entries(headers).reduce((acc, [key, value])=>{
            const safeValue = toSafeHeaderValue(String(value || ''));
            if (safeValue) {
                acc[key] = safeValue;
            }
            return acc;
        }, {});
        return sanitized;
    };
    const buildWalletProofMessage = (input)=>{
        return [
            'RAYAY privileged action authorization',
            `Wallet: ${input.walletAddress}`,
            `Method: ${input.method.toUpperCase()}`,
            `Path: ${input.path}`,
            `Purpose: ${input.purpose}`,
            `Timestamp: ${input.timestamp}`,
            `Nonce: ${input.nonce}`
        ].join('\n');
    };
    const createNonce = ()=>{
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, (byte)=>byte.toString(16).padStart(2, '0')).join('');
    };
    const buildPrivilegedHeaders = async (params)=>{
        if (!connectedWallet) {
            throw new Error('Connect your privileged wallet before running this action.');
        }
        const timestamp = Date.now().toString();
        const nonce = createNonce();
        const message = buildWalletProofMessage({
            walletAddress: connectedWallet,
            method: params.method,
            path: params.path,
            purpose: params.purpose,
            timestamp,
            nonce
        });
        const signature = await signMessageAsync({
            message
        });
        return buildSafeHeaders({
            'x-ai-wallet-address': connectedWallet,
            'x-ai-wallet-signature': signature,
            'x-ai-wallet-timestamp': timestamp,
            'x-ai-wallet-nonce': nonce,
            'x-ai-wallet-purpose': params.purpose
        });
    };
    const quickPrompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (activeTab === 'bridge') {
            return [
                'Audit bridge UX integrity and suggest safer defaults.',
                'Recommend ABI actions to reduce bridge failure rates.'
            ];
        }
        if (activeTab === 'staking') {
            return [
                'Check staking UX integrity and reward clarity.',
                'Suggest safer staking flows using current quantum posture.'
            ];
        }
        return [
            'Audit miniapp integrity based on installed node modules.',
            'Propose UX enhancements for the current tab using quantum context.'
        ];
    }, [
        activeTab
    ]);
    const deriveFeaturedTabs = (focus, enhancements = [])=>{
        const tabs = [
            focus
        ];
        const blob = enhancements.join(' ').toLowerCase();
        const maybeAdd = (tab, keyword)=>{
            if (blob.includes(keyword) && !tabs.includes(tab)) {
                tabs.push(tab);
            }
        };
        maybeAdd('bridge', 'bridge');
        maybeAdd('staking', 'staking');
        maybeAdd('governance', 'governance');
        maybeAdd('token', 'token');
        maybeAdd('private-sale', 'sale');
        if (!tabs.includes('bridge')) tabs.push('bridge');
        if (!tabs.includes('staking')) tabs.push('staking');
        return tabs.slice(0, 4);
    };
    const autoApplyTakeover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((scoutData, currentPrediction)=>{
        if (!currentPrediction) {
            setAutoTakeoverStatus('Auto mode waiting for quantum signal data.');
            return;
        }
        const confidence = currentPrediction.confidence;
        const hasScoutSignal = Boolean(scoutData && (scoutData.enhancements.length >= 2 || scoutData.repositories.length >= 3));
        const threshold = hasScoutSignal ? AUTO_TAKEOVER_CONFIDENCE_THRESHOLD : AUTO_TAKEOVER_CONFIDENCE_FALLBACK;
        if (confidence < threshold) {
            setAutoTakeoverStatus(`Auto mode armed, waiting for confidence >= ${(threshold * 100).toFixed(0)}%. Current ${(confidence * 100).toFixed(0)}%.`);
            return;
        }
        const featuredTabs = deriveFeaturedTabs(activeTab, scoutData?.enhancements || []);
        const summaryHint = (scoutData?.enhancements || [])[0];
        const confidencePct = `${(confidence * 100).toFixed(0)}%`;
        const key = `${activeTab}:${confidencePct}:${scoutData?.searchedAt || 'no-scout'}`;
        if (lastAutoTakeoverKey.current === key) {
            return;
        }
        lastAutoTakeoverKey.current = key;
        onActivateTakeover?.({
            enabled: true,
            focus: activeTab,
            headline: `RAYAY auto-takeover engaged for ${activeTab === 'private-sale' ? 'private sale' : activeTab} (${confidencePct} confidence)`,
            subline: summaryHint || 'Visibility routing is now auto-tuned by RAYAY based on quantum confidence and stack intelligence.',
            featuredTabs
        });
        setAutoTakeoverStatus(`Auto mode activated takeover at ${confidencePct} confidence${hasScoutSignal ? ' with GitHub scout signals' : ''}.`);
    }, [
        activeTab,
        onActivateTakeover
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoTakeoverEnabled) return;
        autoApplyTakeover(githubScout, prediction);
    }, [
        autoTakeoverEnabled,
        githubScout,
        prediction,
        activeTab,
        autoApplyTakeover
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const resolveAccessProfile = async ()=>{
            setAccessLoading(true);
            try {
                const apiResponse = await fetch('/api/agentkit/access-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        walletAddress: connectedWallet,
                        selectedWalletMode: walletMode
                    })
                });
                if (!apiResponse.ok) {
                    throw new Error(`Access profile failed with status ${apiResponse.status}`);
                }
                const payload = await apiResponse.json();
                setAccessProfile(payload);
            } catch (profileError) {
                setAccessProfile({
                    ok: true,
                    mode: 'access-profile',
                    connectedWallet,
                    selectedWalletMode: walletMode,
                    effectiveRole: 'user',
                    reason: profileError instanceof Error ? profileError.message : 'Access profile unavailable; using user-safe mode.',
                    capabilities: {
                        advisor: true,
                        githubScout: true,
                        takeover: false,
                        adminTasks: false,
                        preflight: false,
                        envHealth: false,
                        websiteEditor: false,
                        abiConfigurator: false,
                        cloudDeploy: false,
                        quantumTasks: false
                    },
                    checkedAt: new Date().toISOString()
                });
            } finally{
                setAccessLoading(false);
            }
        };
        void resolveAccessProfile();
    }, [
        connectedWallet,
        walletMode
    ]);
    const canUse = {
        advisor: accessProfile?.capabilities.advisor ?? true,
        githubScout: accessProfile?.capabilities.githubScout ?? true,
        takeover: accessProfile?.capabilities.takeover ?? false,
        adminTasks: accessProfile?.capabilities.adminTasks ?? false,
        preflight: accessProfile?.capabilities.preflight ?? false,
        envHealth: accessProfile?.capabilities.envHealth ?? false,
        websiteEditor: accessProfile?.capabilities.websiteEditor ?? false,
        abiConfigurator: accessProfile?.capabilities.abiConfigurator ?? false,
        cloudDeploy: accessProfile?.capabilities.cloudDeploy ?? false,
        quantumTasks: accessProfile?.capabilities.quantumTasks ?? false
    };
    const accessLevel = accessLoading ? 'resolving' : accessProfile?.effectiveRole || 'user';
    const accessLevelClass = accessLevel === 'deployer' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : accessLevel === 'cdp' ? 'border-indigo-300 bg-indigo-50 text-indigo-900' : accessLevel === 'resolving' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-slate-300 bg-slate-50 text-slate-800';
    const capabilityLabelMap = {
        advisor: 'Advisor',
        githubScout: 'GitHub Scout',
        takeover: 'Takeover',
        adminTasks: 'Integrity Tasks',
        preflight: 'CDP Preflight',
        envHealth: 'Env Health',
        websiteEditor: 'Website Planner',
        abiConfigurator: 'ABI Config Sync',
        cloudDeploy: 'Cloud Deploy',
        quantumTasks: 'Quantum Tasks'
    };
    const enabledCapabilities = Object.keys(canUse).filter((key)=>canUse[key]).map((key)=>capabilityLabelMap[key]);
    const criticalDependencyCount = dependencyHealth?.criticalUpdates?.length || 0;
    const dependencyLastCheckedMs = dependencyHealth ? new Date(dependencyHealth.checkedAt).getTime() : 0;
    const dependencyNextCheckMs = dependencyLastCheckedMs ? dependencyLastCheckedMs + DEPENDENCY_CHECK_INTERVAL_MS : 0;
    const dependencyCheckLagMs = dependencyLastCheckedMs ? Math.max(0, dependencyClockMs - dependencyLastCheckedMs) : 0;
    const dependencyCheckAgeMinutes = Math.floor(dependencyCheckLagMs / 60000);
    const dependencyCheckIsStale = dependencyCheckLagMs > DEPENDENCY_CHECK_INTERVAL_MS * 2;
    const denySensitiveAction = (feature)=>{
        setError(`${feature} is restricted to CDP/Deployer wallets. User wallets can still use advisor and GitHub scout functions.`);
    };
    const runAdvisor = async (text)=>{
        const userText = text.trim();
        if (!userText) return;
        setIsLoading(true);
        setError(null);
        try {
            const nextMessages = [
                ...messages,
                {
                    role: 'user',
                    text: userText,
                    at: new Date().toISOString()
                }
            ];
            const apiResponse = await fetch('/api/agentkit/advisor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: userText,
                    activeTab,
                    quantum: prediction ? {
                        signal: prediction.signal,
                        confidence: prediction.confidence,
                        recommendation: prediction.recommendation
                    } : undefined,
                    history: messages
                })
            });
            if (!apiResponse.ok) {
                throw new Error(`Advisor request failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setResponse(payload);
            setMessages(payload.messages || nextMessages);
            setPrompt('');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Failed to run advisor');
        } finally{
            setIsLoading(false);
        }
    };
    const runTask = async (task)=>{
        if (!canUse.adminTasks) {
            denySensitiveAction('Integrity and upgrade scans');
            return;
        }
        const parsedShots = Number.parseInt(qpandaShots || '1024', 10);
        const safeShots = Number.isFinite(parsedShots) ? Math.max(1, Math.min(20000, parsedShots)) : 1024;
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'POST',
                path: '/api/agentkit/integrity',
                purpose: 'integrity-task'
            });
            const apiResponse = await fetch('/api/agentkit/integrity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                },
                body: JSON.stringify({
                    task
                })
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                const retrySuffix = failure?.retryAfterSeconds ? ` Retry in ${failure.retryAfterSeconds}s.` : '';
                throw new Error((failure?.error || `Integrity task failed with status ${apiResponse.status}`) + retrySuffix);
            }
            const payload = await apiResponse.json();
            setTaskResult(payload);
        } catch (taskError) {
            setError(taskError instanceof Error ? taskError.message : 'Failed to run integrity task');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runPreflight = async ()=>{
        if (!canUse.preflight) {
            denySensitiveAction('CDP preflight');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'POST',
                path: '/api/agentkit/preflight',
                purpose: 'cdp-preflight'
            });
            const apiResponse = await fetch('/api/agentkit/preflight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                }
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `Preflight failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setPreflight(payload);
        } catch (preflightError) {
            setError(preflightError instanceof Error ? preflightError.message : 'Failed to run CDP preflight');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runGithubScout = async (autoApply = false)=>{
        if (!canUse.githubScout) {
            denySensitiveAction('GitHub scout');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const scoutPrompt = prompt.trim() || 'Find high-quality Web3 repos and stack enhancements for ONBT miniapp frontend/backend architecture';
            const apiResponse = await fetch('/api/agentkit/github-scout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: scoutPrompt,
                    activeTab
                })
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `GitHub scout failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setGithubScout(payload);
            if (autoApply) {
                if (!canUse.takeover) {
                    denySensitiveAction('Auto takeover apply');
                    return;
                }
                autoApplyTakeover(payload, prediction);
            }
        } catch (scoutError) {
            setError(scoutError instanceof Error ? scoutError.message : 'Failed to run GitHub scout');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runEnvHealth = async ()=>{
        if (!canUse.envHealth) {
            denySensitiveAction('Environment health');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'GET',
                path: '/api/agentkit/env-health',
                purpose: 'env-health'
            });
            const apiResponse = await fetch('/api/agentkit/env-health', {
                method: 'GET',
                headers: {
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                }
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `Env health failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setEnvHealth(payload);
        } catch (healthError) {
            setError(healthError instanceof Error ? healthError.message : 'Failed to run env health check');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runDependencyHealth = async (silent = false)=>{
        if (!silent) {
            setIsRunningTask(true);
            setError(null);
        }
        try {
            const apiResponse = await fetch('/api/agentkit/dependency-health', {
                method: 'GET'
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `Dependency health failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setDependencyHealth(payload);
        } catch (dependencyError) {
            if (!silent) {
                setError(dependencyError instanceof Error ? dependencyError.message : 'Failed to run dependency health check');
            }
        } finally{
            if (!silent) {
                setIsRunningTask(false);
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void runDependencyHealth(true);
        const intervalId = window.setInterval(()=>{
            void runDependencyHealth(true);
        }, DEPENDENCY_CHECK_INTERVAL_MS);
        return ()=>window.clearInterval(intervalId);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const clockId = window.setInterval(()=>{
            setDependencyClockMs(Date.now());
        }, 30 * 1000);
        return ()=>window.clearInterval(clockId);
    }, []);
    const runWebsiteEditor = async ()=>{
        if (!canUse.websiteEditor) {
            denySensitiveAction('Website edit planning');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'POST',
                path: '/api/agentkit/website-editor',
                purpose: 'website-editor'
            });
            const apiResponse = await fetch('/api/agentkit/website-editor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                },
                body: JSON.stringify({
                    prompt: prompt.trim() || 'Create splendid feature upgrades for nabat.finance',
                    activeTab,
                    targetSite: 'https://www.nabat.finance'
                })
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `Website editor failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setWebsiteEdit(payload);
        } catch (websiteError) {
            setError(websiteError instanceof Error ? websiteError.message : 'Failed to generate website edit plan');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runAbiConfigurator = async ()=>{
        if (!canUse.abiConfigurator) {
            denySensitiveAction('ABI configurator');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'GET',
                path: '/api/agentkit/abi-configurator',
                purpose: 'abi-configurator'
            });
            const apiResponse = await fetch('/api/agentkit/abi-configurator', {
                method: 'GET',
                headers: {
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                }
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `ABI configurator failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setAbiConfig(payload);
            onApplyAbiConfiguration?.(payload);
        } catch (abiError) {
            setError(abiError instanceof Error ? abiError.message : 'Failed to run ABI configurator');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runCloudDeploy = async (action = 'deploy')=>{
        if (!canUse.cloudDeploy) {
            denySensitiveAction('Cloud Deploy');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'POST',
                path: '/api/agentkit/cloud-deploy',
                purpose: 'cloud-deploy'
            });
            const apiResponse = await fetch('/api/agentkit/cloud-deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                },
                body: JSON.stringify({
                    action,
                    deploymentId: action === 'status' && cloudDeploy?.deploymentId ? cloudDeploy.deploymentId : undefined
                })
            });
            const payload = await apiResponse.json();
            setCloudDeploy(payload);
            if (!apiResponse.ok && !payload.ok) {
                setError(payload.message || `Cloud deploy failed with status ${apiResponse.status}`);
            }
        } catch (deployError) {
            setError(deployError instanceof Error ? deployError.message : 'Cloud deploy request failed');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runQpandaTask = async (action = 'submit')=>{
        if (!canUse.quantumTasks) {
            denySensitiveAction('Quantum task submission');
            return;
        }
        const parsedShots = Number.parseInt(qpandaShots || '1024', 10);
        const safeShots = Number.isFinite(parsedShots) ? Math.max(1, Math.min(20000, parsedShots)) : 1024;
        const resolvedTaskId = (qpandaTaskIdInput || qpandaTask?.taskId || '').trim();
        if (action === 'query' && !resolvedTaskId) {
            setError('No QPanda task id available. Paste one in Task ID or submit a task first.');
            return;
        }
        setIsRunningTask(true);
        setError(null);
        try {
            const safeAdminToken = toSafeHeaderValue(agentkitAdminToken);
            const walletProofHeaders = await buildPrivilegedHeaders({
                method: 'POST',
                path: '/api/quantum/qpanda',
                purpose: 'quantum-qpanda'
            });
            const apiResponse = await fetch('/api/quantum/qpanda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...safeAdminToken ? {
                        'x-agentkit-admin-token': safeAdminToken
                    } : {},
                    ...walletProofHeaders
                },
                body: JSON.stringify({
                    action,
                    taskId: action === 'query' ? resolvedTaskId : undefined,
                    shots: safeShots,
                    chipId: qpandaChipId.trim() || undefined,
                    originIr: qpandaOriginIr.trim() || undefined,
                    describe: qpandaDescribe.trim() || undefined,
                    waitResult: qpandaWaitResult
                })
            });
            const payload = await apiResponse.json();
            setQpandaTask(payload);
            if (payload.taskId) {
                setQpandaTaskIdInput(payload.taskId);
            }
            if (!apiResponse.ok && !payload.ok) {
                setError(payload.error || `QPanda request failed with status ${apiResponse.status}`);
            }
        } catch (taskError) {
            setError(taskError instanceof Error ? taskError.message : 'QPanda request failed');
        } finally{
            setIsRunningTask(false);
        }
    };
    const runStrategyLab = async (silent = false)=>{
        if (!silent) {
            setIsRunningTask(true);
            setError(null);
        }
        try {
            const apiResponse = await fetch('/api/agentkit/strategy-lab', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activeTab,
                    quantum: prediction ? {
                        signal: prediction.signal,
                        confidence: prediction.confidence,
                        recommendation: prediction.recommendation,
                        confidenceEngine: prediction.confidenceEngine
                    } : undefined
                })
            });
            if (!apiResponse.ok) {
                const failure = await apiResponse.json().catch(()=>null);
                throw new Error(failure?.error || `Strategy lab failed with status ${apiResponse.status}`);
            }
            const payload = await apiResponse.json();
            setStrategyLab(payload);
        } catch (strategyError) {
            if (!silent) {
                setError(strategyError instanceof Error ? strategyError.message : 'Failed to run strategy lab');
            }
        } finally{
            if (!silent) {
                setIsRunningTask(false);
            }
        }
    };
    const executeStrategyAction = async (actionId)=>{
        if (actionId === 'dependency-health') {
            await runDependencyHealth(false);
            return;
        }
        if (actionId === 'github-scout') {
            await runGithubScout(false);
            return;
        }
        if (actionId === 'advisor-transfer-safety') {
            await runAdvisor('Focus on transfer safety cues, allowance visibility, and recipient validation. Keep normal UX friction but preserve high-risk confirmations.');
            return;
        }
        if (actionId === 'abi-sync') {
            await runAbiConfigurator();
            return;
        }
        if (actionId === 'preflight') {
            await runPreflight();
        }
    };
    const snapshotQuantumDiagnostics = ()=>{
        if (!prediction) {
            setError('Quantum prediction not available yet. Retry after next signal refresh.');
            return;
        }
        setError(null);
        setQuantumDiagnostics({
            capturedAt: new Date().toISOString(),
            confidence: prediction.confidence,
            signal: prediction.signal,
            recommendation: prediction.recommendation,
            components: prediction.confidenceEngine?.components
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoStrategyEnabled || !prediction) return;
        const key = `${activeTab}:${prediction.signal}:${prediction.confidence.toFixed(3)}`;
        if (lastAutoStrategyKey.current === key) return;
        lastAutoStrategyKey.current = key;
        void runStrategyLab(true);
    }, [
        autoStrategyEnabled,
        activeTab,
        prediction
    ]);
    const activateTakeover = ()=>{
        if (!canUse.takeover) {
            denySensitiveAction('Takeover controls');
            return;
        }
        const focusTab = activeTab;
        const featuredTabs = focusTab === 'about' ? [
            'bridge',
            'staking',
            'governance'
        ] : [
            focusTab,
            'bridge',
            'staking'
        ];
        onActivateTakeover?.({
            enabled: true,
            focus: focusTab,
            headline: `RAYAY is amplifying ${focusTab === 'private-sale' ? 'private sale' : focusTab} visibility for growth`,
            subline: 'High-impact modules are promoted and CTAs are tuned for stronger discovery and conversion.',
            featuredTabs
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mb-6 rounded-2xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/80 p-4 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm sm:text-base font-semibold",
                                children: "RAYAY AgentKit Integrity Advisor"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 940,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/65",
                                children: "RAYAY interactive component for integrity assurance and UX upgrades from your current module stack."
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 941,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 939,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${response?.mode === 'agentkit-live' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-amber-300 bg-amber-50 text-amber-800'}`,
                        children: response?.mode === 'agentkit-live' ? 'AgentKit Live' : 'AgentKit Advisory'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 945,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${accessLevelClass}`,
                        children: [
                            "Access: ",
                            accessLevel === 'resolving' ? 'Resolving...' : accessLevel.toUpperCase()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 954,
                        columnNumber: 9
                    }, this),
                    dependencyHealth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${criticalDependencyCount > 0 ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-emerald-300 bg-emerald-50 text-emerald-900'}`,
                        children: criticalDependencyCount > 0 ? `${criticalDependencyCount} critical package update${criticalDependencyCount === 1 ? '' : 's'}` : 'No critical package updates'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 958,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 938,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 px-3 py-2 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/85",
                                children: "AI Wallet Toggle"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 974,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "ai-wallet-mode",
                                "aria-label": "AI Wallet Toggle",
                                title: "AI Wallet Toggle",
                                value: walletMode,
                                onChange: (event)=>setWalletMode(event.target.value),
                                className: "rounded-md border border-[color:var(--brand-leaf)]/30 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "auto",
                                        children: "Auto Detect"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 985,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "cdp",
                                        children: "CDP Wallet Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 986,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "deployer",
                                        children: "Deployer Wallet Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 987,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "user",
                                        children: "User Safe Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 988,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 977,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Role: ",
                                    accessLoading ? 'resolving...' : accessProfile?.effectiveRole || 'user'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 990,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Wallet: ",
                                    connectedWallet ? `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}` : 'not connected'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 993,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 973,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/70",
                        children: accessProfile?.reason || 'User-safe mode is active until wallet role is resolved.'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 997,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-1",
                        children: enabledCapabilities.map((capability)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80",
                                children: capability
                            }, capability, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1002,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1000,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 972,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
                children: quickPrompts.map((quick)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runAdvisor(quick),
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45",
                        children: quick
                    }, quick, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1015,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1013,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>activateTakeover(),
                        disabled: !canUse.takeover,
                        className: "rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-900 hover:border-emerald-500",
                        children: takeoverEnabled ? 'Refresh RAYAY Takeover' : 'Activate RAYAY Takeover'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1027,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onDeactivateTakeover?.(),
                        disabled: !takeoverEnabled || !canUse.takeover,
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-50",
                        children: "Deactivate Takeover"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1036,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runTask('rate-app-quick'),
                        disabled: isRunningTask || !canUse.adminTasks,
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Run Integrity Scan'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1045,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runTask('advance-miniapp-quick'),
                        disabled: isRunningTask || !canUse.adminTasks,
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Run UX Upgrade Scan'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1054,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runPreflight(),
                        disabled: isRunningTask || !canUse.preflight,
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Run CDP Preflight'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1063,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runGithubScout(false),
                        disabled: isRunningTask,
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'GitHub Usecase Scout'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1072,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runGithubScout(true),
                        disabled: isRunningTask || !canUse.takeover,
                        className: "rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-left text-xs font-semibold text-indigo-900 hover:border-indigo-500 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Scout + Auto Apply'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1081,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runEnvHealth(),
                        disabled: isRunningTask || !canUse.envHealth,
                        className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-left text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Run Env Health'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1090,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runDependencyHealth(false),
                        disabled: isRunningTask,
                        className: "rounded-lg border border-orange-300 bg-orange-50 px-3 py-2 text-left text-xs font-semibold text-orange-900 hover:border-orange-500 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Run Dependency Health'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1099,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runWebsiteEditor(),
                        disabled: isRunningTask || !canUse.websiteEditor,
                        className: "rounded-lg border border-fuchsia-300 bg-fuchsia-50 px-3 py-2 text-left text-xs font-semibold text-fuchsia-900 hover:border-fuchsia-500 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Edit Nabat.finance Plan'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runCloudDeploy('deploy'),
                        disabled: isRunningTask || !canUse.cloudDeploy,
                        className: "rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-left text-xs font-semibold text-sky-900 hover:border-sky-500 disabled:opacity-60",
                        children: isRunningTask ? 'Deploying...' : '🚀 Deploy to Cloud'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runCloudDeploy('list'),
                        disabled: isRunningTask || !canUse.cloudDeploy,
                        className: "rounded-lg border border-sky-200 bg-white px-3 py-2 text-left text-xs font-semibold text-sky-800 hover:border-sky-400 disabled:opacity-60",
                        children: isRunningTask ? 'Loading...' : 'List Deployments'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-full rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-[11px] font-semibold uppercase tracking-wide text-emerald-800/80 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1",
                                children: "QPanda Controls"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-emerald-300 bg-white px-2.5 py-1 font-semibold",
                                                children: "Shots"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1139,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                "aria-label": "Shots",
                                                title: "Shots",
                                                min: 1,
                                                step: 1,
                                                value: qpandaShots,
                                                onChange: (event)=>setQpandaShots(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "1024"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-emerald-300 bg-white px-2.5 py-1 font-semibold",
                                                children: "Chip ID (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1154,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                "aria-label": "Chip ID optional",
                                                title: "Chip ID optional",
                                                value: qpandaChipId,
                                                onChange: (event)=>setQpandaChipId(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "e.g. OriginQ-72"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1155,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80 sm:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-emerald-300 bg-white px-2.5 py-1 font-semibold",
                                                children: "Task ID (for manual query)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1167,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                "aria-label": "Task ID for manual query",
                                                title: "Task ID for manual query",
                                                value: qpandaTaskIdInput,
                                                onChange: (event)=>setQpandaTaskIdInput(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "Paste task id to query"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1168,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80 sm:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-emerald-300 bg-white px-2.5 py-1 font-semibold",
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                "aria-label": "Description",
                                                title: "Description",
                                                value: qpandaDescribe,
                                                onChange: (event)=>setQpandaDescribe(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "Task description"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1181,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80 sm:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-emerald-300 bg-white px-2.5 py-1 font-semibold",
                                                children: "OriginIR (optional, defaults to Bell circuit)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1193,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                "aria-label": "OriginIR optional defaults to Bell circuit",
                                                title: "OriginIR optional defaults to Bell circuit",
                                                value: qpandaOriginIr,
                                                onChange: (event)=>setQpandaOriginIr(event.target.value),
                                                className: "mt-1 h-24 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "QINIT 2 CREG 2 H q[0] CNOT q[0],q[1] MEASURE q[0],c[0] MEASURE q[1],c[1]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1194,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1192,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs text-[color:var(--brand-ink)]/85 sm:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                "aria-label": "Wait for final result on submit",
                                                title: "Wait for final result on submit",
                                                checked: qpandaWaitResult,
                                                onChange: (event)=>setQpandaWaitResult(event.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1205,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-emerald-300 bg-white px-2.5 py-1 font-semibold",
                                                children: "Wait for final result on submit (sync mode)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1204,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runQpandaTask('submit'),
                        disabled: isRunningTask || !canUse.quantumTasks,
                        className: "rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-900 hover:border-emerald-500 disabled:opacity-60",
                        children: isRunningTask ? 'Submitting...' : 'Submit Quantum Task'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runQpandaTask('query'),
                        disabled: isRunningTask || !canUse.quantumTasks || !qpandaTask?.taskId,
                        className: "rounded-lg border border-emerald-200 bg-white px-3 py-2 text-left text-xs font-semibold text-emerald-800 hover:border-emerald-400 disabled:opacity-60",
                        children: isRunningTask ? 'Querying...' : 'Query Quantum Task'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runAbiConfigurator(),
                        disabled: isRunningTask || !canUse.abiConfigurator,
                        className: "rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-left text-xs font-semibold text-cyan-900 hover:border-cyan-500 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Sync ABI Config (Base+Arb)'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runStrategyLab(),
                        disabled: isRunningTask,
                        className: "rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-left text-xs font-semibold text-violet-900 hover:border-violet-500 disabled:opacity-60",
                        children: isRunningTask ? 'Running...' : 'Run Strategy Lab'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setAutoStrategyEnabled((prev)=>{
                                const next = !prev;
                                if (next) {
                                    setAutoTakeoverStatus('Auto Strategy enabled. Strategy Lab will rerun on tab/signal changes.');
                                } else {
                                    setAutoTakeoverStatus('Auto Strategy disabled.');
                                }
                                return next;
                            });
                        },
                        className: `rounded-lg border px-3 py-2 text-left text-xs font-semibold ${autoStrategyEnabled ? 'border-violet-400 bg-violet-100 text-violet-900 hover:border-violet-600' : 'border-violet-300 bg-violet-50 text-violet-900 hover:border-violet-500'}`,
                        children: [
                            "Auto Strategy: ",
                            autoStrategyEnabled ? 'ON' : 'OFF'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>snapshotQuantumDiagnostics(),
                        className: "rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-900 hover:border-emerald-500",
                        children: "Snapshot Quantum Diagnostics"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onResetAbiConfiguration?.(),
                        className: "rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-900 hover:border-slate-500",
                        children: "Reset ABI Config"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setAutoTakeoverEnabled((prev)=>!prev);
                            if (autoTakeoverEnabled) {
                                setAutoTakeoverStatus('Auto mode disabled. Manual takeover controls remain available.');
                            } else {
                                setAutoTakeoverStatus('Auto mode enabled. RAYAY will auto-activate takeover when thresholds are met.');
                            }
                        },
                        disabled: !canUse.takeover,
                        className: `rounded-lg border px-3 py-2 text-left text-xs font-semibold ${autoTakeoverEnabled ? 'border-emerald-400 bg-emerald-50 text-emerald-900 hover:border-emerald-600' : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-500'}`,
                        children: [
                            "Auto Visibility: ",
                            autoTakeoverEnabled ? 'ON' : 'OFF'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1026,
                columnNumber: 7
            }, this),
            takeoverEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-900",
                children: "RAYAY Takeover is active. Graphics and feature visibility are being amplified."
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1313,
                columnNumber: 9
            }, this),
            autoTakeoverStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs text-indigo-900",
                children: autoTakeoverStatus
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1319,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: prompt,
                        onChange: (event)=>setPrompt(event.target.value),
                        placeholder: "Ask the advisor to audit integrity or improve UX for this tab...",
                        className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-3 py-2 text-sm",
                        onKeyDown: (event)=>{
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                void runAdvisor(prompt);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runAdvisor(prompt),
                        disabled: isLoading || !prompt.trim(),
                        className: "brand-button rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50",
                        children: isLoading ? 'Thinking...' : 'Ask'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1338,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1324,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1349,
                columnNumber: 9
            }, this),
            response && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-xs sm:text-sm text-[color:var(--brand-ink)]/85",
                        children: response.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1356,
                        columnNumber: 11
                    }, this),
                    response.agentkit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                children: "AgentKit Capabilities"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1362,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Package installed: ",
                                            response.agentkit.packageInstalled ? 'yes' : 'no'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1364,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Credentials configured: ",
                                            response.agentkit.credentialsConfigured ? 'yes' : 'no'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1365,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Network: ",
                                            response.agentkit.networkId || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1366,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Actions discovered: ",
                                            response.agentkit.actionCount ?? 0
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1367,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1363,
                                columnNumber: 15
                            }, this),
                            response.agentkit.cdpConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                        children: "CDP Wiring"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Project ID: ",
                                            response.agentkit.cdpConfig.projectId || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1372,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Base App owner: ",
                                            response.agentkit.cdpConfig.baseAppOwner || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1373,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "API key kind: ",
                                            response.agentkit.cdpConfig.apiKeyIdKind
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1374,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "API key: ",
                                            response.agentkit.cdpConfig.apiKeyIdPreview || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1375,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Org from key: ",
                                            response.agentkit.cdpConfig.orgIdFromApiKeyId || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1376,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Key id from resource: ",
                                            response.agentkit.cdpConfig.apiKeyIdFromResourceName || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1377,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Secret format: ",
                                            response.agentkit.cdpConfig.secretFormat
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1378,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Server env only: ",
                                            response.agentkit.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1379,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1370,
                                columnNumber: 17
                            }, this),
                            response.agentkit.initError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            "Init error: ",
                                            response.agentkit.initError
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1384,
                                        columnNumber: 19
                                    }, this),
                                    response.agentkit.initErrorDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            response.agentkit.initErrorDetails.name ? `${response.agentkit.initErrorDetails.name} ` : '',
                                            response.agentkit.initErrorDetails.code !== undefined ? `code=${response.agentkit.initErrorDetails.code} ` : '',
                                            response.agentkit.initErrorDetails.status !== undefined ? `status=${response.agentkit.initErrorDetails.status} ` : '',
                                            response.agentkit.initErrorDetails.type ? `type=${response.agentkit.initErrorDetails.type}` : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1386,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1383,
                                columnNumber: 17
                            }, this),
                            (response.agentkit.actionNames || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap gap-1",
                                children: (response.agentkit.actionNames || []).map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80",
                                        children: name
                                    }, name, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1398,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1396,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1361,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3",
                        children: response.integrityChecks.map((check)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-lg border px-3 py-2 text-xs ${check.status === 'pass' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : check.status === 'warn' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-rose-300 bg-rose-50 text-rose-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-current/35 bg-white/70 px-2.5 py-1 font-semibold",
                                        children: check.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1423,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold",
                                        children: check.detail
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1424,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, check.label, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1413,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                        children: "UX Enhancements"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1431,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1 text-xs text-[color:var(--brand-ink)]/85",
                                        children: response.uxEnhancements.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "- ",
                                                    item
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1434,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1432,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1430,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                        children: "Agent Suggestions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1440,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1 text-xs text-[color:var(--brand-ink)]/85",
                                        children: response.suggestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "- ",
                                                    item
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1443,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1441,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1439,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1429,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            taskResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "Task Result"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1453,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: taskResult.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1454,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/65",
                        children: [
                            "Task: ",
                            taskResult.task,
                            " | Exit: ",
                            taskResult.exitCode
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1455,
                        columnNumber: 11
                    }, this),
                    taskResult.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "mt-2 max-h-44 overflow-auto rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 p-2 text-[11px] text-[color:var(--brand-ink)]/80",
                        children: taskResult.output
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1459,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1452,
                columnNumber: 9
            }, this),
            preflight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "CDP Preflight"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1468,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Credentials present: ",
                                    preflight.credentialsPresent ? 'yes' : 'no'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1470,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Project reachable: ",
                                    preflight.projectReachable ? 'yes' : 'no'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1471,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Network: ",
                                    preflight.networkId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1472,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Policy count: ",
                                    preflight.policyCount ?? 0
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1473,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1469,
                        columnNumber: 11
                    }, this),
                    preflight.cdpConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                children: "Resolved Config"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1477,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Project ID: ",
                                    preflight.cdpConfig.projectId || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1478,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Base App owner: ",
                                    preflight.cdpConfig.baseAppOwner || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1479,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "API key kind: ",
                                    preflight.cdpConfig.apiKeyIdKind
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1480,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "API key: ",
                                    preflight.cdpConfig.apiKeyIdPreview || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1481,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Org from key: ",
                                    preflight.cdpConfig.orgIdFromApiKeyId || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1482,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Key id from resource: ",
                                    preflight.cdpConfig.apiKeyIdFromResourceName || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1483,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Secret format: ",
                                    preflight.cdpConfig.secretFormat
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1484,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    "Server env only: ",
                                    preflight.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1485,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1476,
                        columnNumber: 13
                    }, this),
                    preflight.diagnostics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold",
                                children: preflight.diagnostics.message || 'Preflight diagnostic details available.'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1490,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left font-semibold",
                                children: [
                                    preflight.diagnostics.name ? `${preflight.diagnostics.name} ` : '',
                                    preflight.diagnostics.statusCode !== undefined ? `status=${preflight.diagnostics.statusCode} ` : '',
                                    preflight.diagnostics.errorType ? `type=${preflight.diagnostics.errorType} ` : '',
                                    preflight.diagnostics.correlationId ? `corr=${preflight.diagnostics.correlationId}` : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1491,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1489,
                        columnNumber: 13
                    }, this),
                    (preflight.remediationHints || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-amber-300 bg-white px-2.5 py-1",
                                children: "Recommended Fixes"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1501,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 space-y-1",
                                children: (preflight.remediationHints || []).map((hint)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "- ",
                                            hint
                                        ]
                                    }, hint, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1504,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1502,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1500,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1467,
                columnNumber: 9
            }, this),
            githubScout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "GitHub Usecase Scout"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1514,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: [
                            "Prompt: ",
                            githubScout.prompt
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1515,
                        columnNumber: 11
                    }, this),
                    (githubScout.enhancements || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                children: "Stack Enhancements"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1519,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 space-y-1",
                                children: (githubScout.enhancements || []).map((hint)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "- ",
                                            hint
                                        ]
                                    }, hint, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1522,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1520,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1518,
                        columnNumber: 13
                    }, this),
                    (githubScout.repositories || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                children: "Top Repositories"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1530,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 space-y-1",
                                children: githubScout.repositories.map((repo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: repo.html_url,
                                                rel: "noreferrer",
                                                className: "font-medium text-[color:var(--brand-forest)] underline-offset-2 hover:underline",
                                                children: repo.full_name
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1534,
                                                columnNumber: 21
                                            }, this),
                                            ' ',
                                            "(",
                                            repo.stargazers_count,
                                            " stars",
                                            repo.language ? `, ${repo.language}` : '',
                                            ")",
                                            repo.description ? ` - ${repo.description}` : ''
                                        ]
                                    }, repo.full_name, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1533,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1531,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1529,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1513,
                columnNumber: 9
            }, this),
            envHealth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "Environment Health"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1553,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: envHealth.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1554,
                        columnNumber: 11
                    }, this),
                    envHealth.diagnostics?.walletProofNonceStorage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                        children: [
                            "Wallet proof nonce storage: ",
                            envHealth.diagnostics.walletProofNonceStorage
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1556,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2",
                        children: envHealth.checks.map((check)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-md border px-2 py-1 text-xs ${check.present ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : check.required ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-current/35 bg-white/70 px-2.5 py-1 font-semibold",
                                        children: check.key
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1570,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold",
                                        children: [
                                            check.present ? 'present' : check.required ? 'missing (required)' : 'missing (optional)',
                                            " | ",
                                            check.source
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1571,
                                        columnNumber: 17
                                    }, this),
                                    check.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold",
                                        children: check.note
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1574,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, check.key, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1560,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1558,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1552,
                columnNumber: 9
            }, this),
            dependencyHealth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "Dependency Integrity"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1583,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: dependencyHealth.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1584,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/65",
                        children: [
                            "Last checked: ",
                            new Date(dependencyHealth.checkedAt).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1585,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/70",
                        children: [
                            "Next auto-check:",
                            ' ',
                            dependencyNextCheckMs ? new Date(dependencyNextCheckMs).toLocaleTimeString() : 'pending',
                            ' | ',
                            "Snapshot age: ",
                            dependencyCheckAgeMinutes,
                            "m"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1586,
                        columnNumber: 11
                    }, this),
                    dependencyCheckIsStale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-left text-[11px] font-semibold text-amber-900",
                        children: "Integrity snapshot is stale. Run Dependency Health now to refresh package risk status."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1592,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-1 sm:grid-cols-3",
                        children: dependencyHealth.checks.map((check)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-md border px-2 py-1 text-xs ${check.status === 'pass' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : check.status === 'warn' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-rose-300 bg-rose-50 text-rose-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-current/35 bg-white/70 px-2.5 py-1 font-semibold",
                                        children: check.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1609,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-current/35 bg-white/70 px-2.5 py-1 text-left font-semibold",
                                        children: check.detail
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1610,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, check.label, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1599,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1597,
                        columnNumber: 11
                    }, this),
                    (dependencyHealth.featurePacks || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-2 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                children: "Splendid Feature Packs"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1617,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                                children: (dependencyHealth.featurePacks || []).map((pack)=>{
                                    const badgeClass = pack.status === 'ready' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : pack.status === 'partial' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-slate-300 bg-slate-50 text-slate-800';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/85 px-2 py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                                        children: pack.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                        lineNumber: 1633,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeClass}`,
                                                        children: [
                                                            Math.round(pack.coverage * 100),
                                                            "% ",
                                                            pack.status
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                        lineNumber: 1634,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1632,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/75",
                                                children: pack.objective
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1638,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-[11px] font-semibold text-[color:var(--brand-ink)]/70",
                                                children: [
                                                    "Installed ",
                                                    pack.installedCount,
                                                    "/",
                                                    pack.dependencies.length,
                                                    ": ",
                                                    pack.dependencies.join(', ')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1639,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, pack.key, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1628,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1618,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1616,
                        columnNumber: 13
                    }, this),
                    (dependencyHealth.criticalUpdates || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-rose-300 bg-white px-2.5 py-1",
                                children: "Critical Package Updates"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1651,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 space-y-1",
                                children: dependencyHealth.criticalUpdates.map((update)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            update.name,
                                            ": ",
                                            update.current,
                                            ' -> ',
                                            update.latest,
                                            " (",
                                            update.status,
                                            ")"
                                        ]
                                    }, update.name, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1654,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1652,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1650,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs text-emerald-900",
                        children: "No critical package updates detected."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1661,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1582,
                columnNumber: 9
            }, this),
            quantumDiagnostics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-emerald-900 rounded-full border border-emerald-300 bg-white px-2.5 py-1",
                        children: "Quantum Diagnostics Snapshot"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1670,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-emerald-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-emerald-900",
                        children: [
                            "Signal: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: quantumDiagnostics.signal
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1672,
                                columnNumber: 21
                            }, this),
                            ' | ',
                            "Confidence: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    (quantumDiagnostics.confidence * 100).toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1673,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1671,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-emerald-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-emerald-900/90",
                        children: quantumDiagnostics.recommendation
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1675,
                        columnNumber: 11
                    }, this),
                    quantumDiagnostics.components && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-2 gap-1 sm:grid-cols-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900",
                                children: [
                                    "margin ",
                                    (quantumDiagnostics.components.modelMargin * 100).toFixed(0),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1678,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900",
                                children: [
                                    "consensus ",
                                    (quantumDiagnostics.components.featureConsensus * 100).toFixed(0),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1679,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900",
                                children: [
                                    "stability ",
                                    (quantumDiagnostics.components.temporalStability * 100).toFixed(0),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1680,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900",
                                children: [
                                    "backend ",
                                    (quantumDiagnostics.components.backendReliability * 100).toFixed(0),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1681,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-emerald-300 bg-white px-2 py-1 text-[11px] text-emerald-900",
                                children: [
                                    "trend ",
                                    (quantumDiagnostics.components.trendAlignment * 100).toFixed(0),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1682,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1677,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-emerald-300 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-emerald-900/70",
                        children: [
                            "Captured: ",
                            new Date(quantumDiagnostics.capturedAt).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1685,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1669,
                columnNumber: 9
            }, this),
            strategyLab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-violet-300 bg-violet-50 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-violet-900 rounded-full border border-violet-300 bg-white px-2.5 py-1",
                        children: "Strategy Lab"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1691,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-violet-900",
                        children: [
                            "Objective: ",
                            strategyLab.objective
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1692,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-xs font-semibold text-violet-900/90",
                        children: strategyLab.recommendation
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1693,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-violet-900/80",
                        children: [
                            "Confidence ",
                            (strategyLab.confidence * 100).toFixed(1),
                            "% | Weak components: ",
                            strategyLab.diagnostics.weakComponents.join(', ') || 'none'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1694,
                        columnNumber: 11
                    }, this),
                    (strategyLab.actionPlan || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-violet-300 bg-white px-2 py-2 text-xs text-violet-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1",
                                children: "One-Click Actions"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1700,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                                children: strategyLab.actionPlan.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md border border-violet-300 bg-violet-50/50 px-2 py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "font-semibold rounded-full border border-violet-300 bg-white px-2.5 py-1",
                                                children: action.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1704,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "mt-1 w-full rounded-2xl border border-violet-300 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-violet-900/85",
                                                children: action.reason
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1705,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void executeStrategyAction(action.id),
                                                disabled: isRunningTask,
                                                className: "mt-2 rounded-md border border-violet-400 bg-white px-2 py-1 text-[11px] font-semibold text-violet-900 hover:bg-violet-100 disabled:opacity-60",
                                                children: isRunningTask ? 'Running...' : 'Execute'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1706,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, action.id, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1703,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1701,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1699,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1",
                                        children: "Quick Wins"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1722,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1",
                                        children: strategyLab.quickWins.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "- ",
                                                    item
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1725,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1723,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1721,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1",
                                        children: "Growth Bets"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1730,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1",
                                        children: strategyLab.growthBets.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "- ",
                                                    item
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1733,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1731,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1729,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1",
                                        children: "Risk Guards"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1738,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1",
                                        children: strategyLab.riskGuards.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "- ",
                                                    item
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1741,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1739,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1737,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1720,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1690,
                columnNumber: 9
            }, this),
            websiteEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "Website Edit Plan"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1751,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: websiteEdit.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1752,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/70",
                        children: [
                            "Target: ",
                            websiteEdit.targetSite
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1753,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-2",
                        children: websiteEdit.edits.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                        children: entry.area
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1758,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: entry.objective
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1759,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1",
                                        children: entry.changes.map((change)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "- ",
                                                    change
                                                ]
                                            }, change, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1762,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1760,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, entry.area, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1757,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1755,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1750,
                columnNumber: 9
            }, this),
            abiConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "ABI Config Sync"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1773,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: abiConfig.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1774,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                        children: abiConfig.networks.map((network)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                        children: [
                                            network.network.toUpperCase(),
                                            " (",
                                            network.chainId,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1779,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-1 space-y-1",
                                        children: network.contracts.map((contract)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    contract.key,
                                                    " ",
                                                    contract.address.slice(0, 6),
                                                    "...",
                                                    contract.address.slice(-4),
                                                    " | fn: ",
                                                    contract.functionCount,
                                                    " | features: ",
                                                    contract.detectedFeatures.join(', ')
                                                ]
                                            }, `${network.network}-${contract.key}`, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1782,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1780,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, network.network, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1778,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1776,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                                children: "Tab Configuration"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1792,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 space-y-1",
                                children: abiConfig.tabConfiguration.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            entry.tab,
                                            ": contracts [",
                                            entry.requiredContracts.join(', '),
                                            "] | writes [",
                                            entry.enabledWrites.join(', ') || 'none',
                                            "]"
                                        ]
                                    }, entry.tab, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1795,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1793,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1791,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1772,
                columnNumber: 9
            }, this),
            cloudDeploy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mb-3 rounded-lg border px-3 py-2 ${cloudDeploy.status === 'ready' || cloudDeploy.status === 'triggered' ? 'border-sky-300 bg-sky-50' : cloudDeploy.status === 'no-credentials' ? 'border-amber-300 bg-amber-50' : cloudDeploy.status === 'error' ? 'border-rose-300 bg-rose-50' : 'border-sky-200 bg-white'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-[11px] uppercase tracking-wide text-sky-700/70 rounded-full border border-sky-300 bg-white px-2.5 py-1",
                                children: [
                                    "Cloud Deploy — ",
                                    cloudDeploy.platform.toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1815,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${cloudDeploy.status === 'ready' || cloudDeploy.status === 'triggered' ? 'bg-sky-100 text-sky-800' : cloudDeploy.status === 'error' ? 'bg-rose-100 text-rose-800' : cloudDeploy.status === 'no-credentials' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`,
                                children: cloudDeploy.status
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1818,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1814,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: cloudDeploy.message
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1831,
                        columnNumber: 11
                    }, this),
                    cloudDeploy.deploymentUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: cloudDeploy.deploymentUrl,
                        className: "mt-1 inline-block text-xs font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900",
                        children: cloudDeploy.deploymentUrl
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1834,
                        columnNumber: 13
                    }, this),
                    cloudDeploy.buildLogsUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: cloudDeploy.buildLogsUrl,
                        className: "mt-1 ml-3 inline-block text-xs text-sky-600 underline underline-offset-2 hover:text-sky-800",
                        children: "View build logs →"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1843,
                        columnNumber: 13
                    }, this),
                    cloudDeploy.deployments && cloudDeploy.deployments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1",
                        children: cloudDeploy.deployments.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between rounded-md border border-sky-200 bg-white px-2 py-1 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-sky-800",
                                        children: d.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1855,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${d.state === 'READY' || d.state === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`,
                                        children: d.state
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1856,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                        href: d.url,
                                        className: "text-sky-600 underline",
                                        children: [
                                            d.url.replace('https://', '').slice(0, 32),
                                            "…"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1859,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, d.id, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1854,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1852,
                        columnNumber: 13
                    }, this),
                    cloudDeploy.guidance.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-sky-200 bg-white px-2 py-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-[10px] font-semibold uppercase text-sky-700/70 rounded-full border border-sky-300 bg-sky-50 px-2.5 py-1",
                                children: "Next Steps"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1869,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 space-y-1",
                                children: cloudDeploy.guidance.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-xs text-sky-900",
                                        children: [
                                            "→ ",
                                            item
                                        ]
                                    }, item, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1872,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1870,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1868,
                        columnNumber: 13
                    }, this),
                    cloudDeploy.deploymentId && cloudDeploy.status !== 'ready' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void runCloudDeploy('status'),
                        disabled: isRunningTask,
                        className: "mt-2 rounded-md border border-sky-300 bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-800 hover:bg-sky-200 disabled:opacity-60",
                        children: isRunningTask ? 'Checking...' : 'Refresh Status'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1879,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1805,
                columnNumber: 9
            }, this),
            qpandaTask && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mb-3 rounded-lg border px-3 py-2 ${qpandaTask.ok ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-[11px] uppercase tracking-wide text-emerald-700/70 rounded-full border border-emerald-300 bg-white px-2.5 py-1",
                                children: "QPanda Task"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1898,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${qpandaTask.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`,
                                children: qpandaTask.action
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1899,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1897,
                        columnNumber: 11
                    }, this),
                    qpandaTask.taskId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: [
                            "Task ID: ",
                            qpandaTask.taskId
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1907,
                        columnNumber: 13
                    }, this),
                    qpandaTask.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: [
                            "Status: ",
                            qpandaTask.status
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1911,
                        columnNumber: 13
                    }, this),
                    qpandaTask.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-1 w-full rounded-2xl border border-rose-300 bg-rose-50 px-2.5 py-1 text-left text-xs font-semibold text-rose-900",
                        children: qpandaTask.error
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1915,
                        columnNumber: 13
                    }, this),
                    qpandaTask.result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "mt-2 max-h-40 overflow-auto rounded-md border border-emerald-200 bg-white px-2 py-1 text-[11px] text-emerald-900",
                        children: JSON.stringify(qpandaTask.result, null, 2)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1919,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1892,
                columnNumber: 9
            }, this),
            messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1",
                        children: "Conversation"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1928,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-48 space-y-2 overflow-auto",
                        children: messages.slice(-6).map((message, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-md px-2.5 py-2 text-xs ${message.role === 'assistant' ? 'border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]/85' : 'bg-[color:var(--brand-forest)]/10 text-[color:var(--brand-ink)]/85'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mb-1 rounded-full border border-slate-900/10 bg-white/90 px-2 py-0.5 font-semibold capitalize",
                                        children: message.role
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1939,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "w-full rounded-2xl border border-slate-900/10 bg-white/90 px-2.5 py-1 text-left font-semibold",
                                        children: message.text
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1940,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `${message.role}-${message.at}-${idx}`, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1931,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1929,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1927,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
        lineNumber: 937,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shell/QuantumAiLauncher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuantumAiLauncher",
    ()=>QuantumAiLauncher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAgentKitPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumAgentKitPanel.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function QuantumAiLauncher({ activeTab, prediction, takeoverPlan, onActivateTakeover, onDeactivateTakeover, onApplyAbiConfiguration, onResetAbiConfiguration }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Open RAYAY",
                onClick: ()=>setIsOpen(true),
                className: "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_16px_32px_rgba(15,23,42,0.2)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-[10px] font-bold text-slate-700",
                        children: "AI"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    "RAYAY"
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-end justify-center bg-slate-900/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-3xl rounded-2xl border border-slate-300 bg-[color:var(--brand-cream)] p-3 shadow-[0_28px_64px_rgba(15,23,42,0.28)] sm:p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)] sm:text-base",
                                    children: "RAYAY Agent"
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setIsOpen(false),
                                    className: "rounded-md border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-medium text-[color:var(--brand-ink)]/85",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-[78vh] overflow-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAgentKitPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuantumAgentKitPanel"], {
                                activeTab: activeTab,
                                prediction: prediction,
                                takeoverEnabled: Boolean(takeoverPlan?.enabled),
                                onActivateTakeover: onActivateTakeover,
                                onDeactivateTakeover: onDeactivateTakeover,
                                onApplyAbiConfiguration: onApplyAbiConfiguration,
                                onResetAbiConfiguration: onResetAbiConfiguration
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAiLauncher.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/shell/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AppHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AppHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$CdpCliPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/CdpCliPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$HeroSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/HeroSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$MiniAppActionPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/MiniAppActionPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$MiniAppNotificationCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/MiniAppNotificationCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$TabsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/TabsSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$TxStatusBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/TxStatusBanner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AboutPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AboutPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AppFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AppFooter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$ShellStyles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/ShellStyles.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumSignalPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumSignalPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$AbiDrivenStudio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/AbiDrivenStudio.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAgentKitPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumAgentKitPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$QuantumAiLauncher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/QuantumAiLauncher.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shell$2f$PriceTicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shell/PriceTicker.tsx [app-ssr] (ecmascript)");
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
;
;
;
}),
];

//# sourceMappingURL=components_4eafb858._.js.map