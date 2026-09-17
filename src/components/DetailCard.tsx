import type { Fact } from "@/types/suite";

interface DetailCardProps {
  visible: boolean;
  label: string;
  facts: Fact[];
  note: string;
}

export default function DetailCard({ visible, label, facts, note }: DetailCardProps) {
  return (
    <aside className="detail-card" style={{ display: visible ? "block" : "none" }}>
      <p>{label}</p>
      <dl>
        {facts.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="note">{note}</p>
    </aside>
  );
}
