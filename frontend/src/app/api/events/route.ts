import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const location = searchParams.get('location') || undefined;
    const mode = searchParams.get('mode') || undefined;
    const search = searchParams.get('search') || undefined;

    const events = serverDb.getEvents({ category, location, mode, search });

    // Format for client compatibility
    const formatted = events.map(e => ({
      id: e.id,
      title: e.title,
      description: e.description,
      shortDescription: e.shortDescription,
      category: e.category,
      organizer: e.organization,
      organization: e.organization,
      location: e.location,
      mode: e.mode === 'online' ? 'Online' : e.mode === 'offline' ? 'Offline' : 'Hybrid',
      date: e.startDate,
      startDate: e.startDate,
      endDate: e.endDate,
      registrationDeadline: e.deadline,
      deadlineInDays: e.deadlineInDays,
      skills: e.skills,
      skillsRequired: e.skills,
      domainTags: e.domainTags,
      targetAudience: e.targetAudience,
      image: e.image,
      imageUrl: e.image,
      prize: e.prize,
      teamSize: e.teamSize,
      participantCount: e.participantCount,
      featured: e.featured
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
      total: formatted.length
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const created = serverDb.addEvent(body);
    return NextResponse.json({
      success: true,
      message: 'Event published successfully',
      data: created
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
