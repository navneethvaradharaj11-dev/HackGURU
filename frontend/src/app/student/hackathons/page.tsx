import React from 'react';
import EventGrid from '@/components/events/EventGrid';
import { mockEvents } from '@/data/mock/events';
import { mockRecommendations } from '@/data/mock/recommendations';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function HackathonsPage() {
  const events = mockEvents.filter(e => e.category === 'hackathon');
  const matchMap = Object.fromEntries(
    mockRecommendations.filter(r => r.event.category === 'hackathon').map(r => [r.event.id, r.match])
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Editorial Category Banner with Authentic Hackathon Backdrop */}
      <div className="relative rounded-[28px] border border-neutral-200/90 bg-white/85 backdrop-blur-md overflow-hidden p-6 sm:p-8 lg:p-10 mb-8 shadow-xs">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <img 
            src="/images/events/hackforge-2026.jpg" 
            alt="Hackathon atmosphere"
            className="w-full h-full object-cover opacity-10 filter grayscale contrast-125 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
          <div className="absolute inset-0 bg-ledger-grid opacity-60" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/90 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-700">Sprint Ledger</span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs font-semibold text-violet-700">32+ Active Competitions</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal tracking-tight leading-[1.1] mb-2">
              Collegiate Hackathons, <br />
              <span className="font-editorial-italic font-normal">built in 36 hours.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              High-intensity buildathons, AI tournaments, and algorithmic sprints across premier universities with verified prize pools.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/events?category=Hackathon"
              className="btn-ink-pill text-xs py-2.5 px-4 shadow-xs"
            >
              <span>Public Directory</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <EventGrid events={events} matches={matchMap} columns={3} />
    </div>
  );
}
