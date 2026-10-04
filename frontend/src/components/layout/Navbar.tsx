'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Search, Bell, Menu, X, LogOut, LayoutDashboard, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

// --- PRESERVE EXISTING NOTIFICATION INTEGRATION ---
// In the real repo, replace this with actual notificationService.getUnreadCount() and getRecent()
const mockNotifications = [
  { id: '1', type: 'deadline', title: 'Registration closes tomorrow', message: 'AI Innovation Hackathon', read: false, link: '/events/1' },
  { id: '2', type: 'reminder', title: 'Event starts tomorrow', message: 'Web Development Workshop', read: false, link: '/events/2' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore Events', href: '/events' },
  { label: 'Hackathons', href: '/events?category=hackathon' },
  { label: 'Workshops', href: '/events?category=workshop' },
  { label: 'Internships', href: '/events?category=internship' },
  { label: 'Competitions', href: '/events?category=competition' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
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
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-soft, #E4E4E7)',
    }}>
      <nav style={{ maxWidth: 'var(--container, 1200px)', margin: '0 auto', padding: '0 24px', height: 'var(--nav-h, 68px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Branding */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary, #171717)', textDecoration: 'none' }}>
          <img src="/icon.png" alt="ACE Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.2px' }}>
            AllCollegeEvent<span style={{ color: 'var(--violet-600, #6D28D9)' }}>.com</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex" style={{ gap: '24px', flex: 1, justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: '14px', fontWeight: isActive(link.href) ? 600 : 500, color: isActive(link.href) ? 'var(--violet-600, #6D28D9)' : 'var(--text-secondary, #52525B)', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/events">
            <button aria-label="Search" style={iconBtnStyle}><Search size={18} /></button>
          </Link>
          
          {/* Notification Dropdown */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button aria-label="Notifications" style={iconBtnStyle} onClick={() => setNotifOpen(!notifOpen)}>
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'var(--violet-600, #6D28D9)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 5px', borderRadius: '10px', minWidth: '16px', textAlign: 'center' }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            
            {notifOpen && (
              <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '340px', background: '#fff', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-md, 12px)', boxShadow: 'var(--shadow-md, 0 4px 12px rgba(16,16,24,0.08))', overflow: 'hidden', zIndex: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border-soft, #E4E4E7)' }}>
                  <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary, #171717)' }}>Notifications</span>
                  <button onClick={handleMarkAll} style={{ background: 'none', border: 'none', color: 'var(--violet-600, #6D28D9)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCheck size={14} /> Mark all
                  </button>
                </div>
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {notifications.map(n => (
                    <Link key={n.id} href={n.link || '#'} onClick={() => setNotifOpen(false)} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: '1px solid var(--border-soft, #E4E4E7)', background: n.read ? 'transparent' : 'var(--violet-50, #F5F3FF)', textDecoration: 'none' }}>
                      {!n.read && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet-600, #6D28D9)', flexShrink: 0, marginTop: '6px' }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: 'var(--text-primary, #171717)' }}>{n.title}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary, #52525B)', margin: '2px 0 0 0' }}>{n.message}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/notifications" onClick={() => setNotifOpen(false)} style={{ display: 'block', padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--violet-600, #6D28D9)', background: 'var(--bg-section, #F8F8FA)', textDecoration: 'none' }}>
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
              <Link href="/register" className="hidden sm:block"><Button variant="primary" size="sm">Register</Button></Link>
            </>
          )}

          <button aria-label="Toggle menu" className="lg:hidden" style={iconBtnStyle} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ display: 'flex', flexDirection: 'column', padding: '0 24px 16px', borderBottom: '1px solid var(--border-soft, #E4E4E7)', background: '#fff' }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: '15px', fontWeight: isActive(link.href) ? 600 : 500, color: isActive(link.href) ? 'var(--violet-600, #6D28D9)' : 'var(--text-primary, #171717)', padding: '10px 0', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {!user && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Link href="/login" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}><Button variant="outline" size="sm" fullWidth>Login</Button></Link>
              <Link href="/register" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}><Button variant="primary" size="sm" fullWidth>Register</Button></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

const iconBtnStyle: React.CSSProperties = {
  width: '36px', height: '36px', borderRadius: '10px', border: '1px solid var(--border-soft, #E4E4E7)',
  background: '#fff', color: 'var(--text-secondary, #52525B)', display: 'grid', placeItems: 'center', cursor: 'pointer', position: 'relative',
};
