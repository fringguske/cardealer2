import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CarService } from "../../services/carService";
import { notFound } from "next/navigation";
import BackButton from "../../components/BackButton";

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sParams = await searchParams; // Just to satisfy any strict checks if needed
  const car = await CarService.getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 pb-20">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:shadow-sm transition-all group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Inventory
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery Section */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="relative aspect-[16/10] bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100">
              {car.images && car.images.length > 0 ? (
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 italic">
                  No showcase image available
                </div>
              )}
            </div>

            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {car.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-[16/10] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:scale-[1.02] transition-transform cursor-pointer">
                    <Image src={img} alt={`${car.name} view ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 w-fit">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-blue-600 text-xs font-bold tracking-wider uppercase">{car.type}</span>
              </div>
              <h1 className="font-outfit text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {car.name}
              </h1>
              <div className="text-3xl font-outfit font-bold text-blue-600">
                Ksh {car.priceKsh.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <SpecCard icon="🗓️" label="Year" value={car.year || "N/A"} />
              <SpecCard icon="🛣️" label="Mileage" value={car.mileage || "N/A"} />
              <SpecCard icon="🎨" label="Color" value={car.color || "N/A"} />
              <SpecCard icon="💺" label="Seats" value={`${car.seats} Seats`} />
              <SpecCard icon="⚙️" label="Gearshift" value={car.gearshift} />
              <SpecCard icon="👜" label="Luggage" value={`${car.luggage} Items`} />
            </div>

            {/* Performance Specs */}
            <div className="glass-panel rounded-[2rem] p-8 space-y-6">
              <h3 className="font-outfit font-bold text-xl text-slate-900">Technical Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <TechnicalSpec label="Top Speed" value={car.topSpeed} />
                <TechnicalSpec label="Acceleration" value={car.acceleration} />
                <TechnicalSpec label="Fuel Economy" value={car.fuelConsumption} />
                <TechnicalSpec label="Torque" value={car.torque} />
                <TechnicalSpec label="Tank Capacity" value={car.gasTankCapacity} />
                <TechnicalSpec label="Braking System" value={car.brakesType} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 btn-primary py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-500/20">
                Enquire Now
              </button>
              <button className="flex-1 px-8 py-4 rounded-full font-bold text-lg bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const SpecCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
    <span className="text-xl mb-1">{icon}</span>
    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

const TechnicalSpec = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
    <span className="text-slate-500">{label}</span>
    <span className="font-semibold text-slate-900">{value || "Available on request"}</span>
  </div>
);
