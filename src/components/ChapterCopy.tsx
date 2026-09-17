import { planZones } from "@/data/suite";
import type { Chapter, Destination, PlanZone } from "@/types/suite";

interface ChapterCopyProps {
  chapter: Chapter;
  activeZone: PlanZone;
  onZoneSelect: (zone: PlanZone) => void;
  onNext: (destination: Destination) => void;
}

export default function ChapterCopy({ chapter, activeZone, onZoneSelect, onNext }: ChapterCopyProps) {
  return (
    <div className="copy">
      <p className="eyebrow">{chapter.eye}</p>
      <h2>
        {chapter.title.lead}
        <em>{chapter.title.accent}</em>
      </h2>
      <p>{chapter.body}</p>
      <span className="sample-chip">{chapter.sample ?? ""}</span>

      <div className="plan-buttons" hidden={!chapter.plans}>
        {planZones.map((zone) => (
          <button
            key={zone}
            type="button"
            className={zone === activeZone ? "active" : undefined}
            onClick={() => onZoneSelect(zone)}
          >
            {zone}
          </button>
        ))}
      </div>

      <button className="cta" type="button" onClick={() => onNext(chapter.nextTab)}>
        {chapter.next} <b>→</b>
      </button>
    </div>
  );
}
