/**
 * /api/price/history — ONBT OHLCV candle history proxy.
 *
 * DexScreener exposes GET /dex/pairs/{chain}/{pairAddress}/ohlcv?timeframe=1h&limit=168
 * This proxy fetches the token's pairs first (same as /api/price/token), picks the
 * highest-liquidity pair and returns candles.
 *
 * GET /api/price/history?address=0x…&chainId=8453&timeframe=1h&limit=168
 */
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CHAIN_SLUGS: Record<string, string> = {
  '8453': 'base',
  '42161': 'arbitrum',
};

const VALID_TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1d'] as const;
type Timeframe = typeof VALID_TIMEFRAMES[number];

type DexPair = {
  chainId: string;
  pairAddress: string;
  liquidity?: { usd?: number };
};

type OHLCVBar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const address = searchParams.get('address') ?? '';
  const chainId = searchParams.get('chainId') ?? '8453';
  const timeframe = (searchParams.get('timeframe') ?? '1h') as Timeframe;
  const limit = Math.min(Number(searchParams.get('limit') ?? '168'), 500);

  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid token address' }, { status: 400 });
  }
  if (!CHAIN_SLUGS[chainId]) {
    return NextResponse.json({ error: 'Unsupported chainId' }, { status: 400 });
  }
  if (!VALID_TIMEFRAMES.includes(timeframe)) {
    return NextResponse.json({ error: 'Invalid timeframe' }, { status: 400 });
  }

  const chainSlug = CHAIN_SLUGS[chainId];

  try {
    // Step 1: find the best pair for this token
    const pairsRes = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`,
      { headers: { Accept: 'application/json', 'User-Agent': 'onbt-miniapp/1.0' } }
    );

    if (!pairsRes.ok) {
      return NextResponse.json({ candles: [], source: 'unavailable' });
    }

    const pairsData = await pairsRes.json() as { pairs?: DexPair[] };
    const pairs = (pairsData.pairs ?? []).filter((p) => p.chainId === chainSlug);

    if (pairs.length === 0) {
      return NextResponse.json({ candles: [], source: 'no-pairs' });
    }

    const bestPair = pairs.sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];

    // Step 2: fetch OHLCV for that pair
    const ohlcvRes = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/${chainSlug}/${bestPair.pairAddress}/ohlcv?timeframe=${timeframe}&limit=${limit}`,
      { headers: { Accept: 'application/json', 'User-Agent': 'onbt-miniapp/1.0' } }
    );

    if (!ohlcvRes.ok) {
      return NextResponse.json({ candles: [], source: 'ohlcv-unavailable' });
    }

    const ohlcvData = await ohlcvRes.json() as { ohlcv?: OHLCVBar[] };
    const candles: OHLCVBar[] = Array.isArray(ohlcvData.ohlcv) ? ohlcvData.ohlcv : [];

    return NextResponse.json(
      { candles, pairAddress: bestPair.pairAddress, source: 'dex' },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } }
    );
  } catch (err) {
    console.error('[price/history]', err);
    return NextResponse.json({ candles: [], source: 'error' });
  }
}
