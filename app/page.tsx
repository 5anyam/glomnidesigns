"use client"
import Threedcardshome from "@/components/3dcard-data";
import { AppleCardsCarouselDemo } from "@/components/apple-card";
import { CarouselDemo } from "@/components/carousel-home";
import { CompareDemo } from "@/components/compareDemo";
import { BentoGridDemo } from "@/components/design-idea";
import HomePageCarousel from "@/components/home-page-carousel";
import SimpleSlider from "@/components/home-slider";
import { InfiniteMovingCardsDemo } from "@/components/infinite-testimonials";
import { AnimatedTestimonialsDemo } from "@/components/testimonials";
import { TimelineDemo } from "@/components/timelinep-home";

export default function Home() {
  return (
    <>
    <SimpleSlider/>
    <Threedcardshome/>
    <HomePageCarousel/>
    <CompareDemo/>
    <InfiniteMovingCardsDemo/>
</>
  );
}
