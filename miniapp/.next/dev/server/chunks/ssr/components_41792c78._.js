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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs uppercase tracking-wide text-[color:var(--brand-ink)]/60 mb-2",
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/WalletIdentityBadge.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-['IBM_Plex_Mono'] text-sm font-semibold text-slate-900",
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-[color:var(--brand-ink)] mb-2",
                        children: "🧩 Onchain SDK Stack"
                    }, void 0, false, {
                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[color:var(--brand-ink)]/75",
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-[color:var(--brand-ink)]",
                                                children: sdk.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/OnchainSdkPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-0.5",
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-[10px] text-[color:var(--brand-ink)]/55",
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-[color:var(--brand-ink)] text-sm mb-2",
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[color:var(--brand-ink)]/75",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/OnchainSdkPanel.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: item.ok ? 'text-[color:var(--brand-forest)]' : 'text-red-700',
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useDisconnect.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AppHeader({ aiTakeoverEnabled = false }) {
    const [walletMenuOpen, setWalletMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasHydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(()=>()=>undefined, ()=>true, ()=>false);
    const { address, chain, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnect"])();
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisconnect"])();
    const shortAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!address) return 'Connect Wallet';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }, [
        address
    ]);
    const walletButtonLabel = hasHydrated && isConnected ? shortAddress : 'Connect Wallet';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "brand-surface sticky top-0 z-50 border-b border-slate-900/10 bg-white/78 backdrop-blur-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "reveal-up rounded-[1.2rem] border border-slate-900/12 bg-white/90 px-3 py-2 shadow-[0_16px_34px_rgba(15,23,42,0.12)] sm:px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-4",
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
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "brand-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 truncate",
                                            children: "ONabat"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-slate-600 truncate",
                                            children: "Institutional Omnichain Desk | Base + Arbitrum"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 47,
                                            columnNumber: 15
                                        }, this),
                                        aiTakeoverEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-1 inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-800",
                                            children: "RAYAY Takeover Active"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppHeader.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setWalletMenuOpen((prev)=>!prev),
                                    className: "inline-flex items-center gap-2 rounded-xl border border-slate-900/15 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full bg-sky-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: walletButtonLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppHeader.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                walletMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 mt-2 w-72 rounded-xl border border-slate-900/10 bg-white/96 p-2 shadow-[0_18px_34px_rgba(15,23,42,0.16)] backdrop-blur",
                                    children: hasHydrated && isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-slate-900/10 bg-cyan-50/60 px-3 py-2 text-xs text-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-slate-900",
                                                        children: shortAddress
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Chain: ",
                                                            chain?.name || 'Unknown'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/AppHeader.tsx",
                                                lineNumber: 70,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    disconnect();
                                                    setWalletMenuOpen(false);
                                                },
                                                className: "w-full rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100",
                                                children: "Disconnect"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppHeader.tsx",
                                                lineNumber: 74,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                        lineNumber: 69,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "px-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500",
                                                children: "Connect Gateway"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppHeader.tsx",
                                                lineNumber: 87,
                                                columnNumber: 21
                                            }, this),
                                            connectors.map((connector)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: Boolean(isPending),
                                                    onClick: ()=>connect({
                                                            connector
                                                        }),
                                                    className: "w-full rounded-lg border border-slate-900/10 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800 transition hover:border-cyan-300/70 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60",
                                                    children: [
                                                        connector.name,
                                                        isPending ? ' (connecting...)' : ''
                                                    ]
                                                }, connector.uid, true, {
                                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 23
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AppHeader.tsx",
                                        lineNumber: 86,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppHeader.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppHeader.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/AppHeader.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/AppHeader.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/shell/AppHeader.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shell/AppHeader.tsx",
        lineNumber: 30,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
;
;
function HeroSection({ takeoverPlan }) {
    const aiActive = Boolean(takeoverPlan?.enabled);
    const heading = aiActive ? takeoverPlan?.headline || 'RAYAY is actively optimizing product visibility' : 'One command center for ONBT across Base and Arbitrum.';
    const subline = aiActive ? takeoverPlan?.subline || 'Adaptive visuals and focused feature guidance are now enabled by RAYAY.' : 'Trade, bridge, stake, and govern with real-time telemetry and contract-safe execution flows.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `brand-hero hero-graphic mb-5 rounded-3xl p-4 sm:p-6 ${aiActive ? 'takeover-glow takeover-pulse' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mesh-overlay",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/shell/HeroSection.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 reveal-up stagger-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "inline-flex items-center rounded-full border border-slate-900/15 bg-white/95 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "LayerZero V2 Omnichain Interface"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 24,
                                        columnNumber: 13
                                    }, this),
                                    aiActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-800",
                                        children: "RAYAY Visibility Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 28,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "brand-display max-w-3xl text-3xl font-extrabold leading-[1.02] text-slate-900 sm:text-[3.25rem]",
                                children: heading
                            }, void 0, false, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-2xl text-sm text-slate-600 sm:text-lg",
                                children: subline
                            }, void 0, false, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/HeroSection.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "reveal-up stagger-2 grid grid-cols-1 gap-3 text-xs sm:grid-cols-3 sm:text-sm lg:max-w-[520px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "motion-card metric-card rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500",
                                        children: "Execution Hub"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-['IBM_Plex_Mono'] font-semibold text-slate-900",
                                        children: "Base 8453"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "motion-card metric-card rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500",
                                        children: "Settlement Route"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-['IBM_Plex_Mono'] font-semibold text-slate-900",
                                        children: "Arbitrum 42161"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "motion-card metric-card rounded-2xl border border-slate-900/12 bg-white/95 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500",
                                        children: "Runtime Stack"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-['IBM_Plex_Mono'] font-semibold text-slate-900",
                                        children: "OnchainKit + Wagmi"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/HeroSection.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/HeroSection.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/HeroSection.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/HeroSection.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "reveal-up stagger-3 pointer-events-none mt-3 hidden items-center justify-end lg:flex",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hero-ring absolute inset-[-6px] rounded-full border border-cyan-300/50"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/HeroSection.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/HeroSection.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/HeroSection.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/HeroSection.tsx",
        lineNumber: 19,
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "MiniKit Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    statusPills.map((pill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "chip-pulse inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-950",
                                            children: pill
                                        }, pill, false, {
                                            fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                            lineNumber: 70,
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
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: userLabel
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-600",
                                                children: user?.fid ? `FID ${user.fid}` : 'No Farcaster identity in this browser session.'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 86,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: client?.platformType ? `Client: ${client.platformType}` : 'Open this inside Farcaster to unlock native actions and profile routing.'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 89,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500",
                                                children: "Safe Top"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: [
                                                    safeArea.top,
                                                    "px"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500",
                                                children: "Safe Bottom"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: [
                                                    safeArea.bottom,
                                                    "px"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500",
                                                children: "Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: hasNotificationDetails ? 'Ready' : 'Pending'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "metric-card rounded-2xl border border-slate-900/10 bg-slate-50/85 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500",
                                                children: "Miniapp Save"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: isAdded ? 'Added' : 'Not Added'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                                lineNumber: 110,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 95,
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
                                lineNumber: 116,
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
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>openUrl('https://base.org/builders/minikit'),
                                className: "cta-button rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50",
                                children: "Open MiniKit Builder Docs"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/MiniAppActionPanel.tsx",
                        lineNumber: 115,
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
                lineNumber: 143,
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
                label: 'Browser preview',
                detail: 'Open ONabat inside Farcaster to add the miniapp and enable push notifications.'
            };
        }
        if (!isAdded) {
            return {
                label: 'Miniapp not added',
                detail: 'Add ONabat to your Farcaster miniapps to provision notification permissions.'
            };
        }
        if (!hasNotificationDetails) {
            return {
                label: 'Waiting for notification token',
                detail: 'Farcaster has loaded the miniapp, but notification details have not been issued yet.'
            };
        }
        return {
            label: 'Notifications ready',
            detail: 'A Farcaster notification token is present. You can send a test push through the MiniKit proxy now.'
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
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                        children: "Farcaster Notifications"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    fid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-900",
                                        children: [
                                            "FID ",
                                            fid
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-slate-900",
                                        children: status.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "max-w-2xl text-sm text-slate-600",
                                        children: status.detail
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                                lineNumber: 122,
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
                                lineNumber: 129,
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
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/MiniAppNotificationCard.tsx",
                        lineNumber: 128,
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
                lineNumber: 149,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.12em] text-[color:var(--brand-ink)]/60",
                children: [
                    "Active module: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-slate-900",
                        children: activeTabMeta?.label
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TabsSection.tsx",
                        lineNumber: 80,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/TabsSection.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            staleTabs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/35 bg-amber-50 px-3 py-2 text-xs text-amber-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Data is stale for ",
                            staleTabs.map((tab)=>tab.label).join(', '),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/TabsSection.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    onRefreshStale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRefreshStale,
                        className: "rounded-md border border-amber-400/65 bg-white px-2 py-1 font-medium text-amber-900 transition-colors hover:bg-amber-100",
                        children: "Refresh"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TabsSection.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/TabsSection.tsx",
                lineNumber: 83,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold uppercase tracking-wide",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$app$2d$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TX_LABEL_BY_SOURCE"][status.source]
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TxStatusBanner.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/TxStatusBanner.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            status.errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs opacity-90",
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-semibold brand-display mb-4",
                children: "About ONBT"
            }, void 0, false, {
                fileName: "[project]/components/shell/AboutPanel.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 text-[color:var(--brand-ink)]/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[color:var(--brand-forest)]",
                                children: "Omnichain Nabat Token (ONBT)"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            " is a LayerZero V2 Omnichain Fungible Token (OFT) that exists natively across multiple blockchains."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[color:var(--brand-ink)] mb-2",
                                children: "🔗 Supported Chains"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 29,
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
                                                lineNumber: 31,
                                                columnNumber: 19
                                            }, this),
                                            " (Hub Chain) - EID 30184"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Arbitrum"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 32,
                                                columnNumber: 19
                                            }, this),
                                            " - EID 30110"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[color:var(--brand-ink)] mb-2",
                                children: "✨ Features"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 36,
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
                                                lineNumber: 38,
                                                columnNumber: 19
                                            }, this),
                                            " 1 billion ONBT across all chains"
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
                                                children: "Native Transfers:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 39,
                                                columnNumber: 19
                                            }, this),
                                            " Seamless cross-chain bridging"
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
                                                children: "Omnichain Staking:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 40,
                                                columnNumber: 19
                                            }, this),
                                            " Stake on any chain, earn everywhere"
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
                                                children: "Cross-Chain Governance:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this),
                                            " Vote from any supported chain"
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
                                                children: "Achievement NFTs:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 42,
                                                columnNumber: 19
                                            }, this),
                                            " Portable NFTs across all chains"
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
                                                children: "No Wrapping:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 43,
                                                columnNumber: 19
                                            }, this),
                                            " Same token on every chain"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Secure:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 44,
                                                columnNumber: 19
                                            }, this),
                                            " Powered by LayerZero V2"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-cream)] rounded-lg border border-[color:var(--brand-leaf)]/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[color:var(--brand-ink)] mb-2",
                                children: "📜 Contracts"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[color:var(--brand-ink)]/60 mb-1",
                                                children: "Base:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: `${baseExplorer}/address/${baseTokenAddress}`,
                                                className: "font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all",
                                                children: baseTokenAddress
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[color:var(--brand-ink)]/60 mb-1",
                                                children: "Arbitrum:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: `${arbitrumExplorer}/address/${arbitrumTokenAddress}`,
                                                className: "font-mono text-xs text-[color:var(--brand-forest)] hover:underline break-all",
                                                children: arbitrumTokenAddress
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/AboutPanel.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AboutPanel.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-[color:var(--brand-sun)]/20 rounded-lg border border-[color:var(--brand-sun)]/40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "⚡ LayerZero-Native:"
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AboutPanel.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                " This miniapp exclusively features LayerZero-enabled contracts. All functionality leverages omnichain messaging for true cross-chain interoperability."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AboutPanel.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OnchainSdkPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OnchainSdkPanel"], {}, void 0, false, {
                        fileName: "[project]/components/shell/AboutPanel.tsx",
                        lineNumber: 77,
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
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "brand-display mb-2 text-lg font-bold uppercase tracking-wide text-slate-900",
                                    children: "About ONBT"
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 10,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600",
                                    children: "Omnichain token built with the LayerZero V2 OFT standard for seamless cross-chain transfers."
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 11,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "reveal-up stagger-2 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "brand-display mb-2 text-lg font-bold uppercase tracking-wide text-slate-900",
                                    children: "Resources"
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 14,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-sm text-slate-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: "https://www.nabat.finance",
                                                className: "transition-colors hover:text-cyan-700",
                                                children: "Website"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppFooter.tsx",
                                                lineNumber: 17,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 16,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: "https://docs.layerzero.network",
                                                className: "transition-colors hover:text-cyan-700",
                                                children: "LayerZero Docs"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppFooter.tsx",
                                                lineNumber: 22,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 21,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 15,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "reveal-up stagger-3 rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "brand-display mb-2 text-lg font-bold uppercase tracking-wide text-slate-900",
                                    children: "Community"
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-sm text-slate-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: "https://x.com/NBT_V2",
                                                className: "transition-colors hover:text-cyan-700",
                                                children: "Twitter"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppFooter.tsx",
                                                lineNumber: 32,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: "https://discord.gg/nabatfinance",
                                                className: "transition-colors hover:text-cyan-700",
                                                children: "Discord"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppFooter.tsx",
                                                lineNumber: 37,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: "https://t.me/NabatOmnichainGovernment",
                                                className: "transition-colors hover:text-cyan-700",
                                                children: "Telegram"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/AppFooter.tsx",
                                                lineNumber: 42,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AppFooter.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AppFooter.tsx",
                                    lineNumber: 30,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "© 2026 ONabat. Built with LayerZero V2 OFT Standard."
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                            href: "https://base.org/builders/minikit",
                            className: "text-cyan-700 transition-colors hover:text-cyan-800",
                            children: "Built on Base with MiniKit"
                        }, void 0, false, {
                            fileName: "[project]/components/shell/AppFooter.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/AppFooter.tsx",
                    lineNumber: 49,
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
        about: 'Ecosystem posture'
    };
    const signal = prediction?.signal ?? 'caution';
    const signalLabel = signal === 'risk-on' ? 'Risk-on' : 'Caution';
    const confidenceValue = prediction?.confidence ?? 0;
    const confidenceClass = confidenceValue >= 0.72 ? 'text-emerald-700' : confidenceValue >= 0.5 ? 'text-amber-700' : 'text-rose-700';
    const signalClass = signal === 'risk-on' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-orange-300 bg-orange-50 text-orange-900';
    const recommendationList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!prediction) {
            return [
                'Gathering baseline telemetry for adaptive suggestions.',
                'Check back after the next refresh to unlock scenario guidance.'
            ];
        }
        if (activeTab === 'bridge') {
            return signal === 'risk-on' ? [
                'Bridge route looks stable. Execute standard-sized transfers.',
                'Keep slippage limits near default while conditions stay green.'
            ] : [
                'Bridge reliability is soft. Split large transfers into smaller batches.',
                'Delay non-urgent bridge actions until confidence improves.'
            ];
        }
        if (activeTab === 'staking') {
            return signal === 'risk-on' ? [
                'Current conditions support normal staking horizons.',
                'Compounding cadence can remain on your regular schedule.'
            ] : [
                'Use shorter staking horizons during caution windows.',
                'Favor claim-and-hold over aggressive compounding for now.'
            ];
        }
        if (activeTab === 'governance') {
            return signal === 'risk-on' ? [
                'Governance participation is supportive. High-impact votes are timely.',
                'Delegate refresh can proceed without elevated timing risk.'
            ] : [
                'Participation quality is mixed. Prioritize critical votes only.',
                'Re-check signal before finalizing large governance moves.'
            ];
        }
        if (activeTab === 'private-sale') {
            return signal === 'risk-on' ? [
                'Private sale conditions are favorable for planned entries.',
                'Staggered entries still help control local volatility.'
            ] : [
                'Conditions are cautious. Use smaller staged allocations.',
                'Preserve dry powder for stronger confidence windows.'
            ];
        }
        return signal === 'risk-on' ? [
            'Execution conditions are favorable for regular app activity.',
            'You can keep normal cadence while confidence remains stable.'
        ] : [
            'Use defensive pacing across actions while caution is active.',
            'Prioritize low-slippage and reversible actions first.'
        ];
    }, [
        activeTab,
        prediction,
        signal
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
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRetry,
                        className: "brand-secondary-button rounded-md px-3 py-1 text-xs font-medium",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
            lineNumber: 191,
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
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "kicker-label",
                                children: "Quantum Telemetry"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold sm:text-base",
                                children: "Quantum Ecosystem Signal"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 212,
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
                                lineNumber: 217,
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
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${signalClass}`,
                                children: signalLabel
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-[color:var(--brand-ink)]/80",
                    children: [
                        "Runtime posture: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            children: signalLabel
                        }, void 0, false, {
                            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                            lineNumber: 242,
                            columnNumber: 28
                        }, this),
                        " | Module intent:",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            children: tabIntentLabel[activeTab]
                        }, void 0, false, {
                            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-xl border border-slate-200 bg-white/85 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Adaptive UX Mode"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Focus: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: tabIntentLabel[activeTab]
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 251,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Trend: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${trendClass}`,
                                        children: trendLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 254,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Confidence:",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${confidenceClass}`,
                                        children: prediction ? `${(confidenceValue * 100).toFixed(1)}%` : '--'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-200 bg-white/90 px-3 py-3 text-xs sm:text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "telemetry-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-key",
                                children: "Healthy Probability"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-value",
                                children: prediction ? `${(prediction.probabilityHealthy * 100).toFixed(1)}%` : '--'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "telemetry-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-key",
                                children: "Confidence"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-value",
                                children: prediction ? `${(prediction.confidence * 100).toFixed(1)}%` : '--'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "telemetry-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-key",
                                children: "Inference Mode"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-value",
                                children: prediction?.mode ?? '--'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "telemetry-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-key",
                                children: "Model Label"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "telemetry-value flex items-center gap-2",
                                children: [
                                    prediction?.label ?? '--',
                                    refreshing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[color:var(--brand-ink)]/55",
                                        children: "refreshing..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 282,
                                        columnNumber: 28
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 rounded-xl border border-slate-200 bg-white/90 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Model Guidance"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs sm:text-sm text-[color:var(--brand-ink)]/80",
                        children: prediction?.recommendation ?? 'Collecting enough signal data to produce guidance.'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    !compactMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-1.5 text-xs sm:text-sm",
                        children: recommendationList.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-1.5 text-[color:var(--brand-ink)]/85",
                                children: item
                            }, idx, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 296,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 294,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-2 overflow-hidden rounded-full border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)]/75",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `block h-full rounded-full transition-all duration-500 ease-out ${scenario.signal === 'risk-on' ? 'bg-emerald-500/80' : 'bg-orange-500/80'} ${progressWidthClass(scenario.probability)}`
                        }, void 0, false, {
                            fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                            lineNumber: 307,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 306,
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
                                lineNumber: 322,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            !compactMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card mt-3 rounded-xl px-3 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                                children: "Scenario Lab"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[color:var(--brand-ink)]/70",
                                children: "What-if simulation for your next action"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Liquidity bias"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 342,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: [
                                                    liquidityTweak > 0 ? `+${liquidityTweak}` : liquidityTweak,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: -30,
                                        max: 30,
                                        step: 5,
                                        value: liquidityTweak,
                                        onChange: (event)=>setLiquidityTweak(Number(event.target.value)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Bridge bias"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: [
                                                    bridgeTweak > 0 ? `+${bridgeTweak}` : bridgeTweak,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: -30,
                                        max: 30,
                                        step: 5,
                                        value: bridgeTweak,
                                        onChange: (event)=>setBridgeTweak(Number(event.target.value)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "brand-pill brand-pill-soft rounded-lg px-2.5 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Governance bias"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: [
                                                    governanceTweak > 0 ? `+${governanceTweak}` : governanceTweak,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: -30,
                                        max: 30,
                                        step: 5,
                                        value: governanceTweak,
                                        onChange: (event)=>setGovernanceTweak(Number(event.target.value)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-pill brand-pill-soft mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs sm:text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Simulated Healthy Probability:",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: prediction ? `${(scenario.probability * 100).toFixed(1)}%` : '--'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                                lineNumber: 390,
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
                                lineNumber: 394,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
                lineNumber: 333,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/QuantumSignalPanel.tsx",
        lineNumber: 210,
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
    const modeFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>contractFunctions.filter((item)=>mode === 'read' ? item.stateMutability === 'view' || item.stateMutability === 'pure' : item.stateMutability === 'nonpayable' || item.stateMutability === 'payable'), [
        contractFunctions,
        mode
    ]);
    const selectedFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>modeFunctions.find((fn)=>fn.name === selectedFunctionName), [
        modeFunctions,
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
    const groupedModeFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const grouped = new Map();
        CATEGORY_ORDER.forEach((category)=>grouped.set(category, []));
        modeFunctions.forEach((fn)=>{
            const category = categorizeFunction(fn.name);
            const bucket = grouped.get(category);
            if (bucket) bucket.push(fn);
        });
        return CATEGORY_ORDER.map((category)=>({
                category,
                items: grouped.get(category) || []
            })).filter((group)=>group.items.length > 0);
    }, [
        modeFunctions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (chain?.id === 8453 || chain?.id === 42161) {
            setSelectedChainId(chain.id);
        }
    }, [
        chain?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedFunction && modeFunctions.length > 0) {
            setSelectedFunctionName(modeFunctions[0].name);
        }
        if (modeFunctions.length === 0) {
            setSelectedFunctionName('');
        }
    }, [
        selectedFunction,
        modeFunctions
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
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "kicker-label",
                                children: "Contract Console"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 548,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm sm:text-base font-semibold",
                                children: "ABI-Driven Contract Studio"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[color:var(--brand-ink)]/65",
                                children: "Quantum-assisted interaction surface generated from live contract ABIs."
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 550,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "brand-pill text-xs text-[color:var(--brand-ink)]/80",
                        children: [
                            "Quantum mode: ",
                            prediction?.signal ?? 'caution'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 554,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 546,
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
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[color:var(--brand-ink)]/80",
                        children: [
                            "Active profile: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: selectedContract.label
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 562,
                                columnNumber: 27
                            }, this),
                            " | Chain target:",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 559,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "brand-stat-card rounded-lg px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "kicker-label mb-1 block",
                                children: "Contract Profile"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 569,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedContractId,
                                onChange: (event)=>setSelectedContractId(event.target.value),
                                className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                                children: CONTRACT_PRESETS.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: preset.id,
                                        children: preset.label
                                    }, preset.id, false, {
                                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-[color:var(--brand-ink)]/65",
                                children: selectedContract.description
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 581,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-lg px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "kicker-label mb-1 block",
                                children: "Execution Chain"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 585,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                                label: "",
                                selectedChainId: selectedChainId,
                                onSelectChain: setSelectedChainId
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 586,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[color:var(--brand-ink)]/65 break-all",
                                children: activeAddress
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 591,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this),
            suggestedFunctions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-highlight-bar mb-3 rounded-xl px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "kicker-label",
                        children: "Quantum Suggestions"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 597,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex flex-wrap gap-1.5",
                        children: suggestedFunctions.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelectedFunctionName(name),
                                className: "brand-pill text-xs text-[color:var(--brand-ink)]/85 hover:border-[color:var(--brand-forest)]/45",
                                children: humanizeFunctionName(name)
                            }, name, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 600,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 598,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 596,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMode('read'),
                        className: `rounded-md px-3 py-1.5 text-xs font-medium ${mode === 'read' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950' : 'brand-secondary-button text-[color:var(--brand-ink)]/80'}`,
                        children: "Read"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 614,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMode('write'),
                        className: `rounded-md px-3 py-1.5 text-xs font-medium ${mode === 'write' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950' : 'brand-secondary-button text-[color:var(--brand-ink)]/80'}`,
                        children: "Write"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        "aria-label": "ABI function selector",
                        title: "ABI function selector",
                        value: selectedFunctionName,
                        onChange: (event)=>setSelectedFunctionName(event.target.value),
                        className: "brand-input min-w-[220px] rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                        children: [
                            modeFunctions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "No ABI functions in this mode"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 644,
                                columnNumber: 42
                            }, this),
                            groupedModeFunctions.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                                    label: CATEGORY_LABELS[group.category],
                                    children: group.items.map((fn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: fn.name,
                                            children: [
                                                humanizeFunctionName(fn.name),
                                                " (",
                                                fn.inputs.length,
                                                " args)"
                                            ]
                                        }, fn.name, true, {
                                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                            lineNumber: 648,
                                            columnNumber: 17
                                        }, this))
                                }, group.category, false, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 646,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 637,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 613,
                columnNumber: 7
            }, this),
            selectedFunction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card space-y-2 rounded-xl px-3 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-pill text-xs text-[color:var(--brand-ink)]/80",
                                children: selectedFunctionLabel
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 660,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-pill brand-pill-soft text-xs text-[color:var(--brand-ink)]/70",
                                children: [
                                    "Category: ",
                                    CATEGORY_LABELS[selectedFunctionCategory]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 663,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-pill brand-pill-soft text-xs text-[color:var(--brand-ink)]/70",
                                children: [
                                    "ABI: ",
                                    selectedFunction.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 666,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 659,
                        columnNumber: 11
                    }, this),
                    mode === 'write' && blockedWrite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-rose-400/35 bg-rose-500/10 px-2.5 py-2 text-xs text-rose-100",
                        children: [
                            "This function is blocked in ABI Studio safety policy: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: selectedFunction.name
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 673,
                                columnNumber: 69
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 672,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>applySmartTemplate('wallet-self'),
                                className: "brand-pill text-xs text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/45",
                                children: "Fill wallet args"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 678,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>applySmartTemplate('numeric-smoke'),
                                className: "brand-pill text-xs text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/45",
                                children: "Numeric smoke template"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 685,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>applySmartTemplate('reset'),
                                className: "brand-pill text-xs text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/45",
                                children: "Reset args"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 692,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 677,
                        columnNumber: 11
                    }, this),
                    selectedFunction.inputs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[color:var(--brand-ink)]/65",
                        children: "This function requires no arguments."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 702,
                        columnNumber: 13
                    }, this),
                    selectedFunction.inputs.map((input, index)=>{
                        const key = `${input.name || 'arg'}:${index}`;
                        const value = inputValues[key] ?? '';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-1 block text-xs text-[color:var(--brand-ink)]/75",
                                    children: [
                                        input.name || `arg${index}`,
                                        " (",
                                        input.type,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 710,
                                    columnNumber: 17
                                }, this),
                                input.type === 'bool' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: value,
                                    onChange: (event)=>setInputValues((current)=>({
                                                ...current,
                                                [key]: event.target.value
                                            })),
                                    className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "false",
                                            children: "false"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                            lineNumber: 724,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "true",
                                            children: "true"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                            lineNumber: 725,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 714,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: value,
                                    onChange: (event)=>setInputValues((current)=>({
                                                ...current,
                                                [key]: event.target.value
                                            })),
                                    className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm",
                                    placeholder: input.type === 'tuple' || input.type.startsWith('tuple') ? '{"field":"value"}' : input.type.endsWith('[]') ? 'comma,separated,values (tuple[]: JSON array)' : input.type
                                }, void 0, false, {
                                    fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                    lineNumber: 728,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                            lineNumber: 709,
                            columnNumber: 15
                        }, this);
                    }),
                    requiresRiskConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 block text-xs text-[color:var(--brand-ink)]/75",
                                children: "Confirmation phrase required for high-risk write"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 753,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: confirmationText,
                                onChange: (event)=>setConfirmationText(event.target.value),
                                placeholder: requiredPhrase,
                                className: "brand-input w-full rounded-md border border-amber-300 px-2 py-1.5 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 756,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 752,
                        columnNumber: 13
                    }, this),
                    mode === 'write' && selectedFunction.stateMutability === 'payable' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 block text-xs text-[color:var(--brand-ink)]/75",
                                children: "Native value (ETH)"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 768,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "0.000001",
                                value: payableValue,
                                onChange: (event)=>setPayableValue(event.target.value),
                                className: "brand-input w-full rounded-md border border-[color:var(--brand-leaf)]/35 px-2 py-1.5 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 769,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 767,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: mode === 'read' ? runRead : runWrite,
                                disabled: isBusy || !selectedFunctionName || blockedWrite,
                                className: "brand-button rounded-md px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50",
                                children: isBusy ? 'Working...' : mode === 'read' ? 'Run Read' : 'Send Transaction'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 781,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[color:var(--brand-ink)]/70",
                                children: statusText
                            }, void 0, false, {
                                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                                lineNumber: 789,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 780,
                        columnNumber: 11
                    }, this),
                    readResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "max-h-48 overflow-auto rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/70 p-2 text-xs text-[color:var(--brand-ink)]/85",
                        children: readResult
                    }, void 0, false, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 793,
                        columnNumber: 13
                    }, this),
                    writeHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[color:var(--brand-ink)]/75 break-all",
                        children: [
                            "Tx hash: ",
                            writeHash
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                        lineNumber: 799,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
                lineNumber: 658,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shell/AbiDrivenStudio.tsx",
        lineNumber: 545,
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm sm:text-base font-semibold",
                                children: "RAYAY AgentKit Integrity Advisor"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 940,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[color:var(--brand-ink)]/65",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "ai-wallet-mode",
                                className: "font-semibold text-[color:var(--brand-ink)]/85",
                                children: "AI Wallet Toggle"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 974,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "ai-wallet-mode",
                                value: walletMode,
                                onChange: (event)=>setWalletMode(event.target.value),
                                className: "rounded-md border border-[color:var(--brand-leaf)]/30 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "auto",
                                        children: "Auto Detect"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 983,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "cdp",
                                        children: "CDP Wallet Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 984,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "deployer",
                                        children: "Deployer Wallet Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 985,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "user",
                                        children: "User Safe Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 986,
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
                                lineNumber: 988,
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
                                lineNumber: 991,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 973,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-[color:var(--brand-ink)]/70",
                        children: accessProfile?.reason || 'User-safe mode is active until wallet role is resolved.'
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 995,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-1",
                        children: enabledCapabilities.map((capability)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80",
                                children: capability
                            }, capability, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1000,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 998,
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
                        lineNumber: 1012,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1010,
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
                        lineNumber: 1024,
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
                        lineNumber: 1033,
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
                        lineNumber: 1042,
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
                        lineNumber: 1051,
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
                        lineNumber: 1060,
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
                        lineNumber: 1069,
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
                        lineNumber: 1078,
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
                        lineNumber: 1087,
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
                        lineNumber: 1096,
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
                        lineNumber: 1105,
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
                        lineNumber: 1114,
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
                        lineNumber: 1123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-full rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold uppercase tracking-wide text-emerald-800/80",
                                children: "QPanda Controls"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80",
                                        children: [
                                            "Shots",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: 1,
                                                step: 1,
                                                value: qpandaShots,
                                                onChange: (event)=>setQpandaShots(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "1024"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1137,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80",
                                        children: [
                                            "Chip ID (optional)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: qpandaChipId,
                                                onChange: (event)=>setQpandaChipId(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "e.g. OriginQ-72"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1150,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80 sm:col-span-2",
                                        children: [
                                            "Task ID (for manual query)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: qpandaTaskIdInput,
                                                onChange: (event)=>setQpandaTaskIdInput(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "Paste task id to query"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1161,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80 sm:col-span-2",
                                        children: [
                                            "Description",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: qpandaDescribe,
                                                onChange: (event)=>setQpandaDescribe(event.target.value),
                                                className: "mt-1 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "Task description"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1172,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-[color:var(--brand-ink)]/80 sm:col-span-2",
                                        children: [
                                            "OriginIR (optional, defaults to Bell circuit)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: qpandaOriginIr,
                                                onChange: (event)=>setQpandaOriginIr(event.target.value),
                                                className: "mt-1 h-24 w-full rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-[color:var(--brand-ink)]/90",
                                                placeholder: "QINIT 2 CREG 2 H q[0] CNOT q[0],q[1] MEASURE q[0],c[0] MEASURE q[1],c[1]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1183,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-xs text-[color:var(--brand-ink)]/85 sm:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: qpandaWaitResult,
                                                onChange: (event)=>setQpandaWaitResult(event.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1192,
                                                columnNumber: 15
                                            }, this),
                                            "Wait for final result on submit (sync mode)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1191,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1132,
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
                        lineNumber: 1202,
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
                        lineNumber: 1211,
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
                        lineNumber: 1220,
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
                        lineNumber: 1229,
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
                        lineNumber: 1238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>snapshotQuantumDiagnostics(),
                        className: "rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-900 hover:border-emerald-500",
                        children: "Snapshot Quantum Diagnostics"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onResetAbiConfiguration?.(),
                        className: "rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-900 hover:border-slate-500",
                        children: "Reset ABI Config"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1268,
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
                        lineNumber: 1276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1023,
                columnNumber: 7
            }, this),
            takeoverEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-900",
                children: "RAYAY Takeover is active. Graphics and feature visibility are being amplified."
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1298,
                columnNumber: 9
            }, this),
            autoTakeoverStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs text-indigo-900",
                children: autoTakeoverStatus
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1304,
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
                        lineNumber: 1310,
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
                        lineNumber: 1323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1309,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1334,
                columnNumber: 9
            }, this),
            response && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2 text-xs sm:text-sm text-[color:var(--brand-ink)]/85",
                        children: response.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1341,
                        columnNumber: 11
                    }, this),
                    response.agentkit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 rounded-xl border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                                children: "AgentKit Capabilities"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1347,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Package installed: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: response.agentkit.packageInstalled ? 'yes' : 'no'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1349,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1349,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Credentials configured: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: response.agentkit.credentialsConfigured ? 'yes' : 'no'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1350,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1350,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Network: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: response.agentkit.networkId || '--'
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1351,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1351,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Actions discovered: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: response.agentkit.actionCount ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1352,
                                                columnNumber: 40
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1352,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1348,
                                columnNumber: 15
                            }, this),
                            response.agentkit.cdpConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: "CDP Wiring"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1356,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Project ID: ",
                                            response.agentkit.cdpConfig.projectId || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1357,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Base App owner: ",
                                            response.agentkit.cdpConfig.baseAppOwner || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1358,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "API key kind: ",
                                            response.agentkit.cdpConfig.apiKeyIdKind
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1359,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "API key: ",
                                            response.agentkit.cdpConfig.apiKeyIdPreview || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1360,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Org from key: ",
                                            response.agentkit.cdpConfig.orgIdFromApiKeyId || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1361,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Key id from resource: ",
                                            response.agentkit.cdpConfig.apiKeyIdFromResourceName || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1362,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Secret format: ",
                                            response.agentkit.cdpConfig.secretFormat
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1363,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Server env only: ",
                                            response.agentkit.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1364,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1355,
                                columnNumber: 17
                            }, this),
                            response.agentkit.initError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Init error: ",
                                            response.agentkit.initError
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1369,
                                        columnNumber: 19
                                    }, this),
                                    response.agentkit.initErrorDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: [
                                            response.agentkit.initErrorDetails.name ? `${response.agentkit.initErrorDetails.name} ` : '',
                                            response.agentkit.initErrorDetails.code !== undefined ? `code=${response.agentkit.initErrorDetails.code} ` : '',
                                            response.agentkit.initErrorDetails.status !== undefined ? `status=${response.agentkit.initErrorDetails.status} ` : '',
                                            response.agentkit.initErrorDetails.type ? `type=${response.agentkit.initErrorDetails.type}` : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1368,
                                columnNumber: 17
                            }, this),
                            (response.agentkit.actionNames || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap gap-1",
                                children: (response.agentkit.actionNames || []).map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2 py-0.5 text-[11px] text-[color:var(--brand-ink)]/80",
                                        children: name
                                    }, name, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1383,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1381,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1346,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3",
                        children: response.integrityChecks.map((check)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-lg border px-3 py-2 text-xs ${check.status === 'pass' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : check.status === 'warn' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-rose-300 bg-rose-50 text-rose-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: check.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1407,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: check.detail
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1408,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, check.label, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1397,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1395,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                                        children: "UX Enhancements"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1415,
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
                                                lineNumber: 1418,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1416,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1414,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                                        children: "Agent Suggestions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1424,
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
                                                lineNumber: 1427,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1425,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1423,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1413,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            taskResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Task Result"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1437,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: taskResult.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1438,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-[color:var(--brand-ink)]/65",
                        children: [
                            "Task: ",
                            taskResult.task,
                            " | Exit: ",
                            taskResult.exitCode
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1439,
                        columnNumber: 11
                    }, this),
                    taskResult.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "mt-2 max-h-44 overflow-auto rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 p-2 text-[11px] text-[color:var(--brand-ink)]/80",
                        children: taskResult.output
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1443,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1436,
                columnNumber: 9
            }, this),
            preflight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "CDP Preflight"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1452,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Credentials present: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: preflight.credentialsPresent ? 'yes' : 'no'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1454,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1454,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Project reachable: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: preflight.projectReachable ? 'yes' : 'no'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1455,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1455,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Network: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: preflight.networkId
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1456,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1456,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Policy count: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: preflight.policyCount ?? 0
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1457,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1457,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1453,
                        columnNumber: 11
                    }, this),
                    preflight.cdpConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Resolved Config"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1461,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Project ID: ",
                                    preflight.cdpConfig.projectId || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1462,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Base App owner: ",
                                    preflight.cdpConfig.baseAppOwner || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1463,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "API key kind: ",
                                    preflight.cdpConfig.apiKeyIdKind
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1464,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "API key: ",
                                    preflight.cdpConfig.apiKeyIdPreview || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1465,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Org from key: ",
                                    preflight.cdpConfig.orgIdFromApiKeyId || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1466,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Key id from resource: ",
                                    preflight.cdpConfig.apiKeyIdFromResourceName || '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1467,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Secret format: ",
                                    preflight.cdpConfig.secretFormat
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1468,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Server env only: ",
                                    preflight.cdpConfig.usesServerEnvOnly ? 'yes' : 'no'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1469,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1460,
                        columnNumber: 13
                    }, this),
                    preflight.diagnostics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: preflight.diagnostics.message || 'Preflight diagnostic details available.'
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1474,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    preflight.diagnostics.name ? `${preflight.diagnostics.name} ` : '',
                                    preflight.diagnostics.statusCode !== undefined ? `status=${preflight.diagnostics.statusCode} ` : '',
                                    preflight.diagnostics.errorType ? `type=${preflight.diagnostics.errorType} ` : '',
                                    preflight.diagnostics.correlationId ? `corr=${preflight.diagnostics.correlationId}` : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1475,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1473,
                        columnNumber: 13
                    }, this),
                    (preflight.remediationHints || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Recommended Fixes"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1485,
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
                                        lineNumber: 1488,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1486,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1484,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1451,
                columnNumber: 9
            }, this),
            githubScout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "GitHub Usecase Scout"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1498,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            "Prompt: ",
                            githubScout.prompt
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1499,
                        columnNumber: 11
                    }, this),
                    (githubScout.enhancements || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Stack Enhancements"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1503,
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
                                        lineNumber: 1506,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1504,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1502,
                        columnNumber: 13
                    }, this),
                    (githubScout.repositories || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Top Repositories"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1514,
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
                                                lineNumber: 1518,
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
                                        lineNumber: 1517,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1515,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1513,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1497,
                columnNumber: 9
            }, this),
            envHealth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Environment Health"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1537,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: envHealth.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1538,
                        columnNumber: 11
                    }, this),
                    envHealth.diagnostics?.walletProofNonceStorage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/75",
                        children: [
                            "Wallet proof nonce storage: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: envHealth.diagnostics.walletProofNonceStorage
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1541,
                                columnNumber: 43
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1540,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2",
                        children: envHealth.checks.map((check)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-md border px-2 py-1 text-xs ${check.present ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : check.required ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: check.key
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1556,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            check.present ? 'present' : check.required ? 'missing (required)' : 'missing (optional)',
                                            " | ",
                                            check.source
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1557,
                                        columnNumber: 17
                                    }, this),
                                    check.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: check.note
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1560,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, check.key, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1546,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1544,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1536,
                columnNumber: 9
            }, this),
            dependencyHealth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Dependency Integrity"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1569,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: dependencyHealth.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1570,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-[color:var(--brand-ink)]/65",
                        children: [
                            "Last checked: ",
                            new Date(dependencyHealth.checkedAt).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1571,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-[color:var(--brand-ink)]/70",
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
                        lineNumber: 1572,
                        columnNumber: 11
                    }, this),
                    dependencyCheckIsStale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[11px] text-amber-900",
                        children: "Integrity snapshot is stale. Run Dependency Health now to refresh package risk status."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1578,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-1 sm:grid-cols-3",
                        children: dependencyHealth.checks.map((check)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-md border px-2 py-1 text-xs ${check.status === 'pass' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : check.status === 'warn' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-rose-300 bg-rose-50 text-rose-900'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: check.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1595,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: check.detail
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1596,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, check.label, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1585,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1583,
                        columnNumber: 11
                    }, this),
                    (dependencyHealth.featurePacks || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-2 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Splendid Feature Packs"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1603,
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: pack.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                        lineNumber: 1619,
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
                                                        lineNumber: 1620,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1618,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[11px] text-[color:var(--brand-ink)]/75",
                                                children: pack.objective
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1624,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[11px] text-[color:var(--brand-ink)]/70",
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
                                                lineNumber: 1625,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, pack.key, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1614,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1604,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1602,
                        columnNumber: 13
                    }, this),
                    (dependencyHealth.criticalUpdates || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Critical Package Updates"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1637,
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
                                        lineNumber: 1640,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1638,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1636,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs text-emerald-900",
                        children: "No critical package updates detected."
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1647,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1568,
                columnNumber: 9
            }, this),
            quantumDiagnostics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-emerald-900",
                        children: "Quantum Diagnostics Snapshot"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1656,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-emerald-900",
                        children: [
                            "Signal: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: quantumDiagnostics.signal
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1658,
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
                                lineNumber: 1659,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1657,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-emerald-900/90",
                        children: quantumDiagnostics.recommendation
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1661,
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
                                lineNumber: 1664,
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
                                lineNumber: 1665,
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
                                lineNumber: 1666,
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
                                lineNumber: 1667,
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
                                lineNumber: 1668,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1663,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-emerald-900/70",
                        children: [
                            "Captured: ",
                            new Date(quantumDiagnostics.capturedAt).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1671,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1655,
                columnNumber: 9
            }, this),
            strategyLab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-violet-300 bg-violet-50 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-violet-900",
                        children: "Strategy Lab"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1677,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-violet-900",
                        children: [
                            "Objective: ",
                            strategyLab.objective
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1678,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-violet-900/90",
                        children: strategyLab.recommendation
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1679,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-violet-900/80",
                        children: [
                            "Confidence ",
                            (strategyLab.confidence * 100).toFixed(1),
                            "% | Weak components: ",
                            strategyLab.diagnostics.weakComponents.join(', ') || 'none'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1680,
                        columnNumber: 11
                    }, this),
                    (strategyLab.actionPlan || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-violet-300 bg-white px-2 py-2 text-xs text-violet-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "One-Click Actions"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1686,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                                children: strategyLab.actionPlan.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-md border border-violet-300 bg-violet-50/50 px-2 py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold",
                                                children: action.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1690,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[11px] text-violet-900/85",
                                                children: action.reason
                                            }, void 0, false, {
                                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                                lineNumber: 1691,
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
                                                lineNumber: 1692,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, action.id, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1689,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1687,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1685,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: "Quick Wins"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1708,
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
                                                lineNumber: 1711,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1709,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1707,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: "Growth Bets"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1716,
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
                                                lineNumber: 1719,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1717,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1715,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-violet-300 bg-white px-2 py-1 text-xs text-violet-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: "Risk Guards"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1724,
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
                                                lineNumber: 1727,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1725,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1723,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1706,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1676,
                columnNumber: 9
            }, this),
            websiteEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Website Edit Plan"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1737,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: websiteEdit.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1738,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/70",
                        children: [
                            "Target: ",
                            websiteEdit.targetSite
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1739,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-2",
                        children: websiteEdit.edits.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: entry.area
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1744,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: entry.objective
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1745,
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
                                                lineNumber: 1748,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1746,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, entry.area, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1743,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1741,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1736,
                columnNumber: 9
            }, this),
            abiConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "ABI Config Sync"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1759,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: abiConfig.summary
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1760,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                        children: abiConfig.networks.map((network)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: [
                                            network.network.toUpperCase(),
                                            " (",
                                            network.chainId,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1765,
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
                                                lineNumber: 1768,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1766,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, network.network, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1764,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1762,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/75 px-2 py-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: "Tab Configuration"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1778,
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
                                        lineNumber: 1781,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1779,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1777,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1758,
                columnNumber: 9
            }, this),
            cloudDeploy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mb-3 rounded-lg border px-3 py-2 ${cloudDeploy.status === 'ready' || cloudDeploy.status === 'triggered' ? 'border-sky-300 bg-sky-50' : cloudDeploy.status === 'no-credentials' ? 'border-amber-300 bg-amber-50' : cloudDeploy.status === 'error' ? 'border-rose-300 bg-rose-50' : 'border-sky-200 bg-white'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wide text-sky-700/70",
                                children: [
                                    "Cloud Deploy — ",
                                    cloudDeploy.platform.toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1801,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${cloudDeploy.status === 'ready' || cloudDeploy.status === 'triggered' ? 'bg-sky-100 text-sky-800' : cloudDeploy.status === 'error' ? 'bg-rose-100 text-rose-800' : cloudDeploy.status === 'no-credentials' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`,
                                children: cloudDeploy.status
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1804,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1800,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: cloudDeploy.message
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1817,
                        columnNumber: 11
                    }, this),
                    cloudDeploy.deploymentUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: cloudDeploy.deploymentUrl,
                        className: "mt-1 inline-block text-xs font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900",
                        children: cloudDeploy.deploymentUrl
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1820,
                        columnNumber: 13
                    }, this),
                    cloudDeploy.buildLogsUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: cloudDeploy.buildLogsUrl,
                        className: "mt-1 ml-3 inline-block text-xs text-sky-600 underline underline-offset-2 hover:text-sky-800",
                        children: "View build logs →"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1829,
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
                                        lineNumber: 1841,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${d.state === 'READY' || d.state === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`,
                                        children: d.state
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1842,
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
                                        lineNumber: 1845,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, d.id, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1840,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1838,
                        columnNumber: 13
                    }, this),
                    cloudDeploy.guidance.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 rounded-md border border-sky-200 bg-white px-2 py-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-semibold uppercase text-sky-700/70",
                                children: "Next Steps"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1855,
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
                                        lineNumber: 1858,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1856,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1854,
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
                        lineNumber: 1865,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1791,
                columnNumber: 9
            }, this),
            qpandaTask && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mb-3 rounded-lg border px-3 py-2 ${qpandaTask.ok ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wide text-emerald-700/70",
                                children: "QPanda Task"
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1884,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${qpandaTask.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`,
                                children: qpandaTask.action
                            }, void 0, false, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1885,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1883,
                        columnNumber: 11
                    }, this),
                    qpandaTask.taskId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs font-semibold text-[color:var(--brand-ink)]/85",
                        children: [
                            "Task ID: ",
                            qpandaTask.taskId
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1893,
                        columnNumber: 13
                    }, this),
                    qpandaTask.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            "Status: ",
                            qpandaTask.status
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1897,
                        columnNumber: 13
                    }, this),
                    qpandaTask.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-rose-900",
                        children: qpandaTask.error
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1901,
                        columnNumber: 13
                    }, this),
                    qpandaTask.result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "mt-2 max-h-40 overflow-auto rounded-md border border-emerald-200 bg-white px-2 py-1 text-[11px] text-emerald-900",
                        children: JSON.stringify(qpandaTask.result, null, 2)
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1905,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1878,
                columnNumber: 9
            }, this),
            messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-[color:var(--brand-leaf)]/25 bg-[color:var(--brand-cream)]/65 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-[11px] uppercase tracking-wide text-[color:var(--brand-ink)]/55",
                        children: "Conversation"
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1914,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-48 space-y-2 overflow-auto",
                        children: messages.slice(-6).map((message, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-md px-2.5 py-2 text-xs ${message.role === 'assistant' ? 'border border-[color:var(--brand-leaf)]/30 bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]/85' : 'bg-[color:var(--brand-forest)]/10 text-[color:var(--brand-ink)]/85'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1 font-semibold capitalize",
                                        children: message.role
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1925,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: message.text
                                    }, void 0, false, {
                                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                        lineNumber: 1926,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `${message.role}-${message.at}-${idx}`, true, {
                                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                                lineNumber: 1917,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                        lineNumber: 1915,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shell/QuantumAgentKitPanel.tsx",
                lineNumber: 1913,
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-sm font-semibold text-[color:var(--brand-ink)] sm:text-base",
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

//# sourceMappingURL=components_41792c78._.js.map