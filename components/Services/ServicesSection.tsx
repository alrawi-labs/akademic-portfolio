"use client";

import { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { useTranslations } from "next-intl";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const t = useTranslations("services");
  const [isVisible, setIsVisible]       = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const servicesCount = t.raw("items").length;

  useEffect(() => {
    setVisibleCards(new Array(servicesCount).fill(false));
  }, [servicesCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          Array.from({ length: servicesCount }).forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 350);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [servicesCount]);

  const defaultIcons = ["Code", "Palette", "Cpu", "Shield"];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{
        background: "var(--bg-primary)",
        scrollMarginTop: "25px",
        borderTop:    "1px solid rgba(200,164,90,0.08)",
        borderBottom: "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background accents ─────────────────────────── */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 10% 20%, rgba(21,35,54,0.8) 0%, transparent 70%), " +
            "radial-gradient(ellipse 50% 35% at 90% 80%, rgba(28,47,68,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule lines — paper feel */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.045 }}>
        {[140, 280, 420, 560, 700, 840].map((y) => (
          <line key={y} x1="0" y1={y} x2="100%" y2={y}
            stroke="rgba(200,164,90,0.6)" strokeWidth="0.5" />
        ))}
        {/* Corner brackets */}
        <path d="M 60 60 L 60 110 L 110 110" fill="none"
          stroke="rgba(200,164,90,0.7)" strokeWidth="1.2" />
        <path d="M 1140 840 L 1140 790 L 1090 790" fill="none"
          stroke="rgba(200,164,90,0.7)" strokeWidth="1.2" />
      </svg>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* ── Section Header ─────────────────────────────── */}
        <div
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section marker */}
          <div className="flex justify-center mb-5">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid rgba(200,164,90,0.28)",
                borderRadius: "2px",
                padding: "5px 16px",
                background: "rgba(200,164,90,0.05)",
              }}
            >
              <span style={{
                color: "var(--gold-dim)",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
              }}>
                § 03 &nbsp;—&nbsp; {t("sectionCategory")}
              </span>
            </div>
          </div>

          <h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 50%, #8a6e35 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title")}
          </h2>

          <p style={{
            color: "var(--cream-dim)",
            fontSize: "1.05rem",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Ornament rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.55rem", letterSpacing: "0.3em" }}>✦</span>
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </div>
        </div>

        {/* ── Services Grid ──────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {t.raw("items").map((service: any, index: number) => {
            const iconName    = service.icon || defaultIcons[index] || "Code";
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;

            return (
              <ServiceCard
                key={index}
                number={index + 1}
                title={service.title}
                description={service.description}
                icon={IconComponent}
                index={index}
                isVisible={visibleCards[index]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}