import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    totalTokensConsumed: 184520,
    totalRequestsServed: 1580,
    estimatedCostUSD: 0.0984,
    cacheHitRatio: 68.4,
    avgLatencyMs: 84,
    activeProviderPools: {
      gemini: { poolSize: 10, activeKeys: 10, health: 'HEALTHY' },
      openai: { poolSize: 5, activeKeys: 5, health: 'HEALTHY' },
      huggingface: { poolSize: 2, activeKeys: 2, health: 'HEALTHY' },
    },
    recentLogs: [
      { id: 'log-101', timestamp: new Date(Date.now() - 120000).toISOString(), model: 'gemini-2.5-flash', keyId: 'GEMINI_POOL_1', tokens: 520, latencyMs: 78, cached: true },
      { id: 'log-102', timestamp: new Date(Date.now() - 360000).toISOString(), model: 'text-embedding-004', keyId: 'EMBED_VEC_2', tokens: 180, latencyMs: 24, cached: true },
      { id: 'log-103', timestamp: new Date(Date.now() - 720000).toISOString(), model: 'gemini-1.5-flash', keyId: 'GEMINI_POOL_3', tokens: 890, latencyMs: 140, cached: false },
      { id: 'log-104', timestamp: new Date(Date.now() - 1200000).toISOString(), model: 'gpt-4o-mini', keyId: 'OPENAI_POOL_1', tokens: 340, latencyMs: 110, cached: false },
    ],
  });
}
