"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Product } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  isPhoneMode?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onQuickView,
  isPhoneMode = false,
}) => {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;

        const matchesQuery =
          !searchQuery.trim() ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="w-full my-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight">
              Global Marketplace Catalog
            </h2>
          </div>
          <p className="text-xs text-zinc-500">
            {filteredProducts.length} items curated worldwide • Authentic & Inspected
          </p>
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? "bg-zinc-950 text-white shadow-md scale-105"
                  : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Search Query Feedback */}
      {searchQuery && (
        <div className="mb-4 p-3 bg-white rounded-2xl border border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
          <span>
            Showing results for <strong>&ldquo;{searchQuery}&rdquo;</strong>
          </span>
          <button
            onClick={() => onSelectCategory("all")}
            className="text-zinc-900 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Grid: 2 columns in phone mode; up to 6 columns on wide desktop to eliminate blank space */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200">
          <p className="text-base font-bold text-zinc-800">No products match your search</p>
          <p className="text-xs text-zinc-500 mt-1">Try another keyword or select All Categories.</p>
        </div>
      ) : (
        <div
          className={
            isPhoneMode
              ? "grid grid-cols-2 gap-3"
              : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4 lg:gap-5"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
};
