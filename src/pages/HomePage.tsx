import React from 'react';
import HeroSection from '../components/HeroSection';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {!user ? (
        <HeroSection />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome, {user.name}!</h1>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Laboratory Management System</h2>
              <p className="text-lg mb-4">
                Efficiently manage your samples and track their progress through our advanced system.
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Quick Stats</h3>
                <p className="text-gray-600">View your laboratory's performance at a glance.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
                <p className="text-gray-600">Track the latest updates and changes.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;