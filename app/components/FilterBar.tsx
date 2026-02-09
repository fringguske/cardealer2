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
    <div className="w-full max-w-7xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-wrap gap-4 items-center justify-between">

        {/* Main Filters */}
        <div className="flex flex-wrap gap-4 flex-grow">
          <div className="relative group">
            <select
              onChange={e => onVehicleTypeChange?.(e.target.value)}
              className="appearance-none bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/40 pl-10 pr-12 py-3 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer min-w-[200px]"
            >
              <option value="all">Vehicle type</option>
              <option value="all">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Crossover (CUV)">Crossover</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible (Cabriolet)">Convertible</option>
              <option value="Wagon (Estate)">Wagon</option>
              <option value="Pickup Truck">Pickup</option>
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative group">
            <select
              onChange={e => onPriceChange?.(e.target.value)}
              className="appearance-none bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/40 pl-10 pr-12 py-3 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer min-w-[200px]"
            >
              <option value="">Price Range</option>
              <option value="1500000">Below 1.5M</option>
              <option value="3000000">Below 3M</option>
              <option value="5000000">Below 5M</option>
              <option value="10000000">Below 10M</option>
              <option value="20000000">Below 20M</option>
              <option value="50000000">Below 50M</option>
              <option value="100000000">Below 100M</option>
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="relative group">
          <select
            onChange={e => onSortChange?.(e.target.value)}
            className="appearance-none bg-slate-900 text-white hover:bg-slate-800 border border-transparent pl-10 pr-12 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer min-w-[180px]"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 