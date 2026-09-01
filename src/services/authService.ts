import { UserRepository } from '../repositories/userRepository';
import { StudentRepository } from '../repositories/studentRepository';
import { PasswordUtil } from '../utils/password';
import { JwtUtil } from '../utils/jwt';
import { Role } from '@prisma/client';

export class AuthService {
  private getUserRepository(): UserRepository {
    return new UserRepository();
  }

  private getStudentRepository(): StudentRepository {
    return new StudentRepository();
  }

  public async register(data: {
    email: string;
    password: string;
    fullName: string;
    collegeName: string;
    branch: string;
    yearOfStudy: number;
    degree: string;
    location: string;
    careerGoal: string;
    bio?: string;
  }): Promise<{ user: any; token: string }> {
    const userRepo = this.getUserRepository();
    const studentRepo = this.getStudentRepository();

    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const passwordHash = await PasswordUtil.hashPassword(data.password);
    const user = await userRepo.createUser({
      email: data.email,
      passwordHash,
      role: Role.STUDENT,
    });

    const studentProfile = await studentRepo.createProfile({
      userId: user.id,
      fullName: data.fullName,
      collegeName: data.collegeName,
      branch: data.branch,
      yearOfStudy: data.yearOfStudy,
      degree: data.degree,
      location: data.location,
      careerGoal: data.careerGoal,
      bio: data.bio,
    });

    const token = JwtUtil.generateToken({
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      studentId: studentProfile.id,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        studentProfile,
      },
      token,
    };
  }

  public async login(data: {
    email: string;
    password: string;
  }): Promise<{ user: any; token: string }> {
    const userRepo = this.getUserRepository();
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password credentials.');
    }

    const isMatch = await PasswordUtil.comparePassword(data.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password credentials.');
    }

    const token = JwtUtil.generateToken({
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      studentId: (user as any).student?.id,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        studentProfile: (user as any).student,
      },
      token,
    };
  }

  public async getMe(userId: string): Promise<any> {
    const userRepo = this.getUserRepository();
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
