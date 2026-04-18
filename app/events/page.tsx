import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Events | Aube Parisian Brunch Orlando",
  description: "Upcoming events at Aube — rosé brunches, seasonal menus, live music, and private gatherings in Orlando.",
};

const upcomingEvents = [
  {
    date: "SAT, JUN 14",
    month: "JUN",
    day: "14",
    title: "Rosé Brunch",
    description: "A curated three-course menu paired with six rosé expressions from the Loire Valley. Each glass hand-selected by our sommelier, Margaux.",
    time: "11am – 3pm",
    type: "Food & Wine",
    spots: "24 seats remaining",
    link: "#",
  },
  {
    date: "SUN, JUN 22",
    month: "JUN",
    day: "22",
    title: "Bastille Day Preview",
    description: "A week-early celebration with a prix fixe menu honoring the culinary regions of France, paired with live accordion music throughout the morning.",
    time: "10am – 4pm",
    type: "Special Menu",
    spots: "Walk-in welcome",
    link: "#",
  },
  {
    date: "SAT, JUL 5",
    month: "JUL",
    day: "5",
    title: "Farmers Market Morning",
    description: "Every ingredient sourced that morning from the Orlando Farmers Market. The menu is announced at 9am. A different plate every week.",
    time: "9am – 1pm",
    type: "Seasonal Menu",
    spots: "Limited seating",
    link: "#",
  },
  {
    date: "SAT, JUL 19",
    month: "JUL",
    day: "19",
    title: "Champagne & Caviar Brunch",
    description: "An elevated Saturday for those who like their mornings dressed up. Grower champagnes, caviar service, and an abridged prix fixe.",
    time: "11am – 2pm",
    type: "Premium",
    spots: "12 seats available",
    link: "#",
  },
  {
    date: "SUN, AUG 3",
    month: "AUG",
    day: "3",
    title: "Provençal Summer Sunday",
    description: "A full Sunday celebrating the lavender fields and sea breezes of Provence. Think rosé, bouillabaisse bites, tapenade, and pissaladière.",
    time: "10am – 4pm",
    type: "Seasonal Menu",
    spots: "Walk-in welcome",
    link: "#",
  },
];

export default function Events() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div
          style={{
            background: "var(--bg-alt)",
            padding: "9rem 2.5rem 5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "1.25rem" }}>What&apos;s On</p>
              <h1
                className="font-display"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.08 }}
              >
                Events &amp;
                <br />
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Special Mornings.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2rem" }}>
                From intimate wine brunches to full-restaurant buyouts, we design mornings worth remembering.
              </p>
              <Link href="/contact" className="btn-primary">
                Inquire About Private Events
              </Link>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
        </div>

        {/* Events list */}
        <section style={{ padding: "7rem 2.5rem", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {upcomingEvents.map((event, i) => (
              <div
                key={event.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr auto",
                  gap: "2.5rem",
                  padding: "2.5rem 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "start",
                }}
              >
                {/* Date block */}
                <div
                  style={{
                    background: i === 0 ? "var(--accent)" : "var(--bg-alt)",
                    padding: "1.25rem 0.75rem",
                    textAlign: "center",
                    border: i !== 0 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: i === 0 ? "rgba(255,255,255,0.7)" : "var(--text-light)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {event.month}
                  </p>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: i === 0 ? "#fff" : "var(--text)",
                    }}
                  >
                    {event.day}
                  </p>
                </div>

                {/* Event info */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <h2 className="font-display" style={{ fontSize: "1.65rem", fontWeight: 500, color: "var(--text)", fontStyle: "italic" }}>
                      {event.title}
                    </h2>
                    <span
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.65rem",
                        background: "var(--accent-light)",
                        color: "var(--accent)",
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "0.75rem", maxWidth: "520px" }}>
                    {event.description}
                  </p>
                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-light)" }}>
                    <span>⏱ {event.time}</span>
                    <span>· {event.spots}</span>
                  </div>
                </div>

                {/* Reserve button */}
                <div style={{ paddingTop: "0.5rem" }}>
                  <a href="https://resy.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.65rem 1.5rem", whiteSpace: "nowrap" }}>
                    Reserve
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private events CTA */}
        <section
          style={{
            background: "var(--bg-alt)",
            padding: "6rem 2.5rem",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <p className="section-label" style={{ marginBottom: "1.25rem" }}>Private Events</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Host your gathering at Aube.
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
              We offer full restaurant buyouts, semi-private sections, and off-site catering. From birthday brunches to corporate entertaining.
            </p>
            <Link href="/contact?subject=Private%20Events" className="btn-primary">
              Get In Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
