import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    date: '12 Jan 2026',
    text: 'Absolutely breathtaking experience! The Maldives package exceeded all expectations. Every detail was perfectly orchestrated.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'London, UK',
    date: '24 Dec 2025',
    text: "The Sri Lanka cultural tour was phenomenal. Our guide's knowledge and the luxury accommodations made it unforgettable.",
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'Sydney, Australia',
    date: '03 Nov 2025',
    text: 'Opulent Travels delivered beyond our wildest dreams. The combined tour was seamlessly executed with luxury at every turn.',
  },
  {
    id: 4,
    name: 'Aisha Khan',
    location: 'Dubai, UAE',
    date: '18 Oct 2025',
    text: 'From airport pickup to resort check-in, everything felt polished and effortless. The trip felt truly premium.',
  },
  {
    id: 5,
    name: 'Daniel Brown',
    location: 'Toronto, Canada',
    date: '02 Sep 2025',
    text: 'The attention to detail was excellent. We got a well-balanced itinerary with luxury, comfort, and great support.',
  },
  {
    id: 6,
    name: 'Priya Menon',
    location: 'Bangalore, India',
    date: '15 Aug 2025',
    text: 'We loved every part of the trip. The package was thoughtfully arranged and the service felt very reliable.',
  },
  {
    id: 7,
    name: 'James Wilson',
    location: 'Auckland, New Zealand',
    date: '29 Jul 2025',
    text: 'A smooth, classy holiday experience from start to finish. The resort choices were exactly what we wanted.',
  },
  {
    id: 8,
    name: 'Maria Garcia',
    location: 'Madrid, Spain',
    date: '11 Jun 2025',
    text: 'We came back with amazing memories. The planning was smooth and the trip felt well cared for the whole way.',
  },
  {
    id: 9,
    name: 'Omar Hassan',
    location: 'Doha, Qatar',
    date: '20 Apr 2025',
    text: 'Excellent communication and a beautiful travel plan. The experience matched the premium feel promised online.',
  },
  {
    id: 10,
    name: 'Hannah Lee',
    location: 'Seoul, South Korea',
    date: '05 Mar 2025',
    text: 'The holiday was organized beautifully, and every destination was better than expected. We would book again.',
  },
];

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialsModal: React.FC<TestimonialsModalProps> = ({ isOpen, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isOpen || isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isOpen, isPaused, next]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, prev, next]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrent(0);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const t = testimonials[current];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Client Testimonials"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className="relative z-10 w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-playfair font-bold text-xl text-white">
            What Our <span className="text-yellow-400">Clients Say</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close testimonials"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prev arrow — absolutely positioned, vertically centered on card body */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 hover:text-gray-900 text-white transition-all duration-200 z-20"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next arrow — absolutely positioned, vertically centered on card body */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 hover:text-gray-900 text-white transition-all duration-200 z-20"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Testimonial content */}
        <div className="px-16 py-10 min-h-[260px] flex flex-col items-center text-center">
          {/* Quote */}
          <blockquote className="font-lora text-base text-gray-200 leading-relaxed mb-6 max-w-lg">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Client info */}
          <div>
            <p className="font-playfair font-bold text-white text-lg">{t.name}</p>
            <p className="font-montserrat text-yellow-400 text-sm">{t.location}</p>
            <p className="font-montserrat text-gray-500 text-xs mt-1">{t.date}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 pb-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2.5 bg-yellow-400'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/10">
          <div
            key={current}
            style={{
              height: '100%',
              backgroundColor: '#facc15',
              animation: !isPaused ? 'tmProgress 4s linear forwards' : 'none',
              width: isPaused ? '100%' : undefined,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes tmProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default TestimonialsModal;