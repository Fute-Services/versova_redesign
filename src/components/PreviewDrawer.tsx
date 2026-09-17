import { useState, type FormEvent } from "react";

interface PreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function PreviewDrawer({ open, onClose, onSubmitted }: PreviewDrawerProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    onSubmitted();
  }

  return (
    <aside className={`drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <button className="close" type="button" onClick={onClose}>
        Close ×
      </button>
      <form onSubmit={handleSubmit}>
        <p className="eyebrow">Private preview</p>
        <h3>
          Continue the <em>conversation.</em>
        </h3>
        <p>Leave your details to prepare a private preview with the sales team.</p>
        <label>
          Your name
          <input name="name" required autoComplete="name" placeholder="Name" />
        </label>
        <label>
          Email address
          <input name="email" required type="email" autoComplete="email" placeholder="name@email.com" />
        </label>
        <button className="submit" type="submit">
          Prepare my preview
        </button>
        <div className={`success${submitted ? " show" : ""}`} role="status">
          Your private preview request is ready for the sales team.
        </div>
      </form>
    </aside>
  );
}
