export const MOCK_ADMIN_METRICS = {
  institutionName: 'State University Wellness Consortium',
  semester: 'Fall Semester 2026',
  totalEnrolledStudents: 18450,
  activeMindGridStudents: 8920,
  activePercentage: 48.3,
  weeklyCheckinRate: '72.4%',
  campusWellnessIndex: 7.2, // out of 10
  counselorUtilization: '89.6%',
  crisisAssistanceEvents: 42,
  
  privacyNotice: 'All data displayed on this dashboard is strictly anonymized and aggregated in compliance with FERPA, HIPAA, and Student Data Privacy guidelines. Minimum cluster thresholds (k >= 10) are enforced. Individual student identities, transcripts, and personal responses are never accessible or stored in administrative views.',

  // Semester timeline trend (Weeks 1 to 14)
  semesterTrends: [
    { week: 'W1 (Orientation)', avgStress: 3.2, avgMood: 7.8, checkins: 4100 },
    { week: 'W2 (Classes Start)', avgStress: 4.1, avgMood: 7.4, checkins: 5200 },
    { week: 'W3 (Add/Drop)', avgStress: 4.8, avgMood: 7.1, checkins: 6100 },
    { week: 'W4 (First Tests)', avgStress: 5.9, avgMood: 6.5, checkins: 6800 },
    { week: 'W5 (Projects)', avgStress: 6.4, avgMood: 6.2, checkins: 7200 },
    { week: 'W6 (Midterms Pt 1)', avgStress: 7.8, avgMood: 5.4, checkins: 8400 },
    { week: 'W7 (Midterms Pt 2)', avgStress: 8.2, avgMood: 5.1, checkins: 8900 },
    { week: 'W8 (Fall Break)', avgStress: 4.0, avgMood: 7.6, checkins: 5100 },
    { week: 'W9 (Mid-Semester)', avgStress: 5.5, avgMood: 6.8, checkins: 7400 },
    { week: 'W10 (Final Papers)', avgStress: 6.9, avgMood: 6.0, checkins: 7900 },
    { week: 'W11 (Dead Week)', avgStress: 8.5, avgMood: 4.9, checkins: 9100 },
    { week: 'W12 (Finals Week)', avgStress: 8.9, avgMood: 4.6, checkins: 9400 }
  ],

  // Primary Reported Stressors Breakdown
  stressorsBreakdown: [
    { category: 'Academic Deadlines & Exams', percentage: 41, count: 3657 },
    { category: 'Sleep Deficit & Fatigue', percentage: 24, count: 2140 },
    { category: 'Financial & Living Costs', percentage: 14, count: 1248 },
    { category: 'Social Isolation & Loneliness', percentage: 11, count: 981 },
    { category: 'Post-Grad / Career Anxiety', percentage: 7, count: 624 },
    { category: 'Physical Health', percentage: 3, count: 267 }
  ],

  // Assessment Completion & Severity Tiers
  assessmentStats: {
    totalCompleted: 6420,
    phq9Distribution: [
      { name: 'Minimal / Balanced (0-4)', value: 46, color: '#3e8174' },
      { name: 'Mild Fatigue (5-9)', value: 31, color: '#529f90' },
      { name: 'Moderate (10-14)', value: 16, color: '#fdbf72' },
      { name: 'Substantial Support (15+)', value: 7, color: '#f87171' }
    ],
    gad7Distribution: [
      { name: 'Calm & Settled (0-4)', value: 42, color: '#3e8174' },
      { name: 'Mild Tension (5-9)', value: 34, color: '#529f90' },
      { name: 'Moderate Worry (10-14)', value: 18, color: '#fdbf72' },
      { name: 'High Anxiety (15+)', value: 6, color: '#f87171' }
    ]
  },

  // Resource Engagement Leaderboard
  topResources: [
    { title: 'The 4-7-8 Breathing Technique for Sudden Study Panic', views: 4320, completions: 3410, category: 'Anxiety' },
    { title: 'Dorm Room Sleep Hygiene', views: 3890, completions: 2940, category: 'Sleep' },
    { title: 'Overcoming the Procrastination-Guilt Spiral', views: 3510, completions: 2820, category: 'Academics' },
    { title: '5-Minute Mindful Body Scan', views: 3120, completions: 2670, category: 'Mindfulness' }
  ],

  // Counselor Capacity vs Demand by Day of Week
  counselorStaffing: [
    { day: 'Mon', availableSlots: 45, bookedSlots: 44, walkInRequests: 12 },
    { day: 'Tue', availableSlots: 48, bookedSlots: 47, walkInRequests: 14 },
    { day: 'Wed', availableSlots: 48, bookedSlots: 48, walkInRequests: 18 },
    { day: 'Thu', availableSlots: 45, bookedSlots: 43, walkInRequests: 11 },
    { day: 'Fri', availableSlots: 36, bookedSlots: 32, walkInRequests: 8 }
  ]
};
