"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero ornament for Krellix. The metaphor is a wax seal on a
 * document: a hairline margin rule meets a gold seal disc that
 * pens itself in with a brief arc. Deliberately quieter than a
 * CCS-style mandala — this product's aesthetic is "page of a
 * deposition," not "brand mark." Reduced-motion safe.
 */
export function HeroOrnament({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 480 480"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="krellix-hero-seal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-seal)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#8F6724" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="krellix-hero-seal-gloss" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F4ECD6" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#F4ECD6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Document margin rule — hairline across the page */}
      <motion.path
        d="M40 240 H440"
        stroke="var(--color-border-strong)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Faint outer seal guide — the impression halo */}
      <motion.circle
        cx="240"
        cy="240"
        r="150"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1"
        strokeDasharray="2 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.4 }}
      />

      {/* Inner seal guide */}
      <motion.circle
        cx="240"
        cy="240"
        r="96"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 1.8, delay: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* The wax seal — solid gold disc, drawn last */}
      <motion.circle
        cx="240"
        cy="240"
        r="52"
        fill="url(#krellix-hero-seal)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="240"
        cy="240"
        r="52"
        fill="url(#krellix-hero-seal-gloss)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 1.3 }}
      />

      {/* Seal glyph — a stylized K impressed into the wax */}
      <motion.path
        d="M228 216 v48 M228 240 l18 -18 M228 240 l20 20"
        stroke="#3A2A12"
        strokeOpacity="0.75"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Tiny date-stamp tick on the margin, right of the seal */}
      <motion.circle
        cx="360"
        cy="240"
        r="2.5"
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 2 }}
      />
      <motion.circle
        cx="120"
        cy="240"
        r="2.5"
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 2.1 }}
      />
    </svg>
  );
}
