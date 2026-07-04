"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-5 md:px-14 py-4 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-amber/25" : "border-b border-transparent"
      }`}
    >
      <div className="font-display uppercase text-lg md:text-xl tracking-wide leading-none">
        {siteConfig.brandNamePlain} <span className="text-amber">{siteConfig.brandNameAccent}</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {siteConfig.nav.map((l) => (
          <a key={l.href} href={l.href} className="text-xs font-semibold uppercase tracking-wide opacity-85 hover:opacity-100 transition-opacity">
            {l.label}
          </a>
        ))}
        <a
          href="#agendar"
          className="min-h-[48px] flex items-center bg-amber text-ink font-extrabold text-xs uppercase tracking-wide px-5 rounded"
        >
          {siteConfig.navCta}
        </a>
      </div>

      <button
        aria-label="menu"
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden flex flex-col gap-1.5 min-h-[48px] min-w-[48px] items-center justify-center"
      >
        <span className="w-6 h-0.5 bg-cream" />
        <span className="w-6 h-0.5 bg-cream" />
        <span className="w-6 h-0.5 bg-cream" />
      </button>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ink/95 backdrop-blur-md border-b border-amber/25 flex flex-col p-5 gap-1">
          {siteConfig.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="min-h-[48px] flex items-center text-sm font-semibold uppercase tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#agendar"
            onClick={() => setMenuOpen(false)}
            className="min-h-[48px] flex items-center justify-center bg-amber text-ink font-extrabold text-sm uppercase tracking-wide rounded mt-2"
          >
            {siteConfig.navCta}
          </a>
        </div>
      )}
    </nav>
  );
}
