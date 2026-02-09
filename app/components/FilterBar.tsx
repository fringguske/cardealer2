"use client"
import React from 'react';

interface FilterBarProps {
  onSortChange?: (value: string) => void;
  onVehicleTypeChange?: (value: string) => void;
  onGearshiftChange?: (value: string) => void;
  onSeatsChange?: (value: number) => void;
  onAgeChange?: (value: number) => void;
  onPriceChange?: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSortChange,
  onVehicleTypeChange,
  onGearshiftChange,
  onSeatsChange,
  onAgeChange,
  onPriceChange,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 animate-fade-in sticky top-24 z-30 px-6" style={{ animationDelay: '0.2s' }}>
      <div className="glass-card rounded-[2.5rem] p-5 md:p-8 flex flex-wrap gap-6 items-center justify-between">

        {/* Main Filters */}
        <div className="flex flex-wrap gap-6 flex-grow">
          <div className="relative group">
            <select
              onChange={e => onVehicleTypeChange?.(e.target.value)}
              className="appearance-none bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/50 pl-12 pr-14 py-4 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer min-w-[220px] shadow-sm"
            >
              <option value="all">Vehicle Type</option>
              <option value="all">All Inventory</option>
              <option value="Sedan">Elite Sedan</option>
              <option value="SUV">Luxury SUV</option>
              <option value="Coupe">Sport Coupe</option>
              <option value="Convertible (Cabriolet)">Grand Convertible</option>
              <option value="Pickup Truck">Utility Master</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>

          <div className="relative group">
            <select
              onChange={e => onPriceChange?.(e.target.value)}
              className="appearance-none bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/50 pl-12 pr-14 py-4 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer min-w-[220px] shadow-sm"
            >
              <option value="">Price Cap</option>
              <option value="5000000">Below 5M</option>
              <option value="15000000">Below 15M</option>
              <option value="30000000">Below 30M</option>
              <option value="50000000">Below 50M</option>
              <option value="100000000">Ultra Luxury</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="relative group">
          <select
            onChange={e => onSortChange?.(e.target.value)}
            className="appearance-none bg-slate-900 text-white hover:bg-blue-600 border border-transparent pl-12 pr-14 py-4 rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all cursor-pointer min-w-[200px] shadow-xl"
          >
            <option value="default">Sort Listings</option>
            <option value="price-low">Value Focus</option>
            <option value="price-high">Premium First</option>
          </select>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;