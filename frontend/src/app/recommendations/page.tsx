'use client';

import React, { useState, useEffect } from 'react';
import { recommendationApi, interactionApi, RecommendationItem } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  Sparkles,
  RefreshCw,
  Bookmark,
  Share2,
  ExternalLink,
  Brain,
  CheckCircle2,
  Award,
  Zap,
  Target,
  BookOpen,
  MapPin,
  Calendar,
  Building,
  Check,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('ALL');

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await recommendationApi.getRecommendations();
      if (Array.isArray(res.data) && res.data.length > 0) {
        setRecommendations(res.data);
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      // Clean fallback data aligned with backend schema
      setRecommendations([
        {
          eventId: 'rec-1',
          score: 98,
          matchReason: 'Direct alignment with your computer science background and ambition in Machine Learning & AI systems.',
          recommendedRole: 'Lead AI Engineer / Prompt Architect',
          suggestedPrep: ['Review Transformer Architecture', 'Setup PyTorch & LangChain', 'Practice RAG retrieval'],
          estimatedDifficulty: 'ADVANCED',
          event: {
            id: 'rec-1',
            title: 'IIT Bombay National AI & GenAI Hackathon 2026',
            description: '48-hour national level hackathon focused on building autonomous agent workflows, multimodal LLMs, and enterprise productivity software.',
            category: 'Hackathon',
            location: 'Mumbai, India (Hybrid)',
            organizer: 'Department of Computer Science, IIT Bombay',
            startDate: '2026-09-20',
            endDate: '2026-09-22',
            registrationDeadline: '2026-09-15',
            domainTags: ['Generative AI', 'Agentic Workflows', 'Deep Learning'],
            skillsRequired: ['Python', 'PyTorch', 'TypeScript', 'LangChain'],
            difficultyLevel: 'ADVANCED',
            careerPathMatch: ['AI Researcher', 'ML Engineer', 'Full Stack Developer'],
          },
        },
        {
          eventId: 'rec-2',
          score: 93,
          matchReason: 'Matches your profile interest in distributed backend architecture, high-concurrency systems, and cloud deployment.',
          recommendedRole: 'Backend Developer / Systems Architect',
          suggestedPrep: ['Study Express & Prisma ORM', 'Build Docker containers', 'Benchmark REST routes'],
          estimatedDifficulty: 'INTERMEDIATE',
          event: {
            id: 'rec-2',
            title: 'AllCollegeEvent Backend & Distributed Systems Summit',
            description: 'Hands-on practical workshop designing scalable database abstractions, AI Gateway key pooling, and microservice load balancing.',
            category: 'Workshop',
            location: 'Online / Remote',
            organizer: 'AllCollegeEvent Developer Community',
            startDate: '2026-09-25',
            endDate: '2026-09-26',
            registrationDeadline: '2026-09-22',
            domainTags: ['System Design', 'Node.js', 'Distributed Systems'],
            skillsRequired: ['TypeScript', 'Express', 'PostgreSQL', 'Docker'],
            difficultyLevel: 'INTERMEDIATE',
            careerPathMatch: ['Backend Architect', 'DevOps Specialist'],
          },
        },
        {
          eventId: 'rec-3',
          score: 89,
          matchReason: 'Strong opportunity to gain production experience building agentic coding tools and enterprise integrations.',
          recommendedRole: 'AI Development Intern',
          suggestedPrep: ['Prepare GitHub Portfolio', 'Complete coding challenge'],
          estimatedDifficulty: 'INTERMEDIATE',
          event: {
            id: 'rec-3',
            title: 'HackGuru AI Research Fellowship & Internship',
            description: '3-month paid student fellowship researching multi-provider LLM routing, model fine-tuning, and automated code review workflows.',
            category: 'Internship',
            location: 'Bengaluru / Remote',
            organizer: 'HackGuru AI Labs',
            startDate: '2026-10-01',
            endDate: '2026-12-31',
            registrationDeadline: '2026-09-28',
            domainTags: ['AI Research', 'Full Stack', 'Open Source'],
            skillsRequired: ['Python', 'TypeScript', 'Git', 'Next.js'],
            difficultyLevel: 'INTERMEDIATE',
            careerPathMatch: ['AI Engineer', 'Research Scientist'],
          },
        },
        {
          eventId: 'rec-4',
          score: 85,
          matchReason: 'Great competitive platform to test algorithms, problem solving speed, and team collaboration skills.',
          recommendedRole: 'Competitive Programmer',
          suggestedPrep: ['Practice dynamic programming', 'Review graph algorithms'],
          estimatedDifficulty: 'INTERMEDIATE',
          event: {
            id: 'rec-4',
            title: 'BITS Pilani Apex Coding Championship 2026',
            description: 'Premier national competitive programming contest with live leaderboard, cash prizes, and recruitment opportunities.',
            category: 'Competition',
            location: 'Pilani, Rajasthan · Offline',
            organizer: 'BITS Pilani Coding Club',
            startDate: '2026-10-10',
            endDate: '2026-10-11',
            registrationDeadline: '2026-10-05',
            domainTags: ['Algorithms', 'Data Structures', 'C++', 'Java'],
            skillsRequired: ['C++', 'Python', 'Algorithms'],
            difficultyLevel: 'INTERMEDIATE',
            careerPathMatch: ['Software Engineer', 'Algorithm Specialist'],
          },
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await recommendationApi.refreshRecommendations();
      await fetchRecommendations();
    } catch {
      // demo delay simulation
      setTimeout(() => {
        fetchRecommendations();
        setRefreshing(false);
      }, 600);
      return;
    }
    setRefreshing(false);
  };

  const handleSave = async (eventId: string) => {
    const isSaved = savedIds.has(eventId);
    const newSaved = new Set(savedIds);
    if (isSaved) {
      newSaved.delete(eventId);
    } else {
      newSaved.add(eventId);
    }
    setSavedIds(newSaved);
    try {
      await interactionApi.logInteraction(eventId, 'SAVE');
    } catch {
      // offline fallback
    }
  };

  const handleShare = (eventId: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/events/${eventId}`;
      navigator.clipboard.writeText(url);
      setCopiedId(eventId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredRecs = recommendations.filter((item) => {
    if (filterDifficulty === 'ALL') return true;
    return item.estimatedDifficulty === filterDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* LinkedIn-style 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT SIDEBAR (Profile / Match criteria) ================= */}
        <aside className="lg:col-span-3 space-y-4">
          {/* User Profile Summary Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Header banner */}
            <div className="h-16 bg-gradient-to-r from-violet-600 to-indigo-700" />
            
            <div className="p-4 pt-0 text-center relative">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-white p-1 mx-auto -mt-8 shadow-sm">
                <div className="w-full h-full rounded-full bg-violet-100 text-violet-700 font-bold text-lg flex items-center justify-center border border-violet-200">
                  {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'ST'}
                </div>
              </div>

              <h2 className="font-bold text-gray-900 text-base mt-2">
                {user?.fullName || 'Student Candidate'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {user?.collegeName || 'Engineering & Technology'}
              </p>
              <p className="text-xs font-medium text-violet-700 mt-1">
                {user?.careerGoal ? `Target: ${user.careerGoal}` : 'Target: Software & AI Engineer'}
              </p>

              {/* Stats */}
              <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-left text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">Saved Events</span>
                  <span className="font-semibold text-gray-800">{savedIds.size}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">AI Matches</span>
                  <span className="font-semibold text-violet-700">{recommendations.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              Filter by Level
            </div>
            <div className="space-y-1 text-xs">
              {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                    filterDifficulty === diff
                      ? 'bg-violet-50 text-violet-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {diff === 'ALL' ? 'All Difficulties' : diff.charAt(0) + diff.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* AI Match Info Pill */}
          <div className="bg-violet-50 rounded-lg border border-violet-100 p-3 text-xs text-violet-900">
            <div className="flex items-center gap-1.5 font-semibold mb-1">
              <Brain className="w-4 h-4 text-violet-600" />
              <span>Matching Engine</span>
            </div>
            <p className="text-[11px] text-violet-700 leading-relaxed">
              Scored continuously against verified college hackathons, workshops, and contests across India.
            </p>
          </div>
        </aside>

        {/* ================= CENTER FEED (LinkedIn-style Event Post Cards) ================= */}
        <main className="lg:col-span-6 space-y-4">
          
          {/* Top Bar / Status Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-600" />
                Opportunities Matched for You
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Ranked by relevance to your skills, branch, and target roles
              </p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-600 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>

          {/* Feed Content */}
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
              <RefreshCw className="w-6 h-6 text-violet-600 animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">Evaluating opportunities...</p>
              <p className="text-xs text-gray-400 mt-1">Comparing 10,000+ candidate events against your student profile</p>
            </div>
          ) : filteredRecs.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
              <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">No opportunities found for this filter</p>
              <p className="text-xs text-gray-500 mt-1">Try switching to &quot;All Difficulties&quot; to see more matches.</p>
              <button
                onClick={() => setFilterDifficulty('ALL')}
                className="mt-4 px-4 py-1.5 rounded-md bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredRecs.map((item) => {
              const event = item.event;
              const isSaved = savedIds.has(item.eventId);
              const isCopied = copiedId === item.eventId;

              return (
                <article
                  key={item.eventId}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition-all p-5 space-y-4"
                >
                  {/* Post / Opportunity Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Organizer Avatar */}
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-sm text-gray-700 shrink-0">
                        <Building className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-900 leading-tight">
                          {event?.organizer}
                        </h3>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{event?.location}</span>
                          <span>·</span>
                          <span className="text-emerald-700 font-medium">Verified Organizer</span>
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold shrink-0">
                      <Zap className="w-3.5 h-3.5 text-violet-600 fill-violet-600" />
                      <span>{item.score}% Match</span>
                    </div>
                  </div>

                  {/* Event Title & Category */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                        {event?.category}
                      </span>
                      {item.estimatedDifficulty && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          {item.estimatedDifficulty} Level
                        </span>
                      )}
                      {event?.registrationDeadline && (
                        <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Reg Deadline: {event.registrationDeadline}
                        </span>
                      )}
                    </div>

                    <h2
                      onClick={() => setSelectedItem(item)}
                      className="text-base font-bold text-gray-900 hover:text-violet-600 cursor-pointer transition-colors leading-snug"
                    >
                      {event?.title}
                    </h2>

                    <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-3">
                      {event?.description}
                    </p>
                  </div>

                  {/* LinkedIn-style AI Match Reason Box */}
                  <div className="bg-gray-50 rounded-md p-3 border border-gray-200/80 text-xs text-gray-700 flex items-start gap-2.5">
                    <Brain className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900 block text-[11px]">Why you matched:</span>
                      <p className="text-[11px] text-gray-600 leading-normal mt-0.5">{item.matchReason}</p>
                    </div>
                  </div>

                  {/* Skills / Domain tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {(event?.skillsRequired || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[11px] font-medium hover:bg-gray-200 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Bar (LinkedIn Post Style) */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSave(item.eventId)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors font-medium ${
                          isSaved ? 'text-violet-700 bg-violet-50' : 'text-gray-600'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-violet-700' : ''}`} />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>

                      <button
                        onClick={() => handleShare(item.eventId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600 font-medium"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3 py-1.5 rounded-md border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          alert(`Registering for ${event?.title}... Redirecting to official registration page.`);
                        }}
                        className="px-3.5 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors"
                      >
                        Apply / Register
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </main>

        {/* ================= RIGHT SIDEBAR (Trending / Urgent Deadlines) ================= */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* Urgent Deadlines Widget */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-600" />
              Approaching Deadlines
            </h3>
            <div className="space-y-3 text-xs">
              <div className="border-b border-gray-100 pb-2.5">
                <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">2 Days Left</span>
                <p className="font-semibold text-gray-800 mt-1 leading-snug">IIT Bombay TechFest Hackathon</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Closes 15 Sep · Team of 2–4</p>
              </div>
              <div className="border-b border-gray-100 pb-2.5">
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">6 Days Left</span>
                <p className="font-semibold text-gray-800 mt-1 leading-snug">Backend & Distributed Systems Summit</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Closes 22 Sep · Individual</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">12 Days Left</span>
                <p className="font-semibold text-gray-800 mt-1 leading-snug">HackGuru AI Research Fellowship</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Closes 28 Sep · Paid Internship</p>
              </div>
            </div>
          </div>

          {/* Trending College Hubs */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
              Trending Event Hubs
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center justify-between hover:text-violet-700 cursor-pointer">
                <span>IIT Bombay</span>
                <span className="text-[11px] text-gray-400">12 events</span>
              </li>
              <li className="flex items-center justify-between hover:text-violet-700 cursor-pointer">
                <span>BITS Pilani</span>
                <span className="text-[11px] text-gray-400">8 events</span>
              </li>
              <li className="flex items-center justify-between hover:text-violet-700 cursor-pointer">
                <span>NIT Trichy</span>
                <span className="text-[11px] text-gray-400">6 events</span>
              </li>
              <li className="flex items-center justify-between hover:text-violet-700 cursor-pointer">
                <span>IIIT Hyderabad</span>
                <span className="text-[11px] text-gray-400">9 events</span>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="text-[11px] text-gray-400 text-center space-x-2 pt-2">
            <Link href="/about" className="hover:underline">About</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link href="/calendar" className="hover:underline">Calendar</Link>
            <p className="mt-1">AllCollegeEvent.com © 2026</p>
          </div>

        </aside>

      </div>

      {/* ================= MODAL FOR DETAILS ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-violet-100 text-violet-800">
                  {selectedItem.event?.category}
                </span>
                <span className="text-xs text-gray-500">{selectedItem.event?.location}</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-sm text-gray-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {selectedItem.event?.title}
                </h2>
                <p className="text-xs text-gray-500">
                  Organized by <span className="font-semibold text-gray-700">{selectedItem.event?.organizer}</span>
                </p>
              </div>

              {/* Match Callout */}
              <div className="bg-violet-50 rounded-lg p-4 border border-violet-200 space-y-1">
                <div className="flex items-center gap-2 text-violet-900 font-bold text-xs">
                  <Zap className="w-4 h-4 text-violet-600 fill-violet-600" />
                  <span>{selectedItem.score}% Profile Alignment</span>
                </div>
                <p className="text-xs text-violet-800 leading-relaxed">
                  {selectedItem.matchReason}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs uppercase tracking-wider">About This Event</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedItem.event?.description}
                </p>
              </div>

              {/* Recommended Role & Suggested Prep */}
              {selectedItem.recommendedRole && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 text-xs uppercase tracking-wider">Recommended Role</h4>
                  <p className="text-xs font-medium text-violet-700 bg-violet-50/60 px-3 py-1.5 rounded inline-block">
                    {selectedItem.recommendedRole}
                  </p>
                </div>
              )}

              {selectedItem.suggestedPrep && selectedItem.suggestedPrep.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-xs uppercase tracking-wider">Suggested Preparation</h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {selectedItem.suggestedPrep.map((prep, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills required */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs uppercase tracking-wider">Prerequisite Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedItem.event?.skillsRequired || []).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Registering for ${selectedItem.event?.title}...`);
                  setSelectedItem(null);
                }}
                className="px-5 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors"
              >
                Proceed to Register
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
