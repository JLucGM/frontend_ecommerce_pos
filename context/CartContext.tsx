"use client";

import { CartItem } from "@/interfaces/CarItem";
import { createContext, useContext, useState } from "react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, selectedAttributes?: { [key: string]: string }) => void;
  updateQuantity: (id: number, quantity: number, selectedAttributes?: { [key: string]: string }) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(item.selectedAttributes)
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      }

      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: number, selectedAttributes?: { [key: string]: string }) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          item.id !== id ||
          (selectedAttributes &&
            JSON.stringify(item.selectedAttributes) !== JSON.stringify(selectedAttributes))
      )
    );
  };

  const updateQuantity = (id: number, quantity: number, selectedAttributes?: { [key: string]: string }) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id &&
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};