import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pages/notFound.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.pageContainer}>
      <img 
        src="/images/sot_scan3 wide.webp" 
        alt="SOT Background"
        className={styles.backgroundImage}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>THIS PAGE COULD NOT BE FOUND</h1>
        <Link to="/" className={styles.homeLink}>
          back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;