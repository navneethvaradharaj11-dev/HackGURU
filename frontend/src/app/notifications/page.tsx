'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell, Calendar, Clock, MapPin, Sparkles, AlertCircle, CheckCheck,
  Check, Inbox, ChevronRight, User
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

// --- PRESERVE EXISTING NOTIFICATION SERVICE INTEGRATION ---
// In the real repository, replace these mocks with the actual `notificationService` calls.
type NotificationType = 'registration' | 'deadline' | 'reminder' | 'update' | 'recommendation' | 'profile';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  link?: string; // e.g., '/events/1' or '/profile'
  eventId?: string;
}

const fetchNotifications = async (userId: string): Promise<AppNotification[]> => {
  await new Promise((res) => setTimeout(res, 500));
  const now = new Date();
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  const twoDaysAgo = new Date(now); twoDaysAgo.setDate(now.getDate() - 2);
  const threeDaysAgo = new Date(now); threeDaysAgo.setDate(now.getDate() - 3);
  
  return [
    { id: '1', type: 'deadline', title: 'Registration closes tomorrow', message: 'AI Innovation Hackathon', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), read: false, link: '/events/1' },
    { id: '2', type: 'reminder', title: 'Event starts tomorrow', message: 'Web Development Workshop', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(), read: false, link: '/events/2' },
    { id: '3', type: 'recommendation', title: 'New event matching your interests', message: 'Python Competition', timestamp: yesterday.toISOString(), read: false, link: '/events/3' },
    { id: '4', type: 'update', title: 'Venue changed', message: 'Web Development Workshop moved to Auditorium B', timestamp: twoDaysAgo.toISOString(), read: true, link: '/events/2' },
    { id: '5', type: 'registration', title: 'Registration confirmed', message: 'You are registered for AI Innovation Hackathon', timestamp: threeDaysAgo.toISOString(), read: true, link: '/events/1' },
  ];
};

const markNotificationRead = async (userId: string, notificationId: string): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 200));
  return true;
};

const markAllNotificationsRead = async (userId: string): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 300));
  return true;
};

// Utility for relative time
const formatRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMins = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

const getGroupLabel = (isoString: string): string => {
  const date = new Date(isoString);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const notifDate = new Date(date); notifDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - notifDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return 'Earlier';
};

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case 'registration': return <Check size={18} color="var(--success, #16A34A)" />;
    case 'deadline': return <Clock size={18} color="var(--warning, #D97706)" />;
    case 'reminder': return <Calendar size={18} color="var(--violet-600, #6D28D9)" />;
    case 'update': return <AlertCircle size={18} color="var(--text-secondary, #52525B)" />;
    case 'recommendation': return <Sparkles size={18} color="var(--violet-600, #6D28D9)" />;
    case 'profile': return <User size={18} color="var(--violet-600, #6D28D9)" />;
    default: return <Bell size={18} color="var(--text-secondary, #52525B)" />;
  }
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const userId = user?.id || 'demo-user';

    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchNotifications(userId);
        if (isMounted) setNotifications(data);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleMarkAllRead = async () => {
    const userId = user?.id || 'demo-user';
    setMarkingAll(true);
    try {
      const success = await markAllNotificationsRead(userId);
      if (success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      }
    } catch (err) {
      setError(true);
    } finally {
      setMarkingAll(false);
    }
  };

  const handleNotificationClick = async (notif: AppNotification) => {
    const userId = user?.id || 'demo-user';
    if (!notif.read) {
      try {
        const success = await markNotificationRead(userId, notif.id);
        if (success) {
          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
        }
      } catch (err) {
        // Silently fail to not block navigation
      }
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  // Group notifications
  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    const group = getGroupLabel(notif.timestamp);
    if (!acc[group]) acc[group] = [];
    acc[group].push(notif);
    return acc;
  }, {} as Record<string, AppNotification[]>);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) return <SkeletonLayout />;
  if (error) return <ErrorState onRetry={() => { setError(false); setNotifications([]); }} />;

  return (
    <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 24px 64px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: 'var(--fs-h1, 32px)', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
              Notifications
            </h1>
            <p style={{ color: 'var(--text-secondary, #52525B)', marginTop: '8px', fontSize: '17px' }}>
              Stay updated with your events and opportunities.
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<CheckCheck size={14} />} 
              onClick={handleMarkAllRead}
              disabled={markingAll}
            >
              {markingAll ? 'Updating...' : 'Mark all as read'}
            </Button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-soft, #E4E4E7)', paddingBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={filterBtnStyle(filter === 'all')}
          >
            All {notifications.length > 0 && `(${notifications.length})`}
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            style={filterBtnStyle(filter === 'unread')}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {/* Notification List */}
        {filteredNotifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {Object.entries(groupedNotifications).map(([group, items]) => (
              <div key={group}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted, #71717A)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {group}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map(notif => (
                    <NotificationItem 
                      key={notif.id} 
                      notification={notif}
                      onClick={() => handleNotificationClick(notif)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS & STYLES ---

const NotificationItem = ({ notification, onClick }: { notification: AppNotification; onClick: () => void }) => {
  const content = (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      background: notification.read ? 'var(--bg-card, #FFFFFF)' : 'var(--violet-50, #F5F3FF)',
      border: `1px solid ${notification.read ? 'var(--border-soft, #E4E4E7)' : 'var(--violet-200, #DDD6FE)'}`,
      borderRadius: 'var(--r-md, 12px)',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    }}>
      <div style={{ flexShrink: 0, marginTop: '2px' }}>
        {getIconForType(notification.type)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 600, margin: 0, color: 'var(--text-primary, #171717)' }}>
              {notification.title}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary, #52525B)', margin: '4px 0 0 0' }}>
              {notification.message}
            </p>
          </div>
          {!notification.read && (
            <span aria-label="Unread" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--violet-600, #6D28D9)', flexShrink: 0, marginTop: '6px' }} />
          )}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted, #71717A)', margin: '8px 0 0 0' }}>
          {formatRelativeTime(notification.timestamp)}
        </p>
      </div>
      {notification.link && <ChevronRight size={16} color="var(--text-muted, #71717A)" style={{ alignSelf: 'center', flexShrink: 0 }} />}
    </div>
  );

  return notification.link ? (
    <Link href={notification.link} onClick={onClick} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  ) : (
    <div onClick={onClick}>{content}</div>
  );
};

const EmptyState = () => (
  <Card style={{ padding: '64px 24px', textAlign: 'center' }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>You&apos;re all caught up</h3>
    <p style={{ color: 'var(--text-muted, #71717A)', fontSize: '14px', margin: 0 }}>
      New updates about your events and opportunities will appear here.
    </p>
  </Card>
);

const filterBtnStyle = (active: boolean): React.CSSProperties => active
  ? { padding: '8px 16px', borderRadius: 'var(--r-pill, 999px)', background: 'var(--violet-600, #6D28D9)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }
  : { padding: '8px 16px', borderRadius: 'var(--r-pill, 999px)', background: 'transparent', color: 'var(--text-secondary, #52525B)', border: '1px solid var(--border-soft, #E4E4E7)', fontWeight: 500, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' };

const SkeletonLayout = () => (
  <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh' }}>
    <div className="container" style={{ padding: '40px 24px 64px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ height: '32px', width: '150px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '20px', width: '300px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '32px', animation: 'pulse 1.5s infinite' }} />
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px', background: '#fff', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-md, 12px)', marginBottom: '12px', animation: 'pulse 1.5s infinite' }}>
          <div style={{ width: '24px', height: '24px', background: '#F4F4F5', borderRadius: '50%' }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: '14px', width: '60%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ height: '12px', width: '40%', background: '#F4F4F5', borderRadius: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <AlertCircle size={48} color="var(--error, #DC2626)" style={{ marginBottom: '16px' }} />
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>We couldn&apos;t load your notifications.</h1>
      <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px' }}>Please check your connection and try again.</p>
      <Button variant="primary" onClick={onRetry}>Try Again</Button>
    </div>
  </div>
);
