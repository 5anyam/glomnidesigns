"use client";

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Star, Users, Award, Quote } from 'lucide-react';

export function InfiniteMovingCardsDemo() {
  return (
    <div className="py-4 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Quote className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <Quote className="w-8 h-8 text-purple-400 rotate-180" />
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it. Hear from our satisfied clients who have experienced the Glomni Designs difference. 
            Every testimonial represents a dream turned into reality.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-gray-300">4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Award-Winning Designs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Moving Cards */}
      <div className="h-[20rem] flex flex-col antialiased items-center justify-center relative">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Experience the Glomni Designs difference. Let us transform your space into something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                Start Your Project
              </button>
              <button className="flex-1 px-8 py-4 border-2 border-gray-600 text-white font-bold rounded-xl hover:bg-gray-800 hover:border-purple-500 transition-all">
                View Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Update your testimonials array to include avatar images
const testimonials = [
    {
      quote:
        "Glomni Designs completely transformed our living space beyond our expectations. Their attention to detail and creative vision turned our house into a dream home. The team was professional, timely, and delivered exceptional quality work.",
      name: "Priya Sharma",
      title: "Homeowner, Gurgaon",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b586?w=150&h=150&fit=crop&crop=face", // Professional Indian woman
    },
    {
      quote:
        "Working with Glomni Designs for our office renovation was the best decision we made. They created a modern, functional workspace that boosted our team's productivity. The project was completed on time and within budget.",
      name: "Rajesh Kumar",
      title: "CEO, Tech Solutions Delhi",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", // Professional Indian man
    },
    {
      quote:
        "The kitchen makeover by Glomni Designs is absolutely stunning! They understood our lifestyle and created a perfect blend of functionality and aesthetics. Our family loves spending time in the new kitchen.",
      name: "Anjali Gupta",
      title: "Interior Design Enthusiast, Noida",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", // Happy woman
    },
    {
      quote:
        "Glomni Designs delivered our data center project with precision and technical expertise. Their understanding of both aesthetics and functionality in critical infrastructure is unmatched. Highly recommended for commercial projects.",
      name: "Vikram Singh",
      title: "IT Director, Mumbai",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // Professional man
    },
    {
      quote:
        "From concept to completion, Glomni Designs exceeded every expectation. Their AI design preview feature helped us visualize the final result perfectly. The after-delivery support has been exceptional too.",
      name: "Meera Agarwal",
      title: "Happy Client, Delhi",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face", // Smiling woman
    },
    {
      quote:
        "The bedroom redesign by Glomni Designs created our perfect sanctuary. They listened to our needs, respected our budget, and delivered a luxurious space that feels like a five-star hotel room.",
      name: "Arjun Patel",
      title: "Business Owner, Gurgaon",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", // Confident man
    },
  ];
  