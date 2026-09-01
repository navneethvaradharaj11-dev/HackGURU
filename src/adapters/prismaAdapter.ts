import { IDatabaseAdapter } from './databaseAdapter.interface';
import { prisma } from '../config/database';
import { ActionType, NotificationType, Role, Prisma } from '@prisma/client';

export class PrismaDatabaseAdapter implements IDatabaseAdapter {
  // --- USER OPERATIONS ---
  public async findUserByEmail(email: string): Promise<any | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { student: true },
    });
  }

  public async findUserById(id: string): Promise<any | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { student: true },
    });
  }

  public async createUser(data: { email: string; passwordHash: string; role?: Role }): Promise<any> {
    return prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role || Role.STUDENT,
      },
    });
  }

  // --- STUDENT OPERATIONS ---
  public async findStudentByUserId(userId: string): Promise<any | null> {
    return prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        interests: { include: { interest: true } },
        skills: { include: { skill: true } },
        projects: { include: { skills: { include: { skill: true } } } },
        hackathons: { include: { hackathon: true } },
        internships: true,
        notificationPreferences: true,
      },
    });
  }

  public async findStudentById(id: string): Promise<any | null> {
    return prisma.studentProfile.findUnique({
      where: { id },
      include: {
        interests: { include: { interest: true } },
        skills: { include: { skill: true } },
        projects: { include: { skills: { include: { skill: true } } } },
        hackathons: { include: { hackathon: true } },
        internships: true,
        notificationPreferences: true,
      },
    });
  }

  public async createStudentProfile(data: {
    userId: string;
    fullName: string;
    collegeName: string;
    branch: string;
    yearOfStudy: number;
    degree: string;
    location: string;
    careerGoal: string;
    bio?: string;
  }): Promise<any> {
    return prisma.studentProfile.create({
      data: {
        ...data,
        notificationPreferences: {
          create: {
            enableDeadlineAlerts: true,
            enableRecommendationAlerts: true,
          },
        },
      },
    });
  }

  public async updateStudentProfile(studentId: string, data: any): Promise<any> {
    return prisma.studentProfile.update({
      where: { id: studentId },
      data,
    });
  }

  public async updateStudentInterests(studentId: string, interestIds: string[]): Promise<void> {
    await prisma.studentInterest.deleteMany({ where: { studentId } });
    for (const interestId of interestIds) {
      await prisma.studentInterest.create({
        data: { studentId, interestId },
      });
    }
  }

  public async updateStudentSkills(studentId: string, skills: { skillId: string; proficiencyLevel?: string }[]): Promise<void> {
    await prisma.studentSkill.deleteMany({ where: { studentId } });
    for (const s of skills) {
      await prisma.studentSkill.create({
        data: {
          studentId,
          skillId: s.skillId,
          proficiencyLevel: s.proficiencyLevel || 'INTERMEDIATE',
        },
      });
    }
  }

  public async getAllInterests(): Promise<any[]> {
    return prisma.interest.findMany({ orderBy: { name: 'asc' } });
  }

  public async getAllSkills(): Promise<any[]> {
    return prisma.skill.findMany({ orderBy: { name: 'asc' } });
  }

  // --- EVENT & INTELLIGENCE OPERATIONS ---
  public async findAllEvents(params?: { category?: string; location?: string; search?: string; limit?: number; skip?: number }): Promise<any[]> {
    const where: Prisma.EventWhereInput = {};

    if (params?.category) {
      where.category = { equals: params.category, mode: 'insensitive' };
    }

    if (params?.location) {
      where.location = { contains: params.location, mode: 'insensitive' };
    }

    if (params?.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
        { category: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return prisma.event.findMany({
      where,
      include: { intelligence: true },
      orderBy: { startDate: 'asc' },
      take: params?.limit || 100,
      skip: params?.skip || 0,
    });
  }

  public async findEventById(id: string): Promise<any | null> {
    return prisma.event.findUnique({
      where: { id },
      include: { intelligence: true },
    });
  }

  public async createEvent(data: any): Promise<any> {
    return prisma.event.create({
      data,
      include: { intelligence: true },
    });
  }

  public async upsertEventIntelligence(eventId: string, intelligenceData: any): Promise<any> {
    return prisma.eventIntelligence.upsert({
      where: { eventId },
      update: {
        ...intelligenceData,
        analyzedAt: new Date(),
      },
      create: {
        ...intelligenceData,
        event: { connect: { id: eventId } },
      },
    });
  }

  public async getCandidateEventsForStudent(limit: number = 500): Promise<any[]> {
    return prisma.event.findMany({
      include: { intelligence: true },
      orderBy: { registrationDeadline: 'asc' },
      take: limit,
    });
  }

  // --- INTERACTION OPERATIONS ---
  public async logInteraction(data: { studentId: string; eventId: string; action: ActionType; metadata?: any }): Promise<any> {
    return prisma.interaction.create({
      data: {
        studentId: data.studentId,
        eventId: data.eventId,
        action: data.action,
        metadata: data.metadata || {},
      },
    });
  }

  public async getStudentInteractions(studentId: string): Promise<any[]> {
    return prisma.interaction.findMany({
      where: { studentId },
      include: { event: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // --- RECOMMENDATION OPERATIONS ---
  public async findRecommendationsByStudentId(studentId: string): Promise<any[]> {
    return prisma.recommendation.findMany({
      where: { studentId, status: 'ACTIVE' },
      include: { event: { include: { intelligence: true } } },
      orderBy: { score: 'desc' },
    });
  }

  public async upsertRecommendation(data: {
    studentId: string;
    eventId: string;
    score: number;
    reason: string;
    explanation: string;
    agentRefined: boolean;
    status: string;
  }): Promise<any> {
    return prisma.recommendation.upsert({
      where: {
        studentId_eventId: {
          studentId: data.studentId,
          eventId: data.eventId,
        },
      },
      update: {
        score: data.score,
        reason: data.reason,
        explanation: data.explanation,
        agentRefined: data.agentRefined,
        status: data.status,
        updatedAt: new Date(),
      },
      create: {
        studentId: data.studentId,
        eventId: data.eventId,
        score: data.score,
        reason: data.reason,
        explanation: data.explanation,
        agentRefined: data.agentRefined,
        status: data.status,
      },
      include: { event: { include: { intelligence: true } } },
    });
  }

  // --- CALENDAR OPERATIONS ---
  public async addCalendarEvent(data: {
    studentId: string;
    eventId: string;
    startDate: Date;
    registrationDeadline: Date;
    reminderTime: Date;
    reminderType?: string;
    status?: string;
  }): Promise<any> {
    return prisma.calendarEvent.create({
      data: {
        studentId: data.studentId,
        eventId: data.eventId,
        startDate: data.startDate,
        registrationDeadline: data.registrationDeadline,
        reminderTime: data.reminderTime,
        reminderType: data.reminderType || 'REGISTRATION_DEADLINE',
        status: data.status || 'UPCOMING',
      },
      include: { event: true },
    });
  }

  public async getStudentCalendarEvents(studentId: string): Promise<any[]> {
    return prisma.calendarEvent.findMany({
      where: { studentId },
      include: { event: true },
      orderBy: { reminderTime: 'asc' },
    });
  }

  public async removeCalendarEvent(id: string, studentId: string): Promise<boolean> {
    const res = await prisma.calendarEvent.deleteMany({
      where: { id, studentId },
    });
    return res.count > 0;
  }

  // --- NOTIFICATION OPERATIONS ---
  public async createNotification(data: {
    studentId: string;
    eventId?: string;
    title: string;
    message: string;
    type: NotificationType;
  }): Promise<any> {
    return prisma.notification.create({
      data: {
        studentId: data.studentId,
        eventId: data.eventId,
        title: data.title,
        message: data.message,
        type: data.type,
      },
    });
  }

  public async getStudentNotifications(studentId: string, limit: number = 20): Promise<any[]> {
    return prisma.notification.findMany({
      where: { studentId },
      include: { event: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  public async markNotificationAsRead(id: string, studentId: string): Promise<boolean> {
    const res = await prisma.notification.updateMany({
      where: { id, studentId },
      data: { isRead: true },
    });
    return res.count > 0;
  }

  // --- AI USAGE TELEMETRY OPERATIONS ---
  public async logAIUsage(metrics: any): Promise<any> {
    return prisma.aIUsage.create({
      data: {
        provider: metrics.provider,
        model: metrics.model,
        requestType: metrics.requestType,
        inputTokens: metrics.inputTokens || 0,
        outputTokens: metrics.outputTokens || 0,
        totalTokens: metrics.totalTokens || ((metrics.inputTokens || 0) + (metrics.outputTokens || 0)),
        estimatedCost: metrics.estimatedCost || 0.0,
        success: metrics.success,
        timestamp: new Date(),
      },
    });
  }

  public async logAIRequest(requestData: any): Promise<any> {
    return prisma.aIRequestLog.create({
      data: {
        provider: requestData.provider,
        model: requestData.model,
        requestType: requestData.requestType,
        inputPrompt: requestData.inputPrompt,
        rawResponse: requestData.rawResponse,
        durationMs: requestData.durationMs,
        success: requestData.success,
        errorMessage: requestData.errorMessage || null,
      },
    });
  }

  public async getAIUsageSummary(): Promise<any> {
    const totalRequests = await prisma.aIUsage.count();
    const successRequests = await prisma.aIUsage.count({ where: { success: true } });
    const usageList = await prisma.aIUsage.findMany();

    const totalInputTokens = usageList.reduce((acc: number, curr: any) => acc + (curr.inputTokens || 0), 0);
    const totalOutputTokens = usageList.reduce((acc: number, curr: any) => acc + (curr.outputTokens || 0), 0);
    const totalTokens = usageList.reduce((acc: number, curr: any) => acc + (curr.totalTokens || 0), 0);
    const totalEstimatedCost = usageList.reduce((acc: number, curr: any) => acc + (curr.estimatedCost || 0), 0);

    return {
      totalRequests,
      successRequests,
      failedRequests: totalRequests - successRequests,
      totalInputTokens,
      totalOutputTokens,
      totalTokens,
      totalEstimatedCost,
    };
  }
}
