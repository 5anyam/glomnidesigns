"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Layers, Briefcase, Wand2, Phone } from 'lucide-react';

const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      color: 'text-gray-600 dark:text-gray-400',
      link: '/'
    },
    {
      id: 'interior',
      icon: Layers,
      label: 'Interior Ideas',
      color: 'text-gray-600 dark:text-gray-400',
      link: '/design-ideas'
    },
    {
      id: 'ai',
      icon: Wand2,
      label: "AI Designer",
      color: 'text-white',
      isSpecial: true,
      link: '/ai-designs'
    },
    {
      id: 'portfolio',
      icon: Briefcase,
      label: 'Portfolio',
      color: 'text-gray-600 dark:text-gray-400',
      link: '/portfolio'
    },
    {
      id: 'call',
      icon: Phone,
      label: 'Call Us',
      color: 'text-gray-600 dark:text-gray-400',
      link: 'tel:+919899989803',
      isCall: true
    }
  ];

  return (
    <>
      <nav className="fixed bottom-0 z-40 w-full block md:hidden">
        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t-2 border-gray-200 dark:border-gray-800 shadow-2xl transition-colors">
          <div className="flex items-end justify-between max-w-md mx-auto px-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className="flex flex-col items-center justify-end min-w-0 flex-1"
                >
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center justify-end w-full transition-all duration-300 ${
                      item.isSpecial
                        ? 'relative -mt-3'
                        : 'py-2'
                    }`}
                    aria-label={item.label}
                  >
                    {item.isSpecial ? (
                      <div className="relative">
                        {isActive && (
                          <div className="absolute inset-0 bg-red-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
                        )}
                        <div className={`relative w-12 h-12 bg-red-400 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 border-4 border-white ${isActive ? 'scale-110 shadow-red-400/50' : 'hover:scale-105 hover:shadow-red-400/30'}`}>
                          <IconComponent className={`w-5 h-5 ${item.color}`} />
                          {isActive && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
                          )}
                        </div>
                        <span className={`block text-[9px] font-bold mt-1 transition-colors ${isActive ? 'text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {item.label}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                          item.isCall && !isActive
                            ? 'bg-green-50 dark:bg-green-900/50 border border-green-500/50'
                            : isActive
                            ? 'bg-red-50 dark:bg-red-900/50'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}>
                          <IconComponent
                            className={`transition-colors duration-300 ${
                              item.isCall && !isActive
                                ? 'w-4 h-4 text-green-600 dark:text-green-400'
                                : isActive
                                ? 'w-5 h-5 text-red-400'
                                : 'w-5 h-5 ' + item.color
                            }`}
                          />
                          {isActive && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>}
                          {item.isCall && !isActive && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <span className={`text-[9px] font-semibold mt-1 text-center ${
                          item.isCall && !isActive
                            ? 'text-green-600 dark:text-green-400'
                            : isActive
                            ? 'text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {item.label}
                        </span>
                        {isActive && <div className="w-8 h-0.5 bg-red-400 rounded-full mt-1"></div>}
                      </div>
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Safe area padding for mobile */}
      <div className="block md:hidden h-16" />
    </>
  );
};

export default MobileBottomNav;
