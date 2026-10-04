'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Trophy, Code, Presentation, Briefcase, Mic, Rocket, Calendar, Bell, Bookmark, BarChart2, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import EventCard from '@/components/events/EventCard';

// Preserving existing fetch logic structure: 
// In the real app, replace these arrays with data from `eventsService.getFeatured()` and `recommendationService.getForUser()`
const featuredEvents = [
  {
    id: '1',
    title: 'AI Innovation Challenge 2026',
    category: 'Hackathon',
    organizer: 'IIT Bombay',
    location: 'Mumbai',
    mode: 'Offline' as const,
    date: '26 Oct 2026',
    deadlineInDays: 3,
    skills: ['Python', 'AI', 'ML'],
    image: 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'GenAI Bootcamp',
    category: 'Workshop',
    organizer: 'NIT Trichy',
    location: 'Online',
    mode: 'Online' as const,
    date: '12 Nov 2026',
    deadlineInDays: 9,
    skills: ['LLMs', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  }
];

const recommendedEvents = [
  {
    id: '3',
    title: 'National Coding Cup',
    category: 'Competition',
    organizer: 'Anna University',
    location: 'Chennai',
    mode: 'Hybrid' as const,
    date: '05 Dec 2026',
    deadlineInDays: 14,
    skills: ['DSA', 'C++'],
    matchScore: 94,
    image: 'https://images.unsplash.com/photo-1559628233-1c7e7c6b3e9b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Techfest Robotics League',
    category: 'Competition',
    organizer: 'IIT Bombay',
    location: 'Mumbai',
    mode: 'Offline' as const,
    date: '18 Jan 2027',
    deadlineInDays: 25,
    skills: ['ROS', 'Embedded'],
    matchScore: 88,
    image: 'https://images.unsplash.com/photo-1581090700227-1e8e0c0e1e1e?auto=format&fit=crop&w=800&q=80'
  }
];

const categories = [
  { name: 'Hackathons', icon: <Code />, desc: 'Build & innovate under pressure' },
  { name: 'Workshops', icon: <Presentation />, desc: 'Learn from industry experts' },
  { name: 'Competitions', icon: <Trophy />, desc: 'Test your skills & win prizes' },
  { name: 'Internships', icon: <Briefcase />, desc: 'Kickstart your career journey' },
  { name: 'Webinars', icon: <Mic />, desc: 'Explore latest tech trends' },
  { name: 'Tech Events', icon: <Rocket />, desc: 'Network with peers & leaders' },
];

const benefits = [
  { icon: <Search />, title: 'Discover Events', desc: 'Find events from colleges across India all in one place.' },
  { icon: <Sparkles />, title: 'Personalized Recommendations', desc: 'Our AI engine suggests events that match your profile.' },
  { icon: <Bell />, title: 'Deadline Reminders', desc: 'Never miss a registration deadline with smart alerts.' },
  { icon: <Bookmark />, title: 'Save Opportunities', desc: 'Bookmark events to view and apply later at your convenience.' },
];

export default function Home() {
  return (
    <div style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      
      {/* HERO SECTION */}
      <section style={{ 
        background: 'linear-gradient(180deg, var(--violet-50) 0%, #FFFFFF 100%)',
        padding: '80px 0 60px',
        borderBottom: '1px solid var(--border-soft)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ flex: '1.1' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#fff', border: '1px solid var(--violet-200)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--violet-700)', marginBottom: '24px' }}>
              <Sparkles size={14} /> AI-powered event discovery
            </span>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
              Discover College Events That Match Your <span style={{ color: 'var(--violet-600)' }}>Ambitions</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginTop: '20px', maxWidth: '540px' }}>
              Find hackathons, workshops, competitions, internships and technical events from colleges across India.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <Link href="/events">
                <Button size="lg" rightIcon={<ArrowRight size={16} />}>Explore Events</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">Create Student Profile</Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Visual - Realistic Imagery */}
          <div className="hidden md:block" style={{ flex: '0.9' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', aspectRatio: '4/3' }}>
              <img 
                src="https://images.unsplash.com/photo-1523580496186-3de8d4548b25?auto=format&fit=crop&w=1200&q=80" 
                alt="Students collaborating at a college event" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '20px', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Live Event</p>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Hackathon Finals 2026</h3>
                  </div>
                  <Badge tone="violet">Live Now</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE OPPORTUNITIES */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '12px' }}>Explore Opportunities</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            Browse through various categories to find exactly what you&apos;re looking for.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {categories.map((cat) => (
              <Link key={cat.name} href={`/events?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card hoverable style={{ padding: '24px', cursor: 'pointer', height: '100%' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--violet-50)', color: 'var(--violet-600)', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px' }}>{cat.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{cat.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section style={{ padding: '32px 0 64px', background: 'var(--bg-section)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Featured Events</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Don&apos;t miss out on these top-rated events.</p>
            </div>
            <Link href="/events">
              <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>View All</Button>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {featuredEvents.map(e => <EventCard key={e.id} {...e} />)}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Sparkles size={24} color="var(--violet-600)" />
            <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Recommended For You</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {recommendedEvents.map(e => <EventCard key={e.id} {...e} />)}
          </div>
        </div>
      </section>

      {/* WHY STUDENTS USE */}
      <section style={{ padding: '32px 0 64px', background: 'var(--bg-section)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>Why Students Use AllCollegeEvent</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {benefits.map((b, i) => (
              <Card key={i} style={{ padding: '24px', textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--violet-50)', color: 'var(--violet-600)', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>Ready to find your next big opportunity?</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Create your profile today and get personalized event recommendations delivered straight to your dashboard.
          </p>
          <Link href="/register">
            <Button size="lg">Get Started For Free</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
