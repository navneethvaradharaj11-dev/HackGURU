'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Search, Bell, Menu, X, LogOut, LayoutDashboard, CheckCheck, PlusCircle, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const mockNotifications = [
  { id: '1', type: 'deadline', title: 'Registration closes soon', message: 'HackForge 2026: 36-Hr National Hackathon', read: false, link: '/events/hackforge-2026' },
  { id: '2', type: 'symposium', title: 'New Symposium Added', message: 'INNOFEST 2026 - IIT Madras', read: false, link: '/events/innofest-2026' },
  { id: '3', type: 'fest', title: 'Cultural Fest Live', message: 'RHYTHM 2026 - VIT Vellore Pro-Nite Passes', read: false, link: '/events/rhythm-2026' },
];

const navLinks = [
  { label: 'Explore Events', href: '/events' },
  { label: 'Hackathons', href: '/events?category=Hackathon' },
  { label: 'Symposiums', href: '/events?category=Symposium' },
  { label: 'Workshops', href: '/events?category=Workshop' },
  { label: 'Cultural', href: '/events?category=Cultural' },
  { label: 'Robotics', href: '/events?category=Competition' },
];

const cities = ['All India', 'Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Online'];

export function Navbar({ onOpenPostModal }: { onOpenPostModal?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All India');
  const notifRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href.split('?')[0]);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-soft, #E4E4E7)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
    }}>
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary, #171717)', textDecoration: 'none' }}>
            <img 
              src="/ace-logo.png" 
              alt="AllCollegeEvent.com Logo" 
              style={{ height: '34px', width: 'auto', objectFit: 'contain' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.3px', color: '#111827', lineHeight: 1.15 }}>
                AllCollegeEvent<span style={{ color: '#7C3AED' }}>.com</span>
              </span>
              <span style={{ margin: 0, fontSize: '11px', color: '#64748B', fontWeight: 500, lineHeight: 1.2 }}>
                Student Opportunity Network
              </span>
            </div>
          </Link>

          {/* Location Selector */}
          <div ref={cityRef} style={{ position: 'relative' }} className="hidden md:block">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '20px',
                background: '#F9FAFB', border: '1px solid #E5E7EB',
                fontSize: '13px', fontWeight: 600, color: '#374151',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }}
            >
              <MapPin size={14} color="#7C3AED" />
              <span>{selectedCity}</span>
            </button>
            {cityOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                width: '160px', background: '#fff', border: '1px solid #E5E7EB',
                borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                padding: '6px 0', zIndex: 100
              }}>
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '8px 14px',
                      fontSize: '13px', fontWeight: selectedCity === city ? 700 : 500,
                      color: selectedCity === city ? '#7C3AED' : '#374151',
                      background: selectedCity === city ? '#F5F3FF' : 'transparent',
                      border: 'none', cursor: 'pointer', display: 'block'
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden xl:flex" style={{ gap: '20px', flex: 1, justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: isActive(link.href) ? 700 : 500,
                color: isActive(link.href) ? '#7C3AED' : '#4B5563',
                textDecoration: 'none',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'color 0.15s ease'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Post / Add Event CTA */}
          <Link href="/organizer/events/create" style={{ textDecoration: 'none' }}>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                color: '#fff', fontSize: '13px', fontWeight: 700,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              <PlusCircle size={15} />
              <span className="hidden sm:inline">Post Event</span>
            </button>
          </Link>

          <Link href="/events" title="Search Events">
            <button aria-label="Search" style={iconBtnStyle}><Search size={18} /></button>
          </Link>

          {/* Notification Dropdown */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button aria-label="Notifications" style={iconBtnStyle} onClick={() => setNotifOpen(!notifOpen)}>
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 5px', borderRadius: '10px', minWidth: '16px', textAlign: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '340px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '14px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontWeight: 700, fontSize: '15px', color: '#111827' }}>Live Updates</span>
                  <button onClick={handleMarkAll} style={{ background: 'none', border: 'none', color: '#7C3AED', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCheck size={14} /> Mark all
                  </button>
                </div>
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {notifications.map(n => (
                    <Link key={n.id} href={n.link || '/events'} onClick={() => setNotifOpen(false)} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: '1px solid #F9FAFB', background: n.read ? 'transparent' : '#F5F3FF', textDecoration: 'none' }}>
                      {!n.read && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED', flexShrink: 0, marginTop: '6px' }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: '#111827' }}>{n.title}</p>
                        <p style={{ fontSize: '12px', color: '#4B5563', margin: '2px 0 0 0' }}>{n.message}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/notifications" onClick={() => setNotifOpen(false)} style={{ display: 'block', padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#7C3AED', background: '#F9FAFB', textDecoration: 'none' }}>
                  View all notifications
                </Link>
              </div>
            )}
          </div>

          {user ? (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="outline" size="sm" leftIcon={<LayoutDashboard size={14} />}>Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} leftIcon={<LogOut size={14} />}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link href="/register" className="hidden sm:block"><Button variant="primary" size="sm">Join Free</Button></Link>
            </>
          )}

          <button aria-label="Toggle menu" className="xl:hidden" style={iconBtnStyle} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden" style={{ display: 'flex', flexDirection: 'column', padding: '12px 20px 20px', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
          <div style={{ padding: '8px 0', borderBottom: '1px solid #F3F4F6', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' }}>Select Region</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {cities.slice(0, 5).map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  style={{
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px',
                    fontWeight: selectedCity === c ? 700 : 500,
                    background: selectedCity === c ? '#7C3AED' : '#F3F4F6',
                    color: selectedCity === c ? '#fff' : '#4B5563',
                    border: 'none', cursor: 'pointer'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: '15px', fontWeight: isActive(link.href) ? 700 : 500, color: isActive(link.href) ? '#7C3AED' : '#1F2937', padding: '10px 0', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <Link href="/organizer/events/create" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="sm" fullWidth leftIcon={<PlusCircle size={15} />}>Post Event</Button>
            </Link>
            {!user && (
              <Link href="/login" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" fullWidth>Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

const iconBtnStyle: React.CSSProperties = {
  width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #E5E7EB',
  background: '#fff', color: '#4B5563', display: 'grid', placeItems: 'center', cursor: 'pointer', position: 'relative',
};
