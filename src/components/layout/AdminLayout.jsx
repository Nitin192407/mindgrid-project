import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { CrisisModal } from '../crisis/CrisisModal';
import { ShieldCheck, BarChart3, Users, Clock, FileSpreadsheet } from 'lucide-react';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      {/* Top Anonymized Data Shield Banner */}
      <div className="bg-slate-900 text-white text-xs px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-calm-300">
            <ShieldCheck className="w-4 h-4 text-calm-400 flex-shrink-0" />
            <span className="font-medium">
              FERPA & HIPAA Compliant Institutional Portal • All metrics are anonymized and aggregated ($k \ge 10$)
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Individual student identifiable records are strictly excluded from admin queries
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <CrisisModal />
    </div>
  );
};
