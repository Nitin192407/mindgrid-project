import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Check, 
  Lock, 
  Smile, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAuth } from '../../context/AuthContext';

export const Onboarding = () => {
  const [step, setStep] = useState(1);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: 'Maya Lin',
    email: 'maya.lin@university.edu',
    studentId: 'U-2024-8849',
    major: 'Cognitive Science & Design',
    year: 'Junior (3rd Year)',
    campus: 'Main North Campus',
    // Consent
    ferpaConsent: true,
    anonymizedResearchConsent: true,
    notificationConsent: true,
    // Baseline wellness goals
    primaryFocus: 'Exam stress & sleep rhythm',
    reminderTime: '08:30 PM'
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinish = () => {
    completeOnboarding(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-calm-600 flex items-center justify-center text-white">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl text-slate-800">MindGrid Setup</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {step === 1 && 'Welcome! Tell us a little about yourself'}
            {step === 2 && 'Privacy, Confidentiality & Consent'}
            {step === 3 && 'Your Personal Wellness Sanctuary'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Step {step} of 3 • Takes less than 2 minutes
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBar value={step} max={3} color="calm" />
        </div>

        <Card className="p-6 sm:p-8 bg-white shadow-soft-lg">
          {/* STEP 1: Student Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-calm-50 p-4 rounded-2xl border border-calm-100 flex items-center gap-3 mb-2">
                <GraduationCap className="w-5 h-5 text-calm-700 flex-shrink-0" />
                <p className="text-xs text-calm-800">
                  MindGrid links seamlessly with your university to provide free mental wellness tools and campus counselors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name / Preferred Name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Maya Lin"
                  required
                />
                <Input
                  label="University Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="student@university.edu"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Student ID (Optional)"
                  value={formData.studentId}
                  onChange={(e) => updateField('studentId', e.target.value)}
                  placeholder="e.g. U-12345"
                />
                <Select
                  label="Academic Year"
                  value={formData.year}
                  onChange={(e) => updateField('year', e.target.value)}
                  options={[
                    'First-Year (Freshman)',
                    'Second-Year (Sophomore)',
                    'Junior (3rd Year)',
                    'Senior (4th Year)',
                    'Graduate / PhD Student'
                  ]}
                />
              </div>

              <Input
                label="Major / Program of Study"
                value={formData.major}
                onChange={(e) => updateField('major', e.target.value)}
                placeholder="e.g. Cognitive Science & Design"
              />
            </div>
          )}

          {/* STEP 2: Strict Privacy & Consent */}
          {step === 2 && (
            <div className="space-y-5 text-left">
              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">100% Student Confidentiality Commitment</h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Your personal reflections, mood check-ins, assessment scores, and AI conversations are strictly private. They are <strong>never shared</strong> with professors, academic deans, parents, or recorded on academic transcripts.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.ferpaConsent}
                    onChange={(e) => updateField('ferpaConsent', e.target.checked)}
                    className="mt-1 rounded text-calm-600 focus:ring-calm-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">Confidential Campus Care Agreement</span>
                    <span className="text-slate-500 leading-relaxed">
                      I understand MindGrid is a supportive wellness tool and not an immediate emergency rescue service. In an acute life crisis, I agree to call 988 or campus crisis lines.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.anonymizedResearchConsent}
                    onChange={(e) => updateField('anonymizedResearchConsent', e.target.checked)}
                    className="mt-1 rounded text-calm-600 focus:ring-calm-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">Contribute to Aggregated Campus Insights (Optional)</span>
                    <span className="text-slate-500 leading-relaxed">
                      Allow anonymized, grouped statistics (e.g. "40% of students report midterm stress") to help the university improve campus counseling staffing.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Personalization & Focus */}
          {step === 3 && (
            <div className="space-y-4 text-left">
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-indigo-900">Tailoring your experience</h4>
                  <p className="text-xs text-indigo-700 mt-0.5">
                    Choose what areas you want MindGrid to gently assist with this semester.
                  </p>
                </div>
              </div>

              <Select
                label="Primary Area of Focus"
                value={formData.primaryFocus}
                onChange={(e) => updateField('primaryFocus', e.target.value)}
                options={[
                  'Exam stress & sleep rhythm',
                  'Procrastination & study momentum',
                  'Social connection & campus belonging',
                  'Mindfulness & grounding practices',
                  'General daily emotional balance'
                ]}
              />

              <Input
                label="Preferred Daily Check-in Reminder Time"
                type="time"
                value={formData.reminderTime.split(' ')[0]}
                onChange={(e) => updateField('reminderTime', e.target.value)}
                helperText="We'll send a calm, one-tap evening notification to reflect on your day."
              />
            </div>
          )}

          {/* Nav Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
            {step > 1 ? (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                icon={ArrowLeft}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                variant="primary"
                onClick={() => setStep(step + 1)}
                icon={ArrowRight}
                iconPosition="right"
                disabled={step === 2 && !formData.ferpaConsent}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleFinish}
                icon={Sparkles}
                iconPosition="right"
              >
                Enter My MindGrid Space
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
