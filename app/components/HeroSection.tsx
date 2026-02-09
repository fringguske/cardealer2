import React, { useState, useEffect } from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-3rem)] max-w-5xl rounded-[2rem] border border-white/20 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-2xl py-3 px-8' : 'bg-white/30 backdrop-blur-md py-4 px-10'
        }`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <span className="font-outfit font-black text-2xl tracking-tighter text-slate-900">
              ALASIRI<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink href="#fleet">Fleet</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            <Link
              href="/admin"
              className="px-7 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-slate-900 bg-white/50 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <div className={`w-5 h-0.5 bg-current my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-10 transition-all duration-700 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}>
        <MobileNavLink onClick={() => setIsMenuOpen(false)} href="#fleet">Fleet</MobileNavLink>
        <MobileNavLink onClick={() => setIsMenuOpen(false)} href="#services">Services</MobileNavLink>
        <MobileNavLink onClick={() => setIsMenuOpen(false)} href="#about">About</MobileNavLink>
        <Link
          href="/admin"
          onClick={() => setIsMenuOpen(false)}
          className="px-10 py-4 rounded-full bg-slate-900 text-white font-black text-xl mt-6 shadow-2xl"
        >
          Admin Access
        </Link>
      </div>

      {/* Hero Content */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-48 pb-24 md:pt-64 md:pb-40 grid lg:grid-cols-2 gap-20 items-center">

        {/* Text Side */}
        <div className="flex flex-col gap-10 order-2 lg:order-1 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-blue-600 text-[10px] font-black tracking-[0.2em] uppercase">Premium Showroom Live</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-outfit text-6xl md:text-8xl font-black leading-[0.9] tracking-tight text-slate-900">
              Beyond <br />
              <span className="text-blue-600">Ordinary.</span>
            </h1>
          </div>

          <p className="text-xl text-slate-500 leading-relaxed max-w-md font-medium">
            Curated precision. Unrivaled luxury. Discover a collection of the world's finest automotive masterpieces.
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <button className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-lg flex items-center gap-3 group transition-all duration-500 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1">
              Explore Fleet
              <div className="bg-white/20 p-1 rounded-lg transition-transform duration-500 group-hover:translate-x-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
            <button className="px-10 py-5 rounded-2xl font-bold text-lg text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm border border-slate-100 transition-all duration-500">
              Contact VIP Sales
            </button>
          </div>

          <div className="flex items-center gap-12 pt-12 border-t border-slate-200/50 mt-10">
            <Stat number="85+" label="Active Fleet" />
            <Stat number="24" label="Global Parts" />
            <Stat number="15m" label="Verified" />
          </div>
        </div>

        {/* Image Side */}
        <div className="relative order-1 lg:order-2 h-[450px] md:h-[650px] w-full">
          {/* Decorative Layers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 rounded-full blur-[120px] scale-150 animate-pulse" />

          <div className="relative h-full w-full glass-panel rounded-[4rem] overflow-hidden p-3 border-white/40 shadow-2xl animate-float">
            <div className="w-full h-full relative rounded-[3.5rem] overflow-hidden group">
              <img
                src="/carr/ice-bear-Fc1qqvL2Ets-unsplash.jpg"
                alt="Premium Car"
                className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-[3s] ease-out"
              />
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

              {/* Badge */}
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-0.5">Showcase</p>
                <p className="font-outfit font-black text-slate-900">911 GT3 RS</p>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-0.5 w-12 bg-blue-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Limited Edition</p>
                </div>
                <h3 className="font-outfit font-black text-4xl mb-2">Pure Performance</h3>
                <p className="text-white/70 font-medium">Starting at Ksh 24,500,000</p>
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
    className="text-slate-600 font-bold text-sm hover:text-blue-600 transition-colors relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-4xl font-outfit font-black text-slate-900 hover:text-blue-600 transition-colors"
  >
    {children}
  </a>
);

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div>
    <p className="text-4xl font-black text-slate-900 font-outfit tracking-tighter">{number}</p>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{label}</p>
  </div>
);

export default HeroSection;