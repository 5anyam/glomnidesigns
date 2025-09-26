"use client"
import Threedcardshome from "@/components/3dcard-data";
import { AppleCardsCarouselDemo } from "@/components/apple-card";
import { CarouselDemo } from "@/components/carousel-home";
import { CompareDemo } from "@/components/compareDemo";
import { BentoGridDemo } from "@/components/design-idea";
import { FlipWordsDemo } from "@/components/flip-words-home";
import HomePageCarousel from "@/components/home-page-carousel";
import SimpleSlider from "@/components/home-slider";
import { InfiniteMovingCardsDemo } from "@/components/infinite-testimonials";
import { AnimatedTestimonialsDemo } from "@/components/testimonials";
import { TimelineDemo } from "@/components/timelinep-home";

export default function Home() {
  return (
    <>
    <SimpleSlider/>
    <FlipWordsDemo/>
    <Threedcardshome/>
    <div className="max-w-7xl py-4 px-4 md:px-8 lg:px-10">
  <h2 className="text-lg md:text-4xl text-center mb-4 text-white font-bold">
    Inspiring Design Ideas for Homes & Offices
  </h2>
  <p className="text-center text-neutral-300 text-sm md:text-base">
    Discover thoughtfully crafted interiors that blend style and functionality perfect for every space you call yours.
  </p>
</div>
    <HomePageCarousel/>
    <BentoGridDemo/>
    <CompareDemo/>
    <AppleCardsCarouselDemo/>
    <InfiniteMovingCardsDemo/>
</>
  );
}
