import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { HorizontalImageGallery } from "../components/HorizontalImageGallery";
import styles from "../styles/pages/_index.module.css";

type HeroOption = {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  alt: string;
  linkTo: string;
};

type DeviceType = 'desktop' | 'mobile';

const Hero = ({ hero, device }: { hero: HeroOption; device: DeviceType }) => {
  const className = hero.type === 'video' 
    ? (device === 'mobile' ? styles.heroVideoMobile : styles.heroVideoDesktop)
    : (device === 'mobile' ? styles.heroImageMobile : styles.heroImageDesktop);

  return (
    <Link to={hero.linkTo} className={styles.heroLink}>
      {hero.type === 'video' ? (
        <video
          className={className}
          src={hero.src}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={hero.alt}
        />
      ) : (
        <img src={hero.src} alt={hero.alt} className={className} />
      )}
    </Link>
  );
};


const HomePage = () => {
  // Configure hero options for each device
  const heroItems: Record<DeviceType, HeroOption[]> = {
    desktop: [
      {
        type: 'video',
        src: '/videos/mixedHeroWhiteee.mp4',
        poster: '/images/louiseBW6.webp',
        alt: 'Desktop video hero',
        linkTo: '/projects',
      },
      {
        type: 'image',
        src: '/images/louiseBW6.webp',
        alt: 'Desktop image hero',
        linkTo: '/projects',
      }
    ],
    mobile: [
      // {
      //   type: 'video',
      //   src: '/videos/mixedHeroWhiteee.mp4',
      //   poster: '/images/mobileHeroPoster.webp',
      //   alt: 'Mobile video hero',
      //   linkTo: '/projects',
      // },
      {
        type: 'image',
        src: '/images/louiseBW6.webp',
        alt: 'Mobile image hero',
        linkTo: '/projects',
      }
    ]
  };

  const getDeviceType = (): DeviceType => {
    return window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop';
  };

  const [deviceType, setDeviceType] = React.useState<DeviceType>(getDeviceType());
  const [heroIndex, setHeroIndex] = React.useState(0);

  // Handle device resize
  React.useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotate hero on page reload for current device
  React.useEffect(() => {
    const storageKey = `heroIndex_${deviceType}`;
    const lastIndex = Number(localStorage.getItem(storageKey)) || 0;
    const nextIndex = (lastIndex + 1) % heroItems[deviceType].length;
    setHeroIndex(nextIndex);
    localStorage.setItem(storageKey, String(nextIndex));
  }, [deviceType]);

  const selectedHero = heroItems[deviceType][heroIndex];

  return (
    <>
      {/* <Helmet>
        <title>SOT | Home</title>
        <meta name="description" content="SOT STOCKHOLM" />
      </Helmet> */}
      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <Hero hero={selectedHero} device={deviceType} />
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