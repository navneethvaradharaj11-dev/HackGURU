import { ActionType, NotificationType, Role } from '@prisma/client';

export interface IDatabaseAdapter {
  // User Operations
  findUserByEmail(email: string): Promise<any | null>;
  findUserById(id: string): Promise<any | null>;
  createUser(data: { email: string; passwordHash: string; role?: Role }): Promise<any>;

  // Student Operations
  findStudentByUserId(userId: string): Promise<any | null>;
  findStudentById(id: string): Promise<any | null>;
  createStudentProfile(data: {
    userId: string;
    fullName: string;
    collegeName: string;
    branch: string;
    yearOfStudy: number;
    degree: string;
    location: string;
    careerGoal: string;
    bio?: string;
  }): Promise<any>;
  updateStudentProfile(studentId: string, data: any): Promise<any>;
  updateStudentInterests(studentId: string, interestIds: string[]): Promise<void>;
  updateStudentSkills(studentId: string, skills: { skillId: string; proficiencyLevel?: string }[]): Promise<void>;
  getAllInterests(): Promise<any[]>;
  getAllSkills(): Promise<any[]>;

  // Event & Intelligence Operations
  findAllEvents(params?: { category?: string; location?: string; search?: string; limit?: number; skip?: number }): Promise<any[]>;
  findEventById(id: string): Promise<any | null>;
  createEvent(data: any): Promise<any>;
  upsertEventIntelligence(eventId: string, intelligenceData: any): Promise<any>;
  getCandidateEventsForStudent(limit?: number): Promise<any[]>;

  // Interaction Operations
  logInteraction(data: { studentId: string; eventId: string; action: ActionType; metadata?: any }): Promise<any>;
  getStudentInteractions(studentId: string): Promise<any[]>;

  // Recommendation Operations
  findRecommendationsByStudentId(studentId: string): Promise<any[]>;
  upsertRecommendation(data: {
    studentId: string;
    eventId: string;
    score: number;
    reason: string;
    explanation: string;
    agentRefined: boolean;
    status: string;
  }): Promise<any>;

  // Calendar Operations
  addCalendarEvent(data: {
    studentId: string;
    eventId: string;
    startDate: Date;
    registrationDeadline: Date;
    reminderTime: Date;
    reminderType?: string;
    status?: string;
  }): Promise<any>;
  getStudentCalendarEvents(studentId: string): Promise<any[]>;
  removeCalendarEvent(id: string, studentId: string): Promise<boolean>;

  // Notification Operations
  createNotification(data: {
    studentId: string;
    eventId?: string;
    title: string;
    message: string;
    type: NotificationType;
  }): Promise<any>;
  getStudentNotifications(studentId: string, limit?: number): Promise<any[]>;
  markNotificationAsRead(id: string, studentId: string): Promise<boolean>;

  // AI Usage Telemetry Operations
  logAIUsage(metrics: any): Promise<any>;
  logAIRequest(requestData: any): Promise<any>;
  getAIUsageSummary(): Promise<any>;
}
