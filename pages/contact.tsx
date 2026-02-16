import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import styles from "../styles/pages/contact.module.css";

const ContactPage = () => {
  return (
    <>
      {/*<Helmet>
        <title>SOT | Contact</title>
        <meta name="description" content="Contact information for SOT." />
      </Helmet>*/}
      <div className={styles.pageContainer}>
        <div className={styles.leftPanel}>
          <h1 className={styles.heading}>Contact</h1>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.section}>
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Email</h3>

              <a
                href="mailto:contact@sotstockholm.se"
                className={styles.contactLink}
              >
                contact@sotstockholm.se
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Social</h3>

              <a
                href="https://www.instagram.com/sotstockholm"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                @sotstockholm
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
