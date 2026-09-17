interface TopBarProps {
  chapter: string;
  soundOn: boolean;
  onToggleSound: () => void;
  onBook: () => void;
}

export default function TopBar({ chapter, soundOn, onToggleSound, onBook }: TopBarProps) {
  return (
    <header className="top">
      <p className="chapter">{chapter}</p>
      <div className="top-actions">
        <button type="button" id="sound" aria-pressed={soundOn} onClick={onToggleSound}>
          <i className="sound-dot" />
          {soundOn ? "Sound on" : "Sound off"}
        </button>
        <button className="book" type="button" onClick={onBook}>
          Private preview
        </button>
      </div>
    </header>
  );
}
