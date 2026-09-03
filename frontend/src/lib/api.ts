import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('ace_auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface StudentProfile {
  id?: string;
  email: string;
  fullName: string;
  collegeName?: string;
  branch?: string;
  yearOfStudy?: number;
  degree?: string;
  location?: string;
  careerGoal?: string;
  bio?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  organizer: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  domainTags?: string[];
  skillsRequired?: string[];
  targetAudience?: string[];
  difficultyLevel?: string;
  careerPathMatch?: string[];
  learningOutcomes?: string[];
  analyzedAt?: string;
}

export interface RecommendationItem {
  eventId: string;
  score: number;
  matchReason: string;
  recommendedRole?: string;
  suggestedPrep?: string[];
  estimatedDifficulty?: string;
  event: EventItem;
}

export interface AIUsageStats {
  totalTokensConsumed: number;
  totalRequestsServed: number;
  estimatedCostUSD: number;
  cacheHitRatio: number;
  avgLatencyMs: number;
  activeProviderPools: {
    gemini: { poolSize: number; activeKeys: number; health: string };
    openai: { poolSize: number; activeKeys: number; health: string };
    huggingface: { poolSize: number; activeKeys: number; health: string };
  };
  recentLogs: Array<{
    id: string;
    timestamp: string;
    model: string;
    keyId: string;
    tokens: number;
    latencyMs: number;
    cached: boolean;
  }>;
}

// Auth APIs
export const authApi = {
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },
  register: async (payload: Partial<StudentProfile> & { password: string }) => {
    const res = await api.post('/auth/register', payload);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
};

// Dashboard API
export const dashboardApi = {
  getDashboard: async () => {
    const res = await api.get('/dashboard');
    return res.data;
  },
};

// Events API
export const eventsApi = {
  getEvents: async (params?: { category?: string; location?: string; search?: string }) => {
    const res = await api.get('/events', { params });
    return res.data;
  },
  getEventById: async (id: string) => {
    const res = await api.get(`/events/${id}`);
    return res.data;
  },
  analyzeEvent: async (id: string) => {
    const res = await api.post(`/events/${id}/analyze`);
    return res.data;
  },
};

// Recommendation API
export const recommendationApi = {
  getRecommendations: async () => {
    const res = await api.get('/recommendations');
    return res.data;
  },
  refreshRecommendations: async () => {
    const res = await api.post('/recommendations/refresh');
    return res.data;
  },
};

// Interactions API
export const interactionApi = {
  logInteraction: async (eventId: string, action: 'VIEW' | 'SAVE' | 'SHARE' | 'REGISTER' | 'DISMISS' | 'SEARCH' | 'CALENDAR_ADD', metadata?: Record<string, any>) => {
    const res = await api.post('/interactions', { eventId, action, metadata });
    return res.data;
  },
};

// Calendar API
export const calendarApi = {
  getCalendar: async () => {
    const res = await api.get('/calendar');
    return res.data;
  },
  addToCalendar: async (eventId: string) => {
    const res = await api.post('/calendar', { eventId });
    return res.data;
  },
  removeFromCalendar: async (id: string) => {
    const res = await api.delete(`/calendar/${id}`);
    return res.data;
  },
};

// Notifications API
export const notificationApi = {
  getNotifications: async () => {
    const res = await api.get('/notifications');
    return res.data;
  },
  markRead: async (id: string) => {
    const res = await api.post(`/notifications/${id}/read`);
    return res.data;
  },
};

// AI Telemetry API
export const aiApi = {
  getUsage: async () => {
    const res = await api.get('/ai/usage');
    return res.data;
  },
};
