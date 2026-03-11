import { NextResponse } from 'next/server';
import { getOverviewPayload } from '@/lib/backend/overview';
import { cacheControlFor, withBackendCache } from '@/lib/backend/adapters/cache';

export const dynamic = 'force-static';
export const revalidate = 20;

export async function GET() {
  try {
    const payload = await withBackendCache(
      {
        key: 'chains-overview',
        revalidateSeconds: 20,
        tags: ['chains-overview'],
      },
      () => getOverviewPayload()
    );

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': cacheControlFor(20),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        source: 'server',
        error: error instanceof Error ? error.message : 'Failed to build chains overview',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': cacheControlFor(5),
        },
      }
    );
  }
}
