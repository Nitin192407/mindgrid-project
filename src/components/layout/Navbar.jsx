import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HeartHandshake, 
  LifeBuoy, 
  Sparkles, 
  Bell, 
  User, 
  LogOut, 
  ShieldCheck, 
  Flame, 
  ChevronDown,
  LayoutDashboard,
  SmilePlus
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useWellness } from '../../context/WellnessContext';

export const Navbar = () => {
  const { user, logout, login, isAdmin } = useAuth();
  const { streak, isTodayLogged, openCrisisModal } = useWellness();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleToggle = () => {
    if (isAdmin) {
      login('student');
      navigate('/dashboard');
    } else {
      login('admin');
      navigate('/admin');
    }
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-calm-600 to-teal-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-800 tracking-tight leading-tight group-hover:text-calm-700 transition-colors">
                  MindGrid
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                  {isAdmin ? 'Campus Admin' : 'Student Wellness'}
                </span>
              </div>
            </Link>

            {/* Quick mode pill */}
            <span className={`hidden sm:inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2 border ${
              isAdmin ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-calm-50 text-calm-800 border-calm-200'
            }`}>
              {isAdmin ? 'Institutional View' : 'Confidential Space'}
            </span>
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Streak & Today status (Student view) */}
            {!isAdmin && (
              <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                  <span>{streak}d streak</span>
                </div>
                <div className="h-3 w-px bg-slate-200" />
                <span className={`text-[11px] font-medium flex items-center gap-1 ${
                  isTodayLogged ? 'text-emerald-700' : 'text-slate-500'
                }`}>
                  {isTodayLogged ? '✓ Checked in' : 'Daily check-in ready'}
                </span>
              </div>
            )}

            {/* PERSISTENT CRISIS BUTTON (One-tap on every screen) */}
            <Button
              onClick={() => openCrisisModal('hotlines')}
              variant="crisis"
              size="sm"
              icon={LifeBuoy}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-sm hover:shadow-crisis-glow transition-all"
            >
              Get Help Now
            </Button>

            {/* User Profile & Demo Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all focus:outline-none"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-calm-200"
                />
                <span className="hidden lg:block text-xs font-semibold text-slate-700 text-left">
                  <span className="block truncate max-w-[100px]">{user?.name}</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in-50 zoom-in-95">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {user?.role === 'admin' ? 'Campus Wellness Admin' : 'Undergraduate Student'}
                      </span>
                    </div>

                    <div className="p-1 space-y-0.5">
                      {!isAdmin && (
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Student Profile & Settings</span>
                        </Link>
                      )}

                      {/* Instant Role Switcher for Pair-Programming Demo */}
                      <button
                        type="button"
                        onClick={handleRoleToggle}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-calm-700 bg-calm-50/70 hover:bg-calm-100 rounded-xl transition-colors text-left"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-calm-600" />
                          <span>Switch to {isAdmin ? 'Student App' : 'Admin Dashboard'}</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase bg-white px-1.5 py-0.5 rounded border border-calm-200">
                          Demo
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          navigate('/welcome');
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
