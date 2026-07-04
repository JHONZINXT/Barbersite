"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import SlotImage from "./SlotImage";

const icons: Record<string, JSX.Element> = {
  scissors: (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <circle cx="16" cy="34" r="6" /><circle cx="32" cy="34" r="6" /><path d="M18 30 40 10M28 30 8 10" />
    </svg>
  ),
  razor: (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M10 38 34 14a4 4 0 0 1 6 6L16 44Z" /><path d="M30 18l6 6" />
    </svg>
  ),
  clipper: (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <rect x="16" y="6" width="16" height="22" rx="3" /><path d="M20 28v6M28 28v6M18 40h12M20 34h8" />
    </svg>
  ),
  droplet: (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M24 6c8 10 12 16.5 12 22a12 12 0 0 1-24 0c0-5.5 4-12 12-22Z" />
    </svg>
  ),
  comb: (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M8 14h32v6H8z" />
      <path d="M12 20v14M18 20v14M24 20v14M30 20v14M36 20v14" />
    </svg>
  ),
  leaf: (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M10 38C10 20 22 8 40 8c0 18-12 30-30 30Z" /><path d="M10 38c6-10 14-16 22-20" />
    </svg>
  ),
};

// Posições e tempos fixos (não aleatórios) pra não gerar erro de hidratação
// entre servidor e navegador — cada fio de cabelo tem seu próprio ritmo.
const hairParticles = [
  { left: "4%", delay: "0s", duration: "9s", height: 14 },
  { left: "12%", delay: "2.4s", duration: "11s", height: 18 },
  { left: "22%", delay: "5.1s", duration: "8s", height: 12 },
  { left: "34%", delay: "1.2s", duration: "12s", height: 16 },
  { left: "47%", delay: "3.6s", duration: "10s", height: 14 },
  { left: "58%", delay: "6.3s", duration: "9.5s", height: 20 },
  { left: "68%", delay: "0.8s", duration: "11.5s", height: 13 },
  { left: "79%", delay: "4.2s", duration: "8.5s", height: 17 },
  { left: "88%", delay: "2.9s", duration: "10.5s", height: 15 },
  { left: "95%", delay: "5.7s", duration: "9s", height: 12 },
];

export default function Services() {
  return (
    <section id="servicos" className="relative isolate overflow-hidden px-5 md:px-14 py-16 md:py-28">
      <div className="services-aurora" aria-hidden="true" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {hairParticles.map((p, i) => (
          <span
            key={i}
            className="hair-particle"
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, height: p.height }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1.4fr] gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:sticky md:top-28"
        >
          <SlotImage
            src={siteConfig.servicesImage.src}
            alt="Detalhe do ofício do barbeiro"
            placeholderLabel={siteConfig.servicesImage.label}
            className="w-full aspect-[3/4] rounded-2xl"
          />
        </motion.div>

        <div>
          <div className="mb-10">
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-amber mb-3">{siteConfig.servicesEyebrow}</span>
            <h2 className="font-display uppercase text-[30px] md:text-[50px]">{siteConfig.servicesTitle}</h2>
          </div>

          <div className="flex flex-col divide-y divide-amber/10 border-t border-amber/10">
            {siteConfig.services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="flex items-start gap-4 py-5"
              >
                <div className="w-10 h-10 shrink-0 rounded-full border-[1.5px] border-amber/55 text-amber bg-card/60 flex items-center justify-center">
                  {icons[s.icon] ?? icons.scissors}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display uppercase text-base md:text-lg tracking-wide whitespace-nowrap">
                      {s.name}
                    </span>
                    {"featured" in s && s.featured && (
                      <span className="font-mono text-[9px] uppercase tracking-wide text-ink bg-amber px-2 py-0.5 rounded-full whitespace-nowrap">
                        Mais pedido
                      </span>
                    )}
                    <span className="flex-1 border-b border-dotted border-amber/25 translate-y-[-4px]" />
                    <span className="font-display text-lg md:text-xl text-amber whitespace-nowrap">{s.price}</span>
                  </div>
                  <p className="text-xs opacity-60 leading-relaxed mt-1 max-w-md">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
