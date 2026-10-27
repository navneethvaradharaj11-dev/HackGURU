import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'HEALTHY',
    service: 'AllCollegeEvent.com / HackGURU Central API Layer',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0-production'
  });
}
