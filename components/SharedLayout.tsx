import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCart } from "../App";
import styles from "./SharedLayout.module.css";

interface SharedLayoutProps {
  children: React.ReactNode;
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
  const { cartItems } = useCart();
  
  return (
    <div className={styles.layout}>
      <Header cartItems={cartItems} />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};