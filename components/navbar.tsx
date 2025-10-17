"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { PlaceholdersAndVanishInputDemo } from "./search";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

type DropdownType = 'services' | 'designIdeas' | 'more' | null;
type ServicesSubMenu = 'office' | 'home' | null;

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [activeServicesSubMenu, setActiveServicesSubMenu] = useState<ServicesSubMenu>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<DropdownType>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<ServicesSubMenu>(null);

  const handleMouseEnter = (dropdown: Exclude<DropdownType, null>) => {
    setActiveDropdown(dropdown);
    if (dropdown !== 'services') {
      setActiveServicesSubMenu(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveServicesSubMenu(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveMobileDropdown(null);
      setExpandedMobileCategory(null);
    }
  };

  // Simplified Services - Only 2 main categories
  const officeServices = [
    { label: "Coworking Offices Interior", href: "/services/office/coworking", icon: "🤝" },
    { label: "Open Workspace Interior", href: "/services/office/open-workspace", icon: "💼" },
    { label: "Meeting Rooms Interior", href: "/services/office/meeting-rooms", icon: "👥" },
    { label: "Private Cabin Interior", href: "/services/office/private-cabin", icon: "🚪" },
    { label: "Personal Office Interior", href: "/services/office/personal-office", icon: "👔" },
    { label: "Home Office Interior", href: "/services/office/home-office", icon: "🏠" }
  ];

  const homeServices = [
    { label: "Modular Kitchen", href: "/services/home/kitchen", icon: "🍳" },
    { label: "Wardrobe Design", href: "/services/home/wardrobe", icon: "👗" },
    { label: "Bathroom Interior", href: "/services/home/bathroom", icon: "🚿" },
    { label: "Master Bedroom", href: "/services/home/master-bedroom", icon: "🛏️" },
    { label: "Living Room", href: "/services/home/living-room", icon: "🛋️" },
    { label: "Pooja Room", href: "/services/home/pooja-room", icon: "🙏" },
    { label: "Kids Bedroom", href: "/services/home/kids-bedroom", icon: "🧸" },
    { label: "Guest Bedroom", href: "/services/home/guest-bedroom", icon: "🛌" }
  ];

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
    { label: "Home Renovation", href: "/design-ideas/home-renovation", icon: "🔧" },
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
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-auto h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Glomni Designs"
                width={50}
                height={50}
                className="object-contain block dark:hidden"
                priority
              />
              <Image
                src="/logo-dark.png"
                alt="Glomni Designs"
                width={50}
                height={50}
                className="object-contain hidden dark:block"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px]">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex">
                      {/* Left Side - Main Categories */}
                      <div className="w-1/3 bg-gray-50 dark:bg-gray-800/50 p-4 border-r border-gray-200 dark:border-gray-700">
                        <button
                          onMouseEnter={() => setActiveServicesSubMenu('office')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                            activeServicesSubMenu === 'office'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Office Spaces</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                        <button
                          onMouseEnter={() => setActiveServicesSubMenu('home')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mt-2 ${
                            activeServicesSubMenu === 'home'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Home Interiors</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>

                      {/* Right Side - Sub Items */}
                      <div className="w-2/3 p-4">
                        {activeServicesSubMenu === 'office' && (
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                              Office Interior Solutions
                            </h3>
                            {officeServices.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all group"
                              >
                                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {activeServicesSubMenu === 'home' && (
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                              Home Interior Solutions
                            </h3>
                            {homeServices.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all group"
                              >
                                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {!activeServicesSubMenu && (
                          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
                            <div className="text-center">
                              <div className="text-4xl mb-2">👈</div>
                              <p className="text-sm">Hover on a category</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-800/50">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <span>View All Services</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Design Ideas */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('designIdeas')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/design-ideas"
                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Design Ideas
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'designIdeas' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'designIdeas' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[500px]">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4">
                    <div className="grid grid-cols-2 gap-1">
                      {designIdeasItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all group"
                        >
                          <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-3">
                      <Link
                        href="/design-ideas"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <span>Explore All Ideas</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Portfolio
            </Link>

            <Link
              href="/ai-designs"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              AI Design
            </Link>

            {/* More */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 mt-1 w-48">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl py-2">
                    {moreItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <PlaceholdersAndVanishInputDemo />
            </div>
            <ThemeSwitch />

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-h-[80vh] overflow-y-auto p-4 space-y-2">
            <div className="sm:hidden mb-4">
              <PlaceholdersAndVanishInputDemo />
            </div>

            <Link href="/" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              Home
            </Link>

            {/* Services Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Services
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'services' && (
                <div className="mt-2 space-y-2 pl-4">
                  <div>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'office' ? null : 'office')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Office Spaces
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'office' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'office' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {officeServices.map(item => (
                          <Link key={item.label} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'home' ? null : 'home')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Home Interiors
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'home' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'home' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {homeServices.map(item => (
                          <Link key={item.label} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Design Ideas Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'designIdeas' ? null : 'designIdeas')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Design Ideas
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'designIdeas' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'designIdeas' && (
                <div className="mt-2 space-y-1 pl-4">
                  {designIdeasItems.map(item => (
                    <Link key={item.label} href={item.href} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/portfolio" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              Portfolio
            </Link>

            <Link href="/ai-designs" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              AI Design
            </Link>

            {/* More Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'more' ? null : 'more')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                More
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'more' && (
                <div className="mt-2 space-y-1 pl-4">
                  {moreItems.map(item => (
                    <Link key={item.label} href={item.href} className="block px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { PlaceholdersAndVanishInputDemo } from "./search";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

type DropdownType = 'services' | 'designIdeas' | 'more' | null;
type ServicesSubMenu = 'office' | 'home' | null;

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [activeServicesSubMenu, setActiveServicesSubMenu] = useState<ServicesSubMenu>('office'); // Default to office
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<DropdownType>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<ServicesSubMenu>(null);

  const handleMouseEnter = (dropdown: Exclude<DropdownType, null>) => {
    setActiveDropdown(dropdown);
    if (dropdown === 'services') {
      setActiveServicesSubMenu('office'); // Set default when opening services
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveServicesSubMenu('office'); // Reset to default
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveMobileDropdown(null);
      setExpandedMobileCategory(null);
    }
  };

  // Simplified Services - Only 2 main categories
  const officeServices = [
    { label: "Coworking Offices Interior", href: "/services/office/coworking", icon: "🤝" },
    { label: "Open Workspace Interior", href: "/services/office/open-workspace", icon: "💼" },
    { label: "Meeting Rooms Interior", href: "/services/office/meeting-rooms", icon: "👥" },
    { label: "Private Cabin Interior", href: "/services/office/private-cabin", icon: "🚪" },
    { label: "Personal Office Interior", href: "/services/office/personal-office", icon: "👔" },
    { label: "Home Office Interior", href: "/services/office/home-office", icon: "🏠" }
  ];

  const homeServices = [
    { label: "Modular Kitchen", href: "/services/home/kitchen", icon: "🍳" },
    { label: "Wardrobe Design", href: "/services/home/wardrobe", icon: "👗" },
    { label: "Bathroom Interior", href: "/services/home/bathroom", icon: "🚿" },
    { label: "Master Bedroom", href: "/services/home/master-bedroom", icon: "🛏️" },
    { label: "Living Room", href: "/services/home/living-room", icon: "🛋️" },
    { label: "Pooja Room", href: "/services/home/pooja-room", icon: "🙏" },
    { label: "Kids Bedroom", href: "/services/home/kids-bedroom", icon: "🧸" },
    { label: "Guest Bedroom", href: "/services/home/guest-bedroom", icon: "🛌" }
  ];

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
    { label: "Home Renovation", href: "/design-ideas/home-renovation", icon: "🔧" },
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
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-auto h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Glomni Designs"
                width={50}
                height={50}
                className="object-contain block dark:hidden"
                priority
              />
              <Image
                src="/logo-dark.png"
                alt="Glomni Designs"
                width={50}
                height={50}
                className="object-contain hidden dark:block"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px]">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex">
                      {/* Left Side - Main Categories */}
                      <div className="w-1/3 bg-gray-50 dark:bg-gray-800/50 p-4 border-r border-gray-200 dark:border-gray-700">
                        <button
                          onMouseEnter={() => setActiveServicesSubMenu('office')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                            activeServicesSubMenu === 'office'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Office Spaces</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                        <button
                          onMouseEnter={() => setActiveServicesSubMenu('home')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mt-2 ${
                            activeServicesSubMenu === 'home'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Home Interiors</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>

                      {/* Right Side - Sub Items */}
                      <div className="w-2/3 p-4">
                        {activeServicesSubMenu === 'office' && (
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                              Office Interior Solutions
                            </h3>
                            {officeServices.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all group"
                              >
                                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {activeServicesSubMenu === 'home' && (
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                              Home Interior Solutions
                            </h3>
                            {homeServices.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all group"
                              >
                                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-800/50">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <span>View All Services</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Design Ideas */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('designIdeas')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/design-ideas"
                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Design Ideas
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'designIdeas' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'designIdeas' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[500px]">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4">
                    <div className="grid grid-cols-2 gap-1">
                      {designIdeasItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all group"
                        >
                          <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-3">
                      <Link
                        href="/design-ideas"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <span>Explore All Ideas</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Portfolio
            </Link>

            <Link
              href="/ai-designs"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              AI Design
            </Link>

            {/* More */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 mt-1 w-48">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl py-2">
                    {moreItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-gray-900 dark:hover:text-white transition-all"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <PlaceholdersAndVanishInputDemo />
            </div>
            <ThemeSwitch />

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-h-[80vh] overflow-y-auto p-4 space-y-2">
            <div className="sm:hidden mb-4">
              <PlaceholdersAndVanishInputDemo />
            </div>

            <Link href="/" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              Home
            </Link>

            {/* Services Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Services
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'services' && (
                <div className="mt-2 space-y-2 pl-4">
                  <div>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'office' ? null : 'office')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Office Spaces
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'office' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'office' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {officeServices.map(item => (
                          <Link key={item.label} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'home' ? null : 'home')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Home Interiors
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'home' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'home' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {homeServices.map(item => (
                          <Link key={item.label} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Design Ideas Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'designIdeas' ? null : 'designIdeas')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Design Ideas
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'designIdeas' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'designIdeas' && (
                <div className="mt-2 space-y-1 pl-4">
                  {designIdeasItems.map(item => (
                    <Link key={item.label} href={item.href} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/portfolio" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              Portfolio
            </Link>

            <Link href="/ai-designs" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              AI Design
            </Link>

            {/* More Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'more' ? null : 'more')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                More
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'more' && (
                <div className="mt-2 space-y-1 pl-4">
                  {moreItems.map(item => (
                    <Link key={item.label} href={item.href} className="block px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
