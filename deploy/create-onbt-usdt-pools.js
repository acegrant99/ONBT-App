/**
 * Create ONBT/USDT pools on Uniswap v3 (Base + Arbitrum)
 * Then register them in ONBTPoolManager for custom management
 */

const { ethers } = require('ethers');
require('dotenv').config({ path: '.env' });

// UniswapV3Factory ABI (minimal)
const FACTORY_ABI = [
  'function createPool(address tokenA, address tokenB, uint24 fee) external returns (address pool)',
  'function getPool(address tokenA, address tokenB, uint24 fee) view returns (address)',
];

// UniswapV3Pool ABI (minimal)
const POOL_ABI = [
  'function initialize(uint160 sqrtPriceX96) external',
  'function token0() view returns (address)',
  'function token1() view returns (address)',
  'function fee() view returns (uint24)',
];

// ONBTPoolManager ABI (minimal)
const MANAGER_ABI = [
  'function registerPool(bytes32 poolId, address pool, address token0, address token1, uint24 fee, uint32 dstEid) external',
  'function allocateLiquidity(bytes32 poolId, uint256 amount0, uint256 amount1) external',
];

// NonFungiblePositionManager ABI (for adding liquidity)
const POSITION_MANAGER_ABI = [
  'function mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256) params) payable returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)',
  'function positions(uint256 tokenId) view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)',
];

// ERC20 ABI (minimal)
const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) external returns (bool)',
  'function decimals() view returns (uint8)',
];

const TARGET_NETWORK = process.env.TARGET_NETWORK || 'base';
const INITIAL_LIQUIDITY = {
  base: { usdt: '25000000', onbt: '25000000' }, // 25 USDT (6 decimals) + 25 ONBT (18 decimals)
  arbitrum: { usdt: '25000000', onbt: '25000000' },
};

const CHAINS = {
  base: {
    name: 'Base',
    rpc: process.env.BASE_RPC_URL,
    factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984', // Uniswap v3 Factory on Base
    positionManager: '0x03a520b32C63e69bD1D97CCC44AC0B3db46A80D7', // NFT Position Manager on Base
    poolManager: process.env.BASE_POOL_MANAGER_ADDRESS,
    onbtToken: process.env.BASE_ONBT_TOKEN,
    usdt: '0xfde4C96c8593536E31F26E8989180B6098C8e32F', // USDT on Base (Bridged)
    dstEid: 30110, // Base LayerZero EID
    fee: 3000, // 0.3%
  },
  arbitrum: {
    name: 'Arbitrum',
    rpc: process.env.ARBITRUM_RPC_URL,
    factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984', // Uniswap v3 Factory on Arbitrum
    positionManager: '0xC36442b4a4522E871399CD717AbDD847aB11218F', // NFT Position Manager on Arbitrum
    poolManager: process.env.ARBITRUM_POOL_MANAGER_ADDRESS,
    onbtToken: process.env.ARBITRUM_ONBT_TOKEN,
    usdt: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // USDT on Arbitrum
    dstEid: 30184, // Arbitrum LayerZero EID
    fee: 3000, // 0.3%
  },
};

async function createPoolOnChain(chainKey) {
  const chain = CHAINS[chainKey];
  console.log(`\n======== Creating ONBT/USDT pool on ${chain.name} ========`);

  const provider = new ethers.providers.JsonRpcProvider(chain.rpc);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log(`Signer: ${signer.address}`);

  // ----- Step 1: Check if pool exists -----
  const factory = new ethers.Contract(chain.factory, FACTORY_ABI, provider);
  let poolAddress = await factory.getPool(chain.onbtToken, chain.usdt, chain.fee);

  if (poolAddress !== ethers.constants.AddressZero) {
    console.log(`✓ Pool already exists: ${poolAddress}`);
    return { chainKey, poolAddress, isNew: false };
  }

  // ----- Step 2: Create pool -----
  console.log(`Creating pool... (ONBT: ${chain.onbtToken}, USDT: ${chain.usdt})`);
  const factoryTx = await factory.connect(signer).createPool(chain.onbtToken, chain.usdt, chain.fee);
  const factoryReceipt = await factoryTx.wait();
  console.log(`Pool creation tx: ${factoryTx.hash}`);

  // Get the new pool address
  poolAddress = await factory.getPool(chain.onbtToken, chain.usdt, chain.fee);
  console.log(`✓ Pool created at: ${poolAddress}`);

  // ----- Step 3: Initialize pool with starting price -----
  // Assuming ONBT ≈ $1 and USDT ≈ $1 (1:1 price)
  const sqrtPriceX96 = ethers.BigNumber.from('2').pow(96); // Price = 1.0 for equal value tokens
  
  const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);
  console.log(`Initializing pool with starting price...`);
  const initTx = await pool.connect(signer).initialize(sqrtPriceX96);
  const initReceipt = await initTx.wait();
  console.log(`✓ Pool initialized`);

  return { chainKey, poolAddress, isNew: true };
}

async function registerPoolInManager(chainKey, poolAddress) {
  const chain = CHAINS[chainKey];
  console.log(`\nRegistering pool in ${chain.name} ONBTPoolManager...`);

  const provider = new ethers.providers.JsonRpcProvider(chain.rpc);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Get token order
  const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const token0 = await pool.token0();
  const token1 = await pool.token1();

  // Generate pool ID (hash of tokens + fee)
  const poolId = ethers.utils.solidityKeccak256(
    ['address', 'address', 'uint24'],
    [token0, token1, chain.fee]
  );

  console.log(`Pool ID: ${poolId}`);
  console.log(`Token0: ${token0}`);
  console.log(`Token1: ${token1}`);

  // Register in manager
  const manager = new ethers.Contract(chain.poolManager, MANAGER_ABI, provider);
  console.log(`Registering in manager at ${chain.poolManager}...`);
  const regTx = await manager.connect(signer).registerPool(
    poolId,
    poolAddress,
    token0,
    token1,
    chain.fee,
    chain.dstEid
  );
  await regTx.wait();
  console.log(`✓ Pool registered: ${regTx.hash}`);

  return { poolId, poolAddress, token0, token1 };
}

async function addInitialLiquidity(chainKey, poolAddress, token0, token1) {
  const chain = CHAINS[chainKey];
  const liquidity = INITIAL_LIQUIDITY[chainKey];

  console.log(`\nAdding initial liquidity to ${chain.name} pool...`);

  const provider = new ethers.providers.JsonRpcProvider(chain.rpc);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Determine amounts based on token order
  let amount0, amount1;
  if (token0.toLowerCase() === chain.onbtToken.toLowerCase()) {
    amount0 = liquidity.onbt;
    amount1 = liquidity.usdt;
  } else {
    amount0 = liquidity.usdt;
    amount1 = liquidity.onbt;
  }

  console.log(`Amount0: ${amount0} | Amount1: ${amount1}`);

  // Approve tokens
  const token0Contract = new ethers.Contract(token0, ERC20_ABI, signer);
  const token1Contract = new ethers.Contract(token1, ERC20_ABI, signer);

  console.log(`Approving token0...`);
  const approve0Tx = await token0Contract.approve(chain.positionManager, ethers.constants.MaxUint256);
  await approve0Tx.wait();

  console.log(`Approving token1...`);
  const approve1Tx = await token1Contract.approve(chain.positionManager, ethers.constants.MaxUint256);
  await approve1Tx.wait();

  // Mint position via NonFungiblePositionManager
  const positionManager = new ethers.Contract(chain.positionManager, POSITION_MANAGER_ABI, signer);

  // Calculate tick range (wide range for initial liquidity)
  const tickSpacing = 60; // For 0.3% fee tier
  const minTick = -887272; // Min tick for v3
  const maxTick = 887272; // Max tick for v3
  const lowerTick = Math.floor(minTick / tickSpacing) * tickSpacing;
  const upperTick = Math.floor(maxTick / tickSpacing) * tickSpacing;

  const mintParams = {
    token0: token0,
    token1: token1,
    fee: chain.fee,
    tickLower: lowerTick,
    tickUpper: upperTick,
    amount0Desired: ethers.BigNumber.from(amount0),
    amount1Desired: ethers.BigNumber.from(amount1),
    amount0Min: '0', // Skip slippage for initial liquidity (you can adjust this)
    amount1Min: '0',
    recipient: signer.address,
    deadline: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  };

  console.log(`Minting liquidity position...`);
  const mintTx = await positionManager.mint(mintParams);
  const mintReceipt = await mintTx.wait();
  console.log(`✓ Liquidity minted: ${mintTx.hash}`);

  return { amount0, amount1, txHash: mintTx.hash };
}

async function main() {
  console.log('🔗 ONBT/USDT Pool Creation on Uniswap v3');
  console.log(`Target network: ${TARGET_NETWORK}`);

  const results = {};

  // Create pools on both chains
  for (const chainKey of ['base', 'arbitrum']) {
    try {
      const pool = await createPoolOnChain(chainKey);
      results[chainKey] = pool;

      if (pool.isNew) {
        // Register in manager
        const registered = await registerPoolInManager(chainKey, pool.poolAddress);
        results[chainKey] = { ...pool, ...registered };

        // Add initial liquidity
        const liquidity = await addInitialLiquidity(chainKey, pool.poolAddress, registered.token0, registered.token1);
        results[chainKey] = { ...results[chainKey], ...liquidity };
      }
    } catch (error) {
      console.error(`❌ Error on ${chainKey}:`, error.message);
      results[chainKey] = { error: error.message };
    }
  }

  // ----- Summary -----
  console.log('\n======== Summary ========');
  console.log(JSON.stringify(results, null, 2));

  // ----- Output for .env -----
  console.log('\n======== Add to .env ========');
  for (const [chainKey, data] of Object.entries(results)) {
    if (data.poolId) {
      const prefix = chainKey === 'base' ? 'BASE_' : 'ARBITRUM_';
      console.log(`${prefix}USDT_POOL_ID=${data.poolId}`);
      console.log(`${prefix}USDT_POOL_ADDRESS=${data.poolAddress}`);
      console.log(`${prefix}USDT_POOL_TOKEN0=${data.token0}`);
      console.log(`${prefix}USDT_POOL_TOKEN1=${data.token1}`);
    }
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
