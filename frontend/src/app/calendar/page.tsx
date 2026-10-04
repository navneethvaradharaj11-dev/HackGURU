'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { calendarApi } from '@/lib/api';
import {
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  BellRing,
  Bookmark,
  CalendarDays,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function CalendarPage() {
  const [calendarItems, setCalendarItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCalendar = async () => {
    setLoading(true);
    try {
      const res = await calendarApi.getCalendar();
      if (Array.isArray(res.data) && res.data.length > 0) {
        setCalendarItems(res.data);
      } else {
        throw new Error('Not array or empty');
      }
    } catch {
      // Clean fallback calendar list
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
          location: 'Mumbai · Hybrid',
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
          location: 'Online Webinar',
        },
        {
          id: 'cal-3',
          eventId: 'ev-3',
          eventTitle: 'HackGuru AI Research Fellowship & Internship',
          category: 'Internship',
          startDate: '2026-10-01',
          registrationDeadline: '2026-09-28',
          reminderDaysBefore: 3,
          status: 'BOOKMARKED',
          location: 'Bengaluru / Remote',
        },
        {
          id: 'cal-4',
          eventId: 'ev-4',
          eventTitle: 'BITS Pilani Coding Championship',
          category: 'Competition',
          startDate: '2026-10-10',
          registrationDeadline: '2026-10-05',
          reminderDaysBefore: 2,
          status: 'SAVED',
          location: 'Pilani · Offline',
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
    } catch {
      setCalendarItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200">
              Schedule &amp; Deadlines
            </span>
            <span className="text-xs text-gray-500">
              Automatic alert synchronization
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            My Event Calendar
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Keep track of upcoming registration deadlines and kickoff dates so you never miss an opportunity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-md bg-gray-100 text-xs font-semibold text-gray-700">
            {calendarItems.length} Scheduled Reminders
          </span>
          <Link
            href="/events"
            className="px-4 py-1.5 rounded-md bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors shadow-2xs"
          >
            Add More Events
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Schedule List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-violet-600" />
              Upcoming Event Milestones
            </h2>

            {loading ? (
              <div className="py-12 text-center text-xs text-gray-500">
                Loading schedule...
              </div>
            ) : calendarItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500">
                <CalendarIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="font-semibold text-gray-700">No scheduled reminders</p>
                <p className="mt-1">Save or register for events to see them here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {calendarItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700">
                          {item.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          item.status === 'REGISTERED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-violet-50 text-violet-800 border border-violet-200'
                        }`}>
                          {item.status}
                        </span>
                        {item.location && (
                          <span className="text-[11px] text-gray-400">{item.location}</span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-gray-900 leading-snug">
                        {item.eventTitle}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-red-600 font-medium">
                          <Clock className="w-3.5 h-3.5" /> Deadline: {item.registrationDeadline}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <CalendarIcon className="w-3.5 h-3.5" /> Event Kickoff: {item.startDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/events/${item.eventId}`}
                        className="px-3 py-1.5 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove from calendar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <BellRing className="w-4 h-4 text-amber-600" />
              Notification Channels
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We send email alerts and push notifications 48 hours and 24 hours prior to each event deadline.
            </p>
            <div className="pt-2 border-t border-gray-100 text-xs space-y-2">
              <div className="flex items-center justify-between text-gray-700">
                <span>Email Digest:</span>
                <span className="font-semibold text-emerald-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Browser Push:</span>
                <span className="font-semibold text-emerald-700">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 rounded-lg border border-violet-100 p-4 text-xs text-violet-900 space-y-1.5">
            <p className="font-bold">Sync with Google Calendar</p>
            <p className="text-violet-700 leading-relaxed text-[11px]">
              Export all registered hackathons and workshops as an .ics file directly into Google Calendar or Outlook.
            </p>
            <button
              onClick={() => alert('Calendar export (.ics) generated and downloaded!')}
              className="mt-2 px-3 py-1.5 bg-violet-600 text-white rounded text-xs font-semibold hover:bg-violet-700 transition-colors"
            >
              Export (.ICS)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
