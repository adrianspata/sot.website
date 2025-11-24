import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import styles from "./shop.module.css";

const ShopPage = () => {
  const handleNewsletterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Scroll to footer
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      
      // Wait a bit for scroll to complete, then check if newsletter form is visible
      setTimeout(() => {
        // Check if newsletter form is already visible by looking for the 'visible' class
        const newsletterForm = document.querySelector('[data-newsletter-form]');
        const isFormVisible = newsletterForm && newsletterForm.classList.contains('visible');
        
        // Only trigger newsletter button if form is not visible
        if (!isFormVisible) {
          const newsletterButton = document.querySelector('[data-newsletter-button]') as HTMLButtonElement;
          if (newsletterButton) {
            newsletterButton.click();
          }
        }
      }, 500);
    }
  };

  return (
    <>
      {/*<Helmet>
        <title>SOT | Shop</title>
        <meta name="description" content="SOT Shop - Coming Soon" />
      </Helmet>*/}
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftSection}>
            <img
              src="/images/sot_scan4.webp"
              alt="SOT Shop"
              className={styles.shopImage}
            />
          </div>
           <div className={styles.rightSection}>
            {/*<div className={styles.logo}>
              <Link to="/">
            <img 
              src="/images/sotLogoSingle.png" 
              alt="SOT Logo"
              className={styles.logoImg}
            />
          </Link>
            </div> */}
            <div className={styles.messageContainer}>
              <p className={styles.message}>
                THANK YOU FOR VISITING
                <br />
                <br />
                OUR STORE IS CURRENTLY CLOSED AND WILL BE OPEN SOON WITH NEW ITEMS
                <br />
                <br />
                JOIN OUR <a className={styles.newsletterLink} href="#newsletter" onClick={handleNewsletterClick}>NEWSLETTER</a> FOR FIRST-HAND ACCESS TO NEW RELEASES AND UPDATES
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;