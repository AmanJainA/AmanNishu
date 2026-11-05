import Card from '../pages/Card';

// The gate leads directly into the invitation. The reveal is now a continuous
// page transition rather than a separate scratch-and-scroll interaction.
export default function InvitationReveal() {
  return (
    <main className="invitation-reveal-page invitation-cinematic-entry">
      <Card embedded />
    </main>
  );
}
