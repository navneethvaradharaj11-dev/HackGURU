'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Sparkles, Trophy, Code, Presentation, Briefcase, Mic, Rocket, 
  Calendar, Bell, Bookmark, Search, MapPin, Clock, ChevronLeft, ChevronRight, 
  Filter, PlusCircle, CheckCircle2, X, Share2, Flame, Laptop, Music, Shield, Send
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

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
    shortDesc: 'Hands-on autonomous multi-agent systems and LLMs workshop.'
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
    shortDesc: 'National level competitive programming cup for top college algorithmic coders.'
  }
];

const categories = [
  { name: 'Hackathons', count: '32+ Active', icon: <Code size={24} />, gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)', desc: 'Build & innovate in 24-48h sprints' },
  { name: 'Symposiums', count: '24+ Active', icon: <Presentation size={24} />, gradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)', desc: 'Technical papers & project expos' },
  { name: 'Workshops', count: '18+ Active', icon: <Laptop size={24} />, gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', desc: 'Hands-on AI, Web3 & Cloud masterclasses' },
  { name: 'Cultural Fests', count: '15+ Active', icon: <Music size={24} />, gradient: 'linear-gradient(135deg, #DB2777 0%, #F43F5E 100%)', desc: 'Battle of bands, pro-nites & dance' },
  { name: 'Robotics', count: '10+ Active', icon: <Shield size={24} />, gradient: 'linear-gradient(135deg, #D97706 0%, #EA580C 100%)', desc: 'Robowars, drone races & combat bots' },
  { name: 'Competitions', count: '14+ Active', icon: <Trophy size={24} />, gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', desc: 'Coding cups, design sprints & quizzes' },
  { name: 'E-Summits', count: '8+ Active', icon: <Rocket size={24} />, gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', desc: 'Startup pitching & seed incubators' },
  { name: 'Internships', count: '22+ Active', icon: <Briefcase size={24} />, gradient: 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)', desc: 'Summer tech & research fellowships' },
];

const popularSearches = [
  { label: 'Hackathons in Coimbatore', query: 'Coimbatore', emoji: '🔥' },
  { label: 'Free Online Tech Workshops', query: 'Online', emoji: '⚡' },
  { label: 'Cultural & Music Festivals', query: 'Cultural', emoji: '🎵' },
  { label: 'Robotics & Robowars', query: 'Robotics', emoji: '🤖' },
  { label: 'Symposiums in Chennai', query: 'Chennai', emoji: '🏆' },
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
    { sender: 'bot', text: 'Hi! I am Guru AI, your college event copilot. Ask me anything like "Find hackathons in Coimbatore" or "Show me free AI workshops"!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

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

  // Cycle spotlight automatically every 7 seconds
  useEffect(() => {
    const autoCycle = setInterval(() => {
      setSpotlightIndex(prev => (prev + 1) % 5);
    }, 7000);
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
    setToastMessage('🎉 Event published successfully! It is now live on the HackGURU feed.');
    setTimeout(() => setToastMessage(null), 5000);

    // Reset form
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
        reply = '🏆 Recommended: INNOFEST 2026 at IIT Madras! Flagship technical symposium with paper presentations, coding arena, and ₹2,50,000 cash prizes.';
      } else if (q.includes('cultural') || q.includes('music') || q.includes('fest')) {
        reply = '🎵 Check out RHYTHM 2026 at VIT Vellore! Non-stop Battle of the Bands, Fashion Pro-Nite, and ₹4,00,000 prizes with free student entry!';
      } else if (q.includes('robot') || q.includes('robowar')) {
        reply = '🤖 Don\'t miss ROBOWARS 2026 at PSG College of Technology! 15kg & 30kg combat robotics arena championship with ₹3,50,000 in prizes.';
      } else {
        reply = `Found ${events.length} verified college events across India! Check out our Top Spotlight carousel or explore by category.`;
      }
      setAiChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Tab filter
      if (activeTab === 'recommended' && (e.matchScore || 0) < 92) return false;
      if (activeTab === 'trending' && !e.featured) return false;
      if (activeTab === 'hackathons' && e.category !== 'Hackathon') return false;
      if (activeTab === 'symposiums' && e.category !== 'Symposium') return false;
      if (activeTab === 'cultural' && e.category !== 'Cultural') return false;
      if (activeTab === 'online' && e.mode !== 'Online' && e.mode !== 'Hybrid') return false;

      // City filter
      if (selectedCity !== 'All' && !e.location.toLowerCase().includes(selectedCity.toLowerCase())) return false;

      // Search query
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
    <div style={{ background: '#F9FAFB', color: '#111827', minHeight: '100vh', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 1000,
          background: '#10B981', color: '#fff', padding: '12px 20px',
          borderRadius: '12px', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HERO SECTION - ALLCOLLEGEEVENT STYLE */}
      <section style={{
        background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 100%)',
        padding: '50px 0 30px',
        borderBottom: '1px solid #E5E7EB',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow decorative orbs */}
        <div style={{ position: 'absolute', top: '-10%', left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: '#FFFFFF', border: '1px solid #DDD6FE', borderRadius: '999px', fontSize: '13px', fontWeight: 700, color: '#6D28D9', boxShadow: '0 2px 10px rgba(109, 40, 217, 0.08)', marginBottom: '20px' }}>
            <Sparkles size={16} color="#7C3AED" />
            <span>India’s First AI-Driven College Event Intelligence Platform</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            margin: '0 auto 16px',
            maxWidth: '900px',
            color: '#111827'
          }}>
            Discover Events That <span style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Spark Your Vibe.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: '#4B5563',
            maxWidth: '680px',
            margin: '0 auto 28px',
            lineHeight: 1.5,
            fontWeight: 450
          }}>
            Find verified hackathons, technical symposiums, workshops, college cultural fests & esports tournaments across India.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', alignItems: 'center', marginBottom: '36px' }}>
            <Link href="/events" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 26px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                color: '#fff', fontSize: '15px', fontWeight: 700,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35)'
              }}>
                <span>Explore Events</span>
                <ArrowRight size={17} />
              </button>
            </Link>

            <button
              onClick={() => setIsPostModalOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '12px',
                background: '#FFFFFF', color: '#6D28D9',
                fontSize: '15px', fontWeight: 700,
                border: '1.5px solid #DDD6FE', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
              }}
            >
              <PlusCircle size={18} color="#7C3AED" />
              <span>+ Post Your College Event</span>
            </button>

            <button
              onClick={() => setIsAiChatOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 22px', borderRadius: '12px',
                background: '#EDE9FE', color: '#5B21B6',
                fontSize: '15px', fontWeight: 700,
                border: '1px solid #C4B5FD', cursor: 'pointer'
              }}
            >
              <Sparkles size={17} color="#7C3AED" />
              <span>AI Smart Filter</span>
            </button>
          </div>

          {/* AI SMART SEARCH BAR - ALLCOLLEGEEVENTS SIGNATURE */}
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: '#FFFFFF',
              border: '2px solid #DDD6FE',
              borderRadius: '16px',
              padding: '6px 8px 6px 16px',
              boxShadow: '0 8px 30px rgba(124, 58, 237, 0.12)',
              gap: '12px'
            }}>
              <Sparkles size={20} color="#7C3AED" />
              <input
                type="text"
                placeholder="Search with AI... (e.g. Tech hackathons in Coimbatore, Robowars, IIT Madras)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: '15px', color: '#1F2937', fontWeight: 500,
                  background: 'transparent'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                >
                  <X size={18} />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsVoiceActive(!isVoiceActive);
                  if (!isVoiceActive) {
                    setSearchQuery('Coimbatore');
                  }
                }}
                title="AI Voice Search"
                style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: isVoiceActive ? '#FEE2E2' : '#F3F4F6',
                  color: isVoiceActive ? '#EF4444' : '#4B5563',
                  border: 'none', display: 'grid', placeItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Mic size={18} />
              </button>
              <button
                type="button"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '10px 20px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                  color: '#fff', fontSize: '14px', fontWeight: 700,
                  border: 'none', cursor: 'pointer'
                }}
              >
                <Search size={15} />
                <span>Search</span>
              </button>
            </div>

            {/* Popular Search Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>Popular searches:</span>
              {popularSearches.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.query)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '5px 12px', borderRadius: '20px',
                    background: '#FFFFFF', border: '1px solid #E5E7EB',
                    fontSize: '12.5px', fontWeight: 600, color: '#374151',
                    cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TOP SPOTLIGHT WITH LIVE CIRCULAR COUNTDOWN TIMERS */}
      <section style={{ padding: '36px 0 48px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>⭐</span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#111827' }}>Top Spotlight Event</h2>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6B7280' }}>
                Verified premier national campus opportunities. Want your college event featured?
              </p>
            </div>
            
            {/* Carousel navigation controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSpotlightIndex(prev => (prev - 1 + 5) % 5)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: '#F3F4F6', border: '1px solid #E5E7EB',
                  display: 'grid', placeItems: 'center', cursor: 'pointer'
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSpotlightIndex(prev => (prev + 1) % 5)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: '#7C3AED', color: '#fff', border: 'none',
                  display: 'grid', placeItems: 'center', cursor: 'pointer'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Spotlight Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 100%)',
            border: '2px solid #E9D5FF',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(124, 58, 237, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '0'
          }}>
            {/* Left: Real Poster */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '320px', background: '#0F172A' }}>
              <img
                src={currentSpotlight.image}
                alt={currentSpotlight.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                display: 'flex', gap: '8px'
              }}>
                <span style={{
                  padding: '6px 14px', borderRadius: '999px',
                  background: 'rgba(124, 58, 237, 0.95)', color: '#fff',
                  fontSize: '12.5px', fontWeight: 800, letterSpacing: '0.3px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {currentSpotlight.category.toUpperCase()}
                </span>
                <span style={{
                  padding: '6px 14px', borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.95)', color: '#fff',
                  fontSize: '12.5px', fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  PRIZE {currentSpotlight.prize}
                </span>
              </div>
            </div>

            {/* Right: Event Details & Circular Countdown */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Live Status indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block', boxShadow: '0 0 10px #EF4444' }} />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Registration Closes in {currentSpotlight.deadlineInDays} Days
                  </span>
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px', color: '#111827', lineHeight: 1.25 }}>
                  {currentSpotlight.title}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#7C3AED', margin: '0 0 16px' }}>
                  🏛️ {currentSpotlight.organizer}
                </p>
                <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 20px', lineHeight: 1.5 }}>
                  {currentSpotlight.shortDesc}
                </p>

                {/* Circular Countdown Timers */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                    Event Starts In:
                  </span>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    {/* Days */}
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'conic-gradient(#7C3AED 280deg, #E5E7EB 0deg)',
                      display: 'grid', placeItems: 'center', padding: '4px'
                    }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#F5F3FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{String(timeLeft.days).padStart(2, '0')}</span>
                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#7C3AED' }}>DAYS</span>
                      </div>
                    </div>
                    {/* Hours */}
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'conic-gradient(#10B981 190deg, #E5E7EB 0deg)',
                      display: 'grid', placeItems: 'center', padding: '4px'
                    }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ECFDF5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#10B981' }}>HOURS</span>
                      </div>
                    </div>
                    {/* Mins */}
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'conic-gradient(#F59E0B 240deg, #E5E7EB 0deg)',
                      display: 'grid', placeItems: 'center', padding: '4px'
                    }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FFFBEB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{String(timeLeft.mins).padStart(2, '0')}</span>
                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#F59E0B' }}>MINS</span>
                      </div>
                    </div>
                    {/* Secs */}
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'conic-gradient(#3B82F6 140deg, #E5E7EB 0deg)',
                      display: 'grid', placeItems: 'center', padding: '4px'
                    }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#EFF6FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{String(timeLeft.secs).padStart(2, '0')}</span>
                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#3B82F6' }}>SECS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue & Date Details */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#F3F4F6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                    <MapPin size={15} color="#7C3AED" />
                    <span>{currentSpotlight.location}</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#F3F4F6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                    <Calendar size={15} color="#7C3AED" />
                    <span>{currentSpotlight.date}</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#F5F3FF', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#6D28D9' }}>
                    <span>{currentSpotlight.fee}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href={`/events/${currentSpotlight.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', padding: '12px 20px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                    color: '#fff', fontSize: '15px', fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
                  }}>
                    Get Ticket / Register Free
                  </button>
                </Link>
                <button
                  onClick={() => handleToggleSave(currentSpotlight.id)}
                  style={{
                    padding: '12px 18px', borderRadius: '12px',
                    background: savedEventIds.includes(currentSpotlight.id) ? '#EDE9FE' : '#FFFFFF',
                    border: '1px solid #DDD6FE',
                    color: savedEventIds.includes(currentSpotlight.id) ? '#6D28D9' : '#4B5563',
                    fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Bookmark size={16} fill={savedEventIds.includes(currentSpotlight.id) ? '#7C3AED' : 'none'} color="#7C3AED" />
                  <span>{savedEventIds.includes(currentSpotlight.id) ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXPLORE EVENT TYPES - CATEGORY GRID */}
      <section style={{ padding: '60px 0', background: '#F9FAFB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', color: '#111827' }}>
              Explore Event Types
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>
              Discover opportunities categorized for engineering, management, and arts students.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => {
                  if (cat.name === 'Hackathons') setActiveTab('hackathons');
                  else if (cat.name === 'Symposiums') setActiveTab('symposiums');
                  else if (cat.name === 'Cultural Fests') setActiveTab('cultural');
                  else setSearchQuery(cat.name);
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '22px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: cat.gradient, color: '#fff',
                    display: 'grid', placeItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', background: '#F3F4F6', color: '#4B5563', borderRadius: '20px' }}>
                    {cat.count}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>{cat.name}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIVE EVENT FEED & FILTER TABS */}
      <section style={{ padding: '30px 0 80px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Header & Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '28px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#111827' }}>
                Verified College Events
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0' }}>
                Showing {filteredEvents.length} live opportunities across India
              </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: 'all', label: 'All Events' },
                { id: 'recommended', label: '✨ AI Match' },
                { id: 'trending', label: '🔥 Trending' },
                { id: 'hackathons', label: 'Hackathons' },
                { id: 'symposiums', label: 'Symposiums' },
                { id: 'cultural', label: 'Cultural' },
                { id: 'online', label: 'Online / Hybrid' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '8px 16px', borderRadius: '10px',
                    fontSize: '13.5px', fontWeight: 700,
                    background: activeTab === tab.id ? '#7C3AED' : '#F3F4F6',
                    color: activeTab === tab.id ? '#fff' : '#4B5563',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region Quick Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>Filter by Region:</span>
            {['All', 'Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Online'].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                  background: selectedCity === city ? '#EDE9FE' : '#F9FAFB',
                  color: selectedCity === city ? '#6D28D9' : '#4B5563',
                  border: selectedCity === city ? '1px solid #C4B5FD' : '1px solid #E5E7EB',
                  cursor: 'pointer'
                }}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '24px'
            }}>
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  {/* Poster Thumbnail */}
                  <Link href={`/events/${event.id}`} style={{ textDecoration: 'none', position: 'relative', display: 'block', aspectRatio: '16/9', overflow: 'hidden', background: '#0F172A' }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', background: 'rgba(255,255,255,0.92)', fontSize: '11px', fontWeight: 800, color: '#6D28D9' }}>
                        {event.category}
                      </span>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.92)', fontSize: '11px', fontWeight: 800, color: '#fff' }}>
                        {event.prize}
                      </span>
                    </div>
                    {event.matchScore && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '999px', background: 'rgba(124, 58, 237, 0.95)', color: '#fff', fontSize: '11px', fontWeight: 800 }}>
                          ⚡ {event.matchScore}% Match
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Body */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <Link href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px', color: '#111827', lineHeight: 1.35 }}>
                          {event.title}
                        </h3>
                      </Link>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#6D28D9', margin: '0 0 10px' }}>
                        🏛️ {event.organizer}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '12.5px', color: '#4B5563', marginBottom: '12px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={13} color="#7C3AED" /> {event.location} • {event.mode}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={13} color="#7C3AED" /> {event.date}
                        </span>
                      </div>

                      {event.deadlineInDays <= 7 && (
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                          <Clock size={13} /> Closes in {event.deadlineInDays} days
                        </div>
                      )}

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {event.skills.slice(0, 3).map(skill => (
                          <span key={skill} style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', background: '#F3F4F6', color: '#4B5563' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleToggleSave(event.id)}
                        style={{
                          padding: '8px 12px', borderRadius: '10px',
                          background: savedEventIds.includes(event.id) ? '#EDE9FE' : '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          color: savedEventIds.includes(event.id) ? '#6D28D9' : '#4B5563',
                          fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '4px'
                        }}
                      >
                        <Bookmark size={14} fill={savedEventIds.includes(event.id) ? '#7C3AED' : 'none'} color="#7C3AED" />
                        <span>{savedEventIds.includes(event.id) ? 'Saved' : 'Save'}</span>
                      </button>

                      <Link href={`/events/${event.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                        <button style={{
                          width: '100%', padding: '8px 14px', borderRadius: '10px',
                          background: '#7C3AED', color: '#fff', fontSize: '13px', fontWeight: 700,
                          border: 'none', cursor: 'pointer'
                        }}>
                          View Event
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F9FAFB', borderRadius: '16px', border: '1px dashed #D1D5DB' }}>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#374151', margin: '0 0 8px' }}>No events found for this filter</p>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px' }}>Try clearing your search query or selecting a different city.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCity('All'); setActiveTab('all'); }}
                style={{ padding: '8px 18px', borderRadius: '10px', background: '#7C3AED', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* POST AN EVENT / ADD EVERYTHING MODAL */}
      {isPostModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
          display: 'grid', placeItems: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: '20px',
            maxWidth: '640px', width: '100%', maxHeight: '90vh',
            overflowY: 'auto', padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsPostModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#F3F4F6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F5F3FF', display: 'grid', placeItems: 'center', color: '#7C3AED' }}>
                <PlusCircle size={20} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#111827' }}>
                Post Your College Event
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 24px' }}>
              Reach 50,000+ engineering and college students across India in minutes.
            </p>

            <form onSubmit={handleAddEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INVENTO 2026: National AI Hackathon"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Event Category *
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Symposium">Technical Symposium</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Cultural">Cultural Fest</option>
                    <option value="Competition">Robotics / Competition</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Mode *
                  </label>
                  <select
                    value={newEvent.mode}
                    onChange={(e) => setNewEvent({ ...newEvent, mode: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Offline">Offline (On Campus)</option>
                    <option value="Online">Online (Virtual)</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  College / Organizing Institution *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PSG College of Technology, Coimbatore"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Campus Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Cash Prize Pool
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹2,00,000"
                    value={newEvent.prize}
                    onChange={(e) => setNewEvent({ ...newEvent, prize: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Choose Event Poster
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
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
                      style={{
                        cursor: 'pointer', borderRadius: '8px', overflow: 'hidden',
                        border: newEvent.image === p.img ? '3px solid #7C3AED' : '1px solid #E5E7EB',
                        aspectRatio: '16/9'
                      }}
                    >
                      <img src={p.img} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Short Summary / Pitch
                </label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe what makes your college event awesome..."
                  value={newEvent.shortDesc}
                  onChange={(e) => setNewEvent({ ...newEvent, shortDesc: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#F3F4F6', color: '#374151', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 2, padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', color: '#fff', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)' }}
                >
                  🚀 Publish Event Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING AI ASSISTANT - GURU AI / ZUZU */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 900 }}>
        {!isAiChatOpen ? (
          <button
            onClick={() => setIsAiChatOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '999px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              color: '#fff', fontSize: '14px', fontWeight: 800,
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
              border: 'none', cursor: 'pointer'
            }}
          >
            <Sparkles size={18} />
            <span>Ask Guru AI</span>
          </button>
        ) : (
          <div style={{
            width: '360px', height: '480px', background: '#FFFFFF',
            borderRadius: '20px', boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'center', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>Guru AI Assistant</p>
                  <p style={{ margin: 0, fontSize: '11px', opacity: 0.85 }}>AllCollegeEvent Intelligence</p>
                </div>
              </div>
              <button onClick={() => setIsAiChatOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.sender === 'user' ? '#7C3AED' : '#F3F4F6',
                    color: msg.sender === 'user' ? '#fff' : '#1F2937',
                    padding: '10px 14px', borderRadius: '14px',
                    maxWidth: '85%', fontSize: '13px', lineHeight: 1.4
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '10px 14px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask about college events..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '13px' }}
              />
              <button
                onClick={handleChatSend}
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#7C3AED', color: '#fff', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
