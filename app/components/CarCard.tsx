import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CarCardProps {
  id?: string;
  name: string;
  type: string;
  seats: number;
  luggage: number;
  gearshift: 'Automatic' | 'Manual';
  images: string[];
  priceKsh: number;
  topSpeed?: string;
  acceleration?: string;
  fuelConsumption?: string;
  brakesType?: string;
  torque?: string;
  gasTankCapacity?: string;
  color?: string;
  mileage?: string;
  year?: string;
}

const CarCard: React.FC<CarCardProps> = ({
  id, name, type, seats, gearshift, images, priceKsh,
  topSpeed, acceleration
}) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const numImages = images.length;

  useEffect(() => {
    if (numImages <= 1 || !isHovered) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % numImages);
    }, 2000); // Faster slide on hover

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [numImages, isHovered]);

  return (
    <div
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-slate-100/50 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Slider */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-50">
        <div className="absolute top-5 left-5 z-20">
          <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm text-slate-900 border border-slate-100">
            {type}
          </span>
        </div>

        <Link href={id ? `/car/${id}` : '#'} className="block w-full h-full relative cursor-pointer">
          {images && images.length > 0 ? (
            <Image
              src={images[current]}
              alt={name}
              fill
              className="object-cover object-center transition-all duration-1000 group-hover:scale-110"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={current === 0}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
              <svg className="w-12 h-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Overlay Gradient - More subtle and rich */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Slider Indicators - Refined */}
        {numImages > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/70 w-2"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrent(idx);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <Link href={id ? `/car/${id}` : '#'} className="group/title">
            <h2 className="font-outfit font-bold text-2xl text-slate-900 group-hover/title:text-blue-600 transition-colors tracking-tight leading-tight">
              {name}
            </h2>
          </Link>
        </div>

        {/* Specs Grid - Premium Icons & Spacing */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-8 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span>{seats} Seats</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span>{gearshift}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100/80">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-1">Asking Price</span>
            <span className="font-outfit font-black text-2xl text-slate-900 group-hover:text-blue-600 transition-colors tracking-tighter">
              Ksh {priceKsh.toLocaleString()}
            </span>
          </div>

          <Link href={id ? `/car/${id}` : '#'} onClick={(e) => e.stopPropagation()}>
            <button className="relative overflow-hidden pl-7 pr-14 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 group/btn">
              <span className="relative z-10">Details</span>
              <div className="absolute right-2 top-2 bottom-2 w-10 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/btn:w-[calc(100%-16px)] group-hover/btn:bg-white/20">
                <svg className="w-5 h-5 transform -rotate-45 transition-transform duration-500 group-hover/btn:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;