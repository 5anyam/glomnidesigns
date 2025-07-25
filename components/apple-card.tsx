"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Link from "next/link";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Take a look at our services.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}



const data = [
  {
    category: "Penthouse",
    title: "Modern Penthouse 4BHK in Noida",
    src: "https://images.unsplash.com/photo-1639664701039-f747268e2243",
    content: <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl pb-4 sfont-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Build Your Business with a Fast and User-Friendly Website.
        </span>{" "}
        The foundation of your online growth starts with a website that’s not only fast but also offers an exceptional user experience. At Proshala Tech, we design websites that are intuitive, responsive, and tailored to meet your specific business needs.
      </p>
      <div className="flex justify-center pt-4">
      <Link href="tel:+919999774046"><button className="bg-slate-800 no-underline justify-center group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6 text-yellow-400 inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
          <span>{`Call Us Now`}</span>
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button></Link></div>
    </div>,
  },
  {
    category: "Flat",
    title: "Elegant 2BHK Flat in Noida",
    src: "https://images.unsplash.com/photo-1722890552192-23472a17e33b",
    content: <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl pb-4 font-sans max-w-3xl mx-auto">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Get Instant Leads with Result-Driven Google Ads.
      </span>{" "}
      Reach your ideal customers at the right moment with high-performing ad campaigns. At Proshala Tech, we create and manage Google Ads that deliver real ROI — more traffic, more calls, and more conversions.
    </p>
    <div className="flex justify-center pt-4">
      <Link href="tel:+919999774046">
        <button className="bg-slate-800 no-underline justify-center group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6 text-yellow-400 inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <span>{`Call Us Now`}</span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.75 8.75L14.25 12L10.75 15.25"
              ></path>
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      </Link>
    </div>
  </div>
  ,
  },
  {
    category: "House",
    title: "Contemporary 3BHK House in Gurugram",
    src: "https://images.unsplash.com/photo-1688469625388-e6f8d43df357",
    content: <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl pb-4 font-sans max-w-3xl mx-auto">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Grow Your Brand with High-Converting Meta Ads.
      </span>{" "}
      Whether it’s Facebook or Instagram, we create ad campaigns that connect emotionally and perform exceptionally. At Proshala Tech, our Meta Ads strategy helps you drive brand awareness, engagement, and qualified leads — all with data-backed targeting.
    </p>
    <div className="flex justify-center pt-4">
      <Link href="tel:+919999774046">
        <button className="bg-slate-800 no-underline justify-center group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6 text-yellow-400 inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <span>{`Call Us Now`}</span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.75 8.75L14.25 12L10.75 15.25"
              ></path>
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      </Link>
    </div>
  </div>
  ,
  },
  {
    category: "Penthouse",
    title: "Modern Penthouse 4BHK in Noida",
    src: "https://images.unsplash.com/photo-1639664701039-f747268e2243",
    content: <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl pb-4 sfont-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Build Your Business with a Fast and User-Friendly Website.
        </span>{" "}
        The foundation of your online growth starts with a website that’s not only fast but also offers an exceptional user experience. At Proshala Tech, we design websites that are intuitive, responsive, and tailored to meet your specific business needs.
      </p>
      <div className="flex justify-center pt-4">
      <Link href="tel:+919999774046"><button className="bg-slate-800 no-underline justify-center group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6 text-yellow-400 inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
          <span>{`Call Us Now`}</span>
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button></Link></div>
    
    </div>,
  },
  {
    category: "Flat",
    title: "Elegant 2BHK Flat in Noida",
    src: "https://images.unsplash.com/photo-1722890552192-23472a17e33b",
    content: <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl pb-4 font-sans max-w-3xl mx-auto">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Get Instant Leads with Result-Driven Google Ads.
      </span>{" "}
      Reach your ideal customers at the right moment with high-performing ad campaigns. At Proshala Tech, we create and manage Google Ads that deliver real ROI — more traffic, more calls, and more conversions.
    </p>
    <div className="flex justify-center pt-4">
      <Link href="tel:+919999774046">
        <button className="bg-slate-800 no-underline justify-center group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6 text-yellow-400 inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <span>{`Call Us Now`}</span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.75 8.75L14.25 12L10.75 15.25"
              ></path>
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      </Link>
    </div>
  </div>
  ,
  },
  {
    category: "House",
    title: "Contemporary 3BHK House in Gurugram",
    src: "https://images.unsplash.com/photo-1688469625388-e6f8d43df357",
    content: <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl pb-4 font-sans max-w-3xl mx-auto">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Grow Your Brand with High-Converting Meta Ads.
      </span>{" "}
      Whether it’s Facebook or Instagram, we create ad campaigns that connect emotionally and perform exceptionally. At Proshala Tech, our Meta Ads strategy helps you drive brand awareness, engagement, and qualified leads — all with data-backed targeting.
    </p>
    <div className="flex justify-center pt-4">
      <Link href="tel:+919999774046">
        <button className="bg-slate-800 no-underline justify-center group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6 text-yellow-400 inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <span>{`Call Us Now`}</span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.75 8.75L14.25 12L10.75 15.25"
              ></path>
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      </Link>
    </div>
  </div>
  ,
  },
];
