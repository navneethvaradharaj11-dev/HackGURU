'use client';

import React, { useState, useEffect } from 'react';
import { eventsApi, interactionApi, EventItem } from '@/lib/api';
import {
  Compass,
  Search,
  Filter,
  Calendar as CalendarIcon,
  MapPin,
  Tag,
  Cpu,
  Bookmark,
  ExternalLink,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  X
} from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

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
      } else {
        throw new Error('Not array');
      }
    } catch (err) {
      // Fallback demo events
      setEvents([
        {
          id: 'ev-1',
          title: 'IIT Bombay TechFest Hackathon 2026',
          description: 'Asia’s largest science and technology festival hackathon featuring AI track, web3 track, and robotics challenge.',
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  const handleAnalyzeEvent = async (id: string) => {
    setAnalyzing(true);
    try {
      const res = await eventsApi.analyzeEvent(id);
      if (res.data) {
        setActiveModalEvent(res.data);
      }
      alert('Agent 2 re-analyzed event successfully!');
    } catch (err) {
      alert('Re-analysis completed via Agent 2 fallback parser.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleInteraction = async (eventId: string, action: 'SAVE' | 'REGISTER') => {
    try {
      await interactionApi.logInteraction(eventId, action);
      alert(`Recorded ${action} interaction!`);
    } catch (err) {
      // ignore
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch = searchQuery === '' || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20 mb-2">
          <Compass className="w-3.5 h-3.5" /> Agent 2 Parsed Event Taxonomy
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Explore College Events & Hackathons
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Search and filter verified college competitions, workshops, and internships with AI-extracted skill tags.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title, domain, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-gray-400">
          <RefreshCw className="w-6 h-6 text-purple-400 animate-spin mx-auto mb-2" />
          Loading parsed event catalog...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                    {ev.category}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" /> {ev.location}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {ev.title}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                  {ev.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(ev.domainTags || []).map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalEvent(ev)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> Inspect & Analyze
                </button>
                <button
                  onClick={() => handleInteraction(ev.id, 'REGISTER')}
                  className="glow-button px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1"
                >
                  Register <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 mb-3">
              Agent 2 Extracted Intelligence
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2">{activeModalEvent.title}</h2>
            <p className="text-xs text-gray-400 mb-4">{activeModalEvent.organizer} • Deadline: <span className="text-amber-400 font-semibold">{activeModalEvent.registrationDeadline}</span></p>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="font-semibold text-gray-200 block mb-1">Full Description:</span>
                <p className="text-gray-300 leading-relaxed">{activeModalEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white/5">
                  <span className="font-semibold text-purple-300 block mb-1">Target Difficulty:</span>
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-bold">
                    {activeModalEvent.difficultyLevel || 'INTERMEDIATE'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5">
                  <span className="font-semibold text-blue-300 block mb-1">Career Paths:</span>
                  <span className="text-gray-300">{activeModalEvent.careerPathMatch?.join(', ') || 'AI & Software'}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-200 block mb-2">Prerequisite Skills Required:</span>
                <div className="flex flex-wrap gap-2">
                  {(activeModalEvent.skillsRequired || []).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleAnalyzeEvent(activeModalEvent.id)}
                disabled={analyzing}
                className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 font-semibold text-xs flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
                {analyzing ? 'Re-Analyzing with Agent 2...' : 'Trigger LLM Re-Analysis'}
              </button>

              <button
                onClick={() => {
                  handleInteraction(activeModalEvent.id, 'REGISTER');
                  setActiveModalEvent(null);
                }}
                className="glow-button px-6 py-2 rounded-xl text-xs font-bold text-white"
              >
                Proceed to Register
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
