import React, { useState, createContext, useContext, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import { CookieConsent } from "./components/CookieConsent";
import { NewsletterPopup } from "./components/NewsletterPopup";
import { SharedLayout } from "./components/SharedLayout";

// Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
}

// Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id && cartItem.size === item.size);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemKey: string) => {
    console.log('Removing from cart:', itemKey);
    setCartItems(prev => prev.filter(item => {
      const currentKey = item.size ? `${item.id}-${item.size}` : item.id;
      console.log('Comparing keys:', currentKey, 'vs', itemKey);
      return currentKey !== itemKey;
    }));
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    console.log('Updating quantity:', itemKey, 'to', quantity);
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prev => prev.map(item => {
      const currentKey = item.size ? `${item.id}-${item.size}` : item.id;
      return currentKey === itemKey ? { ...item, quantity } : item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

import Page_0 from "./pages/about.tsx";
import Page_1 from "./pages/_index.tsx";
import Page_2 from "./pages/contact.tsx";
import Page_3 from "./pages/projects.tsx";
import Page_4 from "./pages/projects.$projectId.tsx";
import Page_5 from "./pages/shop.tsx";
import Page_6 from "./pages/shop.$productId.tsx";
import Page_7 from "./pages/checkout.tsx";
import Page_8 from "./pages/notFound.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    return setTimeout(cb, 1);
  };
}

import "./styles/base.css";

function Layout() {
  return (
    <SharedLayout>
      <Outlet />
    </SharedLayout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <GlobalContextProviders>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Page_1 />} />
              <Route path="/about" element={<Page_0 />} />
              <Route path="/contact" element={<Page_2 />} />
              <Route path="/projects" element={<Page_3 />} />
              <Route path="/projects/:projectId" element={<Page_4 />} />
              <Route path="/shop" element={<Page_5 />} />
              <Route path="/shop/product/:productId" element={<Page_6 />} />
              <Route path="/checkout" element={<Page_7 />} />
              <Route path="*" element={<Page_8 />} />
            </Route>
          </Routes>
          <CookieConsent />
          <NewsletterPopup />
        </CartProvider>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
