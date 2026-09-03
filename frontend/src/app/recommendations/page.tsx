'use client';

import React, { useState, useEffect } from 'react';
import { recommendationApi, interactionApi, RecommendationItem } from '@/lib/api';
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
  BookOpen
} from 'lucide-react';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await recommendationApi.getRecommendations();
      if (Array.isArray(res.data)) {
        setRecommendations(res.data);
      } else {
        throw new Error('Not an array');
      }
    } catch (err) {
      // Fallback demo dataset aligned with backend schema
      setRecommendations([
        {
          eventId: 'rec-1',
          score: 98,
          matchReason: 'Direct alignment with your career goal as an AI Research Scientist and proficiency in Python and Large Language Models.',
          recommendedRole: 'Lead AI Engineer / Prompt Architect',
          suggestedPrep: ['Review Transformer Architecture', 'Setup PyTorch & LangChain', 'Practice RAG retrieval'],
          estimatedDifficulty: 'ADVANCED',
          event: {
            id: 'rec-1',
            title: 'IIT Bombay National AI & GenAI Hackathon 2026',
            description: '48-hour national hackathon focused on building autonomous agent workflows, multimodal LLMs, and enterprise AI tools.',
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
          matchReason: 'Matches your interest in cloud architecture, REST APIs, and high-concurrency microservices.',
          recommendedRole: 'Backend Developer / Systems Architect',
          suggestedPrep: ['Study Express & Prisma ORM', 'Build Docker containers', 'Benchmark REST routes'],
          estimatedDifficulty: 'INTERMEDIATE',
          event: {
            id: 'rec-2',
            title: 'AllCollegeEvent Backend & Distributed Systems Summit',
            description: 'Hands-on workshop on designing scalable database abstractions, AI Gateway key pooling, and load balancing.',
            category: 'Workshop',
            location: 'Online',
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
          matchReason: 'Excellent opportunity to gain real-world experience building agentic coding tools.',
          recommendedRole: 'AI Development Intern',
          suggestedPrep: ['Prepare GitHub Portfolio', 'Complete coding challenge'],
          estimatedDifficulty: 'INTERMEDIATE',
          event: {
            id: 'rec-3',
            title: 'HackGuru AI Research Fellowship & Internship',
            description: '3-month paid internship program researching multi-provider LLM routing and automated code generation.',
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
    } catch (err) {
      // ignore
    } finally {
      setRefreshing(false);
    }
  };

  const handleAction = async (eventId: string, action: 'SAVE' | 'REGISTER' | 'SHARE' | 'VIEW') => {
    try {
      await interactionApi.logInteraction(eventId, action);
      if (action === 'SAVE') alert('Saved to your bookmarked opportunities!');
      if (action === 'REGISTER') alert('Redirecting to registration portal...');
      if (action === 'SHARE') alert('Copied event link to clipboard!');
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Agent 1: Opportunity Matcher
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Personalized AI Opportunity Feed
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time feed ranked by our dual-agent neural engine based on your branch, career goals, and skills.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="glow-button px-5 py-3 rounded-2xl text-xs font-bold text-white flex items-center gap-2 self-start md:self-auto shadow-lg disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Executing LLM Re-Analysis...' : 'Refresh AI Match Feed'}
        </button>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-sm text-gray-300">Scoring 10,000+ candidate events against your student profile...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List View */}
          <div className="lg:col-span-2 space-y-6">
            {recommendations.map((item, index) => {
              const event = item.event;
              return (
                <div
                  key={item.eventId || index}
                  className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                          {event?.category || 'Hackathon'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold flex items-center gap-1">
                          <Zap className="w-3 h-3" /> {item.score}% Match
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-gray-400 text-[11px]">
                          {event?.location}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {event?.title}
                      </h2>

                      <p className="text-xs text-gray-400 line-clamp-2">
                        {event?.description}
                      </p>
                    </div>
                  </div>

                  {/* AI Reason Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
                    <Brain className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-blue-300 block">AI Match Rationale:</span>
                      {item.matchReason}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {(event?.domainTags || []).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-medium text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(event?.id || item.eventId, 'SAVE')}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="Save to bookmarks"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(event?.id || item.eventId, 'SHARE')}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="Share event"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          handleAction(event?.id || item.eventId, 'VIEW');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200"
                      >
                        Inspect AI Breakdown
                      </button>
                    </div>

                    <button
                      onClick={() => handleAction(event?.id || item.eventId, 'REGISTER')}
                      className="glow-button px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                    >
                      Register Now <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Pane */}
          <div className="space-y-6">
            {selectedItem ? (
              <div className="glass-panel p-6 rounded-3xl border border-white/10 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" /> Event Intelligence Breakdown
                </h3>
                <p className="text-xs font-semibold text-blue-300 mb-4">{selectedItem.event.title}</p>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-gray-400 block font-semibold mb-1">Recommended Role:</span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      {selectedItem.recommendedRole || 'Team Lead'}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block font-semibold mb-1">Suggested Prep Steps:</span>
                    <ul className="space-y-1.5 text-gray-300">
                      {(selectedItem.suggestedPrep || ['Review Transformers', 'Setup environment']).map((prep, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {prep}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-gray-400 block font-semibold mb-1">Prerequisite Skills:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {(selectedItem.event.skillsRequired || []).map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-white/10 text-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center text-xs text-gray-400 sticky top-24">
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                Click &quot;Inspect AI Breakdown&quot; on any card to view recommended team roles and skill preparation plans.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
