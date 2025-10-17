"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { PlaceholdersAndVanishInputDemo } from "./search";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

type DropdownType = 'services' | 'designIdeas' | 'more' | null;
type MobileDropdown = 'services' | 'designIdeas' | 'more' | null;

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<MobileDropdown>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleMouseEnter = (dropdown: Exclude<DropdownType, null>) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveMobileDropdown(null);
      setExpandedCategory(null);
    }
  };

  const toggleMobileDropdown = (dropdown: MobileDropdown) => {
    setActiveMobileDropdown(activeMobileDropdown === dropdown ? null : dropdown);
    setExpandedCategory(null); // Reset sub-categories when switching main menu
  };

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategory(expandedCategory === categoryTitle ? null : categoryTitle);
  };

  // Menu 1 - Services
  const servicesCategories = [
    {
      title: "Office Interior Designs Ideas",
      items: [
        { label: "Coworking Offices Interior", href: "/services/office/coworking-offices", icon: "🤝" },
        { label: "Open Workspace Interior", href: "/services/office/open-workspace", icon: "💼" },
        { label: "Meeting Rooms Interior", href: "/services/office/meeting-rooms", icon: "👥" },
        { label: "Private Cabin Interior", href: "/services/office/private-cabin", icon: "🚪" },
        { label: "Personal Office Interior", href: "/services/office/personal-office", icon: "👔" },
        { label: "Home Office Interior", href: "/services/office/home-office", icon: "🏠" }
      ]
    },
    {
      title: "Home Interior Designs Ideas",
      items: [
        { label: "Modular Kitchen Interior", href: "/services/home/modular-kitchen", icon: "🍳" },
        { label: "Wardrobe Interior", href: "/services/home/wardrobe", icon: "👗" },
        { label: "Bathroom Interior", href: "/services/home/bathroom", icon: "🚿" },
        { label: "Master Bedroom Interior", href: "/services/home/master-bedroom", icon: "🛏️" },
        { label: "Living Room Interior", href: "/services/home/living-room", icon: "🛋️" },
        { label: "Pooja Room Interior", href: "/services/home/pooja-room", icon: "🙏" },
        { label: "Kids Bedroom Interior", href: "/services/home/kids-bedroom", icon: "🧸" },
        { label: "Guest Bedroom Interior", href: "/services/home/guest-bedroom", icon: "🛌" }
      ]
    }
  ];

  // Menu 2 - Design Ideas
  const designIdeasItems = [
    { label: "Room Ideas", href: "/design-ideas/room-ideas", icon: "🏠" },
    { label: "Decor & Inspiration", href: "/design-ideas/decor-inspiration", icon: "✨" },
    { label: "Home Decor", href: "/design-ideas/home-decor", icon: "🎨" },
    { label: "Lighting Ideas", href: "/design-ideas/lighting-ideas", icon: "💡" },
    { label: "Vastu Tips", href: "/design-ideas/vastu-tips", icon: "🧭" },
    { label: "Home Organisation", href: "/design-ideas/home-organisation", icon: "📦" },
    { label: "Materials Guide", href: "/design-ideas/materials-guide", icon: "🔨" },
    { label: "Wall Design Ideas", href: "/design-ideas/wall-design", icon: "🖼️" },
    { label: "Expert Advice", href: "/design-ideas/expert-advice", icon: "👨‍💼" },
    { label: "Interior Advice", href: "/design-ideas/interior-advice", icon: "💬" },
    { label: "Ceiling Design", href: "/design-ideas/ceiling-design", icon: "🏛️" },
    { label: "Home Renovation Ideas", href: "/design-ideas/home-renovation", icon: "🔧" },
    { label: "Commercial Designs", href: "/design-ideas/commercial-designs", icon: "🏢" },
    { label: "Furniture Ideas", href: "/design-ideas/furniture-ideas", icon: "🪑" }
  ];

  const moreItems = [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Get Estimate", href: "/cost-estimate" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-auto h-12 transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Glomni Designs"
                  width={50}
                  height={50}
                  className="object-contain block dark:hidden group-hover:opacity-80 transition-opacity"
                  priority
                />
                <Image
                  src="/logo-dark.png"
                  alt="Glomni Designs"
                  width={50}
                  height={50}
                  className="object-contain hidden dark:block group-hover:opacity-80 transition-opacity"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
            >
              Home
            </Link>

            {/* Services Dropdown (Menu 1) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-6">
                    {servicesCategories.map((category) => (
                      <div key={category.title} className="space-y-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide border-b-2 border-red-400 pb-2 mb-3">
                          {category.title}
                        </h3>
                        <div className="space-y-1.5">
                          {category.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="group flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all duration-200"
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

                  <div className="border-t-2 border-gray-200 dark:border-gray-800 mt-6 pt-4">
                    <Link
                      href="/design-ideas"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-500 transition-colors group"
                    >
                      <span>View All Services</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Design Ideas Dropdown (Menu 2) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('designIdeas')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/"
                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
              >
                Design Ideas
                <ChevronDown className="w-4 h-4" />
              </Link>

              {activeDropdown === 'designIdeas' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-2">
                    {designIdeasItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all duration-200"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 dark:border-gray-800 mt-6 pt-4">
                    <Link
                      href="/blogs"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-500 transition-colors group"
                    >
                      <span>Explore All Design Ideas</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
            >
              Portfolio
            </Link>

            <Link
              href="/ai-designs"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg"
            >
              AI Design Generator
            </Link>

            {/* More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg">
                More
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {moreItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
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
            <div className="hidden sm:block">
              <PlaceholdersAndVanishInputDemo />
            </div>

            <div className="flex items-center">
              <ThemeSwitch />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-3 py-4 space-y-1">

              {/* Search on mobile */}
              <div className="sm:hidden pb-3 mb-3 border-b border-gray-200 dark:border-gray-800">
                <PlaceholdersAndVanishInputDemo />
              </div>

              {/* Home Link */}
              <Link
                href="/"
                className="flex items-center px-3 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Home</span>
              </Link>

              {/* Services - Main Menu Item (Level 1) */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleMobileDropdown('services')}
                  className="w-full flex items-center justify-between px-3 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  <span>Services</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeMobileDropdown === 'services' ? 'rotate-180 text-red-400' : ''
                    }`} 
                  />
                </button>

                {/* Sub-Menu (Level 2) */}
                {activeMobileDropdown === 'services' && (
                  <div className="space-y-1 bg-gray-50 dark:bg-gray-800/30 rounded-xl p-2 animate-in slide-in-from-top-2 duration-200">
                    {servicesCategories.map((category) => (
                      <div key={category.title} className="space-y-1">
                        <button
                          onClick={() => toggleCategory(category.title)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-gray-800 dark:text-gray-200 text-sm font-semibold hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            {category.title}
                          </span>
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              expandedCategory === category.title ? 'rotate-90 text-red-400' : ''
                            }`} 
                          />
                        </button>

                        {/* Sub-Sub-Menu (Level 3) */}
                        {expandedCategory === category.title && (
                          <div className="space-y-0.5 bg-white dark:bg-gray-900/50 rounded-lg p-2 ml-3 border-l-2 border-red-400 animate-in slide-in-from-left-1 duration-200">
                            {category.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="text-base flex-shrink-0">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <Link
                      href="/services"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 mt-2 text-sm text-red-400 hover:text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>View All Services</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Design Ideas - Main Menu Item (Level 1) */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleMobileDropdown('designIdeas')}
                  className="w-full flex items-center justify-between px-3 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  <span>Design Ideas</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeMobileDropdown === 'designIdeas' ? 'rotate-180 text-red-400' : ''
                    }`} 
                  />
                </button>

                {/* Sub-Menu (Level 2) - Direct links */}
                {activeMobileDropdown === 'designIdeas' && (
                  <div className="space-y-0.5 bg-gray-50 dark:bg-gray-800/30 rounded-xl p-2 animate-in slide-in-from-top-2 duration-200">
                    {designIdeasItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}

                    <Link
                      href="/design-ideas"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 mt-2 text-sm text-red-400 hover:text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Explore All Design Ideas</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Portfolio Link */}
              <Link
                href="/portfolio"
                className="flex items-center px-3 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Portfolio</span>
              </Link>

              {/* AI Design Generator Link */}
              <Link
                href="/ai-designs"
                className="flex items-center px-3 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>AI Design Generator</span>
              </Link>

              {/* More - Main Menu Item (Level 1) */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleMobileDropdown('more')}
                  className="w-full flex items-center justify-between px-3 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  <span>More</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeMobileDropdown === 'more' ? 'rotate-180 text-red-400' : ''
                    }`} 
                  />
                </button>

                {/* Sub-Menu (Level 2) */}
                {activeMobileDropdown === 'more' && (
                  <div className="space-y-0.5 bg-gray-50 dark:bg-gray-800/30 rounded-xl p-2 animate-in slide-in-from-top-2 duration-200">
                    {moreItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-800">
                <button className="w-full px-4 py-3.5 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold uppercase">Free</span>
                  <span>Get Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
