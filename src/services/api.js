// Mock API Service with localStorage persistence and simulated latency
import { COUNSELORS, INITIAL_APPOINTMENTS } from '../data/mockCounselors';
import { RESOURCES } from '../data/mockResources';
import { ASSESSMENTS } from '../data/mockAssessments';
import { MOCK_ADMIN_METRICS } from '../data/mockAdminData';

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEYS = {
  MOOD_LOGS: 'mindgrid_mood_logs',
  APPOINTMENTS: 'mindgrid_appointments',
  ASSESSMENT_RESULTS: 'mindgrid_assessment_results',
  BOOKMARKS: 'mindgrid_bookmarks',
  USER_PROFILE: 'mindgrid_user_profile',
  AI_CHAT: 'mindgrid_ai_chat'
};

// Initial Seed Data for Mood logs (7-90 days history)
const generateInitialMoodLogs = () => {
  const logs = [];
  const today = new Date();
  
  const moodScale = ['Overwhelmed', 'Tender', 'Balanced', 'Serene', 'Radiant'];
  const factors = ['Academics', 'Sleep', 'Social', 'Physical', 'Finances', 'Career'];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    // Simulate typical college fluctuations
    const dayOfWeek = d.getDay();
    let moodScore = 3;
    let sleepHours = 7;
    let stressLevel = 4;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      moodScore = 4;
      sleepHours = 8.2;
      stressLevel = 3;
    } else if (dayOfWeek === 2 || dayOfWeek === 4) {
      moodScore = 3;
      sleepHours = 6.5;
      stressLevel = 6;
    }

    // Add some realistic variation
    const jitter = (Math.random() - 0.5) * 1.5;
    moodScore = Math.max(1, Math.min(5, Math.round(moodScore + jitter)));
    sleepHours = Math.max(4.5, Math.min(10, Number((sleepHours + (Math.random() - 0.5) * 1.8).toFixed(1))));
    stressLevel = Math.max(1, Math.min(10, Math.round(stressLevel + (Math.random() - 0.5) * 2.5)));

    logs.push({
      id: `log-${i}`,
      date: d.toISOString().split('T')[0],
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      moodScore, // 1 to 5
      moodLabel: moodScale[moodScore - 1],
      sleepHours,
      stressLevel, // 1 to 10
      energyLevel: Math.max(1, Math.min(5, Math.round(moodScore * 0.9 + (sleepHours > 7 ? 1 : -0.5)))),
      factors: [factors[i % factors.length], factors[(i + 2) % factors.length]],
      note: i === 0 ? 'Felt much lighter after afternoon walk around campus pond.' : (i === 3 ? 'Midterm exam prep was stressful but study group helped.' : '')
    });
  }

  return logs;
};

export const api = {
  // --- Mood & Wellness ---
  getMoodLogs: async () => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
    if (stored) {
      return JSON.parse(stored);
    }
    const initial = generateInitialMoodLogs();
    localStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(initial));
    return initial;
  },

  saveMoodLog: async (entry) => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
    const logs = stored ? JSON.parse(stored) : generateInitialMoodLogs();
    
    // Check if log for this date exists, if so update it, else prepend
    const existingIdx = logs.findIndex(l => l.date === entry.date);
    if (existingIdx >= 0) {
      logs[existingIdx] = { ...logs[existingIdx], ...entry };
    } else {
      logs.push(entry);
    }
    // Sort by date ascending
    logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(logs));
    return entry;
  },

  // --- Counselors & Appointments ---
  getCounselors: async () => {
    await delay();
    return COUNSELORS;
  },

  getAppointments: async () => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    return INITIAL_APPOINTMENTS;
  },

  bookAppointment: async (appointment) => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const list = stored ? JSON.parse(stored) : INITIAL_APPOINTMENTS;
    const newApt = {
      id: `apt-${Date.now()}`,
      status: 'Upcoming',
      ...appointment
    };
    list.push(newApt);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));
    return newApt;
  },

  cancelAppointment: async (id) => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!stored) return false;
    const list = JSON.parse(stored);
    const updated = list.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    return true;
  },

  // --- Assessments ---
  getAssessments: async () => {
    await delay();
    return ASSESSMENTS;
  },

  getAssessmentResults: async () => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_RESULTS);
    if (stored) return JSON.parse(stored);
    // Seed initial mock result
    const initial = [
      {
        id: 'res-seed-1',
        assessmentId: 'gad-7',
        assessmentTitle: 'GAD-7: Anxiety & Worry Scale',
        completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        score: 6,
        maxScore: 21,
        level: 'Mild Nervous Tension',
        color: 'teal',
        summary: 'Your anxiety levels show mild situational tension, common during midterm deadlines.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_RESULTS, JSON.stringify(initial));
    return initial;
  },

  saveAssessmentResult: async (result) => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_RESULTS);
    const results = stored ? JSON.parse(stored) : [];
    const newResult = {
      id: `res-${Date.now()}`,
      completedAt: new Date().toISOString(),
      ...result
    };
    results.unshift(newResult);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_RESULTS, JSON.stringify(results));
    return newResult;
  },

  // --- Resources ---
  getResources: async () => {
    await delay();
    return RESOURCES;
  },

  getBookmarks: async () => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return stored ? JSON.parse(stored) : ['res-1', 'res-4'];
  },

  toggleBookmark: async (resourceId) => {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    let bookmarks = stored ? JSON.parse(stored) : ['res-1', 'res-4'];
    if (bookmarks.includes(resourceId)) {
      bookmarks = bookmarks.filter(id => id !== resourceId);
    } else {
      bookmarks.push(resourceId);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return bookmarks;
  },

  // --- Admin Analytics ---
  getAdminMetrics: async () => {
    await delay();
    return MOCK_ADMIN_METRICS;
  }
};
