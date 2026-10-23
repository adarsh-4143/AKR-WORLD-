"use client";

import React, { createContext, useContext, useState } from "react";
import { Address } from "@/types";
import { INITIAL_ADDRESSES } from "@/data/products";

interface LocationContextType {
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  addresses: Address[];
  addAddress: (addr: Address) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(INITIAL_ADDRESSES[0]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const addAddress = (addr: Address) => {
    setAddresses((prev) => [addr, ...prev]);
    setSelectedAddress(addr);
  };

  return (
    <LocationContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        addresses,
        addAddress,
        isAddressModalOpen,
        setIsAddressModalOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
