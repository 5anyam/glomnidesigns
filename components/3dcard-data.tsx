"use client"
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
      color: "red",
    },
    {
      title: "Data Centers",
      description: "Professional data center design solutions with optimal cooling, security, and scalability for modern infrastructure.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      link: "/design-ideas?category=data-centers",
      color: "red",
    },
    {
      title: "Office Designs",
      description: "Maximize productivity with functional and aesthetic office designs that inspire creativity and collaboration.",
      image: "https://images.unsplash.com/photo-1716703373229-b0e43de7dd5c",
      link: "/design-ideas?category=office-spaces",
      color: "red",
    },
    {
      title: "Construction",
      description: "Complete construction planning and management services from concept to completion with expert supervision.",
      image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
      link: "/portfolio",
      color: "red",
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
    <div className="container mx-auto px-4 py-6 md:py-8 bg-white dark:bg-gray-950 transition-colors">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4"
        >
          <span className="bg-red-400/10 text-red-400 px-4 py-2 rounded-full text-sm font-semibold">
            Our Services
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Premium Design Solutions
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Comprehensive interior design and construction services tailored to your needs
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
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full p-3 shadow-lg hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-400 transition-colors" />
          </button>
          
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full p-3 shadow-lg hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-400 transition-colors" />
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
            className="flex transition-transform duration-500 ease-out"
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
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-red-400 w-8'
                  : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Carousel Card Component
interface CarouselCardProps {
  card: {
    title: string;
    description: string;
    image: string;
    link: string;
    color: string;
  };
  index: number;
  slidesToShow: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ card, index, slidesToShow }) => {
  return (
    <div 
      className="px-3 pb-8"
      style={{ minWidth: `${100 / slidesToShow}%` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200 dark:border-gray-800 hover:border-red-400 dark:hover:border-red-400 transition-all duration-300 h-full"
      >
        {/* Image Section */}
        <div className="relative h-56 lg:h-64 overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            Featured
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              href={card.link}
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3 rounded-xl hover:bg-red-400 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-lg font-semibold border-2 border-white dark:border-gray-800"
            >
              <span>View Details</span>
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-1">
            {card.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
            {card.description}
          </p>

          <Link
            href={card.link}
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-500 font-semibold text-sm group/link"
          >
            <span>Explore More</span>
            <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </motion.div>
    </div>
  );
};
