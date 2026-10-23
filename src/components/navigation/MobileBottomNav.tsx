"use client";

import React from "react";
import { Home, LayoutGrid, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCategoryClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onCategoryClick,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "categories") {
      onCategoryClick();
    } else if (tab === "cart") {
      setIsCartOpen(true);
    } else if (tab === "wishlist") {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "profile") {
      alert("AKR World Profile • Signed in as Valued Member");
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Floating Pill Nav matching screenshot exactly */}
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-[390px] sm:max-w-[420px] h-[62px] px-3 bg-white/98 backdrop-blur-xl rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-zinc-200/90 transition-all">
        {/* 1. Home Button (with screenshot's soft cream oval pill active state) */}
        <button
          onClick={() => handleTabClick("home")}
          className={`flex items-center justify-center h-11 transition-all duration-200 ${
            activeTab === "home"
              ? "px-5 rounded-full bg-[#F2EDE4] text-zinc-950 font-bold shadow-xs scale-102"
              : "px-3 text-zinc-500 hover:text-zinc-900"
          }`}
          aria-label="Home"
          title="Home"
        >
          <Home
            className={`w-[22px] h-[22px] ${
              activeTab === "home"
                ? "fill-zinc-950 text-zinc-950"
                : "text-zinc-600 stroke-[1.8]"
            }`}
          />
        </button>

        {/* 2. Categories (4-squares grid icon) */}
        <button
          onClick={() => handleTabClick("categories")}
          className={`flex items-center justify-center h-11 transition-all duration-200 ${
            activeTab === "categories"
              ? "px-5 rounded-full bg-[#F2EDE4] text-zinc-950 font-bold shadow-xs scale-102"
              : "px-3 text-zinc-500 hover:text-zinc-900"
          }`}
          aria-label="Categories"
          title="Categories"
        >
          <LayoutGrid
            className={`w-[22px] h-[22px] ${
              activeTab === "categories"
                ? "fill-zinc-950 text-zinc-950"
                : "text-zinc-600 stroke-[1.8]"
            }`}
          />
        </button>

        {/* 3. Shopping Bag / Cart (with badge) */}
        <button
          onClick={() => handleTabClick("cart")}
          className={`relative flex items-center justify-center h-11 transition-all duration-200 ${
            activeTab === "cart"
              ? "px-5 rounded-full bg-[#F2EDE4] text-zinc-950 font-bold shadow-xs scale-102"
              : "px-3 text-zinc-500 hover:text-zinc-900"
          }`}
          aria-label="Shopping Cart"
          title="Shopping Cart"
        >
          <ShoppingBag
            className={`w-[22px] h-[22px] ${
              activeTab === "cart"
                ? "fill-zinc-950 text-zinc-950"
                : "text-zinc-600 stroke-[1.8]"
            }`}
          />
          {totalItems > 0 && (
            <span className="absolute top-1 right-2 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
              {totalItems}
            </span>
          )}
        </button>

        {/* 4. Wishlist (Heart icon) */}
        <button
          onClick={() => handleTabClick("wishlist")}
          className={`relative flex items-center justify-center h-11 transition-all duration-200 ${
            activeTab === "wishlist"
              ? "px-5 rounded-full bg-[#F2EDE4] text-zinc-950 font-bold shadow-xs scale-102"
              : "px-3 text-zinc-500 hover:text-zinc-900"
          }`}
          aria-label="Wishlist"
          title="Wishlist"
        >
          <Heart
            className={`w-[22px] h-[22px] ${
              activeTab === "wishlist"
                ? "fill-rose-600 text-rose-600"
                : "text-zinc-600 stroke-[1.8]"
            }`}
          />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-2 bg-zinc-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* 5. User Profile (User silhouette icon) */}
        <button
          onClick={() => handleTabClick("profile")}
          className={`flex items-center justify-center h-11 transition-all duration-200 ${
            activeTab === "profile"
              ? "px-5 rounded-full bg-[#F2EDE4] text-zinc-950 font-bold shadow-xs scale-102"
              : "px-3 text-zinc-500 hover:text-zinc-900"
          }`}
          aria-label="User Profile"
          title="Account Profile"
        >
          <User
            className={`w-[22px] h-[22px] ${
              activeTab === "profile"
                ? "fill-zinc-950 text-zinc-950"
                : "text-zinc-600 stroke-[1.8]"
            }`}
          />
        </button>
      </nav>
    </div>
  );
};
