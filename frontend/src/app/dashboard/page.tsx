'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { dashboardApi, recommendationApi, interactionApi } from '@/lib/api';
import {
  Sparkles,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Briefcase,
  ArrowUpRight,
  RefreshCw,
  Bell,
  CheckCircle2,
  Building,
  Target,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await dashboardApi.getDashboard();
      setData(res.data || res);
    } catch {
      // Fallback data aligned with schema
      setData({
        student: {
          fullName: user?.fullName || 'Navneeth V',
          collegeName: user?.collegeName || 'IIT Bombay',
          branch: user?.branch || 'Computer Science & Engineering',
          careerGoal: user?.careerGoal || 'AI Research & Systems Engineer',
        },
        stats: {
          savedEvents: 5,
          registeredEvents: 3,
          recommendationsCount: 12,
          upcomingDeadlines: 4,
        },
        upcomingDeadlines: [
          { id: '1', title: 'IIT Bombay TechFest Hackathon', deadline: 'In 2 days', category: 'Hackathon', urgency: 'HIGH' },
          { id: '2', title: 'Backend & Distributed Systems Summit', deadline: 'In 6 days', category: 'Workshop', urgency: 'MEDIUM' },
          { id: '3', title: 'HackGuru AI Research Fellowship', deadline: 'In 12 days', category: 'Internship', urgency: 'LOW' },
          { id: '4', title: 'Apex Competitive Programming Contest', deadline: 'In 18 days', category: 'Competition', urgency: 'LOW' },
        ],
        recentRecommendations: [
          {
            eventId: 'ev-1',
            title: 'IIT Bombay TechFest Hackathon 2026',
            category: 'Hackathon',
            matchScore: 98,
            reason: 'Top alignment with your Computer Science background and generative AI goals.',
            location: 'Mumbai · Hybrid',
          },
          {
            eventId: 'ev-2',
            title: 'Autonomous AI Agents Bootcamp',
            category: 'Workshop',
            matchScore: 94,
            reason: 'Direct match for your interest in Agentic Workflows & Multi-agent Systems.',
            location: 'Online Webinar',
          },
          {
            eventId: 'ev-3',
            title: 'Paid Data & ML Internship 2026',
            category: 'Internship',
            matchScore: 90,
            reason: 'Matches Python and PyTorch proficiency demonstrated in your profile.',
            location: 'Bengaluru · Hybrid',
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleRefreshAI = async () => {
    setRefreshing(true);
    try {
      await recommendationApi.refreshRecommendations();
      await fetchDashboardData();
    } catch {
      setTimeout(() => {
        fetchDashboardData();
        setRefreshing(false);
      }, 500);
      return;
    }
    setRefreshing(false);
  };

  const handleSave = async (id: string) => {
    const next = new Set(savedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedIds(next);
    try {
      await interactionApi.logInteraction(id, 'SAVE');
    } catch {
      // offline fallback
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* LinkedIn-style Dashboard Welcome Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200">
              Student Workspace
            </span>
            <span className="text-xs text-gray-500">
              {data?.student?.collegeName || 'University Student'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back, {data?.student?.fullName || user?.fullName || 'Student'} 👋
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Branch: <span className="font-semibold text-gray-800">{data?.student?.branch || 'Engineering'}</span> · Target: <span className="font-semibold text-violet-700">{data?.student?.careerGoal || 'Software Engineer'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshAI}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-violet-600 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing AI...' : 'Refresh Feed'}</span>
          </button>
          <Link
            href="/recommendations"
            className="px-4 py-2 rounded-md bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>My AI Matches</span>
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards (LinkedIn Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Saved Events</span>
            <Bookmark className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{data?.stats?.savedEvents || 5}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Opportunities bookmarked</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Registered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{data?.stats?.registeredEvents || 3}</p>
          <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Active participation</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>AI Match Score</span>
            <Sparkles className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-violet-700">{data?.stats?.recommendationsCount || 12}</p>
          <p className="text-[11px] text-violet-700 font-medium mt-0.5">High-fit matches</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Active Deadlines</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{data?.stats?.upcomingDeadlines || 4}</p>
          <p className="text-[11px] text-red-600 font-medium mt-0.5">Closing within 14 days</p>
        </div>
      </div>

      {/* Main Grid: Recommended Feeds + Urgent Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Center: High Confidence Matches */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  Top Recommended Opportunities
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Personalized to your target role and skills</p>
              </div>
              <Link href="/recommendations" className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {(data?.recentRecommendations || []).map((rec: any, idx: number) => {
                const isSaved = savedIds.has(rec.eventId);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700">
                          {rec.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-violet-50 text-violet-800 border border-violet-200">
                          {rec.matchScore}% Match
                        </span>
                        <span className="text-[11px] text-gray-400">{rec.location}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-normal">
                        {rec.reason}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSave(rec.eventId)}
                        className={`p-2 rounded-md border text-xs font-semibold transition-colors ${
                          isSaved ? 'bg-violet-50 text-violet-700 border-violet-200' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                        title="Save event"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-violet-700' : ''}`} />
                      </button>
                      <Link
                        href={`/events/${rec.eventId}`}
                        className="px-3.5 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                      >
                        View &amp; Apply
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Registration Deadlines + Quick Tools */}
        <div className="lg:col-span-4 space-y-4">
          {/* Deadlines Box */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-600" />
              Approaching Deadlines
            </h2>

            <div className="space-y-3">
              {(data?.upcomingDeadlines || []).map((dl: any, idx: number) => (
                <div key={idx} className="p-3 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-gray-900 leading-snug">{dl.title}</p>
                    <span className="text-[11px] text-gray-500">{dl.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ml-2 ${
                    dl.urgency === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {dl.deadline}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/calendar"
              className="mt-4 w-full block text-center py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
            >
              Open Full Event Calendar
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Quick Navigation</h3>
            <div className="space-y-1.5 text-xs">
              <Link href="/events" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-gray-700">
                <span>Browse All Events</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
              <Link href="/recommendations" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-gray-700">
                <span>AI Opportunity Matcher</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
              <Link href="/calendar" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-gray-700">
                <span>My Deadline Schedule</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
