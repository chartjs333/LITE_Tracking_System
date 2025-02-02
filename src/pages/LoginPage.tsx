import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FlaskRound as Flask } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [centerId, setCenterId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password, centerId);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please check your username, password, and center ID.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-primary -z-10" />

      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <img 
              src="/logo.svg" 
              alt="LabTrack" 
              className="h-12 w-auto"
            />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-850">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-750">
            Sign in to access your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="centerId" className="block text-sm font-medium text-gray-700">
                Center ID
              </label>
              <div className="mt-1">
                <input
                  id="centerId"
                  name="centerId"
                  type="text"
                  required
                  value={centerId}
                  onChange={(e) => setCenterId(e.target.value)}
                  className="input"
                  placeholder="Enter your center ID"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Need an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Contact your center administrator to get your login credentials.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;