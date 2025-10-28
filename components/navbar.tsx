"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { PlaceholdersAndVanishInputDemo } from "./search";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

type DropdownType = 'offerings' | 'designIdeas' | 'more' | null;
type SubMenuType = 'home' | 'office' | null;

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [activeOfferingsSubMenu, setActiveOfferingsSubMenu] = useState<SubMenuType>(null);
  const [activeDesignIdeasSubMenu, setActiveDesignIdeasSubMenu] = useState<SubMenuType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<DropdownType>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const handleMouseEnter = (dropdown: Exclude<DropdownType, null>) => {
    setActiveDropdown(dropdown);
    if (dropdown !== 'offerings') {
      setActiveOfferingsSubMenu(null);
    }
    if (dropdown !== 'designIdeas') {
      setActiveDesignIdeasSubMenu(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveOfferingsSubMenu(null);
    setActiveDesignIdeasSubMenu(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveMobileDropdown(null);
      setExpandedMobileCategory(null);
    }
  };

  // Offerings - Home & Office
  const homeOfferings = [
    { label: "Kitchen Design", href: "/offerings/kitchen", icon: "🍳" },
    { label: "Wardrobe Design", href: "/offerings/wardrobe", icon: "👔" },
    { label: "Living Spaces", href: "/offerings/living-spaces", icon: "🛋️" },
    { label: "Bathroom Interior", href: "/offerings/bathroom", icon: "🚿" },
    { label: "Bedroom Design", href: "/offerings/bedroom", icon: "🛏️" },
    { label: "Pooja Room", href: "/offerings/pooja-room", icon: "🙏" }
  ];

  const officeOfferings = [
    { label: "Corporate Offices", href: "/offerings/corporate-office", icon: "🏢" },
    { label: "Coworking Spaces", href: "/offerings/coworking", icon: "🤝" },
    { label: "Meeting Rooms", href: "/offerings/meeting-rooms", icon: "👥" },
    { label: "Executive Cabins", href: "/offerings/executive-cabin", icon: "👔" },
    { label: "Reception Areas", href: "/offerings/reception", icon: "🎯" },
    { label: "Cafeteria Design", href: "/offerings/cafeteria", icon: "☕" }
  ];

  // Design Ideas - Home & Office
  const homeDesignIdeas = [
    { label: "Room Ideas", href: "/design-ideas/room-ideas", icon: "🏠" },
    { label: "Decor & Inspiration", href: "/design-ideas/decor-inspiration", icon: "✨" },
    { label: "Home Decor", href: "/design-ideas/home-decor", icon: "🎨" },
    { label: "Lighting Ideas", href: "/design-ideas/lighting-ideas", icon: "💡" },
    { label: "Vastu Tips", href: "/design-ideas/vastu-tips", icon: "🧭" },
    { label: "Home Organisation", href: "/design-ideas/home-organisation", icon: "📦" },
    { label: "Materials Guide", href: "/design-ideas/materials-guide", icon: "🔨" }
  ];

  const officeDesignIdeas = [
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

            {/* Offerings Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('offerings')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Offerings
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'offerings' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'offerings' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex">
                      {/* Left Side - Main Categories */}
                      <div className={`bg-gray-50 dark:bg-gray-800/50 p-4 ${activeOfferingsSubMenu ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}>
                        <button
                          onMouseEnter={() => setActiveOfferingsSubMenu('home')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                            activeOfferingsSubMenu === 'home'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Home Offerings</span>
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </div>
                        </button>
                        <button
                          onMouseEnter={() => setActiveOfferingsSubMenu('office')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mt-2 whitespace-nowrap ${
                            activeOfferingsSubMenu === 'office'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Office Offerings</span>
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </div>
                        </button>
                      </div>

                      {/* Right Side - Sub Items */}
                      {activeOfferingsSubMenu && (
                        <div className="w-[350px] p-4">
                          {activeOfferingsSubMenu === 'home' && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                                Home Interior Offerings
                              </h3>
                              {homeOfferings.map((item) => (
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

                          {activeOfferingsSubMenu === 'office' && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                                Office Interior Offerings
                              </h3>
                              {officeOfferings.map((item) => (
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
                      )}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-800/50">
                      <Link
                        href="/offerings"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <span>View All Offerings</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Design Ideas Mega Menu */}
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex">
                      {/* Left Side - Main Categories */}
                      <div className={`bg-gray-50 dark:bg-gray-800/50 p-4 ${activeDesignIdeasSubMenu ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}>
                        <button
                          onMouseEnter={() => setActiveDesignIdeasSubMenu('home')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                            activeDesignIdeasSubMenu === 'home'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Home Ideas</span>
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </div>
                        </button>
                        <button
                          onMouseEnter={() => setActiveDesignIdeasSubMenu('office')}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mt-2 whitespace-nowrap ${
                            activeDesignIdeasSubMenu === 'office'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Office Ideas</span>
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </div>
                        </button>
                      </div>

                      {/* Right Side - Sub Items */}
                      {activeDesignIdeasSubMenu && (
                        <div className="w-[350px] p-4">
                          {activeDesignIdeasSubMenu === 'home' && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                                Home Design Ideas
                              </h3>
                              {homeDesignIdeas.map((item) => (
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

                          {activeDesignIdeasSubMenu === 'office' && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                                Office Design Ideas
                              </h3>
                              {officeDesignIdeas.map((item) => (
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
                      )}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-800/50">
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
              href="/blogs"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Blogs
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

            {/* Offerings Mobile */}
            <div>
              <button
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'offerings' ? null : 'offerings')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Offerings
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'offerings' ? 'rotate-180' : ''}`} />
              </button>

              {activeMobileDropdown === 'offerings' && (
                <div className="mt-2 space-y-2 pl-4">
                  <div>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'offerings-home' ? null : 'offerings-home')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Home Offerings
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'offerings-home' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'offerings-home' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {homeOfferings.map(item => (
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
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'offerings-office' ? null : 'offerings-office')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Office Offerings
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'offerings-office' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'offerings-office' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {officeOfferings.map(item => (
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
                <div className="mt-2 space-y-2 pl-4">
                  <div>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'ideas-home' ? null : 'ideas-home')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Home Ideas
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'ideas-home' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'ideas-home' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {homeDesignIdeas.map(item => (
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
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'ideas-office' ? null : 'ideas-office')}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 font-medium text-sm"
                    >
                      Office Ideas
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedMobileCategory === 'ideas-office' ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedMobileCategory === 'ideas-office' && (
                      <div className="mt-1 space-y-1 pl-4">
                        {officeDesignIdeas.map(item => (
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

            <Link href="/portfolio" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              Portfolio
            </Link>

            <Link href="/blogs" className="block px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleMobileMenu}>
              Blogs
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
