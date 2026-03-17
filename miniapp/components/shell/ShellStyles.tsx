import React from 'react';

export function ShellStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;700&display=swap');

      :root {
        --brand-ink: #0d1628;
        --brand-muted: #4a5a77;
        --brand-forest: #0b5e71;
        --brand-leaf: #1d4ed8;
        --brand-sun: #ea580c;
        --brand-sand: #f1f5fb;
        --brand-cream: #f8fbff;
      }

      body {
        margin: 0;
        font-family: 'Plus Jakarta Sans', 'Segoe UI Variable', 'Segoe UI', sans-serif;
        letter-spacing: 0.002em;
        color: var(--brand-ink);
        background: #edf2f8;
      }

      .brand-display {
        font-family: 'Sora', 'Segoe UI Variable', sans-serif;
        letter-spacing: -0.018em;
      }

      .brand-root {
        position: relative;
        min-height: 100vh;
        background:
          radial-gradient(900px 540px at -10% -12%, rgba(29, 78, 216, 0.14), transparent 62%),
          radial-gradient(760px 420px at 110% -10%, rgba(11, 94, 113, 0.14), transparent 58%),
          linear-gradient(180deg, #f5f8fd 0%, #edf3fb 46%, #e8eef8 100%);
      }

      .brand-root::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
        background-size: 34px 34px;
        mask-image: radial-gradient(circle at 50% 10%, black 14%, transparent 72%);
        opacity: 0.28;
        z-index: 0;
      }

      .brand-root > * {
        position: relative;
        z-index: 1;
      }

      .brand-surface {
        box-shadow: 0 22px 52px rgba(10, 20, 40, 0.16);
      }

      .brand-card {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(245, 250, 255, 0.88));
        border: 1px solid rgba(10, 20, 40, 0.12);
        box-shadow: 0 18px 44px rgba(10, 20, 40, 0.12);
        backdrop-filter: blur(7px);
      }

      .brand-hero {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(10, 20, 40, 0.12);
        background:
          linear-gradient(132deg, rgba(255, 255, 255, 0.98), rgba(245, 248, 255, 0.95)),
          radial-gradient(circle at 84% 18%, rgba(29, 78, 216, 0.15), transparent 48%);
        box-shadow: 0 18px 40px rgba(10, 20, 40, 0.12);
      }

      .brand-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
            radial-gradient(110% 140% at 0% 0%, rgba(14, 165, 233, 0.2), transparent 58%),
            radial-gradient(120% 130% at 100% 100%, rgba(2, 132, 199, 0.12), transparent 60%);
      }

      .hero-graphic::before,
      .hero-graphic::after {
        content: '';
        position: absolute;
        pointer-events: none;
        border-radius: 999px;
      }

      .hero-graphic::before {
        width: 320px;
        height: 320px;
        right: -100px;
        top: -120px;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.28), transparent 70%);
        opacity: 0.52;
        animation: driftA 13s ease-in-out infinite;
      }

      .hero-graphic::after {
        width: 280px;
        height: 280px;
        left: -90px;
        bottom: -120px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.24), transparent 70%);
        opacity: 0.45;
        animation: driftB 15s ease-in-out infinite;
      }

      .mesh-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
        background-size: 24px 24px;
        mask-image: radial-gradient(circle at 20% 25%, black 18%, transparent 76%);
        opacity: 0.32;
      }

      .motion-card {
        transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
        border-radius: 0.95rem;
      }

      .motion-card:hover {
        transform: translateY(-4px);
        border-color: rgba(3, 105, 161, 0.52);
        box-shadow: 0 16px 38px rgba(10, 20, 40, 0.14);
      }

      .metric-card {
        animation: metricFloat 6.4s ease-in-out infinite;
      }

      .metric-card:nth-child(2) {
        animation-delay: 180ms;
      }

      .metric-card:nth-child(3) {
        animation-delay: 360ms;
      }

      .content-stage {
        animation: contentIn 380ms ease;
      }

      .logo-float {
        animation: logoFloat 3.2s ease-in-out infinite;
      }

      .hero-ring {
        animation: ringPulse 2.8s ease-in-out infinite;
      }

      .reveal-up {
        animation: revealUp 420ms ease both;
      }

      .stagger-1 {
        animation-delay: 80ms;
      }

      .stagger-2 {
        animation-delay: 140ms;
      }

      .stagger-3 {
        animation-delay: 210ms;
      }

      .brand-button {
        border: 1px solid rgba(3, 105, 161, 0.45);
        background: linear-gradient(120deg, #1d4ed8, #0891b2);
        color: #ffffff;
        box-shadow: 0 10px 24px rgba(3, 105, 161, 0.3);
        transition: transform 180ms ease, filter 180ms ease;
      }

      .brand-button:hover {
        transform: translateY(-1px);
        filter: brightness(1.04);
      }

      .brand-button:disabled {
        filter: grayscale(0.2) brightness(0.9);
        box-shadow: none;
        cursor: not-allowed;
      }

      .brand-input {
        color: var(--brand-ink);
        background: rgba(255, 255, 255, 0.85);
        border-color: rgba(8, 145, 178, 0.28);
        caret-color: var(--brand-leaf);
      }

      .brand-input::placeholder {
        color: rgba(71, 85, 105, 0.8);
      }

      .brand-panel {
        position: relative;
        overflow: hidden;
        border-radius: 1.2rem;
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(242, 248, 255, 0.9));
        box-shadow: 0 18px 44px rgba(10, 20, 40, 0.12);
        backdrop-filter: blur(8px);
      }

      .brand-panel::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.45), transparent 28%),
            radial-gradient(120% 90% at 0% 0%, rgba(37, 99, 235, 0.12), transparent 58%);
      }

      .brand-panel > * {
        position: relative;
        z-index: 1;
      }

      .scanline-panel::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: linear-gradient(to bottom, rgba(2, 6, 23, 0.06) 1px, transparent 1px);
        background-size: 100% 4px;
        opacity: 0.22;
        mask-image: linear-gradient(to bottom, black 0%, transparent 82%);
      }

      .kicker-label {
        font-family: 'IBM Plex Mono', 'Segoe UI', monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(11, 18, 35, 0.58);
      }

      .status-rail {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: linear-gradient(90deg, rgba(29, 78, 216, 0.11), rgba(14, 165, 233, 0.08));
        border-radius: 0.72rem;
        padding: 0.45rem 0.62rem;
      }

      .status-rail-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #0284c7;
        box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.2);
      }

      .telemetry-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.7rem;
        border-top: 1px solid rgba(10, 20, 40, 0.1);
        padding: 0.46rem 0;
      }

      .telemetry-row:first-child {
        border-top: none;
        padding-top: 0;
      }

      .telemetry-key {
        font-family: 'IBM Plex Mono', 'Segoe UI', monospace;
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(11, 18, 35, 0.64);
      }

      .telemetry-value {
        font-weight: 700;
        color: #0b1223;
      }

      .brand-secondary-button {
        border: 1px solid rgba(8, 145, 178, 0.3);
        background: rgba(255, 255, 255, 0.85);
        color: var(--brand-ink);
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
      }

      .brand-secondary-button:hover {
        transform: translateY(-1px);
        border-color: rgba(8, 145, 178, 0.52);
        background: rgba(255, 255, 255, 0.98);
      }

      .brand-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        border-radius: 9999px;
        border: 1px solid rgba(10, 20, 40, 0.14);
        background: rgba(255, 255, 255, 0.84);
        padding: 0.26rem 0.62rem;
      }

      .brand-pill-soft {
        border-color: rgba(3, 105, 161, 0.22);
        background: rgba(230, 244, 255, 0.8);
      }

      .brand-stat-card {
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(238, 246, 255, 0.88));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
      }

      .brand-highlight-bar {
        border: 1px solid rgba(3, 105, 161, 0.24);
        background: linear-gradient(90deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.12));
      }

      .visual-orb-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.5rem;
      }

      .visual-icon-tile {
        border: 1px solid rgba(10, 20, 40, 0.12);
        background: rgba(255, 255, 255, 0.92);
        border-radius: 0.95rem;
        padding: 0.52rem;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-weight: 700;
        font-size: 11px;
        color: var(--brand-ink);
        box-shadow: 0 10px 20px rgba(10, 20, 40, 0.08);
        transition: transform 220ms ease, border-color 220ms ease;
      }

      .visual-icon-tile:hover {
        transform: translateY(-2px);
        border-color: rgba(8, 145, 178, 0.45);
      }

      .visual-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #0891b2;
        box-shadow: 0 0 0 4px rgba(8, 145, 178, 0.18);
        animation: visualDotPulse 2.8s ease-in-out infinite;
      }

      .signal-constellation {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem;
      }

      .pulse-bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 20px;
      }

      .pulse-bars span {
        width: 4px;
        border-radius: 999px;
        background: linear-gradient(180deg, #0ea5e9, #1d4ed8);
        animation: pulseBars 1.4s ease-in-out infinite;
      }

      .pulse-bars span:nth-child(2) { animation-delay: 120ms; }
      .pulse-bars span:nth-child(3) { animation-delay: 240ms; }
      .pulse-bars span:nth-child(4) { animation-delay: 360ms; }
      .pulse-bars span:nth-child(5) { animation-delay: 480ms; }

      .action-panel {
        position: relative;
        overflow: hidden;
      }

      .action-panel::before {
        content: '';
        position: absolute;
        inset: -20% -10%;
        pointer-events: none;
        background:
          radial-gradient(40% 40% at 12% 18%, rgba(37, 99, 235, 0.12), transparent 72%),
          radial-gradient(36% 36% at 88% 22%, rgba(14, 165, 233, 0.1), transparent 74%),
          linear-gradient(120deg, transparent 18%, rgba(255, 255, 255, 0.26) 48%, transparent 76%);
        transform: translate3d(-8%, 0, 0);
        animation: panelSweep 11s ease-in-out infinite;
      }

      .action-panel > * {
        position: relative;
        z-index: 1;
      }

      .chip-pulse {
        animation: chipPulse 3.8s ease-in-out infinite;
      }

      .mini-orb {
        animation: orbDrift 4.8s ease-in-out infinite;
      }

      .cta-button {
        transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease, border-color 220ms ease;
      }

      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
      }

      .tab-pill {
        position: relative;
        overflow: hidden;
      }

      .tab-pill-active::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(125deg, rgba(255, 255, 255, 0.14), transparent 42%, rgba(125, 211, 252, 0.12));
        animation: activeTabGlow 3.2s ease-in-out infinite;
      }

      .tab-pill::after {
        content: '';
        position: absolute;
        top: 0;
        left: -45%;
        width: 34%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.38), transparent);
        opacity: 0;
        transition: opacity 220ms ease;
      }

      .tab-pill:hover::after {
        opacity: 1;
        animation: tabSweep 1s ease;
      }

      .takeover-glow {
        position: relative;
      }

      .takeover-glow::after {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        border: 1px solid rgba(245, 158, 11, 0.4);
        pointer-events: none;
      }

      .takeover-pulse {
        animation: takeoverPulse 2.6s ease-in-out infinite;
      }

      .module-shell {
        position: relative;
        overflow: hidden;
        border-radius: 1.25rem;
      }

      .module-shell::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(37, 99, 235, 0.1), transparent 52%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.1), transparent 58%);
      }

      .module-shell-token {
        border-color: rgba(8, 145, 178, 0.4) !important;
      }

      .module-shell-token::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(16, 185, 129, 0.16), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.15), transparent 58%);
      }

      .module-shell-bridge {
        border-color: rgba(37, 99, 235, 0.35) !important;
      }

      .module-shell-bridge::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(59, 130, 246, 0.18), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(56, 189, 248, 0.14), transparent 58%);
      }

      .module-shell-staking {
        border-color: rgba(22, 163, 74, 0.35) !important;
      }

      .module-shell-staking::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(34, 197, 94, 0.16), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(245, 158, 11, 0.14), transparent 58%);
      }

      .module-shell-governance {
        border-color: rgba(59, 130, 246, 0.34) !important;
      }

      .module-shell-governance::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(96, 165, 250, 0.18), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.13), transparent 58%);
      }

      .module-shell-sale {
        border-color: rgba(56, 189, 248, 0.35) !important;
      }

      .module-shell-sale::before {
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(56, 189, 248, 0.16), transparent 56%),
          radial-gradient(120% 120% at 100% 100%, rgba(14, 165, 233, 0.14), transparent 58%);
      }

      .module-grid-bg {
        position: relative;
      }

      .module-grid-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px);
        background-size: 24px 24px;
        mask-image: linear-gradient(to bottom, black 20%, transparent 86%);
      }

      .glass-tile {
        border: 1px solid rgba(15, 23, 42, 0.1);
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(7px);
        border-radius: 1rem;
      }

      @keyframes contentIn {
        from {
          opacity: 0;
          transform: translateY(7px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes revealUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes logoFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }

      @keyframes ringPulse {
        0%,
        100% {
          opacity: 0.55;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.08);
        }
      }

      @keyframes driftA {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-16px, 12px);
        }
      }

      @keyframes driftB {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(16px, -14px);
        }
      }

      @keyframes tabSweep {
        from {
          left: -45%;
        }
        to {
          left: 130%;
        }
      }

      @keyframes takeoverPulse {
        0%,
        100% {
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
        }
        50% {
          box-shadow: 0 26px 64px rgba(245, 158, 11, 0.22);
        }
      }

      @keyframes metricFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      @keyframes panelSweep {
        0%,
        100% {
          transform: translate3d(-8%, 0, 0) rotate(0deg);
          opacity: 0.78;
        }
        50% {
          transform: translate3d(8%, -2%, 0) rotate(2deg);
          opacity: 1;
        }
      }

      @keyframes chipPulse {
        0%,
        100% {
          transform: translateY(0);
          box-shadow: 0 0 0 0 rgba(14, 165, 233, 0);
        }
        50% {
          transform: translateY(-1px);
          box-shadow: 0 0 0 5px rgba(14, 165, 233, 0.08);
        }
      }

      @keyframes orbDrift {
        0%,
        100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-4px) scale(1.02);
        }
      }

      @keyframes activeTabGlow {
        0%,
        100% {
          opacity: 0.65;
        }
        50% {
          opacity: 1;
        }
      }

      @keyframes visualDotPulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(8, 145, 178, 0.12);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(8, 145, 178, 0.2);
        }
      }

      @keyframes pulseBars {
        0%,
        100% {
          height: 7px;
          opacity: 0.7;
        }
        50% {
          height: 20px;
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        .brand-root::before {
          opacity: 0.2;
        }

        .hero-graphic::before {
          width: 240px;
          height: 240px;
          right: -130px;
        }

        .hero-graphic::after {
          width: 220px;
          height: 220px;
          left: -120px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal-up,
        .content-stage,
        .logo-float,
        .hero-ring,
        .hero-graphic::before,
        .hero-graphic::after,
        .takeover-pulse,
        .metric-card,
        .action-panel::before,
        .chip-pulse,
        .mini-orb,
        .tab-pill-active::before {
          animation: none !important;
        }

        .pulse-bars span,
        .visual-dot {
          animation: none !important;
        }

        .motion-card,
        .brand-secondary-button,
        .brand-button,
        .cta-button {
          transition: none !important;
        }
      }
    `}</style>
  );
}
