'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Bookmark, ArrowRight, Code, Presentation, Trophy, Briefcase, Mic, Rocket, Music, Medal, Sparkles } from 'lucide-react';

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
  prize?: string;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
  // Backward compatibility with legacy object props
  event?: any;
  match?: any;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

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

export function EventCard(p: EventCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [isSaved, setIsSaved] = useState(p.saved || false);

  const id = p.id || p.event?.id || 'ev-1';
  const title = p.title || p.event?.title || 'Event Title';
  const rawCat = p.category || p.event?.category || 'Hackathon';
  const category = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
  const organizer = p.organizer || p.event?.organization || p.event?.organizer || 'College Host';
  const location = p.location || p.event?.location || 'India';
  const mode = p.mode || (p.event?.mode ? (p.event.mode.charAt(0).toUpperCase() + p.event.mode.slice(1)) : 'Online');
  const date = p.date || p.event?.startDate || p.event?.date || 'Upcoming';
  const prize = p.prize || p.event?.prize;
  const deadlineInDays = p.deadlineInDays !== undefined 
    ? p.deadlineInDays 
    : (p.event?.deadlineInDays ?? (p.event?.registrationDeadline ? 7 : undefined));
  const skills = p.skills || p.event?.skills || p.event?.skillsRequired || [];
  const matchScore = p.matchScore !== undefined 
    ? p.matchScore 
    : (p.match?.overall || p.event?.matchScore);

  const fallbackImg = categoryFallbackImages[category] || categoryFallbackImages.Default;
  const imgSrc = p.image || p.event?.image || p.event?.imageUrl || fallbackImg;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    p.onToggleSave?.(id);
  };

  return (
    <div className={`card-diffusion rounded-2xl overflow-hidden bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-xl group ${p.className || ''}`}>
      {/* Poster Thumbnail */}
      <Link href={`/events/${id}`} className="block relative aspect-video overflow-hidden bg-neutral-900">
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-violet-50 text-violet-600">
            <Trophy size={32} />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-3 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#0B0B0E] text-[11px] font-bold shadow-xs">
            {category}
          </span>
          {prize && (
            <span className="px-2.5 py-0.5 rounded-full bg-violet-600 text-white text-[11px] font-bold shadow-xs">
              {prize}
            </span>
          )}
        </div>

        {matchScore && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold shadow-xs flex items-center gap-1">
              ⚡ {matchScore}% Match
            </span>
          </div>
        )}
      </Link>

      {/* Body Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/events/${id}`}>
            <h4 className="font-editorial text-lg text-neutral-900 font-normal hover:text-violet-700 transition-colors mb-1.5 leading-snug line-clamp-2">
              {title}
            </h4>
          </Link>
          <p className="text-xs font-semibold text-neutral-500 mb-3 truncate">
            {organizer}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-3">
            <span className="inline-flex items-center gap-1 font-medium">
              <MapPin size={12} className="text-violet-600 shrink-0" />
              <span className="truncate max-w-[120px]">{location}</span> · {mode}
            </span>
            <span className="inline-flex items-center gap-1 font-medium">
              <Calendar size={12} className="text-violet-600 shrink-0" /> {date}
            </span>
          </div>

          {deadlineInDays !== undefined && deadlineInDays <= 7 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 text-[11px] font-semibold mb-3">
              <Clock size={12} className="text-amber-600" /> Closes in {deadlineInDays} days
            </div>
          )}

          {/* Skill Pills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {skills.slice(0, 3).map((s: string) => (
                <span key={s} className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Action Row */}
        <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 mt-auto">
          <button
            onClick={handleSave}
            className="w-9 h-9 rounded-full border border-neutral-200/90 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
            title={isSaved ? 'Saved' : 'Save'}
          >
            <Bookmark size={14} className={isSaved ? 'fill-violet-600 text-violet-600' : ''} />
          </button>

          <Link
            href={`/events/${id}`}
            className="flex-1 py-2 rounded-full bg-[#0B0B0E] hover:bg-neutral-800 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
