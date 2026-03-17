/**
 * /api/price/token — server-side proxy for ONBT live price data.
 *
 * Proxies DexScreener REST API to avoid CORS issues and rate-limiting
 * in the browser. Picks the highest-liquidity pair on the requested chain,
 * falling back to any available pair.
 *
 * GET /api/price/token?address=0x…&chainId=8453
 */
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// DexScreener chain slugs
const CHAIN_SLUGS: Record<string, string> = {
  '8453': 'base',
  '42161': 'arbitrum',
};

type DexPair = {
  chainId: string;
  dexId: string;
  pairAddress: string;
  priceUsd?: string;
  priceChange?: { h1?: number; h6?: number; h24?: number };
  volume?: { h24?: number; h6?: number; h1?: number };
  liquidity?: { usd?: number };
  fdv?: number;
  marketCap?: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const address = searchParams.get('address') ?? '';
  const chainId = searchParams.get('chainId') ?? '8453';

  // Security: validate address format before forwarding to upstream
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid token address' }, { status: 400 });
  }
  if (!CHAIN_SLUGS[chainId]) {
    return NextResponse.json({ error: 'Unsupported chainId' }, { status: 400 });
  }

  const chainSlug = CHAIN_SLUGS[chainId];

  try {
    const upstream = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'onbt-miniapp/1.0',
        },
        next: { revalidate: 30 },
      }
    );

    if (!upstream.ok) {
      console.warn(`[price/token] DexScreener returned ${upstream.status}`);
      return NextResponse.json(
        { error: 'Upstream price service unavailable' },
        { status: 502 }
      );
    }

    const body = (await upstream.json()) as { pairs?: DexPair[] };
    const pairs = body.pairs ?? [];

    // Prefer matching chain, then highest-liquidity globally
    const chainPairs = pairs.filter((p) => p.chainId === chainSlug);
    const pool = chainPairs.length > 0 ? chainPairs : pairs;
    const best =
      pool.length > 0
        ? pool.reduce((a, b) =>
            (a.liquidity?.usd ?? 0) >= (b.liquidity?.usd ?? 0) ? a : b
          )
        : null;

    if (!best) {
      // Token not yet listed on DEX — return private sale price
      return NextResponse.json({
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
        source: 'private-sale',
      });
    }

    return NextResponse.json({
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
      source: 'dex',
    });
  } catch (err) {
    console.error('[price/token] fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
