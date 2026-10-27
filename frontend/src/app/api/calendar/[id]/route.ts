import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cleanId = id.replace('cal-', '');
    const user = serverDb.getUserByEmail('student@iitb.ac.in')!;
    serverDb.unsaveEvent(user.id, cleanId);

    return NextResponse.json({ success: true, message: 'Event removed from calendar' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
