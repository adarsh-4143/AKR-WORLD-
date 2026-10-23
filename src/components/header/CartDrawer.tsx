"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountTotal,
    shipping,
    grandTotal,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AKRGLOBAL") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'AKRGLOBAL' for 15% off");
    }
  };

  const finalDiscount = promoApplied ? discountTotal + subtotal * 0.15 : discountTotal;
  const finalPayable = promoApplied ? Math.max(0, grandTotal - subtotal * 0.15) : grandTotal;
  const freeShippingThreshold = 1500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-base">Shopping Bag</h3>
              <p className="text-xs text-zinc-500">{cart.length} unique products</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-5 py-3 bg-amber-50/80 border-b border-amber-200/60">
          <div className="flex justify-between text-xs font-semibold text-amber-950 mb-1.5">
            <span>
              {amountToFreeShipping === 0
                ? "🎉 You qualified for FREE Global Express Shipping!"
                : `Add ₹${amountToFreeShipping.toFixed(0)} more for FREE Global Delivery`}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-amber-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <ShoppingBag className="w-14 h-14 stroke-[1.2] mb-3 text-zinc-300" />
              <p className="font-semibold text-zinc-700 text-base">Your bag is empty</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                Explore our global vaults, designer stories, and flash deals to add items.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 bg-white rounded-2xl border border-zinc-200/90 shadow-sm flex gap-3.5"
              >
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {item.product.discountPercentage > 0 && (
                    <span className="absolute top-1 left-1 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                      -{item.product.discountPercentage}%
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-extrabold text-zinc-900">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-xs text-zinc-400 line-through">
                          ₹{item.product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                    <div className="flex items-center gap-2 bg-zinc-100 px-2 py-1 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-md bg-white text-zinc-700 flex items-center justify-center hover:bg-zinc-200 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-zinc-900 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-md bg-white text-zinc-700 flex items-center justify-center hover:bg-zinc-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-zinc-800">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer calculation */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-zinc-200 space-y-3 shadow-lg">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon code (AKRGLOBAL)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 uppercase font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition-colors"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Coupon AKRGLOBAL applied! Extra 15% discount saved.
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-600 font-semibold">{promoError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-600 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-zinc-900">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Savings & Discounts</span>
                <span className="font-semibold">-₹{finalDiscount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Global Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Total Amount</span>
                <span>₹{finalPayable.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => alert("Redirecting to Secure Worldwide Checkout Gateway...")}
              className="w-full py-3.5 bg-zinc-950 hover:bg-black text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-zinc-950/15 transition-all group active:scale-[0.99]"
            >
              <span>Proceed to Global Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted • 30-Day Global Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
