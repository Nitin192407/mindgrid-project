import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  History, 
  Heart, 
  Calendar, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ASSESSMENTS } from '../../data/mockAssessments';
import { useWellness } from '../../context/WellnessContext';

export const Assessments = () => {
  const { assessmentResults } = useWellness();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-calm-700 uppercase tracking-wider mb-1">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Self-Reflection & Screenings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Wellness Assessments
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Standardized, supportive self-reflections to understand your stress, mood, and academic fatigue patterns. These are private, non-diagnostic checks designed to guide your self-care.
        </p>
      </div>

      {/* Reassurance Banner */}
      <div className="p-4 bg-calm-50/80 rounded-2xl border border-calm-100 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-calm-700 flex-shrink-0" />
        <p className="text-xs text-calm-800">
          Your answers are 100% confidential. Scores are never visible to faculty, professors, or added to academic transcripts.
        </p>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ASSESSMENTS.map((assessment) => {
          const pastResult = assessmentResults.find(r => r.assessmentId === assessment.id);

          return (
            <Card key={assessment.id} className="p-6 bg-white flex flex-col justify-between hover:border-calm-300 transition-all shadow-soft">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="teal" size="sm">
                    {assessment.badge}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{assessment.duration}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">
                  {assessment.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {assessment.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                {pastResult ? (
                  <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex justify-between text-slate-500 mb-1">
                      <span>Latest check-in:</span>
                      <span className="font-semibold text-slate-700">{pastResult.level}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Completed {new Date(pastResult.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ) : null}

                <Link to={`/assessments/${assessment.id}`} className="block">
                  <Button
                    variant={pastResult ? 'secondary' : 'primary'}
                    className="w-full"
                    size="sm"
                    icon={pastResult ? RotateCcw : ArrowRight}
                    iconPosition="right"
                  >
                    {pastResult ? 'Retake Check-in' : 'Begin Assessment'}
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* History of Completed Assessments */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <h3 className="text-base font-bold text-slate-800">Your Past Assessment Insights</h3>
        </div>

        {assessmentResults.length === 0 ? (
          <Card className="p-8 text-center bg-white">
            <p className="text-sm text-slate-500">You haven't completed any assessments yet.</p>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {assessmentResults.map((res) => (
              <Card key={res.id} className="p-4 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800">{res.assessmentTitle}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-calm-100 text-calm-800">
                      {res.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Completed on {new Date(res.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Score: {res.score} / {res.maxScore}
                  </p>
                </div>
                <Link to={`/assessments/${res.assessmentId}`}>
                  <Button variant="ghost" size="xs" icon={RotateCcw}>
                    Retake
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
