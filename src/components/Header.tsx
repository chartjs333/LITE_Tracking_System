import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, FlaskRound as Flask, Clock, FileText, Briefcase } from 'lucide-react';

const navItems = [
  { path: '/storage', label: 'Storage', icon: Flask },
  { path: '/samples', label: 'Samples', icon: Clock },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
];

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-850">
              LabTrack Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {isAuthenticated ? (
              <nav className="flex space-x-8">
                {navItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-gray-750 hover:text-primary-600 hover:underline px-3 py-2 text-sm font-medium transition-colors duration-150"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn-secondary p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <div className="p-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {isAuthenticated ? (
                  navItems.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center px-4 py-3 text-gray-750 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {label}
                    </Link>
                  ))
                ) : (
                  <div className="space-y-4 px-4">
                    <Link
                      to="/login"
                      className="btn-secondary w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-primary w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;