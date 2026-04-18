"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const reserveSignals = [
  {
    eyebrow: "Reserve for Saturday",
    headline: "Next available 10:45am",
    detail: "Tables fill by 11am on weekends.",
  },
  {
    eyebrow: "This morning",
    headline: "2 seats left at the bar",
    detail: "Walk-ins move fastest before 9.",
  },
  {
    eyebrow: "Late brunch",
    headline: "Best window after 1pm",
    detail: "The room softens once the first rush clears.",
  },
];

export default function StickyReserveBar() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [signalIndex, setSignalIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCompact(latest > 220);
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSignalIndex((current) => (current + 1) % reserveSignals.length);
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSignal = reserveSignals[signalIndex] ?? reserveSignals[0];

  if (dismissed) {
    return null;
  }

  return (
    <motion.div
      className="sticky-reserve-bar"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <motion.div
        className="sticky-reserve-shell"
        animate={{
          scale: compact ? 0.985 : 1,
          backgroundColor: compact
            ? "rgba(246, 231, 214, 0.97)"
            : "rgba(255, 249, 242, 0.88)",
          borderColor: compact
            ? "rgba(179, 93, 61, 0.22)"
            : "rgba(43, 31, 26, 0.1)",
        }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="sticky-reserve-close"
          aria-label="Close reserve bar"
          onClick={() => setDismissed(true)}
        >
          x
        </button>

        <div className="sticky-reserve-copy">
          <span className="menu-type" style={{ color: "var(--accent)" }}>
            {activeSignal.eyebrow}
          </span>
          <strong>{activeSignal.headline}</strong>
          <span>{compact ? "Reserve before the rush." : activeSignal.detail}</span>
        </div>

        <div className="sticky-reserve-actions">
          <Link href="/menu" className="sticky-link">
            View menu
          </Link>
          <a
            href="https://resy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ minHeight: "44px", padding: "0.78rem 1.15rem" }}
          >
            Reserve now
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
