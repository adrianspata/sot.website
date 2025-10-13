import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import styles from "./projects.$projectId.module.css";

interface ProjectDetail {
  id: string;
  title: string;
  date: string;
  fullDescription: string;
  detailedInfo: {
    label: string;
    value: string;
  }[];
  images: {
    src: string;
    alt: string;
  }[];
}

// Hardcoded project data as requested
const projectsData: ProjectDetail[] = [
  {
    id: "sot-07",
    title: "THE HAND OVER",
    date: "31 / 05 / 2025",
    fullDescription:
      "A short visual brought to life with some help from good friends.",
    detailedInfo: [
      { label: "Photography", value: "Sylwia Dziobon" },
      { label: "Styling", value: "Maya Nilsen" },
      { label: "Cast", value: "Max Birch" },
      { label: "Sound & Music", value: "Arvid Jonsson" },
    ],
    images: [
      {
        src: "/images/SOT_ 5 mobile.jpg",
        alt: "01",
      },
      {
        src: "/images/sot_scan 1.jpg",
        alt: "02",
      },
      {
        src: "/images/SOT__1.jpg",
        alt: "03",
      },
      {
        src: "/images/SOT__4.jpg",
        alt: "04",
      },
    ],
  },
  {
    id: "sot-06",
    title: "SOT MAGAZINE",
    date: "17 / 08 / 2024",
    fullDescription:
      "This magazine is purely fictional made for entertainment purposes only. It is not an actual publication and won't be available for purchase - Yet...",
    detailedInfo: [
      { label: "Produced by", value: "SOT Stockholm" },
    ],
    images: [
      {
        src: "/images/sot mag cover opt4.jpg",
        alt: "01",
      },
      {
        src: "/images/SOT Mag Mock_01.jpg",
        alt: "02",
      },
      {
        src: "/images/SOT mag plastic cover mock .jpg",
        alt: "03",
      },
      {
        src: "/images/SOT Mag cover plastic 6 svart.jpg",
        alt: "04",
      },
      {
        src: "/images/sot mag page 15-16.jpg",
        alt: "05",
      },
      {
        src: "/images/sot mag page 25-26.jpg",
        alt: "06",
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
        src: "/images/louis 3 sticks b&w.jpg",
        alt: "01",
      },
      {
        src: "/images/louise x4.jpg",
        alt: "02",
      },
      {
        src: "/images/P1140042.JPG",
        alt: "03",
      },
      {
        src: "/images/P1140046.JPG",
        alt: "04",
      },
      {
        src: "/images/P1140049.JPG",
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
        src: "/images/godajfappelbildsmalllogo.jpg",
        alt: "01",
      },
      {
        src: "/images/agrumeappelbildsmalllogo.jpg",
        alt: "02",
      },
      {
        src: "/images/mastikappelbild.jpg",
        alt: "03",
      },
    ],
  },
  {
    id: "sot-03",
    title: "Your order has been shipped",
    date: "15 / 07 / 2024",
    fullDescription:
      "Your order has been shipped. A campaign for summer 2024, showcasing our packaging in various settings around Stockholm.",
    detailedInfo: [],
    images: [
      {
        src: "/images/sotBagSteps2.jpg",
        alt: "01",
      },
      {
        src: "/images/sotStepsN.jpg",
        alt: "02",
      },
      {
        src: "/images/IMG_0442.jpg",
        alt: "03",
      },
      {
        src: "/images/IMG_0492.jpg",
        alt: "04",
      },
      {
        src: "/images/IMG_0533.jpg",
        alt: "05",
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
        src: "/images/people17.jpg",
        alt: "01",
      },
      {
        src: "/images/people25.jpg",
        alt: "02",
      },
      {
        src: "/images/people27.jpg",
        alt: "03",
      },
      {
        src: "/images/products9.jpg",
        alt: "04",
      },
      {
        src: "/images/people.jpg",
        alt: "05",
      },
      {
        src: "/images/people9.jpg",
        alt: "06",
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
        src: "/images/mayagodajf4.3.jpg",
        alt: "01",
      },
      {
        src: "/images/mayaagrume4.3.jpg",
        alt: "02",
      },
      {
        src: "/images/mayamastik4.3.jpg",
        alt: "03",
      },
      {
        src: "/images/incensemayaimg1text.jpg",
        alt: "04",
      },
      {
        src: "/images/incensemayaimg2text.jpg",
        alt: "05",
      },
      {
        src: "/images/SOTMaya-MASTIKside.jpg",
        alt: "06",
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
        <Helmet>
          <title>SOT | Project Not Found</title>
        </Helmet>
        <h1 className={styles.notFoundTitle}>404 PAGE NOT FOUND</h1>
        <Link to="/projects" className={styles.backLink}>
          BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SOT | {project.title}</title>
        <meta name="description" content={project.fullDescription} />
      </Helmet>
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
