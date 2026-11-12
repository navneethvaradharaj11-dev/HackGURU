'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal, AlertCircle, Inbox, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import { eventsApi } from '@/lib/api';

const categories = ['All', 'Hackathons', 'Symposiums', 'Workshops', 'Competitions', 'Internships', 'Cultural', 'Conferences'];
const modes = ['All', 'Online', 'Offline', 'Hybrid'];
const dates = ['All Dates', 'Today', 'This Week', 'This Month', 'Upcoming'];
const sorts = ['Recommended', 'Soonest Deadline', 'Latest Added', 'Most Popular'];

const fallbackEvents: EventCardProps[] = [
  {
    id: 'hackforge-2026',
    title: 'HackForge 2026: 36-Hour National AI & Web3 Hackathon',
    category: 'Hackathon',
    organizer: 'Kongu Engineering & PSG Tech',
    location: 'Coimbatore',
    mode: 'Offline',
    date: '14 Mar 2026',
    deadlineInDays: 4,
    skills: ['AI/ML', 'Next.js', 'Solidity', 'PyTorch'],
    matchScore: 98,
    image: '/images/events/hackforge-2026.jpg',
  },
  {
    id: 'innofest-2026',
    title: 'INNOFEST 2026: National Technical Symposium',
    category: 'Symposium',
    organizer: 'IIT Madras',
    location: 'Chennai',
    mode: 'Offline',
    date: '14 Mar 2026',
    deadlineInDays: 8,
    skills: ['Research', 'Algorithms', 'Robotics', 'C++'],
    matchScore: 96,
    image: '/images/events/innofest-2026.jpg',
  },
  {
    id: 'agentic-ai-summit-2026',
    title: 'Agentic AI Summit 2026: LLMs & Multi-Agent Systems',
    category: 'Workshop',
    organizer: 'Anna University CEG',
    location: 'Chennai',
    mode: 'Hybrid',
    date: '20 Apr 2026',
    deadlineInDays: 20,
    skills: ['LangChain', 'CrewAI', 'Python', 'FastAPI'],
    matchScore: 95,
    image: '/images/events/genai-bootcamp.jpg',
  },
  {
    id: 'robowars-2026',
    title: 'ROBOWARS 2026: Combat Robotics Championship',
    category: 'Competition',
    organizer: 'PSG College of Technology',
    location: 'Coimbatore',
    mode: 'Offline',
    date: '04 Apr 2026',
    deadlineInDays: 12,
    skills: ['Robotics', 'Pneumatics', 'Embedded Systems', 'CAD'],
    matchScore: 92,
    image: '/images/events/robotics.jpg',
  },
  {
    id: 'rhythm-2026',
    title: 'RHYTHM 2026: All India Inter-Collegiate Cultural Extravaganza',
    category: 'Cultural',
    organizer: 'VIT Vellore',
    location: 'Vellore',
    mode: 'Offline',
    date: '10 Apr 2026',
    deadlineInDays: 16,
    skills: ['Music', 'Choreography', 'Fashion', 'Stage Drama'],
    matchScore: 89,
    image: '/images/events/cultural.jpg',
  },
  {
    id: '1',
    title: 'AI Innovation Challenge 2026',
    category: 'Hackathon',
    organizer: 'IIT Bombay',
    location: 'Mumbai',
    mode: 'Offline',
    date: '26 Oct 2026',
    deadlineInDays: 3,
    skills: ['Python', 'AI'],
    matchScore: 95,
    image: '/images/events/ai-hackathon.jpg',
  },
  {
    id: '2',
    title: 'GenAI Bootcamp',
    category: 'Workshop',
    organizer: 'NIT Trichy',
    location: 'Online',
    mode: 'Online',
    date: '12 Nov 2026',
    deadlineInDays: 9,
    skills: ['LLMs', 'PyTorch'],
    matchScore: 91,
    image: '/images/events/genai-bootcamp.jpg',
  },
  {
    id: '3',
    title: 'National Coding Cup 2026',
    category: 'Competition',
    organizer: 'Anna University',
    location: 'Chennai',
    mode: 'Hybrid',
    date: '05 Dec 2026',
    deadlineInDays: 14,
    skills: ['DSA', 'C++'],
    matchScore: 94,
    image: '/images/events/coding-cup.jpg',
  },
  {
    id: '4',
    title: 'Techfest Robotics League',
    category: 'Competition',
    organizer: 'IIT Bombay',
    location: 'Mumbai',
    mode: 'Offline',
    date: '18 Jan 2027',
    deadlineInDays: 25,
    skills: ['ROS', 'Embedded'],
    matchScore: 88,
    image: '/images/events/robotics.jpg',
  },
  {
    id: '5',
    title: 'Google Cloud & GenAI Fellowship 2026',
    category: 'Internship',
    organizer: 'Google Cloud Student Labs',
    location: 'Bangalore',
    mode: 'Hybrid',
    date: '01 Jun 2026',
    deadlineInDays: 30,
    skills: ['GCP', 'Vertex AI', 'Python'],
    matchScore: 97,
    image: '/images/events/internship.jpg',
  },
  {
    id: '6',
    title: 'National IEEE Student Research Conference',
    category: 'Conference',
    organizer: 'IISc Bangalore',
    location: 'Bangalore',
    mode: 'Offline',
    date: '22 Aug 2026',
    deadlineInDays: 45,
    skills: ['Research', 'IEEE', 'Paper Presentation'],
    matchScore: 85,
    image: '/images/events/conference.jpg',
  },
  {
    id: '8',
    title: 'Web3 & Solana Sovereign Hackathon',
    category: 'Hackathon',
    organizer: 'Superteam India',
    location: 'Bangalore',
    mode: 'Hybrid',
    date: '15 Jul 2026',
    deadlineInDays: 22,
    skills: ['Rust', 'Solana', 'Web3'],
    matchScore: 93,
    image: '/images/events/startup.jpg',
  },
];

function EventsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchParams.get('search') || '');
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'All');
  const [mode, setMode] = useState<string>(searchParams.get('mode') || 'All');
  const [date, setDate] = useState<string>(searchParams.get('date') || 'All Dates');
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'Recommended');
  const [location, setLocation] = useState<string>(searchParams.get('location') || 'All');

  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Synchronize state whenever URL query params change (e.g. user clicks Navbar links)
  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat) {
      const matched = categories.find(c =>
        c.toLowerCase() === urlCat.toLowerCase() ||
        c.toLowerCase().replace(/s$/, '') === urlCat.toLowerCase().replace(/s$/, '') ||
        (urlCat.toLowerCase() === 'robotics' && c === 'Competitions')
      );
      setCategory(matched || urlCat);
    } else {
      setCategory('All');
    }

    const urlSearch = searchParams.get('search');
    if (urlSearch !== null && urlSearch !== undefined) {
      setSearch(urlSearch);
      setDebouncedSearch(urlSearch);
    } else {
      setSearch('');
      setDebouncedSearch('');
    }

    const urlMode = searchParams.get('mode');
    setMode(urlMode || 'All');

    const urlDate = searchParams.get('date');
    setDate(urlDate || 'All Dates');

    const urlSort = searchParams.get('sort');
    setSort(urlSort || 'Recommended');

    const urlLoc = searchParams.get('location');
    setLocation(urlLoc || 'All');
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      const currentUrlSearch = searchParams.get('search') || '';
      if (search !== currentUrlSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (search) {
          params.set('search', search);
        } else {
          params.delete('search');
        }
        router.replace(params.toString() ? `/events?${params.toString()}` : '/events', { scroll: false });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [search, router, searchParams]);

  // Update query params helper
  const updateUrlParam = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== 'All' && val !== 'All Dates') {
      params.set(key, val);
    } else {
      params.delete(key);
    }
    router.push(params.toString() ? `/events?${params.toString()}` : '/events');
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    updateUrlParam('category', cat);
  };

  const handleModeChange = (val: string) => {
    setMode(val);
    updateUrlParam('mode', val);
  };

  const handleDateChange = (val: string) => {
    setDate(val);
    updateUrlParam('date', val);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    updateUrlParam('sort', val);
  };

  // Fetch events on filter/search change
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(false);
      try {
        const catQuery = category !== 'All' ? category : undefined;
        const apiRes = await eventsApi.getEvents({
          category: catQuery,
          search: debouncedSearch || undefined,
          mode: mode !== 'All' ? mode : undefined,
          location: location !== 'All' ? location : undefined,
        });

        if (Array.isArray(apiRes.data) && apiRes.data.length > 0) {
          const mapped: EventCardProps[] = apiRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            organizer: item.organizer || item.organization,
            location: item.location,
            mode: item.mode || 'Online',
            date: item.startDate || item.date || 'Upcoming',
            deadlineInDays: item.deadlineInDays ?? (item.registrationDeadline ? 7 : undefined),
            skills: item.skillsRequired || item.domainTags || item.skills || [],
            image: item.image || item.imageUrl || '/images/events/ai-hackathon.jpg',
            matchScore: item.matchScore || (item.category === 'Hackathon' ? 95 : 88)
          }));
          setEvents(mapped);
          setTotal(mapped.length);
        } else {
          throw new Error('Fallback');
        }
      } catch {
        // Fallback filtering using full dataset
        let filtered = fallbackEvents.map(e => ({ ...e }));
        
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          filtered = filtered.filter(
            e => (e.title || '').toLowerCase().includes(q) ||
                 (e.organizer || '').toLowerCase().includes(q) ||
                 (e.skills || []).some(s => s.toLowerCase().includes(q))
          );
        }

        if (category !== 'All') {
          const catNorm = category.toLowerCase().replace(/s$/, '');
          filtered = filtered.filter(e => {
            const eCat = (e.category || '').toLowerCase().replace(/s$/, '');
            const titleLower = (e.title || '').toLowerCase();
            return eCat.includes(catNorm) || catNorm.includes(eCat) ||
              (catNorm === 'symposium' && titleLower.includes('symposium')) ||
              (catNorm === 'competition' && (eCat.includes('compet') || titleLower.includes('robowars') || titleLower.includes('cup')));
          });
        }

        if (mode !== 'All') {
          filtered = filtered.filter(e => (e.mode || '').toLowerCase() === mode.toLowerCase());
        }

        if (location !== 'All') {
          filtered = filtered.filter(e => (e.location || '').toLowerCase().includes(location.toLowerCase()));
        }

        setEvents(filtered);
        setTotal(filtered.length);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [debouncedSearch, category, mode, date, sort, location]);

  // Filter Chip Management
  const activeFilters = [
    { key: 'search', label: debouncedSearch, value: debouncedSearch },
    { key: 'category', label: category, value: category },
    { key: 'mode', label: mode, value: mode },
    { key: 'date', label: date, value: date },
  ].filter(f => f.value && f.value !== 'All' && f.value !== 'All Dates' && f.value !== '');

  const clearFilter = (key: string) => {
    if (key === 'search') {
      setSearch('');
      setDebouncedSearch('');
      updateUrlParam('search', '');
    }
    if (key === 'category') {
      setCategory('All');
      updateUrlParam('category', 'All');
    }
    if (key === 'mode') {
      setMode('All');
      updateUrlParam('mode', 'All');
    }
    if (key === 'date') {
      setDate('All Dates');
      updateUrlParam('date', 'All Dates');
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setCategory('All');
    setMode('All');
    setDate('All Dates');
    router.push('/events');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle radial ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-b from-violet-100/40 via-violet-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-700">Verified Campus Ledger</span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-semibold text-violet-700">50,000+ Collegiate Builders</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] text-neutral-950 font-normal tracking-tight leading-[1.1] mb-3">
            Explore Opportunities, <br />
            <span className="font-editorial-italic font-normal">calmly cataloged.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 max-w-2xl font-normal leading-relaxed">
            Discover verified national hackathons, technical symposiums, research fellowships, and hands-on workshops across premier colleges in India.
          </p>
        </div>

        {/* Floating Pill Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event title, host college, domain, or skills (e.g. AI, IIT Madras, ROS)..."
            aria-label="Search events"
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

        {/* Filters Bar: Category Pills + Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          {/* Categories Pill Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0B0B0E] text-white shadow-xs'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-2xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Mode, Date, Sort Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            {/* Mode Filter */}
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
              aria-label="Filter by mode"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-neutral-200/80 text-neutral-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              {modes.map(m => <option key={m} value={m}>Mode: {m}</option>)}
            </select>

            {/* Date Filter */}
            <select
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              aria-label="Filter by date"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-neutral-200/80 text-neutral-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              {dates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort events"
                className="pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold bg-white border border-neutral-200/80 text-neutral-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer appearance-none"
              >
                {sorts.map(s => <option key={s} value={s}>Sort: {s}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-medium text-neutral-400">Active filters:</span>
            {activeFilters.map(f => (
              <button
                key={f.key}
                onClick={() => clearFilter(f.key)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold cursor-pointer hover:bg-violet-100 transition-colors"
              >
                <span>{f.label}</span>
                <X size={12} />
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 underline px-2 cursor-pointer transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Count Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200/80 text-xs font-semibold text-neutral-500">
          <span className="font-tabular">
            {loading ? 'Refreshing ledger...' : `${total} verified events found`}
          </span>
          <span className="text-[11px] text-neutral-400 font-normal">
            Updated live from campus ledger
          </span>
        </div>

        {/* Content States */}
        {error ? (
          <div className="card-diffusion p-16 rounded-3xl text-center bg-white">
            <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
            <h3 className="font-editorial text-2xl font-normal text-neutral-900 mb-2">Could not load campus ledger</h3>
            <p className="text-xs text-neutral-500 mb-6">An unexpected error occurred while communicating with the central registry.</p>
            <button onClick={() => { setError(false); setCategory(category); }} className="btn-ink-pill text-xs">
              Retry Connection
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-diffusion rounded-2xl overflow-hidden bg-white p-4 space-y-3 animate-pulse">
                <div className="aspect-video bg-neutral-100 rounded-xl" />
                <div className="h-4 bg-neutral-100 rounded w-3/4" />
                <div className="h-3 bg-neutral-100 rounded w-1/2" />
                <div className="h-8 bg-neutral-100 rounded-full mt-4" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="card-diffusion p-16 rounded-3xl text-center bg-white">
            <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-4">
              <Inbox size={22} />
            </div>
            <h3 className="font-editorial text-2xl font-normal text-neutral-900 mb-2">No matching events in ledger</h3>
            <p className="text-xs text-neutral-500 mb-6 max-w-sm mx-auto">
              We couldn&apos;t find opportunities matching your selected category or keywords. Try resetting your filters.
            </p>
            {activeFilters.length > 0 && (
              <button onClick={clearAllFilters} className="btn-ink-pill text-xs">
                Clear Active Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map(e => <EventCard key={e.id} {...e} />)}
          </div>
        )}

      </div>
    </div>
  );
}

export default function EventsCatalog() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card-diffusion rounded-2xl overflow-hidden bg-white p-4 space-y-3 animate-pulse">
              <div className="aspect-video bg-neutral-100 rounded-xl" />
              <div className="h-4 bg-neutral-100 rounded w-3/4" />
              <div className="h-3 bg-neutral-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    }>
      <EventsCatalogContent />
    </Suspense>
  );
}
