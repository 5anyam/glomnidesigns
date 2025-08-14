"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Star, User } from 'lucide-react';
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
    avatar?: string; // Add optional avatar field
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
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-600 fill-gray-600'
            }`}
          />
        ))}
        <span className="text-xs text-gray-400 ml-2">
          {rating}/5
        </span>
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
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-black px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)] hover:border-yellow-400/30 transition-all duration-300 shadow-2xl"
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              
              {/* Star Rating Section */}
              <div className="relative z-20">
                {renderStars(item.rating || 5)}
              </div>
              
              {/* Quote Section */}
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-gray-100 mb-6 block">
                "{item.quote}"
              </span>
              
              {/* Author Info Section with Avatar */}
              <div className="relative z-20 flex flex-row items-center justify-between pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-3">
                  {/* Avatar Image */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600 flex-shrink-0">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={`${item.name}'s avatar`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Author Details */}
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] font-semibold text-white">
                      {item.name}
                    </span>
                    <span className="text-xs leading-[1.4] font-normal text-gray-400">
                      {item.title}
                    </span>
                  </span>
                </div>
                
                {/* Rating Display */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">
                    {item.rating || 5.0}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
