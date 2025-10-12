import React, { useRef, useEffect } from "react";
import styles from "./HorizontalImageGallery.module.css";

interface Image {
  src: string;
  alt: string;
}

interface HorizontalImageGalleryProps {
  images: Image[];
}

export const HorizontalImageGallery = ({
  images,
}: HorizontalImageGalleryProps) => {
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
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img src={image.src} alt={image.alt} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};