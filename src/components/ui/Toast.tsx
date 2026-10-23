"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Toast: React.FC = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-8 right-4 left-4 sm:left-auto sm:right-8 z-50 flex items-center gap-3 bg-zinc-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
      <button
        onClick={() => setToastMessage(null)}
        className="ml-auto p-1 text-zinc-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
