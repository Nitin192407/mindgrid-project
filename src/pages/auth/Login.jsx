import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Mail, Lock, Sparkles, User, UserCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('maya.lin@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    login('student');
    navigate('/dashboard');
  };

  const handleAdminDemo = () => {
    login('admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/welcome" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-calm-600 to-teal-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="font-bold text-2xl text-slate-800 tracking-tight">MindGrid</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Welcome back to your safe space
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Sign in with your university credentials or test with one-click demo profiles.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="p-6 sm:p-8 bg-white shadow-soft-lg">
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <Input
              label="University Email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@university.edu"
              required
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-calm-600 focus:ring-calm-500" />
                <span>Remember this device</span>
              </label>
              <a href="#" className="text-calm-700 hover:text-calm-800 font-medium">Forgot password?</a>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" size="lg">
              Sign In to MindGrid
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">Instant Test Accounts</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              onClick={() => { login('student'); navigate('/dashboard'); }}
              variant="soft"
              size="sm"
              icon={User}
            >
              Demo Student
            </Button>
            <Button
              type="button"
              onClick={handleAdminDemo}
              variant="secondary"
              size="sm"
              icon={UserCheck}
            >
              Demo Admin
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              New to MindGrid?{' '}
              <Link to="/onboarding" className="text-calm-700 font-semibold hover:underline">
                Create confidential profile
              </Link>
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Encrypted with university SSO & FERPA privacy standards</span>
        </div>
      </div>
    </div>
  );
};
