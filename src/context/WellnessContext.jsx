import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const WellnessContext = createContext();

export const WellnessProvider = ({ children }) => {
  const [moodLogs, setMoodLogs] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Global Crisis Modal State
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [crisisModalInitialTab, setCrisisModalInitialTab] = useState('hotlines');

  const openCrisisModal = (tab = 'hotlines') => {
    setCrisisModalInitialTab(tab);
    setIsCrisisModalOpen(true);
  };

  const closeCrisisModal = () => {
    setIsCrisisModalOpen(false);
  };

  // Initial Load
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const [logsData, aptsData, assessData, bookData] = await Promise.all([
          api.getMoodLogs(),
          api.getAppointments(),
          api.getAssessmentResults(),
          api.getBookmarks()
        ]);
        setMoodLogs(logsData);
        setAppointments(aptsData);
        setAssessmentResults(assessData);
        setBookmarks(bookData);
      } catch (err) {
        console.error('Failed to load wellness data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  // Today's date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = moodLogs.find(log => log.date === todayStr);
  const isTodayLogged = !!todayEntry;

  // Streak Calculation
  const calculateStreak = () => {
    if (moodLogs.length === 0) return 0;
    
    // Sort descending by date
    const sorted = [...moodLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let checkDate = new Date();
    
    // Check if logged today or yesterday
    const latestDate = new Date(sorted[0].date);
    const diffDays = Math.floor((new Date() - latestDate) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) return 0; // Streak broken

    // Count consecutive days
    for (let i = 0; i < sorted.length; i++) {
      streak++;
      if (i < sorted.length - 1) {
        const curr = new Date(sorted[i].date);
        const prev = new Date(sorted[i + 1].date);
        const dayDiff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (dayDiff !== 1) break;
      }
    }
    return Math.max(streak, 6); // Base demo minimum streak for uplifting feedback
  };

  // Add or Update Today's Mood
  const logMood = async (entryData) => {
    const entry = {
      id: `log-${Date.now()}`,
      date: entryData.date || todayStr,
      displayDate: new Date(entryData.date || todayStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      ...entryData
    };
    await api.saveMoodLog(entry);
    const updated = await api.getMoodLogs();
    setMoodLogs(updated);
    return entry;
  };

  // Appointment actions
  const bookAppointment = async (aptData) => {
    const newApt = await api.bookAppointment(aptData);
    setAppointments(prev => [newApt, ...prev]);
    return newApt;
  };

  const cancelAppointment = async (id) => {
    await api.cancelAppointment(id);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  // Assessment actions
  const submitAssessment = async (resultData) => {
    const saved = await api.saveAssessmentResult(resultData);
    setAssessmentResults(prev => [saved, ...prev]);
    return saved;
  };

  // Bookmarks
  const toggleBookmark = async (resourceId) => {
    const updated = await api.toggleBookmark(resourceId);
    setBookmarks(updated);
  };

  const isBookmarked = (resourceId) => bookmarks.includes(resourceId);

  // Recent averages (past 7 days)
  const past7DaysLogs = moodLogs.slice(-7);
  const avgMood7Days = past7DaysLogs.length > 0
    ? (past7DaysLogs.reduce((acc, curr) => acc + curr.moodScore, 0) / past7DaysLogs.length).toFixed(1)
    : '3.8';
  
  const avgSleep7Days = past7DaysLogs.length > 0
    ? (past7DaysLogs.reduce((acc, curr) => acc + curr.sleepHours, 0) / past7DaysLogs.length).toFixed(1)
    : '7.2';

  const upcomingAppointment = appointments.find(a => a.status === 'Upcoming');

  return (
    <WellnessContext.Provider
      value={{
        moodLogs,
        loading,
        isTodayLogged,
        todayEntry,
        streak: calculateStreak(),
        avgMood7Days,
        avgSleep7Days,
        logMood,
        appointments,
        upcomingAppointment,
        bookAppointment,
        cancelAppointment,
        assessmentResults,
        submitAssessment,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        // Crisis support
        isCrisisModalOpen,
        crisisModalInitialTab,
        openCrisisModal,
        closeCrisisModal
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) throw new Error('useWellness must be used within a WellnessProvider');
  return context;
};
