"use client"
import React from "react";
import { motion } from 'framer-motion';
import { Compare } from "@/components/ui/compare";
import { ArrowRight, Sparkles, Eye } from 'lucide-react';

export function CompareDemo() {
  const projects = [
    {
      id: 1,
      title: "Modern Kitchen Transformation",
      description: "Traditional to Contemporary Design",
      category: "Kitchen",
      beforeImage: "https://5.imimg.com/data5/ANDROID/Default/2023/3/FG/UU/HU/5310916/product-jpeg-500x500.jpg",
      afterImage: "https://media.designcafe.com/wp-content/uploads/2019/12/23134656/interior-firms-in-bangalore.jpg"
    },
    {
      id: 2,
      title: "Living Room Makeover",
      description: "Classic to Modern Living Space",
      category: "Living Room",
      beforeImage: "https://5.imimg.com/data5/ANDROID/Default/2023/3/FG/UU/HU/5310916/product-jpeg-500x500.jpg",
      afterImage: "https://media.designcafe.com/wp-content/uploads/2019/12/23134656/interior-firms-in-bangalore.jpg"
    },
    {
      id: 3,
      title: "Bedroom Redesign",
      description: "Simple to Luxurious Bedroom",
      category: "Bedroom",
      beforeImage: "https://5.imimg.com/data5/ANDROID/Default/2023/3/FG/UU/HU/5310916/product-jpeg-500x500.jpg",
      afterImage: "https://media.designcafe.com/wp-content/uploads/2019/12/23134656/interior-firms-in-bangalore.jpg"
    }
  ];

  return (
    <div className="py-16 bg-black text-white min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 py-2 bg-clip-text text-transparent">
              Compare Our Projects and Designs
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Witness the incredible transformations we've achieved for our clients. 
            Slide to see the before and after of our stunning interior design projects.
          </p>
          
          <div className="mt-8 inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 px-6 py-3 rounded-full">
            <Eye className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">Hover to Compare</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              {/* Project Card */}
              <div className="bg-gray-900/60 border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-500 backdrop-blur-sm">
                
                {/* Category Badge */}
                <div className="p-4 pb-0">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-bold text-white">
                    <Sparkles className="w-4 h-4" />
                    {project.category}
                  </div>
                </div>

                {/* Compare Component */}
                <div className="p-4">
                  <div className="relative rounded-2xl overflow-hidden">
                    <Compare
                      firstImage={project.beforeImage}
                      secondImage={project.afterImage}
                      firstImageClassName="object-cover object-center"
                      secondImageClassname="object-cover object-center"
                      className="h-[280px] w-full md:h-[320px]"
                      slideMode="hover"
                    />
                    
                    {/* Before/After Labels */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                      BEFORE
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                      AFTER
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 pt-0">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* View Project Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Eye className="w-4 h-4" />
                    View Full Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready for Your Own Transformation?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let our expert designers create a stunning makeover for your space. 
              Every project is unique, just like your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                Get Free Quote
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
