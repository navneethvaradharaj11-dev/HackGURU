'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, Bookmark, History, AlertCircle, Inbox, 
  Search, LogIn, Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import { useAuth } from '@/contexts/AuthContext';

// --- PRESERVE EXISTING EVENT ACTIVITY INTEGRATION ---
// In the real repository, replace these mocks with:
// - registrationService.getRegisteredEvents(userId)
// - savedEventsService.getSavedEvents(userId)
// - eventsService.getPastEvents(userId)
type EventTab = 'registered' | 'saved' | 'past';

const fetchMyEvents = async (userId: string, tab: EventTab): Promise<EventCardProps[]> => {
  await new Promise((res) => setTimeout(res, 500)); // Simulate network
  
  const mockEvents: EventCardProps[] = [
    {
      id: '1', title: 'AI Innovation Challenge 2026', category: 'Hackathon', organizer: 'IIT Bombay',
      location: 'Mumbai', mode: 'Offline', date: '26 Oct 2026', deadlineInDays: 3,
      skills: ['Python', 'AI'], matchScore: 94, saved: true,
      image: 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2', title: 'GenAI Bootcamp', category: 'Workshop', organizer: 'NIT Trichy',
      location: 'Online', mode: 'Online', date: '12 Nov 2026', deadlineInDays: 9,
      skills: ['LLMs', 'PyTorch'], saved: false,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3', title: 'National Coding Cup 2025', category: 'Competition', organizer: 'Anna University',
      location: 'Chennai', mode: 'Offline', date: '15 May 2025', deadlineInDays: -150, // Past event
      skills: ['DSA', 'C++'], saved: false,
      image: 'https://images.unsplash.com/photo-1559628233-1c7e7c6b3e9b?auto=format&fit=crop&w=800&q=80'
    },
  ];

  // Filter based on tab to simulate backend filtering
  if (tab === 'registered') return [mockEvents[0], mockEvents[1]]; // Assume user registered for upcoming ones
  if (tab === 'saved') return [mockEvents[0]]; // Assume user saved the first one
  if (tab === 'past') return [mockEvents[2]]; // Assume the 2025 event is past
  
  return [];
};

export default function MyEventsPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<EventTab>('registered');
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const loadEvents = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchMyEvents(user.id || 'current-user', activeTab);
        if (isMounted) setEvents(data);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, activeTab]);

  // Loading while auth state initializes
  if (authLoading) return <SkeletonLayout />;

  // Unauthenticated State
  if (!user) return <UnauthenticatedState />;

  return (
    <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 24px 64px', maxWidth: 'var(--container, 1200px)', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: 'var(--fs-h1, 32px)', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
            My Events
          </h1>
          <p style={{ color: 'var(--text-secondary, #52525B)', marginTop: '8px', fontSize: '17px' }}>
            Keep track of the opportunities you&apos;ve registered for and saved.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--border-soft, #E4E4E7)' }}>
          <TabButton 
            active={activeTab === 'registered'} 
            onClick={() => setActiveTab('registered')}
            icon={<CalendarCheck size={16} />}
            label="Registered"
          />
          <TabButton 
            active={activeTab === 'saved'} 
            onClick={() => setActiveTab('saved')}
            icon={<Bookmark size={16} />}
            label="Saved"
          />
          <TabButton 
            active={activeTab === 'past'} 
            onClick={() => setActiveTab('past')}
            icon={<History size={16} />}
            label="Past"
          />
        </div>

        {/* Content Area */}
        {error ? (
          <ErrorState onRetry={() => { setError(false); setEvents([]); }} />
        ) : loading ? (
          <div style={gridStyle}>
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : events.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div style={gridStyle}>
            {events.map(e => (
              <EventCard key={e.id} {...e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS & STYLES ---

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '24px',
};

const TabButton = ({ active, onClick, icon, label }: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string 
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      background: 'transparent',
      border: 'none',
      borderBottom: active ? '2px solid var(--violet-600, #6D28D9)' : '2px solid transparent',
      color: active ? 'var(--violet-600, #6D28D9)' : 'var(--text-secondary, #52525B)',
      fontWeight: 600,
      fontSize: '15px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      marginBottom: '-1px', // Align with border
    }}
  >
    {icon} {label}
  </button>
);

const SkeletonCard = () => (
  <div style={{ background: 'var(--bg-card, #FFFFFF)', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-lg, 16px)', overflow: 'hidden', boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(16,16,24,0.04))' }}>
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

const SkeletonLayout = () => (
  <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh' }}>
    <div className="container" style={{ padding: '40px 24px 64px', maxWidth: 'var(--container, 1200px)', margin: '0 auto' }}>
      <div style={{ height: '32px', width: '150px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '20px', width: '300px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '32px', animation: 'pulse 1.5s infinite' }} />
      <div style={gridStyle}>
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  </div>
);

const EmptyState = ({ tab }: { tab: EventTab }) => {
  const config = {
    registered: {
      icon: <CalendarCheck size={48} />,
      title: "You haven't registered for any events yet.",
      subtitle: "Discover opportunities and find your next event."
    },
    saved: {
      icon: <Bookmark size={48} />,
      title: "No saved events yet.",
      subtitle: "Bookmark events you want to come back to later."
    },
    past: {
      icon: <History size={48} />,
      title: "No past events yet.",
      subtitle: "Events you've attended will appear here."
    }
  };
  
  const c = config[tab];
  
  return (
    <Card style={{ padding: '64px 24px', textAlign: 'center', margin: '0 auto', maxWidth: '500px' }}>
      <div style={{ color: 'var(--violet-600, #6D28D9)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{c.icon}</div>
      <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>{c.title}</h3>
      <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px', fontSize: '15px' }}>{c.subtitle}</p>
      <Link href="/events" style={{ textDecoration: 'none' }}>
        <Button variant="primary" leftIcon={<Search size={16} />}>Explore Events</Button>
      </Link>
    </Card>
  );
};

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <Card style={{ padding: '64px 24px', textAlign: 'center', margin: '0 auto', maxWidth: '500px' }}>
    <AlertCircle size={48} color="var(--error, #DC2626)" style={{ marginBottom: '16px' }} />
    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>We couldn&apos;t load your events.</h3>
    <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px', fontSize: '15px' }}>An error occurred while fetching your data.</p>
    <Button variant="primary" onClick={onRetry}>Try Again</Button>
  </Card>
);

const UnauthenticatedState = () => (
  <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
    <Card style={{ padding: '48px', textAlign: 'center', maxWidth: '400px' }}>
      <LogIn size={48} color="var(--violet-600, #6D28D9)" style={{ marginBottom: '16px', margin: '0 auto 16px' }} />
      <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px' }}>Sign in to see your events</h3>
      <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px' }}>
        Log in to track your registered and saved events.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/login" style={{ textDecoration: 'none' }}><Button variant="primary">Sign In</Button></Link>
        <Link href="/register" style={{ textDecoration: 'none' }}><Button variant="outline">Register</Button></Link>
      </div>
    </Card>
  </div>
);
