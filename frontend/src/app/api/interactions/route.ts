import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, action } = body;
    const user = serverDb.getUserByEmail('student@iitb.ac.in')!;

    if (action === 'REGISTER') {
      serverDb.registerForEvent(user.id, eventId);
    } else if (action === 'SAVE') {
      serverDb.saveEvent(user.id, eventId);
    } else if (action === 'DISMISS') {
      serverDb.unsaveEvent(user.id, eventId);
    }

    serverDb.logInteraction(user.id, eventId, action);

    return NextResponse.json({
      success: true,
      message: `Interaction ${action} recorded`,
      eventId,
      action
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
