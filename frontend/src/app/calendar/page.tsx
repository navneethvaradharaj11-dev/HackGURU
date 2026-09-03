'use client';

import React, { useState, useEffect } from 'react';
import { calendarApi, interactionApi } from '@/lib/api';
import {
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  BellRing,
  Bookmark
} from 'lucide-react';

export default function CalendarPage() {
  const [calendarItems, setCalendarItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCalendar = async () => {
    setLoading(true);
    try {
      const res = await calendarApi.getCalendar();
      if (Array.isArray(res.data)) {
        setCalendarItems(res.data);
      } else {
        throw new Error('Not array');
      }
    } catch (err) {
      // Fallback demo calendar list
      setCalendarItems([
        {
          id: 'cal-1',
          eventId: 'ev-1',
          eventTitle: 'IIT Bombay TechFest Hackathon 2026',
          category: 'Hackathon',
          startDate: '2026-09-20',
          registrationDeadline: '2026-09-15',
          reminderDaysBefore: 2,
          status: 'REGISTERED',
        },
        {
          id: 'cal-2',
          eventId: 'ev-2',
          eventTitle: 'Autonomous AI Agents Bootcamp',
          category: 'Workshop',
          startDate: '2026-09-18',
          registrationDeadline: '2026-09-16',
          reminderDaysBefore: 1,
          status: 'SAVED',
        },
        {
          id: 'cal-3',
          eventId: 'ev-3',
          eventTitle: 'HackGuru Research Internship Submission',
          category: 'Internship',
          startDate: '2026-10-01',
          registrationDeadline: '2026-09-28',
          reminderDaysBefore: 3,
          status: 'BOOKMARKED',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await calendarApi.removeFromCalendar(id);
      setCalendarItems((prev) => prev.filter((item) => item.id !== id));
      alert('Removed event reminder from calendar.');
    } catch (err) {
      setCalendarItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20 mb-2">
            <BellRing className="w-3.5 h-3.5" /> Deterministic Deadline Reminders
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Schedule & Reminder Center
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track registration deadlines, hackathon kickoff dates, and automated push notifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
            {calendarItems.length} Saved Schedules
          </span>
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="py-20 text-center text-xs text-gray-400">Loading schedule timeline...</div>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {calendarItems.map((item) => (
            <div
              key={item.id}
              className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Deadline: {item.registrationDeadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{item.eventTitle || item.title}</h3>
                <p className="text-xs text-gray-400">
                  Event Starts: <span className="text-gray-200 font-medium">{item.startDate}</span> • Automated alert set <span className="text-amber-400 font-semibold">{item.reminderDaysBefore || 2} days</span> prior.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {item.status || 'ACTIVE'}
                </span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
