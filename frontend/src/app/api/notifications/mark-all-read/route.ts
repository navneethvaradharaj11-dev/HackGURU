import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST() {
  serverDb.markAllNotificationsRead();
  return NextResponse.json({ success: true, message: 'All notifications marked as read' });
}
