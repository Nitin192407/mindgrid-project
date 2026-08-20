import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Smile,
  ClipboardList,
  Bot,
  BookOpen,
  CalendarCheck,
  User,
  ShieldCheck,
  Sparkles,
  Wind
} from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';

export const Sidebar = () => {
  const { openCrisisModal } = useWellness();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/mood-tracker', label: 'Mood & Wellness', icon: Smile },
    { to: '/assessments', label: 'Assessments', icon: ClipboardList },
    { to: '/ai-assistant', label: 'AI Support Companion', icon: Bot, badge: 'AI' },
    { to: '/resources', label: 'Resources Library', icon: BookOpen },
    { to: '/counselors', label: 'Book Counselor', icon: CalendarCheck },
    { to: '/profile', label: 'Profile & Privacy', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/80 bg-white/80 backdrop-blur-sm p-4 min-h-[calc(100vh-4rem)] sticky top-16">
      <div className="space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Student Wellness Hub
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-calm-50 text-calm-800 font-semibold shadow-xs border border-calm-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-calm-600" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-serene-100 text-serene-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Calming Micro Widget in Sidebar */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-calm-50/90 to-lavender-50/80 border border-calm-100 mt-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Wind className="w-4 h-4 text-calm-600 animate-pulse-subtle" />
          <span className="text-xs font-bold text-slate-800">Need a 60s pause?</span>
        </div>
        <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
          Reset your focus before your next lecture or study sprint.
        </p>
        <button
          onClick={() => openCrisisModal('breathe')}
          className="w-full text-xs font-semibold py-1.5 px-3 rounded-xl bg-white hover:bg-calm-100 text-calm-800 border border-calm-200 transition-colors shadow-2xs"
        >
          Quick Breath Reset
        </button>
      </div>
    </aside>
  );
};
