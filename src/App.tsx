import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SamplesProvider } from './context/SamplesContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StoragePage from './pages/StoragePage';
import SamplesPage from './pages/SamplesPage';
import TimelinePage from './pages/TimelinePage';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = true; // Replace with actual auth check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SamplesProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/storage" element={
                <ProtectedRoute>
                  <StoragePage />
                </ProtectedRoute>
              } />
              <Route path="/samples" element={
                <ProtectedRoute>
                  <SamplesPage />
                </ProtectedRoute>
              } />
              <Route path="/timeline/:sampleId" element={
                <ProtectedRoute>
                  <TimelinePage />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </SamplesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;