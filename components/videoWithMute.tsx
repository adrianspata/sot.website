import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoWithMute.module.css";

type VideoSource = {
  mp4: string;
  webm?: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  alt?: string;
};

export function VideoWithMute({
  src,
  className,
}: { src: VideoSource; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(src.muted ?? true);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  const toggleMute = async () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    setIsMuted(next);
    v.muted = next;
    if (!next) { try { await v.play(); } catch {} }
  };

  return (
    <div className={styles.videoWrap}>
      <video
        ref={videoRef}
        className={className}
        autoPlay={src.autoplay ?? true}
        loop={src.loop ?? true}
        playsInline
        controls={src.controls ?? false}
        poster={src.poster}
        muted={isMuted}
        aria-label={src.alt}
      >
        {src.webm && <source src={src.webm} type="video/webm" />}
        <source src={src.mp4} type="video/mp4" />
      </video>

      <button
        type="button"
        className={styles.muteBtn}
        onClick={toggleMute}
        aria-pressed={!isMuted}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {/* FA Pro "Light" – byt till fa-solid om din kit-plan kräver det */}
        <i
          className={isMuted ? "fa-solid fa-volume-off" : "fa-solid fa-volume-high"}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
