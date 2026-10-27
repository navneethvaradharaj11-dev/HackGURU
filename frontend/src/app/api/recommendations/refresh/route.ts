import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST(req: Request) {
  try {
    const user = serverDb.getUserByEmail('student@iitb.ac.in')!;
    const refreshed = serverDb.calculateRecommendations(user, 10);

    return NextResponse.json({
      success: true,
      message: 'Recommendations refreshed with real-time heuristic ranking',
      data: refreshed,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
