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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/agentkit/walletAccess.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildWalletProofMessage",
    ()=>buildWalletProofMessage,
    "capabilitiesForRole",
    ()=>capabilitiesForRole,
    "configuredPrivilegedWallets",
    ()=>configuredPrivilegedWallets,
    "configuredWalletLists",
    ()=>configuredWalletLists,
    "extractWalletProofHeaders",
    ()=>extractWalletProofHeaders,
    "isPrivilegedWalletRequest",
    ()=>isPrivilegedWalletRequest,
    "normalizeAddress",
    ()=>normalizeAddress,
    "resolveEffectiveRole",
    ()=>resolveEffectiveRole,
    "roleFromWallet",
    ()=>roleFromWallet,
    "splitAddressList",
    ()=>splitAddressList,
    "verifyPrivilegedWalletProof",
    ()=>verifyPrivilegedWalletProof,
    "walletProofNonceStorageMode",
    ()=>walletProofNonceStorageMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$verifyMessage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/signature/verifyMessage.js [app-route] (ecmascript)");
;
const WALLET_AUTH_MAX_AGE_MS = 5 * 60 * 1000;
const walletProofNonceCache = new Map();
function redisConfig() {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.REDIS_REST_TOKEN;
    return {
        url: url?.trim(),
        token: token?.trim()
    };
}
function walletProofNonceStorageMode() {
    const config = redisConfig();
    return config.url && config.token ? 'redis' : 'memory-fallback';
}
function walletProofNonceKey(input) {
    return [
        input.walletAddress,
        input.method.toUpperCase(),
        input.path,
        input.purpose,
        input.nonce
    ].join('|');
}
function normalizeAddress(value) {
    if (!value) return undefined;
    const out = value.trim().toLowerCase();
    if (!out.startsWith('0x') || out.length !== 42) return undefined;
    return out;
}
function splitAddressList(value) {
    if (!value) return [];
    return value.split(/[\s,;]+/).map((part)=>normalizeAddress(part)).filter((part)=>Boolean(part));
}
function configuredWalletLists() {
    const deployer = [
        ...splitAddressList(process.env.DEPLOYER_WALLET_ADDRESS),
        ...splitAddressList(process.env.DEPLOYER_WALLET_ADDRESSES),
        ...splitAddressList(("TURBOPACK compile-time value", "0x44497B9FF645A995b18967b34eFeFDe82AeC8144")),
        ...splitAddressList(process.env.NEXT_PUBLIC_DEPLOYER_WALLET_ADDRESSES),
        ...splitAddressList(process.env.ONBT_DEPLOYER_ADDRESS)
    ];
    const cdp = [
        ...splitAddressList(process.env.CDP_WALLET_ADDRESS),
        ...splitAddressList(process.env.CDP_WALLET_ADDRESSES),
        ...splitAddressList(process.env.NEXT_PUBLIC_CDP_WALLET_ADDRESS),
        ...splitAddressList(process.env.NEXT_PUBLIC_CDP_WALLET_ADDRESSES),
        ...splitAddressList(process.env.ONBT_CDP_WALLET_ADDRESS)
    ];
    return {
        deployer: Array.from(new Set(deployer)),
        cdp: Array.from(new Set(cdp))
    };
}
function configuredPrivilegedWallets() {
    const configured = configuredWalletLists();
    return Array.from(new Set([
        ...configured.deployer,
        ...configured.cdp
    ]));
}
function buildWalletProofMessage(input) {
    return [
        'RAYAY privileged action authorization',
        `Wallet: ${input.walletAddress}`,
        `Method: ${input.method.toUpperCase()}`,
        `Path: ${input.path}`,
        `Purpose: ${input.purpose}`,
        `Timestamp: ${input.timestamp}`,
        `Nonce: ${input.nonce}`
    ].join('\n');
}
function extractWalletProofHeaders(request) {
    return {
        address: request.headers.get('x-ai-wallet-address') || undefined,
        signature: request.headers.get('x-ai-wallet-signature') || undefined,
        timestamp: request.headers.get('x-ai-wallet-timestamp') || undefined,
        nonce: request.headers.get('x-ai-wallet-nonce') || undefined,
        purpose: request.headers.get('x-ai-wallet-purpose') || undefined
    };
}
function parseRequestPath(request) {
    try {
        return new URL(request.url).pathname;
    } catch  {
        return '/api/agentkit/unknown';
    }
}
function purgeExpiredWalletProofNonces(now) {
    for (const [key, expiresAt] of walletProofNonceCache.entries()){
        if (expiresAt <= now) {
            walletProofNonceCache.delete(key);
        }
    }
}
function consumeWalletProofNonce(input) {
    purgeExpiredWalletProofNonces(input.now);
    const nonceKey = walletProofNonceKey(input);
    if (walletProofNonceCache.has(nonceKey)) {
        return false;
    }
    walletProofNonceCache.set(nonceKey, input.now + WALLET_AUTH_MAX_AGE_MS);
    return true;
}
async function consumeWalletProofNonceDistributed(input) {
    const config = redisConfig();
    if (!config.url || !config.token) {
        return consumeWalletProofNonce(input);
    }
    const ttlSeconds = Math.max(1, Math.ceil(WALLET_AUTH_MAX_AGE_MS / 1000));
    const nonceKey = `onbt:wallet-proof:${walletProofNonceKey(input)}`;
    try {
        const response = await fetch(`${config.url}/set/${encodeURIComponent(nonceKey)}/1/EX/${ttlSeconds}/NX`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${config.token}`
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            return consumeWalletProofNonce(input);
        }
        const payload = await response.json().catch(()=>null);
        return payload?.result === 'OK';
    } catch  {
        return consumeWalletProofNonce(input);
    }
}
async function verifyPrivilegedWalletProof(request, expectedPurpose) {
    const privilegedWallets = configuredPrivilegedWallets();
    if (privilegedWallets.length === 0) {
        return {
            ok: true,
            reason: 'No privileged wallet list configured. Proof checks are bypassed for local compatibility.'
        };
    }
    const headers = extractWalletProofHeaders(request);
    const walletAddress = normalizeAddress(headers.address);
    if (!walletAddress) {
        return {
            ok: false,
            reason: 'Missing or invalid x-ai-wallet-address header.'
        };
    }
    if (!privilegedWallets.includes(walletAddress)) {
        return {
            ok: false,
            reason: 'Wallet is not in privileged CDP/Deployer allowlist.'
        };
    }
    const signature = headers.signature?.trim();
    const timestamp = headers.timestamp?.trim();
    const nonce = headers.nonce?.trim();
    const headerPurpose = headers.purpose?.trim();
    if (expectedPurpose && headerPurpose && headerPurpose !== expectedPurpose) {
        return {
            ok: false,
            reason: `Invalid wallet proof purpose. Expected ${expectedPurpose}.`
        };
    }
    const purpose = expectedPurpose || headerPurpose || 'agentkit-privileged-action';
    if (!signature || !timestamp || !nonce) {
        return {
            ok: false,
            reason: 'Missing privileged proof headers. Expected signature, timestamp, and nonce.'
        };
    }
    const timestampMs = Number(timestamp);
    if (!Number.isFinite(timestampMs)) {
        return {
            ok: false,
            reason: 'Invalid proof timestamp format.'
        };
    }
    const now = Date.now();
    if (Math.abs(now - timestampMs) > WALLET_AUTH_MAX_AGE_MS) {
        return {
            ok: false,
            reason: 'Wallet proof expired. Please sign a fresh authorization message.'
        };
    }
    const requestPath = parseRequestPath(request);
    const message = buildWalletProofMessage({
        walletAddress,
        method: request.method,
        path: requestPath,
        purpose,
        timestamp,
        nonce
    });
    const valid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$verifyMessage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyMessage"])({
        address: walletAddress,
        message,
        signature: signature
    }).catch(()=>false);
    if (!valid) {
        return {
            ok: false,
            reason: 'Invalid wallet signature for privileged request.'
        };
    }
    const nonceAccepted = await consumeWalletProofNonceDistributed({
        walletAddress,
        method: request.method,
        path: requestPath,
        purpose,
        nonce,
        now
    });
    if (!nonceAccepted) {
        return {
            ok: false,
            reason: 'Wallet proof nonce was already used. Please sign a new authorization message.'
        };
    }
    return {
        ok: true,
        walletAddress,
        reason: 'Privileged wallet signature verified.'
    };
}
function roleFromWallet(walletAddress) {
    const normalized = normalizeAddress(walletAddress);
    if (!normalized) return 'user';
    const configured = configuredWalletLists();
    if (configured.deployer.includes(normalized)) return 'deployer';
    if (configured.cdp.includes(normalized)) return 'cdp';
    return 'user';
}
function capabilitiesForRole(role) {
    if (role === 'deployer' || role === 'cdp') {
        return {
            advisor: true,
            githubScout: true,
            takeover: true,
            adminTasks: true,
            preflight: true,
            envHealth: true,
            websiteEditor: true,
            abiConfigurator: true,
            cloudDeploy: true,
            quantumTasks: true
        };
    }
    return {
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
    };
}
function resolveEffectiveRole(selectedWalletMode, detectedRole) {
    if (selectedWalletMode === 'auto') {
        return {
            effectiveRole: detectedRole,
            reason: `Auto mode mapped connected wallet to ${detectedRole} role.`
        };
    }
    if (selectedWalletMode === 'user') {
        return {
            effectiveRole: 'user',
            reason: 'User mode selected. AI is limited to user-safe capabilities.'
        };
    }
    if (detectedRole === selectedWalletMode) {
        return {
            effectiveRole: detectedRole,
            reason: `${selectedWalletMode.toUpperCase()} mode verified against connected wallet identity.`
        };
    }
    return {
        effectiveRole: 'user',
        reason: `${selectedWalletMode.toUpperCase()} mode requested but connected wallet is not authorized for that role. Falling back to user-safe mode.`
    };
}
async function isPrivilegedWalletRequest(request, expectedPurpose) {
    const result = await verifyPrivilegedWalletProof(request, expectedPurpose);
    return result.ok;
}
}),
"[project]/app/api/agentkit/access-profile/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agentkit$2f$walletAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agentkit/walletAccess.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    const body = await request.json().catch(()=>({}));
    const selectedWalletMode = body.selectedWalletMode === 'cdp' || body.selectedWalletMode === 'deployer' || body.selectedWalletMode === 'user' ? body.selectedWalletMode : 'auto';
    const connectedWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agentkit$2f$walletAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAddress"])(body.walletAddress);
    const detectedRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agentkit$2f$walletAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roleFromWallet"])(connectedWallet);
    const { effectiveRole, reason } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agentkit$2f$walletAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEffectiveRole"])(selectedWalletMode, detectedRole);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        mode: 'access-profile',
        connectedWallet,
        selectedWalletMode,
        effectiveRole,
        reason,
        capabilities: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agentkit$2f$walletAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capabilitiesForRole"])(effectiveRole),
        checkedAt: new Date().toISOString()
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__af05450e._.js.map