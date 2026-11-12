import React from 'react';
import EventGrid from '@/components/events/EventGrid';
import { mockEvents } from '@/data/mock/events';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function WorkshopsPage() {
  const events = mockEvents.filter(e => e.category === 'workshop');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Editorial Category Banner with Workshop Backdrop */}
      <div className="relative rounded-[28px] border border-neutral-200/90 bg-white/85 backdrop-blur-md overflow-hidden p-6 sm:p-8 lg:p-10 mb-8 shadow-xs">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <img 
            src="/images/events/genai-bootcamp.jpg" 
            alt="Workshop atmosphere"
            className="w-full h-full object-cover opacity-10 filter grayscale contrast-125 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
          <div className="absolute inset-0 bg-ledger-grid opacity-60" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/90 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-700">Hands-on Labs</span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs font-semibold text-violet-700">18+ Active Masterclasses</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal tracking-tight leading-[1.1] mb-2">
              Workshops & Masterclasses, <br />
              <span className="font-editorial-italic font-normal">hands-on engineering.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Master modern AI stacks, full-stack architectures, and cloud systems guided by top engineers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/events?category=Workshop"
              className="btn-ink-pill text-xs py-2.5 px-4 shadow-xs"
            >
              <span>Public Directory</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <EventGrid events={events} columns={3} />
    </div>
  );
}
