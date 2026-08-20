import React, { useState } from 'react';
import { Eye, Hand, Volume2, Sparkles, Coffee, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const GroundingTool = () => {
  const steps = [
    {
      count: 5,
      sense: 'SEE',
      title: '5 Things You Can See',
      description: 'Look around your current space. Find 5 distinct items (a plant, a texture on the wall, a reflection, a pen, your shoes). Notice their colors and shapes.',
      icon: Eye,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      itemsCount: 5,
      placeholder: 'e.g. green desk lamp, bookshelf, window frame...'
    },
    {
      count: 4,
      sense: 'FEEL',
      title: '4 Things You Can Physically Touch',
      description: 'Notice physical sensations right now. Feel your feet resting on the floor, the fabric of your sleeves, the smoothness of your desk, or the cool air on your hands.',
      icon: Hand,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      itemsCount: 4,
      placeholder: 'e.g. soft sweater fabric, cool tabletop...'
    },
    {
      count: 3,
      sense: 'HEAR',
      title: '3 Things You Can Hear',
      description: 'Listen closely to subtle sounds in your background. Distant traffic, the hum of an air conditioner, keyboard taps, birds outside, or your own breath.',
      icon: Volume2,
      color: 'bg-lavender-50 text-lavender-700 border-lavender-200',
      itemsCount: 3,
      placeholder: 'e.g. computer fan hum, distant voices...'
    },
    {
      count: 2,
      sense: 'SMELL',
      title: '2 Things You Can Smell',
      description: 'Notice scents around you. The aroma of morning coffee, fresh air from a window, hand lotion, or pencil wood. If none are present, recall a favorite comforting smell.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      itemsCount: 2,
      placeholder: 'e.g. tea, rain outside, clean laundry...'
    },
    {
      count: 1,
      sense: 'TASTE',
      title: '1 Thing You Can Taste',
      description: 'Notice the lingering taste of mint, tea, water, or simply take a gentle sip of cool water and notice how refreshing it feels going down.',
      icon: Coffee,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      itemsCount: 1,
      placeholder: 'e.g. sip of fresh water, mint...'
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const step = steps[currentStepIndex];

  const toggleCheck = (stepIdx, itemIdx) => {
    const key = `${stepIdx}-${itemIdx}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCheckedItems({});
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="text-center py-6 px-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-2">You are grounded and safe right here</h4>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Your mind has reconnected with your physical surroundings. Notice how your body feels right now compared to when you started. Take one more gentle breath.
        </p>
        <Button onClick={handleReset} variant="secondary" icon={RotateCcw}>
          Practice Again
        </Button>
      </div>
    );
  }

  const StepIcon = step.icon;

  return (
    <div className="p-2 sm:p-4">
      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStepIndex(idx)}
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
              idx === currentStepIndex
                ? 'bg-calm-600 text-white shadow-sm'
                : idx < currentStepIndex
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            {idx < currentStepIndex ? '✓' : s.count} {s.sense}
          </button>
        ))}
      </div>

      {/* Active Step Card */}
      <div className={`p-6 rounded-2xl border ${step.color} mb-6 text-left`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-white/90 rounded-xl shadow-xs">
            <StepIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider opacity-75">
              Step {currentStepIndex + 1} of 5
            </span>
            <h4 className="text-lg font-bold">{step.title}</h4>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-5 opacity-90">
          {step.description}
        </p>

        {/* Interactive check items */}
        <div className="space-y-2">
          {Array.from({ length: step.itemsCount }).map((_, i) => {
            const isChecked = !!checkedItems[`${currentStepIndex}-${i}`];
            return (
              <div
                key={i}
                onClick={() => toggleCheck(currentStepIndex, i)}
                className={`flex items-center justify-between p-3 rounded-xl border bg-white cursor-pointer transition-all ${
                  isChecked
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-sm ${isChecked ? 'text-emerald-900 font-medium' : 'text-slate-600'}`}>
                    Item #{i + 1} identified
                  </span>
                </div>
                <span className="text-xs text-slate-400 italic">tap when noticed</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
          variant="ghost"
          disabled={currentStepIndex === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} variant="primary" icon={ArrowRight} iconPosition="right">
          {currentStepIndex === steps.length - 1 ? 'Finish Grounding' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
};
