"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function CTA() {
  return (
    <section
      id="agendar"
      className="text-center rounded-t-[24px] px-5 pt-16 md:pt-24 pb-10"
      style={{ background: "linear-gradient(160deg, #E8942C, #F5B45C)", color: "#14100C" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="font-display uppercase text-[32px] md:text-[68px] leading-[1.02] mb-7"
      >
        {siteConfig.cta.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </motion.h2>

      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-[48px] inline-flex items-center justify-center px-9 rounded font-extrabold text-sm uppercase tracking-wide bg-ink text-cream border-2 border-ink active:scale-95 transition-transform"
      >
        {siteConfig.cta.whatsappLabel}
      </a>

      <footer className="flex justify-between flex-wrap gap-3.5 mt-14 pt-6 border-t border-ink/25 text-[11.5px] opacity-75 font-mono max-w-5xl mx-auto">
        <span>{siteConfig.brandNameFull}</span>
        <span>{siteConfig.instagram}</span>
        <span>{siteConfig.address}</span>
      </footer>
    </section>
  );
}
