import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET() {
  try {
    const user = serverDb.getUserByEmail('student@iitb.ac.in')!;
    const savedEventObjects = user.savedEvents.map(id => serverDb.getEventById(id)).filter(Boolean);

    return NextResponse.json({
      success: true,
      data: savedEventObjects.map(e => ({
        id: `cal-${e!.id}`,
        eventId: e!.id,
        title: e!.title,
        startDate: e!.startDate,
        endDate: e!.endDate,
        deadline: e!.deadline,
        category: e!.category,
        location: e!.location,
        mode: e!.mode,
        organizer: e!.organization,
        image: e!.image
      })),
      total: savedEventObjects.length
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId } = body;
    const user = serverDb.getUserByEmail('student@iitb.ac.in')!;
    const ok = serverDb.saveEvent(user.id, eventId);

    return NextResponse.json({
      success: true,
      message: ok ? 'Event added to calendar' : 'Event already in calendar',
      eventId
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
