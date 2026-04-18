"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p className="section-label" style={{ marginBottom: "1.25rem" }}>Contact</p>
            <h1
              className="font-display"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.08 }}
            >
              Let&apos;s talk about
              <br />
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>your morning.</em>
            </h1>
          </div>
        </div>

        {/* Contact layout */}
        <section style={{ padding: "7rem 2.5rem", background: "var(--bg)" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "6rem",
              alignItems: "start",
            }}
          >
            {/* Info */}
            <div>
              <div style={{ marginBottom: "3rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
                  General
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "var(--text-muted)" }}>
                  123 W Church Street<br />
                  Orlando, FL 32801<br />
                  <a href="tel:+14075550100" style={{ color: "var(--text)", fontWeight: 500, textDecoration: "none" }}>407-555-0100</a><br />
                  <a href="mailto:hello@aubebrunch.com" style={{ color: "var(--text)", fontWeight: 500, textDecoration: "none" }}>hello@aubebrunch.com</a>
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
                  Hours
                </p>
                {[
                  { day: "Monday – Friday", hours: "8:00 am – 4:00 pm" },
                  { day: "Saturday – Sunday", hours: "8:00 am – 5:00 pm" },
                ].map(({ day, hours }) => (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.65rem 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>{day}</span>
                    <span style={{ fontWeight: 500, color: "var(--text)" }}>{hours}</span>
                  </div>
                ))}
              </div>

              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
                  Private Events
                </p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                  We accommodate private buyouts, seated dinners, and catered events. Use the form to inquire and we&apos;ll be in touch within 24 hours.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              {status === "success" ? (
                <div
                  style={{
                    padding: "3rem 2.5rem",
                    background: "var(--green)",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <p className="font-display" style={{ fontSize: "2rem", fontStyle: "italic", marginBottom: "0.75rem" }}>
                    Message received.
                  </p>
                  <p style={{ fontSize: "0.95rem", opacity: 0.75 }}>
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                        Name *
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                        Email *
                      </label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      Subject
                    </label>
                    <select
                      className="form-input"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ cursor: "pointer", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a7a6a' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
                    >
                      <option>General Inquiry</option>
                      <option>Private Events</option>
                      <option>Catering</option>
                      <option>Job Application</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      Message *
                    </label>
                    <textarea
                      className="form-input"
                      rows={6}
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ fontSize: "0.88rem", color: "#c0392b" }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    style={{ alignSelf: "flex-start", opacity: status === "loading" ? 0.6 : 1 }}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              section > div[style*="grid-template-columns: 1fr 1.5fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
