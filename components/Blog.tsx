"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import SlotImage from "./SlotImage";

export default function Blog() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: "smooth" });
  };

  return (
    <section id="blog" className="px-5 md:px-14 py-16 md:py-28">
      <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
        <span className="block font-mono text-xs uppercase tracking-[0.2em] text-amber mb-3">{siteConfig.blogEyebrow}</span>
        <h2 className="font-display uppercase text-[30px] md:text-[50px]">{siteConfig.blogTitle}</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <div ref={trackRef} className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {siteConfig.blog.map((b, i) => (
            <motion.a
              key={b.title}
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Vi a dica "${b.title}" no site e queria saber mais.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              className="snap-start shrink-0 w-[280px] rounded-xl overflow-hidden border border-amber/15 bg-card transition-transform hover:-translate-y-1 active:-translate-y-1 block"
            >
              <SlotImage
                src={b.image}
                alt={b.title}
                placeholderLabel={"Foto do post\n(16:10)"}
                className="w-full aspect-[16/10]"
              />
              <div className="p-5">
                <div className="font-display uppercase text-base mb-2 leading-tight border-b-2 border-dotted border-amber/40 pb-2.5">
                  {b.title}
                </div>
                <p className="text-xs opacity-70 leading-relaxed my-2.5 mb-3">{b.excerpt}</p>
                <div className="font-mono text-[11px] text-amber uppercase tracking-wide">Perguntar no WhatsApp →</div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center gap-3.5 mt-4">
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
