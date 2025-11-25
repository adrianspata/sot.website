import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import styles from "./about.module.css";

const AboutPage = () => {
  return (
    <>
      {/*<Helmet>
        <title>SOT | About</title>
        <meta name="description" content="About SOT." />
      </Helmet>*/}
      <div className={styles.pageContainer}>
        <div className={styles.leftPanel}>
          <h1 className={styles.heading}>About</h1>
        </div>
        <div className={styles.rightPanel}>
          <p className={styles.text}>
            SOT at its core is a lifestyle label rooted in research and defined by shifting ideas. We explore the intersection of contemporary design, functional aesthetics, and thoughtful materiality.
          </p>
          <p className={styles.text}>
            Each collection reflects a commitment to authenticity and restraint. We believe in creating pieces that transcend trends, focusing instead on timeless quality and purposeful design that resonates with the modern individual.
          </p>
          <p className={styles.text}>
            Our approach is grounded in collaboration and curiosity. We work with select artisans and manufacturers who share our values, ensuring that every product meets our standards for craftsmanship and sustainability. Founded in 2023.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;