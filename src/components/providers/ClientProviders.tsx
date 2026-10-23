"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { LocationProvider } from "@/context/LocationContext";
import { Toast } from "@/components/ui/Toast";

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LocationProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <Toast />
        </CartProvider>
      </WishlistProvider>
    </LocationProvider>
  );
};
