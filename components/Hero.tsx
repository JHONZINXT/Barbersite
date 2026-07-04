"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/config";
import PhotoSlot from "./PhotoSlot";

function KineticLine({ text, accent, delayStart }: { text: string; accent?: boolean; delayStart: number }) {
  const chars = [...text];
  return (
    <span className="block overflow-hidden">
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, ease: [0.16, 0.84, 0.44, 1], delay: delayStart + i * 0.035 }}
          className={`inline-block ${accent ? "text-transparent" : ""}`}
          style={accent ? { WebkitTextStroke: "2px #E8942C" } : undefined}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yScissors = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yBrush = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yCup = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden px-5 pt-24 pb-16">
      <div className="absolute inset-0 -z-20">
        <PhotoSlot label={siteConfig.hero.photo.label} className="w-full h-full" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,16,12,.35) 0%, rgba(20,16,12,.75) 65%, #14100C 100%)" }}
        />
      </div>

      {!reduceMotion && (
        <>
          <motion.svg
            style={{ y: yScissors }}
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[14%] left-[6%] w-12 md:w-14 text-amber opacity-80"
            viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.2}
          >
            <circle cx="18" cy="46" r="8" /><circle cx="46" cy="46" r="8" /><path d="M22 40 56 10M42 40 8 10" />
          </motion.svg>
          <motion.svg
            style={{ y: yBrush }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[8%] w-10 md:w-12 text-amber opacity-80"
            viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.2}
          >
            <rect x="26" y="8" width="12" height="26" rx="4" /><path d="M20 34h24l-4 22H24z" />
          </motion.svg>
          <motion.svg
            style={{ y: yCup }}
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[6%] w-11 md:w-12 text-amber opacity-80"
            viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.2}
          >
            <path d="M20 10h24v16a12 12 0 0 1-24 0z" />
            <path d="M20 16h-8v6a8 8 0 0 0 8 6M44 16h8v6a8 8 0 0 1-8 6" />
            <path d="M32 38v10M22 52h20" />
          </motion.svg>
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber border border-amber/50 px-4 py-1.5 rounded-full mb-4 relative z-10"
      >
        {siteConfig.addressBadge}
      </motion.div>

      <h1 className="font-display uppercase leading-[0.86] text-[52px] md:text-[110px] lg:text-[150px] relative z-10">
        {siteConfig.hero.lines.map((line, i) => (
          <KineticLine key={line} text={line} accent={i === siteConfig.hero.accentLineIndex} delayStart={0.15} />
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="max-w-[480px] text-[15px] md:text-[17px] leading-relaxed mt-5 text-cream/90 relative z-10"
      >
        {siteConfig.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="flex gap-3.5 flex-wrap justify-center mt-8 relative z-10"
      >
        <a href="#agendar" className="min-h-[48px] flex items-center justify-center gap-2 px-7 rounded font-extrabold text-[13px] uppercase tracking-wide bg-amber text-ink border-2 border-amber active:scale-95 transition-transform">
          {siteConfig.hero.ctaLabel}
        </a>
        <a href="#servicos" className="min-h-[48px] flex items-center justify-center gap-2 px-7 rounded font-extrabold text-[13px] uppercase tracking-wide text-amber border-2 border-amber active:scale-95 transition-transform">
          {siteConfig.hero.secondaryLabel}
        </a>
      </motion.div>
    </section>
  );
}
