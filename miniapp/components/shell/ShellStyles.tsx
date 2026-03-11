import React from 'react';

export function ShellStyles() {
  return (
    <style>{`
      body {
        font-family: "Avenir Next", "Segoe UI Variable", "Trebuchet MS", "Gill Sans", sans-serif;
        letter-spacing: 0.01em;
      }

      .brand-display {
        font-family: "Fraunces", "Iowan Old Style", "Palatino Linotype", serif;
        letter-spacing: -0.02em;
      }

      .brand-surface {
        box-shadow: 0 18px 44px rgba(8, 19, 18, 0.18);
      }

      .brand-card {
        box-shadow: 0 30px 72px rgba(7, 18, 16, 0.2);
        backdrop-filter: blur(4px);
      }

      .brand-hero {
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 30px 70px rgba(8, 19, 18, 0.2);
        position: relative;
        overflow: hidden;
      }

      .brand-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(135deg, rgba(255, 255, 255, 0.24), transparent 45%),
          radial-gradient(130% 160% at 0% 100%, rgba(244, 166, 90, 0.16), transparent 60%);
      }

      .hero-graphic::before,
      .hero-graphic::after {
        content: '';
        position: absolute;
        border-radius: 9999px;
        pointer-events: none;
      }

      .hero-graphic::before {
        width: 360px;
        height: 360px;
        right: -120px;
        top: -120px;
        background: radial-gradient(circle, rgba(34, 164, 127, 0.45), transparent 68%);
        opacity: 0.28;
        animation: driftA 14s ease-in-out infinite;
      }

      .hero-graphic::after {
        width: 320px;
        height: 320px;
        left: -120px;
        bottom: -160px;
        background: radial-gradient(circle, rgba(247, 170, 103, 0.52), transparent 70%);
        opacity: 0.25;
        animation: driftB 18s ease-in-out infinite;
      }

      .mesh-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
        background-size: 26px 26px;
        mask-image: radial-gradient(circle at 65% 30%, black 35%, transparent 80%);
      }

      .motion-card {
        transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
        position: relative;
      }

      .motion-card:hover {
        transform: translateY(-4px);
        border-color: color-mix(in srgb, var(--brand-forest) 45%, transparent);
        box-shadow: 0 16px 32px rgba(8, 20, 18, 0.16);
      }

      .content-stage {
        animation: contentIn 320ms ease;
      }

      .logo-float {
        animation: logoFloat 3.2s ease-in-out infinite;
      }

      .hero-ring {
        animation: ringPulse 2.8s ease-in-out infinite;
      }

      @keyframes contentIn {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes logoFloat {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-4px);
        }
      }

      @keyframes ringPulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 0.55;
        }
        50% {
          transform: scale(1.08);
          opacity: 0.25;
        }
      }

      @keyframes driftA {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-18px, 14px);
        }
      }

      @keyframes driftB {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(18px, -12px);
        }
      }

      .brand-button {
        background-image: linear-gradient(120deg, #1b8a6d, #f3a95e);
        transition: transform 200ms ease, box-shadow 200ms ease, filter 200ms ease;
        border: 1px solid rgba(255, 255, 255, 0.22);
      }

      .brand-button:hover {
        filter: brightness(1.04);
        box-shadow: 0 20px 36px rgba(15, 31, 28, 0.24);
      }

      .brand-button:disabled {
        filter: grayscale(0.2) brightness(0.9);
        box-shadow: none;
        cursor: not-allowed;
      }

      .takeover-glow {
        box-shadow: 0 0 0 1px rgba(31, 111, 91, 0.2), 0 14px 36px rgba(31, 111, 91, 0.24);
      }

      .takeover-pulse {
        animation: takeoverPulse 2.4s ease-in-out infinite;
      }

      @keyframes takeoverPulse {
        0%,
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(127, 191, 122, 0.4);
        }
        50% {
          transform: scale(1.01);
          box-shadow: 0 0 0 10px rgba(127, 191, 122, 0);
        }
      }

      .brand-root {
        --brand-ink: #10211f;
        --brand-forest: #1b8a6d;
        --brand-leaf: #5bc7a2;
        --brand-sun: #f3a95e;
        --brand-sand: #f7efe2;
        --brand-cream: #fff9f1;
        background-color: #f3ebdc;
        background-image:
          radial-gradient(1200px 700px at 0% -6%, rgba(91, 199, 162, 0.28), transparent),
          radial-gradient(900px 620px at 100% 4%, rgba(243, 169, 94, 0.26), transparent),
          linear-gradient(180deg, #f6efdf 0%, #efe2cd 100%);
        background-size: 120% 120%, 120% 120%, 100% 100%;
        animation: brandGlow 20s ease-in-out infinite;
      }

      @keyframes brandGlow {
        0%,
        100% {
          background-position: 0% 0%, 100% 0%;
        }
        50% {
          background-position: 30% 10%, 70% 20%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .brand-root {
          animation: none;
        }

        .hero-graphic::before,
        .hero-graphic::after,
        .content-stage,
        .logo-float,
        .hero-ring {
          animation: none !important;
        }

        .motion-card {
          transition: none;
        }
      }

      @media (prefers-color-scheme: dark) {
        body {
          background-color: #081411;
          color: #e7f8f1;
        }

        .brand-root {
          --brand-ink: #e7f8f1;
          --brand-forest: #66d8b6;
          --brand-leaf: #7bdcc6;
          --brand-sun: #ffbf76;
          --brand-sand: #081411;
          --brand-cream: #10201c;
          background-color: var(--brand-sand);
          background-image:
            radial-gradient(1000px 640px at 8% -2%, rgba(91, 199, 162, 0.28), transparent),
            radial-gradient(900px 560px at 92% 8%, rgba(243, 169, 94, 0.24), transparent);
        }

        .brand-surface {
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
          border-color: rgba(155, 225, 176, 0.18) !important;
        }

        .brand-card {
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.6);
          border-color: rgba(155, 225, 176, 0.18) !important;
        }

        .brand-button {
          background-image: linear-gradient(120deg, rgba(102, 216, 182, 0.75), rgba(255, 191, 118, 0.75));
        }

        .tab-pill {
          background-color: rgba(16, 32, 28, 0.9);
        }
      }

      .brand-input {
        color: var(--brand-ink);
        background-color: var(--brand-cream);
        caret-color: var(--brand-forest);
      }

      .module-shell {
        position: relative;
        overflow: hidden;
        border-radius: 1.25rem;
      }

      .module-shell::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(91, 199, 162, 0.12), transparent 55%),
          radial-gradient(120% 120% at 100% 100%, rgba(243, 169, 94, 0.14), transparent 55%);
      }

      .module-grid-bg {
        position: relative;
      }

      .module-grid-bg::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(16, 33, 31, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 33, 31, 0.05) 1px, transparent 1px);
        background-size: 22px 22px;
        mask-image: linear-gradient(to bottom, black 10%, transparent 80%);
      }

      .glass-tile {
        border: 1px solid color-mix(in srgb, var(--brand-leaf) 35%, transparent);
        background: color-mix(in srgb, var(--brand-cream) 88%, white);
        backdrop-filter: blur(4px);
        border-radius: 1rem;
      }

      .module-accent-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        border-radius: 9999px;
        border: 1px solid rgba(27, 138, 109, 0.35);
        background: rgba(255, 255, 255, 0.72);
        padding: 0.25rem 0.55rem;
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: color-mix(in srgb, var(--brand-forest) 78%, black);
      }

      .module-banner {
        position: relative;
        overflow: hidden;
        border-radius: 0.85rem;
        padding: 0.55rem 0.7rem;
        margin-bottom: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.35);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }

      .module-banner::after {
        content: "";
        position: absolute;
        top: 0;
        left: -45%;
        width: 40%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.45), transparent);
        animation: bannerSweep 5.8s ease-in-out infinite;
      }

      .module-banner-token {
        background: linear-gradient(115deg, rgba(33, 145, 117, 0.22), rgba(126, 220, 198, 0.18));
      }

      .module-banner-bridge {
        background: linear-gradient(115deg, rgba(69, 124, 220, 0.24), rgba(120, 190, 255, 0.2));
      }

      .module-banner-staking {
        background: linear-gradient(115deg, rgba(46, 157, 107, 0.24), rgba(241, 187, 104, 0.2));
      }

      .module-banner-governance {
        background: linear-gradient(115deg, rgba(87, 130, 224, 0.24), rgba(144, 112, 230, 0.2));
      }

      .module-banner-sale {
        background: linear-gradient(115deg, rgba(245, 148, 88, 0.25), rgba(237, 202, 120, 0.2));
      }

      @keyframes bannerSweep {
        0%,
        100% {
          left: -45%;
          opacity: 0;
        }
        40% {
          opacity: 0.7;
        }
        60% {
          left: 110%;
          opacity: 0;
        }
      }
    `}</style>
  );
}
