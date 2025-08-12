import Link from "next/link";
import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Office Space", "Data Centers", "Home Interior", "Construction"];

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <div className="text-base mt-6 text-center md:text-4xl mx-auto font-bold text-white">
      Dedicated to transform your<FlipWords words={words} />vision into reality.
      </div>
      <div>
      </div>
     
    </div>
  );
}
