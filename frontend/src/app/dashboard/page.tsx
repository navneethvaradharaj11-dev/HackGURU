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
  Layers,
  ArrowUpRight,
  RefreshCw,
  Bell,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardApi.getDashboard();
      setData(res.data || res);
    } catch (err: any) {
      // Fallback demo data if backend runs in offline/inmemory mode without live DB
      setData({
        student: {
          fullName: user?.fullName || 'Aarav Sharma',
          collegeName: user?.collegeName || 'IIT Bombay',
          branch: user?.branch || 'Computer Science',
          careerGoal: user?.careerGoal || 'AI Research Scientist',
        },
        stats: {
          savedEvents: 4,
          registeredEvents: 2,
          recommendationsCount: 8,
          upcomingDeadlines: 3,
        },
        upcomingDeadlines: [
          { id: '1', title: 'Smart India Hackathon 2026', deadline: 'In 2 days', category: 'Hackathon', urgency: 'HIGH' },
          { id: '2', title: 'Generative AI Workshop by Google', deadline: 'In 5 days', category: 'Workshop', urgency: 'MEDIUM' },
          { id: '3', title: 'Deep Learning Internship Submission', deadline: 'In 1 week', category: 'Internship', urgency: 'LOW' },
        ],
        recentRecommendations: [
          {
            eventId: 'ev-101',
            title: 'IIT Bombay TechFest Hackathon',
            category: 'Hackathon',
            matchScore: 96,
            reason: 'High alignment with your Computer Science background & LLM career goal.',
          },
          {
            eventId: 'ev-102',
            title: 'Autonomous AI Agents Bootcamp',
            category: 'Workshop',
            matchScore: 92,
            reason: 'Direct match for your interest in Multi-agent systems.',
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
    } catch (err) {
      // ignore
    } finally {
      setRefreshing(false);
    }
  };

  const handleInteraction = async (eventId: string, action: 'SAVE' | 'REGISTER') => {
    try {
      await interactionApi.logInteraction(eventId, action);
      alert(`Recorded ${action} interaction for event!`);
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Dashboard Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Aggregated Student Intelligence Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome Back, <span className="gradient-text">{data?.student?.fullName || user?.fullName || 'Student'}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {data?.student?.collegeName || 'IIT Bombay'} • {data?.student?.branch || 'Computer Science'} • Goal: <span className="text-gray-200">{data?.student?.careerGoal || 'AI Developer'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshAI}
              disabled={refreshing}
              className="glow-button px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing LLM Feed...' : 'Trigger AI Refresh'}
            </button>
            <Link
              href="/recommendations"
              className="px-4 py-2.5 rounded-xl glass-card text-xs font-semibold text-gray-200 hover:text-white flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-blue-400" /> Full AI Feed
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <span className="text-xs font-semibold text-gray-400">Saved Events</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{data?.stats?.savedEvents || 4}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-xs font-semibold text-gray-400">Registered</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{data?.stats?.registeredEvents || 2}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-xs font-semibold text-gray-400">AI Matches</span>
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{data?.stats?.recommendationsCount || 8}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold text-gray-400">Deadlines Due</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{data?.stats?.upcomingDeadlines || 3}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Top AI Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" /> High-Confidence AI Matches
              </h2>
              <Link href="/recommendations" className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4 py-8 text-center text-xs text-gray-400">
                <RefreshCw className="w-6 h-6 text-blue-400 animate-spin mx-auto mb-2" />
                Aggregating personalized feed from AI gateway...
              </div>
            ) : (
              <div className="space-y-4">
                {(data?.recentRecommendations || []).map((rec: any, idx: number) => (
                  <div key={idx} className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                          {rec.category || 'Hackathon'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                          {rec.matchScore || 95}% Match
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{rec.title || rec.event?.title}</h3>
                      <p className="text-xs text-gray-300 mt-1">{rec.reason || rec.matchReason}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleInteraction(rec.eventId || 'ev-101', 'SAVE')}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleInteraction(rec.eventId || 'ev-101', 'REGISTER')}
                        className="glow-button px-3.5 py-1.5 rounded-lg text-xs font-bold text-white"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deadlines & Reminders */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-400" /> Registration Deadlines
            </h2>

            <div className="space-y-3">
              {(data?.upcomingDeadlines || []).map((dl: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{dl.title}</p>
                    <span className="text-[10px] text-gray-400">{dl.category}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                    dl.urgency === 'HIGH' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {dl.deadline}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/calendar"
              className="mt-4 w-full block text-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
            >
              Open Full Calendar Schedule
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
