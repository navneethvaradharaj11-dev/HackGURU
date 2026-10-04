'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User, GraduationCap, MapPin, Briefcase, Check, X, AlertCircle,
  Save, Edit2, Sparkles, TrendingUp, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import { useAuth } from '@/contexts/AuthContext';

// --- PRESERVE EXISTING PROFILE & RECOMMENDATION INTEGRATION ---
// In the real repository, replace these mock interfaces/services with actual implementations.
export interface StudentProfile {
  id: string;
  name: string;
  college?: string;
  department?: string;
  year?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  eventPreferences: string[];
  modePreferences: string[];
  careerGoals: string[];
  locationPreferences: string[];
  profileCompletion: number;
}

export interface RecommendationResult {
  events: EventCardProps[];
  total: number;
}

const fetchProfile = async (userId: string): Promise<StudentProfile> => {
  await new Promise((res) => setTimeout(res, 500));
  return {
    id: userId,
    name: 'Navneeth V.',
    college: 'Kumaraguru College of Technology',
    department: 'B.Tech Information Technology',
    year: '2nd Year',
    bio: 'Passionate about AI and building scalable solutions. Actively looking for hackathons and internship opportunities.',
    skills: ['Python', 'React', 'JavaScript', 'SQL'],
    interests: ['Artificial Intelligence', 'Web Development', 'Data Science'],
    eventPreferences: ['Hackathons', 'Workshops', 'Internships'],
    modePreferences: ['Offline', 'Online'],
    careerGoals: ['Software Engineering', 'AI/ML'],
    locationPreferences: ['Coimbatore', 'Chennai', 'Bengaluru'],
    profileCompletion: 75,
  };
};

const updateProfile = async (userId: string, data: Partial<StudentProfile>): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 600));
  return true;
};

const fetchRecommendations = async (userId: string): Promise<RecommendationResult> => {
  await new Promise((res) => setTimeout(res, 400));
  return {
    events: [
      {
        id: '1', title: 'AI Innovation Challenge 2026', category: 'Hackathon', organizer: 'IIT Bombay',
        location: 'Mumbai', mode: 'Offline', date: '26 Oct 2026', deadlineInDays: 3,
        skills: ['Python', 'AI'], matchScore: 94,
        image: 'https://images.unsplash.com/photo-1531497865144-2d6e3c1e6f1e?auto=format&fit=crop&w=800&q=80'
      },
    ],
    total: 1,
  };
};

// Static options
const availableInterests = ['Artificial Intelligence', 'Machine Learning', 'Web Development', 'Mobile Development', 'Cybersecurity', 'Data Science', 'Cloud Computing', 'IoT', 'Blockchain', 'Entrepreneurship', 'Design', 'DevOps'];
const availableSkills = ['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'C', 'C++', 'SQL', 'AWS', 'Docker', 'TensorFlow', 'PyTorch', 'Flutter'];
const availableEventTypes = ['Hackathons', 'Workshops', 'Competitions', 'Internships', 'Conferences', 'Webinars', 'Cultural Events', 'Sports'];
const availableModes = ['Online', 'Offline', 'Hybrid'];
const availableGoals = ['Software Engineering', 'AI/ML', 'Data Science', 'Cybersecurity', 'Product Development', 'Entrepreneurship', 'Research', 'Higher Studies'];

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Editable form state
  const [formData, setFormData] = useState<StudentProfile | null>(null);

  useEffect(() => {
    let isMounted = true;
    const userId = user?.id || 'student-demo';

    const loadProfile = async () => {
      setLoading(true);
      setError(false);
      try {
        const p = await fetchProfile(userId);
        if (isMounted) {
          const anyUser = user as Record<string, unknown> | null;
          const resolvedProfile: StudentProfile = {
            ...p,
            name: user?.fullName || p.name,
            college: user?.collegeName || p.college,
            skills: (Array.isArray(anyUser?.skills) && anyUser.skills.length > 0) ? (anyUser.skills as string[]) : p.skills,
            interests: (Array.isArray(anyUser?.interests) && anyUser.interests.length > 0) ? (anyUser.interests as string[]) : p.interests,
          };
          setProfile(resolvedProfile);
          setFormData(resolvedProfile);
          const recs = await fetchRecommendations(userId);
          setRecommendations(recs.events);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const toggleArrayValue = (key: keyof StudentProfile, value: string) => {
    if (!formData) return;
    const current = (formData[key] as string[]) || [];
    const exists = current.includes(value);
    setFormData({
      ...formData,
      [key]: exists ? current.filter(v => v !== value) : [...current, value],
    });
  };

  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(false);
    try {
      const userId = user?.id || formData.id;
      const success = await updateProfile(userId, formData);
      if (success) {
        setProfile(formData);
        setEditMode(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        // Refresh recommendations after profile update
        const recs = await fetchRecommendations(userId);
        setRecommendations(recs.events);
      } else {
        setSaveError(true);
      }
    } catch (err) {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData(profile);
      setEditMode(false);
    }
  };

  if (loading) return <SkeletonLayout />;
  if (error || !profile || !formData) return <ErrorState />;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 24px 64px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
            My Profile
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '17px' }}>
            Build your student profile to discover events and opportunities that match your goals.
          </p>
        </div>

        {/* Success/Error Toast */}
        {saveSuccess && (
          <div style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600, fontSize: '14px' }}>
            <Check size={18} /> Profile updated successfully.
          </div>
        )}
        {saveError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--error)', fontWeight: 600, fontSize: '14px' }}>
            <AlertCircle size={18} /> Failed to save profile. Please try again.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', marginBottom: '64px' }}>
          
          {/* Left Column - Main Profile Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Profile Header Card */}
            <Card style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--violet-50)', color: 'var(--violet-600)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <User size={32} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px' }}>{profile.name}</h2>
                    {profile.department && <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: '0 0 2px' }}>{profile.department}</p>}
                    {profile.college && <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{profile.college}</p>}
                    {profile.year && <Badge tone="violet" style={{ marginTop: '8px' }}>{profile.year}</Badge>}
                  </div>
                </div>
                
                {editMode ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={saving}>Cancel</Button>
                    <Button variant="primary" size="sm" onClick={handleSave} leftIcon={saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" leftIcon={<Edit2 size={14} />} onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </Card>

            {/* About Me */}
            <Section title="About Me" editable={editMode}>
              {editMode ? (
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Write a short bio about yourself..."
                  style={textareaStyle}
                  maxLength={300}
                />
              ) : (
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {profile.bio || 'No bio added yet.'}
                </p>
              )}
            </Section>

            {/* Interests */}
            <Section title="Interests" editable={editMode}>
              <ChipSelector
                options={availableInterests}
                selected={formData.interests}
                onToggle={(val) => toggleArrayValue('interests', val)}
                editable={editMode}
                emptyText="No interests selected yet."
              />
            </Section>

            {/* Skills */}
            <Section title="Skills" editable={editMode}>
              <ChipSelector
                options={availableSkills}
                selected={formData.skills}
                onToggle={(val) => toggleArrayValue('skills', val)}
                editable={editMode}
                emptyText="No skills added yet."
              />
            </Section>

            {/* Event Preferences */}
            <Section title="Event Preferences" subtitle="What types of events are you interested in?" editable={editMode}>
              <ChipSelector
                options={availableEventTypes}
                selected={formData.eventPreferences}
                onToggle={(val) => toggleArrayValue('eventPreferences', val)}
                editable={editMode}
                emptyText="No preferences selected yet."
              />
            </Section>

            {/* Mode Preferences */}
            <Section title="Preferred Mode" editable={editMode}>
              <ChipSelector
                options={availableModes}
                selected={formData.modePreferences}
                onToggle={(val) => toggleArrayValue('modePreferences', val)}
                editable={editMode}
                emptyText="No mode preference selected."
              />
            </Section>

            {/* Location Preferences */}
            <Section title="Preferred Locations" editable={editMode}>
              <ChipSelector
                options={['Coimbatore', 'Chennai', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Online']}
                selected={formData.locationPreferences}
                onToggle={(val) => toggleArrayValue('locationPreferences', val)}
                editable={editMode}
                emptyText="No location preferences set."
              />
            </Section>

            {/* Career Goals */}
            <Section title="Career Goals" editable={editMode}>
              <ChipSelector
                options={availableGoals}
                selected={formData.careerGoals}
                onToggle={(val) => toggleArrayValue('careerGoals', val)}
                editable={editMode}
                emptyText="No career goals set."
              />
            </Section>
          </div>

          {/* Right Column - Profile Completion & Quick Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px' }}>Profile Completion</h3>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F4F4F5" strokeWidth="12" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--violet-600)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={`${(profile.profileCompletion / 100) * 314} 314`} />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{profile.profileCompletion}%</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                Complete your profile to improve event recommendations.
              </p>
            </Card>

            <Card style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px' }}>Quick Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <StatRow icon={<Briefcase size={16} />} label="Skills" value={profile.skills.length} />
                <StatRow icon={<TrendingUp size={16} />} label="Interests" value={profile.interests.length} />
                <StatRow icon={<MapPin size={16} />} label="Locations" value={profile.locationPreferences.length} />
              </div>
            </Card>
          </div>
        </div>

        {/* Recommended Events Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Sparkles size={24} color="var(--violet-600)" />
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Recommended For You</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: '4px 0 0 0' }}>Based on your interests and skills</p>
            </div>
          </div>
          
          {recommendations.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {recommendations.map(e => <EventCard key={e.id} {...e} />)}
            </div>
          ) : (
            <Card style={{ padding: '48px', textAlign: 'center' }}>
              <Sparkles size={40} color="var(--violet-600)" style={{ marginBottom: '12px', margin: '0 auto' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>No recommendations yet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                Complete your profile to get personalized event recommendations.
              </p>
              <Link href="/events">
                <Button variant="primary">Explore Events</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>

      {/* Responsive Override */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// --- SUBCOMPONENTS & STYLES ---

const Section = ({ title, subtitle, children, editable }: { title: string; subtitle?: string; children: React.ReactNode; editable?: boolean }) => (
  <Card style={{ padding: '24px' }}>
    <div style={{ marginBottom: '16px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{title}</h3>
      {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{subtitle}</p>}
    </div>
    {children}
  </Card>
);

const ChipSelector = ({ options, selected, onToggle, editable, emptyText }: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  editable: boolean;
  emptyText: string;
}) => {
  const safeSelected = selected || [];
  if (!editable) {
    return safeSelected.length > 0 ? (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {safeSelected.map(item => <Badge key={item} tone="violet">{item}</Badge>)}
      </div>
    ) : (
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>{emptyText}</p>
    );
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {options.map(opt => {
        const isSelected = safeSelected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            style={chipStyle(isSelected)}
            aria-pressed={isSelected}
          >
            {isSelected && <Check size={14} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
};

const chipStyle = (active: boolean): React.CSSProperties => active
  ? { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: 'var(--r-pill, 999px)', background: 'var(--violet-600, #6D28D9)', color: '#fff', border: '1px solid var(--violet-600, #6D28D9)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }
  : { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: 'var(--r-pill, 999px)', background: 'var(--bg-card, #FFFFFF)', color: 'var(--text-secondary, #52525B)', border: '1px solid var(--border-soft, #E4E4E7)', fontWeight: 500, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' };

const textareaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100px',
  padding: '12px',
  border: '1px solid var(--border-soft, #E4E4E7)',
  borderRadius: '10px',
  fontSize: '15px',
  fontFamily: 'inherit',
  background: 'var(--bg-card, #FFFFFF)',
  color: 'var(--text-primary, #171717)',
  resize: 'vertical',
  outline: 'none',
};

const StatRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-soft, #E4E4E7)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ color: 'var(--violet-600, #6D28D9)' }}>{icon}</span>
      <span style={{ fontSize: '14px', color: 'var(--text-secondary, #52525B)', fontWeight: 500 }}>{label}</span>
    </div>
    <span style={{ fontSize: '16px', fontWeight: 700 }}>{value}</span>
  </div>
);

const SkeletonLayout = () => (
  <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh' }}>
    <div className="container" style={{ padding: '40px 24px 64px' }}>
      <div style={{ height: '32px', width: '120px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '20px', width: '300px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '32px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-lg, 16px)', padding: '24px', animation: 'pulse 1.5s infinite' }}>
              <div style={{ height: '20px', width: '150px', background: '#F4F4F5', borderRadius: '4px', marginBottom: '16px' }} />
              <div style={{ height: '12px', width: '80%', background: '#F4F4F5', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '12px', width: '60%', background: '#F4F4F5', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--border-soft, #E4E4E7)', borderRadius: 'var(--r-lg, 16px)', padding: '24px', height: '300px', animation: 'pulse 1.5s infinite' }} />
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div style={{ background: 'var(--bg-page, #FCFCFD)', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <AlertCircle size={48} color="var(--error, #DC2626)" style={{ marginBottom: '16px' }} />
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>We couldn&apos;t load your profile.</h1>
      <p style={{ color: 'var(--text-muted, #71717A)', marginBottom: '24px' }}>An error occurred while fetching your data.</p>
      <Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  </div>
);
