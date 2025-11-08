import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import styles from "./projects.$projectId.module.css";

interface ProjectDetail {
  id: string;
  title: string;
  date: string;
  fullDescription: string;
  detailedInfo: { label: string; value: string }[];
  images: { src: string; alt: string }[];
  videos?: Array<{
    mp4?: string; 
    vimeoId?: string;
    poster?: string;
    alt?: string;    
    autoplay?: boolean; 
    loop?: boolean;    
    muted?: boolean;     
    controls?: boolean;  
    thumbnail?: boolean;
  }>;
}

const projectsData: ProjectDetail[] = [
  {
    id: "sot-07",
    title: "THE HAND OVER",
    date: "31 / 05 / 2025",
    fullDescription:
      "A short visual brought to life with some help from good friends.",
    detailedInfo: [
      { label: "Talent", value: "Max Birch" },
      { label: "Photography", value: "Sylwia Dziobon" },
      { label: "Styling", value: "Maya Nilsen" },
      { label: "Sound & Music", value: "Arvid Jonsson" },
      { label: "BTS", value: "Yusuf Tolosa" },
    ],
    videos: [
      {
        vimeoId: "1134630095",
        // mp4: "/videos/TheHandOverFull.MP4",  //
        poster: "/images/THO-thumbnail.webp",
        alt: "SOT - The Hand Over",
        autoplay: false,
        loop: true,
        muted: true,
        controls: true,
        thumbnail: true,
      },
    ],
    images: [
      {
        src: "/images/SOT_5mobile.webp",
        alt: "01",
      },
      {
        src: "/images/sot_scan1.webp",
        alt: "02",
      },
      {
        src: "/images/SOT__1.webp",
        alt: "03",
      },
      {
        src: "/images/SOT__4.webp",
        alt: "04",
      },
    ],
  },
  {
    id: "sot-05",
    title: "Louis Wood for SOT",
    date: "07 / 08 / 2024",
    fullDescription:
      "Louis Wood for SOT.",
    detailedInfo: [
      { label: "Location", value: "Stockholm" },
      { label: "Talent", value: "Louis Wood" },
    ],
    images: [
      {
        src: "/images/louis3sticksb&w.webp",
        alt: "01",
      },
      {
        src: "/images/louisexx4.webp",
        alt: "02",
      },
      {
        src: "/images/P1140042.webp",
        alt: "03",
      },
      {
        src: "/images/P1140046.webp",
        alt: "04",
      },
      {
        src: "/images/P1140049.webp",
        alt: "05",
      },
    ],
  },
  {
    id: "sot-04",
    title: "Incense Collection 2024",
    date: "24 / 07 / 2024",
    fullDescription:
      "First incense stick collection for 2024.",
    detailedInfo: [
      { label: "Photography", value: "Sylwia Dziobon" },
      { label: "Set design", value: "Sylwia Dziobon" },
      { label: "Design", value: "SOT" },
    ],
    images: [
      {
        src: "/images/godajfappelbildsmalllogo.webp",
        alt: "01",
      },
      {
        src: "/images/agrumeappelbildsmalllogo.webp",
        alt: "02",
      },
      {
        src: "/images/mastikappelbild.webp",
        alt: "03",
      },
    ],
  },
  {
    id: "sot-03",
    title: "Your order has been shipped",
    date: "15 / 07 / 2024",
    fullDescription:
      "Your order has been shipped. A campaign for summer 2024, showcasing our product being delivered around Stockholm.",
    detailedInfo: [],
    videos: [
      {
        vimeoId: "1134630052",
        // mp4: "/videos/Shipping.mp4", //
        poster: "/images/shipping-thumbnail.webp",
        alt: "Your order has been shipped",
        autoplay: false,
        loop: true,
        muted: true,
        controls: true,
        thumbnail: true,
      },
    ],
    images: [
      {
        src: "/images/sotBagSteps2.webp",
        alt: "01",
      },
      {
        src: "/images/sotStepsN.webp",
        alt: "02",
      },
      {
        src: "/images/IMG_0442.webp",
        alt: "03",
      },
      {
        src: "/images/IMG_0492.webp",
        alt: "04",
      },
      {
        src: "/images/IMG_0533.webp",
        alt: "05",
      },
    ],
  },
  {
    id: "sot-020",
    title: "What Is The World To You?",
    date: "12 / 06 / 2024",
    fullDescription:
      "A short evocative visual depicting the sensorial connection between scent and the human experience. Demonstrating the universal language of sensory expressions.",
    detailedInfo: [
      { label: "Writer, Director, Producer", value: "Aida Adem" },
      { label: "DOP, Grade", value: "Adam Hermansson" },
      { label: "Lights", value: "Louise Helmfrid" },
      { label: "Edit", value: "Jade Brandt" },
      { label: "Sound", value: "Lawrence Agbolah" },
      { label: "Styling", value: "Maya Nilsen" },
      { label: "Talents", value: "Maya Nilsen, Harrison First, Bondi Sowe, Marlon Spata, Robert Perez" },
    ],
    videos: [
      {
        vimeoId: "1134630190",
        // mp4: "/videos/whatIsTheWorld.mp4", //
        poster: "/images/witwty-thumbnail.webp",
        alt: "What Is The World To You?",
        autoplay: false,
        loop: true,
        muted: true,
        controls: true,
        thumbnail: true,
      },
    ],
    images: [
      {
        src: "/images/P11205732.webp",
        alt: "02",
      },
    ],
  },
  {
    id: "sot-02",
    title: "SOT Launch Event",
    date: "30 / 05 / 2024",
    fullDescription:
      "Launch event for SOT incense collection.",
    detailedInfo: [],
    images: [
      {
        src: "/images/people17.webp",
        alt: "01",
      },
      {
        src: "/images/people25.webp",
        alt: "02",
      },
      {
        src: "/images/people27.webp",
        alt: "03",
      },
      {
        src: "/images/products9.webp",
        alt: "04",
      },
      {
        src: "/images/people3.webp",
        alt: "05",
      },
      {
        src: "/images/people.webp",
        alt: "06",
      },
      {
        src: "/images/people23.webp",
        alt: "07",
      },
      {
        src: "/images/people9.webp",
        alt: "08",
      },
    ],
  },
  {
    id: "sot-01",
    title: "Maya Nilsen",
    date: "30 / 04 / 2024",
    fullDescription:
      "Maya Nilsen for SOT 2024. Premium incense sticks collection.",
    detailedInfo: [
      { label: "Photography", value: "Aida Adem" },
      { label: "Styling", value: "Maya Nilsen" },
      { label: "Edit", value: "Paul Edwards" },
    ],
    images: [
      {
        src: "/images/mayagodajf4.3.webp",
        alt: "01",
      },
      {
        src: "/images/mayaagrume4.3.webp",
        alt: "02",
      },
      {
        src: "/images/mayamastik4.3.webp",
        alt: "03",
      },
      {
        src: "/images/goodincense4mastik.webp",
        alt: "04",
      },
      {
        src: "/images/incensemayaimg1text.webp",
        alt: "05",
      },
      {
        src: "/images/incensemayaimg2text.webp",
        alt: "06",
      },
      {
        src: "/images/SOTMaya-MASTIKside.webp",
        alt: "07",
      },
    ],
  },
];

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsData.find((p) => p.id === projectId);

  // Calculate navigation IDs
  const { currentIndex, previousProjectId, nextProjectId } = useMemo(() => {
    if (!project)
      return { currentIndex: -1, previousProjectId: null, nextProjectId: null };

    const currentIndex = projectsData.findIndex((p) => p.id === projectId);
    const previousIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    return {
      currentIndex,
      previousProjectId:
        previousIndex >= 0 ? projectsData[previousIndex].id : null,
      nextProjectId:
        nextIndex < projectsData.length ? projectsData[nextIndex].id : null,
    };
  }, [project, projectId]);

  if (!project) {
    return (
      <div className={styles.notFoundContainer}>
        {/*<Helmet>
          <title>SOT | Project Not Found</title>
        </Helmet>*/}
        <h1 className={styles.notFoundTitle}>404 PAGE NOT FOUND</h1>
        <Link to="/projects" className={styles.backLink}>
          BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  return (
    <>
      {/*<Helmet>
        <title>SOT | {project.title}</title>
        <meta name="description" content={project.fullDescription} />
      </Helmet>*/}
      <div className={styles.pageContainer}>
        {/* Navigation */}
        <nav className={styles.navigation}>
          {currentIndex === 0 ? (
            <Link to="/projects" className={styles.navLink}>
              &lt; see all
            </Link>
          ) : (
            previousProjectId && (
              <Link
                to={`/projects/${previousProjectId}`}
                className={styles.navLink}
              >
                &lt; previous
              </Link>
            )
          )}
          {nextProjectId && (
            <Link to={`/projects/${nextProjectId}`} className={styles.navLink}>
              next &gt;
            </Link>
          )}
        </nav>

        <article className={styles.contentWrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.date}>{project.date}</p>
          </header>

          <section className={styles.descriptionSection}>
            <p className={styles.description}>{project.fullDescription}</p>
            <div className={styles.detailedInfo}>
              {project.detailedInfo.map((info, index) => (
                <div key={index} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{info.label}:</span>
                  <span className={styles.infoValue}>{info.value}</span>
                </div>
              ))}
            </div>
          </section>

        {project.videos?.length ? (
          <section className={styles.mediaGrid}>
            {project.videos.map((v, idx) => (
              <figure key={`vid-${idx}`} className={styles.mediaItem}>
                {v.vimeoId ? (
                  <iframe
                    className={styles.media}
                    src={`https://player.vimeo.com/video/${v.vimeoId}?autoplay=${v.autoplay ? 1 : 0}&loop=${v.loop ? 1 : 0}&muted=${v.muted ? 1 : 0}&controls=${v.controls ? 1 : 0}${!v.controls && !v.thumbnail ? '&background=1' : ''}&title=0&byline=0&portrait=0&badge=0&dnt=1&transparent=0&keyboard=0&pip=0${v.thumbnail ? '&autopause=0' : ''}`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={v.alt || "Vimeo video"}
                  ></iframe>
                ) : v.mp4 ? (
                  <video
                    className={styles.media}
                    autoPlay={v.autoplay ?? true}
                    muted={v.muted ?? true}
                    loop={v.loop ?? true}
                    playsInline
                    controls={v.controls ?? false}
                    poster={v.poster}
                  >
                    <source src={v.mp4} type="video/mp4" />
                  </video>
                ) : null}
              </figure>
            ))}
          </section>
        ) : null}

          <section className={styles.gallery}>
            {project.images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={styles.image}
              />
            ))}
          </section>
        </article>
      </div>
    </>
  );
};

export default ProjectDetailPage;
