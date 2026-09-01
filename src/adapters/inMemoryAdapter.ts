import { IDatabaseAdapter } from './databaseAdapter.interface';
import { ActionType, NotificationType, Role } from '@prisma/client';

export class InMemoryDatabaseAdapter implements IDatabaseAdapter {
  private users: Map<string, any> = new Map();
  private studentProfiles: Map<string, any> = new Map();
  private interests: Map<string, any> = new Map();
  private skills: Map<string, any> = new Map();
  private events: Map<string, any> = new Map();
  private eventIntelligences: Map<string, any> = new Map();
  private studentInterests: Map<string, any[]> = new Map();
  private studentSkills: Map<string, any[]> = new Map();
  private interactions: any[] = [];
  private recommendations: Map<string, any> = new Map();
  private calendarEvents: Map<string, any> = new Map();
  private notifications: Map<string, any> = new Map();
  private notificationPreferences: Map<string, any> = new Map();
  private aiUsageLogs: any[] = [];
  private aiRequests: any[] = [];

  constructor() {
    this.seedDefaultContractData();
  }

  private seedDefaultContractData() {
    // Seed basic skills taxonomy
    const skillList = [
      { id: 'sk-1', name: 'Python', category: 'Programming Languages' },
      { id: 'sk-2', name: 'TypeScript', category: 'Programming Languages' },
      { id: 'sk-3', name: 'PyTorch', category: 'Machine Learning' },
      { id: 'sk-4', name: 'React', category: 'Frontend' },
      { id: 'sk-5', name: 'Node.js', category: 'Backend' },
    ];
    for (const sk of skillList) {
      this.skills.set(sk.id, sk);
    }

    // Seed basic interests
    const interestList = [
      { id: 'in-1', name: 'Generative AI', category: 'Artificial Intelligence' },
      { id: 'in-2', name: 'Web Development', category: 'Software Development' },
      { id: 'in-3', name: 'Machine Learning', category: 'Artificial Intelligence' },
    ];
    for (const intr of interestList) {
      this.interests.set(intr.id, intr);
    }

    // Seed sample contract events
    const now = new Date();
    const event1 = {
      id: 'event-contract-1',
      title: 'HackGURU Shared DB AI Hackathon 2026',
      description: 'Flagship AI hackathon ingested into shared database contract.',
      category: 'AI & ML',
      eligibility: 'All Engineering Students',
      requiredSkills: ['Python', 'PyTorch', 'Gemini API'],
      location: 'Bengaluru / Online',
      duration: '48 Hours',
      startDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      registrationDeadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      organizer: 'AllCollegeEvent Shared Network',
      externalUrl: 'https://allcollegeevent.com/events/shared-1',
      isRaw: false,
    };
    this.events.set(event1.id, event1);

    this.eventIntelligences.set(event1.id, {
      id: `intel-${event1.id}`,
      eventId: event1.id,
      domains: ['Artificial Intelligence', 'Generative AI'],
      skills: ['Python', 'PyTorch'],
      targetAudience: ['Undergraduate Students'],
      difficulty: 'INTERMEDIATE',
      careerPaths: ['AI Research Engineer', 'Data Scientist'],
      prerequisites: ['Basic Python'],
      learningOutcomes: ['Project Building', 'Mentorship'],
      eventType: 'HACKATHON',
      contentHash: `hash_${event1.id}_v1`,
      analyzedAt: new Date(),
    });
  }

  // --- USER OPERATIONS ---
  public async findUserByEmail(email: string): Promise<any | null> {
    for (const u of this.users.values()) {
      if (u.email === email) {
        const student = this.findStudentByUserIdSync(u.id);
        return { ...u, student };
      }
    }
    return null;
  }

  public async findUserById(id: string): Promise<any | null> {
    const u = this.users.get(id);
    if (!u) return null;
    const student = this.findStudentByUserIdSync(u.id);
    return { ...u, student };
  }

  public async createUser(data: { email: string; passwordHash: string; role?: Role }): Promise<any> {
    const user = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role || Role.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // --- STUDENT OPERATIONS ---
  private findStudentByUserIdSync(userId: string): any | null {
    for (const sp of this.studentProfiles.values()) {
      if (sp.userId === userId) {
        return this.enrichStudentProfile(sp);
      }
    }
    return null;
  }

  private enrichStudentProfile(sp: any) {
    const sInterests = (this.studentInterests.get(sp.id) || []).map((si) => ({
      ...si,
      interest: this.interests.get(si.interestId),
    }));
    const sSkills = (this.studentSkills.get(sp.id) || []).map((ss) => ({
      ...ss,
      skill: this.skills.get(ss.skillId),
    }));
    const prefs = this.notificationPreferences.get(sp.id) || {
      enableDeadlineAlerts: true,
      enableRecommendationAlerts: true,
      emailNotifications: true,
      pushNotifications: true,
    };
    return {
      ...sp,
      interests: sInterests,
      skills: sSkills,
      projects: [],
      hackathons: [],
      internships: [],
      notificationPreferences: prefs,
    };
  }

  public async findStudentByUserId(userId: string): Promise<any | null> {
    return this.findStudentByUserIdSync(userId);
  }

  public async findStudentById(id: string): Promise<any | null> {
    const sp = this.studentProfiles.get(id);
    if (!sp) return null;
    return this.enrichStudentProfile(sp);
  }

  public async createStudentProfile(data: any): Promise<any> {
    const id = `student-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const student = {
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.studentProfiles.set(id, student);

    this.notificationPreferences.set(id, {
      id: `pref-${id}`,
      studentId: id,
      enableDeadlineAlerts: true,
      enableRecommendationAlerts: true,
      emailNotifications: true,
      pushNotifications: true,
    });

    return this.enrichStudentProfile(student);
  }

  public async updateStudentProfile(studentId: string, data: any): Promise<any> {
    const existing = this.studentProfiles.get(studentId);
    if (!existing) throw new Error('Student profile not found');
    const updated = { ...existing, ...data, updatedAt: new Date() };
    this.studentProfiles.set(studentId, updated);
    return this.enrichStudentProfile(updated);
  }

  public async updateStudentInterests(studentId: string, interestIds: string[]): Promise<void> {
    const sInterests = interestIds.map((interestId) => ({
      id: `si-${Date.now()}-${Math.random()}`,
      studentId,
      interestId,
    }));
    this.studentInterests.set(studentId, sInterests);
  }

  public async updateStudentSkills(studentId: string, skillsList: any[]): Promise<void> {
    const sSkills = skillsList.map((s) => ({
      id: `ss-${Date.now()}-${Math.random()}`,
      studentId,
      skillId: s.skillId,
      proficiencyLevel: s.proficiencyLevel || 'INTERMEDIATE',
    }));
    this.studentSkills.set(studentId, sSkills);
  }

  public async getAllInterests(): Promise<any[]> {
    return Array.from(this.interests.values());
  }

  public async getAllSkills(): Promise<any[]> {
    return Array.from(this.skills.values());
  }

  // --- EVENT & INTELLIGENCE OPERATIONS ---
  public async findAllEvents(params?: any): Promise<any[]> {
    let result = Array.from(this.events.values());
    if (params?.category) {
      result = result.filter((e) => e.category.toLowerCase().includes(params.category.toLowerCase()));
    }
    if (params?.search) {
      result = result.filter((e) =>
        e.title.toLowerCase().includes(params.search.toLowerCase()) ||
        e.description.toLowerCase().includes(params.search.toLowerCase())
      );
    }
    return result.map((e) => ({
      ...e,
      intelligence: this.eventIntelligences.get(e.id) || null,
    }));
  }

  public async findEventById(id: string): Promise<any | null> {
    const event = this.events.get(id);
    if (!event) return null;
    return {
      ...event,
      intelligence: this.eventIntelligences.get(id) || null,
    };
  }

  public async createEvent(data: any): Promise<any> {
    const id = data.id || `event-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const event = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
    this.events.set(id, event);
    return event;
  }

  public async upsertEventIntelligence(eventId: string, intelligenceData: any): Promise<any> {
    const intelligence = {
      id: `intel-${eventId}`,
      eventId,
      ...intelligenceData,
      analyzedAt: new Date(),
    };
    this.eventIntelligences.set(eventId, intelligence);
    return intelligence;
  }

  public async getCandidateEventsForStudent(limit: number = 500): Promise<any[]> {
    return this.findAllEvents({ limit });
  }

  // --- INTERACTION OPERATIONS ---
  public async logInteraction(data: any): Promise<any> {
    const entry = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      createdAt: new Date(),
    };
    this.interactions.push(entry);
    return entry;
  }

  public async getStudentInteractions(studentId: string): Promise<any[]> {
    return this.interactions.filter((i) => i.studentId === studentId);
  }

  // --- RECOMMENDATION OPERATIONS ---
  public async findRecommendationsByStudentId(studentId: string): Promise<any[]> {
    const list: any[] = [];
    for (const rec of this.recommendations.values()) {
      if (rec.studentId === studentId && rec.status === 'ACTIVE') {
        const ev = await this.findEventById(rec.eventId);
        list.push({ ...rec, event: ev });
      }
    }
    return list.sort((a, b) => b.score - a.score);
  }

  public async upsertRecommendation(data: any): Promise<any> {
    const key = `${data.studentId}_${data.eventId}`;
    const rec = {
      id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      updatedAt: new Date(),
    };
    this.recommendations.set(key, rec);
    const ev = await this.findEventById(data.eventId);
    return { ...rec, event: ev };
  }

  // --- CALENDAR OPERATIONS ---
  public async addCalendarEvent(data: any): Promise<any> {
    const id = `cal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const calEvent = { id, ...data, createdAt: new Date() };
    this.calendarEvents.set(id, calEvent);
    const ev = await this.findEventById(data.eventId);
    return { ...calEvent, event: ev };
  }

  public async getStudentCalendarEvents(studentId: string): Promise<any[]> {
    const list: any[] = [];
    for (const c of this.calendarEvents.values()) {
      if (c.studentId === studentId) {
        const ev = await this.findEventById(c.eventId);
        list.push({ ...c, event: ev });
      }
    }
    return list;
  }

  public async removeCalendarEvent(id: string, studentId: string): Promise<boolean> {
    const existing = this.calendarEvents.get(id);
    if (existing && existing.studentId === studentId) {
      this.calendarEvents.delete(id);
      return true;
    }
    return false;
  }

  // --- NOTIFICATION OPERATIONS ---
  public async createNotification(data: any): Promise<any> {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const notification = { id, ...data, isRead: false, createdAt: new Date() };
    this.notifications.set(id, notification);
    return notification;
  }

  public async getStudentNotifications(studentId: string, limit: number = 20): Promise<any[]> {
    const list: any[] = [];
    for (const n of this.notifications.values()) {
      if (n.studentId === studentId) {
        const ev = n.eventId ? await this.findEventById(n.eventId) : null;
        list.push({ ...n, event: ev });
      }
    }
    return list.slice(0, limit);
  }

  public async markNotificationAsRead(id: string, studentId: string): Promise<boolean> {
    const n = this.notifications.get(id);
    if (n && n.studentId === studentId) {
      n.isRead = true;
      this.notifications.set(id, n);
      return true;
    }
    return false;
  }

  // --- AI USAGE TELEMETRY OPERATIONS ---
  public async logAIUsage(metrics: any): Promise<any> {
    const entry = { id: `usage-${Date.now()}`, ...metrics, timestamp: new Date() };
    this.aiUsageLogs.push(entry);
    return entry;
  }

  public async logAIRequest(requestData: any): Promise<any> {
    const entry = { id: `reqlog-${Date.now()}`, ...requestData, createdAt: new Date() };
    this.aiRequests.push(entry);
    return entry;
  }

  public async getAIUsageSummary(): Promise<any> {
    const totalRequests = this.aiUsageLogs.length;
    const successRequests = this.aiUsageLogs.filter((u) => u.success).length;

    const totalInputTokens = this.aiUsageLogs.reduce((acc, curr) => acc + (curr.inputTokens || 0), 0);
    const totalOutputTokens = this.aiUsageLogs.reduce((acc, curr) => acc + (curr.outputTokens || 0), 0);
    const totalTokens = this.aiUsageLogs.reduce((acc, curr) => acc + (curr.totalTokens || 0), 0);
    const totalEstimatedCost = this.aiUsageLogs.reduce((acc, curr) => acc + (curr.estimatedCost || 0), 0);

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
