"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Home, 
  Bed, 
  Users, 
  Briefcase, 
  Droplets, 
  ChefHat, 
  UtensilsCrossed,
  Sparkles 
} from 'lucide-react';

/* -------------------------  Enhanced Card Image Component  ------------------------ */
function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-t-xl group-hover:scale-105 transition-transform duration-500">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        priority
        unoptimized
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

/* -----------------------------  Enhanced Grid Component  --------------------------- */
export function BentoGridDemo() {
  return (
    <div className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Our Design Categories
            </h2>
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our expertise across different spaces. From cozy living rooms to functional kitchens, 
            we transform every corner of your home into a masterpiece.
          </p>
        </motion.div>

        {/* Enhanced Grid - Mobile 2 Columns, Desktop More */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer bg-gray-900/60 border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Square Image */}
              <CardImage src={item.src} alt={item.alt} />

              {/* Content Section */}
              <div className="p-3 sm:p-4">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>

                {/* View More Button - Hidden on Mobile, Visible on Hover */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  <button className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold">
                    View Designs
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Can't Find Your Space?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              We design every type of space imaginable. Contact us for custom interior solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base">
                Get Custom Quote
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-gray-600 text-white font-bold rounded-xl hover:bg-gray-800 hover:border-purple-500 transition-all text-sm sm:text-base">
                View All Projects
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------  Enhanced Card Data  ------------------------------- */
const items = [
  {
    title: "Living Rooms",
    description: "Create warm and inviting spaces where families gather and memories are made.",
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=500&fit=crop",
    alt: "Modern living room interior design",
    icon: <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Master Bedrooms",
    description: "Design peaceful retreats that promote rest and relaxation in style.",
    src: "https://images.unsplash.com/photo-1648634158203-199accfd7afc?w=500&h=500&fit=crop",
    alt: "Luxury master bedroom interior",
    icon: <Bed className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Pooja Rooms",
    description: "Sacred spaces designed with reverence, beauty, and spiritual harmony.",
    src: "https://images.unsplash.com/photo-1616308913689-cb92c5bea67e?w=500&h=500&fit=crop",
    alt: "Traditional pooja room design",
    icon: <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Office Spaces",
    description: "Productive work environments that inspire creativity and focus.",
    src: "https://images.unsplash.com/photo-1622126755582-16754165dce8?w=500&h=500&fit=crop",
    alt: "Modern home office workspace",
    icon: <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Bathrooms",
    description: "Spa-like sanctuaries that combine luxury with everyday functionality.",
    src: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?w=500&h=500&fit=crop",
    alt: "Contemporary bathroom design",
    icon: <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Kitchens",
    description: "Heart of the home where culinary magic meets stunning design.",
    src: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&h=500&fit=crop",
    alt: "Modern kitchen interior design",
    icon: <ChefHat className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Dining Areas",
    description: "Elegant spaces designed for memorable meals and meaningful conversations.",
    src: "https://images.unsplash.com/photo-1735146071436-4ceb5f8c2866?w=500&h=500&fit=crop",
    alt: "Elegant dining room interior",
    icon: <UtensilsCrossed className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
  {
    title: "Conference Rooms",
    description: "Elegant spaces designed for memorable meals and meaningful conversations.",
    src: "https://www.property.mq.edu.au/__data/assets/image/0004/365035/75T_604sm.JPG",
    alt: "Elegant dining room interior",
    icon: <UtensilsCrossed className="w-3 h-3 sm:w-4 sm:h-4 text-white" />,
  },
];
