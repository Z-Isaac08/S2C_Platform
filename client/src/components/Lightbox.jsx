import React, { useEffect, useState } from 'react';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';

const Lightbox = ({ isOpen, images, initialIndex, title, desc, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !images || images.length === 0) return null;

  const changeImage = dir => {
    let next = currentIndex + dir;
    if (next < 0) next = images.length - 1;
    if (next >= images.length) next = 0;
    setCurrentIndex(next);
  };

  return (
    <div
      id="lightbox"
      className="fixed inset-0 z-100 bg-brand-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-20"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 text-brand-white text-4xl md:text-5xl hover:text-brand-yellow transition-colors z-110"
      >
        <X />
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={() => changeImage(-1)}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-brand-white text-4xl md:text-6xl hover:text-brand-yellow transition-all p-4 z-110"
      >
        <CaretLeft />
      </button>
      <button
        onClick={() => changeImage(1)}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-brand-white text-4xl md:text-6xl hover:text-brand-yellow transition-all p-4 z-110"
      >
        <CaretRight />
      </button>

      {/* Content */}
      <div className="max-w-5xl w-full h-[70vh] flex items-center justify-center relative">
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-opacity duration-300"
        />
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold mb-2 text-brand-white">{title}</h3>
        <p className="text-brand-white/40 uppercase tracking-widest text-xs font-bold mb-4">
          {desc}
        </p>
        <div className="text-brand-yellow font-bold text-sm bg-white/5 px-4 py-1 rounded-full inline-block">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
