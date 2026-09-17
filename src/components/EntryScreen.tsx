interface EntryScreenProps {
  hidden: boolean;
  onEnter: () => void;
}

export default function EntryScreen({ hidden, onEnter }: EntryScreenProps) {
  return (
    <section className={`entry${hidden ? " out" : ""}`} id="entry">
      <div className="entry-inner">
        <small>Beach Queen · Versova</small>
        <h1>HORIZON</h1>
        <p>A detailed sales-suite journey, designed for buyers to explore the project with their advisor.</p>
        <button type="button" onClick={onEnter}>
          Begin the tour
        </button>
      </div>
      <span className="entry-foot">Design concept · supplied project visuals + sample content</span>
    </section>
  );
}
