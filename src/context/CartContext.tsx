"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const CART_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

  // Load from localStorage on mount — clear if older than 10 minutes
  useEffect(() => {
    const savedCart = localStorage.getItem("ah-shop-cart");
    const savedTimestamp = localStorage.getItem("ah-shop-cart-timestamp");
    if (savedCart && savedTimestamp) {
      const age = Date.now() - parseInt(savedTimestamp, 10);
      if (age < CART_EXPIRY_MS) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (err) {
          console.error("Failed to parse cart:", err);
        }
      } else {
        // Cart expired — clear it
        localStorage.removeItem("ah-shop-cart");
        localStorage.removeItem("ah-shop-cart-timestamp");
      }
    }
  }, []);

  // Save to localStorage with a fresh timestamp on every change
  useEffect(() => {
    localStorage.setItem("ah-shop-cart", JSON.stringify(items));
    localStorage.setItem("ah-shop-cart-timestamp", Date.now().toString());
  }, [items]);

  const addToCart = (product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
