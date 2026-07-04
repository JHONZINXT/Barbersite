"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/config";
import SlotImage from "./SlotImage";

export default function TransformGallery() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ctx: any;
    let cleanupFns: Array<() => void> = [];

    (async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!pinRef.current || !trackRef.current) return;
        const track = trackRef.current;

        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinRef.current.querySelector(".sticky-inner"),
          scrub: 0.6,
          onUpdate: (self: any) => {
            const maxScroll = track.scrollWidth - (track.parentElement?.clientWidth ?? 0) + 120;
            gsap.set(track, { x: -maxScroll * self.progress });
          },
        });

        cleanupFns.push(() => trigger.kill());
      });
    })();

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx?.revert?.();
    };
  }, []);

  return (
    <section id="galeria" className="pt-0">
      <div className="text-center py-9 md:py-13 px-5" style={{ background: "linear-gradient(160deg, #E8942C, #F5B45C)", color: "#14100C" }}>
        <div className="font-display uppercase text-[30px] md:text-[50px]">{siteConfig.gallery.title}</div>
        <div className="text-[13px] opacity-85 mt-2">{siteConfig.gallery.subtitle}</div>
      </div>

      <div
        className="font-display uppercase text-transparent whitespace-nowrap select-none leading-none pt-5 md:pt-10 pl-1.5 md:pl-5 text-[56px] md:text-[150px]"
        style={{ WebkitTextStroke: "1px rgba(232,148,44,0.3)" }}
      >
        {siteConfig.gallery.ghostWord}
      </div>

      <div ref={pinRef} className="relative" style={{ height: "320vh" }}>
        <div className="sticky-inner sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-5 md:gap-8 px-5 md:px-14 will-change-transform">
            {siteConfig.gallery.pairs.map((pair, i) => (
              <div
                key={i}
                className={`min-w-[280px] md:min-w-[320px] aspect-[16/11] rounded-[14px] shrink-0 flex overflow-hidden border-[3px] border-amber/70 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.65)] transition-transform duration-300 ${
                  i % 3 === 1 ? "scale-105 -translate-y-1.5" : ""
                }`}
              >
                <SlotImage src={pair.before ?? undefined} alt={`Cliente ${i + 1} antes`} placeholderLabel="Antes" className="flex-1" />
                <SlotImage src={pair.after ?? undefined} alt={`Cliente ${i + 1} depois`} placeholderLabel="Depois" className="flex-1" />
              </div>
            ))}
          </div>
          <div className="text-center font-mono text-xs opacity-55 mt-4 tracking-wide uppercase">
            Role pra ver mais transformações →
          </div>
        </div>
      </div>
    </section>
  );
}
