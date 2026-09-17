import { locationMap } from "@/data/suite";

export interface HeroFrame {
  src: string;
  position: string;
  opacity: 0 | 1;
}

interface StageBackdropProps {
  hero: HeroFrame;
  showMap: boolean;
}

export default function StageBackdrop({ hero, showMap }: StageBackdropProps) {
  return (
    <>
      <img
        className={`stage-img${showMap ? "" : " show"}`}
        src={hero.src}
        width={1536}
        height={864}
        alt="Supplied Beach Queen project visual"
        style={{ opacity: hero.opacity, objectPosition: hero.position }}
      />
      <img
        className={`map-img${showMap ? " show" : ""}`}
        src={locationMap}
        width={1600}
        height={900}
        alt="Supplied Beach Queen Versova location map"
      />
      <div className="wash" />
      <div className={`map-wash${showMap ? " show" : ""}`} />
      <div className="tide" />
    </>
  );
}
