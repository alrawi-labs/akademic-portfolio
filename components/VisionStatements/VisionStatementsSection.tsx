"use client";

import TextAnimation from "@/components/ui/scroll-text";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function VisionStatements() {
  const t      = useTranslations("vision");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const labels = [
    "§ 02.1 — Vision",
    "§ 02.2 — Mission",
    "§ 02.3 — Approach",
    "§ 02.4 — Purpose",
  ];

  /*
   * `vision-gold-text` class is applied to the TextAnimation wrapper.
   * The CSS below also targets child spans/divs that TextAnimation
   * creates internally — so the gradient renders regardless of the
   * animation component's internal DOM structure.
   */
  const goldCSS = `
    .vision-gold-text,
    .vision-gold-text span,
    .vision-gold-text p,
    .vision-gold-text div {
      font-family: 'Playfair Display', Georgia, serif !important;
      background: linear-gradient(135deg, #e0c07a 0%, #c8a45a 55%, #8a6e35 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }
  `;

  const g = "vision-gold-text";

  const statements = [
    {
      text: t("statements.0.text"),
      variants: {
        hidden:  { filter: "blur(10px)", opacity: 0, y: 20 },
        visible: { filter: "blur(0px)",  opacity: 1, y: 0, transition: { ease: "linear" } },
      },
      className: `${g} text-4xl sm:text-5xl md:text-6xl xl:text-8xl max-w-4xl mx-auto font-bold capitalize leading-tight ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex flex-col justify-center items-center text-center",
      align: "center" as const,
    },
    {
      text: t("statements.1.text"),
      letterAnime: !isRTL,
      variants: {
        hidden:  { filter: "blur(4px)", opacity: 0, y: 20 },
        visible: { filter: "blur(0px)", opacity: 1, y: 0, transition: { duration: 0.2 } },
      },
      as: "p" as const,
      className: `${g} text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl lowercase font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex items-center text-left",
      align: "left" as const,
    },
    {
      text: t("statements.2.text"),
      direction: "right" as const,
      className: `${g} text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl ml-auto capitalize font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex justify-center items-center text-right",
      align: "right" as const,
    },
    {
      text: t("statements.3.text"),
      direction: "down" as const,
      lineAnime: !isRTL,
      className: `${g} text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl mx-auto lowercase font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex justify-center items-center text-center",
      align: "center" as const,
    },
  ];

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Gold gradient text styles */}
      <style dangerouslySetInnerHTML={{ __html: goldCSS }} />

      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 100% 0%,   rgba(21,35,54,0.9) 0%, transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 0%   100%, rgba(28,47,68,0.6) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[160,320,480,640,800,960,1120,1280,1440,1600,1760,1920].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <line x1="80" y1="0" x2="80" y2="100%"
            stroke="rgba(200,164,90,0.2)" strokeWidth="0.5" />
          <path d="M 60 80 L 60 130 L 110 130" fill="none"
            stroke="rgba(200,164,90,0.7)" strokeWidth="1.2" />
          <path d="M 1140 120 L 1140 70 L 1090 70" fill="none"
            stroke="rgba(200,164,90,0.7)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ── Statements ───────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-64 relative z-10">
        {statements.map((statement, i) => (
          <div
            key={i}
            className={`relative ${statement.containerClass}`}
          >
            {/* Section marker */}
            <div
              className="absolute top-8 left-0"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: "1px solid rgba(200,164,90,0.22)", borderRadius: "2px",
                padding: "4px 12px", background: "rgba(200,164,90,0.04)",
              }}
            >
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.58rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 600,
              }}>
                {labels[i]}
              </span>
            </div>

            {/* Bottom ornament */}
            <div
              className={`absolute bottom-12 flex items-center gap-2 ${
                statement.align === "right"
                  ? "right-0"
                  : statement.align === "center"
                  ? "left-1/2 -translate-x-1/2"
                  : "left-0"
              }`}
            >
              <span className="block h-px w-8"
                style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
              <span style={{ color: "var(--gold-dim)", fontSize: "0.45rem" }}>✦</span>
              <span className="block h-px w-8"
                style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
            </div>

            {/* Vertical gold accent bar */}
            <div style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [statement.align === "right" ? "right" : "left"]: "-24px",
              width: "2px",
              height: "80px",
              background: "linear-gradient(180deg, transparent, var(--gold), transparent)",
              opacity: 0.45,
            }} />

            {/* Text animation */}
            <TextAnimation
              text={statement.text}
              direction={statement.direction}
              variants={statement.variants}
              letterAnime={statement.letterAnime}
              lineAnime={statement.lineAnime}
              as={statement.as}
              classname={statement.className}
            />
          </div>
        ))}
      </div>
    </div>
  );
}