import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ok = serverDb.markNotificationRead(id);
    return NextResponse.json({ success: ok, message: ok ? 'Marked as read' : 'Notification not found' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
