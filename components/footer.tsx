"use client"
import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Heart,
  ChevronUp,
  Send,
  Palette
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(true);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Glomni Designs</h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming spaces with innovative interior design solutions. 
              Creating beautiful, functional environments that reflect your unique style and personality.
            </p>
            
            <div className="space-y-2">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com/glomnidesigns" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/glomnidesigns" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/glomnidesigns" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@glomnidesigns" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/glomnidesigns" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/design-ideas" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Design Ideas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/interior-design" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="/services/consultation" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Design Consultation
                </Link>
              </li>
              <li>
                <Link href="/services/custom-projects" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Custom Projects
                </Link>
              </li>
              <li>
                <Link href="/services/material-sourcing" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Material Sourcing
                </Link>
              </li>
              <li>
                <Link href="/services/3d-visualization" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  3D Visualization
                </Link>
              </li>
              <li>
                <Link href="/services/project-management" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Project Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Get In Touch</h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                  Logix Technova, A-629 & A-630 <br/>
                  Noida-Greater Noida Expressway <br/>
                  Block B, Sector 132, Noida <br/>
                  Uttar Pradesh 201301<br/>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a 
                  href="tel:+919876543210" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a 
                  href="mailto:info@glomnidesigns.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  info@glomnidesigns.com
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h5 className="text-sm font-semibold mb-3 text-blue-400">Design Newsletter</h5>
              <p className="text-gray-400 text-sm mb-4">
                Get weekly design tips and inspiration
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-400 text-white placeholder-gray-400 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-semibold"
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
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 Glomni Designs. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed & Developed with <Heart className="w-3 h-3 inline text-red-500" /> in Delhi
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300 group"
                aria-label="Back to top"
              >
                <ChevronUp className="w-5 h-5 group-hover:animate-bounce" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
