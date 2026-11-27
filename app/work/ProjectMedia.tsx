import Image from "next/image";
import type { CSSProperties } from "react";
import AutoVideo from "./AutoVideo";
import styles from "./project.module.css";

// Shared media pieces for the project pages under /work.

export type Shot = { src: string; width: number; height: number; alt: string; video?: boolean; caption?: string };

// One image (or silent looping video) shown whole at its own proportions, scaled to its column.
export function Whole({ src, width, height, alt, sizes, video, quality }: Omit<Shot, "caption"> & { sizes: string; quality?: number }) {
  if (video) return <AutoVideo src={src} width={width} height={height} label={alt} />;
  return <Image src={src} width={width} height={height} alt={alt} sizes={sizes} quality={quality} className={styles.whole} />;
}

// A row of whole images/videos that all share one height: each item's flex-grow is its
// width/height ratio, so every item in the row comes out exactly the same height, gaps included.
// An optional caption sits under each item.
export function Row({ shots, sizes, className, quality }: { shots: Shot[]; sizes: string; className?: string; quality?: number }) {
  return (
    <div className={`${styles.row} ${className ?? ""}`} data-reveal="" suppressHydrationWarning>
      {shots.map((shot) => (
        <figure key={shot.src} className={styles.rowItem} style={{ "--ratio": shot.width / shot.height } as CSSProperties}>
          <Whole src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} video={shot.video} sizes={sizes} quality={quality} />
          {shot.caption && <figcaption className={styles.caption}>{shot.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
