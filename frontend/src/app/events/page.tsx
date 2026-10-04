'use client';

import React, { useState, useEffect } from 'react';
import { eventsApi, interactionApi, EventItem } from '@/lib/api';
import {
  Compass, Search, MapPin, Bookmark, ExternalLink, Sparkles, RefreshCw, X, Filter
} from 'lucide-react';

const CATEGORY_BADGE_MAP: Record<string, string> = {
  Hackathon: 'ace-badge-violet',
  Workshop: 'ace-badge-amber',
  Internship: 'ace-badge-green',
  Webinar: 'ace-badge-blue',
  ALL: 'ace-badge-gray',
};

const DIFFICULTY_BADGE: Record<string, string> = {
  BEGINNER: 'ace-badge-green',
  INTERMEDIATE: 'ace-badge-amber',
  ADVANCED: 'ace-badge-red',
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const categories = ['ALL', 'Hackathon', 'Workshop', 'Internship', 'Webinar'];

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await eventsApi.getEvents({
        category: selectedCategory === 'ALL' ? undefined : selectedCategory,
        search: searchQuery || undefined,
      });
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else throw new Error('Not array');
    } catch {
      setEvents([
        {
          id: 'ev-1',
          title: 'IIT Bombay TechFest Hackathon 2026',
          description: "Asia's largest science and technology festival hackathon featuring AI track, web3 track, and robotics challenge.",
          category: 'Hackathon',
          location: 'Mumbai, India',
          organizer: 'IIT Bombay TechFest Team',
          startDate: '2026-09-20',
          endDate: '2026-09-22',
          registrationDeadline: '2026-09-15',
          domainTags: ['Generative AI', 'Robotics', 'Web3'],
          skillsRequired: ['Python', 'React', 'C++', 'PyTorch'],
          difficultyLevel: 'ADVANCED',
          careerPathMatch: ['AI Researcher', 'Robotics Engineer'],
          learningOutcomes: ['Build edge-AI pipelines', 'Master multi-agent orchestration'],
        },
        {
          id: 'ev-2',
          title: 'Smart India Hackathon (SIH) Regional Round',
          description: 'Government of India nationwide initiative to solve pressing problems of societal interest.',
          category: 'Hackathon',
          location: 'Bengaluru, India',
          organizer: 'Ministry of Education Innovation Cell',
          startDate: '2026-10-05',
          endDate: '2026-10-07',
          registrationDeadline: '2026-09-25',
          domainTags: ['Smart Cities', 'AgriTech', 'FinTech'],
          skillsRequired: ['Full Stack', 'Mobile Dev', 'Cloud Architecture'],
          difficultyLevel: 'INTERMEDIATE',
          careerPathMatch: ['Software Architect', 'Product Manager'],
        },
        {
          id: 'ev-3',
          title: 'Autonomous Agents & LLM Fine-Tuning Masterclass',
          description: '3-day hands-on bootcamp covering QLoRA, vLLM inference server setup, and function-calling agents.',
          category: 'Workshop',
          location: 'Online Webinar',
          organizer: 'HackGuru AI Academy',
          startDate: '2026-09-18',
          endDate: '2026-09-20',
          registrationDeadline: '2026-09-16',
          domainTags: ['LLM Fine-Tuning', 'Agentic Workflows'],
          skillsRequired: ['Python', 'Hugging Face', 'PyTorch'],
          difficultyLevel: 'ADVANCED',
          careerPathMatch: ['LLM Engineer', 'AI Consultant'],
        },
        {
          id: 'ev-4',
          title: 'Deep Learning Fellowship Internship 2026',
          description: 'Paid research internship with top AI lab to train multimodal computer vision and NLP models.',
          category: 'Internship',
          location: 'Bengaluru / Hybrid',
          organizer: 'ACE Intelligence Labs',
          startDate: '2026-10-01',
          endDate: '2026-12-31',
          registrationDeadline: '2026-09-28',
          domainTags: ['Computer Vision', 'NLP', 'PyTorch'],
          skillsRequired: ['Python', 'OpenCV', 'PyTorch'],
          difficultyLevel: 'INTERMEDIATE',
          careerPathMatch: ['AI Fellow', 'ML Engineer'],
        },
        {
          id: 'ev-5',
          title: 'Full Stack Web Dev Bootcamp',
          description: 'Intensive 5-day bootcamp to build and deploy production-grade MERN stack applications.',
          category: 'Workshop',
          location: 'Chennai, India',
          organizer: 'WebCraft India',
          startDate: '2026-10-20',
          endDate: '2026-10-25',
          registrationDeadline: '2026-10-12',
          domainTags: ['React', 'Node.js', 'MongoDB'],
          skillsRequired: ['JavaScript', 'HTML/CSS', 'Basic Node'],
          difficultyLevel: 'BEGINNER',
          careerPathMatch: ['Full Stack Developer', 'Frontend Engineer'],
        },
        {
          id: 'ev-6',
          title: 'Cybersecurity Capture-The-Flag (CTF) Challenge',
          description: 'Inter-college cybersecurity competition covering web exploitation, reverse engineering, and cryptography.',
          category: 'Hackathon',
          location: 'Delhi, India',
          organizer: 'BITS Pilani Cybersec Club',
          startDate: '2026-11-01',
          endDate: '2026-11-02',
          registrationDeadline: '2026-10-25',
          domainTags: ['Web Exploitation', 'Cryptography', 'Forensics'],
          skillsRequired: ['Linux', 'Python', 'Networking'],
          difficultyLevel: 'ADVANCED',
          careerPathMatch: ['Cybersecurity Analyst', 'Penetration Tester'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, [selectedCategory]);

  const handleAnalyzeEvent = async (id: string) => {
    setAnalyzing(true);
    try {
      await eventsApi.analyzeEvent(id);
    } catch { /* silent */ }
    finally { setAnalyzing(false); }
  };

  const handleSave = async (eventId: string) => {
    try {
      await interactionApi.logInteraction(eventId, 'SAVE');
    } catch { /* silent */ }
    setSaved(prev => { const s = new Set(prev); s.has(eventId) ? s.delete(eventId) : s.add(eventId); return s; });
  };

  const handleRegister = async (eventId: string) => {
    try {
      await interactionApi.logInteraction(eventId, 'REGISTER');
    } catch { /* silent */ }
  };

  const filteredEvents = events.filter((e) => {
    const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.domainTags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-violet-600 font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Discover Opportunities
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            College Events &amp; Hackathons
          </h1>
          <p className="text-sm text-neutral-500 mt-1 max-w-xl">
            Browse and filter verified events, competitions, workshops, and internship opportunities from colleges across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filter Bar */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, domain, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ace-input w-full pl-10 pr-4 py-2.5 text-sm"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-0.5 md:pb-0 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto text-xs text-neutral-400 whitespace-nowrap hidden md:block">
            {filteredEvents.length} result{filteredEvents.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Event Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 text-violet-500 animate-spin" />
            <p className="text-sm text-neutral-400">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm font-semibold text-neutral-700 mb-1">No events found</p>
            <p className="text-xs text-neutral-400">Try a different search term or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((ev) => {
              const catBadge = CATEGORY_BADGE_MAP[ev.category] || 'ace-badge-gray';
              const diffBadge = DIFFICULTY_BADGE[ev.difficultyLevel || ''] || 'ace-badge-gray';
              const isSaved = saved.has(ev.id);

              return (
                <div
                  key={ev.id}
                  className="ace-card p-5 flex flex-col group cursor-pointer"
                  onClick={() => setActiveModalEvent(ev)}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`ace-badge ${catBadge}`}>{ev.category}</span>
                      {ev.difficultyLevel && (
                        <span className={`ace-badge ${diffBadge}`}>{ev.difficultyLevel}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSave(ev.id); }}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        isSaved ? 'text-violet-600 bg-violet-50' : 'text-neutral-300 hover:text-violet-500 hover:bg-violet-50'
                      }`}
                      title={isSaved ? 'Saved' : 'Save event'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-violet-600' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-violet-700 transition-colors leading-snug mb-1">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-1">{ev.organizer}</p>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 shrink-0" /> {ev.location}
                  </p>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                    {ev.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                    {(ev.domainTags || []).map((tag, i) => (
                      <span key={i} className="ace-badge ace-badge-gray">#{tag}</span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
                    <span className="text-xs text-neutral-400">
                      Deadline: <span className="text-amber-600 font-semibold">{ev.registrationDeadline}</span>
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRegister(ev.id); }}
                      className="ace-button text-xs px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1"
                    >
                      Register <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeModalEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className={`ace-badge ${CATEGORY_BADGE_MAP[activeModalEvent.category] || 'ace-badge-gray'}`}>
                  {activeModalEvent.category}
                </span>
                {activeModalEvent.difficultyLevel && (
                  <span className={`ace-badge ${DIFFICULTY_BADGE[activeModalEvent.difficultyLevel] || 'ace-badge-gray'}`}>
                    {activeModalEvent.difficultyLevel}
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveModalEvent(null)}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{activeModalEvent.title}</h2>
              <p className="text-sm text-neutral-500 mb-4">
                {activeModalEvent.organizer} &nbsp;·&nbsp;
                <span className="flex items-center gap-1 inline-flex">
                  <MapPin className="w-3 h-3" /> {activeModalEvent.location}
                </span>
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-neutral-800 mb-1">Description</p>
                  <p className="text-neutral-600 leading-relaxed">{activeModalEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-neutral-500 mb-1">Start Date</p>
                    <p className="text-sm font-medium text-neutral-800">{activeModalEvent.startDate}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-neutral-500 mb-1">Registration Deadline</p>
                    <p className="text-sm font-medium text-amber-600">{activeModalEvent.registrationDeadline}</p>
                  </div>
                </div>

                {(activeModalEvent.skillsRequired || []).length > 0 && (
                  <div>
                    <p className="font-semibold text-neutral-800 mb-2">Skills Required</p>
                    <div className="flex flex-wrap gap-2">
                      {(activeModalEvent.skillsRequired || []).map((s, i) => (
                        <span key={i} className="ace-badge ace-badge-violet">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {(activeModalEvent.careerPathMatch || []).length > 0 && (
                  <div>
                    <p className="font-semibold text-neutral-800 mb-2">Career Paths</p>
                    <div className="flex flex-wrap gap-2">
                      {(activeModalEvent.careerPathMatch || []).map((c, i) => (
                        <span key={i} className="ace-badge ace-badge-blue">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {(activeModalEvent.learningOutcomes || []).length > 0 && (
                  <div>
                    <p className="font-semibold text-neutral-800 mb-2">Learning Outcomes</p>
                    <ul className="space-y-1">
                      {(activeModalEvent.learningOutcomes || []).map((lo, i) => (
                        <li key={i} className="text-xs text-neutral-600 flex items-start gap-2">
                          <span className="text-violet-500 mt-0.5">✓</span> {lo}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleAnalyzeEvent(activeModalEvent.id)}
                  disabled={analyzing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 transition-colors font-medium"
                >
                  <Sparkles className={`w-4 h-4 text-violet-500 ${analyzing ? 'animate-spin' : ''}`} />
                  {analyzing ? 'Analyzing...' : 'AI Analysis'}
                </button>

                <button
                  onClick={() => { handleRegister(activeModalEvent.id); setActiveModalEvent(null); }}
                  className="ace-button px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5"
                >
                  Register Now <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
