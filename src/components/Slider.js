"use client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: 'School Infrastructure',
    description: 'State-of-the-art buildings and modern learning spaces.',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f2e6c9bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Playground',
    description: 'Outdoor spaces for sports, assemblies, and student events.',
    image: 'https://images.unsplash.com/photo-1581093458416-8e91dc5d6a24?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Academic Excellence',
    description: 'Focused classrooms built for excellence and achievement.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Sports Activities',
    description: 'Athletics programs to support healthy competitive spirit.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Hostel Facilities',
    description: 'Safe, comfortable hostel environment for students.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

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
        <button
          type="button"
          onClick={() => navigate('/gallery')}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
        >
          Explore Gallery
        </button>
      </div>

      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 gap-2">
        <button type="button" onClick={() => moveSlide(-1)} className="rounded-full bg-white/90 p-3 text-slate-900 shadow-sm hover:bg-white">
          ‹
        </button>
        <button type="button" onClick={() => moveSlide(1)} className="rounded-full bg-white/90 p-3 text-slate-900 shadow-sm hover:bg-white">
          ›
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 w-2.5 rounded-full ${index === slideIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
