import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // const response = await axios.get('/api/auth/session');
        // setUser(response.data.user);
        // Mock authentication
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // const response = await axios.post('/api/auth/login', { email, password });
      // Mock successful login
      const mockUser = { id: '1', email, name: 'Test User' };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      // await axios.post('/api/auth/logout');
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};