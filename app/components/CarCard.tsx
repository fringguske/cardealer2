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
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            {type}
          </span>
        </div>

        <Link href={id ? `/car/${id}` : '#'} className="block w-full h-full relative cursor-pointer">
          {images && images.length > 0 ? (
            <Image
              src={images[current]}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
              No Image Available
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Slider Indicators */}
        {numImages > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === current ? "bg-white w-4 scale-110" : "bg-white/50 hover:bg-white/80"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(idx);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={id ? `/car/${id}` : '#'} className="hover:text-blue-600 transition-colors">
            <h2 className="font-outfit font-bold text-xl text-slate-900 line-clamp-1">{name}</h2>
          </Link>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{gearshift}</span>
          </div>
          {topSpeed && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{topSpeed}</span>
            </div>
          )}
          {acceleration && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{acceleration}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Asking Price</span>
            <span className="font-outfit font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
              Ksh {priceKsh.toLocaleString()}
            </span>
          </div>

          <Link href={id ? `/car/${id}` : '#'} onClick={(e) => e.stopPropagation()}>
            <button className="relative overflow-hidden pl-6 pr-12 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 group/btn">
              <span className="relative z-10">View Details</span>
              <div className="absolute right-1 top-1 bottom-1 w-10 bg-white/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                <svg className="w-4 h-4 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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