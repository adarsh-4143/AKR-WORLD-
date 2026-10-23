"use client";

import React, { useState } from "react";
import { Bell, X, Sparkles, Tag, Package, Check, Trash2 } from "lucide-react";
import { INITIAL_NOTIFICATIONS } from "@/data/products";
import { NotificationItem } from "@/types";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "flash":
        return <Sparkles className="w-4 h-4 text-rose-500" />;
      case "discount":
        return <Tag className="w-4 h-4 text-amber-500" />;
      case "order":
        return <Package className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Bell className="w-5 h-5 text-zinc-900" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-base">Global Notifications</h3>
              <p className="text-xs text-zinc-500">Live order & drop updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-2.5 bg-zinc-100/70 border-b border-zinc-200 flex items-center justify-between text-xs font-semibold text-zinc-600">
          <span>{notifications.length} alerts</span>
          <div className="flex gap-4">
            <button
              onClick={markAllAsRead}
              className="hover:text-zinc-900 flex items-center gap-1 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
            <button
              onClick={clearAll}
              className="hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <Bell className="w-12 h-12 stroke-[1.2] mb-3 text-zinc-300" />
              <p className="font-semibold text-zinc-700">No new alerts</p>
              <p className="text-xs text-zinc-400 mt-1">
                You are all caught up on the latest sales and drops.
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.read
                    ? "bg-white/70 border-zinc-200/70 opacity-80"
                    : "bg-white border-zinc-300 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-zinc-900">{item.title}</h4>
                      <span className="text-[10px] text-zinc-400">{item.time}</span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
