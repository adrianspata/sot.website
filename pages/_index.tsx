import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { HorizontalImageGallery } from "../components/HorizontalImageGallery";
import styles from "./_index.module.css";

const homeImages = [
  {
    src: "public/images/louise x4.jpg",
    alt: "Louise x4",
  },
  {
    src: "public/images/sot_scan 2.jpg",
    alt: "SOT polaroid",
  },
  {
    src: "public/images/incensemayaimg2text.jpg",
    alt: "incense sticks",
  },
  {
    src: "public/images/louis 3 sticks b&w.jpg",
    alt: "Louise holding incense sticks",
  },
  {
    src: "public/images/sotStepsN.jpg",
    alt: "Legs for SOT",
  },
  {
    src: "public/images/800C3245-31CF-4991-8131-BD320E43DCBE.JPG",
    alt: "Max in elevator",
  },
  {
    src: "public/images/mayamastik4.3.jpg",
    alt: "Maya Mastik",
  },
  {
    src: "public/images/sot_scan3 croped.jpg",
    alt: "Polaroid of Max",
  },
  {
    src: "public/images/sotBagSteps2.jpg",
    alt: "Legs for SOT",
  },
];

const HomePage = () => {
  return (
    <>
      {/* <Helmet>
        <title>SOT | Home</title>
        <meta name="description" content="Minimalist brand homepage." />
      </Helmet> */}
      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <Link to="/projects" className={styles.heroLink}>
            <img
                            src="public/images/mayagodajf4.3.jpg"
              alt="SOT Stockholm - New website coming soon"
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