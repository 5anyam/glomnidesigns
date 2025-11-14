"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Slide data with URLs
const slideData = [
  {
    title: "Design your office, Define your success",
    button: "Explore Layouts",
    description: "Glomni Designs constructs modern, durable, and designled spaces built to last.",
    url: "/category/office-spaces",
    src: "https://elegant-charity-710d3644d3.media.strapiapp.com/office_interior_banner_04ac0bff06.jpg",
  },
  {
    title: "Turning every corner into comfort",
    button: "Explore Designs",
    description: "Transforming houses into homes with timeless design and thoughtful detail.",
    url: "/home-interiors",
    src: "https://elegant-charity-710d3644d3.media.strapiapp.com/home_interior_banner_c519c62925.jpg",
  }
];

export default function SimpleSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slideData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));
  };

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentSlide = slideData[current];

  return (
    <div 
      className="relative w-screen bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative h-[500px] md:h-[600px]">
        {slideData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            
            {/* Enhanced Gradient Overlay for better text readability - center-focused */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
          </div>
        ))}
      </div>

      {/* Content - Fully center-aligned, sliding in from above */}
      <motion.div
        key={current} // Re-animates on slide change
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center p-8 md:p-12 text-white z-10"
      >
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Title - Enhanced with gradient text and shadow for better visibility */}
          <motion.h2 
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-300 via-white to-red-300 bg-clip-text text-transparent drop-shadow-2xl leading-tight"
          >
            {currentSlide.title}
          </motion.h2>

          {/* Description - Improved spacing and readability */}
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
          >
            {currentSlide.description}
          </motion.p>

          {/* Button - Centered, with improved hover and scale effect */}
          <motion.div 
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href={currentSlide.url}
              className="inline-flex items-center px-8 md:px-10 py-4 bg-red-400/90 backdrop-blur-sm hover:bg-red-500/90 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-red-500/25 hover:scale-105 border border-white/20"
            >
              {currentSlide.button}
              <IconChevronRight size={20} className="ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Number - Improved positioning and style */}
      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30 z-20 shadow-lg">
        {current + 1} / {slideData.length}
      </div>

      {/* Navigation Arrows - Slightly larger and more prominent */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-gray-200/50 dark:border-gray-800/50 hover:border-red-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-red-500/20 group z-20 hover:scale-110"
      >
        <IconChevronLeft size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-red-400 transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-gray-200/50 dark:border-gray-800/50 hover:border-red-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-red-500/20 group z-20 hover:scale-110"
      >
        <IconChevronRight size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-red-400 transition-colors" />
      </button>

      {/* Dots Indicator - Enhanced with better backdrop */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 z-20 shadow-2xl">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-400 ${
              index === current 
                ? 'bg-red-400 w-10 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70 w-3'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar - Thicker and more visible */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200/50 dark:bg-gray-800/50 z-20">
        <div 
          className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500 shadow-lg"
          style={{ width: `${((current + 1) / slideData.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
