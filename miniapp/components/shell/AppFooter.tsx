import React from 'react';

export function AppFooter() {
  return (
    <footer className="brand-surface border-t border-[color:var(--brand-leaf)]/25 mt-12 bg-[color:var(--brand-cream)]/80 rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">About ONBT</h3>
            <p className="text-sm text-[color:var(--brand-ink)]/70">Omnichain token built with LayerZero V2 OFT standard for seamless cross-chain transfers.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-[color:var(--brand-ink)]/70">
              <li>
                <a href="https://www.nabat.finance" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--brand-forest)]">
                  Website
                </a>
              </li>
              <li>
                <a href="https://docs.layerzero.network" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--brand-forest)]">
                  LayerZero Docs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-[color:var(--brand-ink)]/70">
              <li>
                <a href="https://x.com/NBT_V2" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--brand-forest)]">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.gg/nabatfinance" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--brand-forest)]">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://t.me/NabatOmnichainGovernment" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--brand-forest)]">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[color:var(--brand-leaf)]/30 text-center text-sm text-[color:var(--brand-ink)]/60">
          © 2026 ONabat. Built with LayerZero V2 OFT Standard.
        </div>
      </div>
    </footer>
  );
}
