import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

export const BreathingTool = ({ technique = '478' }) => {
  const [selectedPattern, setSelectedPattern] = useState(technique); // '478' or 'box'
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // 'Inhale', 'Hold', 'Exhale', 'Hold (Empty)'
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const patterns = {
    '478': {
      name: '4-7-8 Relaxing Breath',
      description: 'Slows heart rate and calms the nervous system through prolonged exhales.',
      phases: [
        { name: 'Inhale through nose', duration: 4, action: 'expand' },
        { name: 'Hold gently', duration: 7, action: 'hold' },
        { name: 'Exhale through mouth', duration: 8, action: 'contract' }
      ]
    },
    'box': {
      name: 'Box Breathing (4-4-4-4)',
      description: 'Used by athletes and first responders to regain intense mental focus.',
      phases: [
        { name: 'Inhale', duration: 4, action: 'expand' },
        { name: 'Hold', duration: 4, action: 'hold' },
        { name: 'Exhale', duration: 4, action: 'contract' },
        { name: 'Hold empty', duration: 4, action: 'hold' }
      ]
    }
  };

  const currentPattern = patterns[selectedPattern];

  useEffect(() => {
    let timer;
    if (isActive) {
      const activePhases = currentPattern.phases;
      const currentPhaseIndex = activePhases.findIndex(p => p.name.includes(phase.split(' ')[0]));
      const safeIndex = currentPhaseIndex >= 0 ? currentPhaseIndex : 0;

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            const nextIndex = (safeIndex + 1) % activePhases.length;
            const nextPhase = activePhases[nextIndex];
            setPhase(nextPhase.name);
            if (nextIndex === 0) {
              setCyclesCompleted(c => c + 1);
            }
            return nextPhase.duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, selectedPattern]);

  const handleToggle = () => {
    if (!isActive) {
      setPhase(currentPattern.phases[0].name);
      setCountdown(currentPattern.phases[0].duration);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase(currentPattern.phases[0].name);
    setCountdown(currentPattern.phases[0].duration);
    setCyclesCompleted(0);
  };

  const handlePatternChange = (key) => {
    setSelectedPattern(key);
    setIsActive(false);
    setPhase(patterns[key].phases[0].name);
    setCountdown(patterns[key].phases[0].duration);
    setCyclesCompleted(0);
  };

  return (
    <div className="flex flex-col items-center text-center p-2 sm:p-4">
      {/* Pattern Selector */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          onClick={() => handlePatternChange('478')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            selectedPattern === '478' ? 'bg-white text-calm-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          4-7-8 Calming Breath
        </button>
        <button
          onClick={() => handlePatternChange('box')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            selectedPattern === 'box' ? 'bg-white text-calm-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Box Breathing (4-4-4-4)
        </button>
      </div>

      <p className="text-xs text-slate-500 max-w-sm mb-6">
        {currentPattern.description}
      </p>

      {/* Visual Breathing Bubble */}
      <div className="relative flex items-center justify-center my-6 w-56 h-56 sm:w-64 sm:h-64">
        {/* Ambient Outer Halo */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 opacity-20 ${
            phase.includes('Inhale')
              ? 'scale-125 bg-calm-400'
              : phase.includes('Hold')
              ? 'scale-125 bg-indigo-400'
              : 'scale-90 bg-slate-400'
          }`}
        />

        {/* Pulsing Bubble */}
        <div
          className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-1000 ${
            phase.includes('Inhale')
              ? 'scale-110 bg-gradient-to-br from-calm-500 to-calm-600 shadow-calm-glow'
              : phase.includes('Hold')
              ? 'scale-110 bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg'
              : 'scale-90 bg-gradient-to-br from-teal-600 to-slate-600'
          }`}
        >
          <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
            {isActive ? phase : 'Ready'}
          </span>
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight my-1">
            {isActive ? countdown : '4'}
          </span>
          <span className="text-xs text-white/70">
            {isActive ? 'seconds' : 'Tap Start'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={handleToggle}
          variant={isActive ? 'secondary' : 'primary'}
          size="lg"
          icon={isActive ? Pause : Play}
          className="min-w-[140px]"
        >
          {isActive ? 'Pause' : 'Begin Breath'}
        </Button>
        <Button
          onClick={handleReset}
          variant="ghost"
          size="lg"
          icon={RotateCcw}
        >
          Reset
        </Button>
      </div>

      {/* Cycle counter */}
      {cyclesCompleted > 0 && (
        <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-calm-700 bg-calm-50 px-3 py-1 rounded-full border border-calm-100">
          <Heart className="w-3.5 h-3.5 fill-calm-500 text-calm-500" />
          <span>{cyclesCompleted} gentle cycles completed</span>
        </div>
      )}
    </div>
  );
};
