'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal, AlertCircle, Inbox, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import { eventsApi } from '@/lib/api';

const categories = ['All', 'Hackathons', 'Workshops', 'Competitions', 'Internships', 'Conferences', 'Webinars'];
const modes = ['All', 'Online', 'Offline', 'Hybrid'];
const dates = ['All Dates', 'Today', 'This Week', 'This Month', 'Upcoming'];
const sorts = ['Recommended', 'Soonest Deadline', 'Latest Added', 'Most Popular'];

const fallbackEvents: EventCardProps[] = [
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
    skills: ['LLMs'],
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

  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Sync state to URL
  const updateUrl = useCallback((newState: { debouncedSearch: string; category: string; mode: string; date: string; sort: string }) => {
    const params = new URLSearchParams();
    if (newState.debouncedSearch) params.set('search', newState.debouncedSearch);
    if (newState.category && newState.category !== 'All') params.set('category', newState.category);
    if (newState.mode && newState.mode !== 'All') params.set('mode', newState.mode);
    if (newState.date && newState.date !== 'All Dates') params.set('date', newState.date);
    if (newState.sort && newState.sort !== 'Recommended') params.set('sort', newState.sort);

    const queryStr = params.toString();
    const targetUrl = queryStr ? `/events?${queryStr}` : '/events';
    router.replace(targetUrl, { scroll: false });
  }, [router]);

  useEffect(() => {
    updateUrl({ debouncedSearch, category, mode, date, sort });
  }, [debouncedSearch, category, mode, date, sort, updateUrl]);

  // Fetch events on filter/search change
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(false);
      try {
        // Try real API first
        const apiRes = await eventsApi.getEvents({
          category: category !== 'All' ? category : undefined,
          search: debouncedSearch || undefined,
        });

        if (Array.isArray(apiRes.data) && apiRes.data.length > 0) {
          const mapped: EventCardProps[] = apiRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            organizer: item.organizer,
            location: item.location,
            mode: item.mode || 'Online',
            date: item.startDate || 'Upcoming',
            deadlineInDays: item.registrationDeadline ? 7 : undefined,
            skills: item.skillsRequired || item.domainTags || [],
          }));
          setEvents(mapped);
          setTotal(mapped.length);
        } else {
          throw new Error('Fallback');
        }
      } catch {
        // Fallback filtering
        let filtered = [...fallbackEvents];
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          filtered = filtered.filter(
            e => (e.title || '').toLowerCase().includes(q) ||
                 (e.organizer || '').toLowerCase().includes(q) ||
                 (e.skills || []).some(s => s.toLowerCase().includes(q))
          );
        }
        if (category !== 'All') {
          filtered = filtered.filter(e => {
            const catNorm = (e.category || '').toLowerCase();
            const filterNorm = category.toLowerCase();
            return catNorm === filterNorm || catNorm.includes(filterNorm.replace(/s$/, ''));
          });
        }
        if (mode !== 'All') {
          filtered = filtered.filter(e => (e.mode || '').toLowerCase() === mode.toLowerCase());
        }
        setEvents(filtered);
        setTotal(filtered.length);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [debouncedSearch, category, mode, date, sort]);

  // Filter Chip Management
  const activeFilters = [
    { key: 'search', label: debouncedSearch, value: debouncedSearch },
    { key: 'category', label: category, value: category },
    { key: 'mode', label: mode, value: mode },
    { key: 'date', label: date, value: date },
  ].filter(f => f.value && f.value !== 'All' && f.value !== 'All Dates' && f.value !== '');

  const clearFilter = (key: string) => {
    if (key === 'search') setSearch('');
    if (key === 'category') setCategory('All');
    if (key === 'mode') setMode('All');
    if (key === 'date') setDate('All Dates');
  };

  const clearAllFilters = () => {
    setSearch('');
    setCategory('All');
    setMode('All');
    setDate('All Dates');
  };

  return (
    <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--container, 1200px)', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: 'var(--fs-h1, 36px)', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
            Explore Events
          </h1>
          <p style={{ color: 'var(--text-secondary, #52525B)', marginTop: '8px', fontSize: '17px' }}>
            Discover hackathons, workshops, competitions, internships and other opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, colleges, skills..."
            aria-label="Search events"
            style={{
              width: '100%',
              padding: '14px 48px 14px 48px',
              border: '1px solid var(--border-soft)',
              borderRadius: 'var(--r-md)',
              fontSize: '15px',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              outline: 'none',
              boxShadow: 'var(--shadow-xs)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              fontFamily: 'inherit',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
          {/* Categories - Compact on mobile, inline on desktop */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', flex: 1, minWidth: 250 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={chipStyle(category === cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Mode Filter */}
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value)}
              style={selectStyle}
              aria-label="Filter by mode"
            >
              {modes.map(m => <option key={m} value={m}>Mode: {m}</option>)}
            </select>

            {/* Date Filter */}
            <select 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              style={selectStyle}
              aria-label="Filter by date"
            >
              {dates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Sort */}
            <div style={{ position: 'relative' }}>
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                style={{ ...selectStyle, paddingRight: '36px' }}
                aria-label="Sort events"
              >
                {sorts.map(s => <option key={s} value={s}>Sort: {s}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Filters:</span>
            {activeFilters.map(f => (
              <button
                key={f.key}
                onClick={() => clearFilter(f.key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: 'var(--r-pill)',
                  border: '1px solid var(--violet-200)',
                  background: 'var(--violet-50)',
                  color: 'var(--violet-700)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {f.label} <X size={12} />
              </button>
            ))}
            <button onClick={clearAllFilters} style={clearAllBtnStyle}>
              Clear all
            </button>
          </div>
        )}

        {/* Result Count */}
        <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-soft)', paddingBottom: '16px' }}>
          {loading ? (
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading events...</span>
          ) : (
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
              {total} events found
            </span>
          )}
        </div>

        {/* Content States */}
        {error ? (
          <ErrorState onRetry={() => { setError(false); setCategory(category); }} />
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : events.length === 0 ? (
          <EmptyState onClear={clearAllFilters} hasFilters={activeFilters.length > 0} />
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
      <div style={{ maxWidth: 'var(--container, 1200px)', margin: '0 auto', padding: '40px 24px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    }>
      <EventsCatalogContent />
    </Suspense>
  );
}

// --- STYLES & SUBCOMPONENTS ---

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '24px',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 'var(--r-pill, 999px)',
  border: '1px solid var(--border-soft, #E4E4E7)',
  background: 'var(--bg-card, #FFFFFF)',
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--text-secondary, #52525B)',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  fontFamily: 'inherit',
  boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(16,16,24,0.04))',
};

const chipStyle = (active: boolean): React.CSSProperties => active
  ? { padding: '8px 14px', borderRadius: 'var(--r-pill, 999px)', background: 'var(--violet-600, #6D28D9)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }
  : { padding: '8px 14px', borderRadius: 'var(--r-pill, 999px)', background: 'var(--bg-card, #FFFFFF)', color: 'var(--text-secondary, #52525B)', border: '1px solid var(--border-soft, #E4E4E7)', fontWeight: 500, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' };

const clearAllBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--violet-600, #6D28D9)',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  padding: '4px 8px',
  textDecoration: 'underline',
};

const SkeletonCard = () => (
  <div style={{ background: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-lg, 16px)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
    <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#F4F4F5', animation: 'pulse 1.5s infinite ease-in-out' }} />
    <div style={{ padding: '16px' }}>
      <div style={{ height: '16px', width: '80%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s infinite ease-in-out' }} />
      <div style={{ height: '12px', width: '50%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '16px', animation: 'pulse 1.5s infinite ease-in-out' }} />
      <div style={{ height: '12px', width: '60%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '24px', animation: 'pulse 1.5s infinite ease-in-out' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ height: '32px', width: '60px', background: '#F4F4F5', borderRadius: '8px' }} />
        <div style={{ height: '32px', flex: 1, background: '#F4F4F5', borderRadius: '8px' }} />
      </div>
    </div>
  </div>
);

const EmptyState = ({ onClear, hasFilters }: { onClear: () => void; hasFilters: boolean }) => (
  <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-lg, 16px)' }}>
    <Inbox size={48} color="var(--violet-600, #6D28D9)" style={{ marginBottom: '16px' }} />
    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>No events found</h3>
    <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px' }}>Try changing your search or removing some filters.</p>
    {hasFilters && <Button variant="primary" onClick={onClear}>Clear Filters</Button>}
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-lg, 16px)' }}>
    <AlertCircle size={48} color="var(--error, #DC2626)" style={{ marginBottom: '16px' }} />
    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>We couldn&apos;t load the events.</h3>
    <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px' }}>An unexpected error occurred. Please try again.</p>
    <Button variant="primary" onClick={onRetry}>Try Again</Button>
  </div>
);
