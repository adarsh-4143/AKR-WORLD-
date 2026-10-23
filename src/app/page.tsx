"use client";

import React, { useState } from "react";
import { Header } from "@/components/header/Header";
import { StoryCircles } from "@/components/stories/StoryCircles";
import { HeroBannerCarousel } from "@/components/hero/HeroBannerCarousel";
import { CircleCategories } from "@/components/categories/CircleCategories";
import { FlashDeals } from "@/components/products/FlashDeals";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { Footer } from "@/components/navigation/Footer";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-zinc-900 transition-all">
      {/* 1. Header (Deliver to address top right, notification & cart top left, search bar below) */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterClick={() => {
          const el = document.getElementById("products");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 pb-12">
        {/* 2. Category Stories Row 1: Circular Stories with Gradient Rings */}
        <StoryCircles
          onCategorySelect={(categoryId) => {
            setSelectedCategory(categoryId);
            const el = document.getElementById("products");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. Hero Card Carousel: "New Season New You" with Shop Now CTA */}
        <HeroBannerCarousel />

        {/* 4. Category Circles Row 2: Department Circles */}
        <div id="category-section">
          <CircleCategories
            selectedCategory={selectedCategory}
            onSelectCategory={(catSlug) => {
              setSelectedCategory(catSlug);
              const el = document.getElementById("products");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>

        {/* 5. Flash Vault: Deals with live timer & discount cards */}
        <FlashDeals
          products={PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 6. Universal Marketplace Products Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onQuickView={(p) => setQuickViewProduct(p)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
