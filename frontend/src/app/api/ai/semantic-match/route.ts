import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, limit } = body;

    if (!query) {
      return NextResponse.json({ success: false, message: 'Query is required for semantic matching' }, { status: 400 });
    }

    const matches = serverDb.semanticMatch(query, limit || 5);

    return NextResponse.json({
      success: true,
      query,
      model: 'text-embedding-004 / Cosine Multi-Vector Embedding',
      vectorDimensions: 768,
      matches: matches.map(m => ({
        eventId: m.event.id,
        title: m.event.title,
        category: m.event.category,
        organization: m.event.organization,
        location: m.event.location,
        similarityScore: m.similarityScore,
        matchedTokens: m.matchedTokens,
        relevantSkills: m.event.skills
      }))
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'machine learning python';
  const matches = serverDb.semanticMatch(q, 4);

  return NextResponse.json({
    success: true,
    model: 'text-embedding-004 / Cosine Multi-Vector Embedding',
    query: q,
    matches: matches.map(m => ({
      eventId: m.event.id,
      title: m.event.title,
      category: m.event.category,
      organization: m.event.organization,
      similarityScore: m.similarityScore,
      matchedTokens: m.matchedTokens
    }))
  });
}
