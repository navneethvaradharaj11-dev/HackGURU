import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET() {
  try {
    const notifications = serverDb.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount,
      total: notifications.length
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
