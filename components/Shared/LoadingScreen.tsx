"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SiteLogo } from "@/data/techIcons";

export default function LoadingScreen() {
  const [isLoading,  setIsLoading]  = useState(true);
  const [isExiting,  setIsExiting]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const locale = useLocale();
  const t      = useTranslations("loading");

  const isRTL      = locale === "ar";
  const loadingText = isRTL ? [t("text")] : t("text").split("");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 200);

    const exitTimer   = setTimeout(() => setIsExiting(true),    2500);
    const removeTimer = setTimeout(() => setIsLoading(false),   3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  const pct = Math.min(Math.round(progress), 100);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes letterFloat {
          0%, 100% { transform: translateY(0);    opacity: 1;   }
          50%       { transform: translateY(-10px); opacity: 0.7; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0)    rotate(0deg);   }
          50%       { transform: translateY(-14px) rotate(4deg);  }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 0   0 rgba(200,164,90,0);    }
          50%       { box-shadow: 0 0 28px 6px rgba(200,164,90,0.25); }
        }
        @keyframes progressShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%);  }
        }
        @keyframes rulerGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .letter-float  { animation: letterFloat 1.6s ease-in-out infinite; }
        .logo-float    { animation: logoFloat   3s   ease-in-out infinite; }
        .gold-pulse    { animation: goldPulse   2s   ease-in-out infinite; }
        .ruler-grow    { animation: rulerGrow   1.2s ease-out      forwards; transform-origin: left; }
      ` }} />

      <div
        className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        style={{ background: "var(--bg-primary, #0d1b2a)" }}
      >
        {/* ── Background ruled lines ───────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute", inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(21,35,54,0.95) 0%, transparent 70%)",
          }} />
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            {[100,200,300,400,500,600,700,800].map((y) => (
              <line key={y} x1="0" y1={y} x2="100%" y2={y}
                stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
            ))}
            <path d="M 60 60 L 60 110 L 110 110"       fill="none" stroke="rgba(200,164,90,0.6)" strokeWidth="1.2" />
            <path d="M 1140 740 L 1140 690 L 1090 690"  fill="none" stroke="rgba(200,164,90,0.6)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* ── Main content ─────────────────────── */}
        <div
          className={`relative z-10 flex flex-col items-center gap-10 px-4 transition-all duration-1000 ${
            isExiting ? "opacity-0 -translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* Logo */}
          <div className="relative logo-float">
            {/* Gold ring */}
            <div
              className="absolute -inset-3 gold-pulse pointer-events-none"
              style={{
                border: "1px solid rgba(200,164,90,0.25)",
                borderRadius: "2px",
              }}
            />
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4"
              style={{ borderTop: "2px solid rgba(200,164,90,0.6)", borderLeft: "2px solid rgba(200,164,90,0.6)" }} />
            <div className="absolute -bottom-1 -right-1 w-4 h-4"
              style={{ borderBottom: "2px solid rgba(200,164,90,0.6)", borderRight: "2px solid rgba(200,164,90,0.6)" }} />

            <img
              src={SiteLogo}
              alt="Logo"
              width={72} height={72}
              className="relative z-10"
              style={{ filter: "drop-shadow(0 0 20px rgba(200,164,90,0.4))" }}
            />
          </div>

          {/* Loading text */}
          <div className={`flex items-end gap-0.5 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex gap-0 ${isRTL ? "flex-row-reverse" : ""}`}>
              {loadingText.map((letter, i) => (
                <span
                  key={i}
                  className="letter-float"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    fontFamily: isRTL
                      ? "'Cairo', 'Tajawal', sans-serif"
                      : "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 8vw, 4.5rem)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 50%, #8a6e35 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    display: "inline-block",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Dots */}
            <div className={`flex gap-1 items-end pb-1 ${isRTL ? "mr-2" : "ml-2"}`}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block rounded-sm animate-bounce"
                  style={{
                    width: "5px", height: "5px",
                    background: "var(--gold, #c8a45a)",
                    animationDelay: `${i * 0.18}s`,
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Section marker */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            border: "1px solid rgba(200,164,90,0.25)", borderRadius: "2px",
            padding: "5px 16px", background: "rgba(200,164,90,0.05)",
          }}>
            <span style={{
              color: "var(--gold-dim, #c8a45a)", fontSize: "0.58rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              fontFamily: "'Sora', sans-serif", fontWeight: 600,
            }}>
              § Loading Portfolio
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs sm:max-w-sm px-4 sm:px-0">
            {/* Track */}
            <div
              className="relative overflow-hidden"
              style={{
                height: "3px",
                background: "rgba(200,164,90,0.1)",
                border: "1px solid rgba(200,164,90,0.15)",
                borderRadius: "1px",
              }}
            >
              {/* Fill */}
              <div
                style={{
                  position: "absolute",
                  top: 0, bottom: 0,
                  [isRTL ? "right" : "left"]: 0,
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #8a6e35, #c8a45a, #e0c07a)",
                  borderRadius: "1px",
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 12px rgba(200,164,90,0.6)",
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    animation: "progressShimmer 1.2s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* Percentage */}
            <div
              className="flex justify-between mt-3"
              style={{
                color: "var(--slate, rgba(232,220,200,0.4))",
                fontSize: "0.6rem",
                fontFamily: "'Sora', sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              <span style={{ color: "rgba(200,164,90,0.4)" }}>000</span>
              <span style={{
                color: "var(--gold, #c8a45a)",
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.8rem",
                fontWeight: 700,
              }}>
                {isRTL ? `%${pct}` : `${pct}%`}
              </span>
              <span style={{ color: "rgba(200,164,90,0.4)" }}>100</span>
            </div>

            {/* Ruler ticks */}
            <div className="flex justify-between mt-1 px-px">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "1px",
                    height: i % 5 === 0 ? "6px" : "3px",
                    background: `rgba(200,164,90,${i % 5 === 0 ? 0.4 : 0.15})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3">
            <span className="block h-px w-12"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold,#c8a45a))" }} />
            <span style={{ color: "rgba(200,164,90,0.4)", fontSize: "0.5rem" }}>✦</span>
            <span className="block h-px w-12"
              style={{ background: "linear-gradient(90deg, var(--gold,#c8a45a), transparent)" }} />
          </div>
        </div>
      </div>
    </>
  );
}