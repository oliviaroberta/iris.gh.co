export default function WaitlistSuccess({ onBackToTop }) {
  return (
    <div className="waitlist-card waitlist-success" aria-live="polite">
        <span className="waitlist-success__mark" aria-hidden="true">◇</span>
        <h2>You're on the list, doll! 🤎</h2>
        <span className="waitlist-rule" aria-hidden="true" />
        <p>Thank you for helping us shape<br />the first IRIS collection.</p>
        <p>You'll be among the first to hear<br />what's coming.</p>
        <button type="button" onClick={onBackToTop}>Back to top</button>
    </div>
  );
}
