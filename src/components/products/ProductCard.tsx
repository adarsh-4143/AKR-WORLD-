"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  variant?: "standard" | "compact";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  variant = "standard",
}) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wish = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-zinc-100 overflow-hidden cursor-pointer">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onClick={() => onQuickView(product)}
        />

        {/* Top-Left: Discount Badge matching screenshot exactly */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-[#E11D48] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Top-Right: Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wish
              ? "bg-white text-rose-600 shadow-md scale-105"
              : "bg-white/80 backdrop-blur-md text-zinc-700 hover:bg-white hover:text-black shadow-sm"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${wish ? "fill-current" : ""}`} />
        </button>

        {/* Bottom Overlay for quick actions on hover/mobile */}
        <div className="absolute inset-x-2 bottom-2 flex gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 rounded-xl bg-white/90 backdrop-blur-md text-zinc-900 text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-1 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center hover:bg-black shadow-sm transition-all active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold mb-1">
            <span className="uppercase tracking-wider truncate">{product.brand}</span>
            <div className="flex items-center gap-1 text-zinc-700">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1 cursor-pointer hover:text-zinc-600 transition-colors"
          >
            {product.name}
          </h3>
        </div>

        {/* Price Row matching screenshot */}
        <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-zinc-100">
          <span className="text-sm sm:text-base font-extrabold text-zinc-950">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-zinc-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
