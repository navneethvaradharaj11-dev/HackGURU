import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    let user = serverDb.getUserByEmail(email);

    // If user does not exist in memory, create a session user based on email
    if (!user) {
      user = serverDb.createUser({
        email,
        password: password || 'password123',
        fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        collegeName: 'IIT Bombay',
        branch: 'Computer Science & Engineering',
        degree: 'B.Tech',
        careerGoal: 'AI Research Scientist'
      });
    }

    // Generate JWT-like signed token
    const token = `ace_jwt_${Buffer.from(JSON.stringify({ userId: user.id, email: user.email, exp: Date.now() + 7 * 86400000 })).toString('base64')}`;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      student: {
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
        interests: user.interests
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Login failed' }, { status: 500 });
  }
}
