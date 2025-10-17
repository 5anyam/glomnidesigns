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
    src: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Home Interiors",
    button: "Explore Designs",
    description: "Transforming houses into homes with timeless design and thoughtful detail.",
    src: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Office Interiors",
    button: "Explore Designs",
    description: "We design offices that reflect innovation, comfort, and your company’s identity.",
    src: "https://images.unsplash.com/photo-1716703371653-ca74beaa7a4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Data Centers",
    button: "Explore Centers",
    description: "At Glomni Designs, we create high-performance data centres built for reliability and innovation with multiple security levels.",
    src: "https://images.unsplash.com/photo-1584169417032-d34e8d805e8b?q=80&w=2209&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
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
      className="relative w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors"
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
                

                {/* Title */}
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                  {slide.description}
                </p>

                {/* Button */}
                <button className="px-8 py-4 bg-red-400 hover:bg-red-500 text-white rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center gap-2">
                  {slide.button}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
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
