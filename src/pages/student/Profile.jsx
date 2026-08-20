import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  Download, 
  Trash2, 
  Lock, 
  Phone, 
  Check, 
  Sparkles, 
  Moon, 
  Eye,
  LogOut
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || 'Maya Lin');
  const [major, setMajor] = useState(user?.major || 'Cognitive Science & Design');
  const [reminderTime, setReminderTime] = useState(user?.dailyReminder || '08:30 PM');
  const [shareAnonymized, setShareAnonymized] = useState(user?.shareAnonymizedData ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Emergency contact state
  const [contactName, setContactName] = useState(user?.emergencyContact?.name || 'Sarah Lin');
  const [contactPhone, setContactPhone] = useState(user?.emergencyContact?.phone || '(555) 392-1084');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      major,
      dailyReminder: reminderTime,
      shareAnonymizedData: shareAnonymized,
      emergencyContact: {
        name: contactName,
        phone: contactPhone,
        relationship: 'Trusted Contact'
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        user,
        exportedAt: new Date().toISOString(),
        note: "Confidential Student Wellness Export"
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mindgrid_wellness_export_${user?.name?.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-calm-700 uppercase tracking-wider mb-1">
          <User className="w-3.5 h-3.5" />
          <span>Account & Security</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Profile & Privacy Controls
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal information, notification cadence, and FERPA-compliant privacy preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in-50">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Your settings have been saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white shadow-soft">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-calm-600" />
            <span>Student Profile Details</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-calm-200"
            />
            <div className="text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-800">{user?.name}</h4>
              <p className="text-xs text-slate-500">{user?.email} • {user?.studentId || 'U-2024-8849'}</p>
              <Badge variant="teal" size="sm" className="mt-1">
                {user?.year || 'Junior (3rd Year)'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Major / Academic Program"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
        </Card>

        {/* Notifications & Reminders */}
        <Card className="p-6 bg-white shadow-soft">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Check-in Cadence & Reminders</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Evening Check-in Prompt Time"
              type="time"
              value={reminderTime.split(' ')[0]}
              onChange={(e) => setReminderTime(e.target.value)}
              helperText="A subtle reminder to reflect on your day before unwinding."
            />
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-calm-600 focus:ring-calm-500 w-4 h-4" />
                <span>Appointment reminders via email/push</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-calm-600 focus:ring-calm-500 w-4 h-4" />
                <span>Weekly wellness affirmation insights</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-6 bg-white shadow-soft">
          <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-500" />
            <span>Trusted Support Contact</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Optional emergency contact. Displayed inside your crisis modal for fast one-tap calling when you need someone close.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Name & Relationship"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Sarah Lin (Sister)"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="(555) 000-0000"
            />
          </div>
        </Card>

        {/* Privacy & FERPA Controls */}
        <Card className="p-6 bg-white shadow-soft">
          <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict Privacy & FERPA Safeguards</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            MindGrid enforces strict data isolation. Your transcripts, mood scores, and counseling appointments are never accessible to faculty or recorded on educational transcripts.
          </p>

          <div className="space-y-3 pt-1">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={shareAnonymized}
                onChange={(e) => setShareAnonymized(e.target.checked)}
                className="mt-0.5 rounded text-calm-600 focus:ring-calm-500 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Contribute to Aggregated Campus Insights</span>
                <span className="text-slate-500 leading-relaxed">
                  Allow your check-in counts to be combined into anonymous campus aggregates ($N \ge 10$) to help allocate counseling staff.
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-5 mt-4 border-t border-slate-100">
            <Button
              type="button"
              onClick={handleExportData}
              variant="secondary"
              size="sm"
              icon={Download}
            >
              Export My Wellness Data (.json)
            </Button>
            <Button
              type="button"
              onClick={() => alert("Data deletion request submitted. All local state cleared.")}
              variant="ghost"
              size="sm"
              icon={Trash2}
              className="text-rose-600 hover:bg-rose-50"
            >
              Request Data Purge
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Sparkles}
          >
            Save All Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
