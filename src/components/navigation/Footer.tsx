"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Mail,
  ArrowRight,
  Globe,
  CheckCircle2,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-white border-t border-zinc-200 mt-16 pb-12 text-zinc-700">
      {/* Value Proposition Cards */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 border-b border-zinc-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">Global Express</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Air freight to 190+ countries</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">100% Genuine</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Strict quality & brand certification</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">30-Day Easy Returns</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Hassle-free worldwide pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">24/7 Concierge</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Instant multilingual support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-purple-200/80 bg-white p-0.5 shrink-0">
                <Image
                  src="/logo.png"
                  alt="AKR WORLD"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-zinc-950 block leading-tight">
                  AKR WORLD
                </span>
                <span className="text-[10px] uppercase tracking-widest text-purple-700 font-bold block">
                  Universal Marketplace
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              The universal e-commerce marketplace delivering flagship tech, designer fashion,
              home aesthetics, smart living, and daily lifestyle essentials worldwide.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-bold text-zinc-900 mb-2">
                Join the Global Inner Circle • Get 15% Off
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 p-3 rounded-2xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome! Check your inbox for code AKRGLOBAL.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-zinc-950 text-white rounded-2xl text-xs font-bold hover:bg-black transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="#products" className="hover:text-zinc-950">Electronics & Gadgets</a></li>
              <li><a href="#products" className="hover:text-zinc-950">Fashion & Streetwear</a></li>
              <li><a href="#products" className="hover:text-zinc-950">Mobiles & Tablets</a></li>
              <li><a href="#products" className="hover:text-zinc-950">Home & Ambient Decor</a></li>
              <li><a href="#products" className="hover:text-zinc-950">Luxury Fragrances</a></li>
              <li><a href="#products" className="hover:text-zinc-950">Footwear & Sneakers</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Global Support
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="#track" className="hover:text-zinc-950">Track Shipment</a></li>
              <li><a href="#returns" className="hover:text-zinc-950">Returns & Refunds</a></li>
              <li><a href="#shipping" className="hover:text-zinc-950">Customs & Duties</a></li>
              <li><a href="#contact" className="hover:text-zinc-950">Help Center 24/7</a></li>
              <li><a href="#terms" className="hover:text-zinc-950">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-zinc-950">Privacy Shield</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              International Hubs
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-zinc-400" /> Mumbai Central (HQ)</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-zinc-400" /> New York Gateway</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-zinc-400" /> London Heathrow Express</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-zinc-400" /> Dubai Logistics Hub</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-zinc-400" /> Tokyo Haneda Depot</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment security */}
        <div className="mt-12 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 AKR WORLD International Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-500">
            <span>PCI-DSS Compliant</span>
            <span>•</span>
            <span>Apple Pay</span>
            <span>•</span>
            <span>Google Pay</span>
            <span>•</span>
            <span>UPI / RuPay</span>
            <span>•</span>
            <span>Visa & Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
