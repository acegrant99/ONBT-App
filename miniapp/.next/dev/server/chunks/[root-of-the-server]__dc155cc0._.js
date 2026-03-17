module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/price/token/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
/**
 * /api/price/token — server-side proxy for ONBT live price data.
 *
 * Proxies DexScreener REST API to avoid CORS issues and rate-limiting
 * in the browser. Picks the highest-liquidity pair on the requested chain,
 * falling back to any available pair.
 *
 * GET /api/price/token?address=0x…&chainId=8453
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const dynamic = 'force-dynamic';
// DexScreener chain slugs
const CHAIN_SLUGS = {
    '8453': 'base',
    '42161': 'arbitrum'
};
async function GET(req) {
    const { searchParams } = req.nextUrl;
    const address = searchParams.get('address') ?? '';
    const chainId = searchParams.get('chainId') ?? '8453';
    // Security: validate address format before forwarding to upstream
    if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid token address'
        }, {
            status: 400
        });
    }
    if (!CHAIN_SLUGS[chainId]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unsupported chainId'
        }, {
            status: 400
        });
    }
    const chainSlug = CHAIN_SLUGS[chainId];
    try {
        const upstream = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'onbt-miniapp/1.0'
            },
            next: {
                revalidate: 30
            }
        });
        if (!upstream.ok) {
            console.warn(`[price/token] DexScreener returned ${upstream.status}`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Upstream price service unavailable'
            }, {
                status: 502
            });
        }
        const body = await upstream.json();
        const pairs = body.pairs ?? [];
        // Prefer matching chain, then highest-liquidity globally
        const chainPairs = pairs.filter((p)=>p.chainId === chainSlug);
        const pool = chainPairs.length > 0 ? chainPairs : pairs;
        const best = pool.length > 0 ? pool.reduce((a, b)=>(a.liquidity?.usd ?? 0) >= (b.liquidity?.usd ?? 0) ? a : b) : null;
        if (!best) {
            // Token not yet listed on DEX — return private sale price
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                priceUsd: '0.10',
                priceChange1h: 0,
                priceChange6h: 0,
                priceChange24h: 0,
                volume24h: 0,
                volume6h: 0,
                liquidity: 0,
                fdv: 0,
                marketCap: 0,
                pairAddress: '',
                dexId: '',
                chainSlug: chainSlug,
                source: 'private-sale'
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            priceUsd: best.priceUsd ?? '0',
            priceChange1h: best.priceChange?.h1 ?? 0,
            priceChange6h: best.priceChange?.h6 ?? 0,
            priceChange24h: best.priceChange?.h24 ?? 0,
            volume24h: best.volume?.h24 ?? 0,
            volume6h: best.volume?.h6 ?? 0,
            liquidity: best.liquidity?.usd ?? 0,
            fdv: best.fdv ?? 0,
            marketCap: best.marketCap ?? 0,
            pairAddress: best.pairAddress,
            dexId: best.dexId,
            chainSlug: best.chainId,
            source: 'dex'
        });
    } catch (err) {
        console.error('[price/token] fetch error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dc155cc0._.js.map