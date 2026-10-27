import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (token.startsWith('ace_jwt_')) {
        try {
          const payload = JSON.parse(Buffer.from(token.replace('ace_jwt_', ''), 'base64').toString('utf-8'));
          if (payload.userId) user = serverDb.getUserById(payload.userId);
          else if (payload.email) user = serverDb.getUserByEmail(payload.email);
        } catch {
          // ignore
        }
      }
    }

    if (!user) {
      user = serverDb.getUserByEmail('student@iitb.ac.in')!;
    }

    const recommendations = serverDb.calculateRecommendations(user, 10);

    return NextResponse.json({
      success: true,
      data: recommendations,
      total: recommendations.length,
      scoringMethod: '7-Factor Deterministic Heuristics + Multi-Agent Refinement',
      weightsApplied: {
        branchMatch: '15%',
        skillOverlap: '25%',
        interestMatch: '20%',
        careerGoalRelevance: '20%',
        locationEligibility: '10%',
        interactionHistory: '5%',
        freshnessAndUrgency: '5%'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
