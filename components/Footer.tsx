import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { submitToWeb3Forms } from "../helpers/newsletter";
import { Input } from "./Input";
import { Button } from "./Button";

// Currency selector - commented out for now, uncomment when adding products
// import { CurrencySelector } from "./CurrencySelector";
import styles from "../styles/components/Footer.module.css";

export const Footer = () => {
  const location = useLocation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const isProjectsPage = location.pathname === "/projects";

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [mobileEmail, setMobileEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [mobileStatus, setMobileStatus] = useState<"idle" | "success">("idle");

  // Auto-reset desktop form after successful subscription
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setEmail("");
        setIsFormVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  // Auto-reset mobile form after successful subscription
  useEffect(() => {
    if (mobileStatus === "success") {
      const timer = setTimeout(() => {
        setMobileStatus("idle");
        setMobileEmail("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [mobileStatus]);

  const handleNewsletterClick = () => {
    setIsFormVisible((prev) => !prev);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !email.includes("@")) {
      console.log("Invalid email format provided");
      return;
    }

    // Show success immediately to the user (optimistic UI)
    const submittedEmail = email;
    setStatus("success");
    setEmail("");

    // Call API in background
    submitToWeb3Forms(submittedEmail).catch((error) => {
      // If it fails, we've already shown success. 
      // In a critical system we might show an error toast, 
      // but for a newsletter signup, silent failure logging is often acceptable 
      // to keep the UX smooth, or we could handle status revert here.
      console.error("Failed to submit to Web3Forms", error);
    });
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!mobileEmail || !mobileEmail.includes("@")) {
      console.log("Invalid email format provided");
      return;
    }

    // Show success immediately
    const submittedEmail = mobileEmail;
    setMobileStatus("success");
    setMobileEmail("");

    // Call API in background
    submitToWeb3Forms(submittedEmail).catch((error) => {
      console.error("Failed to submit to Web3Forms", error);
    });
  };

  return (
    <footer
      className={`${styles.footer} ${isProjectsPage ? styles.fixed : ""}`}
    >
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        {/* Level 1: Newsletter Section */}
        <div className={styles.topLevel}>
          <div className={styles.leftSection}>
            <button
              onClick={handleNewsletterClick}
              className={styles.newsletterButton}
              data-newsletter-button
            >
              NEWSLETTER
            </button>
            {status === "success" ? (
              <div className={styles.thankYouMessage}>
                THANK YOU, NO DISCOUNTS THOUGH
              </div>
            ) : (
              <form
                className={`${styles.signupForm} ${isFormVisible ? styles.visible : ""}`}
                onSubmit={handleSubmit}
                data-newsletter-form
              >
                <Input
                  id="email-input"
                  type="email"
                  placeholder="EMAIL"
                  className={styles.emailInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className={styles.subscribeButton}>
                  SUBSCRIBE
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Level 2: Menu List */}
        <div className={styles.middleLevel}>
          <nav className={styles.menuList}>
            <Link to="/projects" className={styles.menuLink}>
              PROJECTS
            </Link>
            <Link to="/about" className={styles.menuLink}>
              ABOUT
            </Link>
            <Link to="/contact" className={styles.menuLink}>
              CONTACT
            </Link>
          </nav>
        </div>

        {/* Level 3: Logo and Copyright */}
        <div className={styles.bottomLevel}>
          {/* Currency selector - commented out for now, uncomment when adding products */}
          {/* <CurrencySelector className={styles.currencySelector} /> */}
          <img
            src="/images/SOTfinalLogo.png"
            alt="SOT Logo"
            className={styles.logo}
          />
          <span className={styles.copyright}>© 2026 SOT</span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Level 1: Newsletter Section */}
        <div className={styles.mobileNewsletterSection}>
          <div className={styles.mobileNewsletterHeading}>NEWSLETTER</div>
          {mobileStatus === "success" ? (
            <div className={styles.mobileThankYouMessage}>
              THANK YOU, NO DISCOUNTS THOUGH
            </div>
          ) : (
            <form
              className={styles.mobileSignupForm}
              onSubmit={handleMobileSubmit}
            >
              <Input
                id="mobile-email-input"
                type="email"
                placeholder="EMAIL"
                className={styles.mobileEmailInput}
                value={mobileEmail}
                onChange={(e) => setMobileEmail(e.target.value)}
                required
              />
              <Button type="submit" className={styles.mobileSubscribeButton}>
                SUBSCRIBE
              </Button>
            </form>
          )}
        </div>

        {/* Level 2: Menu List */}
        <div className={styles.mobileMenuSection}>
          <nav className={styles.mobileMenuList}>
            <Link to="/projects" className={styles.mobileMenuLink}>
              PROJECTS
            </Link>
            <Link to="/about" className={styles.mobileMenuLink}>
              ABOUT
            </Link>
            <Link to="/contact" className={styles.mobileMenuLink}>
              CONTACT
            </Link>
          </nav>
        </div>

        {/* Level 3: Logo and Copyright */}
        <div className={styles.mobileCopyrightSection}>
          {/* Currency selector - commented out for now, uncomment when adding products */}
          {/* <CurrencySelector className={styles.mobileCurrencySelector} /> */}
          <img
            src="/images/SOTfinalLogo.png"
            alt="SOT Logo"
            className={styles.logo}
          />
          <span>© 2025 SOT</span>
        </div>
      </div>
    </footer>
  );
};