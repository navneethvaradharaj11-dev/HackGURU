import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET() {
  try {
    const stats = serverDb.getDashboardStats();
    const user = serverDb.getUserByEmail('student@iitb.ac.in')!;
    const recommendations = serverDb.calculateRecommendations(user, 4);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        upcomingEventsCount: stats.totalEvents,
        registeredEventsCount: user.registeredEvents.length,
        savedEventsCount: user.savedEvents.length,
        topRecommendations: recommendations
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
