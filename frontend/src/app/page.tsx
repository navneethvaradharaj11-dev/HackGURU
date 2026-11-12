'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Sparkles, Trophy, Code, Presentation, Briefcase, Mic, Rocket, 
  Calendar, Bell, Bookmark, Search, MapPin, Clock, ChevronLeft, ChevronRight, 
  PlusCircle, CheckCircle2, X, Music, Shield, Send, ArrowUpRight, Check,
  CreditCard, PieChart, BarChart3, TrendingUp, Users, Award, Play
} from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Symposium' | 'Workshop' | 'Cultural' | 'Competition' | 'Internship';
  organizer: string;
  location: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  date: string;
  startDate: string;
  deadlineInDays: number;
  prize: string;
  fee: string;
  image: string;
  skills: string[];
  matchScore?: number;
  featured?: boolean;
  participantCount?: number;
  shortDesc: string;
}

const initialPremierEvents: EventItem[] = [
  {
    id: 'hackforge-2026',
    title: 'HackForge 2026: 36-Hour National AI & Web3 Hackathon',
    category: 'Hackathon',
    organizer: 'Kongu Engineering College & PSG Tech',
    location: 'PSG Tech Campus, Coimbatore',
    mode: 'Offline',
    date: '14 - 15 Mar 2026',
    startDate: '2026-03-14T08:30:00',
    deadlineInDays: 4,
    prize: '₹5,00,000',
    fee: 'Free Registration',
    image: '/images/events/hackforge-2026.jpg',
    skills: ['AI/ML', 'Next.js', 'Solidity', 'PyTorch'],
    matchScore: 98,
    featured: true,
    participantCount: 1250,
    shortDesc: '36-hour national offline hackathon with ₹5,00,000 cash prize pool.'
  },
  {
    id: 'innofest-2026',
    title: 'INNOFEST 2026: National Technical Symposium',
    category: 'Symposium',
    organizer: 'Indian Institute of Technology Madras (IIT Madras)',
    location: 'IIT Madras, Chennai',
    mode: 'Offline',
    date: '14 - 16 Mar 2026',
    startDate: '2026-03-14T09:00:00',
    deadlineInDays: 8,
    prize: '₹2,50,000',
    fee: '₹150 / Team',
    image: '/images/events/innofest-2026.jpg',
    skills: ['Research', 'Algorithms', 'Robotics', 'C++'],
    matchScore: 95,
    featured: true,
    participantCount: 980,
    shortDesc: 'IIT Madras flagship national symposium with paper presentations & code battles.'
  },
  {
    id: 'rhythm-2026',
    title: 'RHYTHM 2026: All India Inter-Collegiate Cultural Extravaganza',
    category: 'Cultural',
    organizer: 'Vellore Institute of Technology (VIT)',
    location: 'VIT Campus, Vellore',
    mode: 'Offline',
    date: '10 - 12 Apr 2026',
    startDate: '2026-04-10T16:00:00',
    deadlineInDays: 16,
    prize: '₹4,00,000',
    fee: 'Free Entry',
    image: '/images/events/rhythm-2026.jpg',
    skills: ['Music', 'Choreography', 'Fashion', 'Stage Drama'],
    matchScore: 92,
    featured: true,
    participantCount: 3500,
    shortDesc: 'South India’s premier collegiate cultural extravaganza with ₹4,00,000 prize pool.'
  },
  {
    id: 'agentic-ai-summit-2026',
    title: 'Agentic AI Summit 2026: From LLMs to Autonomous AI Agents',
    category: 'Workshop',
    organizer: 'Anna University, College of Engineering Guindy (CEG)',
    location: 'CEG Campus, Chennai & Online',
    mode: 'Hybrid',
    date: '20 - 22 Apr 2026',
    startDate: '2026-04-20T09:30:00',
    deadlineInDays: 20,
    prize: '₹1,50,000 Credits',
    fee: 'Free',
    image: '/images/events/agentic-ai-summit.jpg',
    skills: ['LangChain', 'CrewAI', 'Python', 'FastAPI'],
    matchScore: 97,
    featured: true,
    participantCount: 850,
    shortDesc: 'Hands-on autonomous multi-agent systems and LLMs masterclass.'
  },
  {
    id: 'robowars-2026',
    title: 'ROBOWARS 2026: All-India Combat Robotics Championship',
    category: 'Competition',
    organizer: 'PSG College of Technology, Coimbatore',
    location: 'PSG Tech Arena, Peelamedu, Coimbatore',
    mode: 'Offline',
    date: '04 - 05 Apr 2026',
    startDate: '2026-04-04T10:00:00',
    deadlineInDays: 12,
    prize: '₹3,50,000',
    fee: '₹500 / Bot Entry',
    image: '/images/events/robowars-2026.jpg',
    skills: ['Robotics', 'Pneumatics', 'Embedded', 'CAD Design'],
    matchScore: 91,
    featured: true,
    participantCount: 420,
    shortDesc: '15kg & 30kg combat robotics arena championship with ₹3,50,000 prize pool.'
  },
  {
    id: 'ai-hackathon-iitb',
    title: 'AI Innovation Challenge 2026',
    category: 'Hackathon',
    organizer: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    mode: 'Offline',
    date: '26 - 28 Oct 2026',
    startDate: '2026-10-26T09:00:00',
    deadlineInDays: 3,
    prize: '₹2,00,000',
    fee: 'Free',
    image: '/images/events/ai-hackathon.jpg',
    skills: ['Python', 'AI/ML', 'TensorFlow'],
    matchScore: 89,
    participantCount: 480,
    shortDesc: 'Build AI/ML solutions in a 48-hour premier national hackathon.'
  },
  {
    id: 'genai-bootcamp-nitt',
    title: 'GenAI Bootcamp 2026',
    category: 'Workshop',
    organizer: 'NIT Trichy',
    location: 'Online',
    mode: 'Online',
    date: '12 - 14 Nov 2026',
    startDate: '2026-11-12T10:00:00',
    deadlineInDays: 9,
    prize: 'Certificates & Credits',
    fee: 'Free',
    image: '/images/events/genai-bootcamp.jpg',
    skills: ['LLMs', 'Prompt Eng', 'RAG'],
    matchScore: 94,
    participantCount: 620,
    shortDesc: 'Master LLMs, RAG, and prompt engineering in this intensive workshop.'
  },
  {
    id: 'coding-cup-anna',
    title: 'National Coding Cup 2026',
    category: 'Competition',
    organizer: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    mode: 'Hybrid',
    date: '05 Dec 2026',
    startDate: '2026-12-05T09:00:00',
    deadlineInDays: 14,
    prize: '₹1,50,000',
    fee: 'Free',
    image: '/images/events/coding-cup.jpg',
    skills: ['DSA', 'C++', 'Algorithms'],
    matchScore: 93,
    participantCount: 1100,
    shortDesc: 'National level competitive programming cup for top collegiate coders.'
  }
];

const categories = [
  { name: 'Hackathons', count: '32+ Active', icon: <Code size={20} />, desc: 'Build & innovate in 24-48h sprints' },
  { name: 'Symposiums', count: '24+ Active', icon: <Presentation size={20} />, desc: 'Technical papers & project expos' },
  { name: 'Workshops', count: '18+ Active', icon: <Rocket size={20} />, desc: 'Hands-on AI, Web3 & Cloud masterclasses' },
  { name: 'Cultural Fests', count: '15+ Active', icon: <Music size={20} />, desc: 'Battle of bands, pro-nites & stage arts' },
  { name: 'Robotics', count: '10+ Active', icon: <Shield size={20} />, desc: 'Robowars, drone races & combat bots' },
  { name: 'Competitions', count: '14+ Active', icon: <Trophy size={20} />, desc: 'Coding cups, algorithmic sprints & quizzes' },
  { name: 'E-Summits', count: '8+ Active', icon: <Briefcase size={20} />, desc: 'Startup pitching & seed incubators' },
  { name: 'Internships', count: '22+ Active', icon: <Award size={20} />, desc: 'Summer tech & research fellowships' },
];

const popularSearches = [
  { label: 'Hackathons in Coimbatore', query: 'Coimbatore' },
  { label: 'Free Online AI Workshops', query: 'Online' },
  { label: 'Cultural & Music Festivals', query: 'Cultural' },
  { label: 'Robowars & Combat Bots', query: 'Robotics' },
  { label: 'Symposiums in Chennai', query: 'Chennai' },
];

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>(initialPremierEvents);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recommended' | 'trending' | 'hackathons' | 'symposiums' | 'cultural' | 'online'>('all');
  const [selectedCity, setSelectedCity] = useState('All');
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hi! I am Guru AI, your college opportunity copilot. Ask me anything like "Find hackathons in Coimbatore" or "Show me free AI workshops"!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeHeroTimeframe, setActiveHeroTimeframe] = useState<'Day' | 'Week' | 'Month'>('Week');

  // Quick Registration Form State (Image 6 CTA)
  const [joinForm, setJoinForm] = useState({
    fullName: '',
    email: '',
    domain: '',
    acceptedTerms: true
  });
  const [joinSuccess, setJoinSuccess] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Hackathon',
    organizer: '',
    location: '',
    mode: 'Offline',
    startDate: '',
    prize: '',
    fee: 'Free',
    image: '/images/events/hackforge-2026.jpg',
    shortDesc: '',
    skills: 'AI/ML, Python, Web3'
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, mins: 42, secs: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle spotlight automatically
  useEffect(() => {
    const autoCycle = setInterval(() => {
      setSpotlightIndex(prev => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(autoCycle);
  }, []);

  const currentSpotlight = events[spotlightIndex] || events[0];

  const handleToggleSave = (id: string) => {
    setSavedEventIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.organizer) return;

    const created: EventItem = {
      id: 'custom-' + Date.now(),
      title: newEvent.title,
      category: newEvent.category as any,
      organizer: newEvent.organizer,
      location: newEvent.location || 'Coimbatore, Tamil Nadu',
      mode: newEvent.mode as any,
      date: newEvent.startDate || 'Upcoming 2026',
      startDate: newEvent.startDate || new Date().toISOString(),
      deadlineInDays: 7,
      prize: newEvent.prize || 'Certificates & Trophies',
      fee: newEvent.fee,
      image: newEvent.image,
      skills: newEvent.skills.split(',').map(s => s.trim()),
      matchScore: 96,
      featured: true,
      participantCount: 1,
      shortDesc: newEvent.shortDesc || newEvent.title
    };

    setEvents(prev => [created, ...prev]);
    setIsPostModalOpen(false);
    setToastMessage('🎉 Event published to the AllCollegeEvent network ledger!');
    setTimeout(() => setToastMessage(null), 5000);

    setNewEvent({
      title: '',
      category: 'Hackathon',
      organizer: '',
      location: '',
      mode: 'Offline',
      startDate: '',
      prize: '',
      fee: 'Free',
      image: '/images/events/hackforge-2026.jpg',
      shortDesc: '',
      skills: 'AI/ML, Python, Web3'
    });
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setAiChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let reply = 'Here are the best matching opportunities based on your query:';
      const q = userText.toLowerCase();
      if (q.includes('coimbatore') || q.includes('hackforge') || q.includes('hackathon')) {
        reply = '🔥 Recommended: HackForge 2026 at PSG Tech Campus, Coimbatore! 36-hour national AI & Web3 hackathon with a ₹5,00,000 prize pool. Registration is free and closes in 4 days!';
      } else if (q.includes('symposium') || q.includes('paper') || q.includes('chennai')) {
        reply = '🏆 Recommended: INNOFEST 2026 at IIT Madras! Flagship technical symposium with paper presentations, coding arena, and ₹2,50,000 cash awards.';
      } else if (q.includes('cultural') || q.includes('music') || q.includes('fest')) {
        reply = '🎵 Check out RHYTHM 2026 at VIT Vellore! Non-stop Battle of the Bands, Fashion Pro-Nite, and ₹4,00,000 prizes with free student entry!';
      } else if (q.includes('robot') || q.includes('robowar')) {
        reply = '🤖 Don’t miss ROBOWARS 2026 at PSG College of Technology! 15kg & 30kg combat robotics arena championship with ₹3,50,000 in prizes.';
      } else {
        reply = `Found ${events.length} verified college events across India! Check out our Top Spotlight carousel or explore by category.`;
      }
      setAiChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (activeTab === 'recommended' && (e.matchScore || 0) < 92) return false;
      if (activeTab === 'trending' && !e.featured) return false;
      if (activeTab === 'hackathons' && e.category !== 'Hackathon') return false;
      if (activeTab === 'symposiums' && e.category !== 'Symposium') return false;
      if (activeTab === 'cultural' && e.category !== 'Cultural') return false;
      if (activeTab === 'online' && e.mode !== 'Online' && e.mode !== 'Hybrid') return false;

      if (selectedCity !== 'All' && !e.location.toLowerCase().includes(selectedCity.toLowerCase())) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = e.title.toLowerCase().includes(q);
        const matchOrg = e.organizer.toLowerCase().includes(q);
        const matchLoc = e.location.toLowerCase().includes(q);
        const matchSkills = e.skills.some(s => s.toLowerCase().includes(q));
        const matchCategory = e.category.toLowerCase().includes(q);
        return matchTitle || matchOrg || matchLoc || matchSkills || matchCategory;
      }

      return true;
    });
  }, [events, activeTab, selectedCity, searchQuery]);

  return (
    <div className="bg-[#FAF9F6] text-neutral-900 min-h-screen selection:bg-violet-100 selection:text-violet-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0B0B0E] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-semibold border border-neutral-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: HERO SECTION (LUMENWAVE EDITORIAL STYLE - Images 1 & 2)
          Editorial Serif Headlines, Pill Geometry, Floating Micro-UI Preview
         ========================================================================= */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 overflow-hidden bg-ledger-grid">
        {/* Atmospheric collegiate backdrop image layer */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          <img 
            src="/images/hero-hackathon.jpg" 
            alt="Atmospheric collegiate hackathon" 
            className="w-full h-full object-cover object-top opacity-[0.11] filter grayscale contrast-125 mask-hero-fade" 
          />
        </div>
        {/* Subtle radial ambient gradients (Strictly Violet + Slate) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-violet-200/35 via-violet-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          
          {/* Pill Announcement Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-xs mb-8 hover:border-violet-300 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-700">AllCollegeEvent 2026 Student Network</span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-semibold text-violet-700 inline-flex items-center gap-0.5">
              Live registrations open <ArrowUpRight size={12} />
            </span>
          </div>

          {/* Editorial Serif Hero Title (Image 1 & 2 style) */}
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-neutral-950 tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
            College opportunities, <br />
            <span className="font-editorial-italic font-normal">calmly engineered.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Every verified hackathon, technical symposium, and research track in one magazine-grade ledger. Built for ambitious collegiate builders across India.
          </p>

          {/* Pill Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
            <Link href="/events" className="btn-ink-pill">
              <span>Explore opportunities</span>
              <ArrowRight size={16} />
            </Link>

            <button 
              onClick={() => setIsAiChatOpen(true)}
              className="btn-ghost-pill inline-flex items-center gap-2"
            >
              <Sparkles size={16} className="text-violet-600" />
              <span>Ask Guru Copilot</span>
            </button>

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-violet-50 text-violet-700 hover:bg-violet-100 font-semibold text-[14px] border border-violet-200/80 transition-all cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>Post college event</span>
            </button>
          </div>

          {/* =========================================================================
              FLOATING INTERACTIVE DASHBOARD SHOWPIECE (Image 1 & 2 Centerpiece)
             ========================================================================= */}
          <div className="relative max-w-4xl mx-auto mt-6">
            
            {/* Top Floating Pill Badge (+ ₹5,00,000 Cash Pool) */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/80 text-xs font-bold text-neutral-800 shadow-md">
              <span className="text-emerald-600 font-bold">↗</span>
              <span className="text-neutral-500 font-normal">Prize pool live</span>
              <span className="font-tabular font-bold text-neutral-900">+ ₹5,00,000</span>
            </div>

            {/* Central Elevated White Card */}
            <div className="card-diffusion rounded-3xl p-6 sm:p-8 bg-white text-left relative z-10 overflow-hidden">
              
              {/* Header: Logo Pill, Welcome, Time Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0E] text-white">
                    <span className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center text-[9px] font-black">
                      A
                    </span>
                    <span className="font-semibold text-xs tracking-tight text-white">
                      AllCollegeEvent Ledger
                    </span>
                  </div>
                  <span className="text-neutral-300">·</span>
                  <span className="font-medium text-xs sm:text-sm text-neutral-500">
                    Welcome back, <span className="text-neutral-900 font-semibold">Dev</span>
                  </span>
                </div>

                {/* Day / Week / Month Toggle Pills */}
                <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 border border-neutral-200/60 self-start sm:self-auto">
                  {(['Day', 'Week', 'Month'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setActiveHeroTimeframe(tf)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        activeHeroTimeframe === tf 
                          ? 'bg-[#0B0B0E] text-white shadow-xs' 
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Tabular Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-neutral-100 font-tabular">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-medium mb-1">
                    <span>ACTIVE HACKATHONS</span>
                    <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">+8.4%</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    32 <span className="text-sm font-normal text-neutral-400 font-sans">sprints</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-medium mb-1">
                    <span>STUDENT PARTICIPATION</span>
                    <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">+22.0%</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    8,420 <span className="text-sm font-normal text-neutral-400 font-sans">builders</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-medium mb-1">
                    <span>AI MATCH ACCURACY</span>
                    <span className="text-violet-600 font-semibold bg-violet-50 px-2 py-0.5 rounded-full">v2.6</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    98.6% <span className="text-sm font-normal text-neutral-400 font-sans">semantic</span>
                  </div>
                </div>
              </div>

              {/* Cashflow / Velocity Spline Chart */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Registration & Verification Velocity
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">Last 12 weeks</span>
                </div>

                {/* SVG Area & Spline Curve */}
                <div className="h-36 sm:h-44 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="violetCurveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M0,85 Q75,65 150,75 T300,50 T450,25 T600,35 L600,120 L0,120 Z"
                      fill="url(#violetCurveGrad)"
                    />
                    {/* Spline stroke */}
                    <path
                      d="M0,85 Q75,65 150,75 T300,50 T450,25 T600,35"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="2.5"
                    />
                    {/* Data Points */}
                    <circle cx="150" cy="75" r="3.5" fill="#0B0B0E" />
                    <circle cx="300" cy="50" r="3.5" fill="#0B0B0E" />
                    <circle cx="450" cy="25" r="5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="600" cy="35" r="3.5" fill="#0B0B0E" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Satellite Card 1 (Bottom Left - Image 1/2 Applications preview) */}
            <div className="hidden lg:block absolute -bottom-10 -left-12 z-20 w-64 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-4 shadow-xl text-left">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                RECENT APPLICATIONS
              </span>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-[11px]">
                      H
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900 leading-tight">HackForge '26</p>
                      <p className="text-[10px] text-neutral-500">AI Team Track</p>
                    </div>
                  </div>
                  <span className="font-tabular font-bold text-neutral-900 text-xs">₹5,00,000</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[11px]">
                      I
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900 leading-tight">INNOFEST</p>
                      <p className="text-[10px] text-neutral-500">IIT Madras</p>
                    </div>
                  </div>
                  <span className="font-tabular font-bold text-neutral-900 text-xs">₹2,50,000</span>
                </div>
              </div>
            </div>

            {/* Floating Satellite Card 2 (Bottom Right - Image 1/2 Bar Chart) */}
            <div className="hidden lg:block absolute -bottom-10 -right-12 z-20 w-60 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-4 shadow-xl text-left font-tabular">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                COLLEGE ATTENDEES (H1)
              </span>
              <p className="text-xs text-neutral-500 mb-3">Across engineering campuses</p>
              
              {/* Rounded pill vertical bars */}
              <div className="flex items-end justify-between h-16 gap-1.5 px-1">
                {[30, 45, 60, 50, 95, 75].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-violet-600 rounded-t-md transition-all hover:bg-violet-700" 
                      style={{ height: `${val}%` }} 
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-neutral-400 mt-2 px-1 font-sans">
                <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SOCIAL PROOF / COLLEGE TRUST STRIP (Image 3 Top)
         ========================================================================= */}
      <section className="py-10 border-y border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            Trusted by student innovators and campus organizers from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-neutral-800 text-sm sm:text-base font-medium">
            <span className="font-editorial text-lg tracking-tight font-semibold hover:text-violet-600 transition-colors">IIT Madras</span>
            <span className="font-semibold tracking-tight hover:text-violet-600 transition-colors">PSG Tech</span>
            <span className="font-bold tracking-widest uppercase hover:text-violet-600 transition-colors">VIT Vellore</span>
            <span className="font-editorial-italic text-lg hover:text-violet-600 transition-colors">NIT Trichy</span>
            <span className="font-semibold hover:text-violet-600 transition-colors">Anna University CEG</span>
            <span className="font-bold tracking-tight hover:text-violet-600 transition-colors">BITS Pilani</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BENTO FEATURE GRID (Image 3 Style: One Network, Three Tracks)
         ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15] mb-4">
            One network, three tracks: <br />
            <span className="font-editorial-italic font-normal">hackathons, symposiums, research.</span>
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Every AllCollegeEvent event shares one visual language and one settled-time registration ledger, so students, campus organizers, and mentors all move with precision.
          </p>
        </div>

        {/* 3 Pure Minimalist Vertical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Multi-track collegiate accounts */}
          <div className="card-diffusion p-8 flex flex-col justify-between">
            <div>
              <div className="w-2.5 h-2.5 rounded-full bg-violet-600 mb-6" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Multi-category accounts
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                Discover 32+ collegiate tracks natively: AI sprints, technical symposiums, research grants, and offline robowars with zero platform tax.
              </p>

              {/* Mini UI Widget inside Card 1 */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 space-y-3 mb-6 font-tabular">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B0B0E] text-white flex items-center justify-center text-[10px] font-bold">
                      H
                    </span>
                    <span className="font-semibold text-neutral-800">HackForge · AI Sprint</span>
                  </div>
                  <span className="font-bold text-neutral-900">₹5,00,000</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] font-bold">
                      S
                    </span>
                    <span className="font-semibold text-neutral-800">INNOFEST · IIT Madras</span>
                  </div>
                  <span className="font-bold text-neutral-900">₹2,50,000</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center text-[10px] font-bold">
                      R
                    </span>
                    <span className="font-semibold text-neutral-800">ROBOWARS · Combat Arena</span>
                  </div>
                  <span className="font-bold text-neutral-900">₹3,50,000</span>
                </div>
              </div>
            </div>

            <Link href="/events" className="text-xs font-bold text-neutral-900 inline-flex items-center gap-1.5 hover:text-violet-700 transition-colors">
              <span>Explore event tracks</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 2: Digital Student Pass */}
          <div className="card-diffusion p-8 flex flex-col justify-between">
            <div>
              <div className="w-2.5 h-2.5 rounded-full bg-violet-600 mb-6" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Student passes with budget rails
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                Issue instant digital student passes, set team budget rails, and see verified registrations land in the exact same campus ledger.
              </p>

              {/* Mini Sleek Dark Card Preview inside Card 2 */}
              <div className="bg-[#0B0B0E] text-white rounded-2xl p-5 mb-6 shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-editorial-italic text-sm text-neutral-300">AllCollegeEvent</span>
                  <span className="w-6 h-4 rounded bg-amber-400/80 inline-block" />
                </div>
                <p className="font-tabular tracking-widest text-sm text-neutral-300 mb-4 font-mono">
                  •••• 4218
                </p>
                <div className="flex justify-between text-[10px] text-neutral-400 uppercase font-semibold">
                  <span>DEV KRISHNAN · PSG TECH</span>
                  <span>12/28</span>
                </div>
              </div>
            </div>

            <Link href="/dashboard" className="text-xs font-bold text-neutral-900 inline-flex items-center gap-1.5 hover:text-violet-700 transition-colors">
              <span>Claim digital pass</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 3: AI Match at a Glance */}
          <div className="card-diffusion p-8 flex flex-col justify-between">
            <div>
              <div className="w-2.5 h-2.5 rounded-full bg-violet-600 mb-6" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                AI Skill Match at a glance
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                Match student competencies across Generative AI, Web3, combat robotics, and competitive algorithmic tracks with instant drift telemetry.
              </p>

              {/* Donut Chart Widget inside Card 3 */}
              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 flex items-center justify-between gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#7C3AED" strokeWidth="4" strokeDasharray="38 100" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#A78BFA" strokeWidth="4" strokeDasharray="26 100" strokeDashoffset="-38" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="16 100" strokeDashoffset="-64" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-80" />
                  </svg>
                </div>
                <div className="text-[11px] space-y-1 font-semibold text-neutral-700 flex-1">
                  <div className="flex justify-between items-center"><span className="text-violet-700">• Generative AI</span><span>38%</span></div>
                  <div className="flex justify-between items-center"><span className="text-violet-400">• Full-Stack</span><span>26%</span></div>
                  <div className="flex justify-between items-center"><span className="text-amber-600">• Robotics</span><span>16%</span></div>
                  <div className="flex justify-between items-center"><span className="text-emerald-600">• Research</span><span>20%</span></div>
                </div>
              </div>
            </div>

            <Link href="/recommendations" className="text-xs font-bold text-neutral-900 inline-flex items-center gap-1.5 hover:text-violet-700 transition-colors">
              <span>View match breakdown</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE MAGAZINE DASHBOARD SHOWCASE (Image 4 Style)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-12">
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15] mb-4">
            The event dashboard reads <br />
            <span className="font-editorial-italic font-normal">like an editorial magazine.</span>
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Hairline cards, tabular numerals, and a single violet signal accent, so the eye knows where to land before the brain catches up.
          </p>
        </div>

        {/* Large Embedded Dashboard Canvas (Image 4 Showcase) */}
        <div className="card-diffusion rounded-[32px] overflow-hidden bg-white border border-neutral-200/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-3 border-r border-neutral-100 p-6 flex flex-col justify-between bg-neutral-50/50">
              <div>
                {/* Brand Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0B0E] text-white mb-8">
                  <span className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center text-[9px] font-black">
                    A
                  </span>
                  <span className="font-bold text-xs text-white">AllCollegeEvent</span>
                </div>

                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-3">
                  WORKSPACE
                </span>
                
                <div className="space-y-1 text-xs font-semibold">
                  <button className="w-full text-left px-3.5 py-2.5 rounded-full bg-[#0B0B0E] text-white flex items-center gap-2.5 shadow-xs">
                    <Award size={15} /> Overview
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-full text-neutral-600 hover:bg-neutral-100 flex items-center gap-2.5">
                    <Code size={15} /> Hackathons
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-full text-neutral-600 hover:bg-neutral-100 flex items-center gap-2.5">
                    <Presentation size={15} /> Symposiums
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-full text-neutral-600 hover:bg-neutral-100 flex items-center gap-2.5">
                    <Bookmark size={15} /> Saved Sprints
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-full text-neutral-600 hover:bg-neutral-100 flex items-center gap-2.5">
                    <TrendingUp size={15} /> Telemetry
                  </button>
                </div>
              </div>

              {/* Bottom Promo Box */}
              <div className="bg-[#0B0B0E] text-white rounded-2xl p-4 mt-8">
                <p className="font-bold text-xs mb-1">Switch to Campus Host</p>
                <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">
                  Add multi-tier hackathon tracks, custom verification rails, and audit exports.
                </p>
                <Link href="/organizer" className="text-[11px] font-bold text-violet-400 hover:text-violet-300 inline-flex items-center gap-1">
                  Organizer Hub <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Right Main Canvas */}
            <div className="lg:col-span-9 p-6 sm:p-8 flex flex-col justify-between">
              
              {/* Top Search & Profile Bar */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 mb-8">
                  <div className="relative max-w-sm w-full">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search events, colleges, prizes..."
                      className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
                    />
                  </div>

                  {/* Avatars Stack & Notification */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600">
                      <Bell size={14} />
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">PS</div>
                      <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">IIT</div>
                      <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-neutral-800 text-white text-[10px] font-bold flex items-center justify-center">+6</div>
                    </div>
                  </div>
                </div>

                {/* Welcome Back & Time Toggles */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-neutral-900">
                    Welcome back, <span className="font-editorial-italic">William.</span>
                  </h3>
                  <div className="inline-flex p-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold">
                    <span className="px-3 py-1 rounded-full bg-white text-neutral-900 shadow-xs">Day</span>
                    <span className="px-3 py-1 text-neutral-500">Week</span>
                    <span className="px-3 py-1 text-neutral-500">Month</span>
                    <span className="px-3 py-1 text-neutral-500">Year</span>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-tabular">
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">NET CASH POOL</span>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-900 block">₹2,48,610</span>
                    <span className="text-[11px] font-semibold text-emerald-600">▲ 6.4%</span>
                  </div>
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">INFLOW MTD</span>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-900 block">₹86,450</span>
                    <span className="text-[11px] font-semibold text-emerald-600">▲ 11.0%</span>
                  </div>
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">STUDENT PASSES</span>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-900 block">52,180</span>
                    <span className="text-[11px] font-semibold text-violet-600">▲ 2.3%</span>
                  </div>
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">HACKFORGE RUNWAY</span>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-900 block">19.4 <span className="text-xs font-normal text-neutral-500 font-sans">days</span></span>
                    <span className="text-[11px] font-semibold text-neutral-500">Scheduled</span>
                  </div>
                </div>

                {/* Split Two-Column: Spline velocity & Recent activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Cashflow velocity */}
                  <div className="border border-neutral-100 rounded-2xl p-5 bg-white">
                    <div className="flex justify-between items-center mb-2 font-tabular">
                      <div>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">CASHFLOW POOL</span>
                        <span className="text-2xl font-bold text-neutral-900">₹48,320<span className="text-sm text-neutral-400 font-normal">.00</span></span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">Last 12 weeks</span>
                    </div>

                    <div className="h-28 w-full mt-4">
                      <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                        <path
                          d="M0,60 Q40,40 80,50 T160,30 T240,15 T300,20 L300,80 L0,80 Z"
                          fill="url(#violetCurveGrad)"
                        />
                        <path
                          d="M0,60 Q40,40 80,50 T160,30 T240,15 T300,20"
                          fill="none"
                          stroke="#7C3AED"
                          strokeWidth="2"
                        />
                        <circle cx="240" cy="15" r="4" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Right Column: Recent activity */}
                  <div className="border border-neutral-100 rounded-2xl p-5 bg-white font-tabular">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">RECENT ACTIVITY</span>
                      <Link href="/dashboard" className="text-xs font-semibold text-violet-600 hover:underline">View all →</Link>
                    </div>
                    
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div>
                            <p className="font-semibold text-neutral-900 leading-none">Stripe payout</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Today · 09:42</p>
                          </div>
                        </div>
                        <span className="font-bold text-neutral-900">+₹12,480.50</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-violet-500" />
                          <div>
                            <p className="font-semibold text-neutral-900 leading-none">AWS Student Credit</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Today · 06:10</p>
                          </div>
                        </div>
                        <span className="font-bold text-neutral-900">-₹2,840.00</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-neutral-400" />
                          <div>
                            <p className="font-semibold text-neutral-900 leading-none">INNOFEST Pass verification</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Yesterday · 18:24</p>
                          </div>
                        </div>
                        <span className="font-bold text-neutral-900">₹8,940.12</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: TOP SPOTLIGHT PREMIER CAROUSEL (Renovated with High-Res Posters)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
              <span className="text-xs font-bold text-violet-700 uppercase tracking-widest">Premier Spotlight</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-neutral-950 font-normal">
              Flagship Campus Opportunities
            </h2>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpotlightIndex(prev => (prev - 1 + 5) % 5)}
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setSpotlightIndex(prev => (prev + 1) % 5)}
              className="w-10 h-10 rounded-full bg-[#0B0B0E] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Spotlight Card */}
        <div className="card-diffusion rounded-3xl overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-12 border border-neutral-200/90 shadow-xl">
          
          {/* Left Poster (Fixed high-res image container with hairline border) */}
          <div className="lg:col-span-5 relative min-h-[340px] bg-neutral-900 overflow-hidden">
            <img
              src={currentSpotlight.image}
              alt={currentSpotlight.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0B0B0E] text-xs font-bold shadow-md">
                {currentSpotlight.category.toUpperCase()}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-violet-600 text-white text-xs font-bold shadow-md">
                POOL {currentSpotlight.prize}
              </span>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                <Clock size={13} />
                <span>Closes in {currentSpotlight.deadlineInDays} days</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-neutral-900 font-normal mb-2 leading-tight">
                {currentSpotlight.title}
              </h3>
              <p className="text-sm font-semibold text-violet-700 mb-4">
                🏛️ {currentSpotlight.organizer}
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6 max-w-xl">
                {currentSpotlight.shortDesc}
              </p>

              {/* Circular Timers */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-3 font-tabular">
                  EVENT COMMENCES IN
                </span>
                <div className="flex items-center gap-4 font-tabular">
                  {[
                    { label: 'DAYS', val: timeLeft.days, color: '#7C3AED' },
                    { label: 'HOURS', val: timeLeft.hours, color: '#10B981' },
                    { label: 'MINS', val: timeLeft.mins, color: '#F59E0B' },
                    { label: 'SECS', val: timeLeft.secs, color: '#3B82F6' },
                  ].map(t => (
                    <div key={t.label} className="w-14 h-14 rounded-full border-2 border-neutral-200 flex flex-col items-center justify-center bg-neutral-50/50">
                      <span className="text-base font-bold text-neutral-900 leading-none">{String(t.val).padStart(2, '0')}</span>
                      <span className="text-[8px] font-bold text-neutral-400 mt-0.5">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-neutral-600 mb-8">
                <span className="px-3 py-1 rounded-full bg-neutral-100 flex items-center gap-1.5">
                  <MapPin size={13} className="text-violet-600" /> {currentSpotlight.location}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-100 flex items-center gap-1.5">
                  <Calendar size={13} className="text-violet-600" /> {currentSpotlight.date}
                </span>
                <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 font-bold">
                  {currentSpotlight.fee}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/events/${currentSpotlight.id}`} className="btn-ink-pill">
                <span>Get Ticket / Register</span>
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => handleToggleSave(currentSpotlight.id)}
                className="btn-ghost-pill inline-flex items-center gap-1.5"
              >
                <Bookmark size={15} className={savedEventIds.includes(currentSpotlight.id) ? 'fill-violet-600 text-violet-600' : 'text-neutral-500'} />
                <span>{savedEventIds.includes(currentSpotlight.id) ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: EXPLORE CATEGORIES & PILL SEARCH BAR
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Smart Search Bar (Pill Shape) */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="h-14 px-5 rounded-full bg-white border-2 border-neutral-200/90 shadow-md flex items-center gap-3 hover:border-violet-300 transition-colors">
            <Sparkles size={18} className="text-violet-600 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search with AI... (e.g. Hackathons in Coimbatore, Robowars, IIT Madras)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-neutral-600">
                <X size={16} />
              </button>
            )}
            <button
              onClick={() => {
                setIsVoiceActive(!isVoiceActive);
                if (!isVoiceActive) setSearchQuery('Coimbatore');
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isVoiceActive ? 'bg-red-50 text-red-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <Mic size={16} />
            </button>
          </div>

          {/* Popular Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold">
            <span className="text-neutral-400">Popular:</span>
            {popularSearches.map(item => (
              <button
                key={item.label}
                onClick={() => setSearchQuery(item.query)}
                className="px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-neutral-700 hover:border-neutral-400 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Cards (Pill & Clean Hairline Layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                if (cat.name === 'Hackathons') setActiveTab('hackathons');
                else if (cat.name === 'Symposiums') setActiveTab('symposiums');
                else if (cat.name === 'Cultural Fests') setActiveTab('cultural');
                else setSearchQuery(cat.name);
              }}
              className="card-diffusion p-5 cursor-pointer rounded-2xl group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0B0B0E] text-white flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 mb-1 group-hover:text-violet-700 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-neutral-500 leading-snug line-clamp-2">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            SECTION 7: VERIFIED LIVE EVENT FEED
           ========================================================================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 mb-6">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950">
                Verified Event Directory
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Showing {filteredEvents.length} live verified student opportunities
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'recommended', label: '✨ AI Match' },
                { id: 'trending', label: '🔥 Trending' },
                { id: 'hackathons', label: 'Hackathons' },
                { id: 'symposiums', label: 'Symposiums' },
                { id: 'cultural', label: 'Cultural' },
                { id: 'online', label: 'Online' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-[#0B0B0E] text-white' 
                      : 'bg-white border border-neutral-200/80 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-semibold text-neutral-500">
            <span>Filter Region:</span>
            {['All', 'Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Online'].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  selectedCity === city 
                    ? 'bg-violet-100 text-violet-800 font-bold' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="card-diffusion rounded-2xl overflow-hidden bg-white flex flex-col justify-between"
                >
                  {/* Poster Thumbnail */}
                  <Link href={`/events/${event.id}`} className="block relative aspect-video overflow-hidden bg-neutral-900 group">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#0B0B0E] text-[11px] font-bold">
                        {event.category}
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-violet-600 text-white text-[11px] font-bold">
                        {event.prize}
                      </span>
                    </div>
                    {event.matchScore && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-emerald-700 text-[10px] font-bold shadow-xs">
                          ⚡ {event.matchScore}% Match
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <Link href={`/events/${event.id}`}>
                        <h4 className="font-editorial text-lg text-neutral-900 font-normal hover:text-violet-700 transition-colors mb-1.5 leading-snug">
                          {event.title}
                        </h4>
                      </Link>
                      <p className="text-xs font-semibold text-neutral-500 mb-3">
                        {event.organizer}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-4">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} className="text-violet-600" /> {event.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={12} className="text-violet-600" /> {event.date}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {event.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Row */}
                    <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                      <button
                        onClick={() => handleToggleSave(event.id)}
                        className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                        title={savedEventIds.includes(event.id) ? 'Saved' : 'Save'}
                      >
                        <Bookmark size={14} className={savedEventIds.includes(event.id) ? 'fill-violet-600 text-violet-600' : ''} />
                      </button>

                      <Link
                        href={`/events/${event.id}`}
                        className="flex-1 py-2 rounded-full bg-[#0B0B0E] hover:bg-neutral-800 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-diffusion p-16 rounded-3xl text-center bg-white">
              <p className="font-bold text-base text-neutral-800 mb-2">No collegiate events found</p>
              <p className="text-xs text-neutral-500 mb-6">Try clearing your search query or selecting a different city filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCity('All'); setActiveTab('all'); }}
                className="btn-ink-pill text-xs"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: THREE PLANS / ACCESS TIERS (Image 5 Style)
         ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15] mb-4">
            Three plans. <br />
            <span className="font-editorial-italic font-normal">One quiet ledger.</span>
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Start free, grow into collegiate club organizing, then graduate to university partner when the campus requires institutional accreditation and segregated reserves.
          </p>
        </div>

        {/* 3 Tier Cards (Image 5 Centerpiece) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch font-tabular">
          
          {/* Card 1: Starter */}
          <div className="card-diffusion p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-neutral-900 font-sans">Starter</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-neutral-950">₹0</span>
                <span className="text-xs text-neutral-400 font-normal font-sans">/ month</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed mb-8 font-sans">
                A calm student account, 1 virtual collegiate pass and global access to verified national hackathons.
              </p>

              <div className="space-y-3 text-xs text-neutral-700 font-sans mb-8">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>1 Verified student profile</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>1 Virtual collegiate pass</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>Unlimited event applications</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>Mobile + web student ledger</span>
                </div>
              </div>
            </div>

            <Link href="/register" className="btn-ghost-pill w-full text-center text-xs font-bold">
              Open free
            </Link>
          </div>

          {/* Card 2: Operating / Campus Club (Featured Ink-Black Card from Image 5) */}
          <div className="card-ink p-8 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-[10px] font-bold uppercase tracking-wider font-sans">
                Most chosen
              </span>
            </div>

            <div>
              <span className="text-sm font-bold text-white block mb-6 font-sans">Campus Organizer</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">₹1,499</span>
                <span className="text-xs text-neutral-400 font-normal font-sans">/ event · host</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-8 font-sans">
                Multi-track hackathon management, issued student passes with budget rails, and a dashboard the entire college club can read.
              </p>

              <div className="space-y-3 text-xs text-neutral-300 font-sans mb-8">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-400 flex-shrink-0" />
                  <span>Up to 5,000 participant registrations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-400 flex-shrink-0" />
                  <span>Instant QR check-in & verification rails</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-400 flex-shrink-0" />
                  <span>Sponsor & prize pool escrow ledger</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-400 flex-shrink-0" />
                  <span>Slack & WhatsApp real-time sync</span>
                </div>
              </div>
            </div>

            <Link href="/organizer" className="btn-violet-pill w-full text-center text-xs font-bold">
              Start 30-day trial
            </Link>
          </div>

          {/* Card 3: University Partner */}
          <div className="card-diffusion p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-neutral-900 font-sans">University Partner</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-neutral-950 font-editorial">Talk</span>
                <span className="text-xs text-neutral-400 font-normal font-sans">/ quote</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed mb-8 font-sans">
                Institutional rollups, segregated campus reserves, NAAC accreditation telemetry, and a dedicated campus advisor.
              </p>

              <div className="space-y-3 text-xs text-neutral-700 font-sans mb-8">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>Multi-department campus rollup</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>NAAC / NIRF accreditation exports</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>Single Sign-On (SAML & Eduroam)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-violet-600 flex-shrink-0" />
                  <span>Dedicated campus relationship officer</span>
                </div>
              </div>
            </div>

            <a href="mailto:campus@allcollegeevent.com" className="btn-ghost-pill w-full text-center text-xs font-bold">
              Contact campus sales
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: HIGH CONVERSION CTA BANNER (Image 6 Style)
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="card-ink rounded-[32px] p-8 sm:p-14 overflow-hidden relative">
          {/* Atmospheric background collegiate image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img 
              src="/images/events/hackforge-2026.jpg" 
              alt="Collegiate Hackathon Banner"
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter contrast-125 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0E] via-[#0B0B0E]/90 to-[#0B0B0E]/60" />
            <div className="absolute inset-0 bg-dark-grid opacity-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Editorial Pitch */}
            <div className="lg:col-span-7">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] mb-6">
                Open a calmer <br />
                <span className="font-editorial-italic font-normal">student ledger today.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed mb-8">
                It takes four minutes to create your AllCollegeEvent profile, and one afternoon to migrate your existing college club. No credit card required, zero platform tax on your first ₹50,000 cash pool.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/register" className="btn-violet-pill">
                  <span>Create account</span>
                  <ArrowUpRight size={15} />
                </Link>
                <button
                  onClick={() => setIsAiChatOpen(true)}
                  className="px-6 py-3 rounded-full border border-neutral-700 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ask AI Advisor
                </button>
              </div>
            </div>

            {/* Right Column: Clean White Quick-Join Form (Image 6 Right Card) */}
            <div className="lg:col-span-5 bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl">
              {joinSuccess ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-2">Welcome to the Network!</h3>
                  <p className="text-xs text-neutral-500 mb-6">Your student verification link has been sent to your email.</p>
                  <Link href="/events" className="btn-ink-pill w-full text-xs">
                    Browse verified events
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (joinForm.fullName && joinForm.email) {
                      setJoinSuccess(true);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eliza Northfield"
                      value={joinForm.fullName}
                      onChange={(e) => setJoinForm({ ...joinForm, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-violet-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                      COLLEGE / WORK EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eliza@college.edu.in"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-violet-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                      PRIMARY ENGINEERING DISCIPLINE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI / Machine Learning"
                      value={joinForm.domain}
                      onChange={(e) => setJoinForm({ ...joinForm, domain: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-violet-600 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      checked={joinForm.acceptedTerms}
                      onChange={(e) => setJoinForm({ ...joinForm, acceptedTerms: e.target.checked })}
                      className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                    <label htmlFor="termsCheckbox" className="text-[11px] text-neutral-500 cursor-pointer">
                      I accept the <Link href="/terms" className="underline text-neutral-800">terms</Link> and the <Link href="/privacy" className="underline text-neutral-800">student ledger policy</Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#0B0B0E] hover:bg-neutral-800 text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Continue to Feed</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          POST AN EVENT MODAL (Maintained & Upgraded with Pill & Hairline Styling)
         ========================================================================= */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-neutral-200 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center">
                <PlusCircle size={18} />
              </span>
              <h3 className="font-editorial text-2xl text-neutral-900 font-normal">
                Post College Event
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mb-6">
              Reach 50,000+ engineering and college students across India in minutes.
            </p>

            <form onSubmit={handleAddEventSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INVENTO 2026: National AI Hackathon"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Category *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-violet-600"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Symposium">Technical Symposium</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Cultural">Cultural Fest</option>
                    <option value="Competition">Robotics / Competition</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Mode *</label>
                  <select
                    value={newEvent.mode}
                    onChange={(e) => setNewEvent({ ...newEvent, mode: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-violet-600"
                  >
                    <option value="Offline">Offline (Campus)</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Host College / Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PSG College of Technology, Coimbatore"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Cash Prize Pool</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹2,00,000"
                    value={newEvent.prize}
                    onChange={(e) => setNewEvent({ ...newEvent, prize: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
                  />
                </div>
              </div>

              {/* Poster Picker */}
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">Choose Event Poster</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'HackForge', img: '/images/events/hackforge-2026.jpg' },
                    { label: 'INNOFEST', img: '/images/events/innofest-2026.jpg' },
                    { label: 'RHYTHM', img: '/images/events/rhythm-2026.jpg' },
                    { label: 'AI Summit', img: '/images/events/agentic-ai-summit.jpg' },
                    { label: 'Robowars', img: '/images/events/robowars-2026.jpg' }
                  ].map(p => (
                    <div
                      key={p.label}
                      onClick={() => setNewEvent({ ...newEvent, image: p.img })}
                      className={`cursor-pointer rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                        newEvent.image === p.img ? 'border-violet-600 ring-2 ring-violet-200' : 'border-neutral-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p.img} alt={p.label} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Summary / Pitch</label>
                <textarea
                  rows={2}
                  placeholder="Describe the problem statement, challenges, and takeaways..."
                  value={newEvent.shortDesc}
                  onChange={(e) => setNewEvent({ ...newEvent, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="btn-ghost-pill flex-1 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-violet-pill flex-1 text-xs"
                >
                  Publish Event Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING AI ASSISTANT (ZUZU / GURU AI COPILOT)
         ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isAiChatOpen ? (
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0B0B0E] hover:bg-neutral-800 text-white text-xs font-bold shadow-2xl transition-all cursor-pointer border border-neutral-700"
          >
            <Sparkles size={15} className="text-violet-400" />
            <span>Guru AI Copilot</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 h-[460px] bg-white rounded-3xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 bg-[#0B0B0E] text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-white">Guru AI Assistant</p>
                  <p className="text-[10px] text-neutral-400">Semantic Student Intelligence</p>
                </div>
              </div>
              <button onClick={() => setIsAiChatOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'ml-auto bg-[#0B0B0E] text-white rounded-br-none' 
                      : 'bg-neutral-100 text-neutral-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-neutral-100 flex gap-2">
              <input
                type="text"
                placeholder="Ask about college hackathons..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                className="flex-1 px-3 py-2 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-violet-600 font-medium"
              />
              <button
                onClick={handleChatSend}
                className="w-8 h-8 rounded-full bg-[#0B0B0E] text-white flex items-center justify-center hover:bg-neutral-800 cursor-pointer"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
