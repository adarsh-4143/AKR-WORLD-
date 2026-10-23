"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, X, ArrowUpRight, Sparkles } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick?: () => void;
}

const TRENDING_SEARCHES = [
  "Oversized Hoodie",
  "Bomber Jacket",
  "ANC Headphones",
  "Ceramic Watch",
  "5G Smartphone",
  "Running Shoes",
  "Espresso Machine",
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full bg-white rounded-2xl border border-zinc-200/90 shadow-sm focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all">
        {/* Left search icon */}
        <div className="pl-4 pr-2 text-zinc-400 flex items-center justify-center">
          <Search className="w-5 h-5 text-zinc-400 stroke-[1.8]" />
        </div>

        {/* Input field matching screenshot */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for products, brands..."
          className="w-full py-3 text-sm text-zinc-900 placeholder:text-zinc-400 bg-transparent focus:outline-none tracking-wide"
        />

        {/* Clear query button if query exists */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Right filter button matching screenshot icon */}
        <button
          onClick={onFilterClick}
          className="p-3 mr-1 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-xl transition-colors"
          title="Filter and Sort"
          aria-label="Filter products"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[1.8]" />
        </button>
      </div>

      {/* Auto-suggest dropdown when focused */}
      {isFocused && !searchQuery && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsFocused(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-2xl shadow-xl border border-zinc-200/90 z-30 animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setIsFocused(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
                >
                  <span>{term}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
