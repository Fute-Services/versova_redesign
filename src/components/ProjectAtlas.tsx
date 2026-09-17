import { navGroups } from "@/data/suite";
import type { TabId } from "@/types/suite";

interface ProjectAtlasProps {
  open: boolean;
  current: TabId;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (tab: TabId) => void;
}

export default function ProjectAtlas({ open, current, onOpen, onClose, onSelect }: ProjectAtlasProps) {
  return (
    <aside className="rail" aria-label="Beach Queen project map">
      <button
        className="nav-launcher"
        type="button"
        aria-label="Open project map"
        aria-expanded={open}
        aria-controls="atlas"
        onClick={onOpen}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 1.8v3.1M12 19.1v3.1M1.8 12h3.1M19.1 12h3.1M12 8.7v6.6M8.7 12h6.6" />
        </svg>
        <span>Project map</span>
      </button>

      <div className={`atlas-scrim${open ? " show" : ""}`} onClick={onClose} />

      <section
        className={`atlas${open ? " open" : ""}`}
        id="atlas"
        aria-label="Beach Queen detailed project map"
        aria-hidden={!open}
      >
        <header className="atlas-head">
          <div>
            <p>Beach Queen · Versova</p>
            <strong>
              Explore
              <br />
              Beach Queen
            </strong>
          </div>
          <button className="atlas-close" type="button" onClick={onClose}>
            Close ×
          </button>
        </header>

        {navGroups.map((group) => (
          <div className="atlas-group" key={group.label}>
            <p>{group.label}</p>
            <nav className="nav" aria-label={group.ariaLabel}>
              {group.items.map((item) => {
                const active = item.id === current;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={active ? "active" : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={() => onSelect(item.id)}
                  >
                    <i>{item.number}</i>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}

        <p className="atlas-note">
          <b>Sales-suite navigation</b>Select a scene to continue.
        </p>
      </section>
    </aside>
  );
}
