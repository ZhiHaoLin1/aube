"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const imageUrls = {
  briochePerdue:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/briocheperdue.jpeg",
  cheers: "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/cheers.jpeg",
  croissants:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/croissants.jpeg",
  croqueMadame:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/croquemadame.jpeg",
  croqueMadameClose:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/croquemadame2.jpeg",
  eggsClose:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/eggsben.jpeg",
  eggsTop:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/eggsben2.jpeg",
  frenchOmelette:
    "https://pub-3fc6787160b4478f981aa86718fca41d.r2.dev/french%20omelette.jpeg",
} as const;

type MenuFeature = {
  key: string;
  label: string;
  title: string;
  price: string;
  teaser: string;
  detail: string;
  note: string;
  image: string;
  alt: string;
  ingredients: string[];
  surface: string;
};

type FlowStep = {
  time: string;
  title: string;
  copy: string;
  status: string;
  phase: string;
  tone: string;
  image: string;
  alt: string;
};

const operatorSignals = [
  {
    label: "Next available",
    value: "10:45am",
    note: "Reserve now before the late-morning rush.",
  },
  {
    label: "Weekend reality",
    value: "Full by 11",
    note: "The room gets busy fast once drinks start landing.",
  },
  {
    label: "Walk-ins",
    value: "Fast before 9",
    note: "Early arrivals move quickly. After that, tables turn slower.",
  },
];

const mostOrderedToday = [
  { item: "Eggs Benedict", count: "14 plates", share: 92, note: "Lead plate" },
  { item: "Croissant Basket", count: "11 orders", share: 74, note: "Pastry start" },
  { item: "Brunch Cocktails", count: "9 rounds", share: 58, note: "Second round" },
];

const menuFeatures: MenuFeature[] = [
  {
    key: "eggs-benedict",
    label: "Signature plate",
    title: "Eggs Benedict",
    price: "$21",
    teaser: "Silky hollandaise, smoked salmon, bright herbs, toasted bread.",
    detail:
      "This is the plate that should stop people mid-scroll. Rich yolk, vivid sauce, and enough brightness to feel brunchy instead of heavy.",
    note: "Best first order",
    image: imageUrls.eggsClose,
    alt: "Close-up of eggs benedict with hollandaise",
    ingredients: ["Poached eggs", "Smoked salmon", "Hollandaise", "Toasted bread"],
    surface:
      "linear-gradient(180deg, rgba(255, 244, 233, 0.96) 0%, rgba(255, 251, 246, 0.9) 100%)",
  },
  {
    key: "croissant-basket",
    label: "Pastry service",
    title: "Croissant Basket",
    price: "$14",
    teaser: "Fresh laminated pastry baked every morning and served warm.",
    detail:
      "Pastry is part of the mood here, not an afterthought. The site should feel like the room smells when the first tray lands.",
    note: "Morning essential",
    image: imageUrls.croissants,
    alt: "Fresh croissants arranged on trays",
    ingredients: ["House pastry", "Cultured butter", "Morning bake", "Shareable start"],
    surface:
      "linear-gradient(180deg, rgba(253, 240, 225, 0.96) 0%, rgba(255, 250, 244, 0.88) 100%)",
  },
  {
    key: "eggs-table",
    label: "From the stove",
    title: "French Omelette",
    price: "$19",
    teaser: "Soft-folded eggs with herbs, cheese, and a plate that feels unmistakably brunch.",
    detail:
      "The omelette adds a cleaner, brighter dish to the rotation so the page stops leaning on the exact same brunch plate every time it needs appetite.",
    note: "Lighter plate",
    image: imageUrls.frenchOmelette,
    alt: "French omelette plated with herbs",
    ingredients: ["Soft eggs", "Fine herbs", "Gruyere", "Morning plate"],
    surface:
      "linear-gradient(180deg, rgba(248, 243, 236, 0.96) 0%, rgba(255, 251, 246, 0.88) 100%)",
  },
  {
    key: "cocktails",
    label: "Second round",
    title: "Brunch Cocktails",
    price: "$12+",
    teaser: "Citrus-forward drinks and a table that gets louder in a good way.",
    detail:
      "The drinks photo brings in people, sunlight, and that mid-brunch energy shift. It keeps Aube from feeling like a food shoot without a room around it.",
    note: "Stay longer energy",
    image: imageUrls.cheers,
    alt: "Friends toasting brunch cocktails",
    ingredients: ["Citrus", "Sparkling pours", "Shared table", "Late brunch mood"],
    surface:
      "linear-gradient(180deg, rgba(255, 236, 223, 0.96) 0%, rgba(255, 248, 242, 0.9) 100%)",
  },
];

const brunchFlow: FlowStep[] = [
  {
    time: "08:00",
    title: "Pastry hits first.",
    copy:
      "The room opens with croissants, coffee, and quiet tables catching the light.",
    status: "The fastest walk-in window of the day.",
    phase: "Quiet open",
    tone: "rgba(207, 153, 81, 0.12)",
    image: imageUrls.croissants,
    alt: "Fresh croissants ready for morning service",
  },
  {
    time: "10:30",
    title: "Plates take over.",
    copy:
      "Eggs, toast, hollandaise, and conversation become the actual center of the room.",
    status: "Most ordered this morning: Eggs Benedict.",
    phase: "Peak brunch",
    tone: "rgba(179, 93, 61, 0.12)",
    image: imageUrls.croqueMadameClose,
    alt: "Croque madame plated for brunch service",
  },
  {
    time: "12:15",
    title: "Brunch turns social.",
    copy:
      "Cocktails land, tables fill out, and nobody feels pushed toward the check too early.",
    status: "Second round energy, longer stays, louder tables.",
    phase: "Second round",
    tone: "rgba(217, 144, 115, 0.16)",
    image: imageUrls.cheers,
    alt: "Friends toasting brunch cocktails",
  },
];

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [menuPaused, setMenuPaused] = useState(false);
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);

  const activeFeature = menuFeatures[activeFeatureIndex] ?? menuFeatures[0];
  const activeFlow = brunchFlow[activeFlowIndex] ?? brunchFlow[0];

  const flowRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress: flowProgress } = useScroll({
    target: flowRef,
    offset: ["start 70%", "end 35%"],
  });

  const heroTextY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : -18]);
  const heroMediaY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 22]);

  useEffect(() => {
    if (menuPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveFeatureIndex((current) => (current + 1) % menuFeatures.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [menuPaused]);

  useMotionValueEvent(flowProgress, "change", (latest) => {
    if (prefersReducedMotion) {
      return;
    }

    const nextIndex = Math.min(
      brunchFlow.length - 1,
      Math.max(0, Math.floor(latest * brunchFlow.length)),
    );

    setActiveFlowIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const revealInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 28 };

  const flowProgressHeight =
    brunchFlow.length === 1
      ? "100%"
      : `${(activeFlowIndex / (brunchFlow.length - 1)) * 100}%`;

  return (
    <>
      <Navbar />
      <main className="page-shell">
        <section
          style={{
            padding: "8.4rem 0 4.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-2rem",
              right: "-7rem",
              width: "30rem",
              height: "30rem",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, rgba(207, 153, 81, 0.22) 0%, rgba(207, 153, 81, 0) 70%)",
            }}
          />

          <div className="section-shell">
            <div className="home-hero-grid">
              <motion.div
                className="hero-copy-shell"
                style={{ y: heroTextY }}
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hero-copy-panel">
                  <div style={{ display: "grid", gap: "0.55rem", marginBottom: "1rem" }}>
                    <p className="section-label">French brunch house</p>
                    <span
                      className="menu-type"
                      style={{
                        display: "block",
                        color: "var(--text-light)",
                      }}
                    >
                      pastry | plates | pours
                    </span>
                  </div>
                  <h1 className="hero-heading">
                    Tables fill by
                    <br />
                    11 on weekends.
                    <br />
                    That is the point.
                  </h1>
                  <p className="hero-body">
                    Aube gets sharper when it speaks like an operator, not just a designer.
                    Croissants land early, walk-ins move fast before nine, and late brunch
                    stretches out because the room is actually working.
                  </p>

                  <div className="hero-actions">
                    <a
                      href="https://resy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Reserve a Table
                    </a>
                    <Link href="/menu" className="btn-outline">
                      View Menu
                    </Link>
                  </div>
                </div>

                <div className="hero-operator-rail">
                  {operatorSignals.map((signal) => (
                    <div key={signal.label} className="hero-operator-item">
                      <span className="menu-type">{signal.label}</span>
                      <strong>{signal.value}</strong>
                      <p>{signal.note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="hero-collage"
                style={{ y: heroMediaY }}
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hero-main-photo">
                  <Image
                    src={imageUrls.eggsTop}
                    alt="Top-down brunch plate with eggs and coffee"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 980px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="hero-float-photo hero-float-right">
                  <Image
                    src={imageUrls.croqueMadame}
                    alt="Croque madame served at Aube"
                    fill
                    sizes="(max-width: 980px) 42vw, 18vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="hero-float-photo hero-float-bottom">
                  <Image
                    src={imageUrls.frenchOmelette}
                    alt="French omelette at Aube"
                    fill
                    sizes="(max-width: 980px) 52vw, 22vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="hero-ticket">
                  <span className="menu-type" style={{ color: "var(--accent)" }}>
                    Live board
                  </span>
                  <strong>Next table 10:45am</strong>
                  <p>Walk-ins move fastest before 9. After that, brunch settles in.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          initial={revealInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: "2.4rem 0 4.8rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="section-shell">
            <div className="reality-grid">
              <div className="reality-panel">
                <div className="reality-signal-head">
                  <p className="section-label">Trending this morning</p>
                  <span className="menu-type" style={{ color: "var(--text-light)" }}>
                    Updated 4 min ago
                  </span>
                </div>

                <div className="reality-lead-card">
                  <div>
                    <span className="menu-type" style={{ color: "var(--accent)" }}>
                      Lead plate
                    </span>
                    <strong>14</strong>
                    <p className="reality-lead">
                      Eggs Benedict is driving the room this morning, which makes the site
                      feel like it knows what the restaurant is actually selling right now.
                    </p>
                  </div>

                  <div className="reality-ticket">
                    <span>08:10 first coffee</span>
                    <span>09:20 walk-ins speed up</span>
                    <span>10:45 next table</span>
                  </div>
                </div>

                <div className="reality-list">
                  {mostOrderedToday.map((order, index) => (
                    <motion.div
                      key={order.item}
                      className={`reality-row${index === 0 ? " is-leading" : ""}`}
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{
                        duration: 0.38,
                        delay: prefersReducedMotion ? 0 : index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="reality-row-copy">
                        <span className="menu-type">{order.note}</span>
                        <strong>{order.item}</strong>
                      </div>
                      <div className="reality-row-meta">
                        <span className="menu-type">{order.count}</span>
                        <span className="reality-row-bar">
                          <motion.span
                            initial={{ width: prefersReducedMotion ? `${order.share}%` : 0 }}
                            whileInView={{ width: `${order.share}%` }}
                            viewport={{ once: true, amount: 0.65 }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 0.45,
                              delay: prefersReducedMotion ? 0 : 0.12 + index * 0.08,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="reality-quote">
                <span className="menu-type" style={{ color: "var(--accent)" }}>
                  Guest note
                </span>
                <blockquote>
                  &quot;Walked in for coffee, stayed for another round, and somehow brunch
                  became the whole plan.&quot;
                </blockquote>
                <p>Weekend guest, Saturday 11:18am</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={revealInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: "5.4rem 0",
            background: activeFeature.surface,
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="section-shell">
            <div className="interactive-menu-grid">
              <div>
                <p className="section-label" style={{ marginBottom: "0.95rem" }}>
                  Interactive menu
                </p>
                <span
                  className="menu-type"
                  style={{
                    display: "inline-block",
                    marginBottom: "1rem",
                    color: "var(--text-light)",
                  }}
                >
                  Hover or wait to preview
                </span>
                <h2 className="section-heading">
                  Let the menu
                  <br />
                  feel alive.
                </h2>
                <p className="section-body">
                  The preview now rotates on its own, changes instantly on hover, and makes
                  the interaction obvious enough that people feel the site responding.
                </p>

                <div
                  className="interactive-menu-list"
                  onMouseEnter={() => setMenuPaused(true)}
                  onMouseLeave={() => setMenuPaused(false)}
                >
                  {menuFeatures.map((feature, index) => {
                    const isActive = activeFeature.key === feature.key;

                    return (
                      <button
                        key={feature.key}
                        type="button"
                        className={`interactive-menu-button${isActive ? " is-active" : ""}`}
                        onMouseEnter={() => setActiveFeatureIndex(index)}
                        onFocus={() => {
                          setMenuPaused(true);
                          setActiveFeatureIndex(index);
                        }}
                        onBlur={() => setMenuPaused(false)}
                        onClick={() => setActiveFeatureIndex(index)}
                      >
                        <div>
                          <span
                            className="menu-type"
                            style={{ color: isActive ? "var(--accent)" : "var(--text-light)" }}
                          >
                            {feature.label}
                          </span>
                          <h3>{feature.title}</h3>
                        </div>
                        <strong>{feature.price}</strong>
                        <p>{feature.teaser}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="interactive-detail-shell"
                onMouseEnter={() => setMenuPaused(true)}
                onMouseLeave={() => setMenuPaused(false)}
              >
                <div className="interactive-preview-head">
                  <div>
                    <span className="menu-type" style={{ color: "var(--accent)" }}>
                      Previewing now
                    </span>
                    <strong>{activeFeature.title}</strong>
                  </div>

                  <div className="interactive-preview-pips" aria-hidden="true">
                    {menuFeatures.map((feature) => (
                      <span
                        key={feature.key}
                        className={feature.key === activeFeature.key ? "is-active" : ""}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.key}
                    className="interactive-detail-card"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -18, scale: 0.99 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="interactive-detail-media"
                      initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.03, rotate: -1 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={activeFeature.image}
                        alt={activeFeature.alt}
                        fill
                        sizes="(max-width: 980px) 100vw, 42vw"
                        style={{ objectFit: "cover" }}
                      />

                      <div className="interactive-detail-flag">
                        <span className="menu-type">{activeFeature.label}</span>
                        <strong>{activeFeature.price}</strong>
                        <p>{activeFeature.note}</p>
                      </div>
                    </motion.div>

                    <div className="interactive-detail-copy">
                      <div>
                        <span className="menu-type" style={{ color: "var(--accent)" }}>
                          {activeFeature.note}
                        </span>
                        <h3>{activeFeature.title}</h3>
                      </div>

                      <p>{activeFeature.detail}</p>

                      <div className="interactive-detail-tags">
                        {activeFeature.ingredients.map((ingredient) => (
                          <span key={ingredient}>{ingredient}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={flowRef}
          initial={revealInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: "5.4rem 0 4.7rem", position: "relative", overflow: "hidden" }}
        >
          <motion.div
            className="brunch-flow-ambient"
            animate={{ backgroundColor: activeFlow.tone }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="section-shell">
            <div className="brunch-flow-grid">
              <div className="brunch-flow-copy">
                <p className="section-label" style={{ marginBottom: "0.95rem" }}>
                  Brunch flow
                </p>
                <span
                  className="menu-type"
                  style={{
                    display: "inline-block",
                    marginBottom: "1rem",
                    color: "var(--text-light)",
                  }}
                >
                  Scroll to follow the room
                </span>
                <h2 className="section-heading">
                  One timeline.
                  <br />
                  Three moods.
                  <br />
                  Actual service logic.
                </h2>
                <p className="section-body">
                  This is the standout interaction on the page now. The timeline advances as
                  you scroll, the active state moves, and the visual on the right changes with
                  the room instead of sitting there like another static block.
                </p>

                <div className="brunch-flow-timeline">
                  <div className="brunch-flow-line">
                    <span style={{ height: flowProgressHeight }} />
                  </div>

                  <div className="brunch-flow-steps">
                    {brunchFlow.map((step, index) => {
                      const isActive = index === activeFlowIndex;

                      return (
                        <button
                          key={step.time}
                          type="button"
                          className={`brunch-flow-step${isActive ? " is-active" : ""}`}
                          onMouseEnter={() => setActiveFlowIndex(index)}
                          onFocus={() => setActiveFlowIndex(index)}
                        >
                          <div className="brunch-flow-marker">
                            <span />
                          </div>
                          <div>
                            <span className="menu-type">{step.time}</span>
                            <h3>{step.title}</h3>
                            <p>{step.copy}</p>
                            <span className="brunch-flow-step-phase">{step.phase}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="brunch-flow-media">
                <div className="brunch-flow-room-tag">
                  <span className="menu-type" style={{ color: "var(--accent)" }}>
                    Room phase
                  </span>
                  <strong>
                    {String(activeFlowIndex + 1).padStart(2, "0")} /{" "}
                    {String(brunchFlow.length).padStart(2, "0")}
                  </strong>
                  <p>{activeFlow.phase}</p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFlow.time}
                    className="brunch-flow-photo"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={activeFlow.image}
                      alt={activeFlow.alt}
                      fill
                      sizes="(max-width: 980px) 100vw, 58vw"
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  className="brunch-flow-overlay"
                  key={activeFlow.status}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="menu-type" style={{ color: "var(--accent)" }}>
                    Current room state
                  </span>
                  <strong>{activeFlow.title}</strong>
                  <p>{activeFlow.status}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={revealInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: "5rem 0 3rem",
            borderTop: "1px solid var(--border)",
            background:
              "linear-gradient(180deg, rgba(245, 231, 214, 0.36) 0%, rgba(252, 243, 232, 0) 100%)",
          }}
        >
          <div className="section-shell">
            <div className="closing-grid">
              <div className="closing-photo">
                <Image
                  src={imageUrls.briochePerdue}
                  alt="Brioche perdue plated for brunch"
                  fill
                  sizes="(max-width: 980px) 100vw, 54vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="closing-copy">
                <p className="section-label" style={{ marginBottom: "0.95rem" }}>
                  Decision moment
                </p>
                <h2 className="section-heading">
                  Last tables
                  <br />
                  before noon.
                </h2>
                <p className="section-body">
                  Reserve before the second round starts and the room slips into a longer,
                  louder brunch. This close now asks for a decision instead of just ending
                  the page politely.
                </p>

                <div className="closing-rows">
                  <div className="closing-row">
                    <strong>Visit</strong>
                    <span>123 W Church St, Orlando, FL 32801</span>
                  </div>
                  <div className="closing-row">
                    <strong>Hours</strong>
                    <span>Mon-Fri 8am-4pm | Sat-Sun 8am-5pm</span>
                  </div>
                  <div className="closing-row">
                    <strong>Reserve</strong>
                    <span>Tables move fast once the second round starts.</span>
                  </div>
                </div>

                <div className="hero-actions" style={{ marginBottom: 0 }}>
                  <a
                    href="https://resy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Book Brunch
                  </a>
                  <Link href="/menu" className="btn-outline">
                    Browse the Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />

      <style>{`
        .home-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
          gap: 0;
          align-items: start;
        }

        .interactive-menu-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
          gap: 2.4rem;
          align-items: start;
        }

        .hero-heading,
        .section-heading {
          font-family: var(--font-display);
          color: var(--text);
          line-height: 0.86;
          letter-spacing: -0.055em;
          margin-bottom: 1rem;
        }

        .hero-heading {
          font-size: clamp(4.5rem, 9.5vw, 7.9rem);
          max-width: 46rem;
        }

        .section-heading {
          font-size: clamp(3.4rem, 6vw, 5.3rem);
        }

        .hero-copy-shell {
          position: relative;
          z-index: 3;
          margin-right: -7.5rem;
          padding-top: 1.6rem;
        }

        .hero-copy-panel {
          max-width: 39rem;
        }

        .hero-body,
        .section-body,
        .hero-operator-item p,
        .closing-row span,
        .reality-lead {
          font-size: 0.96rem;
          line-height: 1.88;
          color: var(--text-muted);
        }

        .hero-body {
          max-width: 26rem;
        }

        .hero-body {
          margin-bottom: 1.85rem;
        }

        .section-body {
          margin-bottom: 1.75rem;
        }

        .hero-actions {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .hero-operator-rail {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.9rem;
          max-width: 40rem;
        }

        .hero-operator-item {
          padding: 1rem 0;
          border-top: 1px solid var(--border-strong);
          border-bottom: 1px solid var(--border);
        }

        .hero-operator-item strong,
        .hero-ticket strong,
        .brunch-flow-overlay strong,
        .closing-row strong {
          display: block;
          margin: 0.5rem 0 0.45rem;
          font-family: var(--font-display);
          font-size: 1.85rem;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: var(--text);
        }

        .hero-collage {
          position: relative;
          min-height: 43rem;
          margin-left: -4.8rem;
          padding-top: 2.8rem;
        }

        .hero-main-photo,
        .hero-float-photo,
        .interactive-detail-media,
        .brunch-flow-photo,
        .closing-photo {
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .hero-main-photo {
          position: absolute;
          inset: 0 4rem 4rem 0;
          border-radius: 10px 36px 10px 36px;
        }

        .hero-float-photo {
          position: absolute;
          border: 4px solid rgba(252, 243, 232, 0.95);
          box-shadow: var(--shadow-lg);
        }

        .hero-float-right {
          top: 1.8rem;
          right: 0;
          width: 13.5rem;
          height: 21rem;
          border-radius: 0 26px 0 26px;
        }

        .hero-float-bottom {
          left: 1.1rem;
          bottom: 0;
          width: 16rem;
          height: 9.8rem;
          border-radius: 0;
        }

        .hero-ticket {
          position: absolute;
          left: 1.3rem;
          top: 1.4rem;
          max-width: 15rem;
          padding: 1rem 1.05rem;
          border: 1px solid rgba(43, 31, 26, 0.12);
          background: rgba(255, 250, 245, 0.94);
          box-shadow: var(--shadow-sm);
        }

        .reality-grid,
        .closing-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          gap: 2.4rem;
          align-items: start;
        }

        .reality-panel {
          display: grid;
          gap: 1rem;
          padding: 1.3rem 1.4rem 1.45rem;
          border: 1px solid var(--border-strong);
          background: rgba(255, 249, 243, 0.84);
          box-shadow: var(--shadow-sm);
        }

        .reality-signal-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .reality-lead-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1.2rem;
          align-items: end;
          padding: 1rem 0 1.15rem;
          border-top: 1px dashed rgba(43, 31, 26, 0.24);
          border-bottom: 1px dashed rgba(43, 31, 26, 0.24);
        }

        .reality-lead-card strong {
          display: block;
          margin: 0.35rem 0 0.5rem;
          font-family: var(--font-display);
          font-size: clamp(4rem, 7vw, 5.7rem);
          line-height: 0.82;
          letter-spacing: -0.06em;
          color: var(--text);
        }

        .reality-ticket {
          display: grid;
          gap: 0.45rem;
          min-width: 13rem;
          padding: 0.85rem 0 0.3rem 1rem;
          border-left: 1px solid var(--border-strong);
          font-family: var(--font-menu);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-light);
        }

        .reality-list {
          display: grid;
          gap: 0.35rem;
        }

        .reality-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(11rem, 14rem);
          align-items: end;
          gap: 1rem;
          padding: 0.9rem 0;
          border-bottom: 1px dashed rgba(43, 31, 26, 0.18);
        }

        .reality-row strong {
          font-family: var(--font-display);
          font-size: 2.25rem;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: var(--text);
        }

        .reality-row-copy {
          display: grid;
          gap: 0.45rem;
        }

        .reality-row-meta {
          display: grid;
          gap: 0.45rem;
          justify-items: end;
        }

        .reality-row.is-leading strong {
          color: var(--accent);
        }

        .reality-row-bar {
          display: block;
          width: 100%;
          height: 7px;
          background: rgba(43, 31, 26, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }

        .reality-row-bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent) 0%, var(--gold) 100%);
        }

        .reality-quote {
          border-left: 2px solid var(--accent);
          padding-left: 1.4rem;
          align-self: center;
        }

        .reality-quote blockquote {
          margin-top: 0.65rem;
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 4vw, 3rem);
          line-height: 0.96;
          letter-spacing: -0.04em;
          color: var(--text);
        }

        .reality-quote p {
          margin-top: 0.9rem;
          color: var(--text-light);
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .interactive-menu-grid {
          align-items: start;
        }

        .interactive-menu-list {
          display: grid;
          gap: 0.8rem;
        }

        .interactive-menu-button {
          width: 100%;
          text-align: left;
          border: none;
          border-top: 1px solid var(--border-strong);
          border-bottom: 1px solid transparent;
          background: transparent;
          padding: 1rem 0;
          cursor: pointer;
          transition: transform 0.2s ease, color 0.2s ease;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 0.9rem;
        }

        .interactive-menu-button h3 {
          margin-top: 0.5rem;
          font-family: var(--font-display);
          font-size: 2.1rem;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: var(--text);
          transition: color 0.2s ease;
        }

        .interactive-menu-button strong {
          align-self: start;
          font-family: var(--font-menu);
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          color: var(--accent);
        }

        .interactive-menu-button p {
          grid-column: 1 / -1;
          color: var(--text-muted);
          font-size: 0.92rem;
          line-height: 1.72;
        }

        .interactive-menu-button:hover,
        .interactive-menu-button:focus-visible,
        .interactive-menu-button.is-active {
          transform: translateX(8px);
          outline: none;
        }

        .interactive-menu-button:hover h3,
        .interactive-menu-button:focus-visible h3,
        .interactive-menu-button.is-active h3 {
          color: var(--accent);
        }

        .interactive-detail-shell {
          position: sticky;
          top: 6.8rem;
          display: grid;
          gap: 0.9rem;
        }

        .interactive-preview-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: end;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-strong);
        }

        .interactive-preview-head strong {
          display: block;
          margin-top: 0.45rem;
          font-family: var(--font-display);
          font-size: 2.35rem;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: var(--text);
        }

        .interactive-preview-pips {
          display: flex;
          gap: 0.45rem;
          align-self: center;
        }

        .interactive-preview-pips span {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 999px;
          background: rgba(43, 31, 26, 0.14);
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .interactive-preview-pips span.is-active {
          background: var(--accent);
          transform: scale(1.25);
        }

        .interactive-detail-card {
          display: grid;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid rgba(43, 31, 26, 0.08);
          background: rgba(255, 250, 245, 0.82);
          box-shadow: var(--shadow-lg);
        }

        .interactive-detail-media {
          min-height: 27rem;
          border-radius: 10px 36px 10px 36px;
        }

        .interactive-detail-flag {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: end;
          padding: 0.9rem 1rem;
          background: rgba(27, 20, 18, 0.62);
          backdrop-filter: blur(12px);
          color: #fff;
        }

        .interactive-detail-flag strong,
        .brunch-flow-room-tag strong {
          display: block;
          margin: 0.4rem 0 0.2rem;
          font-family: var(--font-display);
          font-size: 2rem;
          line-height: 0.9;
          letter-spacing: -0.04em;
        }

        .interactive-detail-flag p,
        .brunch-flow-room-tag p {
          font-size: 0.75rem;
          line-height: 1.5;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
        }

        .interactive-detail-copy {
          padding: 0.4rem 0.2rem 0.2rem;
          border-top: 1px solid var(--border-strong);
        }

        .interactive-detail-copy h3 {
          margin-top: 0.55rem;
          font-family: var(--font-display);
          font-size: 2.7rem;
          line-height: 0.92;
          letter-spacing: -0.05em;
          color: var(--text);
        }

        .interactive-detail-copy p {
          margin-top: 1rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.82;
        }

        .interactive-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1.15rem;
        }

        .interactive-detail-tags span {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0.5rem 0.8rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(43, 31, 26, 0.1);
          color: var(--text);
          font-family: var(--font-menu);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .brunch-flow-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
          gap: 3.4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .brunch-flow-ambient {
          position: absolute;
          top: 10%;
          right: -10%;
          width: 26rem;
          height: 26rem;
          border-radius: 999px;
          filter: blur(32px);
          opacity: 0.82;
        }

        .brunch-flow-copy {
          display: grid;
          gap: 1rem;
        }

        .brunch-flow-timeline {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 1.1rem;
          align-items: start;
        }

        .brunch-flow-line {
          position: relative;
          width: 2px;
          height: 100%;
          min-height: 24rem;
          background: rgba(43, 31, 26, 0.12);
          margin-left: 0.55rem;
          margin-top: 0.35rem;
        }

        .brunch-flow-line span {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: linear-gradient(180deg, var(--accent) 0%, var(--gold) 100%);
          transition: height 0.3s ease;
        }

        .brunch-flow-steps {
          display: grid;
          gap: 0.8rem;
        }

        .brunch-flow-step {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 1rem;
          padding: 0;
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .brunch-flow-marker {
          position: relative;
          width: 1.2rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 0.2rem;
        }

        .brunch-flow-marker span {
          width: 0.85rem;
          height: 0.85rem;
          border-radius: 999px;
          border: 2px solid rgba(43, 31, 26, 0.2);
          background: var(--bg);
          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }

        .brunch-flow-step h3 {
          margin-top: 0.5rem;
          font-family: var(--font-display);
          font-size: 2rem;
          line-height: 0.94;
          letter-spacing: -0.04em;
          color: var(--text);
          transition: color 0.2s ease;
        }

        .brunch-flow-step p {
          margin-top: 0.55rem;
          color: var(--text-muted);
          font-size: 0.93rem;
          line-height: 1.75;
          max-width: 22rem;
        }

        .brunch-flow-step-phase {
          display: inline-flex;
          margin-top: 0.7rem;
          font-family: var(--font-menu);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-light);
        }

        .brunch-flow-step .menu-type {
          color: var(--text-light);
          transition: color 0.2s ease;
        }

        .brunch-flow-step.is-active .menu-type,
        .brunch-flow-step:hover .menu-type {
          color: var(--accent);
        }

        .brunch-flow-step.is-active h3,
        .brunch-flow-step:hover h3 {
          color: var(--accent);
        }

        .brunch-flow-step.is-active .brunch-flow-marker span,
        .brunch-flow-step:hover .brunch-flow-marker span {
          background: var(--accent);
          border-color: var(--accent);
          transform: scale(1.08);
        }

        .brunch-flow-media {
          position: relative;
          min-height: 43rem;
        }

        .brunch-flow-room-tag {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          z-index: 2;
          min-width: 10rem;
          padding: 0.9rem 1rem;
          background: rgba(255, 249, 243, 0.92);
          box-shadow: var(--shadow-sm);
        }

        .brunch-flow-photo {
          position: absolute;
          inset: 0 0 2.5rem 0;
          border-radius: 0 38px 0 38px;
        }

        .brunch-flow-overlay {
          position: absolute;
          left: -1.5rem;
          bottom: 0;
          width: min(21rem, 100%);
          padding: 1.15rem 1.2rem;
          background: rgba(255, 250, 244, 0.94);
          box-shadow: var(--shadow-lg);
          border-left: 4px solid var(--accent);
        }

        .brunch-flow-overlay p {
          margin-top: 0.35rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.76;
        }

        .closing-grid {
          align-items: center;
        }

        .closing-photo {
          min-height: 29rem;
          border-radius: 0 30px 0 30px;
        }

        .closing-copy {
          display: grid;
          gap: 1rem;
        }

        .closing-rows {
          border-top: 1px solid var(--border-strong);
        }

        .closing-row {
          display: grid;
          gap: 0.35rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }

        .closing-row strong {
          margin: 0;
          font-size: 1.55rem;
        }

        @media (max-width: 1080px) {
          .home-hero-grid,
          .interactive-menu-grid,
          .reality-grid,
          .closing-grid,
          .brunch-flow-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-copy-shell {
            margin-right: 0;
            padding-top: 0;
          }

          .hero-collage {
            margin-left: 0;
            padding-top: 0;
          }

          .interactive-detail-shell {
            position: static;
          }

          .brunch-flow-overlay {
            left: 1rem;
            right: 1rem;
            width: auto;
          }

          .reality-lead-card {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 920px) {
          .hero-operator-rail {
            grid-template-columns: 1fr;
          }

          .hero-collage {
            min-height: 34rem;
          }

          .hero-main-photo {
            inset: 0 2.4rem 3.4rem 0;
          }

          .hero-float-right {
            width: 11rem;
            height: 16rem;
          }

          .hero-float-bottom {
            width: 12rem;
            height: 7.4rem;
          }

          .brunch-flow-line {
            min-height: 20rem;
          }

          .brunch-flow-media {
            min-height: 34rem;
          }

          .reality-row {
            grid-template-columns: 1fr;
          }

          .reality-row-meta {
            justify-items: start;
          }
        }

        @media (max-width: 720px) {
          section:first-of-type {
            padding-top: 7.6rem !important;
          }

          .hero-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .hero-collage {
            min-height: 30rem;
          }

          .hero-main-photo {
            inset: 0 1.2rem 2.8rem 0;
          }

          .hero-float-right {
            top: 1rem;
            width: 8.8rem;
            height: 12.4rem;
          }

          .hero-float-bottom {
            width: 9rem;
            height: 6rem;
            left: 0.7rem;
          }

          .hero-ticket {
            left: 1rem;
            top: 1rem;
            max-width: 12.5rem;
            padding: 0.85rem 0.9rem;
          }

          .reality-row,
          .interactive-menu-button,
          .brunch-flow-step {
            grid-template-columns: 1fr;
          }

          .interactive-menu-button strong {
            justify-self: start;
          }

          .brunch-flow-timeline {
            grid-template-columns: 1fr;
          }

          .brunch-flow-line {
            display: none;
          }

          .brunch-flow-overlay {
            left: 0;
            right: 0;
          }

          .interactive-preview-head {
            align-items: start;
            flex-direction: column;
          }

          .interactive-detail-flag {
            display: grid;
          }
        }
      `}</style>
    </>
  );
}
