import { NextResponse } from 'next/server';
import {
  ONBT_TOKEN_ABI,
  ONBT_STAKING_ABI,
  ONBT_PRIVATE_SALE_ABI,
  ONBT_GOVERNOR_ABI,
  ONBT_TOKEN_ADDRESS,
  ONBT_ARBITRUM_ADDRESS,
  ONBT_STAKING_ADDRESS,
  ONBT_STAKING_ARBITRUM_ADDRESS,
  ONBT_PRIVATE_SALE_BASE_ADDRESS,
  ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS,
  ONBT_GOVERNOR_BASE_ADDRESS,
  ONBT_GOVERNOR_ARBITRUM_ADDRESS,
} from '@/config/contracts';
import { verifyPrivilegedWalletProof } from '@/lib/agentkit/walletAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_AGENTKIT_TOKEN = 'QuantumLayer';

type AbiEntry = {
  type?: string;
  name?: string;
  stateMutability?: string;
};

type ContractDescriptor = {
  key: string;
  address: `0x${string}`;
  abi: readonly unknown[];
};

function configuredToken(): string {
  return (
    process.env.AGENTKIT_ADMIN_TOKEN ||
    process.env.QUANTUM_ADMIN_TOKEN ||
    process.env.NEXT_PUBLIC_QUANTUM_ADMIN_TOKEN ||
    DEFAULT_AGENTKIT_TOKEN
  );
}

function isAuthorized(request: Request): boolean {
  const expected = configuredToken();
  const headerToken = request.headers.get('x-agentkit-admin-token')?.trim();
  const bearerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return headerToken === expected || bearerToken === expected;
}

function classifyFunctions(abi: readonly unknown[]) {
  const funcs = (abi as AbiEntry[]).filter((entry) => entry.type === 'function' && !!entry.name);
  const readFunctions = funcs
    .filter((entry) => entry.stateMutability === 'view' || entry.stateMutability === 'pure')
    .map((entry) => entry.name as string);
  const writeFunctions = funcs
    .filter((entry) => entry.stateMutability !== 'view' && entry.stateMutability !== 'pure')
    .map((entry) => entry.name as string);

  return {
    readFunctions: Array.from(new Set(readFunctions)).sort(),
    writeFunctions: Array.from(new Set(writeFunctions)).sort(),
    functionCount: funcs.length,
  };
}

function detectFeatures(contractKey: string, readFns: string[], writeFns: string[]) {
  const has = (name: string) => readFns.includes(name) || writeFns.includes(name);
  const features: string[] = [];

  if (has('balanceOf') && has('transfer')) features.push('erc20-transfers');
  if (has('quoteSend') && (has('send') || has('sendFrom'))) features.push('layerzero-bridge');
  if (has('stake') || has('unstake')) features.push('staking');
  if (has('claimRewards') || has('earned')) features.push('reward-claims');
  if (has('buyWithETH') || has('buyWithToken') || has('quotePurchase')) features.push('private-sale');
  if (has('castVote') || has('proposalVotes') || has('state')) features.push('governance');

  if (features.length === 0) features.push(`${contractKey}-generic`);
  return features;
}

function tabConfiguration(contractIndex: Record<string, ReturnType<typeof classifyFunctions>>) {
  const token = contractIndex.token;
  const staking = contractIndex.staking;
  const privateSale = contractIndex.privateSale;
  const governor = contractIndex.governor;

  return [
    {
      tab: 'token',
      requiredContracts: ['token'],
      enabledWrites: token?.writeFunctions.filter((fn) => ['transfer', 'approve'].includes(fn)) || [],
      readDependencies: token?.readFunctions.filter((fn) => ['balanceOf', 'allowance', 'name', 'symbol'].includes(fn)) || [],
      notes: ['Token tab is configured from OFT/ERC20 ABI surfaces.'],
    },
    {
      tab: 'bridge',
      requiredContracts: ['token'],
      enabledWrites: token?.writeFunctions.filter((fn) => ['send', 'sendFrom'].includes(fn)) || [],
      readDependencies: token?.readFunctions.filter((fn) => ['quoteSend', 'peers'].includes(fn)) || [],
      notes: ['Bridge tab requires LayerZero OFT send + quote functions.'],
    },
    {
      tab: 'staking',
      requiredContracts: ['staking'],
      enabledWrites: staking?.writeFunctions.filter((fn) => ['stake', 'unstake', 'claimRewards', 'compound'].includes(fn)) || [],
      readDependencies: staking?.readFunctions.filter((fn) => ['earned', 'getUserStakeInfo', 'totalStaked'].includes(fn)) || [],
      notes: ['Staking tab is aligned to ONBTOmnichainStaking methods.'],
    },
    {
      tab: 'governance',
      requiredContracts: ['governor'],
      enabledWrites: governor?.writeFunctions.filter((fn) => ['castVote'].includes(fn)) || [],
      readDependencies: governor?.readFunctions.filter((fn) => ['state', 'proposalVotes', 'hasVoted', 'getVotes'].includes(fn)) || [],
      notes: ['Governance tab is configured from governor vote/state ABI surfaces.'],
    },
    {
      tab: 'private-sale',
      requiredContracts: ['privateSale'],
      enabledWrites: privateSale?.writeFunctions.filter((fn) => ['buyWithETH', 'buyWithToken'].includes(fn)) || [],
      readDependencies: privateSale?.readFunctions.filter((fn) => ['quotePurchase', 'remainingTokens', 'paymentTokenEnabled'].includes(fn)) || [],
      notes: ['Private sale tab is configured from ONBTPrivateSaleOApp methods.'],
    },
  ] as const;
}

function buildNetworkPayload(
  network: 'base' | 'arbitrum',
  chainId: number,
  contracts: ContractDescriptor[]
) {
  const parsed = contracts.map((contract) => {
    const parsedFns = classifyFunctions(contract.abi);
    return {
      key: contract.key,
      address: contract.address,
      ...parsedFns,
      detectedFeatures: detectFeatures(contract.key, parsedFns.readFunctions, parsedFns.writeFunctions),
    };
  });

  return {
    chainId,
    network,
    contracts: parsed,
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unauthorized ABI configurator request',
      },
      { status: 401 }
    );
  }

  const proof = await verifyPrivilegedWalletProof(request, 'abi-configurator');
  if (!proof.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `ABI configurator requires a verified privileged wallet signature. ${proof.reason}`,
      },
      { status: 403 }
    );
  }

  const baseContracts: ContractDescriptor[] = [
    { key: 'token', address: ONBT_TOKEN_ADDRESS, abi: ONBT_TOKEN_ABI },
    { key: 'staking', address: ONBT_STAKING_ADDRESS, abi: ONBT_STAKING_ABI },
    { key: 'privateSale', address: ONBT_PRIVATE_SALE_BASE_ADDRESS, abi: ONBT_PRIVATE_SALE_ABI },
    { key: 'governor', address: ONBT_GOVERNOR_BASE_ADDRESS, abi: ONBT_GOVERNOR_ABI },
  ];

  const arbitrumContracts: ContractDescriptor[] = [
    { key: 'token', address: ONBT_ARBITRUM_ADDRESS, abi: ONBT_TOKEN_ABI },
    { key: 'staking', address: ONBT_STAKING_ARBITRUM_ADDRESS, abi: ONBT_STAKING_ABI },
    { key: 'privateSale', address: ONBT_PRIVATE_SALE_ARBITRUM_ADDRESS, abi: ONBT_PRIVATE_SALE_ABI },
    { key: 'governor', address: ONBT_GOVERNOR_ARBITRUM_ADDRESS, abi: ONBT_GOVERNOR_ABI },
  ];

  const networks = [
    buildNetworkPayload('base', 8453, baseContracts),
    buildNetworkPayload('arbitrum', 42161, arbitrumContracts),
  ];

  const baseIndex = Object.fromEntries(networks[0].contracts.map((contract) => [contract.key, contract]));
  const tabs = tabConfiguration(baseIndex);

  return NextResponse.json({
    ok: true,
    mode: 'abi-configurator',
    summary:
      'ONBT AI synchronized miniapp module capabilities using deployed Base-hub and Arbitrum-dst contract ABIs.',
    networks,
    tabConfiguration: tabs,
    generatedAt: new Date().toISOString(),
  });
}
