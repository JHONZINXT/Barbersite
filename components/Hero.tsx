"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import SlotImage from "./SlotImage";

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
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden px-5 pt-24 pb-16">
      <div className="absolute inset-0 -z-20">
        <SlotImage
          src={siteConfig.hero.photo.src}
          alt="Barbeiro em atendimento"
          placeholderLabel={siteConfig.hero.photo.label}
          className="w-full h-full"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,16,12,.35) 0%, rgba(20,16,12,.75) 65%, #14100C 100%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber border border-amber/50 px-4 py-1.5 rounded-full mb-4 relative z-10"
      >
        {siteConfig.address}
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

      {/* Sinal de confiança logo abaixo do subtítulo — visível acima da dobra, perto do CTA.
          Pesquisa de conversão mostra que responder "posso confiar nisso?" antes do visitante
          formular a objeção aumenta a taxa de clique no botão principal. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.78 }}
        className="font-mono text-[12px] tracking-wide text-amber/90 mt-3 relative z-10"
      >
        {siteConfig.hero.trustLine}
      </motion.div>

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
