'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Search, Bell, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext'; // Preserving existing auth logic

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
  const pathname = usePathname();
  const { user, logout } = useAuth(); // Existing auth logic untouched

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const baseHref = href.split('?')[0];
    return pathname?.startsWith(baseHref);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-soft)',
    }}>
      <nav style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 24px',
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Branding */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
          <span style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--violet-600)',
            color: '#fff',
          }}>
            <Trophy size={18} />
          </span>
          <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.2px' }}>
            AllCollegeEvent<span style={{ color: 'var(--violet-600)' }}>.com</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex" style={{ gap: '24px', flex: 1, justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: isActive(link.href) ? 600 : 500,
                color: isActive(link.href) ? 'var(--violet-600)' : 'var(--text-secondary)',
                transition: 'color 0.15s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/events" aria-label="Search" style={iconBtnStyle}><Search size={18} /></Link>
          <button aria-label="Notifications" style={iconBtnStyle}><Bell size={18} /></button>

          {user ? (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="outline" size="sm" leftIcon={<LayoutDashboard size={14} />}>Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} leftIcon={<LogOut size={14} />}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register" className="hidden sm:block">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </>
          )}

          <button 
            aria-label="Toggle menu" 
            className="lg:hidden" 
            style={iconBtnStyle} 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 24px 16px',
          borderBottom: '1px solid var(--border-soft)',
          background: '#fff',
        }}>
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              style={{
                fontSize: '15px',
                fontWeight: isActive(link.href) ? 600 : 500,
                color: isActive(link.href) ? 'var(--violet-600)' : 'var(--text-primary)',
                padding: '10px 0',
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {!user && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Link href="/login" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" fullWidth>Login</Button>
              </Link>
              <Link href="/register" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>Register</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

const iconBtnStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  border: '1px solid var(--border-soft)',
  background: '#fff',
  color: 'var(--text-secondary)',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
};
