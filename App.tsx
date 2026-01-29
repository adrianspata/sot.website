import React, { useState, createContext, useContext, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import { CookieConsent } from "./components/CookieConsent";

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
import PageLayout_0 from "./pages/about.pageLayout.tsx";
import Page_1 from "./pages/_index.tsx";
import PageLayout_1 from "./pages/_index.pageLayout.tsx";
import Page_2 from "./pages/contact.tsx";
import PageLayout_2 from "./pages/contact.pageLayout.tsx";
import Page_3 from "./pages/projects.tsx";
import PageLayout_3 from "./pages/projects.pageLayout.tsx";
import Page_4 from "./pages/projects.$projectId.tsx";
import PageLayout_4 from "./pages/projects.$projectId.pageLayout.tsx";
import Page_5 from "./pages/shop.tsx";
import PageLayout_5 from "./pages/shop.pageLayout.tsx";
import Page_6 from "./pages/shop.$productId.tsx";
import PageLayout_6 from "./pages/shop.$productId.pageLayout.tsx";
import Page_7 from "./pages/checkout.tsx";
import PageLayout_7 from "./pages/checkout.pageLayout.tsx";
import Page_8 from "./pages/notFound.tsx";
import PageLayout_8 from "./pages/notFound.pageLayout.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    return setTimeout(cb, 1);
  };
}

import "./base.css";

const fileNameToRoute = new Map([["./pages/about.tsx", "/about"], ["./pages/_index.tsx", "/"], ["./pages/contact.tsx", "/contact"], ["./pages/projects.tsx", "/projects"], ["./pages/projects.$projectId.tsx", "/projects/:projectId"], ["./pages/shop.tsx", "/shop"], ["./pages/shop.$productId.tsx", "/shop/product/:productId"], ["./pages/checkout.tsx", "/checkout"], ["./pages/notFound.tsx", "*"]]);
const fileNameToComponent = new Map([
  ["./pages/about.tsx", Page_0],
  ["./pages/_index.tsx", Page_1],
  ["./pages/contact.tsx", Page_2],
  ["./pages/projects.tsx", Page_3],
  ["./pages/projects.$projectId.tsx", Page_4],
  ["./pages/shop.tsx", Page_5],
  ["./pages/shop.$productId.tsx", Page_6],
  ["./pages/checkout.tsx", Page_7],
  ["./pages/notFound.tsx", Page_8],
]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  if (!Component) return null;
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    for (const component of components) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

export function App() {
  return (
    <BrowserRouter>
      <GlobalContextProviders>
        <CartProvider>
          <Routes>
            {toElement({
              trie: buildLayoutTrie({
                "./pages/about.tsx": PageLayout_0,
                "./pages/_index.tsx": PageLayout_1,
                "./pages/contact.tsx": PageLayout_2,
                "./pages/projects.tsx": PageLayout_3,
                "./pages/projects.$projectId.tsx": PageLayout_4,
                "./pages/shop.tsx": PageLayout_5,
                "./pages/shop.$productId.tsx": PageLayout_6,
                "./pages/checkout.tsx": PageLayout_7,
                "./pages/notFound.tsx": PageLayout_8,
              }), fileNameToRoute, makePageRoute
            })}
          </Routes>
          <CookieConsent />
        </CartProvider>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
