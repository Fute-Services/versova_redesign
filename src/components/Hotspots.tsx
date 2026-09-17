import type { TabId } from "@/types/suite";

const spots: { className: string; target: TabId; label: string }[] = [
  { className: "h1", target: "tour", label: "Move through" },
  { className: "h2", target: "residences", label: "Enter residence" },
  { className: "h3", target: "amenities", label: "Discover day" },
];

interface HotspotsProps {
  visible: boolean;
  onJump: (tab: TabId) => void;
}

export default function Hotspots({ visible, onJump }: HotspotsProps) {
  return (
    <div className="hotspots" style={{ display: visible ? "block" : "none" }}>
      {spots.map((spot) => (
        <button
          key={spot.className}
          className={`hotspot ${spot.className}`}
          type="button"
          onClick={() => onJump(spot.target)}
        >
          <i>+</i>
          <span>{spot.label}</span>
        </button>
      ))}
    </div>
  );
}
