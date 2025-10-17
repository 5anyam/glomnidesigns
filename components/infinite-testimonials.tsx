"use client";

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Star, Users, Award, Quote } from 'lucide-react';

export function InfiniteMovingCardsDemo() {
  return (
    <div className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              What Our Clients Say
            </h2>
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-red-400 rotate-180" />
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it. Hear from our satisfied clients who have experienced the Glomni Designs difference. 
            Every testimonial represents a dream turned into reality.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/20 px-4 py-2 rounded-full border border-yellow-200 dark:border-yellow-800">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
              <Users className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/20 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Award-Winning Designs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Moving Cards */}
      <div className="h-[29rem] flex flex-col antialiased items-center justify-center relative">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Design solutions that work as hard as you do – Connect with us!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the Glomni Designs difference. Let us transform your space into something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 px-6 md:px-8 py-3 md:py-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Start Your Project
              </button>
              <button className="flex-1 px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-red-400 transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "Glomni Designs completely transformed our living space beyond our expectations. Their attention to detail and creative vision turned our house into a dream home. The team was professional, timely, and delivered exceptional quality work.",
    name: "Priya Sharma",
    title: "Homeowner, Gurgaon",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b586?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Working with Glomni Designs for our office renovation was the best decision we made. They created a modern, functional workspace that boosted our team's productivity. The project was completed on time and within budget.",
    name: "Rajesh Kumar",
    title: "CEO, Tech Solutions Delhi",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "The kitchen makeover by Glomni Designs is absolutely stunning! They understood our lifestyle and created a perfect blend of functionality and aesthetics. Our family loves spending time in the new kitchen.",
    name: "Anjali Gupta",
    title: "Interior Design Enthusiast, Noida",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Glomni Designs delivered our data center project with precision and technical expertise. Their understanding of both aesthetics and functionality in critical infrastructure is unmatched. Highly recommended for commercial projects.",
    name: "Vikram Singh",
    title: "IT Director, Mumbai",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "From concept to completion, Glomni Designs exceeded every expectation. Their AI design preview feature helped us visualize the final result perfectly. The after-delivery support has been exceptional too.",
    name: "Meera Agarwal",
    title: "Happy Client, Delhi",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "The bedroom redesign by Glomni Designs created our perfect sanctuary. They listened to our needs, respected our budget, and delivered a luxurious space that feels like a five-star hotel room.",
    name: "Arjun Patel",
    title: "Business Owner, Gurgaon",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];
