import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_STUDENT = {
  id: 'stu-1048',
  name: 'Maya Lin',
  email: 'maya.lin@university.edu',
  studentId: 'U-2024-8849',
  major: 'Cognitive Science & Design',
  year: 'Junior (3rd Year)',
  campus: 'Main North Campus',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  consentGiven: true,
  shareAnonymizedData: true,
  dailyReminder: '08:30 PM',
  emergencyContact: {
    name: 'Sarah Lin (Sister)',
    phone: '(555) 392-1084',
    relationship: 'Family'
  }
};

const DEMO_ADMIN = {
  id: 'adm-001',
  name: 'Dr. Arthur Vance',
  email: 'a.vance@university.edu',
  role: 'admin',
  title: 'Dean of Student Mental Health & Counseling Consortium',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mindgrid_user');
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('mindgrid_auth');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('mindgrid_user', JSON.stringify(user));
    localStorage.setItem('mindgrid_auth', JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  const login = (role = 'student') => {
    if (role === 'admin') {
      setUser(DEMO_ADMIN);
    } else {
      setUser(DEMO_STUDENT);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = (onboardingData) => {
    setUser(prev => ({
      ...prev,
      ...onboardingData,
      consentGiven: true
    }));
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        completeOnboarding,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
