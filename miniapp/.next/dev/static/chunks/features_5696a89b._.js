(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/features/token/ui/TokenInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenInterface",
    ()=>TokenInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$transferSchema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/transferSchema.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/charts/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$PriceChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/charts/PriceChart.tsx [app-client] (ecmascript)");
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
;
;
;
function TokenInterface({ quantumSignal = 'caution', quantumConfidence }) {
    _s();
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [hasHydrated, setHasHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transferTo, setTransferTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [transferAmount, setTransferAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('transfer');
    // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(8453);
    const [reviewArmedKey, setReviewArmedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [allowanceSnapshotTime, setAllowanceSnapshotTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('--');
    const isArbitrum = selectedChainId === 42161;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const effectiveAddress = hasHydrated ? address : undefined;
    const effectiveWalletOnSelectedChain = hasHydrated ? isWalletOnSelectedChain : false;
    const activeTokenAddress = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.tokenAddress : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.tokenAddress;
    const explorerBase = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.blockExplorer : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.blockExplorer;
    const chainName = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.name : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.name;
    const cautionMode = quantumSignal === 'caution';
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    const selectedStakingAddress = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"];
    const selectedStakingRouterAddress = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ROUTER_BASE_ADDRESS"];
    // Read user's balance
    const { data: balance, refetch: refetchBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'balanceOf',
        args: effectiveAddress ? [
            effectiveAddress
        ] : undefined,
        query: {
            refetchInterval: 15_000
        }
    });
    // Read total supply
    const { data: totalSupply } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'totalSupply',
        query: {
            refetchInterval: 60_000
        }
    });
    const { data: stakingAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'allowance',
        args: effectiveAddress ? [
            effectiveAddress,
            selectedStakingAddress
        ] : undefined,
        query: {
            refetchInterval: 30_000
        }
    });
    const { data: stakingRouterAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'allowance',
        args: effectiveAddress ? [
            effectiveAddress,
            selectedStakingRouterAddress
        ] : undefined,
        query: {
            refetchInterval: 30_000
        }
    });
    // Write functions
    const { data: txHash, writeContract: transfer, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TokenInterface.useEffect": ()=>{
            // Hydration marker for wallet/address-dependent UI logic.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasHydrated(true);
        }
    }["TokenInterface.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TokenInterface.useEffect": ()=>{
            if (!hasHydrated) return;
            const updateSnapshotTime = {
                "TokenInterface.useEffect.updateSnapshotTime": ()=>{
                    setAllowanceSnapshotTime(new Date().toLocaleTimeString());
                }
            }["TokenInterface.useEffect.updateSnapshotTime"];
            updateSnapshotTime();
            const interval = window.setInterval(updateSnapshotTime, 30_000);
            return ({
                "TokenInterface.useEffect": ()=>window.clearInterval(interval)
            })["TokenInterface.useEffect"];
        }
    }["TokenInterface.useEffect"], [
        hasHydrated
    ]);
    // Wait for transaction
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    const knownRecipients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TokenInterface.useMemo[knownRecipients]": ()=>{
            if (!effectiveAddress || ("TURBOPACK compile-time value", "object") === 'undefined') return [];
            const storageKey = `onbt_known_recipients_${effectiveAddress.toLowerCase()}`;
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) return [];
            try {
                const parsed = JSON.parse(raw);
                return Array.isArray(parsed) ? parsed : [];
            } catch  {
                return [];
            }
        }
    }["TokenInterface.useMemo[knownRecipients]"], [
        effectiveAddress,
        txHash,
        isConfirmed
    ]);
    const normalizedRecipient = transferTo.trim();
    const isRecipientValid = normalizedRecipient ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(normalizedRecipient) : false;
    const isSelfTransfer = Boolean(effectiveAddress && isRecipientValid && effectiveAddress.toLowerCase() === normalizedRecipient.toLowerCase());
    const reviewContextKey = `${selectedChainId}:${normalizedRecipient.toLowerCase()}:${transferAmount}`;
    const reviewArmed = reviewArmedKey === reviewContextKey;
    const numericTransferAmount = Number(transferAmount);
    const hasValidAmount = Number.isFinite(numericTransferAmount) && numericTransferAmount > 0;
    const availableBalance = Number(balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(balance) : '0');
    const hasSufficientBalance = hasValidAmount && numericTransferAmount <= availableBalance;
    const suggestedTestAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TokenInterface.useMemo[suggestedTestAmount]": ()=>{
            if (!Number.isFinite(availableBalance) || availableBalance <= 0) return '0.1';
            const candidate = Math.min(Math.max(availableBalance * 0.02, 0.1), 10);
            return candidate.toFixed(2);
        }
    }["TokenInterface.useMemo[suggestedTestAmount]"], [
        availableBalance
    ]);
    const isKnownRecipient = isRecipientValid && knownRecipients.includes(normalizedRecipient.toLowerCase());
    const requiresTwoStepReview = Boolean(isRecipientValid && !isSelfTransfer && (!isKnownRecipient || cautionMode));
    const isHighRiskTransfer = requiresTwoStepReview || cautionMode;
    const identityConfidence = !effectiveAddress ? 'disconnected' : !effectiveWalletOnSelectedChain ? 'medium' : isHighRiskTransfer ? 'medium' : 'high';
    const handleTransfer = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        // Zod schema validation — covers recipient + amount formatting
        const zodError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$transferSchema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateTransfer"])(normalizedRecipient, transferAmount);
        if (zodError) {
            setValidationError(zodError);
            return;
        }
        if (!effectiveWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        if (isSelfTransfer) {
            setValidationError('Recipient is your connected wallet. Use a different destination address.');
            return;
        }
        if (!hasSufficientBalance) {
            setValidationError('Amount exceeds your available ONBT balance on this chain.');
            return;
        }
        if (requiresTwoStepReview && !reviewArmed) {
            setReviewArmedKey(reviewContextKey);
            return;
        }
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Token transfer',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: activeTokenAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
                functionName: 'transfer',
                args: [
                    normalizedRecipient,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(transferAmount)
                ]
            }
        });
        if (!preflight.ok) {
            setValidationError(preflight.copy);
            setPreflightDetail({
                decodedReason: preflight.decodedReason,
                rawError: preflight.rawError
            });
            return;
        }
        setReviewArmedKey(null);
        try {
            transfer({
                address: activeTokenAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
                functionName: 'transfer',
                args: [
                    normalizedRecipient,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(transferAmount)
                ]
            });
        } catch (err) {
            console.error('Transfer error:', err);
            setValidationError(err instanceof Error ? err.message : 'Failed to submit transfer.');
        }
    };
    // Refetch balance after successful transaction
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TokenInterface.useEffect": ()=>{
            if (isConfirmed) {
                refetchBalance();
                if (effectiveAddress && isRecipientValid && !isSelfTransfer) {
                    const storageKey = `onbt_known_recipients_${effectiveAddress.toLowerCase()}`;
                    const normalized = normalizedRecipient.toLowerCase();
                    const next = knownRecipients.includes(normalized) ? knownRecipients : [
                        ...knownRecipients,
                        normalized
                    ].slice(-24);
                    window.localStorage.setItem(storageKey, JSON.stringify(next));
                }
            }
        }
    }["TokenInterface.useEffect"], [
        isConfirmed,
        refetchBalance,
        effectiveAddress,
        isRecipientValid,
        isSelfTransfer,
        normalizedRecipient,
        knownRecipients
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TokenInterface.useEffect": ()=>{
            if (error) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'token',
                    stage: 'error',
                    errorMessage: error.message,
                    txHash,
                    explorerBaseUrl: explorerBase
                });
                return;
            }
            if (isPending) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'token',
                    stage: 'pending',
                    txHash,
                    explorerBaseUrl: explorerBase
                });
                return;
            }
            if (isConfirming && txHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'token',
                    stage: 'confirming',
                    txHash,
                    explorerBaseUrl: explorerBase
                });
                return;
            }
            if (isConfirmed && txHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'token',
                    stage: 'success',
                    txHash,
                    explorerBaseUrl: explorerBase
                });
            }
        }
    }["TokenInterface.useEffect"], [
        error,
        isPending,
        isConfirming,
        isConfirmed,
        txHash,
        explorerBase
    ]);
    const userBalance = balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(balance) : '0';
    const supply = totalSupply ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(totalSupply) : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_INFO"].totalSupply;
    const formattedStakingAllowance = stakingAllowance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(stakingAllowance) : '0';
    const formattedStakingRouterAllowance = stakingRouterAllowance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(stakingRouterAllowance) : '0';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-token module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    hasHydrated && !effectiveWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>switchChain({
                                chainId: selectedChainId
                            }),
                        className: "rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100",
                        children: [
                            "Switch to ",
                            chainName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    effectiveAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: effectiveAddress,
                        className: "ml-auto"
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 320,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card mb-6 rounded-2xl p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900",
                            children: [
                                parseFloat(userBalance).toFixed(4),
                                " ONBT"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900",
                            children: [
                                "Supply ",
                                parseFloat(supply).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900",
                            children: chainName
                        }, void 0, false, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/token/ui/TokenInterface.tsx",
                    lineNumber: 326,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1",
                children: [
                    'transfer',
                    'info'
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab),
                        className: `flex-1 rounded-xl px-4 py-2 font-medium capitalize transition-all ${activeTab === tab ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(2,132,199,0.28)]' : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-leaf)]'}`,
                        children: tab
                    }, tab, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            activeTab === 'transfer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    cautionMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900",
                        children: [
                            "⚠ Caution",
                            typeof quantumConfidence === 'number' ? ` · ${(quantumConfidence * 100).toFixed(0)}% confidence` : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 360,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Recipient Address"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: transferTo,
                                onChange: (e)=>{
                                    setTransferTo(e.target.value);
                                    setValidationError(null);
                                },
                                placeholder: "0x...",
                                className: "brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, this),
                            normalizedRecipient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex flex-wrap gap-1.5",
                                children: [
                                    !isRecipientValid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-rose-300 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700",
                                        children: "Invalid address"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 380,
                                        columnNumber: 39
                                    }, this),
                                    isRecipientValid && isSelfTransfer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700",
                                        children: "Self-transfer"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 381,
                                        columnNumber: 56
                                    }, this),
                                    isRecipientValid && !isSelfTransfer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700",
                                        children: [
                                            "✓ ",
                                            normalizedRecipient.slice(0, 6),
                                            "…",
                                            normalizedRecipient.slice(-4)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 382,
                                        columnNumber: 57
                                    }, this),
                                    isRecipientValid && !isSelfTransfer && !isKnownRecipient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700",
                                        children: "New recipient"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 383,
                                        columnNumber: 78
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 379,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: transferAmount,
                                onChange: (e)=>{
                                    setTransferAmount(e.target.value);
                                    setValidationError(null);
                                },
                                placeholder: "0.0",
                                className: "brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            parseFloat(userBalance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 403,
                                        columnNumber: 15
                                    }, this),
                                    [
                                        0.25,
                                        0.5,
                                        0.75,
                                        1
                                    ].map((pct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTransferAmount((availableBalance * pct).toFixed(4)),
                                            className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-forest)] hover:bg-[color:var(--brand-leaf)]/10",
                                            children: pct === 1 ? 'Max' : `${pct * 100}%`
                                        }, pct, false, {
                                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                            lineNumber: 405,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this),
                            !hasSufficientBalance && transferAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Amount exceeds available balance on ",
                                    chainName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 411,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl px-3 py-2 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                    children: "Allowances"
                                }, void 0, false, {
                                    fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                    lineNumber: 417,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid gap-2 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85",
                                        children: [
                                            "Staking ",
                                            Number(formattedStakingAllowance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85",
                                        children: [
                                            "Router ",
                                            Number(formattedStakingRouterAllowance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 419,
                                columnNumber: 13
                            }, this),
                            (Number(formattedStakingAllowance) > 100000 || Number(formattedStakingRouterAllowance) > 100000) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700",
                                children: "High approval snapshot detected. Reduce stale spender approvals before high-value transfers."
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 424,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                children: [
                                    "Snapshot ",
                                    allowanceSnapshotTime
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 426,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 415,
                        columnNumber: 11
                    }, this),
                    requiresTwoStepReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2 text-xs text-amber-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                        children: "Review"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 432,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                        children: "Confirm"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 433,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                        children: "Then Size Up"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 431,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                children: [
                                    "Suggested test ",
                                    suggestedTestAmount,
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 436,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setTransferAmount(suggestedTestAmount),
                                className: "brand-secondary-button mt-2 rounded-md px-2 py-1 text-xs font-medium",
                                children: "Use Suggested Test Amount"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 437,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 430,
                        columnNumber: 13
                    }, this),
                    reviewArmed && requiresTwoStepReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-orange-400/35 bg-orange-500/10 px-3 py-2 text-xs text-orange-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-orange-300/45 bg-orange-50 px-3 py-2 font-semibold text-orange-900",
                            children: [
                                "Ready ",
                                transferAmount || '0',
                                " ONBT to ",
                                isRecipientValid ? `${normalizedRecipient.slice(0, 6)}...${normalizedRecipient.slice(-4)}` : 'invalid',
                                " on ",
                                chainName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 449,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 448,
                        columnNumber: 13
                    }, this),
                    validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700",
                                children: validationError
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 457,
                                columnNumber: 15
                            }, this),
                            preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 font-semibold text-rose-700",
                                children: [
                                    "Decoded reason: ",
                                    preflightDetail.decodedReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 459,
                                columnNumber: 17
                            }, this),
                            preflightDetail?.rawError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-1 text-left text-[11px] font-semibold text-rose-700/90",
                                children: [
                                    "Raw: ",
                                    preflightDetail.rawError
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 462,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 456,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-button w-full text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50",
                        onClick: handleTransfer,
                        disabled: !normalizedRecipient || !hasValidAmount || isPending || isConfirming || !address,
                        children: isPending ? 'Confirming...' : isConfirming ? 'Processing...' : !effectiveWalletOnSelectedChain ? `Switch to ${chainName}` : requiresTwoStepReview ? reviewArmed ? 'Confirm Reviewed Transfer' : 'Review Transfer Safety' : 'Transfer ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 467,
                        columnNumber: 11
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${explorerBase}/tx/${txHash}`,
                        className: "inline-flex text-sm text-[color:var(--brand-forest)] hover:underline",
                        children: "View transaction on explorer"
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 487,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                            children: [
                                "Error: ",
                                error.message
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 497,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 496,
                        columnNumber: 13
                    }, this),
                    isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Transfer successful!"
                        }, void 0, false, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 503,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 502,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 358,
                columnNumber: 9
            }, this),
            activeTab === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card rounded-xl p-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$PriceChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceChart"], {
                        heightClass: "h-48",
                        className: "w-full"
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 513,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_INFO"].name
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 516,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_INFO"].symbol,
                                    " · ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_INFO"].decimals,
                                    "d"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 517,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_INFO"].website,
                                className: "rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-2 text-sm font-semibold text-[color:var(--brand-forest)]",
                                children: "Website ↗"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 518,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: `${explorerBase}/token/${activeTokenAddress}`,
                                className: "rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-2 text-sm font-semibold text-[color:var(--brand-forest)]",
                                children: "Explorer ↗"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 524,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 515,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${explorerBase}/address/${activeTokenAddress}`,
                        className: "mt-2 block rounded-2xl border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-2 font-mono text-xs text-[color:var(--brand-forest)]",
                        children: activeTokenAddress
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 531,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 511,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/token/ui/TokenInterface.tsx",
        lineNumber: 306,
        columnNumber: 5
    }, this);
}
_s(TokenInterface, "dBaf1LDEQ9R04FtR8WC4EQ60e2M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c = TokenInterface;
var _c;
__turbopack_context__.k.register(_c, "TokenInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/bridge/ui/BridgeInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BridgeInterface",
    ()=>BridgeInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-client] (ecmascript)");
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
;
// On-chain achievement metadata matching ONBTOmnichainStaking.Achievement enum (bits 0–7)
const ACHIEVEMENT_META = [
    {
        bit: 0,
        name: 'First Stake',
        icon: '🌱',
        desc: 'Made your first stake'
    },
    {
        bit: 1,
        name: 'Long-Term Holder',
        icon: '⏳',
        desc: 'Staked for 365 consecutive days'
    },
    {
        bit: 2,
        name: 'Whale',
        icon: '🐋',
        desc: 'Staked 100,000+ ONBT'
    },
    {
        bit: 3,
        name: 'Compound Master',
        icon: '🔄',
        desc: 'Compounded rewards 10+ times'
    },
    {
        bit: 4,
        name: 'Early Adopter',
        icon: '⭐',
        desc: 'One of the first 100 stakers'
    },
    {
        bit: 5,
        name: 'Loyal Staker',
        icon: '🛡️',
        desc: 'Never unstaked for 180 days'
    },
    {
        bit: 6,
        name: 'Governance Active',
        icon: '🗳️',
        desc: 'Delegated or received delegation'
    },
    {
        bit: 7,
        name: 'Rewards Pioneer',
        icon: '🏆',
        desc: 'Claimed rewards in the first week'
    }
];
function BridgeInterface() {
    _s();
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [bridgeAmount, setBridgeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [destinationChain, setDestinationChain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('arbitrum');
    // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
    const [selectedSourceChainId, setSelectedSourceChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(8453);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedSourceChainId
    });
    const [estimatedFee, setEstimatedFee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const processedTxHashRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeInterface.useEffect": ()=>{
            if (chain?.id === 8453 || chain?.id === 42161) {
                setSelectedSourceChainId(chain.id);
            }
        }
    }["BridgeInterface.useEffect"], [
        chain?.id
    ]);
    // Determine current chain and contract
    const isOnBase = selectedSourceChainId === 8453;
    const isWalletOnSelectedChain = chain?.id === selectedSourceChainId;
    const currentContractAddress = isOnBase ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.tokenAddress;
    const nftAddress = isOnBase ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_ACHIEVEMENT_NFT_BASE_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_ACHIEVEMENT_NFT_ARBITRUM_ADDRESS"];
    // Achievement bitmap from staking contract (hub = Base, chainId 8453)
    const { data: achievementBitmap } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: 8453,
        address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'achievementsBitmap',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 30_000
        }
    });
    // Achievement NFT balance on current chain
    const { data: nftBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedSourceChainId,
        address: nftAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_ACHIEVEMENT_NFT_ABI"],
        functionName: 'balanceOf',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 30_000
        }
    });
    const bitmap = achievementBitmap ?? 0n;
    const earnedCount = ACHIEVEMENT_META.filter((a)=>bitmap >> BigInt(a.bit) & 1n).length;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeInterface.useEffect": ()=>{
            setDestinationChain(isOnBase ? 'arbitrum' : 'base');
        }
    }["BridgeInterface.useEffect"], [
        isOnBase
    ]);
    // Read user's balance
    const { data: balance, refetch: refetchBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedSourceChainId,
        address: currentContractAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
        functionName: 'balanceOf',
        args: address ? [
            address
        ] : undefined,
        query: {
            refetchInterval: 15_000
        }
    });
    // Prepare send parameters for LayerZero
    const prepareSendParams = ()=>{
        if (!address || !bridgeAmount || parseFloat(bridgeAmount) <= 0) return null;
        const dstEid = destinationChain === 'arbitrum' ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].ARBITRUM : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].BASE;
        const amountLD = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(bridgeAmount);
        const minAmountLD = amountLD * 98n / 100n; // 2% slippage tolerance
        // Convert address to bytes32 for LayerZero
        const toBytes32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(address, {
            size: 32
        });
        return {
            dstEid,
            to: toBytes32,
            amountLD,
            minAmountLD,
            extraOptions: '0x',
            composeMsg: '0x',
            oftCmd: '0x'
        };
    };
    // Quote the fee for sending
    const sendParams = prepareSendParams();
    const { data: feeQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedSourceChainId,
        address: currentContractAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
        functionName: 'quoteSend',
        args: sendParams ? [
            sendParams,
            false
        ] : undefined,
        query: {
            refetchInterval: 30_000,
            enabled: !!sendParams,
            retry: false
        }
    });
    // Update estimated fee when quote changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeInterface.useEffect": ()=>{
            if (feeQuote && typeof feeQuote === 'object' && 'nativeFee' in feeQuote) {
                setEstimatedFee(feeQuote.nativeFee);
            }
        }
    }["BridgeInterface.useEffect"], [
        feeQuote
    ]);
    // Write contract for bridging
    const { data: txHash, writeContract: sendCrossChain, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    // Wait for transaction
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    const handleBridge = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        if (!sendParams || !feeQuote) {
            setValidationError('Unable to prepare bridge transaction.');
            return;
        }
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedSourceChainId
            });
            return;
        }
        const fee = feeQuote;
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Cross-chain bridge',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedSourceChainId,
            publicClient,
            checks: [
                {
                    ok: Boolean(sendParams),
                    reason: 'Unable to prepare LayerZero send parameters.'
                }
            ],
            request: {
                address: currentContractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
                functionName: 'send',
                args: [
                    sendParams,
                    fee,
                    address
                ],
                value: fee.nativeFee
            }
        });
        if (!preflight.ok) {
            setValidationError(preflight.copy);
            setPreflightDetail({
                decodedReason: preflight.decodedReason,
                rawError: preflight.rawError
            });
            return;
        }
        try {
            sendCrossChain({
                address: currentContractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
                functionName: 'send',
                args: [
                    sendParams,
                    fee,
                    address
                ],
                value: fee.nativeFee
            });
        } catch (err) {
            console.error('Bridge error:', err);
        }
    };
    // Refetch balance after successful transaction
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeInterface.useEffect": ()=>{
            if (!isConfirmed || !txHash) return;
            if (processedTxHashRef.current === txHash) return;
            processedTxHashRef.current = txHash;
            refetchBalance();
            setBridgeAmount('');
        }
    }["BridgeInterface.useEffect"], [
        isConfirmed,
        txHash,
        refetchBalance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeInterface.useEffect": ()=>{
            const explorerBaseUrl = selectedSourceChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
            if (error) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'bridge',
                    stage: 'error',
                    errorMessage: error.message,
                    txHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isPending) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'bridge',
                    stage: 'pending',
                    txHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isConfirming && txHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'bridge',
                    stage: 'confirming',
                    txHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isConfirmed && txHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'bridge',
                    stage: 'success',
                    txHash,
                    explorerBaseUrl
                });
            }
        }
    }["BridgeInterface.useEffect"], [
        error,
        isPending,
        isConfirming,
        isConfirmed,
        txHash,
        selectedSourceChainId
    ]);
    const userBalance = balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(balance) : '0';
    const currentChainName = isOnBase ? 'Base' : 'Arbitrum';
    const destinationChainName = destinationChain === 'arbitrum' ? 'Arbitrum' : 'Base';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-bridge module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Source chain",
                        selectedChainId: selectedSourceChainId,
                        onSelectChain: setSelectedSourceChainId
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card motion-card rounded-xl p-3 border border-[color:var(--brand-sun)]/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                        children: [
                                            "🏆 Staking Achievements ",
                                            address ? `${earnedCount}/8` : '—'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this),
                                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/60",
                                        children: nftBalance !== undefined ? `${nftBalance.toString()} NFT${Number(nftBalance) === 1 ? '' : 's'}` : '…'
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-1.5",
                                children: ACHIEVEMENT_META.map((a)=>{
                                    const earned = bitmap >> BigInt(a.bit) & 1n;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        title: `${a.name}: ${a.desc}`,
                                        className: `flex flex-col items-center rounded-lg p-2 border text-center ${earned ? 'bg-emerald-500/10 border-emerald-400/35' : 'bg-[color:var(--brand-cream)]/45 border-[color:var(--brand-leaf)]/15 opacity-45'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg",
                                                children: a.icon
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 295,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium leading-tight mt-0.5 text-[color:var(--brand-ink)]/70",
                                                children: a.name
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 296,
                                                columnNumber: 21
                                            }, this),
                                            earned ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] text-emerald-400 font-bold",
                                                children: "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 297,
                                                columnNumber: 31
                                            }, this) : null
                                        ]
                                    }, a.bit, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[color:var(--brand-ink)]/55 text-center py-1",
                                children: "Connect wallet to view achievements"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        className: "mt-4",
                        label: "Bridge wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-stat-card rounded-xl p-4 text-left text-xl font-semibold text-[color:var(--brand-leaf)]",
                        children: currentChainName
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-stat-card rounded-xl p-4 text-left text-xl font-semibold text-[color:var(--brand-ink)]",
                        children: [
                            parseFloat(userBalance).toFixed(4),
                            " ONBT"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900",
                    children: [
                        "Wallet chain differs from selected source chain. Click Bridge to switch wallet to ",
                        currentChainName,
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                    lineNumber: 320,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 319,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Bridge To"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDestinationChain('arbitrum'),
                                        disabled: !isOnBase,
                                        className: `p-4 rounded-lg border-2 transition-all ${destinationChain === 'arbitrum' && isOnBase ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]' : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 disabled:opacity-50 disabled:cursor-not-allowed'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium",
                                                children: "Arbitrum"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-1",
                                                children: [
                                                    "EID: ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].ARBITRUM
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 344,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 334,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDestinationChain('base'),
                                        disabled: isOnBase,
                                        className: `p-4 rounded-lg border-2 transition-all ${destinationChain === 'base' && !isOnBase ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]' : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 disabled:opacity-50 disabled:cursor-not-allowed'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium",
                                                children: "Base"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 355,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-1",
                                                children: [
                                                    "EID: ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].BASE
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 356,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount to Bridge"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: bridgeAmount,
                                onChange: (e)=>setBridgeAmount(e.target.value),
                                placeholder: "0.0",
                                className: "brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80 text-lg"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            parseFloat(userBalance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 374,
                                        columnNumber: 13
                                    }, this),
                                    [
                                        0.25,
                                        0.5,
                                        0.75,
                                        1
                                    ].map((pct)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setBridgeAmount((parseFloat(userBalance) * pct).toFixed(4)),
                                            className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-forest)] hover:bg-[color:var(--brand-leaf)]/10",
                                            children: pct === 1 ? 'Max' : `${pct * 100}%`
                                        }, pct, false, {
                                            fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this),
                    estimatedFee && bridgeAmount && parseFloat(bridgeAmount) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: "Bridge Fee"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(estimatedFee),
                                            " ETH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 386,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: "Receive"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-emerald-300/40 bg-emerald-50 px-3 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: [
                                            "~",
                                            bridgeAmount,
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100",
                        onClick: handleBridge,
                        disabled: !bridgeAmount || parseFloat(bridgeAmount) <= 0 || !estimatedFee || isPending || isConfirming,
                        children: isPending ? 'Confirming...' : isConfirming ? 'Bridging...' : !isWalletOnSelectedChain ? `Switch to ${currentChainName}` : `Bridge to ${destinationChainName}`
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `https://${selectedSourceChainId === 42161 ? 'arbiscan.io' : 'basescan.org'}/tx/${txHash}`,
                        className: "inline-flex text-sm text-[color:var(--brand-forest)] hover:underline",
                        children: "View transaction on explorer"
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                            children: [
                                "Error: ",
                                error.message
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                            lineNumber: 434,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 433,
                        columnNumber: 13
                    }, this),
                    validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                                children: validationError
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 440,
                                columnNumber: 13
                            }, this),
                            preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Decoded: ",
                                    preflightDetail.decodedReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 442,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this),
                    isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "mb-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-sm font-semibold text-emerald-700",
                                    children: "✓ Bridge transaction submitted!"
                                }, void 0, false, {
                                    fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                    lineNumber: 450,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700",
                                    children: [
                                        "Tokens will arrive on ",
                                        destinationChainName,
                                        " in a few minutes."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                            lineNumber: 449,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: "🔒 Powered by LayerZero V2"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "ONBT uses LayerZero's Omnichain Fungible Token (OFT) standard for secure cross-chain transfers. Your tokens are burned on the source chain and minted on the destination chain, maintaining a unified global supply."
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 468,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "🏆 Achievements are minted as on-chain NFTs by the ONBTAchievementNFT contract when staking milestones are reached."
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-sky-400/35 bg-sky-500/10 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800",
                                children: "Alternative Bridge"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 480,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 w-full rounded-2xl border border-sky-300/50 bg-sky-50 px-3 py-2 text-left text-xs font-semibold text-sky-800",
                                children: "Use Stargate or other LayerZero-compatible routes."
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 483,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: "https://stargate.finance/transfer",
                                className: "inline-flex items-center gap-1 rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800",
                                children: "Bridge via Stargate Finance →"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 486,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 479,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
_s(BridgeInterface, "EgUsZ5CVJCm0Wi3SSS/IIhc6yfY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c = BridgeInterface;
var _c;
__turbopack_context__.k.register(_c, "BridgeInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/staking/ui/StakingInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StakingInterface",
    ()=>StakingInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/charts/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$StakingYieldChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/charts/StakingYieldChart.tsx [app-client] (ecmascript)");
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
;
function StakingInterface() {
    _s();
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('stake');
    const [stakeAmount, setStakeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [unstakeAmount, setUnstakeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedLockup, setSelectedLockup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockupPeriod"].NONE);
    const [delegateAddress, setDelegateAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(chain?.id === 42161 ? 42161 : 8453);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isOnBase = selectedChainId === 8453;
    const isOnArbitrum = selectedChainId === 42161;
    const isSupportedChain = isOnBase || isOnArbitrum;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const stakingContract = isOnArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"];
    const tokenContract = isOnArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"];
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    // Both Base and Arbitrum staking contracts are deployed - writes enabled on both chains
    const canWriteStaking = isSupportedChain;
    // Check if staking contract is deployed
    const isStakingDeployed = stakingContract !== '0x0000000000000000000000000000000000000000';
    // Read user's ONBT balance
    const { data: tokenBalance, refetch: refetchBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: tokenContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'balanceOf',
        args: address ? [
            address
        ] : undefined,
        query: {
            refetchInterval: 15_000
        }
    });
    // On-chain achievements (hub = Base only)
    const { data: achievementBitmap } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: 8453,
        address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'achievementsBitmap',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address && isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // User's leaderboard rank
    const { data: leaderboardRank } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'getLeaderboardRank',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address && isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Top 10 stakers
    const { data: topStakers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: 8453,
        address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'getTopStakers',
        args: [
            10n
        ],
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 60_000
        }
    });
    // Read user's stake info
    const { data: stakeInfo, refetch: refetchStakeInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'getStakeInfo',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: isStakingDeployed && !!address,
            refetchInterval: 15_000
        }
    });
    // Read user's pending rewards
    const { data: pendingRewards, refetch: refetchRewards } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'earned',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: isStakingDeployed && !!address,
            refetchInterval: 15_000
        }
    });
    // Read total staked
    const { data: totalStaked } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'localTotalStaked',
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Read global total staked
    const { data: globalTotalStaked } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'globalTotalStaked',
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Minimum stake amount
    const { data: minStake } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'MIN_STAKE',
        query: {
            refetchInterval: 30_000,
            enabled: isStakingDeployed
        }
    });
    // Base reward rate (ONBT wei/sec distributed across all stakers)
    const { data: baseRewardRate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'baseRewardRate',
        query: {
            refetchInterval: 60_000,
            enabled: isStakingDeployed
        }
    });
    // Contract pause status
    const { data: contractPaused } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'paused',
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Hub detection
    const { data: isHubChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'isHub',
        query: {
            refetchInterval: 30_000,
            enabled: isStakingDeployed
        }
    });
    // LayerZero fee quotes — only needed on spoke chains (Arbitrum, isHub=false)
    const stakeAmountBigInt = stakeAmount && parseFloat(stakeAmount) > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount) : undefined;
    const unstakeAmountBigInt = unstakeAmount && parseFloat(unstakeAmount) > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(unstakeAmount) : undefined;
    const compoundAmountBigInt = pendingRewards ? pendingRewards : 1n;
    const isSpokeChain = isHubChain === false;
    const { data: stakeFeeQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'quoteStakeSyncFee',
        args: address && stakeAmountBigInt ? [
            address,
            stakeAmountBigInt,
            true
        ] : undefined,
        query: {
            enabled: isStakingDeployed && !!address && !!stakeAmountBigInt && isSpokeChain,
            refetchInterval: 30_000
        }
    });
    const { data: unstakeFeeQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'quoteStakeSyncFee',
        args: address && unstakeAmountBigInt ? [
            address,
            unstakeAmountBigInt,
            false
        ] : undefined,
        query: {
            enabled: isStakingDeployed && !!address && !!unstakeAmountBigInt && isSpokeChain,
            refetchInterval: 30_000
        }
    });
    const { data: compoundFeeQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'quoteStakeSyncFee',
        args: address ? [
            address,
            compoundAmountBigInt,
            true
        ] : undefined,
        query: {
            enabled: isStakingDeployed && !!address && isSpokeChain,
            refetchInterval: 30_000
        }
    });
    // Approval for staking
    const { data: allowance, refetch: refetchAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: tokenContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'allowance',
        args: address && stakingContract ? [
            address,
            stakingContract
        ] : undefined,
        query: {
            refetchInterval: 30_000
        }
    });
    // Write contracts
    const { data: approveTxHash, writeContract: approveToken, isPending: isApproving } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: stakeTxHash, writeContract: stakeTokens, isPending: isStaking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: unstakeTxHash, writeContract: unstakeTokens, isPending: isUnstaking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: claimTxHash, writeContract: claimRewards, isPending: isClaiming } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: compoundTxHash, writeContract: compoundRewards, isPending: isCompounding } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: delegateTxHash, writeContract: delegateVotes, isPending: isDelegating } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    // Wait for transactions
    const { isSuccess: isApproveSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: approveTxHash
    });
    const { isSuccess: isStakeSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: stakeTxHash
    });
    const { isSuccess: isUnstakeSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: unstakeTxHash
    });
    const { isSuccess: isClaimSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: claimTxHash
    });
    const { isSuccess: isCompoundSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: compoundTxHash
    });
    const { isSuccess: isDelegateSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: delegateTxHash
    });
    const activeTxHash = approveTxHash || stakeTxHash || unstakeTxHash || claimTxHash || compoundTxHash || delegateTxHash;
    const isTxPending = isApproving || isStaking || isUnstaking || isClaiming || isCompounding || isDelegating;
    const isTxSuccess = isApproveSuccess || isStakeSuccess || isUnstakeSuccess || isClaimSuccess || isCompoundSuccess || isDelegateSuccess;
    // Refetch on success
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StakingInterface.useEffect": ()=>{
            if (isApproveSuccess || isStakeSuccess || isUnstakeSuccess || isClaimSuccess || isCompoundSuccess) {
                refetchBalance();
                refetchStakeInfo();
                refetchRewards();
                refetchAllowance();
            }
        }
    }["StakingInterface.useEffect"], [
        isApproveSuccess,
        isStakeSuccess,
        isUnstakeSuccess,
        isClaimSuccess,
        isCompoundSuccess,
        refetchBalance,
        refetchStakeInfo,
        refetchRewards,
        refetchAllowance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StakingInterface.useEffect": ()=>{
            const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
            if (isTxPending) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'staking',
                    stage: 'pending',
                    txHash: activeTxHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isTxSuccess && activeTxHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'staking',
                    stage: 'success',
                    txHash: activeTxHash,
                    explorerBaseUrl
                });
            }
        }
    }["StakingInterface.useEffect"], [
        isTxPending,
        isTxSuccess,
        activeTxHash,
        selectedChainId
    ]);
    // Parse stake info
    const userStakeAmount = stakeInfo ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(stakeInfo[0]) : '0';
    const lockupEndTime = stakeInfo ? Number(stakeInfo[2]) : 0;
    const userLockup = stakeInfo ? Number(stakeInfo[3]) : 0;
    const userEarned = stakeInfo ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(stakeInfo[4]) : '0';
    const isLocked = stakeInfo ? stakeInfo[5] : false;
    const userBalance = tokenBalance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(tokenBalance) : '0';
    const userRewards = pendingRewards ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(pendingRewards) : '0';
    const chainTotalStaked = totalStaked ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(totalStaked) : '0';
    const globalStaked = globalTotalStaked ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(globalTotalStaked) : '0';
    const minStakeAmount = minStake ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(minStake) : '0';
    const isPaused = !!contractPaused;
    // Estimated base APR (no lockup bonus): rate * seconds_per_year / totalStaked
    const SECONDS_PER_YEAR = 31_557_600n;
    const estimatedApr = (()=>{
        if (!baseRewardRate || !totalStaked) return null;
        const rate = baseRewardRate;
        const staked = totalStaked;
        if (rate === 0n || staked === 0n) return null;
        // Compute as float: (rate_per_sec * seconds_per_year / staked) * 100
        const annualRewardWei = rate * SECONDS_PER_YEAR;
        const aprFloat = Number(annualRewardWei) / Number(staked) * 100;
        return Number.isFinite(aprFloat) ? aprFloat : null;
    })();
    // User's share of the chain staking pool
    const userPoolShare = (()=>{
        const userAmt = parseFloat(userStakeAmount);
        const poolAmt = parseFloat(chainTotalStaked);
        if (!Number.isFinite(userAmt) || !Number.isFinite(poolAmt) || poolAmt === 0) return null;
        return userAmt / poolAmt * 100;
    })();
    const runStakingPreflight = async (input)=>{
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: input.actionLabel,
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            checks: input.checks,
            request: {
                address: input.addressOverride || stakingContract,
                abi: input.abiOverride || __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: input.functionName,
                args: input.args,
                value: input.value
            }
        });
        if (!result.ok) {
            setValidationError(result.copy);
            setPreflightDetail({
                decodedReason: result.decodedReason,
                rawError: result.rawError
            });
            return false;
        }
        setValidationError(null);
        setPreflightDetail(null);
        return true;
    };
    // LZ fee readiness guards (only blocking on spoke chains)
    const stakeFeeReady = !isSpokeChain || !!stakeAmountBigInt === false || !!stakeFeeQuote?.nativeFee;
    const unstakeFeeReady = !isSpokeChain || !!unstakeAmountBigInt === false || !!unstakeFeeQuote?.nativeFee;
    const compoundFeeReady = !isSpokeChain || !!compoundFeeQuote?.nativeFee;
    // Check if needs approval
    const needsApproval = !allowance || allowance < (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount || '0');
    const belowMinStake = !!stakeAmount && parseFloat(stakeAmount) > 0 && minStake && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount) < minStake;
    // Handlers
    const handleApprove = async ()=>{
        if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount);
        const ok = await runStakingPreflight({
            actionLabel: 'Staking approval',
            functionName: 'approve',
            args: [
                stakingContract,
                amount
            ],
            addressOverride: tokenContract,
            abiOverride: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"]
        });
        if (!ok) return;
        approveToken({
            address: tokenContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
            functionName: 'approve',
            args: [
                stakingContract,
                amount
            ]
        });
    };
    const handleStake = async ()=>{
        if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount);
        if (isSpokeChain) {
            const lzFee = stakeFeeQuote?.nativeFee ?? 0n;
            const ok = await runStakingPreflight({
                actionLabel: 'Stake ONBT',
                functionName: 'stakeWithFee',
                args: [
                    amount,
                    selectedLockup
                ],
                value: lzFee,
                checks: [
                    {
                        ok: amount > 0n,
                        reason: 'Stake amount must be greater than zero.'
                    }
                ]
            });
            if (!ok) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stakeTokens({
                address: stakingContract,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: 'stakeWithFee',
                args: [
                    amount,
                    selectedLockup
                ],
                value: lzFee
            });
        } else {
            const ok = await runStakingPreflight({
                actionLabel: 'Stake ONBT',
                functionName: 'stake',
                args: [
                    amount,
                    selectedLockup
                ],
                checks: [
                    {
                        ok: amount > 0n,
                        reason: 'Stake amount must be greater than zero.'
                    }
                ]
            });
            if (!ok) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stakeTokens({
                address: stakingContract,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: 'stake',
                args: [
                    amount,
                    selectedLockup
                ]
            });
        }
    };
    const handleUnstake = async ()=>{
        if (!unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(unstakeAmount);
        if (isSpokeChain) {
            const lzFee = unstakeFeeQuote?.nativeFee ?? 0n;
            const ok = await runStakingPreflight({
                actionLabel: 'Unstake ONBT',
                functionName: 'unstakeWithFee',
                args: [
                    amount
                ],
                value: lzFee,
                checks: [
                    {
                        ok: amount > 0n,
                        reason: 'Unstake amount must be greater than zero.'
                    }
                ]
            });
            if (!ok) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            unstakeTokens({
                address: stakingContract,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: 'unstakeWithFee',
                args: [
                    amount
                ],
                value: lzFee
            });
        } else {
            const ok = await runStakingPreflight({
                actionLabel: 'Unstake ONBT',
                functionName: 'unstake',
                args: [
                    amount
                ],
                checks: [
                    {
                        ok: amount > 0n,
                        reason: 'Unstake amount must be greater than zero.'
                    }
                ]
            });
            if (!ok) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            unstakeTokens({
                address: stakingContract,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: 'unstake',
                args: [
                    amount
                ]
            });
        }
    };
    const handleClaim = async ()=>{
        if (!canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const ok = await runStakingPreflight({
            actionLabel: 'Claim rewards',
            functionName: 'claimRewards'
        });
        if (!ok) return;
        claimRewards({
            address: stakingContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
            functionName: 'claimRewards'
        });
    };
    const handleCompound = async ()=>{
        if (!canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        if (isSpokeChain) {
            const lzFee = compoundFeeQuote?.nativeFee ?? 0n;
            const ok = await runStakingPreflight({
                actionLabel: 'Compound rewards',
                functionName: 'compoundWithFee',
                value: lzFee
            });
            if (!ok) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            compoundRewards({
                address: stakingContract,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: 'compoundWithFee',
                value: lzFee
            });
        } else {
            const ok = await runStakingPreflight({
                actionLabel: 'Compound rewards',
                functionName: 'compound'
            });
            if (!ok) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            compoundRewards({
                address: stakingContract,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
                functionName: 'compound'
            });
        }
    };
    const handleDelegate = async ()=>{
        if (!delegateAddress || !canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const normalizedDelegate = delegateAddress.trim();
        const ok = await runStakingPreflight({
            actionLabel: 'Delegate votes',
            functionName: 'delegate',
            args: [
                normalizedDelegate
            ],
            checks: [
                {
                    ok: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(normalizedDelegate),
                    reason: 'Delegate address is invalid.'
                }
            ]
        });
        if (!ok) return;
        delegateVotes({
            address: stakingContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
            functionName: 'delegate',
            args: [
                normalizedDelegate
            ]
        });
    };
    // If staking not deployed, show coming soon
    if (!isStakingDeployed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "brand-card module-shell module-shell-staking module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 border-b border-sky-900/15 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "kicker-label mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1",
                            children: "Yield Engine"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 535,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-left text-2xl font-semibold brand-display",
                            children: "ONBT Staking"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 536,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 534,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-tile motion-card p-8 text-center border border-[color:var(--brand-sun)]/40",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-4xl mb-4",
                            children: "🚧"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 539,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "mb-3 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-xl font-semibold text-[color:var(--brand-ink)]",
                            children: "Staking Contract Deploying Soon"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-[color:var(--brand-ink)]/70",
                            children: "Omnichain staking with LayerZero V2 is ready for deployment. Check back soon!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 543,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 538,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
            lineNumber: 533,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-staking module-grid-bg scanline-panel max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Use case chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        label: "Staking wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this),
            !isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900",
                    children: "Please connect to Base or Arbitrum to stake, unstake, claim, compound, or delegate."
                }, void 0, false, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 567,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 566,
                columnNumber: 9
            }, this),
            !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-sky-400/35 bg-sky-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-sky-300/45 bg-sky-50 px-3 py-2 text-left text-sm font-semibold text-sky-900",
                    children: [
                        "Wallet chain differs from selected chain. Submit an action to switch wallet to ",
                        isOnBase ? 'Base' : 'Arbitrum',
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 575,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 574,
                columnNumber: 9
            }, this),
            isPaused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                    children: "⛔ Staking contract is currently paused. Reads are live; writes are temporarily disabled."
                }, void 0, false, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 583,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 582,
                columnNumber: 9
            }, this),
            validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                        children: validationError
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 591,
                        columnNumber: 11
                    }, this),
                    preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                        children: [
                            "Decoded: ",
                            preflightDetail.decodedReason
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 593,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 590,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card rounded-xl px-3 py-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex flex-wrap gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1",
                            children: "Position Telemetry"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 601,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2 md:grid-cols-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Staked ",
                                    parseFloat(userStakeAmount).toFixed(2),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Rewards ",
                                    parseFloat(userRewards).toFixed(4),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 605,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Chain Total ",
                                    parseFloat(chainTotalStaked).toFixed(0),
                                    " ONBT ",
                                    isHubChain !== undefined ? isHubChain ? '· Hub' : '· Spoke' : '',
                                    userPoolShare !== null && userPoolShare > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 rounded-full border border-slate-900/10 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600",
                                        children: [
                                            userPoolShare < 0.01 ? '<0.01' : userPoolShare.toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 609,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 606,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `rounded-2xl border px-3 py-3 text-left font-semibold ${estimatedApr !== null && estimatedApr > 0 ? 'border-emerald-300/60 bg-emerald-50/80 text-emerald-900' : 'border-slate-900/10 bg-white/92 text-[color:var(--brand-ink)]/60'}`,
                                children: estimatedApr !== null && estimatedApr > 0 ? `Est. APR ${estimatedApr.toFixed(1)}%` : 'APR not set'
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 612,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: leaderboardRank !== undefined && address ? `Rank #${Number(leaderboardRank) > 0 ? Number(leaderboardRank) : '—'}` : 'Rank —'
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 603,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 599,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex flex-wrap gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1",
                children: [
                    'stake',
                    'manage',
                    'rewards',
                    'delegate'
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab),
                        className: `rounded-xl px-4 py-2 font-medium transition-all ${activeTab === tab ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(2,132,199,0.28)]' : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-leaf)]'}`,
                        children: tab.charAt(0).toUpperCase() + tab.slice(1)
                    }, tab, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 632,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this),
            activeTab === 'stake' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount to Stake"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 650,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: stakeAmount,
                                onChange: (e)=>setStakeAmount(e.target.value),
                                placeholder: "0.0",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 653,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            "Available ",
                                            parseFloat(userBalance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 661,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setStakeAmount(userBalance),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: "Max"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 662,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 660,
                                columnNumber: 13
                            }, this),
                            minStakeAmount !== '0' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                children: [
                                    "Minimum stake: ",
                                    parseFloat(minStakeAmount).toLocaleString(),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 670,
                                columnNumber: 15
                            }, this),
                            belowMinStake && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Amount is below minimum stake of ",
                                    parseFloat(minStakeAmount).toLocaleString(),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 675,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 649,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Select Lockup Period"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 682,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCKUP_INFO"].map((lockup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedLockup(lockup.period),
                                        className: `p-4 rounded-lg border-2 transition-all ${selectedLockup === lockup.period ? 'border-[color:var(--brand-leaf)] bg-[color:var(--brand-cream)] shadow-[0_12px_24px_rgba(16,185,129,0.16)]' : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 bg-[color:var(--brand-cream)]/55'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: lockup.label
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 696,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-[color:var(--brand-forest)] font-bold mt-1",
                                                children: [
                                                    lockup.bonus,
                                                    " Rewards"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 697,
                                                columnNumber: 19
                                            }, this),
                                            lockup.days > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-1",
                                                children: [
                                                    lockup.days,
                                                    " days"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 701,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, lockup.period, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 687,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 685,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, this),
                    needsApproval && stakeAmount && parseFloat(stakeAmount) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleApprove,
                        disabled: isApproving || !canWriteStaking || isPaused,
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                        children: isApproving ? 'Approving...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Approve ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 711,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleStake,
                        disabled: isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking || isPaused || !!belowMinStake || !stakeFeeReady,
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                        children: isStaking ? 'Staking...' : isPaused ? 'Paused' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : !stakeFeeReady ? 'Estimating fee...' : 'Stake ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 719,
                        columnNumber: 13
                    }, this),
                    isStakeSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Tokens staked successfully!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 738,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 737,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 648,
                columnNumber: 9
            }, this),
            activeTab === 'manage' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Your Stake Details"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 748,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Staked Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 751,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                                children: [
                                                    parseFloat(userStakeAmount).toFixed(4),
                                                    " ONBT"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 752,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 750,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Lockup"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 755,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCKUP_INFO"][userLockup]?.label || 'None'
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 754,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 759,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `rounded-full border px-2.5 py-1 font-semibold ${isLocked ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'}`,
                                                children: isLocked ? '🔒 Locked' : '✓ Unlocked'
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 760,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 758,
                                        columnNumber: 15
                                    }, this),
                                    lockupEndTime > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Unlocks"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 766,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                                children: new Date(lockupEndTime * 1000).toLocaleDateString()
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 767,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 749,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 747,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount to Unstake"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 776,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: unstakeAmount,
                                onChange: (e)=>setUnstakeAmount(e.target.value),
                                placeholder: "0.0",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 779,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            "Staked ",
                                            parseFloat(userStakeAmount).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 787,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setUnstakeAmount(userStakeAmount),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: "Max"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 788,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 786,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 775,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleUnstake,
                        disabled: isUnstaking || isLocked || !unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking || !unstakeFeeReady,
                        className: "w-full rounded-xl bg-rose-500 text-white font-medium py-4 transition-all hover:brightness-110 disabled:opacity-50",
                        children: isUnstaking ? 'Unstaking...' : isLocked ? 'Locked - Cannot Unstake' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : !unstakeFeeReady ? 'Estimating fee...' : 'Unstake ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 797,
                        columnNumber: 11
                    }, this),
                    isUnstakeSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Tokens unstaked successfully!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 815,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 814,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 746,
                columnNumber: 9
            }, this),
            activeTab === 'rewards' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Pending Rewards"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 825,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-4 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-4xl font-bold text-[color:var(--brand-forest)]",
                                children: [
                                    parseFloat(userRewards).toFixed(6),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 826,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                children: [
                                    "APY: 10% base + ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCKUP_INFO"][userLockup]?.bonus || '1x',
                                    " lockup multiplier"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 829,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 824,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$StakingYieldChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StakingYieldChart"], {}, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 835,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "On-Chain Achievements"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 839,
                                columnNumber: 13
                            }, this),
                            !address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[color:var(--brand-ink)]/60",
                                children: "Connect wallet to view your achievements."
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 841,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2 md:grid-cols-4",
                                children: [
                                    {
                                        name: 'First Stake',
                                        icon: '\uD83E\uDD47',
                                        rarity: 'Common'
                                    },
                                    {
                                        name: 'Diamond Hands',
                                        icon: '\uD83D\uDC8E',
                                        rarity: 'Rare'
                                    },
                                    {
                                        name: 'Whale Staker',
                                        icon: '\uD83D\uDC0B',
                                        rarity: 'Rare'
                                    },
                                    {
                                        name: 'Early Adopter',
                                        icon: '\u26A1',
                                        rarity: 'Legendary'
                                    },
                                    {
                                        name: 'Compounding King',
                                        icon: '\uD83D\uDC51',
                                        rarity: 'Uncommon'
                                    },
                                    {
                                        name: 'Cross-Chain User',
                                        icon: '\uD83C\uDF10',
                                        rarity: 'Uncommon'
                                    },
                                    {
                                        name: 'Governance Participant',
                                        icon: '\uD83D\uDDF3\uFE0F',
                                        rarity: 'Uncommon'
                                    },
                                    {
                                        name: 'Leaderboard Top 10',
                                        icon: '\uD83C\uDFC6',
                                        rarity: 'Legendary'
                                    }
                                ].map((ach, i)=>{
                                    const bitmap = achievementBitmap !== undefined ? Number(achievementBitmap) : 0;
                                    const earned = bitmap >> i & 1;
                                    const rarityColor = ach.rarity === 'Legendary' ? 'border-amber-400/60 bg-amber-50' : ach.rarity === 'Rare' ? 'border-violet-300/60 bg-violet-50' : ach.rarity === 'Uncommon' ? 'border-sky-300/50 bg-sky-50' : 'border-slate-200 bg-white';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-xl border p-3 text-center transition-all ${earned ? rarityColor : 'border-slate-200 bg-slate-50 opacity-40'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mb-1",
                                                children: ach.icon
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 870,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-semibold text-[color:var(--brand-ink)] leading-tight",
                                                children: ach.name
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 871,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `mt-1 text-[10px] font-semibold ${earned ? 'text-emerald-600' : 'text-slate-400'}`,
                                                children: earned ? '\u2713 Earned' : ach.rarity
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 872,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 864,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 843,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 838,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                        children: "Staker Leaderboard"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 885,
                                        columnNumber: 15
                                    }, this),
                                    leaderboardRank !== undefined && address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]",
                                        children: [
                                            "Your rank: #",
                                            Number(leaderboardRank) > 0 ? Number(leaderboardRank) : 'Unranked'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 887,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 884,
                                columnNumber: 13
                            }, this),
                            topStakers && topStakers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: topStakers.map((addr, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center justify-between rounded-lg px-3 py-2 text-sm ${addr.toLowerCase() === address?.toLowerCase() ? 'border border-[color:var(--brand-leaf)]/40 bg-[color:var(--brand-cream)]/60 font-semibold' : 'bg-white/60'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[color:var(--brand-ink)]/50 w-6 text-center",
                                                children: [
                                                    "#",
                                                    idx + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 900,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex-1 ml-3 font-mono text-xs text-[color:var(--brand-ink)]",
                                                children: [
                                                    addr.slice(0, 6),
                                                    "…",
                                                    addr.slice(-4),
                                                    addr.toLowerCase() === address?.toLowerCase() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 rounded-full border border-emerald-300 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700",
                                                        children: "You"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 901,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, addr, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 895,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 893,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[color:var(--brand-ink)]/60",
                                children: "No stakers ranked yet."
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 911,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 883,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClaim,
                                disabled: isClaiming || parseFloat(userRewards) <= 0 || !canWriteStaking,
                                className: "brand-button text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                                children: isClaiming ? 'Claiming...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Claim Rewards'
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 916,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCompound,
                                disabled: isCompounding || parseFloat(userRewards) <= 0 || !canWriteStaking || !compoundFeeReady,
                                className: "w-full rounded-xl bg-amber-500 text-slate-950 font-medium py-4 transition-all hover:brightness-110 disabled:opacity-50",
                                children: isCompounding ? 'Compounding...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : !compoundFeeReady ? 'Estimating fee...' : 'Compound'
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 923,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 915,
                        columnNumber: 11
                    }, this),
                    (isClaimSuccess || isCompoundSuccess) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: [
                                "✓ ",
                                isClaimSuccess ? 'Rewards claimed!' : 'Rewards compounded!'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 934,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 933,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 823,
                columnNumber: 9
            }, this),
            activeTab === 'delegate' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Delegate Address"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 947,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: delegateAddress,
                                onChange: (e)=>setDelegateAddress(e.target.value),
                                placeholder: "0x...",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 950,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 946,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDelegate,
                        disabled: isDelegating || !delegateAddress || !canWriteStaking,
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                        children: isDelegating ? 'Delegating...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Delegate Votes'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 959,
                        columnNumber: 11
                    }, this),
                    isDelegateSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Voting power delegated successfully!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 969,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 968,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 945,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-highlight-bar mt-6 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/10 bg-white/92 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                        children: "📊 Omnichain Stats"
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 977,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                        children: "This Chain"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 980,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ml-2 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                        children: [
                                            parseFloat(chainTotalStaked).toFixed(0),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 981,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 979,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                        children: "All Chains"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 984,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ml-2 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                        children: [
                                            parseFloat(globalStaked).toFixed(0),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 985,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 983,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 978,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 976,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
        lineNumber: 552,
        columnNumber: 5
    }, this);
}
_s(StakingInterface, "g3SLA7sNrH5gP6toQ05jqgU6sRg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c = StakingInterface;
var _c;
__turbopack_context__.k.register(_c, "StakingInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/governance/ui/GovernanceInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GovernanceInterface",
    ()=>GovernanceInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-client] (ecmascript)");
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
;
function GovernanceInterface() {
    _s();
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [proposalIdInput, setProposalIdInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [voteChoice, setVoteChoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(8453);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCreateProposal, setShowCreateProposal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [propTitle, setPropTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [propDesc, setPropDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [recentProposals, setRecentProposals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingProposals, setLoadingProposals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GovernanceInterface.useEffect": ()=>{
            if (chain?.id === 8453 || chain?.id === 42161) {
                setSelectedChainId(chain.id);
            }
        }
    }["GovernanceInterface.useEffect"], [
        chain?.id
    ]);
    const governorAddress = selectedChainId === 42161 ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_BASE_ADDRESS"];
    const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
    const parsedProposalId = proposalIdInput.trim() ? BigInt(proposalIdInput.trim()) : null;
    const { data: proposalState, refetch: refetchProposalState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'state',
        args: parsedProposalId !== null ? [
            parsedProposalId
        ] : undefined,
        query: {
            refetchInterval: 20_000,
            enabled: parsedProposalId !== null && isSupportedChain
        }
    });
    const { data: proposalDetails, refetch: refetchProposalVotes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'getProposal',
        args: parsedProposalId !== null ? [
            parsedProposalId
        ] : undefined,
        query: {
            refetchInterval: 20_000,
            enabled: parsedProposalId !== null && isSupportedChain
        }
    });
    const { data: receiptData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'getReceipt',
        args: parsedProposalId !== null && address ? [
            parsedProposalId,
            address
        ] : undefined,
        query: {
            refetchInterval: 20_000,
            enabled: parsedProposalId !== null && !!address && isSupportedChain
        }
    });
    const { data: proposalCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'proposalCount',
        query: {
            refetchInterval: 30_000,
            enabled: isSupportedChain
        }
    });
    const { data: proposalThreshold } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'proposalThreshold',
        query: {
            enabled: isSupportedChain
        }
    });
    const { data: votingPeriod } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'votingPeriod',
        query: {
            enabled: isSupportedChain
        }
    });
    const { data: quorumPercentage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'quorumPercentage',
        query: {
            enabled: isSupportedChain
        }
    });
    const { data: votingPower } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: 8453,
        address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'getVotingPower',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 30_000
        }
    });
    const { data: voteTxHash, error: voteError, isPending: isVoting, writeContract: writeVote, reset: resetVote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isVoteConfirming, isSuccess: isVoteConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: voteTxHash
    });
    const { data: proposalTxHash, error: proposalError, isPending: isPropSubmitting, writeContract: writePropose, reset: resetPropose } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isPropConfirming, isSuccess: isPropConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: proposalTxHash
    });
    const handleCastVote = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        if (!isSupportedChain || !address) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        if (parsedProposalId === null) {
            setValidationError('Enter a valid proposal ID.');
            return;
        }
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Governance vote',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: governorAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
                functionName: 'castVote',
                args: [
                    parsedProposalId,
                    voteChoice
                ]
            }
        });
        if (!preflight.ok) {
            setValidationError(preflight.copy);
            setPreflightDetail({
                decodedReason: preflight.decodedReason,
                rawError: preflight.rawError
            });
            return;
        }
        resetVote();
        writeVote({
            address: governorAddress,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
            functionName: 'castVote',
            args: [
                parsedProposalId,
                voteChoice
            ]
        });
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GovernanceInterface.useEffect": ()=>{
            if (isVoteConfirmed) {
                refetchProposalState();
                refetchProposalVotes();
            }
        }
    }["GovernanceInterface.useEffect"], [
        isVoteConfirmed,
        refetchProposalState,
        refetchProposalVotes
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GovernanceInterface.useEffect": ()=>{
            if (voteError) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'error',
                    errorMessage: voteError.message,
                    txHash: voteTxHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isVoting) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'pending',
                    txHash: voteTxHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isVoteConfirming && voteTxHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'confirming',
                    txHash: voteTxHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isVoteConfirmed && voteTxHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'success',
                    txHash: voteTxHash,
                    explorerBaseUrl
                });
            }
        }
    }["GovernanceInterface.useEffect"], [
        voteError,
        isVoting,
        isVoteConfirming,
        isVoteConfirmed,
        voteTxHash,
        explorerBaseUrl
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GovernanceInterface.useEffect": ()=>{
            if (proposalError) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'error',
                    errorMessage: proposalError.message,
                    txHash: proposalTxHash,
                    explorerBaseUrl
                });
            } else if (isPropSubmitting) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'pending',
                    txHash: proposalTxHash,
                    explorerBaseUrl
                });
            } else if (isPropConfirming && proposalTxHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'confirming',
                    txHash: proposalTxHash,
                    explorerBaseUrl
                });
            } else if (isPropConfirmed && proposalTxHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'governance',
                    stage: 'success',
                    txHash: proposalTxHash,
                    explorerBaseUrl
                });
            }
        }
    }["GovernanceInterface.useEffect"], [
        proposalError,
        isPropSubmitting,
        isPropConfirming,
        isPropConfirmed,
        proposalTxHash,
        explorerBaseUrl
    ]);
    // Trigger proposal loading whenever proposalCount changes or publicClient updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GovernanceInterface.useEffect": ()=>{
            if (proposalCount !== undefined && publicClient) {
                loadRecentProposals();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["GovernanceInterface.useEffect"], [
        proposalCount,
        publicClient
    ]);
    const loadRecentProposals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GovernanceInterface.useCallback[loadRecentProposals]": async ()=>{
            if (!publicClient || !proposalCount || !isSupportedChain) return;
            setLoadingProposals(true);
            try {
                const count = Number(proposalCount);
                if (count === 0) {
                    setRecentProposals([]);
                    setLoadingProposals(false);
                    return;
                }
                const ids = Array.from({
                    length: Math.min(count, 10)
                }, {
                    "GovernanceInterface.useCallback[loadRecentProposals].ids": (_, i)=>BigInt(count - i)
                }["GovernanceInterface.useCallback[loadRecentProposals].ids"]);
                const results = await Promise.all(ids.map({
                    "GovernanceInterface.useCallback[loadRecentProposals]": async (id)=>{
                        const [details, stateVal] = await Promise.all([
                            publicClient.readContract({
                                address: governorAddress,
                                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
                                functionName: 'getProposal',
                                args: [
                                    id
                                ]
                            }),
                            publicClient.readContract({
                                address: governorAddress,
                                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
                                functionName: 'state',
                                args: [
                                    id
                                ]
                            })
                        ]);
                        return {
                            id,
                            title: details[1],
                            description: details[2],
                            state: Number(stateVal),
                            forVotes: details[3],
                            againstVotes: details[4]
                        };
                    }
                }["GovernanceInterface.useCallback[loadRecentProposals]"]));
                setRecentProposals(results);
            } catch  {} finally{
                setLoadingProposals(false);
            }
        }
    }["GovernanceInterface.useCallback[loadRecentProposals]"], [
        publicClient,
        proposalCount,
        governorAddress,
        isSupportedChain
    ]);
    const handleCreateProposal = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        if (!address || !propTitle.trim() || !propDesc.trim()) {
            setValidationError('Title and description are required.');
            return;
        }
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Create proposal',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: governorAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
                functionName: 'propose',
                args: [
                    propTitle.trim(),
                    propDesc.trim(),
                    [],
                    [],
                    []
                ]
            }
        });
        if (!preflight.ok) {
            setValidationError(preflight.copy);
            setPreflightDetail({
                decodedReason: preflight.decodedReason,
                rawError: preflight.rawError
            });
            return;
        }
        resetPropose();
        writePropose({
            address: governorAddress,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
            functionName: 'propose',
            args: [
                propTitle.trim(),
                propDesc.trim(),
                [],
                [],
                []
            ]
        });
    };
    const proposalStateLabel = (()=>{
        if (proposalState === undefined) return '--';
        const stateNum = Number(proposalState);
        const map = {
            0: 'Pending',
            1: 'Active',
            2: 'Canceled',
            3: 'Defeated',
            4: 'Succeeded',
            5: 'Queued',
            6: 'Expired',
            7: 'Executed'
        };
        return map[stateNum] ?? `Unknown (${stateNum})`;
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-governance module-grid-bg scanline-panel max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Governance Rail"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "DAO Governance"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "Vote Live"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-rail mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-rail-dot"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Proposal Intel"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 358,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Vote Execution"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Use case chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        label: "Voting wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 349,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card mb-6 grid grid-cols-1 gap-3 rounded-xl px-3 py-3 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[color:var(--brand-ink)]/60 mb-0.5",
                                children: "Your Voting Power"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-[color:var(--brand-ink)]",
                                children: !address ? 'Connect wallet' : votingPower !== undefined ? `${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(votingPower)).toLocaleString(undefined, {
                                    maximumFractionDigits: 2
                                })} ONBT` : 'Loading...'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[color:var(--brand-ink)]/60 mb-0.5",
                                children: "Proposals On-Chain"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-[color:var(--brand-ink)]",
                                children: proposalCount !== undefined ? Number(proposalCount).toString() : '—'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[color:var(--brand-ink)]/60 mb-0.5",
                                children: "Network"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-[color:var(--brand-ink)]",
                                children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card mb-6 grid grid-cols-3 gap-3 rounded-xl px-3 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[color:var(--brand-ink)]/60 mb-0.5",
                                children: "Proposal Threshold"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-[color:var(--brand-ink)] text-sm",
                                children: proposalThreshold !== undefined ? `${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(proposalThreshold)).toLocaleString()} ONBT` : '—'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 399,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[color:var(--brand-ink)]/60 mb-0.5",
                                children: "Voting Period"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-[color:var(--brand-ink)] text-sm",
                                children: votingPeriod !== undefined ? `${Math.round(Number(votingPeriod) / 86400)} days` : '—'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[color:var(--brand-ink)]/60 mb-0.5",
                                children: "Quorum"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 410,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-[color:var(--brand-ink)] text-sm",
                                children: quorumPercentage !== undefined ? `${Number(quorumPercentage)}%` : '—'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card p-4 rounded-xl mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                        children: "Vote on Proposal"
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    !isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                        children: "Connect wallet to Base (8453) or Arbitrum (42161) to vote."
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 420,
                        columnNumber: 11
                    }, this),
                    isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-800",
                                children: "Wallet chain differs from selected chain. Click Cast Vote to switch wallet to the selected network."
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 425,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: proposalIdInput,
                                        onChange: (e)=>setProposalIdInput(e.target.value.replace(/[^0-9]/g, '')),
                                        placeholder: "Proposal ID",
                                        className: "px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        "aria-label": "Vote choice",
                                        value: voteChoice,
                                        onChange: (e)=>setVoteChoice(Number(e.target.value)),
                                        className: "px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 0,
                                                children: "Against"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 443,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 1,
                                                children: "For"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 444,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 2,
                                                children: "Abstain"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 437,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCastVote,
                                        disabled: !address || isVoting || isVoteConfirming || !proposalIdInput,
                                        className: "brand-button text-white font-medium px-4 py-3 rounded-lg disabled:opacity-60",
                                        children: isVoting || isVoteConfirming ? 'Submitting Vote...' : !isWalletOnSelectedChain ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}` : 'Cast Vote'
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 429,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-4 gap-3 mb-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "Proposal State"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 463,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: proposalStateLabel
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 462,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "For Votes"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 467,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: proposalDetails ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(proposalDetails[3])).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2
                                                }) : '--'
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 468,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 466,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "Against Votes"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: proposalDetails ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(proposalDetails[4])).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2
                                                }) : '--'
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 474,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "You Voted"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 479,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: receiptData?.[0] ? 'Yes' : 'No'
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 480,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this),
                            voteTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: `${explorerBaseUrl}/tx/${voteTxHash}`,
                                className: "inline-flex mt-2 text-sm text-[color:var(--brand-forest)] hover:underline",
                                children: "View vote transaction"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 485,
                                columnNumber: 15
                            }, this),
                            voteError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                                children: voteError.message
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 493,
                                columnNumber: 15
                            }, this),
                            validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 rounded-lg border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700",
                                        children: validationError
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 497,
                                        columnNumber: 17
                                    }, this),
                                    preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                                        children: [
                                            "Decoded reason: ",
                                            preflightDetail.decodedReason
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 499,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 496,
                                columnNumber: 15
                            }, this),
                            isVoteConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                                children: "Vote confirmed."
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 504,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card p-4 rounded-xl mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Recent Proposals"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 513,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: loadRecentProposals,
                                disabled: loadingProposals || !isSupportedChain,
                                className: "rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)] disabled:opacity-50",
                                children: loadingProposals ? 'Loading...' : 'Refresh'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 512,
                        columnNumber: 9
                    }, this),
                    recentProposals.length === 0 && !loadingProposals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[color:var(--brand-ink)]/60 py-2",
                        children: proposalCount !== undefined && Number(proposalCount) === 0 ? 'No proposals yet.' : 'Loading proposals…'
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 524,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: recentProposals.map((p)=>{
                            const stateMap = {
                                0: {
                                    label: 'Pending',
                                    cls: 'border-amber-300 bg-amber-50 text-amber-800'
                                },
                                1: {
                                    label: 'Active',
                                    cls: 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                },
                                2: {
                                    label: 'Canceled',
                                    cls: 'border-slate-300 bg-slate-50 text-slate-600'
                                },
                                3: {
                                    label: 'Defeated',
                                    cls: 'border-rose-300 bg-rose-50 text-rose-700'
                                },
                                4: {
                                    label: 'Succeeded',
                                    cls: 'border-sky-300 bg-sky-50 text-sky-800'
                                },
                                5: {
                                    label: 'Queued',
                                    cls: 'border-violet-300 bg-violet-50 text-violet-800'
                                },
                                6: {
                                    label: 'Expired',
                                    cls: 'border-slate-300 bg-slate-50 text-slate-500'
                                },
                                7: {
                                    label: 'Executed',
                                    cls: 'border-teal-300 bg-teal-50 text-teal-800'
                                }
                            };
                            const s = stateMap[p.state] ?? {
                                label: 'Unknown',
                                cls: 'border-slate-200 bg-slate-50 text-slate-500'
                            };
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-[color:var(--brand-leaf)]/20 bg-white/60 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-mono text-[color:var(--brand-ink)]/50",
                                                                children: [
                                                                    "#",
                                                                    p.id.toString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                                lineNumber: 544,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s.cls}`,
                                                                children: s.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                                lineNumber: 545,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-[color:var(--brand-ink)] text-sm truncate",
                                                        children: p.title || '(no title)'
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 21
                                                    }, this),
                                                    p.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[color:var(--brand-ink)]/60 mt-0.5 line-clamp-2",
                                                        children: p.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 39
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 542,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setProposalIdInput(p.id.toString()),
                                                className: "flex-shrink-0 rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]",
                                                children: "Vote"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 550,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 541,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex gap-4 text-xs text-[color:var(--brand-ink)]/60",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "For: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-emerald-700",
                                                        children: Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(p.forVotes)).toLocaleString(undefined, {
                                                            maximumFractionDigits: 0
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 557,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Against: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-rose-600",
                                                        children: Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(p.againstVotes)).toLocaleString(undefined, {
                                                            maximumFractionDigits: 0
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 34
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 558,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 556,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.id.toString(), true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 540,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 511,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card p-4 rounded-xl mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Create Proposal"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 569,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowCreateProposal((v)=>!v),
                                className: "rounded-full border border-[color:var(--brand-leaf)]/40 bg-white px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]",
                                children: showCreateProposal ? 'Collapse' : 'Expand'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this),
                    !showCreateProposal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[color:var(--brand-ink)]/60",
                        children: [
                            "Requires ",
                            proposalThreshold !== undefined ? `${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(proposalThreshold)).toLocaleString()} ONBT` : '10,000 ONBT',
                            " staked to propose."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 579,
                        columnNumber: 11
                    }, this),
                    showCreateProposal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: propTitle,
                                onChange: (e)=>setPropTitle(e.target.value),
                                placeholder: "Proposal title",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 585,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: propDesc,
                                onChange: (e)=>setPropDesc(e.target.value),
                                placeholder: "Description — explain the motivation, impact, and any relevant links.",
                                rows: 4,
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-sm resize-none"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 592,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 flex-wrap",
                                children: [
                                    'Signal Vote',
                                    'Parameter Change',
                                    'Treasury Action'
                                ].map((tpl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPropTitle(tpl + ': '),
                                        className: "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700",
                                        children: tpl
                                    }, tpl, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 601,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 599,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCreateProposal,
                                disabled: !address || !propTitle.trim() || !propDesc.trim() || isPropSubmitting || isPropConfirming,
                                className: "brand-button text-white font-medium px-4 py-3 rounded-lg disabled:opacity-60 w-full",
                                children: isPropSubmitting || isPropConfirming ? 'Submitting…' : 'Submit Proposal'
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 609,
                                columnNumber: 13
                            }, this),
                            proposalError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700 w-full",
                                children: proposalError.message
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 618,
                                columnNumber: 15
                            }, this),
                            isPropConfirmed && proposalTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                                        children: "Proposal submitted!"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 622,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                        href: `${explorerBaseUrl}/tx/${proposalTxHash}`,
                                        className: "text-sm text-[color:var(--brand-forest)] hover:underline",
                                        children: "View transaction"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 623,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 621,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 584,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
}
_s(GovernanceInterface, "Rl3e2hOgIC7gZho3J0UwRRD/w4o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c = GovernanceInterface;
var _c;
__turbopack_context__.k.register(_c, "GovernanceInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/privateSale/ui/PrivateSaleReport.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivateSaleReport",
    ()=>PrivateSaleReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrivateSaleEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/usePrivateSaleEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Well-known payment token addresses (both chains)
const KNOWN_TOKENS = {
    '0x0000000000000000000000000000000000000000': 'ETH',
    '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': 'USDC',
    '0xfde4c96c8593536e31f229ea8f37b2ada2699bb2': 'USDT',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8': 'USDC',
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831': 'USDC',
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': 'USDT'
};
function shortAddr(addr) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
function paymentLabel(addr) {
    return KNOWN_TOKENS[addr.toLowerCase()] ?? shortAddr(addr);
}
function PrivateSaleReport({ chainId, contractAddress, saleAllocation, totalSold }) {
    _s();
    const { events, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrivateSaleEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrivateSaleEvents"])(chainId, contractAddress, !!contractAddress);
    const explorerBase = chainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
    // Build cumulative chart data
    const chartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PrivateSaleReport.useMemo[chartData]": ()=>{
            let cumulative = 0;
            return events.map({
                "PrivateSaleReport.useMemo[chartData]": (ev, i)=>{
                    const purchased = Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(ev.onbtOut));
                    cumulative += purchased;
                    return {
                        index: i + 1,
                        label: `#${i + 1}`,
                        purchase: Number(purchased.toFixed(2)),
                        cumulative: Number(cumulative.toFixed(2))
                    };
                }
            }["PrivateSaleReport.useMemo[chartData]"]);
        }
    }["PrivateSaleReport.useMemo[chartData]"], [
        events
    ]);
    const allocationNum = saleAllocation ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(saleAllocation)) : 0;
    const soldNum = totalSold ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(totalSold)) : 0;
    const progressPct = allocationNum > 0 ? Math.min(100, soldNum / allocationNum * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 space-y-5 border-t border-sky-900/15 pt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                        children: "Onchain Report"
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-emerald-300/50 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900",
                        children: loading ? 'Loading…' : `${events.length} Purchase${events.length !== 1 ? 's' : ''} Onchain`
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700",
                        children: [
                            chainId === 8453 ? 'Base' : 'Arbitrum',
                            " · Last 100k blocks"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            allocationNum > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-tile p-4 rounded-lg space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs font-semibold text-[color:var(--brand-ink)]/70",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Sale Progress"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    progressPct.toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("progress", {
                        className: "w-full h-3 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[color:var(--brand-leaf)]/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-emerald-500 [&::-webkit-progress-value]:to-teal-400 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-emerald-500",
                        value: soldNum,
                        max: allocationNum
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    soldNum.toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    }),
                                    " ONBT sold"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    allocationNum.toLocaleString(undefined, {
                                        maximumFractionDigits: 0
                                    }),
                                    " ONBT allocation"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            chartData.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-tile p-4 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700",
                        children: "Cumulative ONBT Purchased"
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 190,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                            data: chartData,
                            margin: {
                                top: 4,
                                right: 8,
                                bottom: 0,
                                left: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                        id: "saleGradient",
                                        x1: "0",
                                        y1: "0",
                                        x2: "0",
                                        y2: "1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "5%",
                                                stopColor: "#059669",
                                                stopOpacity: 0.35
                                            }, void 0, false, {
                                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "95%",
                                                stopColor: "#059669",
                                                stopOpacity: 0.03
                                            }, void 0, false, {
                                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                                lineNumber: 113,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    stroke: "#e2e8f0"
                                }, void 0, false, {
                                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "label",
                                    tick: {
                                        fontSize: 10
                                    },
                                    tickLine: false,
                                    axisLine: false
                                }, void 0, false, {
                                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tick: {
                                        fontSize: 10
                                    },
                                    tickLine: false,
                                    axisLine: false,
                                    width: 58,
                                    tickFormatter: (v)=>v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                                }, void 0, false, {
                                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        fontSize: 11,
                                        borderRadius: 8,
                                        border: '1px solid #e2e8f0',
                                        background: '#ffffff'
                                    },
                                    formatter: (value)=>[
                                            typeof value === 'number' ? `${value.toLocaleString(undefined, {
                                                maximumFractionDigits: 2
                                            })} ONBT` : `${String(value ?? '')} ONBT`,
                                            'Cumulative'
                                        ]
                                }, void 0, false, {
                                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                    type: "monotone",
                                    dataKey: "cumulative",
                                    stroke: "#059669",
                                    strokeWidth: 2,
                                    fill: "url(#saleGradient)",
                                    dot: false,
                                    activeDot: {
                                        r: 4
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this),
            chartData.length === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-tile p-4 rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-full border border-emerald-300/50 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900",
                    children: "Chart appears with 2+ purchases"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                lineNumber: 165,
                columnNumber: 9
            }, this),
            events.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-tile rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-sky-900/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700",
                            children: "Purchase Log · newest first"
                        }, void 0, false, {
                            fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y divide-sky-900/8 max-h-72 overflow-y-auto",
                        children: [
                            ...events
                        ].reverse().map((ev, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 flex flex-wrap gap-x-4 gap-y-1 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-[color:var(--brand-forest)]",
                                        children: [
                                            "+",
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(ev.onbtOut)).toLocaleString(undefined, {
                                                maximumFractionDigits: 2
                                            }),
                                            ' ',
                                            "ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[color:var(--brand-ink)]/60",
                                        children: [
                                            "via ",
                                            paymentLabel(ev.paymentToken)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[color:var(--brand-ink)]/50",
                                        children: [
                                            "buyer ",
                                            shortAddr(ev.buyer)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this),
                                    ev.recipient.toLowerCase() !== ev.buyer.toLowerCase() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[color:var(--brand-ink)]/50",
                                        children: [
                                            "→ ",
                                            shortAddr(ev.recipient)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                        lineNumber: 199,
                                        columnNumber: 19
                                    }, this),
                                    ev.transactionHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                        href: `${explorerBase}/tx/${ev.transactionHash}`,
                                        className: "text-[color:var(--brand-forest)] hover:underline",
                                        children: "↗ explorer"
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                        lineNumber: 204,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, `${ev.transactionHash ?? 'nohash'}-${i}`, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                                lineNumber: 182,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                lineNumber: 174,
                columnNumber: 9
            }, this),
            !loading && events.length === 0 && contractAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-tile p-4 rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                    children: "No purchases found in recent 100k blocks"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/privateSale/ui/PrivateSaleReport.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(PrivateSaleReport, "9PRFga8/ueDZxIbvLuxuodHOf+M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrivateSaleEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrivateSaleEvents"]
    ];
});
_c = PrivateSaleReport;
var _c;
__turbopack_context__.k.register(_c, "PrivateSaleReport");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/privateSale/ui/PrivateSaleInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivateSaleInterface",
    ()=>PrivateSaleInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/ui/PrivateSaleReport.tsx [app-client] (ecmascript)");
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
;
;
const PAYMENT_CONFIG = {
    ETH: {
        symbol: 'ETH',
        defaultDecimals: 18
    },
    USDC: {
        symbol: 'USDC',
        defaultDecimals: 6
    },
    USDT: {
        symbol: 'USDT',
        defaultDecimals: 6
    }
};
function formatCountdown(msRemaining) {
    if (msRemaining <= 0) return '00:00:00';
    const totalSeconds = Math.floor(msRemaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    return [
        hours,
        minutes,
        seconds
    ].map((v)=>String(v).padStart(2, '0')).join(':');
}
function PrivateSaleInterface() {
    _s();
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(chain?.id === 42161 ? 42161 : 8453);
    const [paymentAsset, setPaymentAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ETH');
    const [payAmount, setPayAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [recipient, setRecipient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timeNow, setTimeNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    const [txMode, setTxMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('buy');
    const { data: txHash, error: writeError, isPending, writeContract, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PrivateSaleInterface.useEffect": ()=>{
            const t = setInterval({
                "PrivateSaleInterface.useEffect.t": ()=>setTimeNow(Date.now())
            }["PrivateSaleInterface.useEffect.t"], 1000);
            return ({
                "PrivateSaleInterface.useEffect": ()=>clearInterval(t)
            })["PrivateSaleInterface.useEffect"];
        }
    }["PrivateSaleInterface.useEffect"], []);
    const hasBaseSaleAddress = !!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIVATE_SALE_ADDRESSES"][8453];
    const hasArbitrumSaleAddress = !!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIVATE_SALE_ADDRESSES"][42161];
    const hasSaleContractsConfigured = hasBaseSaleAddress && hasArbitrumSaleAddress;
    const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const activeSaleAddress = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIVATE_SALE_ADDRESSES"][selectedChainId] || undefined;
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    const saleContractConfiguredForChain = !!activeSaleAddress;
    const paymentTokens = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIVATE_SALE_PAYMENT_TOKENS"][selectedChainId];
    const paymentTokenAddress = paymentAsset === 'ETH' ? undefined : paymentAsset === 'USDC' ? paymentTokens?.USDC : paymentTokens?.USDT;
    const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
    const explorerTxBaseUrl = `${explorerBaseUrl}/tx/`;
    const { data: saleStart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'saleStart',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const { data: saleEnd } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'saleEnd',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const { data: remainingTokens, refetch: refetchRemainingTokens } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'remainingTokens',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 15_000
        }
    });
    const { data: saleAllocation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'saleAllocation',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 60_000
        }
    });
    const { data: totalSold } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'totalSold',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 15_000
        }
    });
    const { data: saleContractPaused } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'paused',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const isPaused = !!saleContractPaused;
    const { data: purchased, refetch: refetchPurchased } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'purchased',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address && saleContractConfiguredForChain,
            refetchInterval: 15_000
        }
    });
    const isTokenPayment = paymentAsset !== 'ETH';
    const { data: tokenDecimals } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: paymentTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
        functionName: 'decimals',
        query: {
            refetchInterval: 30_000,
            enabled: isTokenPayment && !!paymentTokenAddress
        }
    });
    const decimals = Number(tokenDecimals ?? PAYMENT_CONFIG[paymentAsset].defaultDecimals);
    const amountIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PrivateSaleInterface.useMemo[amountIn]": ()=>{
            if (!payAmount || Number(payAmount) <= 0) return 0n;
            try {
                return paymentAsset === 'ETH' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(payAmount) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(payAmount, decimals);
            } catch  {
                return 0n;
            }
        }
    }["PrivateSaleInterface.useMemo[amountIn]"], [
        payAmount,
        paymentAsset,
        decimals
    ]);
    // quotePurchase is only valid for ERC-20 payment tokens — ETH uses buyWithETH, which has no quote.
    // Passing the zero address for ETH causes a contract revert → never enable for ETH.
    const { data: quoteOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'quotePurchase',
        args: isTokenPayment && paymentTokenAddress && amountIn > 0n ? [
            paymentTokenAddress,
            amountIn
        ] : undefined,
        query: {
            refetchInterval: 30_000,
            enabled: saleContractConfiguredForChain && amountIn > 0n && isTokenPayment && !!paymentTokenAddress,
            retry: false
        }
    });
    const { data: paymentBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: paymentTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
        functionName: 'balanceOf',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: isTokenPayment && !!address && !!paymentTokenAddress,
            refetchInterval: 15_000
        }
    });
    const { data: allowance, refetch: refetchAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: paymentTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
        functionName: 'allowance',
        args: address && paymentTokenAddress && activeSaleAddress ? [
            address,
            activeSaleAddress
        ] : undefined,
        query: {
            enabled: isTokenPayment && !!address && !!paymentTokenAddress && saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const recipientAddress = recipient || address || '';
    const recipientValid = !!recipientAddress && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(recipientAddress);
    const nowSec = BigInt(Math.floor(timeNow / 1000));
    const saleStartSec = BigInt(saleStart ?? 0);
    const saleEndSec = BigInt(saleEnd ?? 0);
    const saleNotStarted = saleStartSec > 0n && nowSec < saleStartSec;
    const saleEnded = saleEndSec > 0n && nowSec > saleEndSec;
    const saleActive = saleStartSec > 0n && saleEndSec > 0n && nowSec >= saleStartSec && nowSec <= saleEndSec;
    const startsIn = saleStartSec > nowSec ? Number((saleStartSec - nowSec) * 1000n) : 0;
    const endsIn = saleEndSec > nowSec ? Number((saleEndSec - nowSec) * 1000n) : 0;
    const needsApproval = isTokenPayment && amountIn > 0n && (allowance ?? 0n) < amountIn;
    const canSubmit = !!address && isSupportedChain && saleContractConfiguredForChain && saleActive && !isPaused && amountIn > 0n && recipientValid;
    const handleApprove = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        if (!paymentTokenAddress || amountIn <= 0n) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Private sale approval',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: paymentTokenAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
                functionName: 'approve',
                args: [
                    activeSaleAddress,
                    amountIn
                ]
            }
        });
        if (!preflight.ok) {
            setValidationError(preflight.copy);
            setPreflightDetail({
                decodedReason: preflight.decodedReason,
                rawError: preflight.rawError
            });
            return;
        }
        setTxMode('approve');
        reset();
        writeContract({
            address: paymentTokenAddress,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
            functionName: 'approve',
            args: [
                activeSaleAddress,
                amountIn
            ]
        });
    };
    const handleBuy = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        if (!canSubmit) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Private sale purchase',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: paymentAsset === 'ETH' ? {
                address: activeSaleAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
                functionName: 'buyWithETH',
                args: [
                    recipientAddress
                ],
                value: amountIn
            } : {
                address: activeSaleAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
                functionName: 'buyWithToken',
                args: [
                    paymentTokenAddress,
                    amountIn,
                    recipientAddress
                ]
            }
        });
        if (!preflight.ok) {
            setValidationError(preflight.copy);
            setPreflightDetail({
                decodedReason: preflight.decodedReason,
                rawError: preflight.rawError
            });
            return;
        }
        setTxMode('buy');
        reset();
        if (paymentAsset === 'ETH') {
            writeContract({
                address: activeSaleAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
                functionName: 'buyWithETH',
                args: [
                    recipientAddress
                ],
                value: amountIn
            });
            return;
        }
        writeContract({
            address: activeSaleAddress,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
            functionName: 'buyWithToken',
            args: [
                paymentTokenAddress,
                amountIn,
                recipientAddress
            ]
        });
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PrivateSaleInterface.useEffect": ()=>{
            if (!isConfirmed) return;
            refetchRemainingTokens();
            refetchPurchased();
            if (txMode === 'approve') {
                refetchAllowance();
            }
        }
    }["PrivateSaleInterface.useEffect"], [
        isConfirmed,
        txMode,
        refetchAllowance,
        refetchRemainingTokens,
        refetchPurchased
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PrivateSaleInterface.useEffect": ()=>{
            if (writeError) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'private-sale',
                    stage: 'error',
                    errorMessage: writeError.message,
                    explorerBaseUrl
                });
                return;
            }
            if (isPending) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'private-sale',
                    stage: 'pending',
                    txHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isConfirming && txHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'private-sale',
                    stage: 'confirming',
                    txHash,
                    explorerBaseUrl
                });
                return;
            }
            if (isConfirmed && txHash) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                    source: 'private-sale',
                    stage: 'success',
                    txHash,
                    explorerBaseUrl
                });
            }
        }
    }["PrivateSaleInterface.useEffect"], [
        writeError,
        isPending,
        isConfirming,
        isConfirmed,
        txHash,
        explorerBaseUrl
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-sale module-grid-bg scanline-panel max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Sale Window"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "ONBT Private Sale"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "Multi Asset"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-rail mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-rail-dot"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Guarded Window"
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Recipient Verified"
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Use case chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        className: "mt-3",
                        label: "Purchase wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            !hasSaleContractsConfigured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900",
                    children: "⚠ Sale contracts not configured — set env vars to enable"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                    lineNumber: 403,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 402,
                columnNumber: 9
            }, this),
            !chain && hasSaleContractsConfigured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900",
                    children: "Connect wallet to continue"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                    lineNumber: 410,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 409,
                columnNumber: 9
            }, this),
            chain && isSupportedChain && !saleContractConfiguredForChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900",
                    children: "⚠ Sale not configured for this chain"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                    lineNumber: 416,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 415,
                columnNumber: 9
            }, this),
            chain && !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900",
                    children: "⇄ Wallet chain differs — will auto-switch on Approve/Buy"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                    lineNumber: 422,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 421,
                columnNumber: 9
            }, this),
            chain && !isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                    children: "⛔ Switch to Base or Arbitrum"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                    lineNumber: 428,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 427,
                columnNumber: 9
            }, this),
            isPaused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                    children: "⏸ Sale paused"
                }, void 0, false, {
                    fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                    lineNumber: 434,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-tile motion-card p-4 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-forest)]",
                                children: isPaused ? '⏸️ Paused' : saleNotStarted ? 'Not Started' : saleEnded ? 'Ended' : saleActive ? 'Active' : 'Unknown'
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 440,
                                columnNumber: 11
                            }, this),
                            saleNotStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Starts in ",
                                    formatCountdown(startsIn)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 443,
                                columnNumber: 30
                            }, this),
                            saleActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Ends in ",
                                    formatCountdown(endsIn)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 444,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 439,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card p-4 rounded-lg",
                        children: [
                            saleAllocation && saleAllocation > 0n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-ink)]",
                                        children: [
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(totalSold ?? 0n)).toLocaleString(undefined, {
                                                maximumFractionDigits: 2
                                            }),
                                            " /",
                                            ' ',
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(saleAllocation)).toLocaleString(undefined, {
                                                maximumFractionDigits: 0
                                            }),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 450,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("progress", {
                                        className: "mt-2 w-full h-1.5 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[color:var(--brand-leaf)]/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[color:var(--brand-forest)] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[color:var(--brand-forest)]",
                                        value: Number(totalSold ?? 0n),
                                        max: Number(saleAllocation)
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Remaining: ",
                                    remainingTokens ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(remainingTokens)).toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    }) : '--',
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "You purchased: ",
                                    purchased ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(purchased)).toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    }) : '0',
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 438,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Payment Asset"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1",
                                children: [
                                    'ETH',
                                    'USDC',
                                    'USDT'
                                ].map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPaymentAsset(asset),
                                        className: `flex-1 px-4 py-2 rounded-xl border transition-all ${paymentAsset === asset ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 border-orange-300 shadow-[0_10px_20px_rgba(245,158,11,0.25)]' : 'bg-[color:var(--brand-cream)]/70 border-[color:var(--brand-leaf)]/40 text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/40'}`,
                                        children: asset
                                    }, asset, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 472,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Amount (",
                                    PAYMENT_CONFIG[paymentAsset].symbol,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                value: payAmount,
                                onChange: (e)=>setPayAmount(e.target.value),
                                placeholder: "0.0",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 496,
                                columnNumber: 11
                            }, this),
                            isTokenPayment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: [
                                    "Wallet ",
                                    paymentAsset,
                                    ": ",
                                    paymentBalance ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(paymentBalance, decimals)).toLocaleString(undefined, {
                                        maximumFractionDigits: 4
                                    }) : '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Recipient"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 513,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: recipient,
                                onChange: (e)=>setRecipient(e.target.value),
                                placeholder: address || '0x...',
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 512,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "Estimated ONBT Out"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 524,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    quoteOut ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(quoteOut)).toLocaleString(undefined, {
                                        maximumFractionDigits: 4
                                    }) : '--',
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 523,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-button w-full text-white font-medium py-3 rounded-lg disabled:opacity-70",
                        onClick: needsApproval ? handleApprove : handleBuy,
                        disabled: !canSubmit || isPending || isConfirming,
                        children: isPaused ? 'Sale Paused' : needsApproval ? isPending || isConfirming ? 'Processing Approval...' : !isWalletOnSelectedChain ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}` : `Approve ${paymentAsset}` : isPending || isConfirming ? 'Processing Purchase...' : !isWalletOnSelectedChain ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}` : `Buy ONBT with ${paymentAsset}`
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${explorerTxBaseUrl}${txHash}`,
                        className: "inline-flex text-sm text-[color:var(--brand-forest)] hover:underline",
                        children: "View transaction on explorer"
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 552,
                        columnNumber: 11
                    }, this),
                    writeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "w-full rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                            children: writeError.message
                        }, void 0, false, {
                            fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                            lineNumber: 562,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this),
                    validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                                children: validationError
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this),
                            preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Decoded: ",
                                    preflightDetail.decodedReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 569,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 567,
                        columnNumber: 11
                    }, this),
                    isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-3 text-sm text-emerald-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: txMode === 'approve' ? 'Approval confirmed.' : 'Purchase confirmed.'
                        }, void 0, false, {
                            fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                            lineNumber: 575,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 574,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivateSaleReport"], {
                chainId: selectedChainId,
                contractAddress: activeSaleAddress,
                saleAllocation: saleAllocation,
                totalSold: totalSold
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 580,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this);
}
_s(PrivateSaleInterface, "ymUDB3s3qLTtWKX7mB6Ql38Oboc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
_c = PrivateSaleInterface;
var _c;
__turbopack_context__.k.register(_c, "PrivateSaleInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/bridge/slice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bridgeFeatureSlice",
    ()=>bridgeFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/bridge/ui/BridgeInterface.tsx [app-client] (ecmascript)");
;
;
const bridgeFeatureSlice = {
    key: 'bridge',
    label: 'Bridge',
    icon: '🌉',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BridgeInterface"], {}, void 0, false, {
            fileName: "[project]/features/bridge/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/governance/slice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "governanceFeatureSlice",
    ()=>governanceFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/governance/ui/GovernanceInterface.tsx [app-client] (ecmascript)");
;
;
const governanceFeatureSlice = {
    key: 'governance',
    label: 'Governance',
    icon: '🏛️',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GovernanceInterface"], {}, void 0, false, {
            fileName: "[project]/features/governance/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/privateSale/slice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "privateSaleFeatureSlice",
    ()=>privateSaleFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/ui/PrivateSaleInterface.tsx [app-client] (ecmascript)");
;
;
const privateSaleFeatureSlice = {
    key: 'private-sale',
    label: 'Private Sale',
    icon: '🛡️',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivateSaleInterface"], {}, void 0, false, {
            fileName: "[project]/features/privateSale/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/staking/slice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stakingFeatureSlice",
    ()=>stakingFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/staking/ui/StakingInterface.tsx [app-client] (ecmascript)");
;
;
const stakingFeatureSlice = {
    key: 'staking',
    label: 'Staking',
    icon: '🔒',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StakingInterface"], {}, void 0, false, {
            fileName: "[project]/features/staking/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/token/slice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tokenFeatureSlice",
    ()=>tokenFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/token/ui/TokenInterface.tsx [app-client] (ecmascript)");
;
;
const tokenFeatureSlice = {
    key: 'token',
    label: 'Token',
    icon: '💰',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ({ quantumPrediction })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenInterface"], {
            quantumSignal: quantumPrediction?.signal,
            quantumConfidence: quantumPrediction?.confidence
        }, void 0, false, {
            fileName: "[project]/features/token/slice.tsx",
            lineNumber: 12,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/wallet/ui/WalletPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletPanel",
    ()=>WalletPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Identity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/components/Identity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Avatar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/components/Avatar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Name$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/components/Name.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/components/Address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$EthBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/components/EthBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$hooks$2f$useName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/identity/hooks/useName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/transaction/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$Transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/transaction/components/Transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/transaction/components/TransactionButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/transaction/components/TransactionStatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionStatusLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/transaction/components/TransactionStatusLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionStatusAction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/onchainkit/dist/transaction/components/TransactionStatusAction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWalletTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useWalletTransactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const BASE_CHAIN_ID = 8453;
/**
 * Basename L2Resolver on Base mainnet.
 * Lets the wallet holder set text records (avatar, display) onchain.
 */ const L2_RESOLVER_ADDRESS = '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD';
const L2_RESOLVER_ABI = [
    {
        name: 'setText',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'node',
                type: 'bytes32'
            },
            {
                name: 'key',
                type: 'string'
            },
            {
                name: 'value',
                type: 'string'
            }
        ],
        outputs: []
    }
];
/** Compute ENS namehash of a label like "username.base.eth" */ function namehash(name) {
    if (!name) return `0x${'00'.repeat(32)}`;
    const parts = name.split('.');
    let node = new Uint8Array(32).fill(0);
    for(let i = parts.length - 1; i >= 0; i--){
        const labelHash = ethKeccak256(new TextEncoder().encode(parts[i]));
        const combined = new Uint8Array(64);
        combined.set(node, 0);
        combined.set(labelHash, 32);
        node = ethKeccak256(combined);
    }
    return `0x${Array.from(node).map((b)=>b.toString(16).padStart(2, '0')).join('')}`;
}
function ethKeccak256(data) {
    // Minimal keccak256 is unavailable without a lib — use viem's keccak256 at runtime
    // We import it lazily so this file remains a valid module without top-level await.
    // For the UI, we use viem's keccak256 which is already bundled via wagmi.
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { keccak256 } = __turbopack_context__.r("[project]/node_modules/viem/_cjs/index.js [app-client] (ecmascript)");
        const hex = keccak256(data);
        return Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(hex.slice(2), 'hex'));
    } catch  {
        return new Uint8Array(32).fill(0);
    }
}
// ─── Sub-panel: Receive ──────────────────────────────────────────────────────
function ReceivePanel({ address }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(address)}&size=180x180&margin=8&color=0f172a&bgcolor=ffffff&qzone=2`;
    const copyAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReceivePanel.useCallback[copyAddress]": async ()=>{
            try {
                await navigator.clipboard.writeText(address);
                setCopied(true);
                setTimeout({
                    "ReceivePanel.useCallback[copyAddress]": ()=>setCopied(false)
                }["ReceivePanel.useCallback[copyAddress]"], 2000);
            } catch  {
            // clipboard may be blocked in-frame; fallback: select text
            }
        }
    }["ReceivePanel.useCallback[copyAddress]"], [
        address
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                        children: "Receive"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-900",
                        children: "Base · 8453"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4 sm:flex-row sm:items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 rounded-2xl border border-slate-900/10 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.08)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: qrUrl,
                            alt: `QR code for ${address}`,
                            width: 180,
                            height: 180,
                            className: "h-[180px] w-[180px] rounded-xl"
                        }, void 0, false, {
                            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500",
                                children: "Share this address to receive any token on Base."
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "break-all font-['IBM_Plex_Mono'] text-[13px] font-semibold text-slate-900",
                                    children: address
                                }, void 0, false, {
                                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void copyAddress(),
                                className: `w-full rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all ${copied ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-900/12 bg-slate-900 text-white hover:bg-slate-800'}`,
                                children: copied ? '✓ Address Copied' : 'Copy Address'
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: `${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.blockExplorer}/address/${address}`,
                                className: "block w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                                children: "View on BaseScan ↗"
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(ReceivePanel, "e43/46UcoGkyNyUPL6xgbIdktTo=");
_c = ReceivePanel;
// ─── Sub-panel: Transaction History ─────────────────────────────────────────
function TxHistoryPanel({ address }) {
    _s1();
    const { data: txs, isLoading, isError, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWalletTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletTransactions"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"]);
    const { data: balance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'balanceOf',
        args: [
            address
        ],
        chainId: BASE_CHAIN_ID
    });
    const formattedBalance = balance !== undefined ? parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(balance)).toLocaleString(undefined, {
        maximumFractionDigits: 2
    }) : '—';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                                children: "Transactions"
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-900",
                                children: "ONBT · Base"
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void refetch(),
                        className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-[10px] font-semibold text-slate-600 transition-colors hover:bg-slate-50",
                        children: "Refresh"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-500",
                        children: "ONBT Balance (Base)"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 font-['IBM_Plex_Mono'] text-lg font-bold text-slate-900",
                        children: [
                            formattedBalance,
                            " ONBT"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-white px-4 py-6 text-center text-sm text-slate-400",
                children: "Scanning recent ONBT transfers…"
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this),
            isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700",
                children: "Could not load transaction history. Check your RPC connection."
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 185,
                columnNumber: 9
            }, this),
            !isLoading && !isError && txs && txs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-white px-4 py-6 text-center text-sm text-slate-400",
                children: "No recent ONBT transfers found in the last 5 000 blocks."
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this),
            txs && txs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: txs.map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.blockExplorer}/tx/${tx.hash}`,
                        className: "flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm transition-colors hover:border-cyan-300/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `flex h-8 w-8 items-center justify-center rounded-full text-base ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`,
                                        children: tx.type === 'in' ? '↓' : '↑'
                                    }, void 0, false, {
                                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-slate-900",
                                                children: [
                                                    tx.type === 'in' ? 'Received' : 'Sent',
                                                    " ONBT"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-['IBM_Plex_Mono'] text-[11px] text-slate-500",
                                                children: [
                                                    tx.type === 'in' ? 'from' : 'to',
                                                    " ",
                                                    tx.counterpart.slice(0, 8),
                                                    "…",
                                                    tx.counterpart.slice(-4)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                                lineNumber: 210,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-['IBM_Plex_Mono'] font-semibold ${tx.type === 'in' ? 'text-emerald-700' : 'text-slate-700'}`,
                                        children: [
                                            tx.type === 'in' ? '+' : '-',
                                            tx.amountFormatted
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                        lineNumber: 216,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-['IBM_Plex_Mono'] text-[10px] text-slate-400",
                                        children: [
                                            tx.chainLabel,
                                            " #",
                                            tx.blockNumber.toString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this)
                        ]
                    }, tx.hash, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 197,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                href: `${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.blockExplorer}/address/${address}#tokentxns`,
                className: "block w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300/60 hover:text-cyan-700",
                children: "Full History on BaseScan ↗"
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_s1(TxHistoryPanel, "OWko8mGFHW1L2FpP6hy5Kn6Y5bI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWalletTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletTransactions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
_c1 = TxHistoryPanel;
// ─── Sub-panel: Profile / Identity ──────────────────────────────────────────
function ProfilePanel({ address }) {
    _s2();
    const { data: basename } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$hooks$2f$useName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useName"])({
        address,
        chain: {
            id: BASE_CHAIN_ID
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                        children: "Profile"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    basename && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-violet-300/50 bg-violet-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-900",
                        children: basename
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-white p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Identity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Identity"], {
                    address: address,
                    chain: {
                        id: BASE_CHAIN_ID
                    },
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Avatar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                            className: "h-14 w-14 rounded-2xl"
                        }, void 0, false, {
                            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Name$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Name"], {
                                    className: "text-base font-bold text-slate-900"
                                }, void 0, false, {
                                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Address"], {
                                    className: "font-['IBM_Plex_Mono'] text-xs text-slate-500"
                                }, void 0, false, {
                                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$components$2f$EthBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EthBalance"], {
                                    className: "font-['IBM_Plex_Mono'] text-xs font-semibold text-slate-700"
                                }, void 0, false, {
                                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                href: "https://www.base.org/names",
                className: "block w-full rounded-2xl border border-violet-300/50 bg-violet-50 px-4 py-3 text-center font-semibold text-violet-900 transition-colors hover:bg-violet-100",
                children: "Manage Basename at base.org/names ↗"
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 text-xs text-slate-500",
                children: "Basenames are onchain identities on Base. Register one at base.org/names, then it shows up automatically here and across OnchainKit apps."
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
        lineNumber: 242,
        columnNumber: 5
    }, this);
}
_s2(ProfilePanel, "dG7J+Jy5zVdonMNlZZhoKrhsWik=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$hooks$2f$useName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useName"]
    ];
});
_c2 = ProfilePanel;
// ─── Sub-panel: Edit Name & Avatar onchain ───────────────────────────────────
function EditProfilePanel({ address }) {
    _s3();
    const { data: basename } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$hooks$2f$useName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useName"])({
        address,
        chain: {
            id: BASE_CHAIN_ID
        }
    });
    const [avatarUrl, setAvatarUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [displayName, setDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeField, setActiveField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('display');
    const ensNode = basename ? namehash(basename.includes('.') ? basename : `${basename}.base.eth`) : undefined;
    const calls = ensNode ? [
        {
            to: L2_RESOLVER_ADDRESS,
            data: (()=>{
                try {
                    const { encodeFunctionData } = __turbopack_context__.r("[project]/node_modules/viem/_cjs/index.js [app-client] (ecmascript)");
                    return encodeFunctionData({
                        abi: L2_RESOLVER_ABI,
                        functionName: 'setText',
                        args: [
                            ensNode,
                            activeField === 'avatar' ? 'avatar' : 'display',
                            activeField === 'avatar' ? avatarUrl : displayName
                        ]
                    });
                } catch  {
                    return '0x';
                }
            })()
        }
    ] : undefined;
    if (!basename) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                        children: "Edit Profile"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-4 text-sm text-amber-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold",
                            children: "No Basename Found"
                        }, void 0, false, {
                            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs",
                            children: "You need a Basename to set onchain profile data (avatar, display name). Register one first."
                        }, void 0, false, {
                            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                    href: "https://www.base.org/names",
                    className: "block w-full rounded-2xl border border-violet-300/50 bg-violet-50 px-4 py-3 text-center font-semibold text-violet-900 transition-colors hover:bg-violet-100",
                    children: "Register a Basename ↗"
                }, void 0, false, {
                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
            lineNumber: 312,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                        children: "Edit Profile"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-violet-300/50 bg-violet-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-900",
                        children: basename
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-900",
                        children: "L2Resolver · Base"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex rounded-xl border border-slate-900/10 bg-slate-100 p-1 gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveField('display'),
                        className: `rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${activeField === 'display' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`,
                        children: "Display Name"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveField('avatar'),
                        className: `rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${activeField === 'avatar' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`,
                        children: "Avatar URL"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            activeField === 'display' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs font-semibold text-slate-600",
                        children: "New Display Name"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: displayName,
                        onChange: (e)=>setDisplayName(e.target.value),
                        placeholder: "e.g. ONabat Trader",
                        maxLength: 64,
                        className: "w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 359,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 357,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs font-semibold text-slate-600",
                        children: "Avatar Image URL (https://…)"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "url",
                        value: avatarUrl,
                        onChange: (e)=>setAvatarUrl(e.target.value),
                        placeholder: "https://example.com/avatar.png",
                        className: "w-full rounded-2xl border border-slate-900/12 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this),
                    avatarUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: avatarUrl,
                                alt: "avatar preview",
                                className: "h-10 w-10 rounded-full border border-slate-200 object-cover",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 381,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 382,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 379,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 369,
                columnNumber: 9
            }, this),
            calls && (activeField === 'display' && displayName.trim() || activeField === 'avatar' && avatarUrl.trim()) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$Transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Transaction"], {
                chainId: BASE_CHAIN_ID,
                calls: calls,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionButton"], {
                        text: `Set ${activeField === 'display' ? 'Display Name' : 'Avatar'} Onchain`,
                        className: "w-full rounded-2xl border border-slate-900/12 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionStatus"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionStatusLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionStatusLabel"], {
                                className: "text-sm text-slate-700"
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$transaction$2f$components$2f$TransactionStatusAction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionStatusAction"], {
                                className: "text-sm"
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 399,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 389,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: true,
                className: "w-full cursor-not-allowed rounded-2xl border border-slate-900/10 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400",
                children: `Enter a ${activeField === 'display' ? 'display name' : 'valid avatar URL'} to continue`
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 403,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 text-xs text-slate-500",
                children: "This writes a text record to the ENS L2Resolver on Base. Costs only gas (~$0.01). Your change will be reflected immediately across ENS-aware apps."
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 412,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
        lineNumber: 331,
        columnNumber: 5
    }, this);
}
_s3(EditProfilePanel, "soyDc6aaFa2pwOejC4ixyYpF8G4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$onchainkit$2f$dist$2f$identity$2f$hooks$2f$useName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useName"]
    ];
});
_c3 = EditProfilePanel;
function WalletPanel() {
    _s4();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('receive');
    if (!isConnected || !address) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "brand-panel reveal-up p-4 sm:p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2 mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700",
                        children: "Wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 431,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-slate-900/10 bg-slate-50 px-6 py-10 text-center text-sm text-slate-400",
                    children: "Connect a wallet to view your balance, transactions, and profile."
                }, void 0, false, {
                    fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                    lineNumber: 433,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
            lineNumber: 429,
            columnNumber: 7
        }, this);
    }
    const navItems = [
        {
            key: 'receive',
            label: 'Receive',
            icon: '↓'
        },
        {
            key: 'history',
            label: 'Transactions',
            icon: '📋'
        },
        {
            key: 'profile',
            label: 'Profile',
            icon: '👤'
        },
        {
            key: 'edit',
            label: 'Edit Profile',
            icon: '✏️'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brand-panel reveal-up space-y-5 p-4 sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSection(item.key),
                        className: `inline-flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm font-semibold transition-all ${section === item.key ? 'border-slate-900/20 bg-slate-900 text-white shadow-[0_8px_18px_rgba(15,23,42,0.18)]' : 'border-slate-900/12 bg-white text-slate-700 hover:border-slate-900/25 hover:bg-slate-50'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.key, true, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 452,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-900/10 bg-white p-4 sm:p-5",
                children: [
                    section === 'receive' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReceivePanel, {
                        address: address
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 470,
                        columnNumber: 35
                    }, this),
                    section === 'history' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TxHistoryPanel, {
                        address: address
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 471,
                        columnNumber: 35
                    }, this),
                    section === 'profile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfilePanel, {
                        address: address
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 472,
                        columnNumber: 35
                    }, this),
                    section === 'edit' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditProfilePanel, {
                        address: address
                    }, void 0, false, {
                        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                        lineNumber: 473,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/wallet/ui/WalletPanel.tsx",
        lineNumber: 448,
        columnNumber: 5
    }, this);
}
_s4(WalletPanel, "JAU9wFadHA5picjh64RKoEbRb20=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"]
    ];
});
_c4 = WalletPanel;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ReceivePanel");
__turbopack_context__.k.register(_c1, "TxHistoryPanel");
__turbopack_context__.k.register(_c2, "ProfilePanel");
__turbopack_context__.k.register(_c3, "EditProfilePanel");
__turbopack_context__.k.register(_c4, "WalletPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/wallet/slice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "walletFeatureSlice",
    ()=>walletFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$wallet$2f$ui$2f$WalletPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/wallet/ui/WalletPanel.tsx [app-client] (ecmascript)");
;
;
const walletFeatureSlice = {
    key: 'wallet',
    label: 'Wallet',
    icon: '👛',
    route: undefined,
    service: undefined,
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$wallet$2f$ui$2f$WalletPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletPanel"], {}, void 0, false, {
            fileName: "[project]/features/wallet/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/registry.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FEATURE_SLICES",
    ()=>FEATURE_SLICES,
    "FEATURE_TABS",
    ()=>FEATURE_TABS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/bridge/slice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/governance/slice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/slice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/staking/slice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/token/slice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$wallet$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/wallet/slice.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
const FEATURE_SLICES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bridgeFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stakingFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["governanceFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateSaleFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$wallet$2f$slice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletFeatureSlice"]
];
const FEATURE_TABS = FEATURE_SLICES.map(_c = (slice)=>({
        key: slice.key,
        label: slice.label,
        icon: slice.icon
    }));
_c1 = FEATURE_TABS;
var _c, _c1;
__turbopack_context__.k.register(_c, "FEATURE_TABS$FEATURE_SLICES.map");
__turbopack_context__.k.register(_c1, "FEATURE_TABS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$registry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/registry.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=features_5696a89b._.js.map