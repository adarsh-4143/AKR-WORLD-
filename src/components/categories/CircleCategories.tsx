"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";

interface CircleCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CircleCategories: React.FC<CircleCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="w-full my-5">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
            Explore Categories
          </h2>
          <p className="text-xs text-zinc-500">Universal catalog across global departments</p>
        </div>
      </div>

      {/* Horizontal Scroll of Category Circles matching screenshot layout */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 -mx-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular Avatar */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-zinc-950 scale-105"
                    : "ring-1 ring-zinc-200 hover:ring-zinc-400"
                }`}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-100 shadow-sm">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center" />
                  )}
                </div>
              </div>

              {/* Category Name */}
              <span
                className={`text-[11px] sm:text-xs font-semibold text-center transition-colors truncate max-w-[70px] sm:max-w-[85px] ${
                  isSelected
                    ? "text-zinc-950 font-bold underline underline-offset-4"
                    : "text-zinc-600 group-hover:text-zinc-900"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
