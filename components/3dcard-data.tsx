// app/page.tsx

import { ThreeDCard } from "../components/3d-card-section";
import { ExampleWithModalButton } from "./universalmodal";

export default function Threedcardshome() {
  const cards = [
    {
      title: "Interior for Homes",
      description: "We provide modern and minimalistic interior designs tailored for homes.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      link: "https://example.com/interior"
    },
    {
      title: "Data Centers",
      description: "Transform your cooking space with our smart modular kitchen solutions.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      link: "https://example.com/kitchen"
    },
    {
      title: "Office Space Planning",
      description: "Maximize productivity with functional and aesthetic office.",
      image: "https://images.unsplash.com/photo-1716703373229-b0e43de7dd5c",
      link: "https://example.com/office"
    },
    {
      title: "Construction Planning",
      description: "Maximize productivity with functional and aesthetic office.",
      image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
      link: "https://example.com/office"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {cards.map((card, idx) => (
          <ThreeDCard
            key={idx}
            title={card.title}
            description={card.description}
            image={card.image}
            link={card.link}
          />
        ))}
      </div>
      <div className="flex justify-center m-2">
        <ExampleWithModalButton/>
      </div>
    </div>
  );
}
