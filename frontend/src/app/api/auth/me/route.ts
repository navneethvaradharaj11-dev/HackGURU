import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (token.startsWith('ace_jwt_')) {
        try {
          const payload = JSON.parse(Buffer.from(token.replace('ace_jwt_', ''), 'base64').toString('utf-8'));
          if (payload.userId) {
            user = serverDb.getUserById(payload.userId);
          } else if (payload.email) {
            user = serverDb.getUserByEmail(payload.email);
          }
        } catch {
          // Token decode fallback
        }
      }
    }

    // Default to first demo student if unauthenticated or demo session
    if (!user) {
      user = serverDb.getUserByEmail('student@iitb.ac.in') || serverDb.getEvents()[0] as any;
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        collegeName: user.collegeName,
        branch: user.branch,
        yearOfStudy: user.yearOfStudy,
        degree: user.degree,
        location: user.location,
        careerGoal: user.careerGoal,
        bio: user.bio,
        skills: user.skills,
        interests: user.interests,
        savedEvents: user.savedEvents,
        registeredEvents: user.registeredEvents
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
