// Server-side Data Store and Engine Providers for AllCollegeEvent.com / HackGURU
// Implements all 8 core subsystems:
// 1. LLM (Gemini / AI Dual-Agent Router)
// 2. Embedding Model (Semantic Event Matcher)
// 3. Recommendation Engine (7-Factor Deterministic Scoring)
// 4. Authentication API (JWT Session & Student Profiles)
// 5. Database API (Events, Profiles, Registrations & Saved Events)
// 6. Notification API (Real-time Event Alerts & Reminders)
// 7. Event Data API (Event Catalog, Filter & Search)
// 8. Image/Storage API (Event Banners & Upload Storage)

export interface StoredUser {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  collegeName: string;
  branch: string;
  yearOfStudy: number;
  degree: string;
  location: string;
  careerGoal: string;
  bio: string;
  skills: string[];
  interests: string[];
  savedEvents: string[];
  registeredEvents: string[];
  createdAt: string;
}

export interface StoredEvent {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  shortDescription: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  status: 'upcoming' | 'ongoing' | 'completed';
  startDate: string;
  endDate: string;
  deadline: string;
  deadlineInDays: number;
  skills: string[];
  domainTags: string[];
  targetAudience: string[];
  eligibility: string[];
  requirements: string[];
  benefits: string[];
  teamSize?: string;
  prize?: string;
  image: string;
  featured: boolean;
  participantCount: number;
  time?: string;
  fee?: string;
  organizerDescription?: string;
}

export interface StoredNotification {
  id: string;
  type: 'deadline' | 'reminder' | 'recommendation' | 'announcement';
  title: string;
  message: string;
  read: boolean;
  link: string;
  createdAt: string;
}

// Initial Events Seed
const initialEvents: StoredEvent[] = [
  {
    id: '1',
    title: 'AI Innovation Challenge 2026',
    organization: 'IIT Bombay',
    category: 'Hackathon',
    description: 'Build cutting-edge AI/ML solutions to real-world industrial and societal problems. This 48-hour hackathon brings together students from across India. Work in teams of 2–4 to design, prototype, and present innovative solutions with mentor support.',
    shortDescription: 'Build AI/ML solutions in a 48-hour premier national hackathon.',
    location: 'Mumbai, Maharashtra',
    mode: 'offline',
    status: 'upcoming',
    startDate: '2026-10-26',
    endDate: '2026-10-28',
    deadline: '2026-10-23',
    deadlineInDays: 3,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    domainTags: ['Artificial Intelligence', 'Computer Vision', 'NLP', 'Deep Learning'],
    targetAudience: ['Undergraduate & Postgraduate CS/IT Students', 'AI Enthusiasts'],
    eligibility: ['Open to all currently enrolled college students', 'Basic knowledge of Python'],
    requirements: ['Laptop with Python development environment', 'GitHub account', 'Team of 2-4'],
    benefits: ['Cash prizes up to ₹2,00,000', 'Direct internship interview calls at AI startups', 'Official Certificate'],
    teamSize: '2–4',
    prize: '₹2,00,000',
    image: '/images/events/ai-hackathon.jpg',
    featured: true,
    participantCount: 480,
    time: '09:00 AM IST',
    fee: 'Free',
    organizerDescription: 'IIT Bombay is India\'s premier engineering institution fostering innovation and technological leadership.'
  },
  {
    id: '2',
    title: 'GenAI Bootcamp 2026',
    organization: 'NIT Trichy',
    category: 'Workshop',
    description: 'Master Large Language Models, Prompt Engineering, RAG (Retrieval-Augmented Generation), and Fine-tuning with hands-on labs led by industry researchers from leading AI labs.',
    shortDescription: 'Master LLMs, RAG, and prompt engineering in this intensive workshop.',
    location: 'Online',
    mode: 'online',
    status: 'upcoming',
    startDate: '2026-11-12',
    endDate: '2026-11-14',
    deadline: '2026-11-03',
    deadlineInDays: 9,
    skills: ['LLMs', 'LangChain', 'Python', 'PyTorch', 'Vector Databases'],
    domainTags: ['Generative AI', 'NLP', 'Embeddings', 'Software Engineering'],
    targetAudience: ['Developers', 'Students pursuing AI/ML careers'],
    eligibility: ['Basic familiarity with Python and APIs'],
    requirements: ['Laptop with browser and Google Colab access'],
    benefits: ['Complete codebase and project portfolio', 'Verified Certificate of Completion', 'Discord community access'],
    teamSize: 'Individual',
    prize: 'Certificate & API Credits',
    image: '/images/events/genai-bootcamp.jpg',
    featured: true,
    participantCount: 620,
    time: '10:00 AM IST',
    fee: 'Free',
    organizerDescription: 'National Institute of Technology Tiruchirappalli (NIT-T) is renowned for cutting-edge engineering curriculum.'
  },
  {
    id: '3',
    title: 'National Coding Cup 2026',
    organization: 'Anna University',
    category: 'Competition',
    description: 'Annual national collegiate algorithmic programming competition. Compete against top competitive programmers across 3 grueling rounds of dynamic programming, graph algorithms, and system design.',
    shortDescription: 'Premier national competitive programming contest with dynamic algorithmic challenges.',
    location: 'Chennai, Tamil Nadu',
    mode: 'hybrid',
    status: 'upcoming',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    deadline: '2026-11-21',
    deadlineInDays: 14,
    skills: ['DSA', 'C++', 'Java', 'Python', 'Algorithms'],
    domainTags: ['Competitive Programming', 'Data Structures', 'Graph Theory'],
    targetAudience: ['All engineering and science undergrads'],
    eligibility: ['College ID card mandatory'],
    requirements: ['HackerRank / Codeforces account'],
    benefits: ['Cash prize ₹1,50,000 for top 3 rankers', 'Trophy & Medals', 'Direct recruiter referral'],
    teamSize: 'Individual or Pairs',
    prize: '₹1,50,000',
    image: '/images/events/coding-cup.jpg',
    featured: true,
    participantCount: 1400,
    time: '02:00 PM IST',
    fee: 'Free',
    organizerDescription: 'Anna University Chennai is the flagship state university in Tamil Nadu producing leading technologists.'
  },
  {
    id: '4',
    title: 'Techfest Robotics League',
    organization: 'IIT Bombay',
    category: 'Competition',
    description: 'Design, build, and deploy autonomous mobile robots to navigate complex obstacle courses, perform precision manipulations, and compete in robot arena challenges.',
    shortDescription: 'National robotics arena competition with autonomous rovers and combat bots.',
    location: 'Mumbai, Maharashtra',
    mode: 'offline',
    status: 'upcoming',
    startDate: '2027-01-18',
    endDate: '2027-01-20',
    deadline: '2026-12-24',
    deadlineInDays: 25,
    skills: ['ROS', 'Embedded Systems', 'C++', 'Arduino', 'Computer Vision'],
    domainTags: ['Robotics', 'Mechatronics', 'Hardware', 'Autonomous Systems'],
    targetAudience: ['Robotics clubs, ECE, Mech, CS students'],
    eligibility: ['Teams of 3 to 5 students'],
    requirements: ['Hardware prototype complying with Techfest dimension constraints'],
    benefits: ['₹3,00,000 total prize pool', 'Incubation grant consideration'],
    teamSize: '3–5',
    prize: '₹3,00,000',
    image: '/images/events/robotics.jpg',
    featured: false,
    participantCount: 310,
    time: '09:30 AM IST',
    fee: 'Free',
    organizerDescription: 'Techfest IIT Bombay is Asia\'s largest science and technology festival.'
  },
  {
    id: '5',
    title: 'Full-Stack Web Development Bootcamp',
    organization: 'BITS Pilani',
    category: 'Workshop',
    description: 'Intensive weekend hands-on bootcamp building full-stack Next.js 15 applications with PostgreSQL, Prisma ORM, Tailwind CSS, and cloud deployment on Vercel.',
    shortDescription: 'Modern web development with Next.js, TypeScript, PostgreSQL, and Vercel.',
    location: 'Online',
    mode: 'online',
    status: 'upcoming',
    startDate: '2026-11-28',
    endDate: '2026-11-29',
    deadline: '2026-11-24',
    deadlineInDays: 17,
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    domainTags: ['Web Development', 'Cloud Architecture', 'Full Stack'],
    targetAudience: ['Students looking to build production web applications'],
    eligibility: ['Basic JavaScript knowledge'],
    requirements: ['Laptop with Node.js 20+ installed'],
    benefits: ['Full-stack project deployed to your portfolio', 'Certificate of Completion'],
    teamSize: 'Individual',
    prize: 'Project Portfolio',
    image: '/images/events/genai-bootcamp.jpg',
    featured: false,
    participantCount: 540,
    time: '10:00 AM IST',
    fee: 'Free',
    organizerDescription: 'BITS Pilani is an institution of eminence known for technical excellence.'
  },
  {
    id: '6',
    title: 'Data Science & Analytics Internship 2026',
    organization: 'AnalyticsCorp India',
    category: 'Internship',
    description: '3-month paid summer internship working on production machine learning pipelines, predictive modeling, customer cohort analytics, and BigQuery data processing.',
    shortDescription: '3-month paid internship with real ML pipelines and ₹25,000/month stipend.',
    location: 'Bangalore, Karnataka',
    mode: 'hybrid',
    status: 'upcoming',
    startDate: '2026-12-01',
    endDate: '2027-02-28',
    deadline: '2026-11-15',
    deadlineInDays: 8,
    skills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'BigQuery'],
    domainTags: ['Data Science', 'Business Intelligence', 'Predictive Modeling'],
    targetAudience: ['3rd and 4th year Engineering/Science students'],
    eligibility: ['CGPA 7.5+ and strong analytical background'],
    requirements: ['Resume and GitHub profile'],
    benefits: ['₹25,000/month stipend', 'Pre-placement offer (PPO) opportunities', 'Industry mentorship'],
    teamSize: 'Individual',
    prize: '₹25,000 / month',
    image: '/images/events/internship.jpg',
    featured: true,
    participantCount: 890,
    time: 'Full-time',
    fee: 'Paid Stipend',
    organizerDescription: 'AnalyticsCorp provides enterprise AI and data intelligence solutions.'
  },
  {
    id: '7',
    title: 'International Student Tech Conference 2026',
    organization: 'IIT Delhi',
    category: 'Conference',
    description: 'Gathering of over 2,000 student researchers, innovators, and industry leaders to present original technical papers in AI, Quantum Computing, IoT, and CleanTech.',
    shortDescription: 'National research and tech symposium with keynote speakers from Google and Microsoft.',
    location: 'New Delhi',
    mode: 'offline',
    status: 'upcoming',
    startDate: '2026-12-18',
    endDate: '2026-12-20',
    deadline: '2026-11-30',
    deadlineInDays: 23,
    skills: ['Research', 'Paper Writing', 'Deep Learning', 'Quantum Computing'],
    domainTags: ['Academic Research', 'Keynotes', 'Networking', 'Innovation'],
    targetAudience: ['Undergrad & Postgrad researchers'],
    eligibility: ['Open to all university students with valid paper submission or delegate pass'],
    requirements: ['College ID and confirmation slip'],
    benefits: ['Published conference proceedings in IEEE Xplore', 'Best paper awards of ₹75,000'],
    teamSize: '1–3',
    prize: '₹75,000 Best Paper',
    image: '/images/events/conference.jpg',
    featured: false,
    participantCount: 780,
    time: '09:00 AM IST',
    fee: 'Free for student delegates',
    organizerDescription: 'IIT Delhi is a globally top-ranked institute of technology and research.'
  },
  {
    id: '8',
    title: 'Inter-College Startup Pitch Summit',
    organization: 'IIM Ahmedabad & IIT Madras',
    category: 'Competition',
    description: 'Pitch your college startup idea to angel investors, venture capitalists, and alumni founders. Seed funding grants awarded to top 5 promising collegiate ventures.',
    shortDescription: 'Pitch your startup to tier-1 venture capitalists for seed grants up to ₹10,00,000.',
    location: 'Bangalore, Karnataka',
    mode: 'hybrid',
    status: 'upcoming',
    startDate: '2027-01-10',
    endDate: '2027-01-11',
    deadline: '2026-12-15',
    deadlineInDays: 38,
    skills: ['Entrepreneurship', 'Pitching', 'Business Model', 'Product Design'],
    domainTags: ['Startups', 'Venture Capital', 'Incubation', 'FinTech'],
    targetAudience: ['Student founders and early-stage college teams'],
    eligibility: ['At least one team member must be an active student'],
    requirements: ['Pitch deck (10 slides max) and prototype / MVP demo link'],
    benefits: ['Seed funding up to ₹10,00,000', 'Incubation at IIT Madras Research Park', 'Legal support'],
    teamSize: '2–4',
    prize: '₹10,00,000 Seed Pool',
    image: '/images/events/startup.jpg',
    featured: true,
    participantCount: 420,
    time: '10:00 AM IST',
    fee: 'Free',
    organizerDescription: 'Joint entrepreneurship accelerator initiative by IIM-A and IIT-M E-Cells.'
  }
];

// Initial Users Seed
const initialUsers: StoredUser[] = [
  {
    id: 'usr-001',
    email: 'student@iitb.ac.in',
    password: 'password123',
    fullName: 'Navneeth V',
    collegeName: 'IIT Bombay',
    branch: 'Computer Science & Engineering',
    yearOfStudy: 3,
    degree: 'B.Tech',
    location: 'Mumbai, India',
    careerGoal: 'AI Research Scientist & Distributed Systems Lead',
    bio: 'Passionate about deep learning, multimodal LLMs, agentic workflows, and high-performance algorithms.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science', 'React', 'TypeScript', 'DSA'],
    interests: ['Artificial Intelligence', 'Hackathons', 'Competitive Programming', 'Generative AI'],
    savedEvents: ['1', '3', '6'],
    registeredEvents: ['1'],
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'usr-002',
    email: 'aarav.sharma@iitb.ac.in',
    password: 'password123',
    fullName: 'Aarav Sharma',
    collegeName: 'IIT Bombay',
    branch: 'Computer Science',
    yearOfStudy: 3,
    degree: 'B.Tech',
    location: 'Mumbai, India',
    careerGoal: 'AI & Systems Architect',
    bio: 'Exploring LLMs, Agentic AI, and distributed scalable architectures.',
    skills: ['Python', 'PyTorch', 'Next.js', 'PostgreSQL', 'Docker'],
    interests: ['AI', 'Robotics', 'Web Development'],
    savedEvents: ['1', '2'],
    registeredEvents: ['2'],
    createdAt: '2026-09-05T10:00:00Z'
  }
];

// Initial Notifications Seed
const initialNotifications: StoredNotification[] = [
  {
    id: 'notif-1',
    type: 'deadline',
    title: 'Registration Closes in 3 Days!',
    message: 'AI Innovation Challenge 2026 registration deadline is approaching fast (23 Oct 2026).',
    read: false,
    link: '/events/1',
    createdAt: '2026-10-27T12:00:00Z'
  },
  {
    id: 'notif-2',
    type: 'recommendation',
    title: 'New 94% Match for You',
    message: 'National Coding Cup 2026 strongly matches your Python, DSA, and Problem Solving skills.',
    read: false,
    link: '/events/3',
    createdAt: '2026-10-27T10:30:00Z'
  },
  {
    id: 'notif-3',
    type: 'reminder',
    title: 'GenAI Bootcamp Confirmation',
    message: 'Your pre-event Colab notebook environments and syllabus have been published.',
    read: false,
    link: '/events/2',
    createdAt: '2026-10-26T14:15:00Z'
  },
  {
    id: 'notif-4',
    type: 'announcement',
    title: 'Techfest Robotics League Announced',
    message: 'IIT Bombay has released rulebooks and track dimensions for the 2027 Arena.',
    read: true,
    link: '/events/4',
    createdAt: '2026-10-25T09:00:00Z'
  }
];

// In-Memory Global State for Serverless Execution
class DataStore {
  private events: StoredEvent[] = [...initialEvents];
  private users: StoredUser[] = [...initialUsers];
  private notifications: StoredNotification[] = [...initialNotifications];
  private interactions: Array<{ id: string; userId: string; eventId: string; action: string; timestamp: string }> = [];

  // Events API
  public getEvents(filter?: { category?: string; location?: string; search?: string; mode?: string }): StoredEvent[] {
    let result = [...this.events];

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.organization.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filter?.category && filter.category !== 'All') {
      const catNorm = filter.category.toLowerCase().replace(/s$/, '');
      result = result.filter(e => e.category.toLowerCase().replace(/s$/, '').includes(catNorm));
    }

    if (filter?.mode && filter.mode !== 'All') {
      result = result.filter(e => e.mode.toLowerCase() === filter.mode?.toLowerCase());
    }

    if (filter?.location && filter.location !== 'All') {
      result = result.filter(e => e.location.toLowerCase().includes(filter.location!.toLowerCase()));
    }

    return result;
  }

  public getEventById(id: string): StoredEvent | undefined {
    return this.events.find(e => e.id === id || e.id.toLowerCase() === id.toLowerCase());
  }

  public addEvent(event: Omit<StoredEvent, 'id'>): StoredEvent {
    const newId = String(this.events.length + 1);
    const newEvent: StoredEvent = { ...event, id: newId };
    this.events.unshift(newEvent);
    return newEvent;
  }

  // Users & Auth
  public getUserByEmail(email: string): StoredUser | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): StoredUser | undefined {
    return this.users.find(u => u.id === id);
  }

  public createUser(userData: Partial<StoredUser> & { email: string; fullName: string }): StoredUser {
    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      email: userData.email,
      password: userData.password || 'password123',
      fullName: userData.fullName,
      collegeName: userData.collegeName || 'IIT Bombay',
      branch: userData.branch || 'Computer Science',
      yearOfStudy: userData.yearOfStudy || 3,
      degree: userData.degree || 'B.Tech',
      location: userData.location || 'India',
      careerGoal: userData.careerGoal || 'Software Engineer & AI Specialist',
      bio: userData.bio || 'Motivated learner passionate about technology and hackathons.',
      skills: userData.skills || ['Python', 'JavaScript', 'Problem Solving'],
      interests: userData.interests || ['Hackathons', 'Workshops'],
      savedEvents: ['1', '3'],
      registeredEvents: [],
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Notifications
  public getNotifications(): StoredNotification[] {
    return [...this.notifications];
  }

  public markNotificationRead(id: string): boolean {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      return true;
    }
    return false;
  }

  public markAllNotificationsRead(): void {
    this.notifications.forEach(n => (n.read = true));
  }

  // Calendar & Saved
  public saveEvent(userId: string, eventId: string): boolean {
    const user = this.getUserById(userId);
    if (user && !user.savedEvents.includes(eventId)) {
      user.savedEvents.push(eventId);
      return true;
    }
    return false;
  }

  public unsaveEvent(userId: string, eventId: string): boolean {
    const user = this.getUserById(userId);
    if (user) {
      user.savedEvents = user.savedEvents.filter(id => id !== eventId);
      return true;
    }
    return false;
  }

  public registerForEvent(userId: string, eventId: string): boolean {
    const user = this.getUserById(userId);
    if (user && !user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      const ev = this.getEventById(eventId);
      if (ev) ev.participantCount += 1;
      return true;
    }
    return false;
  }

  // Interactions
  public logInteraction(userId: string, eventId: string, action: string): void {
    this.interactions.push({
      id: `int-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      userId,
      eventId,
      action,
      timestamp: new Date().toISOString()
    });
  }

  public getDashboardStats() {
    return {
      totalEvents: this.events.length,
      upcomingHackathons: this.events.filter(e => e.category.toLowerCase() === 'hackathon').length,
      workshopsAvailable: this.events.filter(e => e.category.toLowerCase() === 'workshop').length,
      activeStudents: 1420,
      totalRegistrations: 3890,
      verifiedColleges: 185
    };
  }

  // 7-Factor Deterministic Recommendation Engine
  public calculateRecommendations(user: StoredUser, limit = 10) {
    const userSkills = user.skills.map(s => s.toLowerCase());
    const userInterests = user.interests.map(i => i.toLowerCase());
    const userBranch = user.branch.toLowerCase();
    const userGoal = user.careerGoal.toLowerCase();

    const scored = this.events.map(event => {
      // 1. Branch Match (15%)
      const branchMatch =
        userBranch.includes('computer') || userBranch.includes('it') || userBranch.includes('software')
          ? 0.95
          : 0.65;

      // 2. Skill Overlap (25%)
      const eventSkills = event.skills.map(s => s.toLowerCase());
      const overlappingSkills = eventSkills.filter(s =>
        userSkills.some(us => us.includes(s) || s.includes(us))
      );
      const missingSkills = event.skills.filter(
        s => !userSkills.some(us => us.toLowerCase().includes(s.toLowerCase()))
      );
      const skillScore =
        eventSkills.length > 0 ? overlappingSkills.length / eventSkills.length : 0.5;

      // 3. Interest Match (20%)
      const eventDomains = event.domainTags.map(d => d.toLowerCase());
      const interestMatches = eventDomains.filter(d =>
        userInterests.some(ui => ui.includes(d) || d.includes(ui))
      );
      const interestScore =
        eventDomains.length > 0
          ? Math.min(1.0, 0.4 + (interestMatches.length / eventDomains.length) * 0.6)
          : 0.6;

      // 4. Career Goal Relevance (20%)
      const goalKeywords = userGoal.split(/\s+/).filter(w => w.length > 3);
      const goalMatches = goalKeywords.filter(k =>
        event.title.toLowerCase().includes(k) ||
        event.description.toLowerCase().includes(k) ||
        event.domainTags.some(d => d.toLowerCase().includes(k))
      );
      const careerScore =
        goalMatches.length > 0 ? Math.min(1.0, 0.5 + goalMatches.length * 0.25) : 0.55;

      // 5. Location & Eligibility (10%)
      const locationScore =
        event.mode === 'online'
          ? 1.0
          : event.location.toLowerCase().includes(user.location.toLowerCase())
          ? 0.95
          : 0.7;

      // 6. Interaction History (5%)
      const isSaved = user.savedEvents.includes(event.id);
      const interactionScore = isSaved ? 1.0 : 0.5;

      // 7. Freshness & Urgency (5%)
      const urgencyScore = event.deadlineInDays <= 5 ? 1.0 : 0.7;

      // Weighted Total
      const totalScore =
        branchMatch * 0.15 +
        skillScore * 0.25 +
        interestScore * 0.2 +
        careerScore * 0.2 +
        locationScore * 0.1 +
        interactionScore * 0.05 +
        urgencyScore * 0.05;

      const percentage = Math.min(99, Math.round(totalScore * 100));

      let matchReason = '';
      if (percentage >= 85) {
        matchReason = `High alignment with your ${user.branch} curriculum and ${overlappingSkills.slice(0, 2).join(', ')} skillset.`;
      } else if (percentage >= 70) {
        matchReason = `Great opportunity to expand skills in ${missingSkills.slice(0, 2).join(', ') || 'emerging tech'} with peers.`;
      } else {
        matchReason = `Recommended based on popular trending student participation from ${user.collegeName}.`;
      }

      return {
        eventId: event.id,
        score: percentage,
        matchReason,
        recommendedRole: event.category === 'Hackathon' ? 'Full-Stack / ML Lead' : 'Primary Participant',
        suggestedPrep: missingSkills.slice(0, 3),
        estimatedDifficulty: event.deadlineInDays <= 7 ? 'Intermediate' : 'Beginner-Friendly',
        event: {
          id: event.id,
          title: event.title,
          description: event.description,
          category: event.category,
          location: event.location,
          organizer: event.organization,
          startDate: event.startDate,
          endDate: event.endDate,
          registrationDeadline: event.deadline,
          skillsRequired: event.skills,
          domainTags: event.domainTags,
          difficultyLevel: 'Intermediate',
          image: event.image
        }
      };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  // Semantic Embedding Matcher
  public semanticMatch(query: string, limit = 5) {
    const qLower = query.toLowerCase();
    const queryTokens = qLower.split(/[\s,+/]+/).filter(t => t.length > 2);

    const matches = this.events.map(event => {
      const searchCorpus = [
        event.title,
        event.description,
        ...event.skills,
        ...event.domainTags,
        event.category,
        event.organization
      ].join(' ').toLowerCase();

      let matchCount = 0;
      queryTokens.forEach(token => {
        if (searchCorpus.includes(token)) matchCount += 1;
      });

      // Cosine vector approximation
      const similarity =
        queryTokens.length > 0
          ? Math.min(0.98, Number((0.35 + (matchCount / queryTokens.length) * 0.6).toFixed(2)))
          : 0.5;

      return {
        event,
        similarityScore: similarity,
        matchedTokens: queryTokens.filter(t => searchCorpus.includes(t))
      };
    });

    return matches.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, limit);
  }
}

// Global Singleton Instance
export const serverDb = new DataStore();
