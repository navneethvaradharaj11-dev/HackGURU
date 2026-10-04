'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Trophy,
  Target,
  Briefcase,
  Calendar,
  Bell,
  Search,
  CheckCircle2,
  Building,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  Bookmark
} from 'lucide-react';

const CATEGORY_CHIPS = [
  { label: 'All Events', href: '/events', count: '10,000+' },
  { label: 'Hackathons', href: '/events?category=hackathon', count: '320+' },
  { label: 'Workshops', href: '/events?category=workshop', count: '1,200+' },
  { label: 'Internships', href: '/events?category=internship', count: '450+' },
  { label: 'Competitions', href: '/events?category=competition', count: '680+' },
  { label: 'Conferences', href: '/events?category=conference', count: '150+' },
];

const FEATURED_OPPORTUNITIES = [
  {
    id: 'ev-1',
    category: 'Hackathon',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
    title: 'IIT Bombay TechFest Hackathon 2026',
    org: 'IIT Bombay TechFest Team',
    location: 'Mumbai · Hybrid',
    deadline: 'Closes in 2 days',
    deadlineUrgent: true,
    prize: '₹3,50,000 Prize Pool',
    matchScore: 98,
    skills: ['Python', 'Generative AI', 'React', 'Robotics'],
  },
  {
    id: 'ev-2',
    category: 'Hackathon',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
    title: 'Smart India Hackathon (SIH) Regional Round',
    org: 'Ministry of Education Innovation Cell',
    location: 'Bengaluru · Offline',
    deadline: 'Closes in 8 days',
    deadlineUrgent: false,
    prize: 'Govt. Incubation Grants',
    matchScore: 94,
    skills: ['Smart Cities', 'Full Stack', 'Cloud'],
  },
  {
    id: 'ev-3',
    category: 'Workshop',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    title: 'Autonomous Agents & LLM Fine-Tuning Masterclass',
    org: 'HackGuru AI Academy',
    location: 'Online Webinar',
    deadline: 'Closes in 5 days',
    deadlineUrgent: false,
    prize: 'Certificate of Mastery',
    matchScore: 92,
    skills: ['PyTorch', 'QLoRA', 'vLLM', 'Agents'],
  },
  {
    id: 'ev-4',
    category: 'Internship',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    title: 'Deep Learning Fellowship & Research Internship',
    org: 'ACE Intelligence Labs',
    location: 'Bengaluru / Hybrid',
    deadline: 'Closes in 12 days',
    deadlineUrgent: false,
    prize: '₹25,000 / month Stipend',
    matchScore: 89,
    skills: ['Computer Vision', 'NLP', 'PyTorch'],
  },
];

const PLATFORM_PILLARS = [
  {
    icon: Target,
    title: 'Personalized AI Matching',
    desc: 'Match your exact branch, target job roles, and tech stack to verified opportunities with real match scoring.',
  },
  {
    icon: Bell,
    title: 'Deadline Calendar Sync',
    desc: 'Never miss registration cutoffs with automated alert notifications and Google Calendar export.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified College Events',
    desc: 'Direct listings from recognized university departments, IEEE branches, ACM chapters, and hackathon clubs.',
  },
  {
    icon: Briefcase,
    title: 'Verified Portfolio',
    desc: 'Log participation, team submissions, certificates, and achievements all in one student profile.',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/events');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="bg-white border-b border-gray-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India&apos;s Student Opportunity Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Discover College Events That{' '}
              <span className="text-violet-700">Advance Your Career</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find hackathons, technical workshops, internships, and university competitions across India — matched intelligently to your skills and aspirations.
            </p>

            {/* LinkedIn-style Search Box */}
            <form onSubmit={handleSearch} className="pt-2 max-w-xl mx-auto">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-violet-600 focus-within:border-violet-600 transition-all">
                <Search className="w-5 h-5 text-gray-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search events, colleges (e.g. IIT, BITS), or skills (e.g. AI, React)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs sm:text-sm shrink-0 transition-colors shadow-2xs"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Filter Chips */}
            <div className="pt-2 flex items-center justify-center gap-2 flex-wrap text-xs text-gray-600">
              <span className="text-gray-400 font-medium">Popular:</span>
              {CATEGORY_CHIPS.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                >
                  {chip.label}
                </Link>
              ))}
            </div>

          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">10,000+</p>
              <p className="text-xs text-gray-500 mt-0.5">Events Listed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-xs text-gray-500 mt-0.5">Partner Colleges</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">50,000+</p>
              <p className="text-xs text-gray-500 mt-0.5">Registered Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-700">98%</p>
              <p className="text-xs text-gray-500 mt-0.5">AI Match Precision</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MAIN 3-COLUMN OPPORTUNITY FEED ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: Category Navigator */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                Explore by Track
              </h2>
              <div className="space-y-1 text-xs">
                {CATEGORY_CHIPS.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                  >
                    <span>{cat.label}</span>
                    <span className="text-[11px] text-gray-400">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Callout */}
            <div className="bg-violet-50 rounded-lg border border-violet-200 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-violet-900">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span>Want Custom Recommendations?</span>
              </div>
              <p className="text-violet-800 text-[11px] leading-relaxed">
                Log in and let HackGuru rank opportunities according to your degree and target tech roles.
              </p>
              <Link
                href="/register"
                className="mt-2 block w-full text-center py-1.5 rounded bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
              >
                Set Up Profile
              </Link>
            </div>
          </aside>

          {/* CENTER FEED: Featured Opportunities */}
          <main className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Featured Opportunities
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Top-rated hackathons and bootcamps right now</p>
              </div>
              <Link href="/events" className="text-xs font-semibold text-violet-700 hover:underline">
                View All Events →
              </Link>
            </div>

            <div className="space-y-4">
              {FEATURED_OPPORTUNITIES.map((ev) => (
                <article
                  key={ev.id}
                  className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all space-y-3.5"
                >
                  {/* Top line */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-sm text-gray-700 shrink-0">
                        <Building className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-900 leading-tight">
                          {ev.org}
                        </h3>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{ev.location}</span>
                          <span>·</span>
                          <span className="text-emerald-700 font-medium">Verified College</span>
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold shrink-0">
                      {ev.matchScore}% Match
                    </span>
                  </div>

                  {/* Title & Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${ev.badgeClass}`}>
                        {ev.category}
                      </span>
                      <span className={`text-[11px] font-medium ${ev.deadlineUrgent ? 'text-red-600' : 'text-gray-500'}`}>
                        {ev.deadline}
                      </span>
                    </div>

                    <Link href={`/events/${ev.id}`}>
                      <h3 className="text-base font-bold text-gray-900 hover:text-violet-600 transition-colors leading-snug">
                        {ev.title}
                      </h3>
                    </Link>

                    {ev.prize && (
                      <p className="text-xs font-semibold text-emerald-700 mt-1">
                        🏆 {ev.prize}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ev.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[11px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => alert(`Saved ${ev.title} to your bookmarks!`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-600 font-medium transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/events/${ev.id}`}
                        className="px-3 py-1.5 rounded-md border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/events/${ev.id}`}
                        className="px-3.5 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors"
                      >
                        Apply / Register
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>

          {/* RIGHT SIDEBAR: Upcoming Deadlines & College Directory */}
          <aside className="lg:col-span-3 space-y-4">
            
            {/* Urgent Deadlines */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                Deadlines This Week
              </h3>
              <div className="space-y-3 text-xs">
                <div className="border-b border-gray-100 pb-2.5">
                  <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">2 Days Left</span>
                  <p className="font-semibold text-gray-900 mt-1 leading-snug">IIT Bombay TechFest Hackathon</p>
                  <p className="text-[11px] text-gray-500">Mumbai · Hybrid</p>
                </div>
                <div className="border-b border-gray-100 pb-2.5">
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">5 Days Left</span>
                  <p className="font-semibold text-gray-900 mt-1 leading-snug">Autonomous Agents Masterclass</p>
                  <p className="text-[11px] text-gray-500">Online Webinar</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">8 Days Left</span>
                  <p className="font-semibold text-gray-900 mt-1 leading-snug">Smart India Hackathon Regional</p>
                  <p className="text-[11px] text-gray-500">Bengaluru · Offline</p>
                </div>
              </div>
            </div>

            {/* Why AllCollegeEvent */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-3 text-xs">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Why AllCollegeEvent?
              </h3>
              {PLATFORM_PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded bg-violet-50 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 leading-snug">{p.title}</p>
                      <p className="text-[11px] text-gray-500 leading-normal mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </aside>

        </div>
      </div>

    </div>
  );
}
