'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Bookmark, Code, Presentation, Trophy, Briefcase, Mic, Rocket, Music, Medal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { daysUntil, formatDate } from '@/lib/utils/cn';

export interface EventCardProps {
  id?: string;
  title?: string;
  category?: string;
  organizer?: string;
  location?: string;
  mode?: 'Online' | 'Offline' | 'Hybrid' | string;
  date?: string;
  deadlineInDays?: number;
  skills?: string[];
  matchScore?: number;
  image?: string;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
  // Backward compatibility with legacy object props
  event?: any;
  match?: any;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

// Map categories to realistic Unsplash photos for the fallback state
const categoryFallbackImages: Record<string, string> = {
  Hackathon: 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=800&q=80',
  Workshop: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  Competition: 'https://images.unsplash.com/photo-1559628233-1c7e7c6b3e9b?auto=format&fit=crop&w=800&q=80',
  Internship: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  Conference: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  Startup: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
  Cultural: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
  Sports: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80',
  Default: 'https://images.unsplash.com/photo-1523580496186-3de8d4548b25?auto=format&fit=crop&w=800&q=80',
};

const getCategoryIcon = (category: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('hack')) return <Code size={28} />;
  if (cat.includes('work')) return <Presentation size={28} />;
  if (cat.includes('comp')) return <Trophy size={28} />;
  if (cat.includes('intern') || cat.includes('career')) return <Briefcase size={28} />;
  if (cat.includes('conf')) return <Mic size={28} />;
  if (cat.includes('startup') || cat.includes('entre')) return <Rocket size={28} />;
  if (cat.includes('cultural')) return <Music size={28} />;
  if (cat.includes('sports')) return <Medal size={28} />;
  return <Trophy size={28} />;
};

export function EventCard(p: EventCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // Normalize props for either direct or event-object invocation
  const id = p.id || p.event?.id || 'ev-1';
  const title = p.title || p.event?.title || 'Event Title';
  const rawCat = p.category || p.event?.category || 'Hackathon';
  const category = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
  const organizer = p.organizer || p.event?.organization || p.event?.organizer || 'College Host';
  const location = p.location || p.event?.location || 'India';
  const mode = p.mode || (p.event?.mode ? (p.event.mode.charAt(0).toUpperCase() + p.event.mode.slice(1)) : 'Online');
  const date = p.date || (p.event?.startDate ? formatDate(p.event.startDate) : 'Upcoming');
  const deadlineInDays = p.deadlineInDays !== undefined 
    ? p.deadlineInDays 
    : (p.event?.deadline ? daysUntil(p.event.deadline) : undefined);
  const skills = p.skills || p.event?.skills || p.event?.skillsRequired || [];
  const matchScore = p.matchScore !== undefined 
    ? p.matchScore 
    : (p.match?.overall || p.event?.matchScore);

  const fallbackImg = categoryFallbackImages[category] || categoryFallbackImages.Default;
  const imgSrc = p.image || fallbackImg;

  return (
    <div style={cardStyle} className={p.className}>
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        background: 'linear-gradient(135deg, var(--violet-50), var(--violet-100))',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={`${title} - ${category}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div style={{ color: 'var(--violet-600)' }}>
            {getCategoryIcon(category)}
          </div>
        )}

        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
          <span style={{ background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: 'var(--violet-700)' }}>
            {category}
          </span>
        </div>

        {matchScore && (
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <Badge tone="success">⚡ {matchScore}% Match</Badge>
          </div>
        )}
      </div>

      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 12px', fontWeight: 500 }}>
          {organizer}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} /> {location} · {mode}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} /> {date}
          </span>
        </div>

        {deadlineInDays !== undefined && deadlineInDays <= 7 && (
          <div style={{ fontSize: '13px', color: 'var(--warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Clock size={14} /> Registration closes in {deadlineInDays} days
          </div>
        )}

        {skills && skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {skills.slice(0, 4).map((s: string) => <Badge key={s} tone="gray">{s}</Badge>)}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => p.onToggleSave?.(id)} 
            leftIcon={<Bookmark size={14} />}
            aria-label={p.saved ? "Unsave event" : "Save event"}
          >
            {p.saved ? 'Saved' : 'Save'}
          </Button>
          <Link href={`/events/${id}`} style={{ flex: 1 }}>
            <Button variant="primary" size="sm" fullWidth aria-label={`View details for ${title}`}>
              View Event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-soft)',
  borderRadius: 'var(--r-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-xs)',
  transition: 'box-shadow .15s ease, transform .15s ease, border-color .15s ease',
  display: 'flex',
  flexDirection: 'column',
};
