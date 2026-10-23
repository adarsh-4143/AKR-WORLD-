"use client";

import React, { useState } from "react";
import { MapPin, X, Check, Plus, Globe, Navigation } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { Address } from "@/types";

export const AddressSelectorModal: React.FC = () => {
  const {
    isAddressModalOpen,
    setIsAddressModalOpen,
    selectedAddress,
    setSelectedAddress,
    addresses,
    addAddress,
  } = useLocation();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [newCountry, setNewCountry] = useState("India");

  if (!isAddressModalOpen) return null;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity || !newPincode) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: "Custom Location",
      recipient: "Valued Customer",
      street: "Main Avenue",
      city: newCity,
      state: "State Region",
      postalCode: newPincode,
      country: newCountry,
    };

    addAddress(newAddr);
    setIsAddingNew(false);
    setNewCity("");
    setNewPincode("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Choose Delivery Address</h3>
              <p className="text-xs text-zinc-500">Fast worldwide logistics & localized taxes</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="w-9 h-9 rounded-full bg-zinc-200/60 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Selected Address Notice */}
        <div className="mt-4 p-3.5 bg-white rounded-2xl border border-amber-200/70 flex items-center gap-3">
          <Navigation className="w-4 h-4 text-amber-700 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-zinc-900">Delivering to: </span>
            <span className="text-zinc-700">{selectedAddress.city}, {selectedAddress.postalCode} ({selectedAddress.country})</span>
          </div>
        </div>

        {/* Address List */}
        <div className="mt-4 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-1">
            Saved Global Destinations
          </div>

          {addresses.map((addr) => {
            const isSelected = selectedAddress.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedAddress(addr);
                  setIsAddressModalOpen(false);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  isSelected
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-md"
                    : "bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {addr.label}
                    </span>
                    <span className="text-xs opacity-75 font-medium">{addr.recipient}</span>
                  </div>
                  <p className="text-sm font-semibold">{addr.city}, {addr.postalCode}</p>
                  <p className={`text-xs ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                    {addr.street}, {addr.country}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-white text-zinc-900 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Address Section */}
        <div className="mt-5 pt-4 border-t border-zinc-200">
          {!isAddingNew ? (
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-zinc-300 hover:border-zinc-500 text-zinc-700 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Deliver to a New City or Pincode</span>
            </button>
          ) : (
            <form onSubmit={handleAddNew} className="space-y-3 bg-white p-4 rounded-2xl border border-zinc-200">
              <h4 className="text-sm font-bold text-zinc-900">Enter Delivery Details</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-500 block mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Paris / Tokyo"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-500 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 75001"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-zinc-500 block mb-1">Country</label>
                <input
                  type="text"
                  placeholder="e.g. France / Japan / USA"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2 text-xs font-semibold text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-zinc-900 rounded-xl hover:bg-black"
                >
                  Save & Select
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
