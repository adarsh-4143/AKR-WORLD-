"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Bell,
  ShoppingBag,
  ChevronDown,
  Globe,
  Heart,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchBar } from "./SearchBar";
import { NotificationDrawer } from "./NotificationDrawer";
import { AddressSelectorModal } from "./AddressSelector";
import { CartDrawer } from "./CartDrawer";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterClick,
}) => {
  const { selectedAddress, setIsAddressModalOpen } = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-zinc-200/60 transition-all">
      {/* Top Global Notice Banner (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-zinc-950 text-white text-xs font-medium tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>GLOBAL MEGA FEST 2026</span>
          </span>
          <span className="text-zinc-400">|</span>
          <span className="text-zinc-300">
            Worldwide Express Shipping on orders over ₹1,500 ($50)
          </span>
        </div>
        <div className="flex items-center gap-5 text-zinc-300">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Guarantee
          </span>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            <Globe className="w-3.5 h-3.5" />
            <span>EN / INR (₹)</span>
          </div>
        </div>
      </div>

      {/* Main Header Container: Expands up to 1600px to eliminate awkward side blank space */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 pt-2.5 pb-2.5">
        {/* Mobile / Tablet Header Row: */}
        <div className="flex lg:hidden items-center justify-between mb-3 gap-2">
          {/* Left Corner: Brand Logo + Notification & Cart Icons */}
          <div className="flex items-center gap-2">
            {/* Brand Logo */}
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white shadow-xs border border-purple-200/80 p-0.5 shrink-0">
              <Image
                src="/logo.png"
                alt="AKR WORLD"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-800 shadow-sm active:scale-95 transition-all"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-800 shadow-sm active:scale-95 transition-all"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-zinc-950 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Right Corner: Deliver To Address Selector (Matching user's exact specification) */}
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-all text-right"
            aria-label="Select delivery address"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 leading-none">
                Deliver to
              </span>
              <div className="flex items-center gap-1 mt-0.5 justify-end">
                <span className="text-xs font-bold text-zinc-900 truncate max-w-[150px]">
                  {selectedAddress.city}, {selectedAddress.postalCode}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
          </button>
        </div>

        {/* Desktop Header Row */}
        <div className="hidden lg:flex items-center justify-between gap-6 mb-3">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-sm border border-purple-200/80 p-0.5 group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/logo.png"
                alt="AKR WORLD"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-zinc-950 block leading-tight group-hover:text-purple-900 transition-colors">
                AKR WORLD
              </span>
              <span className="text-[10px] uppercase tracking-widest text-purple-700 font-bold block">
                Universal Marketplace
              </span>
            </div>
          </div>

          {/* Search bar on desktop */}
          <div className="flex-1 max-w-xl">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onFilterClick={onFilterClick}
            />
          </div>

          {/* Right Desktop Nav actions */}
          <div className="flex items-center gap-4">
            {/* Address Selector */}
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400 block leading-none">
                  Deliver to
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-bold text-zinc-900">
                    {selectedAddress.city}, {selectedAddress.postalCode}
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </div>
              </div>
            </button>

            {/* Wishlist */}
            <a
              href="#products"
              className="relative p-2.5 rounded-2xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Notification Drawer Trigger */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2.5 rounded-2xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-zinc-950 hover:bg-black text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag ({totalItems})</span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200">
              <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar for Mobile (directly below top header row, matching user's instruction) */}
        <div className="lg:hidden">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilterClick={onFilterClick}
          />
        </div>
      </div>

      {/* Slide-over Drawers & Modals */}
      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
      <AddressSelectorModal />
      <CartDrawer />
    </header>
  );
};
