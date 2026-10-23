"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Zap, Flame } from "lucide-react";
import { HERO_BANNERS } from "@/data/banners";

interface HeroBannerCarouselProps {
  isPhoneMode?: boolean;
}

export const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({ isPhoneMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const banner = HERO_BANNERS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  return (
    <section className="relative w-full my-3 sm:my-5">
      {/* Grid: On desktop full mode, shows main hero + side spotlights. In phone mode or mobile screens, shows single clean hero card matching screenshot */}
      <div className={isPhoneMode ? "w-full" : "grid grid-cols-1 lg:grid-cols-12 gap-4"}>
        {/* Main Hero Card */}
        <div
          className={`${
            isPhoneMode ? "w-full" : "lg:col-span-8 xl:col-span-8"
          } relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-black/5 group`}
        >
          {/* Banner Image */}
          <div className="absolute inset-0">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:from-black/70 sm:via-black/30" />
          </div>

          {/* Banner Content matching screenshot */}
          <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 max-w-sm sm:max-w-md md:max-w-lg">
            {/* Small Top Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold w-fit border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{banner.tag}</span>
            </div>

            {/* Headline and Discount Text */}
            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight whitespace-pre-line drop-shadow-sm">
                {banner.title}
              </h2>
              <p className="text-sm sm:text-base font-medium text-zinc-200">
                {banner.subtitle}
              </p>
            </div>

            {/* CTA Button matching screenshot: white pill button with "Shop Now ->" */}
            <div>
              <a
                href="#flash-vault"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-100 shadow-lg active:scale-95 transition-all group/btn"
              >
                <span>{banner.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Desktop Controls */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-3 right-5 z-20 flex gap-1.5">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Feature Cards on Desktop (Eliminates blank space in full width mode) */}
        {!isPhoneMode && (
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 flex-col gap-4">
            {/* Side Card 1: Flash Spotlight */}
            <div className="relative flex-1 rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 flex flex-col justify-between text-white shadow-md border border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  <Flame className="w-3.5 h-3.5 fill-current" /> Spotlight Deal
                </span>
                <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
                  53% OFF
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Streetwear Vault</p>
                <h3 className="text-lg font-bold text-white mt-1">Urban Oversized Hoodie & Joggers</h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-extrabold text-white">₹899</span>
                  <span className="text-xs text-zinc-500 line-through">₹1,899</span>
                </div>
              </div>
              <a
                href="#flash-vault"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
              >
                <span>Claim Vault Deal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Side Card 2: Tech Flagship */}
            <div className="relative flex-1 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950/80 via-zinc-900 to-black p-6 flex flex-col justify-between text-white shadow-md border border-amber-900/30">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Tech Flagship
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Save ₹8,000
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Next-Gen Audio & 5G</p>
                <h3 className="text-lg font-bold text-white mt-1">Studio ANC & Apex Pro Flagships</h3>
                <p className="text-xs text-zinc-300 mt-1">Spatial Audio 2.0 • 65-hr Endurance</p>
              </div>
              <a
                href="#products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
              >
                <span>Explore Tech Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
