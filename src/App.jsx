import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WellnessProvider } from './context/WellnessContext';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Auth Pages
import { Welcome } from './pages/auth/Welcome';
import { Login } from './pages/auth/Login';
import { Onboarding } from './pages/auth/Onboarding';

// Student Pages
import { Dashboard } from './pages/student/Dashboard';
import { MoodTracker } from './pages/student/MoodTracker';
import { Assessments } from './pages/student/Assessments';
import { TakeAssessment } from './pages/student/TakeAssessment';
import { AIAssistant } from './pages/student/AIAssistant';
import { Resources } from './pages/student/Resources';
import { CounselorBooking } from './pages/student/CounselorBooking';
import { Profile } from './pages/student/Profile';

// Admin Page
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <WellnessProvider>
        <BrowserRouter>
          <Routes>
            {/* Public / Auth */}
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Student Protected Space */}
            <Route element={<StudentLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessments/:id" element={<TakeAssessment />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/counselors" element={<CounselorBooking />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Institutional Admin Portal */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </WellnessProvider>
    </AuthProvider>
  );
}

export default App;
