import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

const testimonials = [
    { name: 'Riya Sharma', quote: 'ZappCab saved me so much time with their instant booking and reliable drivers!' },
    { name: 'Amit Kumar', quote: 'Love the real-time tracking and clean interface. Highly recommend ZappCab!' },
    { name: 'Sneha Patel', quote: 'Affordable, eco-friendly, and safe. ZappCab is my daily go-to.' },
    { name: 'Rahul Sharma', quote: 'ZappCab saved me so much time with their instant booking and reliable drivers!' },
    { name: 'Preeti Kumar', quote: 'Love the real-time tracking and clean interface. Highly recommend ZappCab!' },
    { name: 'Abhishek Patel', quote: 'Affordable, eco-friendly, and safe. ZappCab is my daily go-to.' },
  ];

export default function TestimonialsSection() {
  return (
    
    <section
  id="testimonials"
  className="relative h-[30rem] flex flex-col items-center justify-center bg-white dark:bg-black px-4 overflow-hidden"
>
  {/* Beams Background */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <BackgroundBeamsWithCollision />
  </div>

  {/* Foreground Content */}
  <h2 className="z-10 text-4xl font-bold text-center mb-5 bg-gradient-to-r from-yellow-300 to-red-600 bg-clip-text text-transparent">
    What Our Riders Say
  </h2>

  <div className="z-10 w-full">
    <InfiniteMovingCards
      items={testimonials}
      direction="right"
      speed="slow"
    />
  </div>
</section>

  );
}
