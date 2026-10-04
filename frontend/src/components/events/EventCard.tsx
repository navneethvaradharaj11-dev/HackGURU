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
  Hackathon: '/images/events/ai-hackathon.jpg',
  Workshop: '/images/events/genai-bootcamp.jpg',
  Competition: '/images/events/coding-cup.jpg',
  Internship: '/images/events/internship.jpg',
  Conference: '/images/events/conference.jpg',
  Startup: '/images/events/startup.jpg',
  Cultural: '/images/events/cultural.jpg',
  Sports: '/images/events/sports.jpg',
  Default: '/images/hero-hackathon.jpg',
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
  const [isHovered, setIsHovered] = useState(false);

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
    <div 
      style={{
        ...cardStyle,
        transform: isHovered ? 'translateY(-2px)' : 'none',
        boxShadow: isHovered ? 'var(--shadow-md, 0 6px 20px rgba(16,16,24,0.08))' : 'var(--shadow-xs, 0 1px 2px rgba(16,16,24,0.04))',
        borderColor: isHovered ? 'var(--border-strong, #D4D4D8)' : 'var(--border-soft, #E4E4E7)',
      }} 
      className={p.className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/events/${id}`} style={{ textDecoration: 'none', display: 'block', position: 'relative' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          background: 'linear-gradient(135deg, var(--violet-50, #F5F3FF), var(--violet-100, #EDE9FE))',
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
                transition: 'transform 0.25s ease',
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{ color: 'var(--violet-600, #6D28D9)' }}>
              {getCategoryIcon(category)}
            </div>
          )}

          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: 'var(--violet-700, #5B21B6)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              {category}
            </span>
          </div>

          {matchScore && (
            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
              <Badge tone="success">⚡ {matchScore}% Match</Badge>
            </div>
          )}
        </div>
      </Link>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <Link href={`/events/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary, #171717)', lineHeight: 1.35 }}>
              {title}
            </h3>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--text-muted, #71717A)', margin: '0 0 12px', fontWeight: 500 }}>
            {organizer}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px', fontSize: '13px', color: 'var(--text-secondary, #52525B)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="var(--violet-600, #6D28D9)" /> {location} · {mode}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} color="var(--violet-600, #6D28D9)" /> {date}
            </span>
          </div>

          {deadlineInDays !== undefined && deadlineInDays <= 7 && (
            <div style={{ fontSize: '13px', color: 'var(--warning, #D97706)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <Clock size={14} /> Registration closes in {deadlineInDays} days
            </div>
          )}

          {skills && skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {skills.slice(0, 4).map((s: string) => <Badge key={s} tone="gray">{s}</Badge>)}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => p.onToggleSave?.(id)} 
            leftIcon={<Bookmark size={14} />}
            aria-label={p.saved ? "Unsave event" : "Save event"}
          >
            {p.saved ? 'Saved' : 'Save'}
          </Button>
          <Link href={`/events/${id}`} style={{ flex: 1, textDecoration: 'none' }}>
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
  background: 'var(--bg-card, #FFFFFF)',
  border: '1px solid var(--border-soft, #E4E4E7)',
  borderRadius: 'var(--r-lg, 16px)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(16,16,24,0.04))',
  transition: 'box-shadow .2s ease, transform .2s ease, border-color .2s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};
