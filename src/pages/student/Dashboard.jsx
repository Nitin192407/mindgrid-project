import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Smile, 
  Moon, 
  Activity, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Bot, 
  Wind, 
  BookOpen, 
  CheckCircle2, 
  RefreshCw,
  Heart,
  ChevronRight,
  ShieldCheck,
  Video
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const AFFIRMATIONS = [
  "You don't have to carry the whole semester in one day. Focus only on this hour.",
  "Rest is not a reward you earn after burning out; rest is essential maintenance.",
  "Your worth as a human being is never defined by grades, test scores, or productivity.",
  "It is okay to pause, take a deep breath, and ask for support when things feel heavy.",
  "Small, gentle steps forward are still meaningful progress."
];

export const Dashboard = () => {
  const { user } = useAuth();
  const { 
    moodLogs, 
    isTodayLogged, 
    todayEntry, 
    logMood, 
    streak, 
    avgMood7Days, 
    avgSleep7Days, 
    upcomingAppointment,
    openCrisisModal 
  } = useWellness();

  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [selectedMood, setSelectedMood] = useState(4);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [stressLevel, setStressLevel] = useState(4);
  const [quickNote, setQuickNote] = useState('');
  const [isSubmittingCheckin, setIsSubmittingCheckin] = useState(false);
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false);

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const moodOptions = [
    { score: 5, label: 'Radiant', emoji: '✨', color: 'hover:bg-emerald-50 hover:border-emerald-300' },
    { score: 4, label: 'Serene', emoji: '🌿', color: 'hover:bg-teal-50 hover:border-teal-300' },
    { score: 3, label: 'Balanced', emoji: '⛅', color: 'hover:bg-blue-50 hover:border-blue-300' },
    { score: 2, label: 'Tender', emoji: '🌧️', color: 'hover:bg-amber-50 hover:border-amber-300' },
    { score: 1, label: 'Overwhelmed', emoji: '🌊', color: 'hover:bg-rose-50 hover:border-rose-300' },
  ];

  const handleQuickCheckin = async (e) => {
    e.preventDefault();
    setIsSubmittingCheckin(true);
    await logMood({
      moodScore: selectedMood,
      moodLabel: moodOptions.find(m => m.score === selectedMood)?.label || 'Balanced',
      sleepHours: Number(sleepHours),
      stressLevel: Number(stressLevel),
      note: quickNote,
      factors: ['Academics', 'Sleep']
    });
    setIsSubmittingCheckin(false);
    setShowCheckinSuccess(true);
    setTimeout(() => setShowCheckinSuccess(false), 4000);
  };

  // Sparkline data for recent 7 days
  const chartData = moodLogs.slice(-7).map(item => ({
    day: item.displayDate || item.date.slice(5),
    mood: item.moodScore,
    sleep: item.sleepHours
  }));

  const nextAffirmation = () => {
    setAffirmationIdx((prev) => (prev + 1) % AFFIRMATIONS.length);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-calm-50 via-serene-50/50 to-lavender-50/40 p-6 sm:p-8 rounded-3xl border border-calm-100/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-calm-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to your sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Maya'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Take a slow breath in and out. Here is your wellness snapshot and supportive tools for today.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            onClick={() => openCrisisModal('breathe')}
            variant="soft"
            size="md"
            icon={Wind}
          >
            1-Min Calm Reset
          </Button>
          <Link to="/ai-assistant">
            <Button
              variant="primary"
              size="md"
              icon={Bot}
            >
              Talk with AI Guide
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak Card */}
        <Card hoverable className="p-5 bg-white border-amber-100/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mindful Streak</span>
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <Flame className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">{streak}</span>
            <span className="text-xs font-medium text-slate-500">consecutive days</span>
          </div>
          <p className="text-xs text-amber-800 bg-amber-50/70 px-2.5 py-1.5 rounded-xl mt-3 font-medium">
            🔥 Fantastic self-awareness rhythm this week!
          </p>
        </Card>

        {/* 7-Day Mood & Sleep Average */}
        <Card hoverable className="p-5 bg-white border-teal-100/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">7-Day Averages</span>
            <div className="p-2 bg-calm-50 rounded-xl text-calm-700">
              <Smile className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-2xl font-extrabold text-slate-800">{avgMood7Days}</span>
              <span className="text-[11px] text-slate-400 block font-medium">/ 5.0 Mood Index</span>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-800">{avgSleep7Days}h</span>
              <span className="text-[11px] text-slate-400 block font-medium">Avg Rest</span>
            </div>
          </div>
          <Link to="/mood-tracker" className="text-xs text-calm-700 font-semibold hover:underline mt-3 inline-flex items-center gap-1">
            <span>View 30-day wellness trends</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </Card>

        {/* Upcoming Counselor Session */}
        <Card hoverable className="p-5 bg-white border-indigo-100/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Session</span>
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          {upcomingAppointment ? (
            <div>
              <h4 className="text-sm font-bold text-slate-800 truncate">{upcomingAppointment.counselorName}</h4>
              <div className="flex items-center gap-2 text-xs text-indigo-700 font-medium mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{upcomingAppointment.date} • {upcomingAppointment.time.split('-')[0]}</span>
              </div>
              <Link to="/counselors" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition-colors">
                <Video className="w-3.5 h-3.5" />
                <span>Join Telehealth Portal</span>
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500">No appointments scheduled.</p>
              <Link to="/counselors" className="text-xs text-indigo-600 font-semibold hover:underline mt-2 inline-flex items-center gap-1">
                <span>Browse campus counselors</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </Card>
      </div>

      {/* Main Section: Daily Check-in & Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Check-in Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 bg-white shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Today's Mood Reflection</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isTodayLogged ? 'You recorded your reflection for today.' : 'How are you feeling right in this moment?'}
                </p>
              </div>
              {isTodayLogged && (
                <Badge variant="emerald" icon={CheckCircle2}>
                  Logged Today
                </Badge>
              )}
            </div>

            {showCheckinSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium mb-4 animate-in fade-in-50">
                ✨ Reflection saved! Thank you for taking a mindful moment for yourself.
              </div>
            )}

            {/* Quick Check-in Form */}
            <form onSubmit={handleQuickCheckin} className="space-y-4">
              {/* Emotion Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select your current state:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((opt) => (
                    <button
                      key={opt.score}
                      type="button"
                      onClick={() => setSelectedMood(opt.score)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all text-center ${
                        selectedMood === opt.score
                          ? 'bg-calm-100 border-calm-500 text-calm-900 shadow-sm scale-105 font-bold'
                          : `bg-slate-50/70 border-slate-200 text-slate-600 ${opt.color}`
                      }`}
                    >
                      <span className="text-2xl mb-1">{opt.emoji}</span>
                      <span className="text-[11px] font-medium leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders for Sleep and Stress */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Last Night's Sleep</span>
                    </span>
                    <span className="font-bold text-indigo-700">{sleepHours} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>4h (Short)</span>
                    <span>8h (Ideal)</span>
                    <span>11h+</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-calm-600" />
                      <span>Current Stress</span>
                    </span>
                    <span className="font-bold text-calm-700">{stressLevel} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-calm-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 (Serene)</span>
                    <span>5 (Moderate)</span>
                    <span>10 (High)</span>
                  </div>
                </div>
              </div>

              {/* Optional Note */}
              <div>
                <input
                  type="text"
                  placeholder="Optional: What's on your mind today? (100% private)"
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-calm-500/20 focus:border-calm-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Encrypted & confidential</span>
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={isSubmittingCheckin}
                >
                  {isTodayLogged ? 'Update Today\'s Check-in' : 'Save Daily Check-in'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Gentle Daily Affirmation */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-warmth-50 via-lavender-50 to-serene-50 border border-warmth-200/60 shadow-xs flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-amber-400" />
                <span>Daily Affirmation</span>
              </div>
              <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
                "{AFFIRMATIONS[affirmationIdx]}"
              </p>
            </div>
            <button
              onClick={nextAffirmation}
              title="Next affirmation"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Mini Trend Chart & Suggested Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Mini 7-Day Trend Chart */}
          <Card className="p-5 bg-white shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-800">7-Day Mood Rhythm</h4>
                <p className="text-xs text-slate-400">Emotional energy vs. sleep</p>
              </div>
              <Link to="/mood-tracker" className="text-xs text-calm-700 font-semibold hover:underline">
                Full Details
              </Link>
            </div>

            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="calmMoodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3e8174" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3e8174" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[1, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #e2e8f0' }}
                    formatter={(val, name) => [val, name === 'mood' ? 'Mood (1-5)' : 'Sleep (hrs)']}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="#3e8174"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#calmMoodGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Gentle Suggested Actions */}
          <Card className="p-5 bg-white shadow-soft">
            <h4 className="text-sm font-bold text-slate-800 mb-3">Gentle Suggestions for Today</h4>
            <div className="space-y-2.5">
              <Link
                to="/assessments"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-calm-50/80 border border-slate-100 hover:border-calm-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-calm-700 shadow-2xs">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-calm-800">
                      Midterm Wellness Check-in
                    </span>
                    <span className="text-[11px] text-slate-500 block">3-min GAD-7 / PHQ-9 screen</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-calm-600 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/resources"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-indigo-700 shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-800">
                      Dorm Sleep Hygiene Guide
                    </span>
                    <span className="text-[11px] text-slate-500 block">5-min practical read</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/counselors"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-lavender-50/80 border border-slate-100 hover:border-lavender-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-lavender-700 shadow-2xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-lavender-800">
                      Meet Campus Counselor
                    </span>
                    <span className="text-[11px] text-slate-500 block">Slots open today & tomorrow</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-lavender-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
