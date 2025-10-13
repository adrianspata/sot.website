import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router-dom";
import styles from "./projects.module.css";

const projects = [
  {
    id: "sot-07",
    src: "public/images/SOT__5 (kopia).jpg",
    alt: "sot-07",
    title: "THE HAND OVER",
    description:
      "A short visual brought to life with some help from good friends.",
    date: "31/05/2025",
  },
  {
    id: "sot-06",
    src: "public/images/SOT Mag cover plastic10.jpg",
    alt: "sot-06",
    title: "SOT MAGAZINE",
    description: "ISSUE O1 - SUMMER 24'",
    date: "17/08/2024",
  },
  {
    id: "sot-05",
    src: "/images/louise x4 (kopia).jpg",
    alt: "sot-05",
    title: "Louis Wood",
    description: "Louis Wood for SOT.",
    date: "07/08/2024",
  },
  {
    id: "sot-04",
    src: "public/images/godajf äppel bild small logo (kopia).jpg",
    alt: "sot-04",
    title: "Incense Collection 2024",
    description: "First incense stick collection for 2024",
    date: "24/07/2024",
  },
  {
    id: "sot-03",
    src: "public/images/IMG_0442.jpg",
    alt: "sot-03",
    title: "Your order has been shipped",
    description: "Your order has been shipped. A campaign for summer 2024, showcasing our packaging in various settings around Stockholm",
    date: "15/07/2024",
  },
  {
    id: "sot-02",
    src: "public/images/launche-invite30th.jpg",
    alt: "sot-02",
    title: "SOT Launch Event",
    description: "Launch event for SOT incense collection",
    date: "30/05/2024",
  },
  {
    id: "sot-01",
    src: "public/images/mayagodajf4.3.jpg",
    alt: "sot-01",
    title: "Maya Nilsen for SOT",
    description: "Maya Nilsen for SOT 2024. Premium incense sticks collection",
    date: "30/04/2024",
  },
];

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>SOT | Projects</title>
        <meta name="description" content="A collection of our projects." />
      </Helmet>
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
