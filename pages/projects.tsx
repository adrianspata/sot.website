import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router-dom";
import styles from "./projects.module.css";

const projects = [
  {
    id: "sot-07",
    src: "/images/SOT__5(kopia).webp",
    alt: "sot-07",
    title: "THE HAND OVER",
    description:
      "A short visual brought to life with some help from good friends.",
    date: "31/05/2025",
  },
  {
    id: "sot-05",
    src: "/images/louisex4(kopia).webp",
    alt: "sot-05",
    title: "Louis Wood",
    description: "Louis Wood for SOT.",
    date: "07/08/2024",
  },
  {
    id: "sot-04",
    src: "/images/godajfappelbildsmalllogo(kopia).webp",
    alt: "sot-04",
    title: "Incense Collection 2024",
    description: "First incense stick collection for 2024.",
    date: "24/07/2024",
  },
  {
    id: "sot-03",
    src: "/images/IMG_0533.webp",
    alt: "sot-03",
    title: "Your order has been shipped",
    description: "Your order has been shipped. A campaign for summer 2024, showcasing our packaging in various settings around Stockholm.",
    date: "15/07/2024",
  },
  {
    id: "sot-020",
    src: "/images/P11205732.webp",
    alt: "sot-03",
    title: "What Is The World To You?",
    description: "A short evocative visual.",
    date: "12/06/2024",
  },
  {
    id: "sot-02",
    src: "/images/people5bw.webp",
    alt: "sot-02",
    title: "Launch Event",
    description: "Launch event for SOT incense collection.",
    date: "30/05/2024",
  },
  {
    id: "sot-01",
    src: "/images/mayagodajf4.3.webp",
    alt: "sot-01",
    title: "Maya Nilsen",
    description: "Maya Nilsen for SOT 2024. Premium incense sticks collection.",
    date: "30/04/2024",
  },
];

const ProjectsPage = () => {
  return (
    <>
      {/*<Helmet>
        <title>SOT | Projects</title>
        <meta name="description" content="A collection of our projects." />
      </Helmet> */}
      <div className={styles.pageContainer}>
        <div className={styles.gridContainer}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={styles.projectItem}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={project.src}
                  alt={project.alt}
                  className={styles.image}
                />
              </div>
              <div className={styles.textContainer}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <span className={styles.date}>{project.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
