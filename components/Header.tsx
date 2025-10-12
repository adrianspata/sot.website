import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// Currency selector - commented out for now, uncomment when adding products
// import { CurrencySelector } from "./CurrencySelector";
import styles from "./Header.module.css";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>
          <Link to="/">
            <img 
              src="https://assets.floot.app/b8bbf1b5-c008-46f4-acc5-3490cd9ccc4b/d34b9084-5deb-4760-b6a3-1c833f057e23.png" 
              alt="SOT Logo"
              className={styles.logoImg}
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <NavLink to="/projects" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>PROJECTS</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>ABOUT</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink} end>CONTACT</NavLink>
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
    </>
  );
};