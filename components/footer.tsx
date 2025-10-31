"use client"
import { useState } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Heart, ChevronUp, Send, Briefcase, Store, HomeIcon
} from 'lucide-react';
import Image from 'next/image';

type KeywordsPosition = 'inside' | 'below';

export default function Footer({ position = 'inside' }: { position?: KeywordsPosition }) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SEO-rich keywords organized by category
  const designCategories = {
    office: [
      { name: "Best Office Space Designs", href: "/design-ideas?category=office" },
      { name: "Corporate Office Interiors", href: "/design-ideas?category=corporate" },
      { name: "Modern Workspace Design", href: "/design-ideas?category=workspace" },
      { name: "Executive Office Design", href: "/design-ideas?category=executive-office" },
      { name: "Open Office Layout", href: "/design-ideas?category=open-office" },
      { name: "Coworking Space Design", href: "/design-ideas?category=coworking" },
    ],
    commercial: [
      { name: "Retail Store Design", href: "/design-ideas?category=retail" },
      { name: "Restaurant Interior Design", href: "/design-ideas?category=restaurant" },
      { name: "Hotel Interior Design", href: "/design-ideas?category=hotel" },
      { name: "Cafe Design Ideas", href: "/design-ideas?category=cafe" },
      { name: "Showroom Design", href: "/design-ideas?category=showroom" },
      { name: "Commercial Space Planning", href: "/design-ideas?category=commercial" },
    ],
    residential: [
      { name: "Luxury Home Interiors", href: "/design-ideas?category=luxury-home" },
      { name: "Modern Apartment Design", href: "/design-ideas?category=apartment" },
      { name: "Villa Interior Design", href: "/design-ideas?category=villa" },
      { name: "Kitchen Design Ideas", href: "/design-ideas?category=kitchen" },
      { name: "Bedroom Interior Design", href: "/design-ideas?category=bedroom" },
      { name: "Living Room Design", href: "/design-ideas?category=living-room" },
    ]
  } as const;

  const services = [
    { name: "Interior Design Consultation", href: "/services/consultation" },
    { name: "3D Visualization Services", href: "/services/3d-visualization" },
    { name: "Turnkey Projects", href: "/services/turnkey" },
    { name: "Space Planning", href: "/services/space-planning" },
    { name: "Custom Furniture Design", href: "/services/custom-furniture" },
    { name: "Material Sourcing", href: "/services/material-sourcing" },
  ] as const;

  const locations = [
    { name: "Delhi NCR", href: "/locations/delhi-ncr" },
    { name: "Noida", href: "/locations/noida" },
    { name: "Gurgaon", href: "/locations/gurgaon" },
    { name: "Greater Noida", href: "/locations/greater-noida" },
    { name: "Faridabad", href: "/locations/faridabad" },
    { name: "Ghaziabad", href: "/locations/ghaziabad" },
  ] as const;

  const KeywordsSection = () => (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Explore Our Design Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Professional interior design solutions for every space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Office Designs */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-400 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Office & Workspace</h3>
            </div>
            <ul className="space-y-2">
              {designCategories.office.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Designs */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-400 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Commercial Spaces</h3>
            </div>
            <ul className="space-y-2">
              {designCategories.commercial.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Residential Designs */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-400 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Residential Interiors</h3>
            </div>
            <ul className="space-y-2">
              {designCategories.residential.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <footer className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 transition-colors">
        {/* Show keywords section at top of footer if 'inside' */}
        {position === 'inside' && <KeywordsSection />}

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info - Spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Link href="/" className="flex items-center group">
                  <div className="relative w-auto h-12 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src="/logo.png"
                      alt="Glomni Designs"
                      width={48}
                      height={48}
                      className="block object-contain group-hover:opacity-80 dark:hidden transition-opacity"
                      priority
                    />
                    <Image
                      src="/logo-dark.png"
                      alt="Glomni Designs"
                      width={48}
                      height={48}
                      className="hidden object-contain group-hover:opacity-80 dark:block transition-opacity"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                Transforming spaces with innovative interior design solutions. 
                Creating beautiful, functional environments for offices, homes, and commercial spaces across Delhi NCR.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Logix Technova, A-629 & A-630<br/>
                      Noida-Greater Noida Expressway<br/>
                      Block B, Sector 132, Noida<br/>
                      Uttar Pradesh 201301
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <a 
                    href="tel:+919876543210" 
                    className="text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    +91 98765 43210
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-400" />
                  <a 
                    href="mailto:info@glomnidesigns.com" 
                    className="text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    info@glomnidesigns.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Follow Us</h4>
                <div className="flex items-center gap-2">
                  {[
                    { Icon: Facebook, href: 'https://facebook.com/glomnidesigns', label: 'Facebook' },
                    { Icon: Instagram, href: 'https://instagram.com/glomnidesigns', label: 'Instagram' },
                    { Icon: Linkedin, href: 'https://linkedin.com/company/glomnidesigns', label: 'LinkedIn' },
                    { Icon: Youtube, href: 'https://youtube.com/@glomnidesigns', label: 'YouTube' },
                    { Icon: Twitter, href: 'https://twitter.com/glomnidesigns', label: 'Twitter' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-400 dark:hover:bg-red-400 hover:text-white transition-all duration-300"
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Design Ideas', href: '/design-ideas' },
                  { name: 'AI Design Generator', href: '/ai-designs' },
                  { name: 'Portfolio', href: '/portfolio' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                ].map((it) => (
                  <li key={it.name}>
                    <Link href={it.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors">
                      {it.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link 
                      href={service.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Locations + Newsletter */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Service Locations</h4>
              <ul className="space-y-2 mb-6">
                {locations.map((location) => (
                  <li key={location.name}>
                    <Link 
                      href={location.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h5 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Newsletter</h5>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">
                  Design tips & inspiration
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © 2025 Glomni Designs. All rights reserved.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                  Designed & Developed with <Heart className="w-3 h-3 inline text-red-400" /> in Delhi NCR
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap.xml" className="text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors">
                  Sitemap
                </Link>
              </div>

              <button
                onClick={scrollToTop}
                className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full transition-all duration-300 group hover:scale-110"
                aria-label="Back to top"
              >
                <ChevronUp className="w-5 h-5 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Show keywords section under footer if 'below' */}
      {position === 'below' && <KeywordsSection />}
    </>
  );
}
