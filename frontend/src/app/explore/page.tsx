'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import EventCard from '@/components/events/EventCard';
import Button from '@/components/ui/Button';
import { mockEvents } from '@/data/mock/events';
import { Search, SlidersHorizontal, MapPin, Calendar, Building, Sparkles, X } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Opportunities' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'internship', label: 'Internships' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'competition', label: 'Competitions' },
  { id: 'project', label: 'Projects' },
];

const modes = [
  { id: 'all', label: 'All Modes' },
  { id: 'online', label: 'Online / Remote' },
  { id: 'offline', label: 'In Person' },
  { id: 'hybrid', label: 'Hybrid' },
];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category')?.toLowerCase() || 'all');
  const [selectedMode, setSelectedMode] = useState(searchParams.get('mode')?.toLowerCase() || 'all');
  const [sortBy, setSortBy] = useState<'deadline' | 'date' | 'relevance'>('relevance');

  useEffect(() => {
    const cat = searchParams.get('category')?.toLowerCase();
    if (cat) {
      const match = categories.find(c => c.id === cat || c.id === cat.replace(/s$/, ''));
      setSelectedCategory(match ? match.id : 'all');
    } else {
      setSelectedCategory('all');
    }

    const q = searchParams.get('search');
    if (q !== null && q !== undefined) {
      setSearch(q);
    }

    const m = searchParams.get('mode')?.toLowerCase();
    if (m) {
      setSelectedMode(m);
    }
  }, [searchParams]);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(searchParams.toString());
    if (catId && catId !== 'all') {
      params.set('category', catId);
    } else {
      params.delete('category');
    }
    router.push(params.toString() ? `/explore?${params.toString()}` : '/explore');
  };

  const filtered = useMemo(() => {
    let events = [...mockEvents];

    if (search) {
      const q = search.toLowerCase();
      events = events.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.organization.toLowerCase().includes(q) ||
          e.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      events = events.filter(e => e.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedMode !== 'all') {
      events = events.filter(e => e.mode.toLowerCase() === selectedMode.toLowerCase());
    }

    if (sortBy === 'deadline') {
      events.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else if (sortBy === 'date') {
      events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    return events;
  }, [search, selectedCategory, selectedMode, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] bg-ledger-grid relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle radial ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-b from-violet-100/40 via-violet-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Themed Editorial Banner with Collegiate Campus Imagery */}
        <div className="relative rounded-[28px] border border-neutral-200/90 bg-white/85 backdrop-blur-md overflow-hidden p-6 sm:p-10 lg:p-12 mb-8 sm:mb-10 shadow-xs">
          {/* Atmospheric Campus Background Image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img 
              src="/images/hero-hackathon.jpg" 
              alt="Collegiate campus atmosphere"
              className="w-full h-full object-cover object-center opacity-10 filter grayscale contrast-125 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
            <div className="absolute inset-0 bg-ledger-grid opacity-60" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs mb-4">
                <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-700">Campus Directory</span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs font-semibold text-violet-700">100+ Accredited Colleges</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] text-neutral-950 font-normal tracking-tight leading-[1.1] mb-3">
                National College Directory, <br />
                <span className="font-editorial-italic font-normal">curated by track.</span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 max-w-2xl font-normal leading-relaxed">
                Explore university hackathons, technical symposiums, research fellowships, and robowars indexed across premier institutions.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <Link
                href="/recommendations"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-neutral-200/90 text-neutral-800 text-xs font-semibold shadow-2xs hover:bg-neutral-50 transition-all"
              >
                <Sparkles size={14} className="text-violet-600" />
                <span>AI Match Telemetry</span>
              </Link>
              <Link
                href="/events"
                className="btn-ink-pill text-xs py-2.5 px-5 shadow-xs"
              >
                <span>Ledger View</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Pill Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by college name, event title, tech stack, or campus location (e.g. IIT Bombay, Python, Chennai)..."
            aria-label="Search directory"
            className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white border border-neutral-200/90 shadow-xs focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 transition-all font-sans"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters Bar: Category Pills + Dropdown Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          {/* Categories Pill row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0B0B0E] text-white shadow-xs'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-2xs'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            {/* Mode dropdown */}
            <select
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
              aria-label="Filter by mode"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-neutral-200/80 text-neutral-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              {modes.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Sort listings"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-neutral-200/80 text-neutral-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="deadline">Sort: Deadline</option>
              <option value="date">Sort: Upcoming</option>
            </select>
          </div>
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200/80 text-xs font-semibold text-neutral-500">
          <span className="font-tabular">
            {filtered.length} collegiate opportunities indexed
          </span>
          <span className="text-[11px] text-neutral-400 font-normal">
            AllCollegeEvent Directory Ledger v2.6
          </span>
        </div>

        {/* Grid of Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(event => (
              <EventCard
                key={event.id}
                event={event}
                variant={event.featured ? 'featured' : 'default'}
              />
            ))}
          </div>
        ) : (
          <div className="card-diffusion p-16 rounded-3xl text-center bg-white">
            <p className="text-3xl mb-3">🔍</p>
            <h3 className="font-editorial text-2xl font-normal text-neutral-900 mb-2">No matching listings found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
              Try searching with a broader technology keyword, university acronym, or clear your category filter.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('all'); setSelectedMode('all'); router.push('/explore'); }}
              className="btn-ink-pill text-xs py-2.5 px-6 shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-gray-400">Loading directory...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
