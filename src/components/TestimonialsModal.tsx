import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialsModal: React.FC<TestimonialsModalProps> = ({ isOpen, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { data: testimonials = [], isLoading } = useTestimonials();

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  // Reset index when modal opens or data changes
  useEffect(() => {
    setCurrent(0);
  }, [isOpen, testimonials.length]);

  useEffect(() => {
    if (!isOpen || isPaused || testimonials.length === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isOpen, isPaused, next, testimonials.length]);

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

        {/* Loading state */}
        {isLoading && (
          <div className="px-16 py-10 min-h-[260px] flex items-center justify-center">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-yellow-400/40 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && testimonials.length === 0 && (
          <div className="px-16 py-10 min-h-[260px] flex items-center justify-center">
            <p className="font-lora text-gray-400 text-base">No testimonials yet.</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && testimonials.length > 0 && t && (
          <>
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 hover:text-gray-900 text-white transition-all duration-200 z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next arrow */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 hover:text-gray-900 text-white transition-all duration-200 z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Testimonial content */}
            <div className="px-16 py-10 min-h-[260px] flex flex-col items-center text-center">
              <blockquote className="font-lora text-base text-gray-200 leading-relaxed mb-6 max-w-lg">
                &ldquo;{t.text}&rdquo;
              </blockquote>
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
          </>
        )}
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
