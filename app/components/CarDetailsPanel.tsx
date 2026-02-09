"use client"
import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import type { CarCardProps } from './CarCard';

interface CarDetailsPanelProps {
  car: CarCardProps;
  onClose: () => void;
}

const CarDetailsPanel: React.FC<CarDetailsPanelProps> = ({ car, onClose }) => {
  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in border border-white/20"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-red-500 hover:text-white text-slate-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group border border-slate-100"
          onClick={onClose}
        >
          <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {car.images && car.images.length > 0 ? (
              car.images.map((img, idx) => (
                <div key={idx} className="relative aspect-[3/2] rounded-[2rem] overflow-hidden shadow-lg border border-white group">
                  <Image
                    src={img}
                    alt={`${car.name} - View ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ))
            ) : (
              <div className="aspect-[3/2] bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 italic">
                No images available
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col custom-scrollbar">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-blue-100">
              {car.type}
            </span>
            <h2 className="font-outfit font-black text-4xl md:text-5xl text-slate-900 tracking-tighter leading-tight mb-4">
              {car.name}
            </h2>
            <div className="flex items-center gap-2 text-2xl font-black text-blue-600 tracking-tighter">
              <span className="text-slate-400 font-bold text-sm uppercase tracking-widest mr-2">Price:</span>
              Ksh {car.priceKsh.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10 pt-8 border-t border-slate-100">
            <SpecItem label="Seats" value={car.seats} icon="seats" />
            <SpecItem label="Transmission" value={car.gearshift} icon="gear" />
            {car.year && <SpecItem label="Model Year" value={car.year} icon="calendar" />}
            {car.mileage && <SpecItem label="Mileage" value={car.mileage} icon="speed" />}
            {car.color && <SpecItem label="Color" value={car.color} icon="palette" />}
            {car.topSpeed && <SpecItem label="Top Speed" value={car.topSpeed} icon="bolt" />}
          </div>

          <div className="mt-auto space-y-4 pt-8 border-t border-slate-100">
            <button className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl hover:bg-blue-600 hover:shadow-blue-500/40 transition-all duration-500 hover:-translate-y-1">
              Inquire Now
            </button>
            <button className="w-full py-5 rounded-2xl bg-white text-slate-900 font-bold text-lg border border-slate-100 hover:bg-slate-50 transition-all duration-500">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SpecItem = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="font-outfit font-black text-slate-900 text-lg tracking-tight">{value}</p>
  </div>
);

export default CarDetailsPanel;