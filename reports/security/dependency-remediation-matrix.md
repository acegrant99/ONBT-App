# Dependency Remediation Matrix

Generated: 2026-02-25T01:30:54.130Z

## Summary

- Total vulnerable packages: 100
- Critical: 0
- High: 16
- Moderate: 36
- Low: 48
- Root entries: 84
- Frontend entries: 16

## Prioritized Actions

1. Patch critical vulnerabilities immediately, starting with direct dependencies.
2. Patch high vulnerabilities with available non-breaking upgrades next.
3. For transitive-only vulnerabilities, prefer parent package upgrades or overrides with test validation.

## Matrix

| Priority | Target | Package | Severity | Type | Fix | Advisory |
|---|---|---|---|---|---|---|
| 1 | root | @coinbase/agentkit | high | direct | @coinbase/agentkit@0.1.2 | @coinbase/agentkit vulnerability |
| 2 | root | ethers | high | direct | hardhat-deploy@2.0.0 | ethers vulnerability |
| 3 | root | hardhat-deploy | high | direct | hardhat-deploy@2.0.0 | hardhat-deploy vulnerability |
| 4 | root | zksync-ethers | high | direct | zksync-ethers@6.21.1 | zksync-ethers vulnerability |
| 5 | root | @ethersproject/providers | high | transitive | hardhat-deploy@2.0.0 | @ethersproject/providers vulnerability |
| 6 | root | @solana/buffer-layout-utils | high | transitive | @coinbase/agentkit@0.1.2 | @solana/buffer-layout-utils vulnerability |
| 7 | root | @solana/spl-token | high | transitive | @coinbase/agentkit@0.1.2 | @solana/spl-token vulnerability |
| 8 | root | axios | high | transitive | hardhat-deploy@2.0.0 | [Axios Cross-Site Request Forgery Vulnerability](https://github.com/advisories/GHSA-wf5p-g6vw-rhxx) |
| 9 | root | bigint-buffer | high | transitive | @coinbase/agentkit@0.1.2 | [bigint-buffer Vulnerable to Buffer Overflow via toBigIntLE() Function](https://github.com/advisories/GHSA-3gc7-fjrx-p6mg) |
| 10 | root | eth-lib | high | transitive | yes | eth-lib vulnerability |
| 11 | root | minimatch | high | transitive | yes | [minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern](https://github.com/advisories/GHSA-3ppc-4f35-3m26) |
| 12 | root | swarm-js | high | transitive | yes | swarm-js vulnerability |
| 13 | root | tar | high | transitive | yes | [Denial of service while parsing a tar file due to lack of folders count validation](https://github.com/advisories/GHSA-f5x3-32g6-xq36) |
| 14 | root | web3 | high | transitive | yes | web3 vulnerability |
| 15 | root | web3-bzz | high | transitive | yes | web3-bzz vulnerability |
| 16 | root | ws | high | transitive | hardhat-deploy@2.0.0 | [ws affected by a DoS when handling a request with many HTTP headers](https://github.com/advisories/GHSA-3h5v-q93c-6h6q) |
| 17 | root | @layerzerolabs/toolbox-hardhat | moderate | direct | @layerzerolabs/toolbox-hardhat@0.1.7 | @layerzerolabs/toolbox-hardhat vulnerability |
| 18 | root | @nomicfoundation/hardhat-verify | moderate | direct | @nomicfoundation/hardhat-verify@3.0.10 | @nomicfoundation/hardhat-verify vulnerability |
| 19 | root | hardhat | moderate | direct | hardhat@3.1.9 | hardhat vulnerability |
| 20 | root | solidity-coverage | moderate | direct | solidity-coverage@0.8.0 | solidity-coverage vulnerability |
| 21 | frontend | vite | moderate | direct | vite@7.3.1 | vite vulnerability |
| 22 | root | @layerzerolabs/devtools-evm | moderate | transitive | @layerzerolabs/toolbox-hardhat@0.1.7 | @layerzerolabs/devtools-evm vulnerability |
| 23 | root | @layerzerolabs/devtools-evm-hardhat | moderate | transitive | yes | @layerzerolabs/devtools-evm-hardhat vulnerability |
| 24 | root | @safe-global/protocol-kit | moderate | transitive | yes | @safe-global/protocol-kit vulnerability |
| 25 | root | @zerodev/intent | moderate | transitive | @coinbase/agentkit@0.1.2 | @zerodev/intent vulnerability |
| 26 | root | @zerodev/multi-chain-ecdsa-validator | moderate | transitive | @coinbase/agentkit@0.1.2 | @zerodev/multi-chain-ecdsa-validator vulnerability |
| 27 | root | ajv | moderate | transitive | yes | [ajv has ReDoS when using `$data` option](https://github.com/advisories/GHSA-2g4f-4pwh-qvx6) |
| 28 | root | bn.js | moderate | transitive | solidity-coverage@0.8.0 | [bn.js affected by an infinite loop](https://github.com/advisories/GHSA-378v-28hj-76wf) |
| 29 | frontend | esbuild | moderate | transitive | vite@7.3.1 | [esbuild enables any website to send any requests to the development server and read the response](https://github.com/advisories/GHSA-67mh-4wv8-2f99) |
| 30 | root | ethjs-unit | moderate | transitive | yes | ethjs-unit vulnerability |
| 31 | root | merkletreejs | moderate | transitive | @coinbase/agentkit@0.1.2 | merkletreejs vulnerability |
| 32 | root | number-to-bn | moderate | transitive | solidity-coverage@0.8.0 | number-to-bn vulnerability |
| 33 | root | request | moderate | transitive | yes | [Server-Side Request Forgery in Request](https://github.com/advisories/GHSA-p8p7-x288-28g6) |
| 34 | root | servify | moderate | transitive | yes | servify vulnerability |
| 35 | root | undici | moderate | transitive | @nomicfoundation/hardhat-verify@3.0.10 | [Undici has an unbounded decompression chain in HTTP responses on Node.js Fetch API via Content-Encoding leads to resource exhaustion](https://github.com/advisories/GHSA-g9mf-h72j-4rw9) |
| 36 | root | web3-core | moderate | transitive | yes | web3-core vulnerability |
| 37 | root | web3-core-helpers | moderate | transitive | yes | web3-core-helpers vulnerability |
| 38 | root | web3-core-method | moderate | transitive | yes | web3-core-method vulnerability |
| 39 | root | web3-core-requestmanager | moderate | transitive | yes | web3-core-requestmanager vulnerability |
| 40 | root | web3-core-subscriptions | moderate | transitive | yes | [web3-core-subscriptions has a Prototype Pollution vulnerability](https://github.com/advisories/GHSA-hhf6-3xpg-pggx) |
| 41 | root | web3-eth | moderate | transitive | yes | web3-eth vulnerability |
| 42 | root | web3-eth-abi | moderate | transitive | yes | web3-eth-abi vulnerability |
| 43 | root | web3-eth-accounts | moderate | transitive | yes | web3-eth-accounts vulnerability |
| 44 | root | web3-eth-contract | moderate | transitive | yes | web3-eth-contract vulnerability |
| 45 | root | web3-eth-ens | moderate | transitive | yes | web3-eth-ens vulnerability |
| 46 | root | web3-eth-iban | moderate | transitive | yes | web3-eth-iban vulnerability |
| 47 | root | web3-eth-personal | moderate | transitive | yes | web3-eth-personal vulnerability |
| 48 | root | web3-net | moderate | transitive | yes | web3-net vulnerability |
| 49 | root | web3-providers-http | moderate | transitive | yes | web3-providers-http vulnerability |
| 50 | root | web3-providers-ipc | moderate | transitive | yes | web3-providers-ipc vulnerability |
| 51 | root | web3-providers-ws | moderate | transitive | yes | web3-providers-ws vulnerability |
| 52 | root | web3-utils | moderate | transitive | solidity-coverage@0.8.0 | web3-utils vulnerability |
| 53 | root | @coinbase/coinbase-sdk | low | direct | @coinbase/agentkit@0.1.2 | @coinbase/coinbase-sdk vulnerability |
| 54 | root | @layerzerolabs/oapp-evm | low | direct | no | @layerzerolabs/oapp-evm vulnerability |
| 55 | root | @nomicfoundation/hardhat-network-helpers | low | direct | @nomicfoundation/hardhat-network-helpers@3.0.3 | @nomicfoundation/hardhat-network-helpers vulnerability |
| 56 | root | @uniswap/v3-sdk | low | direct | no | @uniswap/v3-sdk vulnerability |
| 57 | frontend | ethers | low | direct | ethers@6.16.0 | ethers vulnerability |
| 58 | root | hardhat-gas-reporter | low | direct | hardhat-gas-reporter@1.0.10 | hardhat-gas-reporter vulnerability |
| 59 | root | @ethereumjs/common | low | transitive | yes | @ethereumjs/common vulnerability |
| 60 | root | @ethereumjs/tx | low | transitive | yes | @ethereumjs/tx vulnerability |
| 61 | root | @ethersproject/abi | low | transitive | hardhat-gas-reporter@1.0.10 | @ethersproject/abi vulnerability |
| 62 | frontend | @ethersproject/abi | low | transitive | ethers@6.16.0 | @ethersproject/abi vulnerability |
| 63 | root | @ethersproject/abstract-provider | low | transitive | hardhat-gas-reporter@1.0.10 | @ethersproject/abstract-provider vulnerability |
| 64 | frontend | @ethersproject/abstract-provider | low | transitive | ethers@6.16.0 | @ethersproject/abstract-provider vulnerability |
| 65 | root | @ethersproject/abstract-signer | low | transitive | hardhat-gas-reporter@1.0.10 | @ethersproject/abstract-signer vulnerability |
| 66 | frontend | @ethersproject/abstract-signer | low | transitive | ethers@6.16.0 | @ethersproject/abstract-signer vulnerability |
| 67 | root | @ethersproject/contracts | low | transitive | @layerzerolabs/toolbox-hardhat@0.1.7 | @ethersproject/contracts vulnerability |
| 68 | frontend | @ethersproject/contracts | low | transitive | ethers@6.16.0 | @ethersproject/contracts vulnerability |
| 69 | root | @ethersproject/hash | low | transitive | hardhat-gas-reporter@1.0.10 | @ethersproject/hash vulnerability |
| 70 | frontend | @ethersproject/hash | low | transitive | ethers@6.16.0 | @ethersproject/hash vulnerability |
| 71 | root | @ethersproject/hdnode | low | transitive | yes | @ethersproject/hdnode vulnerability |
| 72 | frontend | @ethersproject/hdnode | low | transitive | yes | @ethersproject/hdnode vulnerability |
| 73 | root | @ethersproject/json-wallets | low | transitive | yes | @ethersproject/json-wallets vulnerability |
| 74 | frontend | @ethersproject/json-wallets | low | transitive | yes | @ethersproject/json-wallets vulnerability |
| 75 | frontend | @ethersproject/providers | low | transitive | yes | @ethersproject/providers vulnerability |
| 76 | root | @ethersproject/signing-key | low | transitive | hardhat-gas-reporter@1.0.10 | @ethersproject/signing-key vulnerability |
| 77 | frontend | @ethersproject/signing-key | low | transitive | ethers@6.16.0 | @ethersproject/signing-key vulnerability |
| 78 | root | @ethersproject/transactions | low | transitive | hardhat-gas-reporter@1.0.10 | @ethersproject/transactions vulnerability |
| 79 | frontend | @ethersproject/transactions | low | transitive | ethers@6.16.0 | @ethersproject/transactions vulnerability |
| 80 | root | @ethersproject/wallet | low | transitive | yes | @ethersproject/wallet vulnerability |
| 81 | frontend | @ethersproject/wallet | low | transitive | yes | @ethersproject/wallet vulnerability |
| 82 | root | @ethersproject/wordlists | low | transitive | yes | @ethersproject/wordlists vulnerability |
| 83 | frontend | @ethersproject/wordlists | low | transitive | yes | @ethersproject/wordlists vulnerability |
| 84 | root | @layerzerolabs/evm-sdks-core | low | transitive | @layerzerolabs/toolbox-hardhat@0.1.7 | @layerzerolabs/evm-sdks-core vulnerability |
| 85 | root | @layerzerolabs/lz-evm-sdk-v1 | low | transitive | @layerzerolabs/toolbox-hardhat@0.1.7 | @layerzerolabs/lz-evm-sdk-v1 vulnerability |
| 86 | root | @layerzerolabs/lz-evm-sdk-v2 | low | transitive | yes | @layerzerolabs/lz-evm-sdk-v2 vulnerability |
| 87 | root | @layerzerolabs/lz-v2-utilities | low | transitive | @layerzerolabs/toolbox-hardhat@0.1.7 | @layerzerolabs/lz-v2-utilities vulnerability |
| 88 | root | @privy-io/public-api | low | transitive | @coinbase/agentkit@0.1.2 | @privy-io/public-api vulnerability |
| 89 | root | @sentry/node | low | transitive | hardhat@3.1.9 | @sentry/node vulnerability |
| 90 | root | cookie | low | transitive | hardhat@3.1.9 | [cookie accepts cookie name, path, and domain with out of bounds characters](https://github.com/advisories/GHSA-pxg6-pf52-xh8x) |
| 91 | root | elliptic | low | transitive | hardhat-gas-reporter@1.0.10 | [Elliptic Uses a Cryptographic Primitive with a Risky Implementation](https://github.com/advisories/GHSA-848j-6mx2-7j84) |
| 92 | frontend | elliptic | low | transitive | ethers@6.16.0 | [Elliptic Uses a Cryptographic Primitive with a Risky Implementation](https://github.com/advisories/GHSA-848j-6mx2-7j84) |
| 93 | root | ethereum-cryptography | low | transitive | @nomicfoundation/hardhat-network-helpers@3.0.3 | ethereum-cryptography vulnerability |
| 94 | root | ethereumjs-util | low | transitive | @nomicfoundation/hardhat-network-helpers@3.0.3 | ethereumjs-util vulnerability |
| 95 | root | hono | low | transitive | yes | [Hono added timing comparison hardening in basicAuth and bearerAuth](https://github.com/advisories/GHSA-gq3j-xvxp-8hrf) |
| 96 | root | qs | low | transitive | yes | [qs's arrayLimit bypass in comma parsing allows denial of service](https://github.com/advisories/GHSA-w7fw-mjwx-w883) |
| 97 | root | secp256k1 | low | transitive | @coinbase/agentkit@0.1.2 | secp256k1 vulnerability |
| 98 | root | solc | low | transitive | hardhat@3.1.9 | solc vulnerability |
| 99 | root | tmp | low | transitive | hardhat@3.1.9 | [tmp allows arbitrary temporary file / directory write via symbolic link `dir` parameter](https://github.com/advisories/GHSA-52f5-9888-hmc6) |
| 100 | root | web3-shh | low | transitive | yes | web3-shh vulnerability |
