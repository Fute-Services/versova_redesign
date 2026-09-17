"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChapterCopy from "@/components/ChapterCopy";
import DetailCard from "@/components/DetailCard";
import EntryScreen from "@/components/EntryScreen";
import Hotspots from "@/components/Hotspots";
import PlanOverlay from "@/components/PlanOverlay";
import PreviewDrawer from "@/components/PreviewDrawer";
import ProjectAtlas from "@/components/ProjectAtlas";
import StageBackdrop, { type HeroFrame } from "@/components/StageBackdrop";
import TopBar from "@/components/TopBar";
import { chapters, heroPosition, images, seaAudio } from "@/data/suite";
import { useSeaSound } from "@/hooks/useSeaSound";
import type { Destination, PlanZone, TabId } from "@/types/suite";

/** Delay before swapping the hero image, so it fades out first. */
const HERO_SWAP_MS = 100;

export default function SalesSuite() {
  const [current, setCurrent] = useState<TabId>("project");
  const [entered, setEntered] = useState(false);
  const [atlasOpen, setAtlasOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeZone, setActiveZone] = useState<PlanZone>("Living");
  const [detailLabel, setDetailLabel] = useState(chapters.project.detail);
  const [hero, setHero] = useState<HeroFrame>({
    src: images.hero,
    position: heroPosition("project"),
    opacity: 1,
  });

  const swapTimer = useRef<number | undefined>(undefined);
  const { audioRef, enabled: soundOn, setSound, tick } = useSeaSound();

  useEffect(() => () => window.clearTimeout(swapTimer.current), []);

  const navigate = useCallback(
    (destination: Destination) => {
      setAtlasOpen(false);

      if (destination === "book") {
        setDrawerOpen(true);
        return;
      }

      const chapter = chapters[destination];
      setCurrent(destination);
      setDetailLabel(chapter.detail);
      if (destination !== "project") setEntered(true);

      if (!chapter.map && chapter.image) {
        const src = images[chapter.image];
        setHero((frame) => ({ ...frame, opacity: 0 }));
        window.clearTimeout(swapTimer.current);
        swapTimer.current = window.setTimeout(() => {
          setHero({ src, position: heroPosition(destination), opacity: 1 });
        }, HERO_SWAP_MS);
      }

      tick();
    },
    [tick],
  );

  const handleEnter = () => {
    setEntered(true);
    setSound(true);
    tick();
  };

  const handleZoneSelect = (zone: PlanZone) => {
    setActiveZone(zone);
    setDetailLabel(`Sample plan / ${zone}`);
    tick();
  };

  const chapter = chapters[current];
  const isTour = current === "tour";

  return (
    <main
      className={`gallery${atlasOpen ? " atlas-active" : ""}`}
      aria-label="Beach Queen Versova 360 sales suite prototype"
    >
      <EntryScreen hidden={entered} onEnter={handleEnter} />

      <div className="shell">
        <ProjectAtlas
          open={atlasOpen}
          current={current}
          onOpen={() => setAtlasOpen(true)}
          onClose={() => setAtlasOpen(false)}
          onSelect={navigate}
        />

        <section className="stage">
          <StageBackdrop hero={hero} showMap={!!chapter.map} />

          <TopBar
            chapter={chapter.chapter}
            soundOn={soundOn}
            onToggleSound={() => setSound(!soundOn)}
            onBook={() => navigate("book")}
          />

          <ChapterCopy
            chapter={chapter}
            activeZone={activeZone}
            onZoneSelect={handleZoneSelect}
            onNext={navigate}
          />

          <Hotspots visible={isTour} onJump={navigate} />

          <DetailCard visible={!isTour} label={detailLabel} facts={chapter.facts} note={chapter.note} />

          <PlanOverlay visible={!!chapter.plans} activeZone={activeZone} onZoneSelect={handleZoneSelect} />

          <PreviewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmitted={tick} />
        </section>
      </div>

      <audio ref={audioRef} loop preload="metadata" src={seaAudio} />
    </main>
  );
}
