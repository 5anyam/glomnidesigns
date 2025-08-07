"use client"
// app/page.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ExampleWithModalButton } from "./universalmodal";

export default function Threedcardshome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cards = [
    {
      title: "Interior for Homes",
      description: "We provide modern and minimalistic interior designs tailored for homes with premium quality and attention to detail.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      link: "/design-ideas?category=home-interior",
      gradient: "from-blue-500 to-purple-600",
      icon: "🏠"
    },
    {
      title: "Data Centers",
      description: "Professional data center design solutions with optimal cooling, security, and scalability for modern infrastructure.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      link: "/design-ideas?category=data-centers",
      gradient: "from-green-500 to-teal-600",
      icon: "🖥️"
    },
    {
      title: "Office Space Planning",
      description: "Maximize productivity with functional and aesthetic office designs that inspire creativity and collaboration.",
      image: "https://images.unsplash.com/photo-1716703373229-b0e43de7dd5c",
      link: "/design-ideas?category=office-spaces",
      gradient: "from-orange-500 to-red-600",
      icon: "🏢"
    },
    {
      title: "Construction Planning",
      description: "Complete construction planning and management services from concept to completion with expert supervision.",
      image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
      link: "/portfolio",
      gradient: "from-purple-500 to-pink-600",
      icon: "🏗️"
    }
  ];

  // Get slides to show based on screen size
  const getSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.max(1, cards.length - slidesToShow + 1));
      }, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, slidesToShow, cards.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < cards.length - slidesToShow) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= cards.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? Math.max(0, cards.length - slidesToShow) : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Our Premium Services
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
        >
          Discover our comprehensive range of interior design and construction services
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <div className="hidden md:block">
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>
          
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>
        </div>

        {/* Carousel Track */}
        <div 
          className="overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {cards.map((card, index) => (
              <CarouselCard 
                key={index} 
                card={card} 
                index={index}
                slidesToShow={slidesToShow}
              />
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.max(1, cards.length - slidesToShow + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-blue-600 dark:bg-blue-400 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* ✅ REMOVED: Auto-play toggle button section */}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <ExampleWithModalButton/>
      </div>
    </div>
  );
}

// Carousel Card Component with Added Padding
interface CarouselCardProps {
  card: {
    title: string;
    description: string;
    image: string;
    link: string;
    gradient: string;
    icon: string;
  };
  index: number;
  slidesToShow: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ card, index, slidesToShow }) => {
  return (
    <div 
      className="px-3 pb-8"  // ✅ ADDED: pb-8 for padding bottom
      style={{ minWidth: `${100 / slidesToShow}%` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300"
      >
        {/* Image Section */}
        <div className="relative h-48 lg:h-56 overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50 dark:border-gray-700/50">
            <span className="text-2xl">{card.icon}</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              href={card.link}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white px-4 py-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 shadow-lg font-semibold"
            >
              <span>Explore</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {card.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {card.description}
          </p>

          <Link
            href={card.link}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm group-hover:gap-3 transition-all duration-200"
          >
            Learn More
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Premium Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Premium
        </div>
      </motion.div>
    </div>
  );
};
