"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Slide data
const slideData = [
  {
    title: "Constructions",
    button: "Explore Layouts",
    description: "Glomni Designs constructs modern, durable, and design-led spaces built to last.",
    src: "https://elegant-charity-710d3644d3.media.strapiapp.com/banner_2_c15677e247.jpg",
  },
  {
    title: "Home Interiors",
    button: "Explore Designs",
    description: "Transforming houses into homes with timeless design and thoughtful detail.",
    src: "https://elegant-charity-710d3644d3.media.strapiapp.com/banner_1_de9a4048ee.jpg",
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
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="max-w-4xl">
                {/* Badge */}
              
              </div>
            </div>

            {/* Slide Number */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
              {index + 1} / {slideData.length}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-red-400 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl group z-10"
      >
        <IconChevronLeft size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-red-400 transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-red-400 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl group z-10"
      >
        <IconChevronRight size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-red-400 transition-colors" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-red-400 w-8' 
                : 'bg-white/60 hover:bg-white/80 w-2'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-red-400 transition-all duration-300"
          style={{ width: `${((current + 1) / slideData.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
