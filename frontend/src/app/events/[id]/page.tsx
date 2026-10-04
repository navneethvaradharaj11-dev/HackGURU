import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import MatchScore from '@/components/recommendations/MatchScore';
import { mockEvents } from '@/data/mock/events';
import { mockRecommendations } from '@/data/mock/recommendations';
import { formatDate, daysUntil, getCategoryLabel } from '@/lib/utils/cn';
import { AIMatch } from '@/types';
import {
  MapPin,
  Calendar,
  Building,
  Bookmark,
  Share2,
  CheckCircle2,
  Clock,
  Trophy,
  Users,
  Sparkles,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

const modeLabels: Record<string, string> = {
  online: 'Online / Remote',
  offline: 'In Person',
  hybrid: 'Hybrid Mode',
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    notFound();
  }

  // Find recommendation match if available
  const rec = mockRecommendations.find(r => r.event.id === id);
  const match: AIMatch = rec?.match || {
    overall: 88,
    skillMatch: 85,
    interestMatch: 84,
    careerFit: 90,
    locationFit: 92,
    eligibility: 100,
    reasoning: `This ${event.category} aligns with your technical profile, demonstrated projects, and career aspirations.`,
    strengths: ['Skills align with event focus', 'Relevant to target industry careers', 'Verified college host'],
  };

  const deadline = daysUntil(event.deadline);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumb / Back button */}
      <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/events" className="flex items-center gap-1 hover:text-violet-600 font-medium transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Events
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{event.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= MAIN COLUMN (2-Column LinkedIn Post & Details) ================= */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Top Job/Opportunity Card Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* College Avatar */}
                <div className="w-14 h-14 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700 shrink-0">
                  <Building className="w-7 h-7 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
                      {getCategoryLabel(event.category)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {modeLabels[event.mode]}
                    </span>
                    {event.featured && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        Featured Opportunity
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    {event.title}
                  </h1>

                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-gray-800">{event.organization}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">Start Date</span>
                <span className="font-semibold text-gray-800 mt-0.5 block">{formatDate(event.startDate)}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">Registration Deadline</span>
                <span className={`font-semibold mt-0.5 block ${deadline <= 7 ? 'text-red-600' : 'text-gray-800'}`}>
                  {formatDate(event.deadline)} ({deadline} days left)
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">Prize / Benefit</span>
                <span className="font-semibold text-emerald-700 mt-0.5 block">{event.prize || 'Certificates & Swag'}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-semibold">Team Size</span>
                <span className="font-semibold text-gray-800 mt-0.5 block">{event.teamSize || 'Individual / Teams'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <Link href="/register" className="flex-1 sm:flex-none">
                <button className="w-full sm:w-auto px-6 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>Register / Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </Link>
              <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs transition-colors flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Event</span>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">About This Event</h2>
            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Required Skills */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recommended Skills</h2>
            <div className="flex flex-wrap gap-2">
              {event.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          {event.eligibility && event.eligibility.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Eligibility Criteria</h2>
              <ul className="space-y-2 text-xs text-gray-600">
                {event.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {event.benefits && event.benefits.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Perks &amp; Benefits</h2>
              <ul className="space-y-2 text-xs text-gray-600">
                {event.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {event.timeline && event.timeline.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Event Schedule</h2>
              <div className="relative border-l-2 border-gray-200 ml-3 space-y-4 py-1">
                {event.timeline.map((item, idx) => (
                  <div key={idx} className="ml-4 relative">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-violet-600 border-2 border-white ring-2 ring-violet-200" />
                    <p className="text-[11px] font-semibold text-violet-700">{formatDate(item.date)}</p>
                    <p className="text-xs font-bold text-gray-900 mt-0.5">{item.title}</p>
                    {item.description && (
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* AI Profile Match Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">AI Match Fit</h3>
            </div>

            <div className="p-3.5 bg-violet-50 rounded-lg border border-violet-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-900">Overall Fit Score</span>
                <span className="px-2 py-0.5 rounded-full bg-violet-600 text-white font-extrabold text-xs">
                  {match.overall}%
                </span>
              </div>
              <p className="text-[11px] text-violet-800 leading-relaxed">
                {match.reasoning}
              </p>
            </div>

            {/* Strengths */}
            {match.strengths && match.strengths.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-gray-700 block">Why you stand out:</span>
                {match.strengths.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">About the Host</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700">
                <Building className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{event.organization}</p>
                <p className="text-[11px] text-gray-500">{event.location}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Official student association and event department verified on AllCollegeEvent.com.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
