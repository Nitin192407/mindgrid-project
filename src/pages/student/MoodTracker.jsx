import React, { useState } from 'react';
import { 
  Smile, 
  Moon, 
  Activity, 
  Calendar, 
  Filter, 
  Plus, 
  Sparkles, 
  Lock, 
  TrendingUp, 
  Tag, 
  Clock,
  Heart,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { useWellness } from '../../context/WellnessContext';
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
  Legend 
} from 'recharts';

export const MoodTracker = () => {
  const { moodLogs, logMood, isTodayLogged, avgMood7Days, avgSleep7Days } = useWellness();
  
  const [timeframe, setTimeframe] = useState('30'); // '7', '30', '90'
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);

  // Check-in form state
  const [selectedMood, setSelectedMood] = useState(4);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [stressLevel, setStressLevel] = useState(4);
  const [selectedFactors, setSelectedFactors] = useState(['Academics', 'Sleep']);
  const [journalNote, setJournalNote] = useState('');
  const [checkinDate, setCheckinDate] = useState(new Date().toISOString().split('T')[0]);

  const moodOptions = [
    { score: 5, label: 'Radiant', emoji: '✨', desc: 'Feeling energized, clear, and joyful', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    { score: 4, label: 'Serene', emoji: '🌿', desc: 'Calm, grounded, and content', bg: 'bg-teal-50 text-teal-800 border-teal-300' },
    { score: 3, label: 'Balanced', emoji: '⛅', desc: 'Steady, manageable, ordinary rhythm', bg: 'bg-blue-50 text-blue-800 border-blue-300' },
    { score: 2, label: 'Tender / Low', emoji: '🌧️', desc: 'Sensitive, fatigued, needing extra gentleness', bg: 'bg-amber-50 text-amber-800 border-amber-300' },
    { score: 1, label: 'Overwhelmed', emoji: '🌊', desc: 'High stress, burdened, depleted energy', bg: 'bg-rose-50 text-rose-800 border-rose-300' },
  ];

  const availableFactors = [
    'Academics & Exams',
    'Sleep & Rest',
    'Social & Friendships',
    'Physical Health',
    'Finances & Jobs',
    'Career & Future',
    'Family & Home',
    'Quiet Solitude'
  ];

  const toggleFactor = (factor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleSaveCheckin = async (e) => {
    e.preventDefault();
    await logMood({
      date: checkinDate,
      moodScore: selectedMood,
      moodLabel: moodOptions.find(m => m.score === selectedMood)?.label || 'Balanced',
      sleepHours: Number(sleepHours),
      stressLevel: Number(stressLevel),
      factors: selectedFactors,
      note: journalNote
    });
    setIsCheckinModalOpen(false);
    setJournalNote('');
  };

  // Filter logs by selected timeframe
  const daysCount = parseInt(timeframe, 10);
  const filteredLogs = moodLogs.slice(-daysCount);

  const chartData = filteredLogs.map((log) => ({
    date: log.displayDate || log.date.slice(5),
    mood: log.moodScore,
    sleep: log.sleepHours,
    stress: log.stressLevel
  }));

  // Factor frequency aggregation
  const factorCounts = {};
  filteredLogs.forEach(log => {
    (log.factors || []).forEach(f => {
      factorCounts[f] = (factorCounts[f] || 0) + 1;
    });
  });

  const factorChartData = Object.keys(factorCounts).map(k => ({
    name: k.split(' ')[0],
    count: factorCounts[k]
  })).slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Mood & Wellness Journey
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Non-judgmental reflections on your emotional rhythm, sleep, and stressors.
          </p>
        </div>
        <Button
          onClick={() => setIsCheckinModalOpen(true)}
          variant="primary"
          icon={Plus}
          size="md"
        >
          New Check-in
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-calm-100 text-calm-700">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Average Mood</span>
              <span className="text-xl font-bold text-slate-800">{avgMood7Days} / 5.0</span>
              <span className="text-[11px] text-calm-700 block">Steady emotional baseline</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Average Sleep</span>
              <span className="text-xl font-bold text-slate-800">{avgSleep7Days} hrs</span>
              <span className="text-[11px] text-indigo-600 block">Restorative range</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Logged</span>
              <span className="text-xl font-bold text-slate-800">{moodLogs.length} Days</span>
              <span className="text-[11px] text-amber-800 block">Consistent habit</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Trends Chart Card */}
      <Card className="p-6 bg-white shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Wellness & Rest Patterns</h3>
            <p className="text-xs text-slate-500">
              Comparing your daily emotional mood score (1-5) and sleep duration.
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setTimeframe('7')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeframe === '7' ? 'bg-white text-calm-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframe('30')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeframe === '30' ? 'bg-white text-calm-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Past Month (30d)
            </button>
            <button
              onClick={() => setTimeframe('90')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeframe === '90' ? 'bg-white text-calm-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semester (90d)
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="moodColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3e8174" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3e8174" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="sleepColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5041dd" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#5041dd" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                formatter={(value, name) => [
                  value, 
                  name === 'mood' ? 'Mood Score (1-5)' : (name === 'sleep' ? 'Sleep (hrs)' : 'Stress (1-10)')
                ]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              <Area
                type="monotone"
                dataKey="mood"
                name="Mood Scale (1-5)"
                stroke="#3e8174"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#moodColor)"
              />
              <Area
                type="monotone"
                dataKey="sleep"
                name="Sleep Duration (hrs)"
                stroke="#5041dd"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#sleepColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* History Journal Entries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Past Check-in Reflections</h3>
          <span className="text-xs text-slate-400">100% Encrypted & Private to You</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLogs.slice(-6).reverse().map((log) => (
            <Card key={log.id} className="p-5 bg-white hover:border-calm-200 transition-all">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{moodOptions.find(m => m.score === log.moodScore)?.emoji || '🌿'}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{log.moodLabel || 'Balanced'}</h4>
                    <span className="text-xs text-slate-400">{log.displayDate || log.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full font-medium">
                  <Moon className="w-3.5 h-3.5" />
                  <span>{log.sleepHours}h rest</span>
                </div>
              </div>

              {log.note && (
                <p className="text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100 my-3 leading-relaxed">
                  "{log.note}"
                </p>
              )}

              {log.factors && log.factors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {log.factors.map((f, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-calm-50 text-calm-700 border border-calm-100">
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* New Check-in Modal */}
      <Modal
        isOpen={isCheckinModalOpen}
        onClose={() => setIsCheckinModalOpen(false)}
        title="Mindful Wellness Check-in"
        subtitle="Take a quiet moment to listen to your body and mind."
      >
        <form onSubmit={handleSaveCheckin} className="space-y-5 text-left">
          {/* Emotion selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              How would you describe your overall state right now?
            </label>
            <div className="space-y-2">
              {moodOptions.map((opt) => (
                <div
                  key={opt.score}
                  onClick={() => setSelectedMood(opt.score)}
                  className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedMood === opt.score
                      ? `${opt.bg} shadow-xs font-semibold`
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <span className="text-sm font-bold block">{opt.label}</span>
                      <span className="text-xs opacity-80">{opt.desc}</span>
                    </div>
                  </div>
                  {selectedMood === opt.score && (
                    <CheckCircle2 className="w-5 h-5 text-current flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sleep and Stress sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Sleep Duration</span>
                <span className="text-indigo-700 font-bold">{sleepHours} hrs</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Stress Level</span>
                <span className="text-calm-700 font-bold">{stressLevel} / 10</span>
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
            </div>
          </div>

          {/* Influencing factors tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              What has influenced your energy today? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableFactors.map((factor) => {
                const isSelected = selectedFactors.includes(factor);
                return (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => toggleFactor(factor)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-calm-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {factor}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Private reflection text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Private Journal Reflection (Optional)
            </label>
            <textarea
              rows="3"
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="Write anything you want to unburden or remember..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-calm-500/20 focus:border-calm-500 outline-none"
            />
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>Only accessible by you on your encrypted device.</span>
            </span>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCheckinModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={Sparkles}
            >
              Save Reflection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
