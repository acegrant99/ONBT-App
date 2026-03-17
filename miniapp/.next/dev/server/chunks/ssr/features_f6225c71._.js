module.exports = [
"[project]/features/token/ui/TokenInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenInterface",
    ()=>TokenInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-ssr] (ecmascript)");
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
function TokenInterface({ quantumSignal = 'caution', quantumConfidence }) {
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [hasHydrated, setHasHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transferTo, setTransferTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [transferAmount, setTransferAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('transfer');
    // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(8453);
    const [reviewArmedKey, setReviewArmedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [allowanceSnapshotTime, setAllowanceSnapshotTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('--');
    const isArbitrum = selectedChainId === 42161;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const effectiveAddress = hasHydrated ? address : undefined;
    const effectiveWalletOnSelectedChain = hasHydrated ? isWalletOnSelectedChain : false;
    const activeTokenAddress = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.tokenAddress : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.tokenAddress;
    const explorerBase = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.blockExplorer : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.blockExplorer;
    const chainName = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.name : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].base.name;
    const cautionMode = quantumSignal === 'caution';
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    const selectedStakingAddress = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"];
    const selectedStakingRouterAddress = isArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ROUTER_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ROUTER_BASE_ADDRESS"];
    // Read user's balance
    const { data: balance, refetch: refetchBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'balanceOf',
        args: effectiveAddress ? [
            effectiveAddress
        ] : undefined,
        query: {
            refetchInterval: 15_000
        }
    });
    // Read total supply
    const { data: totalSupply } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'totalSupply',
        query: {
            refetchInterval: 60_000
        }
    });
    const { data: stakingAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'allowance',
        args: effectiveAddress ? [
            effectiveAddress,
            selectedStakingAddress
        ] : undefined,
        query: {
            refetchInterval: 30_000
        }
    });
    const { data: stakingRouterAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
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
    const { data: txHash, writeContract: transfer, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Hydration marker for wallet/address-dependent UI logic.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasHydrated(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasHydrated) return;
        const updateSnapshotTime = ()=>{
            setAllowanceSnapshotTime(new Date().toLocaleTimeString());
        };
        updateSnapshotTime();
        const interval = window.setInterval(updateSnapshotTime, 30_000);
        return ()=>window.clearInterval(interval);
    }, [
        hasHydrated
    ]);
    // Wait for transaction
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    const knownRecipients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return [];
        //TURBOPACK unreachable
        ;
        const storageKey = undefined;
        const raw = undefined;
    }, [
        effectiveAddress,
        txHash,
        isConfirmed
    ]);
    const normalizedRecipient = transferTo.trim();
    const isRecipientValid = normalizedRecipient ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(normalizedRecipient) : false;
    const isSelfTransfer = Boolean(effectiveAddress && isRecipientValid && effectiveAddress.toLowerCase() === normalizedRecipient.toLowerCase());
    const reviewContextKey = `${selectedChainId}:${normalizedRecipient.toLowerCase()}:${transferAmount}`;
    const reviewArmed = reviewArmedKey === reviewContextKey;
    const numericTransferAmount = Number(transferAmount);
    const hasValidAmount = Number.isFinite(numericTransferAmount) && numericTransferAmount > 0;
    const availableBalance = Number(balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(balance) : '0');
    const hasSufficientBalance = hasValidAmount && numericTransferAmount <= availableBalance;
    const suggestedTestAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!Number.isFinite(availableBalance) || availableBalance <= 0) return '0.1';
        const candidate = Math.min(Math.max(availableBalance * 0.02, 0.1), 10);
        return candidate.toFixed(2);
    }, [
        availableBalance
    ]);
    const isKnownRecipient = isRecipientValid && knownRecipients.includes(normalizedRecipient.toLowerCase());
    const requiresTwoStepReview = Boolean(isRecipientValid && !isSelfTransfer && (!isKnownRecipient || cautionMode));
    const isHighRiskTransfer = requiresTwoStepReview || cautionMode;
    const identityConfidence = !effectiveAddress ? 'disconnected' : !effectiveWalletOnSelectedChain ? 'medium' : isHighRiskTransfer ? 'medium' : 'high';
    const handleTransfer = async ()=>{
        setValidationError(null);
        setPreflightDetail(null);
        if (!normalizedRecipient || !hasValidAmount) {
            setValidationError('Enter a valid recipient and transfer amount before continuing.');
            return;
        }
        if (!effectiveWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        if (!isRecipientValid) {
            setValidationError('Recipient address format is invalid. Check the destination carefully.');
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
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Token transfer',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: activeTokenAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
                functionName: 'transfer',
                args: [
                    normalizedRecipient,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(transferAmount)
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
                functionName: 'transfer',
                args: [
                    normalizedRecipient,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(transferAmount)
                ]
            });
        } catch (err) {
            console.error('Transfer error:', err);
            setValidationError(err instanceof Error ? err.message : 'Failed to submit transfer.');
        }
    };
    // Refetch balance after successful transaction
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
        isConfirmed,
        refetchBalance,
        effectiveAddress,
        isRecipientValid,
        isSelfTransfer,
        normalizedRecipient,
        knownRecipients
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'token',
                stage: 'error',
                errorMessage: error.message,
                txHash,
                explorerBaseUrl: explorerBase
            });
            return;
        }
        if (isPending) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'token',
                stage: 'pending',
                txHash,
                explorerBaseUrl: explorerBase
            });
            return;
        }
        if (isConfirming && txHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'token',
                stage: 'confirming',
                txHash,
                explorerBaseUrl: explorerBase
            });
            return;
        }
        if (isConfirmed && txHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'token',
                stage: 'success',
                txHash,
                explorerBaseUrl: explorerBase
            });
        }
    }, [
        error,
        isPending,
        isConfirming,
        isConfirmed,
        txHash,
        explorerBase
    ]);
    const userBalance = balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(balance) : '0';
    const supply = totalSupply ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(totalSupply) : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_INFO"].totalSupply;
    const formattedStakingAllowance = stakingAllowance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(stakingAllowance) : '0';
    const formattedStakingRouterAllowance = stakingRouterAllowance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(stakingRouterAllowance) : '0';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-token module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap items-center gap-2 border-b border-sky-900/15 pb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    hasHydrated && !effectiveWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    effectiveAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: effectiveAddress,
                        className: "ml-auto"
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card mb-6 rounded-2xl p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900",
                            children: [
                                parseFloat(userBalance).toFixed(4),
                                " ONBT"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900",
                            children: [
                                "Supply ",
                                parseFloat(supply).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-slate-900",
                            children: chainName
                        }, void 0, false, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 334,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/token/ui/TokenInterface.tsx",
                    lineNumber: 327,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1",
                children: [
                    'transfer',
                    'info'
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab),
                        className: `flex-1 rounded-xl px-4 py-2 font-medium capitalize transition-all ${activeTab === tab ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(2,132,199,0.28)]' : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-leaf)]'}`,
                        children: tab
                    }, tab, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            activeTab === 'transfer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-xl border px-3 py-2 text-xs ${cautionMode ? 'border-amber-400/35 bg-amber-500/10 text-amber-100' : 'border-emerald-400/35 bg-emerald-500/10 text-emerald-100'}`,
                        children: [
                            "Quantum posture: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: quantumSignal
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 367,
                                columnNumber: 30
                            }, this),
                            typeof quantumConfidence === 'number' ? ` (${(quantumConfidence * 100).toFixed(1)}% confidence)` : '',
                            ".",
                            cautionMode ? ' Caution mode is active: review recipient and start with a smaller test transfer before confirming.' : ' Risk-on posture allows normal transfer flow with standard validation checks.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, this),
                    hasHydrated && !effectiveWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-amber-400/35 bg-amber-500/10 p-3 text-sm text-amber-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900",
                            children: [
                                "Wallet is on ",
                                chain?.id === 42161 ? 'Arbitrum' : chain?.id === 8453 ? 'Base' : 'an unsupported chain',
                                ". Switch to ",
                                chainName,
                                " to submit transfers on this use case."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 376,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 375,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Recipient Address"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-stat-card mt-2 rounded-xl px-2.5 py-2 text-xs text-[color:var(--brand-ink)]/80",
                                children: [
                                    !normalizedRecipient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/80",
                                        children: "Recipient state: waiting for address input."
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 396,
                                        columnNumber: 40
                                    }, this),
                                    normalizedRecipient && !isRecipientValid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-rose-300 bg-rose-50 px-3 py-1 font-semibold text-rose-700",
                                        children: "Recipient state: invalid format."
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 397,
                                        columnNumber: 60
                                    }, this),
                                    isRecipientValid && isSelfTransfer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-semibold text-amber-700",
                                        children: "Recipient state: self-transfer detected."
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 398,
                                        columnNumber: 54
                                    }, this),
                                    isRecipientValid && !isSelfTransfer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700",
                                        children: [
                                            "Recipient state: verified-format (",
                                            normalizedRecipient.slice(0, 6),
                                            "...",
                                            normalizedRecipient.slice(-4),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 400,
                                        columnNumber: 17
                                    }, this),
                                    isRecipientValid && !isSelfTransfer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                        children: [
                                            "Recipient history: ",
                                            isKnownRecipient ? 'known recipient' : 'new recipient (test transfer recommended)'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 405,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 416,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            "Available ",
                                            parseFloat(userBalance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTransferAmount(userBalance),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: "Max"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 428,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 426,
                                columnNumber: 13
                            }, this),
                            !hasSufficientBalance && transferAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Amount exceeds available balance on ",
                                    chainName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 436,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 412,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl px-3 py-2 text-xs text-[color:var(--brand-ink)]/85",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Allowance Visibility"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid gap-2 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85",
                                        children: [
                                            "Staking ",
                                            Number(formattedStakingAllowance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/85",
                                        children: [
                                            "Router ",
                                            Number(formattedStakingRouterAllowance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]/75",
                                children: "Transfer uses wallet balance directly; high stale approvals can still increase delegated spend risk."
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 446,
                                columnNumber: 13
                            }, this),
                            (Number(formattedStakingAllowance) > 100000 || Number(formattedStakingRouterAllowance) > 100000) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700",
                                children: "High approval snapshot detected. Reduce stale spender approvals before high-value transfers."
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 448,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                children: [
                                    "Snapshot ",
                                    allowanceSnapshotTime
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 440,
                        columnNumber: 11
                    }, this),
                    requiresTwoStepReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2 text-xs text-amber-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                        children: "Review"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                        children: "Confirm"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 457,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                        children: "Then Size Up"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 458,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-amber-300/50 bg-amber-50 px-3 py-1 font-semibold text-amber-900",
                                children: [
                                    "Suggested test ",
                                    suggestedTestAmount,
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 460,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setTransferAmount(suggestedTestAmount),
                                className: "brand-secondary-button mt-2 rounded-md px-2 py-1 text-xs font-medium",
                                children: "Use Suggested Test Amount"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 461,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 454,
                        columnNumber: 13
                    }, this),
                    reviewArmed && requiresTwoStepReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-orange-400/35 bg-orange-500/10 px-3 py-2 text-xs text-orange-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            lineNumber: 473,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 472,
                        columnNumber: 13
                    }, this),
                    validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700",
                                children: validationError
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 481,
                                columnNumber: 15
                            }, this),
                            preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 font-semibold text-rose-700",
                                children: [
                                    "Decoded reason: ",
                                    preflightDetail.decodedReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 483,
                                columnNumber: 17
                            }, this),
                            preflightDetail?.rawError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-1 text-left text-[11px] font-semibold text-rose-700/90",
                                children: [
                                    "Raw: ",
                                    preflightDetail.rawError
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 486,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 480,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-button w-full text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50",
                        onClick: handleTransfer,
                        disabled: !normalizedRecipient || !hasValidAmount || isPending || isConfirming || !address,
                        children: isPending ? 'Confirming...' : isConfirming ? 'Processing...' : !effectiveWalletOnSelectedChain ? `Switch to ${chainName}` : requiresTwoStepReview ? reviewArmed ? 'Confirm Reviewed Transfer' : 'Review Transfer Safety' : 'Transfer ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${explorerBase}/tx/${txHash}`,
                        className: "inline-flex text-sm text-[color:var(--brand-forest)] hover:underline",
                        children: "View transaction on explorer"
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 511,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                            children: [
                                "Error: ",
                                error.message
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 521,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 520,
                        columnNumber: 13
                    }, this),
                    isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Transfer successful!"
                        }, void 0, false, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 527,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 526,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 359,
                columnNumber: 9
            }, this),
            activeTab === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Token Details"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 537,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_INFO"].name
                                            }, void 0, false, {
                                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                                lineNumber: 540,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_INFO"].symbol
                                            }, void 0, false, {
                                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                                lineNumber: 541,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_INFO"].decimals,
                                                    " decimals"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                                lineNumber: 542,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                                children: chainName
                                            }, void 0, false, {
                                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Contract"
                                            }, void 0, false, {
                                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                                lineNumber: 546,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                                href: `${explorerBase}/address/${activeTokenAddress}`,
                                                className: "inline-flex rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-1 font-mono text-xs text-[color:var(--brand-forest)]",
                                                children: [
                                                    activeTokenAddress.slice(0, 6),
                                                    "...",
                                                    activeTokenAddress.slice(-4)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                                lineNumber: 547,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 545,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 536,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "About ONBT"
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 558,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-3 w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_INFO"].description
                            }, void 0, false, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN_INFO"].website,
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-1 text-sm font-semibold text-[color:var(--brand-forest)]",
                                        children: "Website"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 563,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                        href: `${explorerBase}/token/${activeTokenAddress}`,
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-1 text-sm font-semibold text-[color:var(--brand-forest)]",
                                        children: "Explorer"
                                    }, void 0, false, {
                                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                                lineNumber: 562,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 557,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-lg p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/80",
                            children: "🌉 ONBT omnichain by LayerZero V2. Use Bridge to move between Base and Arbitrum."
                        }, void 0, false, {
                            fileName: "[project]/features/token/ui/TokenInterface.tsx",
                            lineNumber: 579,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/token/ui/TokenInterface.tsx",
                        lineNumber: 578,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/token/ui/TokenInterface.tsx",
                lineNumber: 535,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/token/ui/TokenInterface.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
}),
"[project]/features/bridge/ui/BridgeInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BridgeInterface",
    ()=>BridgeInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/data/pad.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-ssr] (ecmascript)");
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
function BridgeInterface() {
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [bridgeAmount, setBridgeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [destinationChain, setDestinationChain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('arbitrum');
    // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
    const [selectedSourceChainId, setSelectedSourceChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(8453);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedSourceChainId
    });
    const [estimatedFee, setEstimatedFee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [autoStake, setAutoStake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoStakeLockup, setAutoStakeLockup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].NONE);
    const [showAchievements, setShowAchievements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [achievementNotices, setAchievementNotices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bridgeCount, setBridgeCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalBridgedVolume, setTotalBridgedVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const processedTxHashRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (chain?.id === 8453 || chain?.id === 42161) {
            setSelectedSourceChainId(chain.id);
        }
    }, [
        chain?.id
    ]);
    // Load bridge history from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (address) {
            const storageKey = `onbt_bridge_history_${address}`;
            const history = localStorage.getItem(storageKey);
            if (history) {
                const parsed = JSON.parse(history);
                setBridgeCount(parsed.count || 0);
                setTotalBridgedVolume(parsed.volume || 0);
            }
        }
    }, [
        address
    ]);
    // Track achievements
    const achievements = [
        {
            id: 'first_bridge',
            name: 'Cross-Chain Pioneer',
            description: 'Complete your first bridge transaction',
            icon: '🌉',
            earned: bridgeCount > 0
        },
        {
            id: 'bridge_master',
            name: 'Bridge Master',
            description: 'Complete 10 bridge transactions',
            icon: '🏆',
            earned: bridgeCount >= 10
        },
        {
            id: 'whale_bridger',
            name: 'Whale Bridger',
            description: 'Bridge 100,000 ONBT total',
            icon: '🐋',
            earned: totalBridgedVolume >= 100000
        },
        {
            id: 'omnichain_user',
            name: 'Omnichain User',
            description: 'Use ONBT on multiple chains',
            icon: '⛓️',
            earned: bridgeCount > 0
        }
    ];
    const unlockedAchievements = achievements.filter((a)=>a.earned);
    const nextAchievement = achievements.find((a)=>!a.earned);
    // Determine current chain and contract
    const isOnBase = selectedSourceChainId === 8453;
    const isWalletOnSelectedChain = chain?.id === selectedSourceChainId;
    const currentContractAddress = isOnBase ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAIN_CONFIG"].arbitrum.tokenAddress;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setDestinationChain(isOnBase ? 'arbitrum' : 'base');
    }, [
        isOnBase
    ]);
    // Read user's balance
    const { data: balance, refetch: refetchBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedSourceChainId,
        address: currentContractAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
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
        const dstEid = destinationChain === 'arbitrum' ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].ARBITRUM : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].BASE;
        const amountLD = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(bridgeAmount);
        const minAmountLD = amountLD * 98n / 100n; // 2% slippage tolerance
        // Convert address to bytes32 for LayerZero
        const toBytes32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pad"])(address, {
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
    const { data: feeQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedSourceChainId,
        address: currentContractAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (feeQuote && typeof feeQuote === 'object' && 'nativeFee' in feeQuote) {
            setEstimatedFee(feeQuote.nativeFee);
        }
    }, [
        feeQuote
    ]);
    // Write contract for bridging
    const { data: txHash, writeContract: sendCrossChain, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    // Wait for transaction
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
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
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_OFT_ABI"],
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
    // Track bridge completion and achievements
    const trackBridgeCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!address || !bridgeAmount) return;
        const amount = parseFloat(bridgeAmount);
        const storageKey = `onbt_bridge_history_${address}`;
        // Update history
        const newCount = bridgeCount + 1;
        const newVolume = totalBridgedVolume + amount;
        localStorage.setItem(storageKey, JSON.stringify({
            count: newCount,
            volume: newVolume,
            lastBridge: Date.now()
        }));
        setBridgeCount(newCount);
        setTotalBridgedVolume(newVolume);
        // Check for new achievements
        const newlyUnlocked = [];
        if (newCount === 1) {
            newlyUnlocked.push('🎉 Achievement Unlocked: Cross-Chain Pioneer!');
        }
        if (newCount === 10) {
            newlyUnlocked.push('🏆 Achievement Unlocked: Bridge Master!');
        }
        if (newVolume >= 100000 && totalBridgedVolume < 100000) {
            newlyUnlocked.push('🐋 Achievement Unlocked: Whale Bridger!');
        }
        // Show achievement notifications
        if (newlyUnlocked.length > 0) {
            setShowAchievements(true);
            setAchievementNotices(newlyUnlocked);
        }
    }, [
        address,
        bridgeAmount,
        bridgeCount,
        totalBridgedVolume
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (achievementNotices.length === 0) return;
        const timer = window.setTimeout(()=>setAchievementNotices([]), 5000);
        return ()=>window.clearTimeout(timer);
    }, [
        achievementNotices
    ]);
    // Refetch balance after successful transaction and track achievements
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isConfirmed || !txHash) return;
        if (processedTxHashRef.current === txHash) return;
        processedTxHashRef.current = txHash;
        const bridgedAmount = bridgeAmount;
        refetchBalance();
        trackBridgeCompletion();
        setBridgeAmount('');
        if (autoStake) {
            setAchievementNotices((current)=>[
                    ...current,
                    `Auto-stake queued for ${bridgedAmount} ONBT (${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCKUP_INFO"][autoStakeLockup].label}) on destination chain.`
                ]);
        }
    }, [
        isConfirmed,
        txHash,
        refetchBalance,
        trackBridgeCompletion,
        autoStake,
        autoStakeLockup,
        bridgeAmount
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const explorerBaseUrl = selectedSourceChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
        if (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'bridge',
                stage: 'error',
                errorMessage: error.message,
                txHash,
                explorerBaseUrl
            });
            return;
        }
        if (isPending) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'bridge',
                stage: 'pending',
                txHash,
                explorerBaseUrl
            });
            return;
        }
        if (isConfirming && txHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'bridge',
                stage: 'confirming',
                txHash,
                explorerBaseUrl
            });
            return;
        }
        if (isConfirmed && txHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'bridge',
                stage: 'success',
                txHash,
                explorerBaseUrl
            });
        }
    }, [
        error,
        isPending,
        isConfirming,
        isConfirmed,
        txHash,
        selectedSourceChainId
    ]);
    const userBalance = balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(balance) : '0';
    const currentChainName = isOnBase ? 'Base' : 'Arbitrum';
    const destinationChainName = destinationChain === 'arbitrum' ? 'Arbitrum' : 'Base';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-bridge module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Bridge Routing"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "Omnichain Bridge"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "LayerZero V2"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-rail mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-rail-dot"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: [
                                            currentChainName,
                                            " to ",
                                            destinationChainName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Fee Aware"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Bridge Live"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 361,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Source chain",
                        selectedChainId: selectedSourceChainId,
                        onSelectChain: setSelectedSourceChainId
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card motion-card flex items-center justify-between rounded-xl p-3 border border-[color:var(--brand-sun)]/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                        children: [
                                            "🏆 ",
                                            unlockedAchievements.length,
                                            "/",
                                            achievements.length,
                                            " Achievements"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 373,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAchievements(!showAchievements),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-forest)]",
                                        children: showAchievements ? 'Hide' : 'View'
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                    children: [
                                        bridgeCount,
                                        " bridges · ",
                                        totalBridgedVolume.toFixed(0),
                                        " ONBT total"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this),
                    showAchievements && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 space-y-2",
                        children: achievements.map((achievement)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-3 p-3 rounded-lg border ${achievement.earned ? 'bg-emerald-500/10 border-emerald-400/35' : 'bg-[color:var(--brand-cream)]/45 border-[color:var(--brand-leaf)]/20'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: achievement.icon
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 402,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium text-sm text-[color:var(--brand-ink)]",
                                                children: achievement.name
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 404,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: achievement.description
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 407,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 403,
                                        columnNumber: 17
                                    }, this),
                                    achievement.earned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-emerald-300",
                                        children: "✓ Unlocked"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 412,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, achievement.id, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 394,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 392,
                        columnNumber: 11
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        className: "mt-4",
                        label: "Bridge wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 422,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-stat-card rounded-xl p-4 text-left text-xl font-semibold text-[color:var(--brand-leaf)]",
                        children: currentChainName
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-stat-card rounded-xl p-4 text-left text-xl font-semibold text-[color:var(--brand-ink)]",
                        children: [
                            parseFloat(userBalance).toFixed(4),
                            " ONBT"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            achievementNotices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 space-y-2",
                children: achievementNotices.map((notice)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-sm font-semibold text-emerald-900",
                        children: notice
                    }, notice, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 435,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, this),
            !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900",
                    children: [
                        "Wallet chain differs from selected source chain. Click Bridge to switch wallet to ",
                        currentChainName,
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                    lineNumber: 448,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 447,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Bridge To"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDestinationChain('arbitrum'),
                                        disabled: !isOnBase,
                                        className: `p-4 rounded-lg border-2 transition-all ${destinationChain === 'arbitrum' && isOnBase ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]' : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 disabled:opacity-50 disabled:cursor-not-allowed'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium",
                                                children: "Arbitrum"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 471,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-1",
                                                children: [
                                                    "EID: ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].ARBITRUM
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 472,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 462,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDestinationChain('base'),
                                        disabled: isOnBase,
                                        className: `p-4 rounded-lg border-2 transition-all ${destinationChain === 'base' && !isOnBase ? 'border-[color:var(--brand-forest)] bg-[color:var(--brand-cream)] text-[color:var(--brand-ink)]' : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 disabled:opacity-50 disabled:cursor-not-allowed'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium",
                                                children: "Base"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-1",
                                                children: [
                                                    "EID: ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LZ_ENDPOINT_ID"].BASE
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 484,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 474,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 457,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl border-2 border-dashed border-[color:var(--brand-leaf)]/25 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setAutoStake(!autoStake),
                                                className: "w-5 h-5 rounded border border-[color:var(--brand-leaf)]/45 bg-[color:var(--brand-cream)] text-[11px] font-bold text-[color:var(--brand-forest)]",
                                                children: autoStake ? '✓' : ''
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 493,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setAutoStake(!autoStake),
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]",
                                                children: "🎯 Auto-Stake on Arrival"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 500,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 492,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill text-xs text-[color:var(--brand-ink)]/80",
                                        children: "Coming Soon"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 491,
                                columnNumber: 11
                            }, this),
                            autoStake && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mb-2 rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                        children: "Select Lockup Period"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: autoStakeLockup,
                                        onChange: (e)=>setAutoStakeLockup(parseInt(e.target.value)),
                                        "aria-label": "Select lockup period for auto-staking",
                                        className: "w-full px-3 py-2 text-sm border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].NONE,
                                                children: "No Lockup (1x rewards)"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].DAYS_30,
                                                children: "30 Days (1.2x rewards)"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 521,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].DAYS_90,
                                                children: "90 Days (1.5x rewards)"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 522,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].DAYS_180,
                                                children: "180 Days (2x rewards)"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].DAYS_365,
                                                children: "365 Days (3x rewards)"
                                            }, void 0, false, {
                                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                        children: [
                                            "💡 Your tokens will automatically stake when they arrive on ",
                                            destinationChainName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 510,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount to Bridge"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: bridgeAmount,
                                onChange: (e)=>setBridgeAmount(e.target.value),
                                placeholder: "0.0",
                                className: "brand-input w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80 text-lg"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 538,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            "Available ",
                                            parseFloat(userBalance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setBridgeAmount(userBalance),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: "Max"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this),
                    estimatedFee && bridgeAmount && parseFloat(bridgeAmount) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: "Bridge Fee"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 560,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(estimatedFee),
                                            " ETH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: "Receive"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 566,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-emerald-300/40 bg-emerald-50 px-3 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: [
                                            "~",
                                            bridgeAmount,
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 567,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 565,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100",
                        onClick: handleBridge,
                        disabled: !bridgeAmount || parseFloat(bridgeAmount) <= 0 || !estimatedFee || isPending || isConfirming,
                        children: isPending ? 'Confirming...' : isConfirming ? 'Bridging...' : !isWalletOnSelectedChain ? `Switch to ${currentChainName}` : `Bridge to ${destinationChainName}`
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 575,
                        columnNumber: 9
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `https://${selectedSourceChainId === 42161 ? 'arbiscan.io' : 'basescan.org'}/tx/${txHash}`,
                        className: "inline-flex text-sm text-[color:var(--brand-forest)] hover:underline",
                        children: "View transaction on explorer"
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 597,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                            children: [
                                "Error: ",
                                error.message
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                            lineNumber: 607,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 606,
                        columnNumber: 13
                    }, this),
                    validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                                children: validationError
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 613,
                                columnNumber: 13
                            }, this),
                            preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Decoded: ",
                                    preflightDetail.decodedReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 615,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 612,
                        columnNumber: 11
                    }, this),
                    isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mb-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-sm font-semibold text-emerald-700",
                                        children: "✓ Bridge transaction submitted!"
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 623,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700",
                                        children: [
                                            "Tokens will arrive on ",
                                            destinationChainName,
                                            " in a few minutes."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 622,
                                columnNumber: 13
                            }, this),
                            nextAchievement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-highlight-bar rounded-xl p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]",
                                        children: [
                                            "🎯 Next Achievement: ",
                                            nextAchievement.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 634,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                        children: nextAchievement.description
                                    }, void 0, false, {
                                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                        lineNumber: 637,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 633,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 621,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: "🔒 Powered by LayerZero V2"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 649,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "ONBT uses LayerZero's Omnichain Fungible Token (OFT) standard for secure cross-chain transfers. Your tokens are burned on the source chain and minted on the destination chain, maintaining a unified global supply."
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 652,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "🏆 Earn achievements with completed bridge milestones."
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 657,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 648,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-sky-400/35 bg-sky-500/10 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800",
                                children: "Alternative Bridge"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 664,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 w-full rounded-2xl border border-sky-300/50 bg-sky-50 px-3 py-2 text-left text-xs font-semibold text-sky-800",
                                children: "Use Stargate or other LayerZero-compatible routes."
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 667,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: "https://stargate.finance/transfer",
                                className: "inline-flex items-center gap-1 rounded-full border border-sky-300/50 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800",
                                children: "Bridge via Stargate Finance →"
                            }, void 0, false, {
                                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                                lineNumber: 670,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
                lineNumber: 647,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/bridge/ui/BridgeInterface.tsx",
        lineNumber: 348,
        columnNumber: 5
    }, this);
}
}),
"[project]/features/staking/ui/StakingInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StakingInterface",
    ()=>StakingInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-ssr] (ecmascript)");
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
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('stake');
    const [stakeAmount, setStakeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [unstakeAmount, setUnstakeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedLockup, setSelectedLockup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LockupPeriod"].NONE);
    const [delegateAddress, setDelegateAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(chain?.id === 42161 ? 42161 : 8453);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const isOnBase = selectedChainId === 8453;
    const isOnArbitrum = selectedChainId === 42161;
    const isSupportedChain = isOnBase || isOnArbitrum;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const stakingContract = isOnArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ADDRESS"];
    const tokenContract = isOnArbitrum ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ADDRESS"];
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    // Both Base and Arbitrum staking contracts are deployed - writes enabled on both chains
    const canWriteStaking = isSupportedChain;
    // Check if staking contract is deployed
    const isStakingDeployed = stakingContract !== '0x0000000000000000000000000000000000000000';
    // Read user's ONBT balance
    const { data: tokenBalance, refetch: refetchBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: tokenContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
        functionName: 'balanceOf',
        args: address ? [
            address
        ] : undefined,
        query: {
            refetchInterval: 15_000
        }
    });
    // Read user's stake info
    const { data: stakeInfo, refetch: refetchStakeInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
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
    const { data: pendingRewards, refetch: refetchRewards } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
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
    const { data: totalStaked } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'localTotalStaked',
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Read global total staked
    const { data: globalTotalStaked } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'globalTotalStaked',
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Minimum stake amount
    const { data: minStake } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'MIN_STAKE',
        query: {
            refetchInterval: 30_000,
            enabled: isStakingDeployed
        }
    });
    // Contract pause status
    const { data: contractPaused } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'paused',
        query: {
            enabled: isStakingDeployed,
            refetchInterval: 30_000
        }
    });
    // Hub detection
    const { data: isHubChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: stakingContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
        functionName: 'isHub',
        query: {
            refetchInterval: 30_000,
            enabled: isStakingDeployed
        }
    });
    // Approval for staking
    const { data: allowance, refetch: refetchAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: tokenContract,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
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
    const { data: approveTxHash, writeContract: approveToken, isPending: isApproving } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: stakeTxHash, writeContract: stakeTokens, isPending: isStaking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: unstakeTxHash, writeContract: unstakeTokens, isPending: isUnstaking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: claimTxHash, writeContract: claimRewards, isPending: isClaiming } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: compoundTxHash, writeContract: compoundRewards, isPending: isCompounding } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: delegateTxHash, writeContract: delegateVotes, isPending: isDelegating } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    // Wait for transactions
    const { isSuccess: isApproveSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: approveTxHash
    });
    const { isSuccess: isStakeSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: stakeTxHash
    });
    const { isSuccess: isUnstakeSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: unstakeTxHash
    });
    const { isSuccess: isClaimSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: claimTxHash
    });
    const { isSuccess: isCompoundSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: compoundTxHash
    });
    const { isSuccess: isDelegateSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: delegateTxHash
    });
    const activeTxHash = approveTxHash || stakeTxHash || unstakeTxHash || claimTxHash || compoundTxHash || delegateTxHash;
    const isTxPending = isApproving || isStaking || isUnstaking || isClaiming || isCompounding || isDelegating;
    const isTxSuccess = isApproveSuccess || isStakeSuccess || isUnstakeSuccess || isClaimSuccess || isCompoundSuccess || isDelegateSuccess;
    // Refetch on success
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isApproveSuccess || isStakeSuccess || isUnstakeSuccess || isClaimSuccess || isCompoundSuccess) {
            refetchBalance();
            refetchStakeInfo();
            refetchRewards();
            refetchAllowance();
        }
    }, [
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
        if (isTxPending) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'staking',
                stage: 'pending',
                txHash: activeTxHash,
                explorerBaseUrl
            });
            return;
        }
        if (isTxSuccess && activeTxHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'staking',
                stage: 'success',
                txHash: activeTxHash,
                explorerBaseUrl
            });
        }
    }, [
        isTxPending,
        isTxSuccess,
        activeTxHash,
        selectedChainId
    ]);
    // Parse stake info
    const userStakeAmount = stakeInfo ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(stakeInfo[0]) : '0';
    const lockupEndTime = stakeInfo ? Number(stakeInfo[2]) : 0;
    const userLockup = stakeInfo ? Number(stakeInfo[3]) : 0;
    const userEarned = stakeInfo ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(stakeInfo[4]) : '0';
    const isLocked = stakeInfo ? stakeInfo[5] : false;
    const userBalance = tokenBalance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(tokenBalance) : '0';
    const userRewards = pendingRewards ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(pendingRewards) : '0';
    const chainTotalStaked = totalStaked ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(totalStaked) : '0';
    const globalStaked = globalTotalStaked ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(globalTotalStaked) : '0';
    const minStakeAmount = minStake ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(minStake) : '0';
    const isPaused = !!contractPaused;
    const runStakingPreflight = async (input)=>{
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: input.actionLabel,
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            checks: input.checks,
            request: {
                address: input.addressOverride || stakingContract,
                abi: input.abiOverride || __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
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
    // Check if needs approval
    const needsApproval = !allowance || allowance < (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount || '0');
    const belowMinStake = !!stakeAmount && parseFloat(stakeAmount) > 0 && minStake && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount) < minStake;
    // Handlers
    const handleApprove = async ()=>{
        if (!stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount);
        const ok = await runStakingPreflight({
            actionLabel: 'Staking approval',
            functionName: 'approve',
            args: [
                stakingContract,
                amount
            ],
            addressOverride: tokenContract,
            abiOverride: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"]
        });
        if (!ok) return;
        approveToken({
            address: tokenContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_TOKEN_ABI"],
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
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(stakeAmount);
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
        stakeTokens({
            address: stakingContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
            functionName: 'stake',
            args: [
                amount,
                selectedLockup
            ]
        });
    };
    const handleUnstake = async ()=>{
        if (!unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking) return;
        if (!isWalletOnSelectedChain) {
            switchChain({
                chainId: selectedChainId
            });
            return;
        }
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(unstakeAmount);
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
        unstakeTokens({
            address: stakingContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
            functionName: 'unstake',
            args: [
                amount
            ]
        });
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
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
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
        const ok = await runStakingPreflight({
            actionLabel: 'Compound rewards',
            functionName: 'compound'
        });
        if (!ok) return;
        compoundRewards({
            address: stakingContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
            functionName: 'compound'
        });
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
                    ok: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(normalizedDelegate),
                    reason: 'Delegate address is invalid.'
                }
            ]
        });
        if (!ok) return;
        delegateVotes({
            address: stakingContract,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_STAKING_ABI"],
            functionName: 'delegate',
            args: [
                normalizedDelegate
            ]
        });
    };
    // If staking not deployed, show coming soon
    if (!isStakingDeployed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "brand-card module-shell module-shell-staking module-grid-bg scanline-panel max-w-2xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 border-b border-sky-900/15 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "kicker-label mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1",
                            children: "Yield Engine"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-left text-2xl font-semibold brand-display",
                            children: "ONBT Staking"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 416,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 414,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-tile motion-card p-8 text-center border border-[color:var(--brand-sun)]/40",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-4xl mb-4",
                            children: "🚧"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "mb-3 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-xl font-semibold text-[color:var(--brand-ink)]",
                            children: "Staking Contract Deploying Soon"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-[color:var(--brand-ink)]/70",
                            children: "Omnichain staking with LayerZero V2 is ready for deployment. Check back soon!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 418,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
            lineNumber: 413,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-staking module-grid-bg scanline-panel max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Yield Engine"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 436,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "Omnichain Staking"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "Rewards Live"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 438,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 435,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-rail mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-rail-dot"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Lockup Aware"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 443,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Compound"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 444,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: isOnBase ? 'Base' : 'Arbitrum'
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 445,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 442,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Use case chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        label: "Staking wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 454,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this),
            !isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-amber-300/45 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-900",
                    children: "Please connect to Base or Arbitrum to stake, unstake, claim, compound, or delegate."
                }, void 0, false, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 460,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 459,
                columnNumber: 9
            }, this),
            !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-sky-400/35 bg-sky-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-sky-300/45 bg-sky-50 px-3 py-2 text-left text-sm font-semibold text-sky-900",
                    children: [
                        "Wallet chain differs from selected chain. Submit an action to switch wallet to ",
                        isOnBase ? 'Base' : 'Arbitrum',
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 468,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 467,
                columnNumber: 9
            }, this),
            isPaused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                    children: "⛔ Staking contract is currently paused. Reads are live; writes are temporarily disabled."
                }, void 0, false, {
                    fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                    lineNumber: 476,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 475,
                columnNumber: 9
            }, this),
            validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                        children: validationError
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 484,
                        columnNumber: 11
                    }, this),
                    preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                        children: [
                            "Decoded: ",
                            preflightDetail.decodedReason
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 486,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 483,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card rounded-xl px-3 py-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex flex-wrap gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "kicker-label rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1",
                            children: "Position Telemetry"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 494,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-2 md:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Staked ",
                                    parseFloat(userStakeAmount).toFixed(2),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 497,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Rewards ",
                                    parseFloat(userRewards).toFixed(4),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 498,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Chain Total ",
                                    parseFloat(chainTotalStaked).toFixed(0),
                                    " ONBT ",
                                    isHubChain !== undefined ? isHubChain ? '· Hub' : '· Spoke' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 499,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 496,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex flex-wrap gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1",
                children: [
                    'stake',
                    'manage',
                    'rewards',
                    'delegate'
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab),
                        className: `rounded-xl px-4 py-2 font-medium transition-all ${activeTab === tab ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(2,132,199,0.28)]' : 'text-[color:var(--brand-ink)]/60 hover:text-[color:var(--brand-leaf)]'}`,
                        children: tab.charAt(0).toUpperCase() + tab.slice(1)
                    }, tab, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 506,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            activeTab === 'stake' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount to Stake"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 524,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: stakeAmount,
                                onChange: (e)=>setStakeAmount(e.target.value),
                                placeholder: "0.0",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 527,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            "Available ",
                                            parseFloat(userBalance).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 535,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setStakeAmount(userBalance),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: "Max"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 534,
                                columnNumber: 13
                            }, this),
                            minStakeAmount !== '0' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                children: [
                                    "Minimum stake: ",
                                    parseFloat(minStakeAmount).toLocaleString(),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 544,
                                columnNumber: 15
                            }, this),
                            belowMinStake && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Amount is below minimum stake of ",
                                    parseFloat(minStakeAmount).toLocaleString(),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 549,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 523,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Select Lockup Period"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 556,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCKUP_INFO"].map((lockup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedLockup(lockup.period),
                                        className: `p-4 rounded-lg border-2 transition-all ${selectedLockup === lockup.period ? 'border-[color:var(--brand-leaf)] bg-[color:var(--brand-cream)] shadow-[0_12px_24px_rgba(16,185,129,0.16)]' : 'border-[color:var(--brand-leaf)]/40 hover:border-[color:var(--brand-forest)]/70 bg-[color:var(--brand-cream)]/55'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: lockup.label
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 570,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-[color:var(--brand-forest)] font-bold mt-1",
                                                children: [
                                                    lockup.bonus,
                                                    " Rewards"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 571,
                                                columnNumber: 19
                                            }, this),
                                            lockup.days > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60 mt-1",
                                                children: [
                                                    lockup.days,
                                                    " days"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 575,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, lockup.period, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 555,
                        columnNumber: 11
                    }, this),
                    needsApproval && stakeAmount && parseFloat(stakeAmount) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleApprove,
                        disabled: isApproving || !canWriteStaking || isPaused,
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                        children: isApproving ? 'Approving...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Approve ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 585,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleStake,
                        disabled: isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0 || !canWriteStaking || isPaused || !!belowMinStake,
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                        children: isStaking ? 'Staking...' : isPaused ? 'Paused' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Stake ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 593,
                        columnNumber: 13
                    }, this),
                    isStakeSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Tokens staked successfully!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 610,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 609,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 522,
                columnNumber: 9
            }, this),
            activeTab === 'manage' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-3 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Your Stake Details"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 620,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Staked Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 623,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                                children: [
                                                    parseFloat(userStakeAmount).toFixed(4),
                                                    " ONBT"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 622,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Lockup"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 627,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCKUP_INFO"][userLockup]?.label || 'None'
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 628,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 631,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `rounded-full border px-2.5 py-1 font-semibold ${isLocked ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'}`,
                                                children: isLocked ? '🔒 Locked' : '✓ Unlocked'
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 632,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, this),
                                    lockupEndTime > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                                children: "Unlocks"
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 638,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                                children: new Date(lockupEndTime * 1000).toLocaleDateString()
                                            }, void 0, false, {
                                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                                lineNumber: 639,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 637,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 621,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 619,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Amount to Unstake"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 648,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: unstakeAmount,
                                onChange: (e)=>setUnstakeAmount(e.target.value),
                                placeholder: "0.0",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80 text-lg"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 651,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-xs text-[color:var(--brand-ink)]/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/75",
                                        children: [
                                            "Staked ",
                                            parseFloat(userStakeAmount).toFixed(4),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 659,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setUnstakeAmount(userStakeAmount),
                                        className: "rounded-full border border-[color:var(--brand-leaf)]/35 bg-[color:var(--brand-cream)] px-2.5 py-1 font-semibold text-[color:var(--brand-forest)]",
                                        children: "Max"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 660,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 658,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 647,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleUnstake,
                        disabled: isUnstaking || isLocked || !unstakeAmount || parseFloat(unstakeAmount) <= 0 || !canWriteStaking,
                        className: "w-full rounded-xl bg-rose-500 text-white font-medium py-4 transition-all hover:brightness-110 disabled:opacity-50",
                        children: isUnstaking ? 'Unstaking...' : isLocked ? 'Locked - Cannot Unstake' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Unstake ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 669,
                        columnNumber: 11
                    }, this),
                    isUnstakeSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Tokens unstaked successfully!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 685,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 684,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 618,
                columnNumber: 9
            }, this),
            activeTab === 'rewards' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Pending Rewards"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 695,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-4 rounded-2xl border border-slate-900/12 bg-white px-4 py-2 text-4xl font-bold text-[color:var(--brand-forest)]",
                                children: [
                                    parseFloat(userRewards).toFixed(6),
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 696,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                children: [
                                    "APY: 10% base + ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCKUP_INFO"][userLockup]?.bonus || '1x',
                                    " lockup multiplier"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 699,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 694,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClaim,
                                disabled: isClaiming || parseFloat(userRewards) <= 0 || !canWriteStaking,
                                className: "brand-button text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                                children: isClaiming ? 'Claiming...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Claim Rewards'
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 705,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCompound,
                                disabled: isCompounding || parseFloat(userRewards) <= 0 || !canWriteStaking,
                                className: "w-full rounded-xl bg-amber-500 text-slate-950 font-medium py-4 transition-all hover:brightness-110 disabled:opacity-50",
                                children: isCompounding ? 'Compounding...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Compound'
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 712,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 704,
                        columnNumber: 11
                    }, this),
                    (isClaimSuccess || isCompoundSuccess) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: [
                                "✓ ",
                                isClaimSuccess ? 'Rewards claimed!' : 'Rewards compounded!'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 723,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 722,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-lg p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                            children: "💡 Tip: Compounding automatically restakes your rewards, maximizing your returns through compound interest."
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 730,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 729,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 693,
                columnNumber: 9
            }, this),
            activeTab === 'delegate' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                                children: "Delegation"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 739,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-sm font-semibold text-[color:var(--brand-ink)]/75",
                                children: "Delegate your voting power to participate in governance without moving your tokens."
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 740,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 738,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Delegate Address"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 746,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: delegateAddress,
                                onChange: (e)=>setDelegateAddress(e.target.value),
                                placeholder: "0x...",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 749,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/70",
                                children: "Enter the address you want to delegate your voting power to, or use your own address to vote directly."
                            }, void 0, false, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 756,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 745,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDelegate,
                        disabled: isDelegating || !delegateAddress || !canWriteStaking,
                        className: "brand-button w-full text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50",
                        children: isDelegating ? 'Delegating...' : !isWalletOnSelectedChain ? `Switch to ${isOnBase ? 'Base' : 'Arbitrum'}` : 'Delegate Votes'
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 762,
                        columnNumber: 11
                    }, this),
                    isDelegateSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: "✓ Voting power delegated successfully!"
                        }, void 0, false, {
                            fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                            lineNumber: 772,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 771,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-highlight-bar mt-6 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/10 bg-white/92 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                        children: "📊 Omnichain Stats"
                    }, void 0, false, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 780,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                        children: "This Chain"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 783,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ml-2 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                        children: [
                                            parseFloat(chainTotalStaked).toFixed(0),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 784,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 782,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold text-[color:var(--brand-ink)]/70",
                                        children: "All Chains"
                                    }, void 0, false, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 787,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ml-2 rounded-full border border-slate-900/10 bg-white/90 px-2.5 py-1 font-semibold",
                                        children: [
                                            parseFloat(globalStaked).toFixed(0),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                                lineNumber: 786,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/staking/ui/StakingInterface.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/staking/ui/StakingInterface.tsx",
        lineNumber: 432,
        columnNumber: 5
    }, this);
}
}),
"[project]/features/governance/ui/GovernanceInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GovernanceInterface",
    ()=>GovernanceInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBlockNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useBlockNumber.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-ssr] (ecmascript)");
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
function GovernanceInterface() {
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [proposalIdInput, setProposalIdInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [voteChoice, setVoteChoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    // Keep first paint deterministic across SSR/client, then sync to connected wallet chain.
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(8453);
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (chain?.id === 8453 || chain?.id === 42161) {
            setSelectedChainId(chain.id);
        }
    }, [
        chain?.id
    ]);
    const governorAddress = selectedChainId === 42161 ? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ARBITRUM_ADDRESS"] : __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_BASE_ADDRESS"];
    const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
    const parsedProposalId = proposalIdInput.trim() ? BigInt(proposalIdInput.trim()) : null;
    const { data: currentBlock } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBlockNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBlockNumber"])({
        chainId: selectedChainId,
        query: {
            refetchInterval: 10_000
        }
    });
    const { data: governorName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'name',
        query: {
            refetchInterval: 60_000,
            enabled: isSupportedChain
        }
    });
    const { data: votingPower, refetch: refetchVotingPower } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'getVotes',
        args: address && currentBlock ? [
            address,
            currentBlock
        ] : undefined,
        query: {
            refetchInterval: 30_000,
            enabled: !!address && !!currentBlock && isSupportedChain
        }
    });
    const { data: proposalState, refetch: refetchProposalState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'state',
        args: parsedProposalId !== null ? [
            parsedProposalId
        ] : undefined,
        query: {
            refetchInterval: 20_000,
            enabled: parsedProposalId !== null && isSupportedChain
        }
    });
    const { data: proposalVotes, refetch: refetchProposalVotes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'proposalVotes',
        args: parsedProposalId !== null ? [
            parsedProposalId
        ] : undefined,
        query: {
            refetchInterval: 20_000,
            enabled: parsedProposalId !== null && isSupportedChain
        }
    });
    const { data: hasVoted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: governorAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
        functionName: 'hasVoted',
        args: parsedProposalId !== null && address ? [
            parsedProposalId,
            address
        ] : undefined,
        query: {
            refetchInterval: 20_000,
            enabled: parsedProposalId !== null && !!address && isSupportedChain
        }
    });
    const { data: voteTxHash, error: voteError, isPending: isVoting, writeContract: writeVote, reset: resetVote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isVoteConfirming, isSuccess: isVoteConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: voteTxHash
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
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Governance vote',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: governorAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
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
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_GOVERNOR_ABI"],
            functionName: 'castVote',
            args: [
                parsedProposalId,
                voteChoice
            ]
        });
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (isVoteConfirmed) {
            refetchVotingPower();
            refetchProposalState();
            refetchProposalVotes();
        }
    }, [
        isVoteConfirmed,
        refetchVotingPower,
        refetchProposalState,
        refetchProposalVotes
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (voteError) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'governance',
                stage: 'error',
                errorMessage: voteError.message,
                txHash: voteTxHash,
                explorerBaseUrl
            });
            return;
        }
        if (isVoting) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'governance',
                stage: 'pending',
                txHash: voteTxHash,
                explorerBaseUrl
            });
            return;
        }
        if (isVoteConfirming && voteTxHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'governance',
                stage: 'confirming',
                txHash: voteTxHash,
                explorerBaseUrl
            });
            return;
        }
        if (isVoteConfirmed && voteTxHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'governance',
                stage: 'success',
                txHash: voteTxHash,
                explorerBaseUrl
            });
        }
    }, [
        voteError,
        isVoting,
        isVoteConfirming,
        isVoteConfirmed,
        voteTxHash,
        explorerBaseUrl
    ]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-governance module-grid-bg scanline-panel max-w-4xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Governance Rail"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "DAO Governance"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "Vote Live"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-rail mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-rail-dot"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Proposal Intel"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Vote Execution"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Use case chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        label: "Voting wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card mb-6 grid grid-cols-1 gap-3 rounded-xl px-3 py-3 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                        children: votingPower ? `${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(votingPower)).toLocaleString(undefined, {
                            maximumFractionDigits: 4
                        })} ONBT` : '0 ONBT'
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                        children: [
                            governorName || 'Governor',
                            " · ",
                            `${governorAddress.slice(0, 6)}...${governorAddress.slice(-4)}`
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-[color:var(--brand-ink)]",
                        children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card motion-card p-4 rounded-xl mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-semibold text-[color:var(--brand-ink)]",
                        children: "Vote on Proposal"
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    !isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                        children: "Connect wallet to Base (8453) or Arbitrum (42161) to vote."
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-left text-sm font-semibold text-amber-800",
                                children: "Wallet chain differs from selected chain. Click Cast Vote to switch wallet to the selected network."
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 265,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: proposalIdInput,
                                        onChange: (e)=>setProposalIdInput(e.target.value.replace(/[^0-9]/g, '')),
                                        placeholder: "Proposal ID",
                                        className: "px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80"
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        "aria-label": "Vote choice",
                                        value: voteChoice,
                                        onChange: (e)=>setVoteChoice(Number(e.target.value)),
                                        className: "px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] bg-[color:var(--brand-cream)]/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 0,
                                                children: "Against"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 1,
                                                children: "For"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 2,
                                                children: "Abstain"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 285,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCastVote,
                                        disabled: !address || isVoting || isVoteConfirming || !proposalIdInput,
                                        className: "brand-button text-white font-medium px-4 py-3 rounded-lg disabled:opacity-60",
                                        children: isVoting || isVoteConfirming ? 'Submitting Vote...' : !isWalletOnSelectedChain ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}` : 'Cast Vote'
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-4 gap-3 mb-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "Proposal State"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: proposalStateLabel
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "For Votes"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: proposalVotes ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(proposalVotes[1])).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2
                                                }) : '--'
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "Against Votes"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: proposalVotes ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(proposalVotes[0])).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2
                                                }) : '--'
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "brand-pill brand-pill-soft justify-between rounded-lg p-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[color:var(--brand-ink)]/60",
                                                children: "You Voted"
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 319,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-[color:var(--brand-ink)]",
                                                children: hasVoted ? 'Yes' : 'No'
                                            }, void 0, false, {
                                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                                lineNumber: 320,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            voteTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                                href: `${explorerBaseUrl}/tx/${voteTxHash}`,
                                className: "inline-flex mt-2 text-sm text-[color:var(--brand-forest)] hover:underline",
                                children: "View vote transaction"
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 325,
                                columnNumber: 15
                            }, this),
                            voteError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                                children: voteError.message
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 333,
                                columnNumber: 15
                            }, this),
                            validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 rounded-lg border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left font-semibold text-rose-700",
                                        children: validationError
                                    }, void 0, false, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 337,
                                        columnNumber: 17
                                    }, this),
                                    preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "mt-1 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                                        children: [
                                            "Decoded reason: ",
                                            preflightDetail.decodedReason
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                        lineNumber: 339,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 336,
                                columnNumber: 15
                            }, this),
                            isVoteConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                                children: "Vote confirmed."
                            }, void 0, false, {
                                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                                lineNumber: 344,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-stat-card rounded-lg p-4 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                    children: "Governance reads/writes are now bound directly to ONBT governor contracts on both Base and Arbitrum. Enter a proposal ID to view state/votes and cast your vote."
                }, void 0, false, {
                    fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                    lineNumber: 351,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-highlight-bar mt-6 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                        children: "🌐 Omnichain Governance"
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "w-full rounded-2xl border border-slate-900/10 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-[color:var(--brand-ink)]/75",
                        children: "Your votes are aggregated across all chains via LayerZero V2. Stake ONBT on any chain to gain voting power that works everywhere!"
                    }, void 0, false, {
                        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/governance/ui/GovernanceInterface.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
}),
"[project]/features/privateSale/ui/PrivateSaleInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivateSaleInterface",
    ()=>PrivateSaleInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transactions/actionPreflight.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/txStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChainSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MiniAppExternalLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletIdentityBadge.tsx [app-ssr] (ecmascript)");
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
    const { address, chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(chain?.id === 42161 ? 42161 : 8453);
    const [paymentAsset, setPaymentAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('ETH');
    const [payAmount, setPayAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [recipient, setRecipient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [validationError, setValidationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preflightDetail, setPreflightDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timeNow, setTimeNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    const [txMode, setTxMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('buy');
    const { data: txHash, error: writeError, isPending, writeContract, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const t = setInterval(()=>setTimeNow(Date.now()), 1000);
        return ()=>clearInterval(t);
    }, []);
    const hasBaseSaleAddress = !!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIVATE_SALE_ADDRESSES"][8453];
    const hasArbitrumSaleAddress = !!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIVATE_SALE_ADDRESSES"][42161];
    const hasSaleContractsConfigured = hasBaseSaleAddress && hasArbitrumSaleAddress;
    const isSupportedChain = selectedChainId === 8453 || selectedChainId === 42161;
    const isWalletOnSelectedChain = chain?.id === selectedChainId;
    const activeSaleAddress = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIVATE_SALE_ADDRESSES"][selectedChainId] || undefined;
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: selectedChainId
    });
    const saleContractConfiguredForChain = !!activeSaleAddress;
    const paymentTokens = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIVATE_SALE_PAYMENT_TOKENS"][selectedChainId];
    const paymentTokenAddress = paymentAsset === 'ETH' ? undefined : paymentAsset === 'USDC' ? paymentTokens?.USDC : paymentTokens?.USDT;
    const explorerBaseUrl = selectedChainId === 42161 ? 'https://arbiscan.io' : 'https://basescan.org';
    const explorerTxBaseUrl = `${explorerBaseUrl}/tx/`;
    const { data: saleStart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'saleStart',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const { data: saleEnd } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'saleEnd',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const { data: remainingTokens, refetch: refetchRemainingTokens } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'remainingTokens',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 15_000
        }
    });
    const { data: saleAllocation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'saleAllocation',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 60_000
        }
    });
    const { data: totalSold } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'totalSold',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 15_000
        }
    });
    const { data: saleContractPaused } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
        functionName: 'paused',
        query: {
            enabled: saleContractConfiguredForChain,
            refetchInterval: 30_000
        }
    });
    const isPaused = !!saleContractPaused;
    const { data: purchased, refetch: refetchPurchased } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
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
    const { data: tokenDecimals } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: paymentTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
        functionName: 'decimals',
        query: {
            refetchInterval: 30_000,
            enabled: isTokenPayment && !!paymentTokenAddress
        }
    });
    const decimals = Number(tokenDecimals ?? PAYMENT_CONFIG[paymentAsset].defaultDecimals);
    const amountIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!payAmount || Number(payAmount) <= 0) return 0n;
        try {
            return paymentAsset === 'ETH' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEther"])(payAmount) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(payAmount, decimals);
        } catch  {
            return 0n;
        }
    }, [
        payAmount,
        paymentAsset,
        decimals
    ]);
    // quotePurchase is only valid for ERC-20 payment tokens — ETH uses buyWithETH, which has no quote.
    // Passing the zero address for ETH causes a contract revert → never enable for ETH.
    const { data: quoteOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: activeSaleAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
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
    const { data: paymentBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: paymentTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
        functionName: 'balanceOf',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: isTokenPayment && !!address && !!paymentTokenAddress,
            refetchInterval: 15_000
        }
    });
    const { data: allowance, refetch: refetchAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        chainId: selectedChainId,
        address: paymentTokenAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
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
    const recipientValid = !!recipientAddress && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(recipientAddress);
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
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Private sale approval',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: {
                address: paymentTokenAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
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
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC20_PAYMENT_ABI"],
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
        const preflight = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transactions$2f$actionPreflight$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runActionPreflight"])({
            actionLabel: 'Private sale purchase',
            account: address,
            connectedChainId: chain?.id,
            targetChainId: selectedChainId,
            publicClient,
            request: paymentAsset === 'ETH' ? {
                address: activeSaleAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
                functionName: 'buyWithETH',
                args: [
                    recipientAddress
                ],
                value: amountIn
            } : {
                address: activeSaleAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
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
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
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
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ONBT_PRIVATE_SALE_ABI"],
            functionName: 'buyWithToken',
            args: [
                paymentTokenAddress,
                amountIn,
                recipientAddress
            ]
        });
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!isConfirmed) return;
        refetchRemainingTokens();
        refetchPurchased();
        if (txMode === 'approve') {
            refetchAllowance();
        }
    }, [
        isConfirmed,
        txMode,
        refetchAllowance,
        refetchRemainingTokens,
        refetchPurchased
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (writeError) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'private-sale',
                stage: 'error',
                errorMessage: writeError.message,
                explorerBaseUrl
            });
            return;
        }
        if (isPending) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'private-sale',
                stage: 'pending',
                txHash,
                explorerBaseUrl
            });
            return;
        }
        if (isConfirming && txHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'private-sale',
                stage: 'confirming',
                txHash,
                explorerBaseUrl
            });
            return;
        }
        if (isConfirmed && txHash) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$txStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishGlobalTxStatus"])({
                source: 'private-sale',
                stage: 'success',
                txHash,
                explorerBaseUrl
            });
        }
    }, [
        writeError,
        isPending,
        isConfirming,
        isConfirmed,
        txHash,
        explorerBaseUrl
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brand-card module-shell module-shell-sale module-grid-bg scanline-panel max-w-3xl mx-auto p-6 bg-[color:var(--brand-cream)]/90 rounded-2xl shadow-lg border border-[color:var(--brand-leaf)]/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-sky-900/15 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700",
                                children: "Sale Window"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-slate-900/12 bg-white px-3 py-1 text-xs font-semibold text-slate-900",
                                children: "ONBT Private Sale"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-full border border-cyan-300/35 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-950",
                                children: "Multi Asset"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-rail mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-rail-dot"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Guarded Window"
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 385,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: "Recipient Verified"
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900",
                                        children: selectedChainId === 8453 ? 'Base' : 'Arbitrum'
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChainSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainSelector"], {
                        label: "Use case chain",
                        selectedChainId: selectedChainId,
                        onSelectChain: setSelectedChainId
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletIdentityBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletIdentityBadge"], {
                        address: address,
                        className: "mt-3",
                        label: "Purchase wallet"
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 376,
                columnNumber: 7
            }, this),
            !hasSaleContractsConfigured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4 text-sm text-amber-100",
                children: "Set `NEXT_PUBLIC_ONBT_PRIVATE_SALE_BASE_ADDRESS` and `NEXT_PUBLIC_ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS` in miniapp env to enable purchases."
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 401,
                columnNumber: 9
            }, this),
            !chain && hasSaleContractsConfigured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-sky-400/35 bg-sky-500/10 p-4 text-sm text-sky-100",
                children: "Connect your wallet to activate the private sale flow."
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 407,
                columnNumber: 9
            }, this),
            chain && isSupportedChain && !saleContractConfiguredForChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-amber-400/35 bg-amber-500/10 p-4 text-sm text-amber-100",
                children: "Private sale contract is not configured for the selected chain."
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 413,
                columnNumber: 9
            }, this),
            chain && !isWalletOnSelectedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-sky-400/35 bg-sky-500/10 p-4 text-sm text-sky-100",
                children: [
                    "Wallet chain and selected chain differ. Click Approve/Buy to switch wallet to ",
                    selectedChainId === 8453 ? 'Base' : 'Arbitrum',
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 419,
                columnNumber: 9
            }, this),
            chain && !isSupportedChain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4 text-sm text-rose-100",
                children: "Connect wallet to Base Mainnet (8453) or Arbitrum One (42161) to participate."
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 425,
                columnNumber: 9
            }, this),
            isPaused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-rose-400/35 bg-rose-500/10 p-4 text-sm text-rose-100 font-medium",
                children: "⛔ Private sale contract is currently paused. Purchases are temporarily disabled."
            }, void 0, false, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 431,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-tile motion-card p-4 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-forest)]",
                                children: isPaused ? '⏸️ Paused' : saleNotStarted ? 'Not Started' : saleEnded ? 'Ended' : saleActive ? 'Active' : 'Unknown'
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 438,
                                columnNumber: 11
                            }, this),
                            saleNotStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Starts in ",
                                    formatCountdown(startsIn)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 441,
                                columnNumber: 30
                            }, this),
                            saleActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Ends in ",
                                    formatCountdown(endsIn)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 442,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 437,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-stat-card p-4 rounded-lg",
                        children: [
                            saleAllocation && saleAllocation > 0n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-ink)]",
                                        children: [
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(totalSold ?? 0n)).toLocaleString(undefined, {
                                                maximumFractionDigits: 2
                                            }),
                                            " /",
                                            ' ',
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(saleAllocation)).toLocaleString(undefined, {
                                                maximumFractionDigits: 0
                                            }),
                                            " ONBT"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("progress", {
                                        className: "mt-2 w-full h-1.5 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[color:var(--brand-leaf)]/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[color:var(--brand-forest)] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[color:var(--brand-forest)]",
                                        value: Number(totalSold ?? 0n),
                                        max: Number(saleAllocation)
                                    }, void 0, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-slate-900/10 bg-white/92 px-4 py-4 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    "Remaining: ",
                                    remainingTokens ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(remainingTokens)).toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    }) : '--',
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 459,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "You purchased: ",
                                    purchased ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(purchased)).toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    }) : '0',
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Payment Asset"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 471,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 rounded-2xl border border-[color:var(--brand-leaf)]/20 bg-[color:var(--brand-cream)]/55 p-1",
                                children: [
                                    'ETH',
                                    'USDC',
                                    'USDT'
                                ].map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPaymentAsset(asset),
                                        className: `flex-1 px-4 py-2 rounded-xl border transition-all ${paymentAsset === asset ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 border-orange-300 shadow-[0_10px_20px_rgba(245,158,11,0.25)]' : 'bg-[color:var(--brand-cream)]/70 border-[color:var(--brand-leaf)]/40 text-[color:var(--brand-ink)]/80 hover:border-[color:var(--brand-forest)]/40'}`,
                                        children: asset
                                    }, asset, false, {
                                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 470,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: [
                                    "Amount (",
                                    PAYMENT_CONFIG[paymentAsset].symbol,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 491,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                value: payAmount,
                                onChange: (e)=>setPayAmount(e.target.value),
                                placeholder: "0.0",
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this),
                            isTokenPayment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: [
                                    "Wallet ",
                                    paymentAsset,
                                    ": ",
                                    paymentBalance ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(paymentBalance, decimals)).toLocaleString(undefined, {
                                        maximumFractionDigits: 4
                                    }) : '--'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 text-sm font-semibold text-[color:var(--brand-ink)]/80",
                                children: "Recipient"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: recipient,
                                onChange: (e)=>setRecipient(e.target.value),
                                placeholder: address || '0x...',
                                className: "w-full px-4 py-3 border border-[color:var(--brand-leaf)]/40 rounded-lg focus:ring-2 focus:ring-[color:var(--brand-forest)] focus:border-transparent bg-[color:var(--brand-cream)]/80"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-1 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "Leave empty to buy for connected wallet."
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 519,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-highlight-bar rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mb-2 rounded-full border border-slate-900/12 bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-ink)]/75",
                                children: "Estimated ONBT Out"
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-2 text-left font-semibold text-[color:var(--brand-ink)]",
                                children: [
                                    quoteOut ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(quoteOut)).toLocaleString(undefined, {
                                        maximumFractionDigits: 4
                                    }) : '--',
                                    " ONBT"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "brand-button w-full text-white font-medium py-3 rounded-lg disabled:opacity-70",
                        onClick: needsApproval ? handleApprove : handleBuy,
                        disabled: !canSubmit || isPending || isConfirming,
                        children: isPaused ? 'Sale Paused' : needsApproval ? isPending || isConfirming ? 'Processing Approval...' : !isWalletOnSelectedChain ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}` : `Approve ${paymentAsset}` : isPending || isConfirming ? 'Processing Purchase...' : !isWalletOnSelectedChain ? `Switch to ${selectedChainId === 8453 ? 'Base' : 'Arbitrum'}` : `Buy ONBT with ${paymentAsset}`
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 531,
                        columnNumber: 9
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MiniAppExternalLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniAppExternalLink"], {
                        href: `${explorerTxBaseUrl}${txHash}`,
                        className: "inline-flex text-sm text-[color:var(--brand-forest)] hover:underline",
                        children: "View transaction on explorer"
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, this),
                    writeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "w-full rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                            children: writeError.message
                        }, void 0, false, {
                            fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                            lineNumber: 563,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 562,
                        columnNumber: 11
                    }, this),
                    validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "w-full rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-700",
                                children: validationError
                            }, void 0, false, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 569,
                                columnNumber: 13
                            }, this),
                            preflightDetail?.decodedReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700",
                                children: [
                                    "Decoded: ",
                                    preflightDetail.decodedReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                                lineNumber: 570,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 568,
                        columnNumber: 11
                    }, this),
                    isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-3 text-sm text-emerald-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700",
                            children: txMode === 'approve' ? 'Approval confirmed.' : 'Purchase confirmed.'
                        }, void 0, false, {
                            fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                            lineNumber: 576,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                        lineNumber: 575,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/privateSale/ui/PrivateSaleInterface.tsx",
        lineNumber: 375,
        columnNumber: 5
    }, this);
}
}),
"[project]/features/bridge/slice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bridgeFeatureSlice",
    ()=>bridgeFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/bridge/ui/BridgeInterface.tsx [app-ssr] (ecmascript)");
;
;
const bridgeFeatureSlice = {
    key: 'bridge',
    label: 'Bridge',
    icon: '🌉',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$ui$2f$BridgeInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BridgeInterface"], {}, void 0, false, {
            fileName: "[project]/features/bridge/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
}),
"[project]/features/governance/slice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "governanceFeatureSlice",
    ()=>governanceFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/governance/ui/GovernanceInterface.tsx [app-ssr] (ecmascript)");
;
;
const governanceFeatureSlice = {
    key: 'governance',
    label: 'Governance',
    icon: '🏛️',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$ui$2f$GovernanceInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GovernanceInterface"], {}, void 0, false, {
            fileName: "[project]/features/governance/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
}),
"[project]/features/privateSale/slice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "privateSaleFeatureSlice",
    ()=>privateSaleFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/ui/PrivateSaleInterface.tsx [app-ssr] (ecmascript)");
;
;
const privateSaleFeatureSlice = {
    key: 'private-sale',
    label: 'Private Sale',
    icon: '🛡️',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$ui$2f$PrivateSaleInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PrivateSaleInterface"], {}, void 0, false, {
            fileName: "[project]/features/privateSale/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
}),
"[project]/features/staking/slice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stakingFeatureSlice",
    ()=>stakingFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/staking/ui/StakingInterface.tsx [app-ssr] (ecmascript)");
;
;
const stakingFeatureSlice = {
    key: 'staking',
    label: 'Staking',
    icon: '🔒',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$ui$2f$StakingInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StakingInterface"], {}, void 0, false, {
            fileName: "[project]/features/staking/slice.tsx",
            lineNumber: 11,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
};
}),
"[project]/features/token/slice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tokenFeatureSlice",
    ()=>tokenFeatureSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/token/ui/TokenInterface.tsx [app-ssr] (ecmascript)");
;
;
const tokenFeatureSlice = {
    key: 'token',
    label: 'Token',
    icon: '💰',
    route: '/api/chains/overview',
    service: '@/lib/backend/overview',
    render: ({ quantumPrediction })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$ui$2f$TokenInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenInterface"], {
            quantumSignal: quantumPrediction?.signal,
            quantumConfidence: quantumPrediction?.confidence
        }, void 0, false, {
            fileName: "[project]/features/token/slice.tsx",
            lineNumber: 12,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
};
}),
"[project]/features/registry.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FEATURE_SLICES",
    ()=>FEATURE_SLICES,
    "FEATURE_TABS",
    ()=>FEATURE_TABS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/bridge/slice.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/governance/slice.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/privateSale/slice.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/staking/slice.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/token/slice.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
const FEATURE_SLICES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$token$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokenFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$bridge$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bridgeFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$staking$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stakingFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$governance$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["governanceFeatureSlice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$privateSale$2f$slice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["privateSaleFeatureSlice"]
];
const FEATURE_TABS = FEATURE_SLICES.map((slice)=>({
        key: slice.key,
        label: slice.label,
        icon: slice.icon
    }));
}),
"[project]/features/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$registry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/registry.tsx [app-ssr] (ecmascript)");
;
}),
];

//# sourceMappingURL=features_f6225c71._.js.map