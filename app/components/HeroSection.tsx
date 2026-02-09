import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactDOM from "react-dom";

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <span className="font-outfit font-bold text-2xl tracking-tighter text-gradient">
              ALASIRI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#product">Product</NavLink>
            <NavLink href="#fleet">Fleet</NavLink>
            <NavLink href="#services">Services</NavLink>
            <Link
              href="/admin"
              className="px-6 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-slate-200"
            >
              Admin Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-current my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <MobileNavLink onClick={() => setIsMenuOpen(false)} href="#product">Product</MobileNavLink>
        <MobileNavLink onClick={() => setIsMenuOpen(false)} href="#fleet">Fleet</MobileNavLink>
        <MobileNavLink onClick={() => setIsMenuOpen(false)} href="#services">Services</MobileNavLink>
        <Link
          href="/admin"
          onClick={() => setIsMenuOpen(false)}
          className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold text-lg mt-4"
        >
          Admin Access
        </Link>
      </div>

      {/* Hero Content */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-32 grid md:grid-cols-2 gap-12 items-center">

        {/* Text Side */}
        <div className="flex flex-col gap-8 order-2 md:order-1 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-600 text-xs font-bold tracking-wider uppercase">Exclusive Inventory Available</span>
          </div>

          <h1 className="font-outfit text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Drive the <br />
            <span className="text-gradient">Extraordinary</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg">
            Experience the thrill of the open road with our curated collection of premium vehicles.
            Unmatched comfort, performance, and style.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="btn-primary px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 group">
              View Inventory
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="px-8 py-4 rounded-full font-semibold text-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
              Contact Sales
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-slate-100 mt-8">
            <Stat number="50+" label="Premium Cars" />
            <Stat number="100%" label="Verified" />
            <Stat number="VIP" label="Service" />
          </div>
        </div>

        {/* Image Side */}
        <div className="relative order-1 md:order-2 h-[400px] md:h-[600px] w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[3rem] transform -rotate-6 scale-95" />
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-[3rem] transform rotate-3 scale-95" />

          <div className="relative h-full w-full glass-panel rounded-[2.5rem] overflow-hidden p-2 animate-float">
            <div className="w-full h-full relative rounded-[2rem] overflow-hidden">
              <img
                src="/carr/ice-bear-Fc1qqvL2Ets-unsplash.jpg"
                alt="Premium Car"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="font-outfit font-bold text-2xl">Porsche 911 GT3</p>
                <p className="text-white/80">Price: Ksh 24,500,000</p>
              </div>
            </div>
          </div>

          {/* Floating Element */}
          <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                ✓
              </div>
              <div>
                <p className="font-bold text-slate-900">Verified Dealer</p>
                <p className="text-xs text-slate-500">Certified Pre-owned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-slate-600 font-medium hover:text-blue-600 transition-colors relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-3xl font-outfit font-bold text-slate-800 hover:text-blue-600 transition-colors"
  >
    {children}
  </a>
);

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div>
    <p className="text-3xl font-bold text-slate-900 font-outfit">{number}</p>
    <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{label}</p>
  </div>
);

export default HeroSection; 