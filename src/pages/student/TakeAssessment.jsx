import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  CalendarCheck, 
  BookOpen, 
  Wind,
  ShieldCheck,
  RotateCcw,
  Download
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import { ASSESSMENTS } from '../../data/mockAssessments';
import { useWellness } from '../../context/WellnessContext';

export const TakeAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submitAssessment, openCrisisModal } = useWellness();

  const assessment = ASSESSMENTS.find(a => a.id === id) || ASSESSMENTS[0];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [outcome, setOutcome] = useState(null);

  const totalQuestions = assessment.questions.length;
  const progressPercent = Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100);

  const handleSelectOption = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate Score
      const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
      const maxPossible = totalQuestions * (assessment.scale.length - 1);
      
      const matchedTier = assessment.scoringGuide.find(
        tier => totalScore >= tier.min && totalScore <= tier.max
      ) || assessment.scoringGuide[0];

      const resultPayload = {
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        score: totalScore,
        maxScore: maxPossible,
        level: matchedTier.level,
        color: matchedTier.color,
        message: matchedTier.message,
        recommendations: matchedTier.recommendations
      };

      submitAssessment(resultPayload);
      setOutcome(resultPayload);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  // If Completed -> Supportive Result Screen
  if (isCompleted && outcome) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in-50 duration-300">
        <div className="text-center">
          <div className="w-12 h-12 bg-calm-100 text-calm-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Your Supportive Reflection Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {assessment.title} • Completed just now
          </p>
        </div>

        {/* Outcome Card */}
        <Card className="p-6 sm:p-8 bg-white shadow-soft-lg border-calm-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Reflection Outcome</span>
              <h3 className="text-xl font-bold text-slate-800 mt-0.5">{outcome.level}</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-calm-700">{outcome.score}</span>
              <span className="text-xs text-slate-400 font-semibold"> / {outcome.maxScore} pts</span>
            </div>
          </div>

          <div className="bg-calm-50/70 p-4 rounded-2xl border border-calm-100 mb-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {outcome.message}
            </p>
          </div>

          {/* Supportive Action Recommendations */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-calm-600" />
              <span>Recommended Gentle Next Steps</span>
            </h4>
            <div className="space-y-2.5">
              {outcome.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-calm-600 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100">
            <Link to="/counselors" className="w-full">
              <Button variant="primary" className="w-full" size="md" icon={CalendarCheck}>
                Book with a Counselor
              </Button>
            </Link>
            <Link to="/resources" className="w-full">
              <Button variant="secondary" className="w-full" size="md" icon={BookOpen}>
                Explore Resources
              </Button>
            </Link>
          </div>
        </Card>

        {/* Back Link */}
        <div className="flex items-center justify-between text-xs">
          <Link to="/assessments" className="text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all assessments</span>
          </Link>
          <button
            onClick={() => openCrisisModal('hotlines')}
            className="text-rose-600 font-semibold hover:underline"
          >
            Need immediate support?
          </button>
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentQuestionIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/assessments')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Assessment</span>
        </button>
        <span className="text-xs font-bold text-slate-400">
          Question {currentQuestionIdx + 1} of {totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={currentQuestionIdx + 1} max={totalQuestions} color="calm" />

      {/* Question Card */}
      <Card className="p-6 sm:p-8 bg-white shadow-soft-lg">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-calm-700">
            {assessment.title}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 leading-relaxed">
            "{assessment.questions[currentQuestionIdx]}"
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Over the past 2 weeks, how often have you experienced this?
          </p>
        </div>

        {/* Radio Scale Options */}
        <div className="space-y-3">
          {assessment.scale.map((opt) => {
            const isSelected = selectedAnswer === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelectOption(opt.value)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-calm-50 border-calm-500 text-calm-900 font-bold shadow-xs'
                    : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-sm">{opt.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-calm-600 bg-calm-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestionIdx === 0}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
            icon={currentQuestionIdx === totalQuestions - 1 ? Sparkles : ArrowRight}
            iconPosition="right"
          >
            {currentQuestionIdx === totalQuestions - 1 ? 'See Supportive Summary' : 'Next Question'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
