"use client";

import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface FlashDealsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  isPhoneMode?: boolean;
}

export const FlashDeals: React.FC<FlashDealsProps> = ({
  products,
  onQuickView,
  isPhoneMode = false,
}) => {
  // Live ticking countdown timer: 03 HR : 30 MIN : 07 SEC matching screenshot
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 30,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, "0");

  const flashProducts = products.filter((p) => p.isFlashDeal);

  return (
    <section id="flash-vault" className="w-full my-6 sm:my-8">
      {/* Flash Vault Section Header matching screenshot */}
      <div className="flex items-center justify-between mb-4 px-0.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Red square lightning icon */}
          <div className="w-10 h-10 rounded-2xl bg-[#E11D48] text-white flex items-center justify-center shadow-md animate-pulse-subtle shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black text-zinc-900 tracking-tight leading-tight">
              Flash Vault
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-500 font-medium">
              Ends today — limited stock
            </p>
          </div>
        </div>

        {/* Live Countdown Timer matching screenshot format */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="w-7 sm:w-9 h-7 sm:h-8 rounded-lg bg-zinc-900 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm">
              {formatNum(timeLeft.hours)}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-zinc-400 mt-0.5">
              HR
            </span>
          </div>

          <span className="font-bold text-zinc-900 text-xs -mt-3">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="w-7 sm:w-9 h-7 sm:h-8 rounded-lg bg-zinc-900 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm">
              {formatNum(timeLeft.minutes)}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-zinc-400 mt-0.5">
              MIN
            </span>
          </div>

          <span className="font-bold text-zinc-900 text-xs -mt-3">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="w-7 sm:w-9 h-7 sm:h-8 rounded-lg bg-[#E11D48] text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm">
              {formatNum(timeLeft.seconds)}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-zinc-400 mt-0.5">
              SEC
            </span>
          </div>
        </div>
      </div>

      {/* Product Cards: exactly 2 columns in phone mode matching screenshot; responsive 2 to 6 columns in full mode */}
      <div
        className={
          isPhoneMode
            ? "grid grid-cols-2 gap-3"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4 lg:gap-5"
        }
      >
        {flashProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
