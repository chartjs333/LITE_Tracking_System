import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, FlaskRound as Flask, Clock, FileText, Briefcase, LogOut, User, ChevronDown } from 'lucide-react';

const navItems = [
  { path: '/storage', label: 'Storage', icon: Flask },
  { path: '/samples', label: 'Samples', icon: Clock },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
];

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      // Menu will be automatically closed by navigation
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="LabTrack" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {isAuthenticated ? (
              <>
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
                
                {/* User Menu (Desktop) */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-750 hover:text-primary-600 focus:outline-none"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user?.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <Link to="/login" className="btn-primary">
                  Sign In
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
              {isAuthenticated ? (
                <div className="mt-6 space-y-4">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.username}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  {navItems.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center px-4 py-3 text-gray-750 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {label}
                    </Link>
                  ))}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-3 text-gray-750 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="px-4 mt-6">
                  <Link
                    to="/login"
                    className="btn-primary w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;