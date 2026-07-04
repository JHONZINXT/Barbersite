"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [nearFinalCta, setNearFinalCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("agendar");
    let observer: IntersectionObserver | undefined;
    if (target) {
      observer = new IntersectionObserver(([entry]) => setNearFinalCta(entry.isIntersecting), {
        rootMargin: "0px 0px -40% 0px",
      });
      observer.observe(target);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !nearFinalCta;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[140] px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 bg-gradient-to-t from-ink via-ink/95 to-transparent"
        >
          <a
            href="#agendar"
            className="min-h-[50px] w-full flex items-center justify-center rounded font-extrabold text-sm uppercase tracking-wide bg-amber text-ink active:scale-[0.98] transition-transform shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            {siteConfig.stickyCta.label}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
