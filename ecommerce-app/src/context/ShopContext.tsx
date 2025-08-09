/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '../common/interfaces/product';
import type { CartItem, ShopContextValue } from './shopTypes';

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const useShop = (): ShopContextValue => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === product.id);
      if (existing) {
        return prev.map(ci => ci.id === product.id ? { ...ci, quantity: ci.quantity + quantity } : ci);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity }];
    });
  };

  const setItemQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => prev
      .map(ci => ci.id === productId ? { ...ci, quantity: Math.max(1, quantity) } : ci)
      .filter(ci => ci.quantity > 0));
  };

  const incrementItem = (productId: string) => setItemQuantity(productId, (cartItems.find(ci => ci.id === productId)?.quantity ?? 0) + 1);
  const decrementItem = (productId: string) => setItemQuantity(productId, (cartItems.find(ci => ci.id === productId)?.quantity ?? 1) - 1);

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(ci => ci.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId); else next.add(productId);
      return next;
    });
  };

  const isFavorite = (productId: string) => favorites.has(productId);

  const totalItemsInCart = useMemo(() => cartItems.reduce((sum, ci) => sum + ci.quantity, 0), [cartItems]);

  return (
    <ShopContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite,
      totalItemsInCart,
      setItemQuantity,
      incrementItem,
      decrementItem,
    }}>
      {children}
    </ShopContext.Provider>
  );
};
