import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gift Cards | Aube Parisian Brunch Orlando",
  description: "Give the gift of a slow morning. Aube gift cards available in any amount.",
};

export default function GiftCards() {
  return (
    <>
      <Navbar />
      <main>
        <section
          style={{
            background: "var(--bg-alt)",
            padding: "9rem 2.5rem 7rem",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "1.25rem" }}>Gift Cards</p>
              <h1 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "1.25rem" }}>
                Give the gift of a
                <br />
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>perfect morning.</em>
              </h1>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
                Aube gift cards are available in any amount and never expire. Perfect for birthdays, anniversaries, or anyone who appreciates a long, beautiful brunch.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#" className="btn-primary">Purchase a Gift Card</a>
                <Link href="/contact" className="btn-outline">Inquire for Bulk Orders</Link>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/10",
                background: "var(--green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "3rem",
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Aube Gift Card</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 500, color: "#fff", letterSpacing: "0.06em" }}>Aube</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>A slow morning, gifted.</p>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              section > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
