"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "0.85rem 0" : "1.2rem 0",
          background: scrolled ? "rgba(251, 245, 236, 0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition:
            "padding 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div className="section-shell">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.2rem",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "grid",
                gap: "0.1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  lineHeight: 0.9,
                  color: "var(--text)",
                }}
              >
                Aube
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-soft)",
                }}
              >
                French brunch - Orlando
              </span>
            </Link>

            <div
              className="desktop-nav"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
              }}
            >
              <a
                href="https://resy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary desktop-cta"
                style={{ minHeight: "42px", padding: "0.75rem 1.2rem" }}
              >
                Reserve
              </a>

              <button
                className="mobile-menu-btn"
                onClick={() => setMenuOpen((value) => !value)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                style={{
                  display: "none",
                  width: "2.9rem",
                  height: "2.9rem",
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  background: "rgba(255, 255, 255, 0.88)",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.28rem",
                }}
              >
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    style={{
                      display: "block",
                      width: "1rem",
                      height: "1.5px",
                      borderRadius: "999px",
                      background: "var(--text)",
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                      ...(menuOpen && index === 0
                        ? { transform: "translateY(5px) rotate(45deg)" }
                        : {}),
                      ...(menuOpen && index === 1 ? { opacity: 0 } : {}),
                      ...(menuOpen && index === 2
                        ? { transform: "translateY(-5px) rotate(-45deg)" }
                        : {}),
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background:
              "linear-gradient(180deg, rgba(251, 245, 236, 0.98) 0%, rgba(244, 236, 223, 0.98) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1.5rem 2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "28rem",
              display: "grid",
              gap: "1rem",
            }}
          >
            {links.concat({ label: "Gift Cards", href: "/gift-cards" }).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "1rem",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "2.4rem",
                    lineHeight: 0.95,
                    color: "var(--text)",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            <a
              href="https://resy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => setMenuOpen(false)}
              style={{ marginTop: "1rem" }}
            >
              Reserve a Table
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .desktop-nav,
          .desktop-cta {
            display: none !important;
          }

          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
