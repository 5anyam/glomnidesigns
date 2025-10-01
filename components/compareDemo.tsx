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
    <div className="py-16 bg-white dark:bg-gray-950 min-h-screen transition-colors">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Before & After Transformations
            </h2>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Witness the incredible transformations we've achieved for our clients. 
            Hover or slide to see the before and after of our stunning interior design projects.
          </p>
          
          <div className="mt-8 inline-flex items-center gap-2 bg-red-400/10 border-2 border-red-400/30 px-6 py-3 rounded-full">
            <Eye className="w-5 h-5 text-red-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Hover to Compare</span>
            <ArrowRight className="w-4 h-4 text-red-400" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              {/* Project Card */}
              <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-red-400 dark:hover:border-red-400 transition-all duration-500">
                
                {/* Category Badge */}
                <div className="p-4 pb-0">
                  <div className="inline-flex items-center gap-2 bg-red-400 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    {project.category}
                  </div>
                </div>

                {/* Compare Component */}
                <div className="p-4">
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800">
                    <Compare
                      firstImage={project.beforeImage}
                      secondImage={project.afterImage}
                      firstImageClassName="object-cover object-center"
                      secondImageClassname="object-cover object-center"
                      className="h-[280px] w-full md:h-[320px]"
                      slideMode="hover"
                    />
                    
                    {/* Before/After Labels */}
                    <div className="absolute top-4 left-4 bg-gray-900/90 text-white px-3 py-1.5 rounded-full text-xs font-bold border-2 border-gray-700">
                      BEFORE
                    </div>
                    <div className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      AFTER
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 pt-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* View Project Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>View Full Project</span>
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
          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready for Your Own Transformation?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Let our expert designers create a stunning makeover for your space. 
              Every project is unique, just like your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 px-6 md:px-8 py-3 md:py-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Get Free Quote
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
