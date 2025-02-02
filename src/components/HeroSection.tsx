import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskRound as Flask, QrCode } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F0F1F5] to-[#FAFAFA] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                {/* Decorative icon */}
                <div className="mb-8 flex items-center space-x-2">
                  <Flask className="h-8 w-8 text-amber-500" />
                  <QrCode className="h-8 w-8 text-amber-500 opacity-75" />
                </div>

                {/* Main heading */}
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block">Revolutionize Your</span>
                  <span className="block text-amber-500">Lab's Sample Logistics</span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                  Track, store, and control all blood samples with QR codes in real-time. 
                  Streamline your laboratory operations with our advanced management system.
                </p>

                {/* CTA Section */}
                <div className="mt-10 flex items-center space-x-6">
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 transition duration-150 ease-in-out shadow-sm hover:shadow md:text-lg md:px-10"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/samples"
                    className="inline-flex items-center text-base font-medium text-gray-600 hover:text-amber-500 transition duration-150 ease-in-out md:text-lg"
                  >
                    View Demo
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Feature list */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16">
                  {[
                    'Real-time tracking',
                    'QR code integration',
                    'Secure storage',
                    'Analytics dashboard',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image section */}
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <img
                    className="w-full rounded-lg"
                    src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800&h=600"
                    alt="Laboratory sample management"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;