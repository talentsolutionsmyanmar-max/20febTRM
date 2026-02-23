'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase, MapPin, Building2, Search, X, Star, Flame,
  ChevronRight, Filter, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// Job interface
interface Job {
  id: string;
  title: string;
  titleMm?: string;
  company: string;
  location: string;
  salary?: string;
  reward: number;
  urgent?: boolean;
  skills?: string[];
  level?: string;
}

// Sample jobs data - will be replaced by Supabase data
const sampleJobs: Job[] = [
  { id: '1', title: 'Senior Supervisor', company: 'RK Yangon Steel', location: 'Thanlyin', salary: '7.5L - 10L', reward: 200000, urgent: true, skills: ['Leadership', 'Management'], level: 'Senior' },
  { id: '2', title: 'Warehouse Supervisor', company: 'Universal Energy', location: 'Thingangyun', salary: 'Negotiable', reward: 50000, urgent: true, skills: ['Logistics', 'Inventory'], level: 'Mid' },
  { id: '3', title: 'Content & Script Writer', company: 'Shwe Taung Htun', location: 'Mingalar Taung Nyunt', salary: '4L - 6L', reward: 75000, urgent: true, skills: ['Writing', 'Creative'], level: 'Mid' },
  { id: '4', title: 'Assistant Brand Manager', company: 'Unicharm Myanmar', location: 'Yankin', salary: '15L - 17L', reward: 400000, urgent: true, skills: ['Marketing', 'Branding'], level: 'Senior' },
  { id: '5', title: 'Interior Designer', company: 'Delight Amatat', location: 'Thingangyun', salary: '10L - 15L', reward: 300000, urgent: true, skills: ['Design', 'AutoCAD'], level: 'Senior' },
  { id: '6', title: 'Accountant', company: 'Universal Energy', location: 'Thingangyun', salary: '6L - 7L', reward: 200000, urgent: true, skills: ['Accounting', 'Excel'], level: 'Mid' },
  { id: '7', title: 'Cashier', company: 'Real Aid Microfinance', location: 'Ayeyarwady', salary: '3L+', reward: 50000, urgent: true, skills: ['Cash Handling', 'Customer Service'], level: 'Entry' },
  { id: '8', title: 'Receptionist', company: 'Myanmar IT', location: 'Insein', salary: '3L - 4L', reward: 50000, urgent: true, skills: ['Communication', 'Excel'], level: 'Entry' },
];

const levelColors: Record<string, string> = {
  Entry: 'bg-green-50 text-green-700 border-green-200',
  Mid: 'bg-blue-50 text-blue-700 border-blue-200',
  Senior: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch jobs from Supabase
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/supabase/jobs?limit=50');
        const data = await res.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
    const matchesUrgent = !showUrgentOnly || job.urgent;
    return matchesSearch && matchesLevel && matchesUrgent;
  });

  // Calculate potential earnings (80% to user)
  const calculateUserEarning = (reward: number) => Math.round(reward * 0.8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Open Positions</h1>
              <p className="text-gray-600 mt-1">
                Refer qualified candidates and earn rewards
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                {jobs.length} Positions
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                {jobs.filter(j => j.urgent).length} Urgent
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, companies, locations..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 bg-white"
              >
                <option value="all">All Levels</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
              
              <button
                onClick={() => setShowUrgentOnly(!showUrgentOnly)}
                className={`px-4 py-2.5 rounded-lg border font-medium transition-colors ${
                  showUrgentOnly
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Flame className="h-4 w-4 inline mr-2" />
                Urgent Only
              </button>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing <span className="font-medium text-gray-900">{filteredJobs.length}</span> positions
            </span>
            <span>
              Potential earnings: <span className="font-medium text-teal-600">
                {filteredJobs.reduce((sum, j) => sum + calculateUserEarning(j.reward), 0).toLocaleString()} MMK
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-500 hover:shadow-lg transition-all h-full group cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-medium rounded-full shrink-0">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Building2 className="h-4 w-4 shrink-0" />
                        <span className="truncate">{job.company}</span>
                      </div>
                    </div>
                    {job.level && (
                      <span className={`px-2 py-1 text-xs font-medium rounded border shrink-0 ${levelColors[job.level] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {job.level}
                      </span>
                    )}
                  </div>
                  
                  {/* Location & Salary */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-400">💰</span>
                        <span>{job.salary}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Reward */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">Referral Reward</div>
                        <div className="text-lg font-bold text-teal-600">
                          {job.reward.toLocaleString()} MMK
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">You Keep (80%)</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {calculateUserEarning(job.reward).toLocaleString()} MMK
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-teal-600 font-medium group-hover:text-teal-700">
                      <span>View Details & Refer</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {filteredJobs.length === 0 && !loading && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
