'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar, 
  CreditCard, 
  FileCheck, 
  Bell, 
  TrendingUp,
  Users,
  Award,
  BookOpen
} from 'lucide-react';

// Sample gallery images - replace with your actual images
const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop', title: 'Graduation Day', category: 'Events' },
  { id: 2, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', title: 'Campus Library', category: 'Campus' },
  { id: 3, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop', title: 'Science Lab', category: 'Academics' },
  { id: 4, src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop', title: 'Sports Day', category: 'Sports' },
  { id: 5, src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop', title: 'Classroom', category: 'Academics' },
  { id: 6, src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', title: 'Art Exhibition', category: 'Arts' },
  { id: 7, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', title: 'Music Room', category: 'Arts' },
  { id: 8, src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', title: 'Study Group', category: 'Academics' },
];

// Double the images for seamless infinite scroll
const duplicatedImages = [...galleryImages, ...galleryImages];

const stats = [
  { icon: Users, value: '2,500+', label: 'Students', color: 'from-blue-500 to-blue-600' },
  { icon: Award, value: '98%', label: 'Pass Rate', color: 'from-emerald-500 to-emerald-600' },
  { icon: BookOpen, value: '150+', label: 'Courses', color: 'from-orange-500 to-orange-600' },
  { icon: TrendingUp, value: '50+', label: 'Awards', color: 'from-purple-500 to-purple-600' },
];

const features = [
  {
    icon: FileCheck,
    title: 'Exam Registration',
    desc: 'Register for upcoming exams and download your admit cards instantly.',
    path: '/exams',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    icon: CreditCard,
    title: 'Fee Management',
    desc: 'Check fee status, view payment history, and make secure online payments.',
    path: '/fees',
    color: 'bg-emerald-50 text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    icon: Bell,
    title: 'Notices & Updates',
    desc: 'Stay informed with real-time announcements and important notices.',
    path: '/notices',
    color: 'bg-orange-50 text-orange-600',
    borderColor: 'border-orange-200',
  },
  {
    icon: Calendar,
    title: 'Academic Calendar',
    desc: 'View important dates, holidays, and examination schedules.',
    path: '/dashboard',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'border-purple-200',
  },
];

export default function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Ensure smooth scrolling behavior
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.style.scrollBehavior = 'smooth';
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-schoolLight/50" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Academic Year 2026-2027 Now Open
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Welcome to <span className="gradient-text">SORA</span>
            <br />
            <span className="text-slate-700">School Portal</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your one-stop destination for exam registration, fee management, 
            academic notices, and campus updates. Designed for students, parents, and faculty.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/dashboard"
              className="group px-8 py-4 bg-gradient-to-r from-schoolBlue to-blue-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/gallery"
              className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Access all school services from a single, beautifully designed dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  href={feature.path}
                  className={`group relative bg-white rounded-2xl p-6 border ${feature.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.desc}</p>
                  <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-schoolBlue transition-colors">
                    Learn more 
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVOLVING PICTURE CAROUSEL - The Star Feature */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Campus <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              A glimpse into our vibrant campus life, academic excellence, and student achievements
            </p>
          </div>
        </div>

        {/* Revolving Carousel Container */}
        <div className="relative w-full">
          {/* Gradient Masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-schoolLight to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-schoolLight to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Track */}
          <div 
            ref={scrollRef}
            className="flex gap-6 animate-revolve hover:pause"
            style={{ width: 'max-content' }}
          >
            {duplicatedImages.map((image, index) => (
              <div 
                key={`${image.id}-${index}`}
                className="relative group flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:border-schoolBlue hover:text-schoolBlue transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-schoolBlue to-blue-700 rounded-3xl p-8 lg:p-16 text-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 max-w-xl mx-auto mb-8 text-lg">
                Access your student dashboard, register for exams, and manage your academic journey all in one place.
              </p>
              <Link href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-schoolBlue rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}