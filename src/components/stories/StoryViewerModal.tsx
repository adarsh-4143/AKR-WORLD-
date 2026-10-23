"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import { Story } from "@/types";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

interface StoryViewerModalProps {
  story: Story | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  onClose,
  onNext,
  onPrev,
}) => {
  const [progress, setProgress] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!story) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          onNext();
          return 0;
        }
        return p + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, onNext]);

  if (!story) return null;

  const featuredProduct = story.featuredProductId
    ? PRODUCTS.find((p) => p.id === story.featuredProductId)
    : PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm h-[85vh] max-h-[720px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between bg-zinc-950">
        {/* Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Top Story Header */}
        <div className="relative z-30 pt-6 px-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
              <Image
                src={story.thumbnail}
                alt={story.title}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <p className="text-xs font-bold leading-none">{story.title}</p>
              <p className="text-[10px] text-zinc-300 mt-0.5">Global Editorial Drop</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Background Story Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src={story.bannerImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
        </div>

        {/* Navigation Touch Areas */}
        <div
          onClick={onPrev}
          className="absolute inset-y-16 left-0 w-1/3 z-20 cursor-pointer"
        />
        <div
          onClick={onNext}
          className="absolute inset-y-16 right-0 w-1/3 z-20 cursor-pointer"
        />

        {/* Bottom Story Card & CTA */}
        <div className="relative z-30 p-5 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{story.discountNote}</span>
          </div>

          <h3 className="text-2xl font-black text-white leading-tight">
            {story.tagline}
          </h3>

          {featuredProduct && (
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {featuredProduct.name}
                  </p>
                  <p className="text-xs text-amber-300 font-extrabold">
                    ₹{featuredProduct.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(featuredProduct);
                  onClose();
                }}
                className="px-3 py-2 rounded-xl bg-white text-zinc-950 font-bold text-xs flex items-center gap-1.5 hover:bg-zinc-100 transition-colors shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
