"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

const icons: Record<string, JSX.Element> = {
  scissors: (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <circle cx="16" cy="34" r="6" /><circle cx="32" cy="34" r="6" /><path d="M18 30 40 10M28 30 8 10" />
    </svg>
  ),
  razor: (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M10 38 34 14a4 4 0 0 1 6 6L16 44Z" /><path d="M30 18l6 6" />
    </svg>
  ),
  clipper: (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <rect x="16" y="6" width="16" height="22" rx="3" /><path d="M20 28v6M28 28v6M18 40h12M20 34h8" />
    </svg>
  ),
  droplet: (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M24 6c8 10 12 16.5 12 22a12 12 0 0 1-24 0c0-5.5 4-12 12-22Z" />
    </svg>
  ),
  comb: (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M8 14h32v6H8z" />
      <path d="M12 20v14M18 20v14M24 20v14M30 20v14M36 20v14" />
    </svg>
  ),
  leaf: (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M10 38C10 20 22 8 40 8c0 18-12 30-30 30Z" /><path d="M10 38c6-10 14-16 22-20" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="servicos" className="px-5 md:px-14 py-16 md:py-28">
      <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
        <span className="block font-mono text-xs uppercase tracking-[0.2em] text-amber mb-3">{siteConfig.servicesEyebrow}</span>
        <h2 className="font-display uppercase text-[30px] md:text-[50px]">{siteConfig.servicesTitle}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {siteConfig.services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: (i % 4) * 0.06 }}
            className={
              "featured" in s && s.featured
                ? "flex flex-col items-center text-center rounded-xl p-7 -translate-y-3.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] sm:col-span-2 md:col-span-1"
                : "flex flex-col items-center text-center"
            }
            style={
              "featured" in s && s.featured
                ? { background: "linear-gradient(160deg, #E8942C, #F5B45C)", color: "#14100C" }
                : undefined
            }
          >
            <div
              className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 ${
                "featured" in s && s.featured ? "border-[1.5px] border-ink text-ink bg-cream/40" : "border-[1.5px] border-amber/55 text-amber bg-card/60"
              }`}
            >
              {icons[s.icon] ?? icons.scissors}
            </div>
            {!("featured" in s && s.featured) && <div className="dotted-connector my-1" />}
            <div className="font-display uppercase text-sm tracking-wide mt-2 mb-1.5">{s.name}</div>
            <p className={`text-xs max-w-[170px] mb-2.5 leading-relaxed ${"featured" in s && s.featured ? "opacity-75" : "opacity-60"}`}>
              {s.desc}
            </p>
            <div className="font-mono text-[9.5px] uppercase tracking-widest opacity-60">A partir de</div>
            <div className={`font-display text-xl mt-0.5 ${"featured" in s && s.featured ? "text-ink" : "text-amber"}`}>{s.price}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
