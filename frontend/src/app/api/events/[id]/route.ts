import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = serverDb.getEventById(id);

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
        shortDescription: event.shortDescription,
        category: event.category,
        organizer: event.organization,
        organization: event.organization,
        location: event.location,
        mode: event.mode === 'online' ? 'Online' : event.mode === 'offline' ? 'Offline' : 'Hybrid',
        date: event.startDate,
        startDate: event.startDate,
        endDate: event.endDate,
        time: event.time || '10:00 AM IST',
        fee: event.fee || 'Free',
        registrationDeadline: event.deadline,
        deadlineInDays: event.deadlineInDays,
        skills: event.skills,
        skillsRequired: event.skills,
        domainTags: event.domainTags,
        targetAudience: event.targetAudience,
        eligibility: event.eligibility.join('. '),
        requirements: event.requirements,
        benefits: event.benefits,
        teamSize: event.teamSize,
        prize: event.prize,
        image: event.image,
        imageUrl: event.image,
        organizerDescription: event.organizerDescription,
        participantCount: event.participantCount,
        status: event.deadlineInDays <= 3 ? 'closing-soon' : 'open'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
