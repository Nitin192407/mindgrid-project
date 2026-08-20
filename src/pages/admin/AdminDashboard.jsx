import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Activity, 
  Calendar, 
  TrendingUp, 
  Download, 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  Heart, 
  Clock,
  Building,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MOCK_ADMIN_METRICS } from '../../data/mockAdminData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const AdminDashboard = () => {
  const [dataTimeframe, setDataTimeframe] = useState('semester');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const metrics = MOCK_ADMIN_METRICS;

  const handleExportReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>Institutional Wellness Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Campus Mental Health Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {metrics.institutionName} • {metrics.semester}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            onClick={handleExportReport}
            variant="secondary"
            size="sm"
            icon={FileSpreadsheet}
          >
            Export Executive Brief (.csv)
          </Button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-between animate-in fade-in-50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Anonymized semester analytics exported successfully.</span>
          </div>
        </div>
      )}

      {/* Mandatory FERPA Notice Banner */}
      <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
            Protected Institutional Aggregates Only
          </h4>
          <p className="text-xs text-indigo-800/90 mt-0.5 leading-relaxed">
            {metrics.privacyNotice}
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Students</span>
            <div className="p-2 rounded-xl bg-calm-50 text-calm-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">{metrics.activeMindGridStudents.toLocaleString()}</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.activePercentage}%</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Of {metrics.totalEnrolledStudents.toLocaleString()} enrolled</span>
        </Card>

        <Card className="p-5 bg-white shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Check-in Rate</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">{metrics.weeklyCheckinRate}</span>
            <span className="text-xs font-bold text-indigo-600">High engagement</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Active recurring reflection</span>
        </Card>

        <Card className="p-5 bg-white shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Campus Wellness Index</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">{metrics.campusWellnessIndex}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 10.0</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Stable campus sentiment</span>
        </Card>

        <Card className="p-5 bg-white shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Counselor Utilization</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">{metrics.counselorUtilization}</span>
            <span className="text-xs font-bold text-amber-600">Near capacity</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Staffing optimization recommended</span>
        </Card>
      </div>

      {/* Main Trends: Semester Stress vs Mood Curves */}
      <Card className="p-6 bg-white shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Semester Longitudinal Stress vs. Mood Trend</h3>
            <p className="text-xs text-slate-500">
              Aggregate student stress ratings (1-10) vs mood sentiment over 12 academic weeks.
            </p>
          </div>
          <Badge variant="indigo">Fall Semester 2026</Badge>
        </div>

        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.semesterTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3e8174" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#3e8174" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                formatter={(val, name) => [val, name === 'avgStress' ? 'Avg Stress (1-10)' : 'Avg Mood (1-10)']}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              <Area
                type="monotone"
                dataKey="avgStress"
                name="Reported Stress Level"
                stroke="#ef4444"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#stressGrad)"
              />
              <Area
                type="monotone"
                dataKey="avgMood"
                name="Reported Mood Index"
                stroke="#3e8174"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#moodGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Stressors Breakdown & Counselor Capacity (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Reported Stressors Breakdown */}
        <Card className="p-6 bg-white shadow-soft">
          <h3 className="text-base font-bold text-slate-800 mb-1">Primary Reported Stressors</h3>
          <p className="text-xs text-slate-500 mb-4">Distribution of self-tagged wellness influences this term.</p>

          <div className="space-y-3">
            {metrics.stressorsBreakdown.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.category}</span>
                  <span className="text-slate-500">{item.percentage}% ({item.count.toLocaleString()} students)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-calm-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Counselor Capacity vs Demand by Weekday */}
        <Card className="p-6 bg-white shadow-soft">
          <h3 className="text-base font-bold text-slate-800 mb-1">Counselor Staffing & Demand</h3>
          <p className="text-xs text-slate-500 mb-4">Booked slots vs walk-in crisis requests by day of week.</p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.counselorStaffing} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="bookedSlots" name="Scheduled Sessions" fill="#5041dd" radius={[6, 6, 0, 0]} />
                <Bar dataKey="walkInRequests" name="Walk-In / Crisis Needs" fill="#f87171" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Resources Leaderboard */}
      <Card className="p-6 bg-white shadow-soft">
        <h3 className="text-base font-bold text-slate-800 mb-1">Top Utilized Wellness Tools</h3>
        <p className="text-xs text-slate-500 mb-4">Highest completion and engagement rates across student body.</p>

        <div className="divide-y divide-slate-100">
          {metrics.topResources.map((res, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800">{res.title}</span>
                <span className="text-[11px] text-slate-400 block">{res.category} Practice</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">{res.views.toLocaleString()} views</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {res.completions.toLocaleString()} completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
