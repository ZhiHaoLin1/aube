import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Menu | Aube Parisian Brunch Orlando",
  description: "The full brunch menu at Aube — French classics perfected. Served daily from 8am.",
};

const menuData = [
  {
    category: "Pour Commencer",
    subtitle: "To Begin",
    items: [
      { name: "Jus Pressé du Jour", desc: "Freshly pressed seasonal juice", price: "7" },
      { name: "Café Crème", desc: "Double espresso, steamed whole milk, house blend", price: "6" },
      { name: "Chocolat Chaud", desc: "Valrhona dark chocolate, whole milk, touch of vanilla", price: "7" },
      { name: "Viennoiserie Basket", desc: "Croissant, pain au chocolat, and pain aux raisins — baked in-house", price: "14" },
      { name: "Tartine Beurre & Confiture", desc: "Levain toast, cultured butter, seasonal house jam", price: "9" },
    ],
  },
  {
    category: "Les Classiques",
    subtitle: "The Classics",
    items: [
      { name: "Croque Madame", desc: "Slow-fermented levain, aged gruyère, Parisian ham, béchamel, fried egg", price: "19", badge: "Signature" },
      { name: "Croque Monsieur", desc: "Same as above, without the egg", price: "17" },
      { name: "Oeufs Bénédicte", desc: "Toasted brioche, Canadian bacon, poached eggs, house hollandaise, chervil", price: "21" },
      { name: "Omelette aux Fines Herbes", desc: "French-style rolled omelette, chives, tarragon, gruyère", price: "18" },
      { name: "Tartine Saumonée", desc: "Open sourdough, crème fraîche, cold-smoked salmon, pickled shallots, capers, dill", price: "22", badge: "Bestseller" },
      { name: "Salade Niçoise", desc: "Seared tuna, haricots verts, soft egg, olives, anchovy, tomatoes, dijon dressing", price: "24" },
    ],
  },
  {
    category: "Les Sucrés",
    subtitle: "Sweet Plates",
    items: [
      { name: "Brioche Perdue", desc: "House brioche, vanilla custard soak, caramelized crust, seasonal fruit, crème Chantilly", price: "18", badge: "Weekend Special" },
      { name: "Crêpes Suzette", desc: "Thin crêpes, brown butter, orange, Grand Marnier caramel", price: "17" },
      { name: "Clafoutis aux Cerises", desc: "Warm cherry clafoutis, vanilla bean, powdered sugar", price: "14" },
      { name: "Gaufre Liégeoise", desc: "Pearl sugar waffle, fresh strawberries, chantilly, house compote", price: "16" },
    ],
  },
  {
    category: "À Côté",
    subtitle: "Sides",
    items: [
      { name: "Pommes Sautées", desc: "Crispy fingerling potatoes, garlic butter, fleur de sel", price: "9" },
      { name: "Salade Verte", desc: "Gem lettuce, shaved radish, tarragon vinaigrette", price: "9" },
      { name: "Oeuf Poché Supplémentaire", desc: "Additional poached egg", price: "4" },
      { name: "Saumon Fumé", desc: "Extra cold-smoked salmon", price: "8" },
    ],
  },
  {
    category: "Boissons",
    subtitle: "Beverages",
    items: [
      { name: "Kir Royal", desc: "Crémant de Loire, cassis", price: "14" },
      { name: "Mimosa Classique", desc: "Prosecco, fresh orange juice", price: "12" },
      { name: "Bloody Marie", desc: "Vodka, house mix, celery, tajín rim", price: "15" },
      { name: "Hugo Spritz", desc: "Prosecco, elderflower, lime, mint", price: "13" },
      { name: "Limonade Maison", desc: "House lemon, honey, sparkling water, basil", price: "7" },
    ],
  },
];

export default function Menu() {
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
            textAlign: "center",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1.25rem" }}>Menu</p>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "1rem" }}
          >
            Served daily, 8am – close.
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Our menu changes with the seasons. Prices are per plate. We accommodate dietary needs — just ask your server.
          </p>
        </div>

        {/* Menu categories */}
        <div style={{ background: "var(--bg)", padding: "5rem 2.5rem 7rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {menuData.map((section, si) => (
              <div
                key={section.category}
                style={{ marginBottom: si < menuData.length - 1 ? "5rem" : 0 }}
              >
                {/* Category header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    className="font-display"
                    style={{ fontSize: "2rem", fontWeight: 500, color: "var(--text)", fontStyle: "italic" }}
                  >
                    {section.category}
                  </h2>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-light)",
                    }}
                  >
                    — {section.subtitle}
                  </span>
                </div>
                <div
                  style={{
                    width: "2.5rem",
                    height: "2px",
                    background: "var(--accent)",
                    marginBottom: "2rem",
                  }}
                />

                {/* Items */}
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "1.5rem",
                      padding: "1.1rem 0",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                        <h3
                          className="font-display"
                          style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--text)" }}
                        >
                          {item.name}
                        </h3>
                        {"badge" in item && item.badge && (
                          <span
                            style={{
                              background: "var(--accent-light)",
                              color: "var(--accent)",
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              padding: "0.25rem 0.6rem",
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 500,
                        color: "var(--text)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            ))}

            {/* Dietary note */}
            <div
              style={{
                marginTop: "4rem",
                padding: "2rem",
                background: "var(--bg-alt)",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                Menu items may contain allergens including gluten, dairy, eggs, and nuts. Please inform your server of any dietary requirements.
                Consuming raw or undercooked proteins may increase risk of foodborne illness.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section
          style={{
            background: "var(--green)",
            padding: "5rem 2.5rem",
            textAlign: "center",
          }}
        >
          <h2 className="font-display" style={{ fontSize: "2.8rem", fontWeight: 400, color: "#fff", marginBottom: "1.25rem" }}>
            Ready to order?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: "2.5rem" }}>
            Reserve your table or order for pickup and delivery.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://resy.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Reserve on Resy
            </a>
            <a href="https://toast.com" target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              Order Online
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
