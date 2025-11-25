import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartItem } from "../App";
import { Cart } from "./Cart";
import styles from "./Header.module.css";

interface HeaderProps {
  cartItems?: CartItem[];
}

export const Header: React.FC<HeaderProps> = ({ cartItems = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > 10); // Add 10px threshold to reduce sensitivity
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMobileMenu}>
            <img 
              src="/images/sotLogoSingle.png" 
              alt="SOT Logo"
              className={styles.logoImg}
            />
          </Link>
        </div>
        
        {/* Left Navigation (near logo) */}
        <nav className={styles.leftNav}>
          <NavLink to="/shop" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>SHOP</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>PROJECTS</NavLink>
        </nav>
        
        {/* Right Navigation */}
        <nav className={styles.rightNav}>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>ABOUT</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>CONTACT</NavLink>
          <button 
            onClick={toggleCart}
            className={styles.cartButton}
          >
            CART {cartItemsCount > 0 && <span className={styles.cartCount}>({cartItemsCount})</span>}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ''}`}>
          <nav className={styles.mobileNav}>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink}
              onClick={closeMobileMenu}
              end
            >
              SHOP
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink}
              onClick={closeMobileMenu}
              end
            >
              PROJECTS
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink}
              onClick={closeMobileMenu}
              end
            >
              ABOUT
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}` : styles.mobileNavLink}
              onClick={closeMobileMenu}
              end
            >
              CONTACT
            </NavLink>
          </nav>
          {/* Currency selector - commented out for now, uncomment when adding products */}
          {/* <div className={styles.mobileCurrencyWrapper}>
            <CurrencySelector className={styles.mobileCurrencySelector} />
          </div> */}
      </div>
      
      {/* Cart Modal */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};