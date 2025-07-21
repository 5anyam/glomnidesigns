"use client";

import React from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

/* -------------------------  reusable image header  ------------------------ */
function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex flex-1 w-full h-fulld min-h-[6rem] overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw,
               (max-width:1200px) 50vw,
               33vw"
        priority
        /* set unoptimized if you haven’t added Unsplash to next.config */
        unoptimized
      />
    </div>
  );
}

/* -----------------------------  grid component  --------------------------- */
export function BentoGridDemo() {
  return (
    <BentoGrid className="w-full mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

/* ------------------------------  card data  ------------------------------- */
const items = [
  {
    title: "Living Rooms",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1554995207-c18c203602cb"
        alt="Living room interior"
      />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Master Bedrooms",
    description: "Dive into the transformative power of technology.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1648634158203-199accfd7afc"
        alt="Master bedroom interior"
      />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Pooja Rooms",
    description: "Discover the beauty of thoughtful and functional design.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1616308913689-cb92c5bea67e"
        alt="Pooja room design"
      />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Office Rooms",
    description: "Understand the impact of effective communication in our lives.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1622126755582-16754165dce8"
        alt="Home office workspace"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Bathrooms",
    description: "Join the quest for understanding and enlightenment.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1521783593447-5702b9bfd267"
        alt="Modern bathroom"
      />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Kitchens",
    description: "Experience the thrill of bringing ideas to life.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1588854337236-6889d631faa8"
        alt="Modern kitchen"
      />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Dining Areas",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: (
      <CardImage
        src="https://images.unsplash.com/photo-1735146071436-4ceb5f8c2866"
        alt="Dining room interior"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
]