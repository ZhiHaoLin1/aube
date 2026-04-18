import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Aube Parisian Brunch Orlando",
  description: "The story of Aube — Orlando's all-day Parisian brunch, where classics are perfected and mornings are meant to linger.",
};

const pressItems = [
  { outlet: "Orlando Weekly", quote: "The most beautiful brunch room in the city — and the food matches it.", year: "2024" },
  { outlet: "Eater Orlando", quote: "Aube makes the case that brunch can be both effortless and extraordinary.", year: "2024" },
  { outlet: "Visit Orlando", quote: "A genuinely Parisian experience tucked into the heart of downtown.", year: "2025" },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div
          style={{
            background: "var(--bg-alt)",
            padding: "9rem 2.5rem 5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p className="section-label" style={{ marginBottom: "1.25rem" }}>About</p>
            <h1
              className="font-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--text)" }}
            >
              Born from a love
              <br />
              of <em style={{ color: "var(--accent)", fontStyle: "italic" }}>slow mornings.</em>
            </h1>
          </div>
        </div>

        {/* Story section */}
        <section style={{ padding: "7rem 2.5rem", background: "var(--bg)" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ fontSize: "1.15rem", lineHeight: 1.9, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Chef Isabelle Laurent grew up in Lyon, the culinary capital of France, watching her mother stretch Saturday mornings into something sacred. A good croissant, real butter, a café crème that stayed warm. No hurrying. The table as a place of rest.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                After years in New York kitchens, Isabelle landed in Orlando and found something missing: a place that understood the ritual. Not brunch as spectacle, not brunch as a line out the door, but brunch as the French intended it.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-muted)" }}>
                Aube opened its doors in 2023. Named for dawn, the French word for first light, it became overnight what it was meant to be: a room where time slows down, and the food is worth every minute.
              </p>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  background: "linear-gradient(135deg, #c8b49a, #a08060)",
                  marginBottom: "1.5rem",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Replace with <Image src="/chef-isabelle.jpg" fill alt="Chef Isabelle Laurent" style={{objectFit:'cover'}} /> */}
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Chef Photo</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p className="font-display" style={{ fontSize: "1.3rem", fontStyle: "italic", color: "var(--text)", marginBottom: "0.25rem" }}>Isabelle Laurent</p>
                <p style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Chef & Founder</p>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
            }
          `}</style>
        </section>

        {/* Our space */}
        <section style={{ padding: "7rem 2.5rem", background: "var(--bg-alt)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "1rem" }}>The Space</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400 }}>
              Designed for the long morning.
            </h2>
          </div>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr",
              gap: "8px",
              height: "480px",
            }}
          >
            {[
              { label: "Dining Room", colors: "#d4c0a4, #b8a082" },
              { label: "The Bar", colors: "#c8a882, #a88060" },
              { label: "Garden Terrace", colors: "#2d4a3c, #1e3228" },
            ].map(({ label, colors }) => (
              <div
                key={label}
                style={{
                  background: `linear-gradient(135deg, ${colors})`,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <p className="font-display" style={{ fontSize: "1.15rem", fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Press */}
        <section style={{ padding: "7rem 2.5rem", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p className="section-label" style={{ marginBottom: "1rem" }}>Press</p>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400 }}>
                What people are saying.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {pressItems.map((p) => (
                <div
                  key={p.outlet}
                  style={{
                    padding: "2.5rem 2rem",
                    border: "1px solid var(--border)",
                    background: "var(--bg-alt)",
                  }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1.25rem",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      color: "var(--text)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    &ldquo;{p.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
                      {p.outlet}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>{p.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              section:last-of-type > div > div:last-child { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--bg-alt)", padding: "5rem 2.5rem", textAlign: "center", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 400, marginBottom: "1.25rem" }}>
              Come meet us.
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Walk-ins are always welcome. Or reserve your table and let us take care of the rest.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://resy.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Reserve</a>
              <Link href="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
