"use client";

import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  qty: number;
};

type CartState = {
  items: Record<string, CartItem>;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  totalQty: number;
  subtotal: number;
  asArray: () => CartItem[];
};

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  add: (item, qty = 1) =>
    set((state) => {
      const existing = state.items[item.id];
      const nextQty = (existing?.qty ?? 0) + qty;
      return {
        items: {
          ...state.items,
          [item.id]: {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl ?? null,
            qty: nextQty,
          },
        },
      };
    }),
  remove: (id) =>
    set((state) => {
      const copy = { ...state.items };
      delete copy[id];
      return { items: copy };
    }),
  increment: (id) =>
    set((state) => {
      const it = state.items[id];
      if (!it) return {};
      return { items: { ...state.items, [id]: { ...it, qty: it.qty + 1 } } };
    }),
  decrement: (id) =>
    set((state) => {
      const it = state.items[id];
      if (!it) return {};
      const nextQty = it.qty - 1;
      if (nextQty <= 0) {
        const copy = { ...state.items };
        delete copy[id];
        return { items: copy };
      }
      return { items: { ...state.items, [id]: { ...it, qty: nextQty } } };
    }),
  clear: () => set({ items: {} }),
  get totalQty() {
    return Object.values(get().items).reduce((a, b) => a + b.qty, 0);
  },
  get subtotal() {
    return Object.values(get().items).reduce((a, b) => a + b.qty * (b.price ?? 0), 0);
  },
  asArray: () => Object.values(get().items),
}));
