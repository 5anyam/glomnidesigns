
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
      {/* Bottom Navigation */}
      <div className="block md:hidden fixed bottom-0 z-40 w-full">
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
                        ? 'relative -mt-6' 
                        : 'py-3'
                    }`}
                    aria-label={item.label}
                  >
                    {item.isSpecial ? (
                      // Special floating button for AI Designer
                      <div className="relative">
                        {/* Glow effect */}
                        {isActive && (
                          <div className="absolute inset-0 bg-red-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
                        )}

                        {/* Main button */}
                        <div className={`relative w-16 h-16 bg-red-400 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 border-4 border-white dark:border-gray-950 ${
                          isActive 
                            ? 'scale-110 shadow-red-400/50' 
                            : 'hover:scale-105 hover:shadow-red-400/30'
                        }`}>
                          <IconComponent 
                            className={`w-7 h-7 ${item.color}`} 
                          />

                          {/* Sparkle indicator */}
                          {isActive && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-950 animate-ping"></div>
                          )}
                        </div>

                        {/* Label */}
                        <span className={`block text-[10px] font-bold mt-2 transition-colors duration-300 ${
                          isActive ? 'text-red-400' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    ) : (
                      // Regular items
                      <div className="flex flex-col items-center">
                        {/* Icon container with special styling for Call button */}
                        <div className={`relative p-2.5 rounded-2xl transition-all duration-300 ${
                          item.isCall && !isActive
                            ? 'bg-green-50 dark:bg-green-950/30 border border-green-400/30'
                            : isActive 
                              ? 'bg-red-50 dark:bg-red-950/30' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}>
                          <IconComponent 
                            className={`w-5 h-5 transition-colors duration-300 ${
                              item.isCall && !isActive
                                ? 'text-green-600 dark:text-green-400'
                                : isActive 
                                  ? 'text-red-400' 
                                  : item.color
                            }`} 
                          />

                          {/* Active indicator dot */}
                          {isActive && (
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
                          )}

                          {/* Call button pulse indicator */}
                          {item.isCall && !isActive && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>

                        {/* Label with special color for Call button */}
                        <span className={`text-[10px] font-semibold mt-1.5 transition-colors duration-300 text-center leading-tight ${
                          item.isCall && !isActive
                            ? 'text-green-600 dark:text-green-400'
                            : isActive 
                              ? 'text-red-400' 
                              : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {item.label}
                        </span>

                        {/* Active underline */}
                        {isActive && (
                          <div className="w-8 h-0.5 bg-red-400 rounded-full mt-1"></div>
                        )}
                      </div>
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safe area padding */}
      <div className="block md:hidden h-20"></div>
    </>
  );
};

export default MobileBottomNav;
