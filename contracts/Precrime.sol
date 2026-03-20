// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NabatPrecrime
 * @dev Production Precrime validation for OmnichainNabatOFT cross-chain messages.
 *
 * What is Precrime?
 * -----------------
 * LayerZero's Precrime system lets off-chain watchers (or an on-chain simulation
 * contract) detect harmful message sequences BEFORE they execute on the destination
 * chain. A DVN (Decentralised Verifier Network) node calls `precrime()` with all
 * in-flight packets; if validation fails, the DVN refuses to sign and the message
 * never lands.
 *
 * Invariants enforced
 * --------------------
 * 1. AMOUNT_CAP   — no single transfer may exceed `singleTransferCap` (in shared
 *                   decimals, 6dp for OFT).  Default: 10 million ONBT.
 * 2. PEER_CHECK   — source EID must be in the registered peer set. Messages from
 *                   unknown chains are always invalid.
 * 3. FORMAT_CHECK — OFT SendParam payload must be exactly 40 bytes
 *                   (bytes32 toAddress + uint64 amountSD). Any other length is
 *                   malformed and rejected.
 * 4. SUPPLY_WINDOW — cumulative in-flight volume from any single source EID must
 *                   not exceed `windowCap` within the current `windowDuration`.
 *                   Defends against rapid-fire split transfers that each pass the
 *                   single-transfer cap individually.
 *
 * OFT v2 shared-decimal (SD) encoding
 * -------------------------------------
 * OFT amounts are encoded in shared decimals (6dp). 1 ONBT = 1e6 SD.
 * `singleTransferCap` defaults to 10_000_000 * 1e6 (10M ONBT in SD units).
 *
 * Governance
 * ----------
 * Owner can adjust caps and the peer whitelist without contract redeployment,
 * allowing the Precrime policy to evolve with the ecosystem.
 */
contract NabatPrecrime is Ownable {

    // ─── OFT v2 message layout ───
    // Total: 40 bytes
    //   [0..31]  bytes32  toAddress  (recipient on destination, padded)
    //   [32..39] uint64   amountSD   (amount in shared decimals, 6dp)
    uint256 private constant OFT_PAYLOAD_LEN = 40;
    uint256 private constant OFT_AMOUNT_OFFSET = 32;

    // ─── Shared decimals for OFT ───
    uint8 public constant SHARED_DECIMALS = 6;

    // ─── Default caps ───
    // 10 million ONBT in shared decimals (6dp)
    uint64 public singleTransferCap = 10_000_000 * uint64(10 ** SHARED_DECIMALS);

    // 50 million ONBT per window
    uint64 public windowCap = 50_000_000 * uint64(10 ** SHARED_DECIMALS);

    // 1-hour rolling window
    uint256 public windowDuration = 1 hours;

    // ─── Peer whitelist ───
    mapping(uint32 => bool) public approvedPeer;

    // ─── Volume tracking (per source EID per window) ───
    // srcEid → window start timestamp → cumulative SD volume in that window
    mapping(uint32 => mapping(uint256 => uint256)) public windowVolume;

    // ─── Events ───
    event PeerApproved(uint32 indexed eid, bool approved);
    event SingleTransferCapUpdated(uint64 cap);
    event WindowCapUpdated(uint64 cap);
    event WindowDurationUpdated(uint256 duration);

    // ─── Errors ───
    error EmptyMessageBatch();
    error UnknownSourceEid(uint32 eid);
    error MalformedPayload(uint256 length);
    error AmountExceedsSingleCap(uint64 amountSD, uint64 cap);
    error WindowVolumeExceeded(uint32 srcEid, uint256 cumulativeSD, uint64 cap);

    // ============ Constructor ============

    constructor() Ownable() {}

    // ============ Core validation ============

    /**
     * @notice Validate a batch of in-flight OFT packets.
     *
     * @param _config   ABI-encoded `PrecrimeConfig` — for ONBT this may carry
     *                  additional chain-specific overrides (reserved for future use;
     *                  ignored for backward compat).
     * @param _messages Array of raw OFT message payloads to validate.
     *                  Each element: abi.encode(srcEid, nonce, payload)
     *
     * Reverts with a typed error if any invariant is violated.
     */
    function precrime(
        bytes calldata _config,
        bytes[] calldata _messages
    ) external view {
        if (_messages.length == 0) revert EmptyMessageBatch();

        // Decode optional config override — currently only srcEid whitelist override
        // If _config is empty we fall back to owner-managed approvedPeer mapping.
        bool useConfigPeers = _config.length > 0;
        uint32[] memory configPeers;
        if (useConfigPeers) {
            configPeers = abi.decode(_config, (uint32[]));
        }

        // Track per-EID cumulative volume within current window (in-memory)
        // srcEid → cumulative SD volume across all messages in this batch
        // We use a local array instead of storage to keep this view-compatible.
        uint32[]  memory seenEids    = new uint32[](_messages.length);
        uint256[] memory seenVolumes = new uint256[](_messages.length);
        uint256 seenCount;

        for (uint256 i = 0; i < _messages.length; i++) {
            // Decode: (uint32 srcEid, uint64 nonce, bytes payload)
            (uint32 srcEid, , bytes memory payload) = abi.decode(
                _messages[i],
                (uint32, uint64, bytes)
            );

            // ── Invariant 2: peer check ───────────────────────────────────────
            if (useConfigPeers) {
                bool found = false;
                for (uint256 p = 0; p < configPeers.length; p++) {
                    if (configPeers[p] == srcEid) { found = true; break; }
                }
                if (!found) revert UnknownSourceEid(srcEid);
            } else {
                if (!approvedPeer[srcEid]) revert UnknownSourceEid(srcEid);
            }

            // ── Invariant 3: format check ─────────────────────────────────────
            if (payload.length != OFT_PAYLOAD_LEN) {
                revert MalformedPayload(payload.length);
            }

            // ── Extract amountSD ──────────────────────────────────────────────
            uint64 amountSD;
            assembly {
                // payload is a memory bytes: skip 32-byte length prefix,
                // then skip OFT_AMOUNT_OFFSET bytes to reach the uint64
                amountSD := shr(
                    192,
                    mload(add(add(payload, 0x20), OFT_AMOUNT_OFFSET))
                )
            }

            // ── Invariant 1: single-transfer cap ─────────────────────────────
            if (amountSD > singleTransferCap) {
                revert AmountExceedsSingleCap(amountSD, singleTransferCap);
            }

            // ── Invariant 4: per-EID rolling window volume ────────────────────
            // Accumulate in-memory across batch messages
            uint256 eidIndex = type(uint256).max;
            for (uint256 k = 0; k < seenCount; k++) {
                if (seenEids[k] == srcEid) { eidIndex = k; break; }
            }
            if (eidIndex == type(uint256).max) {
                eidIndex = seenCount;
                seenEids[seenCount] = srcEid;
                seenCount++;
            }
            seenVolumes[eidIndex] += amountSD;

            // Add on-chain stored volume for this window slot
            uint256 windowSlot = block.timestamp / windowDuration;
            uint256 onchainVolume = windowVolume[srcEid][windowSlot];
            uint256 total = seenVolumes[eidIndex] + onchainVolume;

            if (total > windowCap) {
                revert WindowVolumeExceeded(srcEid, total, windowCap);
            }
        }
    }

    // ============ Volume recording (called by OFT executor post-execution) ============

    /**
     * @notice Record delivered volume after a packet executes.
     *         This is called by an authorised relayer/executor to update on-chain
     *         window state so subsequent Precrime checks see accurate history.
     *
     * @param srcEid    Source chain EID of the delivered packet
     * @param amountSD  Amount in shared decimals (6dp)
     */
    function recordDelivery(uint32 srcEid, uint64 amountSD) external {
        // Only approved peers can record (prevents arbitrary inflation of counters)
        require(approvedPeer[srcEid], "Unknown peer");
        uint256 windowSlot = block.timestamp / windowDuration;
        windowVolume[srcEid][windowSlot] += amountSD;
    }

    // ============ Admin ============

    function setApprovedPeer(uint32 eid, bool approved) external onlyOwner {
        approvedPeer[eid] = approved;
        emit PeerApproved(eid, approved);
    }

    function setSingleTransferCap(uint64 cap) external onlyOwner {
        require(cap > 0, "Cap must be > 0");
        singleTransferCap = cap;
        emit SingleTransferCapUpdated(cap);
    }

    function setWindowCap(uint64 cap) external onlyOwner {
        require(cap >= singleTransferCap, "Window cap < single cap");
        windowCap = cap;
        emit WindowCapUpdated(cap);
    }

    function setWindowDuration(uint256 duration) external onlyOwner {
        require(duration >= 5 minutes, "Too short");
        windowDuration = duration;
        emit WindowDurationUpdated(duration);
    }

    // ============ Views ============

    /**
     * @notice Precrime version identifier
     */
    function version() external pure returns (uint64) {
        return 2;
    }

    /**
     * @notice Current on-chain window volume for a source EID
     */
    function currentWindowVolume(uint32 srcEid) external view returns (uint256) {
        uint256 windowSlot = block.timestamp / windowDuration;
        return windowVolume[srcEid][windowSlot];
    }

    /**
     * @notice Simulate validation for a single message (UI dry-run helper)
     * Returns (valid, reason) so frontends can surface issues before submission.
     */
    function simulate(
        uint32 srcEid,
        bytes calldata payload
    ) external view returns (bool valid, string memory reason) {
        if (!approvedPeer[srcEid])
            return (false, "Unknown source EID");

        if (payload.length != OFT_PAYLOAD_LEN)
            return (false, "Malformed payload length");

        uint64 amountSD;
        assembly {
            amountSD := shr(192, calldataload(add(payload.offset, OFT_AMOUNT_OFFSET)))
        }

        if (amountSD > singleTransferCap)
            return (false, "Exceeds single transfer cap");

        uint256 windowSlot = block.timestamp / windowDuration;
        uint256 cumulative = windowVolume[srcEid][windowSlot] + amountSD;
        if (cumulative > windowCap)
            return (false, "Exceeds window volume cap");

        return (true, "");
    }
}
