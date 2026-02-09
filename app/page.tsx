"use client"
import React, { Suspense, useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
const CarCard = React.lazy(() => import("./components/CarCard"));
import type { CarCardProps } from "./components/CarCard";
import HeroSection from "./components/HeroSection";
import { CarService } from "./services/carService";
import CarDetailsPanel from "./components/CarDetailsPanel";

export default function Home() {
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<CarCardProps[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarCardProps | null>(null);

  // Track selected filter values
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  // Load cars from Supabase on component mount
  useEffect(() => {
    loadCars();
  }, []);

  // Apply all filters whenever cars or filter values change
  useEffect(() => {
    let filtered = [...cars];
    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(car => car.type.toLowerCase() === selectedType.toLowerCase());
    }
    if (selectedPrice) {
      const maxPrice = parseInt(selectedPrice, 10);
      filtered = filtered.filter(car => {
        const price = typeof car.priceKsh === 'string' ? parseInt(car.priceKsh, 10) : car.priceKsh;
        return price <= maxPrice;
      });
    }
    setFilteredCars(filtered);
  }, [cars, selectedType, selectedPrice]);

  const loadCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const carsData = await CarService.getCars();
      setCars(carsData);
    } catch (err) {
      console.error('Error loading cars:', err);
      setError('Failed to load cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (value: string) => {
    try {
      let sortedCars: CarCardProps[];
      switch (value) {
        case 'price-low':
          sortedCars = await CarService.getCarsSortedByPrice(true);
          break;
        case 'price-high':
          sortedCars = await CarService.getCarsSortedByPrice(false);
          break;
        default:
          sortedCars = cars;
      }
      setFilteredCars(sortedCars);
    } catch (err) {
      console.error('Error sorting cars:', err);
    }
  };

  const handleVehicleTypeChange = (value: string) => setSelectedType(value);
  const handlePriceChange = (value: string) => setSelectedPrice(value);

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        <HeroSection />

        <div id="fleet" className="w-full max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-outfit font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Exclusive Inventory
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Explore our curated selection of premium vehicles available for immediate acquisition.
            </p>
          </div>

          <FilterBar
            onSortChange={handleSortChange}
            onVehicleTypeChange={handleVehicleTypeChange}
            onPriceChange={handlePriceChange}
          />

          {/* Content Area */}
          <div className="min-h-[400px]">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading your dream ride...</p>
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
                  !
                </div>
                <h3 className="font-outfit font-bold text-xl text-slate-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-slate-500 mb-6">{error}</p>
                <button
                  onClick={loadCars}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                {filteredCars.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCars.map((car, idx) => (
                      <div
                        key={car.id || idx}
                        className="animate-scale-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                        onClick={() => setSelectedCar(car)}
                      >
                        <Suspense fallback={<div className="h-[400px] bg-slate-100 rounded-3xl animate-pulse" />}>
                          <CarCard {...car} />
                        </Suspense>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel rounded-3xl p-12 text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      🔍
                    </div>
                    <h3 className="font-outfit font-bold text-2xl text-slate-900 mb-2">No vehicles found</h3>
                    <p className="text-slate-500 mb-8">
                      We couldn't find any cars matching your criteria. Try adjusting your filters to see more results.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedType("");
                        setSelectedPrice("");
                        // Reset select elements if possible or refresh page
                        window.location.reload();
                      }}
                      className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer Preview */}
        <footer className="bg-slate-900 text-white py-20 mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/10" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="font-outfit font-bold text-3xl mb-8">Ready to start your journey?</h2>
            <p className="text-slate-400 mb-8">Experience the ultimate driving comfort and performance.</p>
            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Contact Us Today
            </button>
          </div>
        </footer>
      </div>

      {selectedCar && (
        <CarDetailsPanel car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </main>
  );
}
