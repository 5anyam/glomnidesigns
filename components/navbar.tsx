"use client"
import Link from "next/link";
import { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { PlaceholdersAndVanishInputDemo } from "./search";
import { NavbarModal } from "./navmodal";

// Define the type for dropdown values
type DropdownType = 'design' | 'more' | null;

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

  // Updated design categories with proper structure
  const designCategories = [
    {
      title: "Home Interior",
      items: [
        { label: "Living Room", href: "/design-ideas?category=living-room" },
        { label: "Bedroom", href: "/design-ideas?category=bedroom" },
        { label: "Kitchen", href: "/design-ideas?category=kitchen" },
        { label: "Bathroom", href: "/design-ideas?category=bathroom" },
        { label: "Dining Room", href: "/design-ideas?category=dining-room" }
      ]
    },
    {
      title: "Office Spaces",
      items: [
        { label: "Corporate Office", href: "/design-ideas?category=corporate-office" },
        { label: "Home Office", href: "/design-ideas?category=home-office" },
        { label: "Meeting Rooms", href: "/design-ideas?category=meeting-rooms" },
        { label: "Reception Area", href: "/design-ideas?category=reception-area" },
        { label: "Co-working Space", href: "/design-ideas?category=coworking-space" }
      ]
    },
    {
      title: "Data Centers",
      items: [
        { label: "Server Rooms", href: "/design-ideas?category=server-rooms" },
        { label: "Control Centers", href: "/design-ideas?category=control-centers" },
        { label: "Network Operations", href: "/design-ideas?category=network-operations" },
        { label: "Cloud Infrastructure", href: "/design-ideas?category=cloud-infrastructure" },
        { label: "Security Centers", href: "/design-ideas?category=security-centers" }
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
    <nav className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h1 className="font-bold text-xl text-white">Glomni Designs</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Design Ideas Dropdown with Categories */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('design')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/design-ideas"
                className="flex items-center gap-1 px-3 py-2 text-gray-300 hover:text-white font-medium transition-colors"
              >
                Design Ideas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {activeDropdown === 'design' && (
                <div className="absolute top-full left-0 mt-1 w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-4">
                  <div className="grid grid-cols-3 gap-4 px-4">
                    {designCategories.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <h3 className="font-semibold text-white text-sm border-b border-gray-600 pb-1">
                          {category.title}
                        </h3>
                        <div className="space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="block px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All Link */}
                  <div className="border-t border-gray-600 mt-4 pt-3 px-4">
                    <Link
                      href="/design-ideas"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>View All Design Ideas</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Link */}
            <Link
              href="/portfolio"
              className="px-3 py-2 text-gray-300 hover:text-white font-medium transition-colors"
            >
              Portfolio
            </Link>

            {/* Generate AI Designs with Offer Sticker */}
            <div className="relative">
              <Link
                href="/ai-designs"
                className="px-3 py-2 text-gray-300 hover:text-white font-medium transition-colors relative"
              >
                Generate AI Designs
                {/* Animated Offer Sticker */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                  <span className="relative text-[.5rem] z-10">NEW</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </Link>
            </div>

            {/* More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-gray-300 hover:text-white font-medium transition-colors">
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'more' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
                  {moreItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <div className="hidden sm:block">
              <PlaceholdersAndVanishInputDemo />
            </div>

            {/* Theme Switch */}
            <ThemeSwitch />

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
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
        <div className="lg:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-4 space-y-4">
            {/* Search on mobile */}
            <div className="sm:hidden">
              <PlaceholdersAndVanishInputDemo />
            </div>

            {/* Design Ideas - Mobile Categories */}
            <div>
              <Link 
                href="/design-ideas"
                className="font-medium text-white mb-2 hover:text-gray-300 transition-colors flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Design Ideas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <div className="pl-4 space-y-3">
                {designCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-400">
                      {category.title}
                    </h4>
                    <div className="pl-2 space-y-1">
                      {category.items.slice(0, 3).map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block text-sm text-gray-300 hover:text-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <Link
              href="/portfolio"
              className="block font-medium text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>

            {/* Generate AI Designs with Mobile Sticker */}
            <div className="relative">
              <Link
                href="/ai-designs"
                className="block font-medium text-white hover:text-gray-300 transition-colors relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Generate AI Designs
                {/* Mobile Offer Sticker */}
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                  NEW
                </span>
              </Link>
            </div>

            {/* More Items */}
            <div>
              <div className="font-medium text-white mb-2">More</div>
              <div className="pl-4 space-y-2">
                {moreItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button on mobile */}
            <button className="w-full mt-4 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">NEW</span>
              Talk To Expert
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
