import type { PlanZone } from "@/types/suite";

const zones: { zone: PlanZone; d: string; fill: string }[] = [
  { zone: "Living", d: "M63 61H270V215H63Z", fill: "rgba(203,162,101,.28)" },
  { zone: "Suite", d: "M285 61H368V215H285Z", fill: "rgba(240,236,229,.1)" },
  { zone: "Terrace", d: "M63 230H438V329H63Z", fill: "rgba(240,236,229,.1)" },
];

interface PlanOverlayProps {
  visible: boolean;
  activeZone: PlanZone;
  onZoneSelect: (zone: PlanZone) => void;
}

export default function PlanOverlay({ visible, activeZone, onZoneSelect }: PlanOverlayProps) {
  return (
    <div className={`plan-overlay${visible ? " show" : ""}`} aria-label="Sample residence plan illustration">
      <svg viewBox="0 0 500 400" role="img" aria-label="Sample conceptual floor plan">
        <path d="M38 36H386L463 117V355H38Z" fill="rgba(6,25,35,.84)" stroke="#f0ece5" strokeWidth="2" />
        {zones.map(({ zone, d, fill }) => (
          <path
            key={zone}
            className={`plan-zone${zone === activeZone ? " active" : ""}`}
            d={d}
            fill={fill}
            stroke="#cba265"
            strokeWidth="1.5"
            onClick={() => onZoneSelect(zone)}
          />
        ))}
        <text x="95" y="142" fill="#f0ece5" fontFamily="Arial" fontSize="16" letterSpacing="2">
          LIVING
        </text>
        <text x="296" y="142" fill="#f0ece5" fontFamily="Arial" fontSize="14" letterSpacing="2">
          SUITE
        </text>
        <text x="192" y="285" fill="#f0ece5" fontFamily="Arial" fontSize="15" letterSpacing="2">
          TERRACE
        </text>
        <text x="63" y="382" fill="#cba265" fontFamily="Arial" fontSize="11" letterSpacing="2">
          SAMPLE PLAN LAYER · FOR DESIGN APPROVAL
        </text>
      </svg>
    </div>
  );
}
