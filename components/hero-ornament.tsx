"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero ornament — an editorial "title page glimpse" of an export
 * package. A typeset folio cover with margin foliation, a wax seal
 * impression, a TSA receipt, and a strip of redacted hash digits.
 *
 * The metaphor: the operator is looking at the cover sheet of a
 * sealed deposition exhibit. Reduced-motion safe.
 */
export function HeroOrnament({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const t = (s: number) => (reduce ? 0 : s);

  return (
    <div className={className}>
      <div className="relative mx-auto aspect-[4/5] max-w-[26rem]">
        {/* Back card — date stamp peeking from behind */}
        <motion.div
          initial={{ opacity: 0, y: t(20), rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: t(1.0), ease, delay: t(0.4) }}
          className="absolute -right-3 top-8 h-44 w-44 origin-bottom-left border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-4"
        >
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
            DigiCert · TSA
          </p>
          <div className="mt-2 h-px bg-[var(--color-border)]" />
          <p className="mt-3 font-display text-[1.625rem] leading-none italic text-[color:var(--color-ink)]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}>
            Filed
          </p>
          <p className="mt-1 font-display text-[2rem] leading-none tracking-[-0.015em] text-[color:var(--color-ink)]">
            2026·V·09
          </p>
          <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
            14:47:05 UTC
          </p>
        </motion.div>

        {/* Front card — the manifest title sheet */}
        <motion.div
          initial={{ opacity: 0, y: t(28), rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: t(1.1), ease, delay: t(0.15) }}
          className="grain absolute left-0 top-0 flex h-full w-[88%] flex-col bg-[var(--color-bg)] shadow-[0_24px_60px_-32px_rgba(20,23,28,0.35),0_4px_10px_-4px_rgba(20,23,28,0.18)] ring-1 ring-[color:color-mix(in_srgb,var(--color-rule)_60%,transparent)]"
        >
          {/* Outer rule */}
          <div className="m-3 flex flex-1 flex-col border border-[var(--color-rule)] p-5">
            {/* Folio header */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-subtle)]">
                Krellix · Mail · v3.1
              </p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-subtle)]">
                Folio 01 / 09
              </p>
            </div>
            <div className="mt-2 h-px bg-[var(--color-rule)]" />

            {/* Title */}
            <div className="mt-7">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--color-ink-subtle)]">
                Chain of Custody
              </p>
              <p className="mt-3 font-display text-[1.875rem] leading-[0.95] tracking-[-0.018em] text-[color:var(--color-ink)]">
                Marquez, D.
              </p>
              <p className="font-display italic text-[1.5rem] leading-[1.1] tracking-[-0.012em] text-[color:var(--color-ink-muted)]" style={{ fontVariationSettings: '"opsz" 144' }}>
                v. Miller Scott Law
              </p>
            </div>

            {/* Hash strip — animates in */}
            <div className="mt-7">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
                Manifest SHA-256
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: t(0.6), delay: t(0.9) }}
                className="mt-1.5 break-all font-mono text-[0.6875rem] leading-[1.55] text-[color:var(--color-ink-soft)]"
              >
                a4f7b1c<span className="text-[color:var(--color-ink-subtle)]">·</span>d23e9a5<span className="text-[color:var(--color-ink-subtle)]">·</span>8b7c0f4<span className="text-[color:var(--color-ink-subtle)]">·</span>1e62d7a<span className="text-[color:var(--color-ink-subtle)]">·</span>5c4b9f2<span className="text-[color:var(--color-ink-subtle)]">·</span>0ad8e3b
              </motion.div>
            </div>

            <div className="mt-6 flex-1" />

            {/* Bottom — operator initials + foliation rule */}
            <div className="mt-2">
              <div className="h-px bg-[var(--color-rule)]" />
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
                    Operator
                  </p>
                  <p className="mt-1 font-display italic text-[1.125rem] leading-none text-[color:var(--color-ink)]" style={{ fontVariationSettings: '"opsz" 144' }}>
                    J. Rourke
                  </p>
                </div>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
                  6,294 files
                </p>
              </div>
            </div>
          </div>

          {/* Wax seal — bottom-right corner of the front card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: t(0.7), delay: t(1.4), ease }}
            className="absolute -bottom-7 -right-7 select-none"
            aria-hidden="true"
          >
            <WaxSeal />
          </motion.div>
        </motion.div>

        {/* Foliation tab — top-left corner overlap, asymmetric */}
        <motion.div
          initial={{ opacity: 0, x: t(-12) }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: t(0.6), delay: t(0.7) }}
          className="absolute -left-2 top-12 rotate-[-90deg] origin-top-left"
        >
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.32em] text-[color:var(--color-ink-subtle)]">
            Sealed · Verified · Admissible
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function WaxSeal() {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="wax-body" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#C0432F" />
          <stop offset="55%" stopColor="#8E2A1E" />
          <stop offset="100%" stopColor="#4F1408" />
        </radialGradient>
        <radialGradient id="wax-gloss" cx="38%" cy="30%" r="35%">
          <stop offset="0%" stopColor="rgba(255,220,200,0.7)" />
          <stop offset="100%" stopColor="rgba(255,220,200,0)" />
        </radialGradient>
        <filter id="wax-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dx="0" dy="2" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Wax irregular blob — hand-drawn, not perfectly circular */}
      <g filter="url(#wax-shadow)">
        <path
          d="M56 6 C 73 4 92 14 100 32 C 108 50 105 72 92 86 C 80 100 60 108 42 100 C 22 92 8 78 6 56 C 4 36 16 18 32 10 C 39 7 48 7 56 6 Z"
          fill="url(#wax-body)"
        />
        {/* Drips */}
        <path d="M28 96 c 0 6 -2 10 -5 10 c -2 0 -3 -3 -3 -7 c 0 -3 1 -5 4 -7 z" fill="#5B1A11" opacity="0.85" />
        <path d="M86 92 c 1 5 3 9 6 9 c 2 0 3 -3 2 -6 c -1 -2 -3 -4 -8 -5 z" fill="#5B1A11" opacity="0.85" />
      </g>
      {/* Inner ring */}
      <circle cx="56" cy="56" r="38" fill="none" stroke="#3A0E07" strokeWidth="1" strokeOpacity="0.4" />
      {/* Embossed K */}
      <g opacity="0.92">
        <path
          d="M44 36 v40 M44 56 l16 -18 M44 56 l18 20"
          stroke="#2A0A05"
          strokeWidth="3.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M44 36 v40 M44 56 l16 -18 M44 56 l18 20"
          stroke="#FBE3C0"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
          opacity="0.55"
          transform="translate(-0.7,-0.7)"
        />
      </g>
      {/* Tiny stars around the rim */}
      <g fill="#3A0E07" opacity="0.4">
        <circle cx="56" cy="20" r="1" />
        <circle cx="92" cy="56" r="1" />
        <circle cx="56" cy="92" r="1" />
        <circle cx="20" cy="56" r="1" />
      </g>
      {/* Specular gloss */}
      <ellipse cx="42" cy="38" rx="22" ry="14" fill="url(#wax-gloss)" />
    </svg>
  );
}
