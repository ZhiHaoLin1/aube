import Link from "next/link";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Gift Cards", href: "/gift-cards" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, rgba(44, 31, 27, 0.98) 0%, rgba(27, 20, 18, 1) 100%)",
        color: "rgba(255, 255, 255, 0.74)",
        padding: "4.8rem 0 2rem",
        marginTop: "2rem",
      }}
    >
      <div className="section-shell">
        <div className="footer-close-grid">
          <div>
            <p className="menu-type" style={{ color: "rgba(255,255,255,0.48)", marginBottom: "0.95rem" }}>
              Closing moment
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.4rem, 6vw, 5.3rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.05em",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Coffee&apos;s
              <br />
              already on.
            </h2>
            <p
              style={{
                maxWidth: "25rem",
                fontSize: "0.98rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.68)",
              }}
            >
              Pastries do not wait. The first trays land early, the coffee is already
              moving, and the room feels better when people arrive before the rush.
            </p>
          </div>
        </div>

        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 0.8fr 1fr",
            gap: "2rem",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
            marginTop: "2.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                lineHeight: 0.9,
                color: "#fff",
                marginBottom: "0.9rem",
              }}
            >
              Aube
            </p>
            <p
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.8,
                maxWidth: "18rem",
                marginBottom: "1.25rem",
              }}
            >
              French brunch in Orlando with warm pastry, bright plates, and a room
              made for slow mornings that turn social.
            </p>
            <a
              href="https://resy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
              style={{ width: "fit-content" }}
            >
              Reserve
            </a>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.46)",
                marginBottom: "1rem",
              }}
            >
              Visit
            </p>
            <p style={{ lineHeight: 1.8 }}>
              123 W Church St
              <br />
              Orlando, FL 32801
              <br />
              (407) 555-0100
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.46)",
                marginBottom: "1rem",
              }}
            >
              Hours
            </p>
            <p style={{ lineHeight: 1.8 }}>
              Mon-Fri: 8am-4pm
              <br />
              Sat-Sun: 8am-5pm
              <br />
              Walk-ins welcome
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.46)",
                marginBottom: "1rem",
              }}
            >
              Explore
            </p>
            <div style={{ display: "grid", gap: "0.6rem" }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                style={{ marginTop: "0.5rem" }}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            paddingTop: "1.5rem",
            fontSize: "0.8rem",
          }}
        >
          <p>(c) {new Date().getFullYear()} Aube. All rights reserved.</p>
          <p>Coffee&apos;s already on.</p>
        </div>
      </div>

      <style>{`
        .footer-close-grid {
          display: block;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
