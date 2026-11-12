'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Clock, MapPin, Monitor, Users, DollarSign,
  Bookmark, Share2, AlertCircle, Building2, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import { mockEvents } from '@/data/mock/events';

// --- PRESERVE EXISTING EVENT SERVICE INTEGRATION ---
// In the real repository, replace this with the actual `eventsService.getById()` and `eventsService.getRelated()` calls.
export interface EventDetails extends EventCardProps {
  description?: string;
  time?: string;
  eligibility?: string;
  fee?: string;
  teamSize?: string;
  registrationDeadline?: string;
  organizerDescription?: string;
  status?: 'open' | 'closing-soon' | 'closed' | 'completed';
}

const mockDbEvents: Record<string, EventDetails> = {
  '1': {
    id: '1',
    title: 'AI Innovation Challenge 2026',
    category: 'Hackathon',
    organizer: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    mode: 'Offline',
    date: '26 Oct 2026',
    time: '09:00 AM IST',
    deadlineInDays: 3,
    skills: ['Python', 'AI', 'Machine Learning', 'Data Science'],
    image: '/images/events/ai-hackathon.jpg',
    description: 'Join the premier AI hackathon where innovation meets excellence. This 48-hour challenge brings together the brightest minds to build cutting-edge AI solutions. Participate in workshops, network with industry leaders, and compete for exciting prizes.',
    eligibility: 'Open to all undergraduate and postgraduate students',
    fee: 'Free',
    registrationDeadline: '23 Oct 2026',
    organizerDescription: 'IIT Bombay is a leading institution known for its excellence in technical education and innovation.',
    status: 'closing-soon'
  },
  '2': {
    id: '2',
    title: 'GenAI Bootcamp',
    category: 'Workshop',
    organizer: 'NIT Trichy',
    location: 'Online',
    mode: 'Online',
    date: '12 Nov 2026',
    time: '10:00 AM IST',
    deadlineInDays: 9,
    skills: ['LLMs', 'PyTorch'],
    image: '/images/events/genai-bootcamp.jpg',
    description: 'Master large language models, prompt engineering, and fine-tuning with industry experts in this comprehensive hands-on bootcamp.',
    eligibility: 'Open to all students and early researchers',
    fee: 'Free',
    registrationDeadline: '05 Nov 2026',
    organizerDescription: 'NIT Trichy Developer Student Community',
    status: 'open'
  },
  '3': {
    id: '3',
    title: 'National Coding Cup',
    category: 'Competition',
    organizer: 'Anna University',
    location: 'Chennai',
    mode: 'Hybrid',
    date: '05 Dec 2026',
    time: '02:00 PM IST',
    deadlineInDays: 14,
    skills: ['DSA', 'C++'],
    image: '/images/events/coding-cup.jpg',
    description: 'Compete with the top algorithmic programmers across colleges in India for exciting prizes and corporate sponsorship.',
    eligibility: 'College students from accredited institutions',
    fee: '₹100 / team',
    registrationDeadline: '25 Nov 2026',
    organizerDescription: 'Anna University Coding & Competitive Programming Society',
    status: 'open'
  }
};

const fetchEventDetails = async (id: string): Promise<EventDetails | null> => {
  // 1. Try real API endpoint first
  try {
    const res = await fetch(`/api/events/${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.data) {
        return data.data;
      }
    }
  } catch {}

  // 2. Check direct mock DB
  if (mockDbEvents[id]) {
    return mockDbEvents[id];
  }

  // 3. Check mockEvents array
  const cleanId = id.toLowerCase();
  const foundInMock = mockEvents.find(e => e.id.toLowerCase() === cleanId || e.id.toLowerCase().includes(cleanId));
  if (foundInMock) {
    const categoryCapitalized = foundInMock.category.charAt(0).toUpperCase() + foundInMock.category.slice(1);
    const modeCapitalized = (foundInMock.mode.charAt(0).toUpperCase() + foundInMock.mode.slice(1)) as 'Online' | 'Offline' | 'Hybrid';
    return {
      id: foundInMock.id,
      title: foundInMock.title,
      category: categoryCapitalized,
      organizer: foundInMock.organization,
      location: foundInMock.location,
      mode: modeCapitalized,
      date: foundInMock.startDate,
      time: '09:30 AM IST',
      deadlineInDays: 5,
      skills: foundInMock.skills,
      image: foundInMock.imageUrl || '/images/events/ai-hackathon.jpg',
      description: foundInMock.description,
      eligibility: foundInMock.eligibility?.[0] || 'Open to all undergraduate and postgraduate students',
      fee: 'Free',
      registrationDeadline: foundInMock.deadline,
      organizerDescription: `${foundInMock.organization} is a premier educational and research partner recognized for advancing technical excellence.`,
      status: 'open'
    };
  }

  return null;
};

const fetchRelatedEvents = async (id: string): Promise<EventCardProps[]> => {
  await new Promise((res) => setTimeout(res, 300));
  const defaultRelated: EventCardProps[] = [
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
      image: '/images/events/genai-bootcamp.jpg'
    },
    {
      id: '3',
      title: 'National Coding Cup',
      category: 'Competition',
      organizer: 'Anna University',
      location: 'Chennai',
      mode: 'Hybrid',
      date: '05 Dec 2026',
      deadlineInDays: 14,
      skills: ['DSA', 'C++'],
      image: '/images/events/coding-cup.jpg'
    },
  ];

  return defaultRelated.filter(e => e.id !== id);
};

export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const eventData = await fetchEventDetails(id);
        if (!eventData) {
          if (isMounted) setError(true);
          return;
        }
        if (isMounted) {
          setEvent(eventData);
          const related = await fetchRelatedEvents(id);
          setRelatedEvents(related);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-neutral-200 rounded-full w-32" />
          <div className="aspect-[21/9] bg-neutral-200 rounded-3xl" />
          <div className="h-10 bg-neutral-200 rounded-xl w-2/3" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64 bg-neutral-200 rounded-2xl" />
            <div className="h-64 bg-neutral-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
        <div className="card-diffusion rounded-3xl p-12 text-center max-w-md mx-auto bg-white">
          <AlertCircle size={44} className="text-red-500 mx-auto mb-4" />
          <h2 className="font-editorial text-2xl font-normal text-neutral-900 mb-2">Event Not Found</h2>
          <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
            The event listing may have been moved or is no longer accessible on the campus ledger.
          </p>
          <Link href="/events" className="btn-ink-pill text-xs py-2.5 px-6">
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = event.image || '/images/events/ai-hackathon.jpg';

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle radial ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-b from-violet-100/40 via-violet-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 px-4 py-2 rounded-full bg-white border border-neutral-200/90 shadow-2xs hover:bg-neutral-50 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Ledger
          </Link>
        </div>

        {/* Hero Card */}
        <div className="card-diffusion rounded-3xl p-6 sm:p-8 bg-white mb-8 overflow-hidden">
          {/* Hero Banner Image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-900 mb-6">
            <img
              src={heroImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0B0B0E] text-xs font-bold shadow-xs">
                {event.category}
              </span>
              {event.prize && (
                <span className="px-3.5 py-1 rounded-full bg-violet-600 text-white text-xs font-bold shadow-xs">
                  {event.prize}
                </span>
              )}
            </div>
          </div>

          {/* Event Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Opportunity
              </span>
              {event.deadlineInDays !== undefined && event.deadlineInDays <= 7 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/70">
                  <Clock size={12} className="text-amber-600" />
                  Registration closes in {event.deadlineInDays} days
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] font-normal text-neutral-950 tracking-tight leading-[1.12] mb-3">
              {event.title}
            </h1>

            <p className="text-sm font-semibold text-neutral-500 mb-6 flex items-center gap-2">
              <Building2 size={16} className="text-violet-600" />
              <span>{event.organizer}</span>
            </p>

            {/* Quick Specs Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 mb-6 font-tabular">
              {event.date && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-violet-600 shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Date</span>
                    <span className="text-xs font-bold text-neutral-800">{event.date}</span>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-violet-600 shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Location</span>
                    <span className="text-xs font-bold text-neutral-800 truncate block max-w-[130px]">{event.location}</span>
                  </div>
                </div>
              )}

              {event.mode && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-violet-600 shrink-0">
                    <Monitor size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Format</span>
                    <span className="text-xs font-bold text-neutral-800">{event.mode}</span>
                  </div>
                </div>
              )}

              {event.fee && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-violet-600 shrink-0">
                    <DollarSign size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Entry Fee</span>
                    <span className="text-xs font-bold text-neutral-800">{event.fee}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-violet-pill text-xs py-3 px-7 shadow-md">
                Register on Campus Ledger
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  saved
                    ? 'bg-violet-50 border-violet-300 text-violet-700'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Bookmark size={14} className={saved ? 'fill-violet-600' : ''} />
                <span>{saved ? 'Saved in Ledger' : 'Save Event'}</span>
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-all cursor-pointer">
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* About */}
            {event.description && (
              <div className="card-diffusion rounded-2xl p-6 sm:p-8 bg-white">
                <h3 className="text-base font-bold text-neutral-900 mb-3 pb-3 border-b border-neutral-100">
                  About this Opportunity
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            )}

            {/* Eligibility & Requirements */}
            {event.eligibility && (
              <div className="card-diffusion rounded-2xl p-6 sm:p-8 bg-white">
                <h3 className="text-base font-bold text-neutral-900 mb-3 pb-3 border-b border-neutral-100">
                  Eligibility & Team Rails
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {event.eligibility}
                </p>
              </div>
            )}

            {/* Skills & Domain Tags */}
            {event.skills && event.skills.length > 0 && (
              <div className="card-diffusion rounded-2xl p-6 sm:p-8 bg-white">
                <h3 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-100">
                  Required Competencies & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.skills.map(s => (
                    <span
                      key={s}
                      className="px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Profile */}
            <div className="card-diffusion rounded-2xl p-6 sm:p-8 bg-white">
              <h3 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-100">
                Host Institution
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0B0B0E] text-white flex items-center justify-center font-bold text-base shrink-0">
                  {(event.organizer || 'College Host').charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900 mb-1">
                    {event.organizer}
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {event.organizerDescription || 'Recognized collegiate technical institution actively indexing opportunities on the AllCollegeEvent student ledger.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="card-diffusion rounded-2xl p-6 bg-white sticky top-24 space-y-5">
              <h4 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100">
                Registration Summary
              </h4>

              <div className="space-y-3 font-tabular text-xs">
                <div className="flex justify-between items-center text-neutral-600">
                  <span>Registration Status:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {event.status === 'closing-soon' ? 'Closing Soon' : 'Open'}
                  </span>
                </div>

                {event.registrationDeadline && (
                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Deadline:</span>
                    <span className="font-semibold text-neutral-900">{event.registrationDeadline}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-neutral-600">
                  <span>Entry Fee:</span>
                  <span className="font-bold text-neutral-900">{event.fee || 'Free'}</span>
                </div>

                {event.teamSize && (
                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Team Composition:</span>
                    <span className="font-semibold text-neutral-900">{event.teamSize}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button className="btn-violet-pill w-full text-xs py-3 font-bold shadow-md">
                  Register for Event
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-400 text-center">
                Secured by AllCollegeEvent Student Network
              </div>
            </div>
          </div>

        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="pt-8 border-t border-neutral-200/80">
            <div className="mb-6">
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 mb-1">
                More Opportunities <span className="font-editorial-italic font-normal">in this track</span>
              </h3>
              <p className="text-xs text-neutral-500 font-normal">Related collegiate events you might be interested in</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map(e => <EventCard key={e.id} {...e} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
