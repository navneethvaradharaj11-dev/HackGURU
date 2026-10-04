'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import EventCard from '@/components/events/EventCard';
import Button from '@/components/ui/Button';
import { mockEvents } from '@/data/mock/events';
import { Search, SlidersHorizontal, MapPin, Calendar, Building, Sparkles } from 'lucide-react';

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

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'date' | 'relevance'>('relevance');

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
      events = events.filter(e => e.category === selectedCategory);
    }

    if (selectedMode !== 'all') {
      events = events.filter(e => e.mode === selectedMode);
    }

    if (sortBy === 'deadline') {
      events.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else if (sortBy === 'date') {
      events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    return events;
  }, [search, selectedCategory, selectedMode, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Explore College Opportunities
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Discover verified hackathons, internships, bootcamps and competitions across Indian universities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/recommendations" className="px-4 py-2 rounded-md bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition-colors flex items-center gap-1.5 border border-violet-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Matches</span>
          </Link>
          <Link href="/events" className="px-4 py-2 rounded-md bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors shadow-2xs">
            Catalog View
          </Link>
        </div>
      </div>

      {/* Search and Filters Bar (LinkedIn Style) */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by event title, host college, or technology (e.g. AI, React, BITS)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
          />
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-100 text-xs">
          {/* Categories Pill row */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white font-semibold shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Mode dropdown */}
            <select
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
              className="text-xs border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer"
            >
              {modes.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="deadline">Soonest Deadline</option>
              <option value="date">Upcoming Date</option>
            </select>

            <span className="text-[11px] text-gray-500 font-medium pl-2 hidden sm:inline">
              {filtered.length} listings
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(event => (
            <EventCard
              key={event.id}
              event={event}
              variant={event.featured ? 'featured' : 'default'}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
          <p className="text-2xl mb-2">🔍</p>
          <h3 className="text-sm font-semibold text-gray-800">No matching events found</h3>
          <p className="text-xs text-gray-500 mt-1">Try modifying your search or clearing active filters.</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('all'); setSelectedMode('all'); }}
            className="mt-4 px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
