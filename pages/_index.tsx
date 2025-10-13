import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { HorizontalImageGallery } from "../components/HorizontalImageGallery";
import styles from "./_index.module.css";

const homeImages = [
  {
    src: "/images/louise x4.jpg",
    alt: "Louise x4",
  },
  {
    src: "/images/sot_scan 2.jpg",
    alt: "SOT polaroid",
  },
  {
    src: "/images/incensemayaimg2text.jpg",
    alt: "incense sticks",
  },
  {
    src: "/images/louis 3 sticks b&w.jpg",
    alt: "Louise holding incense sticks",
  },
  {
    src: "/images/sotStepsN.jpg",
    alt: "Legs for SOT",
  },
  {
    src: "/images/800C3245-31CF-4991-8131-BD320E43DCBE.JPG",
    alt: "Max in elevator",
  },
  {
    src: "/images/mayamastik4.3.jpg",
    alt: "Maya Mastik",
  },
  {
    src: "/images/sot_scan3 croped.jpg",
    alt: "Polaroid of Max",
  },
  {
    src: "/images/sotBagSteps2.jpg",
    alt: "Legs for SOT",
  },
];

const HomePage = () => {
  return (
    <>
      {/* <Helmet>
        <title>SOT | Home</title>
        <meta name="description" content="SOT STOCKHOLM" />
      </Helmet> */}
      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <Link to="/projects" className={styles.heroLink}>
            <img
                            src="/images/mayagodajf4.3.jpg"
              alt="Maya Nilsen for SOT"
              className={styles.heroImage}
            />
          </Link>
        </section>

        <section className={styles.gallerySection}>
          <HorizontalImageGallery images={homeImages} />
        </section>
      </div>
    </>
  );
};

export default HomePage;