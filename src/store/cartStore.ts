import { create } from "zustand";
import type { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  decrement: (productId: number) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  // Add product (or increase quantity if exists)
  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),

  // Remove entire product from cart
  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
    })),

  // Decrement quantity by 1; remove if quantity becomes 0
  decrement: (productId) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    })),

  // Clear entire cart
  clear: () => set({ items: [] }),

  // Total price of all items
  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  // Total number of items (sum of quantities)
  getTotalItems: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
