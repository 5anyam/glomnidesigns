"use client";
import { Carouselcard } from "../components/ui/carousel";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Constructions",
      button: "Explore Layouts",
      src: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Home Interiors",
      button: "Explore Designs",
      src: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Office Spaces",
      button: "Explore Designs",
      src: "https://images.unsplash.com/photo-1716703371653-ca74beaa7a4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Data Centers",
      button: "Explore Centers",
      src: "https://images.unsplash.com/photo-1584169417032-d34e8d805e8b?q=80&w=2209&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full pt-4 pb-14">
      <Carouselcard slides={slideData} />
    </div>
  );
}
