"use client"
import React, { useState } from 'react';
import { Home, Image, RefreshCw, Calculator, Menu } from 'lucide-react';

const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: 'HOME',
      color: 'text-slate-600'
    },
    {
      id: 'design',
      icon: Image,
      label: 'DESIGN IDEAS',
      color: 'text-slate-600'
    },
    {
      id: 'begin',
      icon: RefreshCw,
      label: "LET'S BEGIN",
      color: 'text-white',
      isSpecial: true
    },
    {
      id: 'estimate',
      icon: Calculator,
      label: 'GET ESTIMATE',
      color: 'text-slate-600'
    },
    {
      id: 'more',
      icon: Menu,
      label: 'MORE',
      color: 'text-slate-600'
    }
  ];

  return (
    <div className="block md:hidden w-full max-w-md mx-auto">
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl mx-4 mb-4 rounded-2xl px-3 py-4">
          <div className="flex items-center justify-between">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-2 transition-all duration-300 ${
                    item.isSpecial 
                      ? 'relative' 
                      : isActive 
                        ? 'transform scale-105' 
                        : 'hover:scale-105'
                  }`}
                >
                  {item.isSpecial ? (
                    // Special circular button for "LET'S BEGIN"
                    <div className="relative mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg transform -translate-y-1 hover:shadow-xl transition-all duration-300">
                        <IconComponent 
                          className={`w-5 h-5 ${item.color} ${isActive ? 'animate-pulse' : ''}`} 
                        />
                      </div>
                      {isActive && (
                        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-400 to-pink-400 opacity-30 rounded-full animate-ping"></div>
                      )}
                    </div>
                  ) : (
                    // Regular icons
                    <div className="mb-2 relative">
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-50' 
                          : 'hover:bg-gray-50'
                      }`}>
                        <IconComponent 
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isActive 
                              ? 'text-indigo-600' 
                              : item.color + ' hover:text-indigo-500'
                          }`} 
                        />
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                      )}
                    </div>
                  )}
                  
                  <span className={`text-[10px] font-medium transition-colors duration-300 text-center leading-tight max-w-16 ${
                    item.isSpecial 
                      ? isActive ? 'text-indigo-600' : 'text-slate-500'
                      : isActive 
                        ? 'text-indigo-600' 
                        : 'text-slate-500'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;