import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type TabType = 'token' | 'bridge' | 'staking' | 'governance' | 'private-sale' | 'about';

type GithubScoutRequest = {
  prompt?: string;
  activeTab?: TabType;
};

type GithubRepo = {
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
};

function tabKeywords(activeTab: TabType): string[] {
  if (activeTab === 'bridge') return ['cross-chain bridge ui', 'layerzero', 'wagmi viem'];
  if (activeTab === 'staking') return ['defi staking dashboard', 'react web3 analytics', 'onchain rewards ui'];
  if (activeTab === 'governance') return ['dao governance frontend', 'snapshot governor ui', 'web3 proposal app'];
  if (activeTab === 'private-sale') return ['token sale frontend', 'payment rails web3', 'erc20 approve flow'];
  if (activeTab === 'token') return ['wallet portfolio ui', 'token transfer frontend', 'allowance management dapp'];
  return ['web3 frontend architecture', 'nextjs backend api patterns', 'onchain analytics dashboard'];
}

function buildSearchQueries(prompt: string, activeTab: TabType): string[] {
  const base = prompt.trim();
  const tab = tabKeywords(activeTab);
  return [
    `${base} ${tab[0]} language:TypeScript stars:>80`,
    `${base} ${tab[1]} language:TypeScript stars:>80`,
    `${base} ${tab[2]} language:TypeScript stars:>80`,
  ];
}

function deriveEnhancements(repos: GithubRepo[], activeTab: TabType): string[] {
  const ideas: string[] = [];
  const languages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean)));
  if (languages.length > 0) {
    ideas.push(`Prioritize TypeScript-first modules (${languages.join(', ')}) to keep frontend/backend contracts strongly typed.`);
  }

  if (activeTab === 'bridge') {
    ideas.push('Add bridge ETA/finality state machine and per-step status timeline inspired by production bridge dashboards.');
    ideas.push('Adopt quote-refresh guards (TTL + drift warning) before signature to reduce failed bridge writes.');
  } else if (activeTab === 'staking') {
    ideas.push('Add reward projection cards with scenario bands (base, optimistic, caution) and lockup visual timelines.');
    ideas.push('Include indexed staking history endpoints to power leaderboard and user performance analytics.');
  } else {
    ideas.push('Split app features into vertical slices (ui + route + service) to speed iteration and keep ownership clear.');
    ideas.push('Add backend adapters for cache + revalidation to improve performance on frequently polled chain data.');
  }

  ideas.push('Create a reusable action-preflight layer (simulate + checks + copy) before every write transaction.');
  return ideas;
}

async function searchGithub(query: string, token?: string): Promise<GithubRepo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'ONBT-AI-Github-Scout',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=5`;
  const response = await fetch(url, { headers, cache: 'no-store' });

  if (!response.ok) {
    const text = await response.text().catch(() => 'GitHub search failed');
    throw new Error(`GitHub search failed (${response.status}): ${text.slice(0, 180)}`);
  }

  const payload = (await response.json()) as { items?: GithubRepo[] };
  return payload.items || [];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as GithubScoutRequest;
    const prompt = String(body.prompt || 'ONBT miniapp web3').trim();
    const activeTab = (body.activeTab || 'about') as TabType;
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

    const queries = buildSearchQueries(prompt, activeTab);
    const results = await Promise.all(queries.map((q) => searchGithub(q, token)));
    const flattened = results.flat();

    const unique = Array.from(new Map(flattened.map((repo) => [repo.full_name, repo])).values())
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 8);

    const enhancements = deriveEnhancements(unique, activeTab);

    return NextResponse.json({
      ok: true,
      mode: 'github-scout',
      prompt,
      activeTab,
      repositories: unique,
      enhancements,
      searchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to run GitHub scout',
      },
      { status: 500 },
    );
  }
}
