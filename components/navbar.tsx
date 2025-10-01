"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { PlaceholdersAndVanishInputDemo } from "./search";
import { NavbarModal } from "./navmodal";

// Define the type for dropdown values
type DropdownType = 'office' | 'more' | null;

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (dropdown: Exclude<DropdownType, null>) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Office Designs categories with cowork and personal office structure
  const officeDesignCategories = [
    {
      title: "Coworking Offices",
      items: [
        { label: "Open Workspace", href: "/office-designs/coworking/open-workspace", icon: "🤝" },
        { label: "Hot Desking", href: "/office-designs/coworking/hot-desking", icon: "💼" },
        { label: "Private Cabins", href: "/office-designs/coworking/private-cabins", icon: "🚪" },
        { label: "Meeting Rooms", href: "/office-designs/coworking/meeting-rooms", icon: "👥" },
        { label: "Lounge Area", href: "/office-designs/coworking/lounge", icon: "☕" }
      ]
    },
    {
      title: "Personal Offices",
      items: [
        { label: "Executive Office", href: "/office-designs/personal/executive", icon: "👔" },
        { label: "Home Office", href: "/office-designs/personal/home-office", icon: "🏠" },
        { label: "Creative Studio", href: "/office-designs/personal/creative", icon: "🎨" },
        { label: "Tech Workspace", href: "/office-designs/personal/tech", icon: "⚡" },
        { label: "Medical Office", href: "/office-designs/personal/medical", icon: "🏥" }
      ]
    }
  ];

  const moreItems = [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Get Estimate", href: "/cost-estimate"},
    { label: "Contact", href: "/contact" },
    { label: "Home Decor", href: "/home-decor" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-gray-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-auto h-12 transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Glomni Designs"
                  width={118}
                  height={118}
                  className="object-contain group-hover:opacity-80 transition-opacity"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Office Designs Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('office')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/office-designs"
                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
              >
                Office Designs
                <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {activeDropdown === 'office' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/40 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-6">
                    {officeDesignCategories.map((category) => (
                      <div key={category.title} className="space-y-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                          {category.title}
                        </h3>
                        <div className="space-y-1.5">
                          {category.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="group flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                            >
                              <span className="text-xl group-hover:scale-110 transition-transform">
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All Link */}
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4">
                    <Link
                      href="/office-designs"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                    >
                      <span>View All Design Categories</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Home Designs Link */}
            <Link
              href="/home-designs"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
            >
              Home Designs
            </Link>

            {/* Data Center Link */}
            <Link
              href="/data-center"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
            >
              Data Center
            </Link>

            {/* Construction Link */}
            <Link
              href="/construction"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
            >
              Construction
            </Link>

            {/* More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg">
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-black/40 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {moreItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-3">
            {/* Search - Hidden on mobile */}
            <div className="hidden sm:block">
              <PlaceholdersAndVanishInputDemo />
            </div>

            {/* Theme Switch */}
            <div className="flex items-center">
              <ThemeSwitch />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-h-[80vh] overflow-y-auto px-4 py-6 space-y-6">
            {/* Search on mobile */}
            <div className="sm:hidden pb-4 border-b border-gray-200 dark:border-gray-800">
              <PlaceholdersAndVanishInputDemo />
            </div>

            {/* Office Designs - Mobile */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Office Designs</h3>
                <Link 
                  href="/office-designs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {officeDesignCategories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {category.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95 border border-gray-200 dark:border-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Other Menu Items */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link
                href="/home-designs"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95 border border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-2xl">🏡</span>
                <span className="font-medium text-gray-900 dark:text-white">Home Designs</span>
              </Link>

              <Link
                href="/data-center"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95 border border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-2xl">💾</span>
                <span className="font-medium text-gray-900 dark:text-white">Data Center</span>
              </Link>

              <Link
                href="/construction"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95 border border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-2xl">🏗️</span>
                <span className="font-medium text-gray-900 dark:text-white">Construction</span>
              </Link>
            </div>

            {/* More Items */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">More</h4>
              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="p-3 text-center bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all active:scale-95 border border-gray-200 dark:border-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button on mobile */}
            <button 
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">FREE</span>
              <span>Get Consultation</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
