
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Star, User, Quote } from 'lucide-react';
import Image from 'next/image';

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    rating?: number;
    avatar?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  // Function to render star ratings
  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[380px] max-w-full shrink-0 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-red-400 dark:hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            style={{ minHeight: '420px' }}
            key={`${item.name}-${idx}`}
          >
            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-300 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-8 h-full flex flex-col">
              <blockquote className="flex flex-col h-full">

                {/* Quote Icon & Rating Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-red-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Quote className="w-7 h-7 text-red-400" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderStars(item.rating || 5)}
                    <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-800/30">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                        {(item.rating || 5).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Section - Flexible grow */}
                <div className="flex-grow mb-6">
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info Section - Fixed at bottom */}
                <div className="mt-auto pt-6 border-t-2 border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    {/* Avatar Image */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex-shrink-0 group-hover:border-red-400 dark:group-hover:border-red-400 transition-all duration-300 group-hover:scale-110">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt={`${item.name}'s avatar`}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-red-400">
                          <User className="w-7 h-7 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Author Details */}
                    <div className="flex flex-col gap-1 flex-grow min-w-0">
                      <span className="text-base font-bold text-gray-900 dark:text-white group-hover:text-red-400 transition-colors truncate">
                        {item.name}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                        {item.title}
                      </span>
                    </div>

                    {/* Verified Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </blockquote>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
