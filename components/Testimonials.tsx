"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function Testimonials() {
  return (
    <section id="feedbacks">
      <div className="text-center py-9 md:py-13 px-5" style={{ background: "linear-gradient(160deg, #E8942C, #F5B45C)", color: "#14100C" }}>
        <div className="font-display uppercase text-[30px] md:text-[50px]">{siteConfig.testimonials.title}</div>
        <div className="text-[13px] opacity-85 mt-2">{siteConfig.testimonials.subtitle}</div>
      </div>

      <div className="px-5 md:px-14 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {siteConfig.testimonials.items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-xl p-6 md:p-7 border border-amber/15 bg-card"
            >
              <div
                className="w-[42px] h-[42px] rounded-full mb-3.5"
                style={{ background: "conic-gradient(from 0deg, #E8942C, #F5B45C, #2A1E16, #E8942C)" }}
              />
              <div className="text-amber text-xs mb-2 tracking-wide" aria-label={`${t.rating} de 5 estrelas`}>
                {"★".repeat(t.rating)}
                <span className="opacity-25">{"★".repeat(5 - t.rating)}</span>
              </div>
              <p className="text-[13.5px] leading-relaxed mb-3.5 opacity-90">&ldquo;{t.quote}&rdquo;</p>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="font-mono text-[10.5px] text-amber uppercase">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
