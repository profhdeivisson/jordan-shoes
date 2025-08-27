'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/interfaces/CartItemInterface';
import { Produto } from '@/interfaces/ProdutoInterface';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (produto: Produto, quantidade: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('jordan-cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jordan-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (produto: Produto, quantidade: number = 1) => {
    setCartItems(prevItems => {
      const produtoParaSalvar = {
        ...produto,
        image: typeof produto.image === 'string' ? produto.image : produto.image.src
      };

      const existingItemIndex = prevItems.findIndex(item => item.produto.id === produto.id);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantidade: newItems[existingItemIndex].quantidade + quantidade
        };
        return newItems;
      } else {
        return [...prevItems, { produto: produtoParaSalvar, quantidade }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.produto.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.produto.id === productId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.produto.id === productId
          ? { ...item, quantidade: Math.max(1, item.quantidade - 1) }
          : item
      ).filter(item => item.quantidade > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantidade, 0);
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}