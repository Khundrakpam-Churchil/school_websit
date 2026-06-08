'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
  {
    title: 'School Infrastructure',
    description: 'State-of-the-art buildings and modern learning spaces.',
    image: '/slides/infrastructure.png',
  },
  {
    title: 'Playground',
    description: 'Outdoor spaces for sports, assemblies, and student events.',
    image: '/slides/playground.png',
  },
  {
    title: 'Academic Excellence',
    description: 'Focused classrooms built for excellence and achievement.',
    image: '/slides/academics.png',
  },
  {
    title: 'Sports Activities',
    description: 'Athletics programs to support healthy competitive spirit.',
    image: '/slides/sports.png',
  },
  {
    title: 'Hostel Facilities',
    description: 'Safe, comfortable hostel environment for students.',
    image: '/slides/hostel.png',
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const moveSlide = (direction) => {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
      <img
        src={slides[index].image}
        alt={slides[index].title}
        className="h-80 w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="text-sm uppercase tracking-[0.32em] text-orange-300">{slides[index].title}</p>
        <h3 className="mt-2 text-3xl font-semibold leading-tight">{slides[index].description}</h3>
        <Link
          href="/gallery"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 cursor-pointer"
        >
          Explore Gallery
        </Link>
      </div>

      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 gap-2">
        <button type="button" onClick={() => moveSlide(-1)} className="rounded-full bg-white/90 p-3 text-slate-900 shadow-sm hover:bg-white cursor-pointer">
          ‹
        </button>
        <button type="button" onClick={() => moveSlide(1)} className="rounded-full bg-white/90 p-3 text-slate-900 shadow-sm hover:bg-white cursor-pointer">
          ›
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 w-2.5 rounded-full ${index === slideIndex ? 'bg-white' : 'bg-white/50'} cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
}
