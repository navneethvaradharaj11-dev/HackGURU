import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/server/mockDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, password, collegeName, branch, degree, careerGoal, bio } = body;

    if (!email || !fullName) {
      return NextResponse.json({ success: false, message: 'Email and Full Name are required' }, { status: 400 });
    }

    const existing = serverDb.getUserByEmail(email);
    const user = existing || serverDb.createUser({
      email,
      fullName,
      password: password || 'password123',
      collegeName: collegeName || 'IIT Bombay',
      branch: branch || 'Computer Science',
      degree: degree || 'B.Tech',
      careerGoal: careerGoal || 'Software Engineer',
      bio: bio || ''
    });

    const token = `ace_jwt_${Buffer.from(JSON.stringify({ userId: user.id, email: user.email, exp: Date.now() + 7 * 86400000 })).toString('base64')}`;

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
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
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Registration failed' }, { status: 500 });
  }
}
