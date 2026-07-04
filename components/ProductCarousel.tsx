"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import SlotImage from "./SlotImage";

export default function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: "smooth" });
  };

  return (
    <section id="produtos" className="px-5 md:px-14 py-16 md:py-28">
      <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
        <span className="block font-mono text-xs uppercase tracking-[0.2em] text-amber mb-3">{siteConfig.productsEyebrow}</span>
        <h2 className="font-display uppercase text-[30px] md:text-[50px]">{siteConfig.productsTitle}</h2>
      </div>

      <div className="relative max-w-3xl mx-auto rounded-[20px] p-7 md:p-12 border border-amber/15 overflow-hidden" style={{ background: "#221811" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(232,148,44,0.12), transparent 60%)" }}
        />
        <div ref={trackRef} className="relative z-10 flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {siteConfig.products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              className="snap-start shrink-0 w-[220px] text-center"
            >
              <SlotImage
                src={p.image}
                alt={p.name}
                placeholderLabel={`Foto:\n${p.name}\n(quadrada, fundo neutro)`}
                className="w-full aspect-square rounded-lg mb-3.5"
              />
              <div className="font-semibold text-sm mb-1">{p.name}</div>
              <div className="font-mono text-amber text-[13px]">{p.price}</div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex justify-center gap-3.5 mt-4">
          <button onClick={() => scroll(-1)} aria-label="anterior" className="w-12 h-12 rounded-full border-[1.5px] border-amber text-amber text-lg flex items-center justify-center active:scale-95 transition-transform">
            ‹
          </button>
          <button onClick={() => scroll(1)} aria-label="próximo" className="w-12 h-12 rounded-full border-[1.5px] border-amber text-amber text-lg flex items-center justify-center active:scale-95 transition-transform">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
