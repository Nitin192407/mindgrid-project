import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  Smile, 
  MessageCircle, 
  BookOpen, 
  CalendarCheck,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export const Welcome = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoStudent = () => {
    login('student');
    navigate('/dashboard');
  };

  const handleDemoAdmin = () => {
    login('admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-calm-50/70 via-slate-50 to-serene-50/40 flex flex-col">
      {/* Top minimal header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-calm-600 to-teal-500 flex items-center justify-center text-white shadow-soft">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">MindGrid</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="secondary" size="sm">Sign In</Button>
          </Link>
          <Link to="/onboarding">
            <Button variant="primary" size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-calm-100 text-calm-800 text-xs font-semibold mb-6 border border-calm-200 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Safe, Non-Clinical Space for University Students</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6">
          Your Mind Matters. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-calm-600 via-teal-600 to-indigo-600">
            Navigate College Calmly.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed font-normal">
          MindGrid is your campus mental wellness sanctuary. Track your mood without judgment, access guided de-escalation tools, chat with an empathetic AI companion, and book confidential university counseling.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
          <Link to="/onboarding" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto px-8">
              Start Confidential Check-in
            </Button>
          </Link>
          <Button onClick={handleDemoStudent} size="lg" variant="secondary" className="w-full sm:w-auto">
            Explore Demo Student App
          </Button>
          <Button onClick={handleDemoAdmin} size="lg" variant="soft" className="w-full sm:w-auto">
            View Institutional Analytics
          </Button>
        </div>

        {/* Privacy Pill */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-full border border-slate-200/80 shadow-2xs mb-12">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>FERPA & HIPAA Compliant • 100% Confidential • No Grades or Faculty Access</span>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left w-full">
          <Card hoverable className="p-5 bg-white/90">
            <div className="w-10 h-10 rounded-xl bg-calm-100 text-calm-700 flex items-center justify-center mb-3">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Gentle Mood Tracker</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track energy, sleep, and stress trends over 7, 30, and 90 days with zero pressure.
            </p>
          </Card>

          <Card hoverable className="p-5 bg-white/90">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">AI Wellness Guide</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Somatic grounding exercises, study stress debriefs, and seamless counselor escalation.
            </p>
          </Card>

          <Card hoverable className="p-5 bg-white/90">
            <div className="w-10 h-10 rounded-xl bg-lavender-100 text-lavender-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Student Library</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dorm sleep hygiene, procrastination reframing, and guided body scan audio tracks.
            </p>
          </Card>

          <Card hoverable className="p-5 bg-white/90">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Counselor Booking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Confidential in-person and encrypted video appointments with university therapists.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
