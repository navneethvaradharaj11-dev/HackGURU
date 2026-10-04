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
    image: 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1559628233-1c7e7c6b3e9b?auto=format&fit=crop&w=800&q=80',
    description: 'Compete with the top algorithmic programmers across colleges in India for exciting prizes and corporate sponsorship.',
    eligibility: 'College students from accredited institutions',
    fee: '₹100 / team',
    registrationDeadline: '25 Nov 2026',
    organizerDescription: 'Anna University Coding & Competitive Programming Society',
    status: 'open'
  }
};

const fetchEventDetails = async (id: string): Promise<EventDetails | null> => {
  await new Promise((res) => setTimeout(res, 400));
  
  // 1. Check direct mock DB
  if (mockDbEvents[id]) {
    return mockDbEvents[id];
  }

  // 2. Check mockEvents array
  const foundInMock = mockEvents.find(e => e.id === id);
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
      image: 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=1200&q=80',
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
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1559628233-1c7e7c6b3e9b?auto=format&fit=crop&w=800&q=80'
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

  if (loading) return <SkeletonLayout />;
  if (error || !event) return <ErrorState />;

  const heroImage = event.image || 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=1200&q=80';

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '24px 24px 64px' }}>
        
        {/* Back Navigation */}
        <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Back to Events
        </Link>

        {/* Event Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginBottom: '48px' }}>
          {/* Hero Image */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '21 / 9', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img src={heroImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <Badge tone="violet">{event.category}</Badge>
            </div>
          </div>

          {/* Event Header Info */}
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 8px' }}>
              {event.title}
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: 500, margin: '0 0 20px' }}>
              {event.organizer}
            </p>

            {/* Quick Info Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
              {event.date && <InfoItem icon={<Calendar size={16} />} label="Date" value={event.date} />}
              {event.location && <InfoItem icon={<MapPin size={16} />} label="Location" value={event.location} />}
              {event.mode && <InfoItem icon={<Monitor size={16} />} label="Mode" value={event.mode} />}
              {event.time && <InfoItem icon={<Clock size={16} />} label="Time" value={event.time} />}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {event.status === 'closed' || event.status === 'completed' ? (
                <Button variant="outline" size="lg" disabled>
                  {event.status === 'completed' ? 'Event Completed' : 'Registration Closed'}
                </Button>
              ) : (
                <Button variant="primary" size="lg">Register Now</Button>
              )}
              <Button 
                variant="outline" 
                size="lg" 
                leftIcon={<Bookmark size={16} />} 
                onClick={() => setSaved(!saved)}
              >
                {saved ? 'Saved' : 'Save Event'}
              </Button>
              <Button variant="ghost" size="lg" leftIcon={<Share2 size={16} />}>Share</Button>
            </div>

            {/* Status Badge */}
            {event.status === 'closing-soon' && (
              <div style={{ marginTop: '16px' }}>
                <Badge tone="warning">⏰ Registration closes in {event.deadlineInDays} days</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '64px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* About Section */}
            {event.description && (
              <Section title="About this Event">
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  {event.description}
                </p>
              </Section>
            )}

            {/* Event Details */}
            <Section title="Event Details">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {event.date && <DetailRow icon={<Calendar size={16} />} label="Date" value={event.date} />}
                {event.time && <DetailRow icon={<Clock size={16} />} label="Time" value={event.time} />}
                {event.location && <DetailRow icon={<MapPin size={16} />} label="Venue" value={event.location} />}
                {event.mode && <DetailRow icon={<Monitor size={16} />} label="Mode" value={event.mode} />}
                {event.eligibility && <DetailRow icon={<Users size={16} />} label="Eligibility" value={event.eligibility} />}
                {event.fee && <DetailRow icon={<DollarSign size={16} />} label="Fee" value={event.fee} />}
              </div>
            </Section>

            {/* Skills */}
            {event.skills && event.skills.length > 0 && (
              <Section title="Skills / Tags">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {event.skills.map(skill => <Badge key={skill} tone="gray">{skill}</Badge>)}
                </div>
              </Section>
            )}

            {/* Organizer */}
            <Section title="Organized by">
              <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--violet-50)', color: 'var(--violet-600)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>{event.organizer}</h3>
                  {event.organizerDescription && (
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px' }}>{event.organizerDescription}</p>
                  )}
                </div>
              </div>
            </Section>
          </div>

          {/* Right Sidebar */}
          <div>
            <Card style={{ padding: '24px', position: 'sticky', top: '88px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 20px' }}>Registration</h3>
              
              {event.registrationDeadline && (
                <div style={{ marginBottom: '20px', padding: '12px', background: event.status === 'closing-soon' ? '#FFFBEB' : 'var(--violet-50)', borderRadius: '10px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 4px', fontWeight: 600 }}>Registration Deadline</p>
                  <p style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: event.status === 'closing-soon' ? 'var(--warning)' : 'var(--violet-700)' }}>
                    {event.registrationDeadline}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {event.status === 'closed' || event.status === 'completed' ? (
                  <Button variant="outline" fullWidth disabled>
                    {event.status === 'completed' ? 'Event Completed' : 'Registration Closed'}
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" fullWidth>Register Now</Button>
                )}
                <Button variant="outline" fullWidth onClick={() => setSaved(!saved)} leftIcon={<Bookmark size={16} />}>
                  {saved ? 'Saved' : 'Save Event'}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <Section title="Related Events">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {relatedEvents.map(e => <EventCard key={e.id} {...e} />)}
            </div>
          </Section>
        )}
      </div>

      {/* Responsive Override */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// --- SUBCOMPONENTS & STYLES ---

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-soft)' }}>
      {title}
    </h2>
    {children}
  </div>
);

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ color: 'var(--violet-600)' }}>{icon}</span>
      <div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>{label}</span>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>{value}</span>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
      <span style={{ color: 'var(--violet-600)', marginTop: '2px' }}>{icon}</span>
      <div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>{value}</p>
      </div>
    </div>
  );
};

const SkeletonLayout = () => (
  <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
    <div className="container" style={{ padding: '24px 24px 64px' }}>
      <div style={{ height: '20px', width: '120px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '24px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ aspectRatio: '21/9', background: '#F4F4F5', borderRadius: 'var(--r-lg)', marginBottom: '32px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '32px', width: '60%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '16px', width: '40%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '32px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div>
          <div style={{ height: '20px', width: '150px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '16px', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: '12px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: '12px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
          <div style={{ height: '12px', width: '80%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
        </div>
        <div style={{ background: '#F4F4F5', borderRadius: 'var(--r-lg)', height: '200px', animation: 'pulse 1.5s infinite' }} />
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div style={{ background: 'var(--bg-page)', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <AlertCircle size={48} color="var(--error)" style={{ marginBottom: '16px' }} />
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>Event not found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>The event may have been removed or is no longer available.</p>
      <Link href="/events">
        <Button variant="primary">Back to Events</Button>
      </Link>
    </div>
  </div>
);
