"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholder-vanish";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Best Kitchen Designs",
    "Offices setup for home",
    "Pooja Room For Homes",
    "Vintage Bedroom Designs",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

  );
}
