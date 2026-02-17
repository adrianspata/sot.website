import { useRef, useEffect } from "react";
import styles from "../styles/components/HorizontalProjectGallery.module.css";

interface Project {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface HorizontalProjectGalleryProps {
  projects: Project[];
}

export const HorizontalProjectGallery = ({
  projects,
}: HorizontalProjectGalleryProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll gestures (shift+scroll or trackpad swipe)
      if (e.deltaX !== 0) {
        scrollContainer.scrollLeft += e.deltaX;
        e.preventDefault(); // Prevent browser back/forward navigation
      }
      // If deltaY !== 0 (vertical scroll), do nothing - let it pass through to scroll the page
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <div className={styles.gallery}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectItem}>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};