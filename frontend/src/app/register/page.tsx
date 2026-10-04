'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api';
import { Trophy, GraduationCap, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    collegeName: '',
    branch: '',
    degree: 'B.Tech',
    careerGoal: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.register(formData);
      login(res.token || 'demo-jwt-token-hackguru', res.student || formData);
      router.push('/dashboard');
    } catch {
      // Fallback demo registration
      login('demo-jwt-token-hackguru', formData);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-sm max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Trophy className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Create your Student Profile</h1>
          <p className="text-xs text-gray-500 mt-1">Get personalized event matching across 500+ Indian colleges</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Navneeth V"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">College Name</label>
              <input
                type="text"
                required
                placeholder="e.g. IIT Bombay / BITS Pilani"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Branch / Major</label>
              <input
                type="text"
                required
                placeholder="e.g. Computer Science"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Degree</label>
              <select
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer"
              >
                <option value="B.Tech">B.Tech / B.E.</option>
                <option value="B.Sc">B.Sc / BCA</option>
                <option value="M.Tech">M.Tech / M.E.</option>
                <option value="MBA">MBA / PGDM</option>
                <option value="PhD">PhD / Research Scholar</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primary Career Target</label>
              <input
                type="text"
                required
                placeholder="e.g. AI Engineer, Full Stack"
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Create a secure password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
            />
          </div>

          <p className="text-[11px] text-gray-500 leading-normal pt-1">
            By clicking Agree &amp; Join, you agree to the AllCollegeEvent User Agreement, Privacy Policy, and Cookie Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-violet-600 hover:bg-violet-700 font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-1.5 transition-colors shadow-2xs mt-4 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Agree & Join AllCollegeEvent'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-violet-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
