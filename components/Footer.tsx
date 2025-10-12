import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { postNewsletterSubscribe } from "../endpoints/newsletter/subscribe_POST.schema";
// Currency selector - commented out for now, uncomment when adding products
// import { CurrencySelector } from "./CurrencySelector";
import styles from "./Footer.module.css";

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

    // Show success immediately
    const submittedEmail = email;
    setStatus("success");
    setEmail("");

    // Call API in background
    postNewsletterSubscribe({ email: submittedEmail })
      .then(() => {
        console.log(
          `Newsletter subscription successful for: ${submittedEmail}`,
        );
      })
      .catch((error) => {
        console.error("Newsletter subscription error:", error);
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
    postNewsletterSubscribe({ email: submittedEmail })
      .then(() => {
        console.log(
          `Newsletter subscription successful for: ${submittedEmail}`,
        );
      })
      .catch((error) => {
        console.error("Newsletter subscription error:", error);
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
            >
              NEWSLETTER
            </button>
            {status === "success" ? (
              <div className={styles.thankYouMessage}>
                SORRY, NO DISCOUNTS THIS TIME
              </div>
            ) : (
              <form
                className={`${styles.signupForm} ${isFormVisible ? styles.visible : ""}`}
                onSubmit={handleSubmit}
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
            src="https://assets.floot.app/b8bbf1b5-c008-46f4-acc5-3490cd9ccc4b/6a451ccd-5997-4e88-b150-5e54a7bc0f44.png"
            alt="SOT Logo"
            className={styles.logo}
          />
          <span className={styles.copyright}>© 2025 SOT</span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Level 1: Newsletter Section */}
        <div className={styles.mobileNewsletterSection}>
          <div className={styles.mobileNewsletterHeading}>NEWSLETTER</div>
          {mobileStatus === "success" ? (
            <div className={styles.mobileThankYouMessage}>
              SORRY, NO DISCOUNTS THIS TIME
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
            src="https://assets.floot.app/b8bbf1b5-c008-46f4-acc5-3490cd9ccc4b/6a451ccd-5997-4e88-b150-5e54a7bc0f44.png"
            alt="SOT Logo"
            className={styles.logo}
          />
          <span>© 2025 SOT</span>
        </div>
      </div>
    </footer>
  );
};