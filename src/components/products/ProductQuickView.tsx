"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const wish = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, undefined, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[92vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Product Image */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto bg-zinc-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {/* Discount Pill */}
          {product.discountPercentage > 0 && (
            <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
              {product.discountPercentage}% OFF
            </span>
          )}

          {/* Close Button on Mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-800 shadow"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {product.brand}
              </span>
              <button
                onClick={onClose}
                className="hidden md:flex w-8 h-8 rounded-full bg-zinc-200/70 hover:bg-zinc-200 items-center justify-center text-zinc-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl font-black text-zinc-900 mt-1 leading-snug">
              {product.name}
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-current"
                        : "text-zinc-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-800">
                {product.rating}
              </span>
              <span className="text-xs text-zinc-400">
                ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-black text-zinc-950">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm font-medium text-zinc-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            {product.specifications && (
              <div className="mt-4 pt-3 border-t border-zinc-200/80 grid grid-cols-2 gap-2 text-[11px]">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="bg-white p-2 rounded-xl border border-zinc-200/60">
                    <span className="text-zinc-400 block font-medium">{key}</span>
                    <span className="text-zinc-900 font-bold truncate block">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-zinc-200/80 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-950 hover:bg-black text-white active:scale-95"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ₹{product.price.toLocaleString("en-IN")}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-colors flex items-center justify-center ${
                  wish
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wish ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-zinc-500" /> Free Global Delivery
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-zinc-500" /> Authenticity Verified
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-zinc-500" /> 30-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
