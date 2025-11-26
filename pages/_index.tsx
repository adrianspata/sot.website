import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { HorizontalImageGallery } from "../components/HorizontalImageGallery";
import styles from "./_index.module.css";

const ResponsiveHeroImage = ({ desktopSrc, mobileSrc, alt, linkTo }: { desktopSrc: string; mobileSrc?: string; alt: string; linkTo: string }) => {
  return (
    <>
      {mobileSrc && (
        <Link to={linkTo} className={styles.heroLink}>
          <img 
            src={mobileSrc} 
            alt={alt} 
            className={styles.heroImageMobile} 
          />
        </Link>
      )}
      <Link to={linkTo} className={styles.heroLink}>
        <img 
          src={desktopSrc} 
          alt={alt} 
          className={styles.heroImage} 
        />
      </Link>
    </>
  );
};

const HomePage = () => {
  const heroImages = [
    {
      desktopSrc: "/images/SOT_5.2.webp",
      mobileSrc: "/images/SOT_5.2.webp",
      alt: "Max elevator",
      linkTo: "/projects/sot-07"
    }
  ];

  const [heroIndex, setHeroIndex] = React.useState(0);

  React.useEffect(() => {
    // Byt till nästa bild vid varje reload
    const lastIndex = Number(localStorage.getItem('heroIndex')) || 0;
    const nextIndex = (lastIndex + 1) % heroImages.length;
    setHeroIndex(nextIndex);
    localStorage.setItem('heroIndex', String(nextIndex));
  }, []);

  const selectedHero = heroImages[heroIndex];

  return (
    <>
      {/* <Helmet>
        <title>SOT | Home</title>
        <meta name="description" content="SOT STOCKHOLM" />
      </Helmet> */}
      <div className={styles.pageContainer}>
        {/*<section className={styles.heroSection}>
        <Link to="/projects/sot-07" className={styles.heroLink} aria-label="Projects">
    <video
      className={styles.heroImage}
      src="/videos/TheHandOverOpening.mp4"
      poster="/images/SOT_5.webp"
      autoPlay
      muted
      loop
      playsInline
    />
  </Link>
</section>*/}

<section className={styles.heroSection}> 
  <ResponsiveHeroImage 
    desktopSrc={selectedHero.desktopSrc}
    mobileSrc={selectedHero.mobileSrc}
    alt={selectedHero.alt}
    linkTo={selectedHero.linkTo}
  />
</section>

        <section className={styles.gallerySection}>
          <HorizontalImageGallery images={homeImages} />
        </section>
      </div>
    </>
  );
};

const homeImages = [
  {
    src: "/images/sot_scan2.webp",
    alt: "SOT polaroid",
  },
  {
    src: "/images/sot_scan.webp",
    alt: "SOT polaroid",
  },
  {
    src: "/images/sot_scan1.webp",
    alt: "SOT polaroid",
  },
  {
    src: "/images/sot_scan3.webp",
    alt: "SOT polaroid",
  },
  {
    src: "/images/sot_scan4.webp",
    alt: "SOT polaroid",
  },
  {
    src: "/images/sot_scan5.webp",
    alt: "SOT polaroid",
  },
];

export default HomePage;