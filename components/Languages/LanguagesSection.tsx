"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Award } from "lucide-react";
import { useTranslations } from "next-intl";

/* Proficiency level → roman numeral mapping for visual scale */
const LEVEL_MARKS = ["·", "··", "···", "····", "✦"];

export default function Languages() {
  const [isVisible,    setIsVisible]    = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("languages");

  const languages: any[] = t.raw("languages");
  const levels:    any   = t.raw("levels");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          languages.forEach((_: any, i: number) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 300 + i * 160);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, languages.length]);

  return (
    <section
      ref={sectionRef}
      id="languages"
      className="pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:      "var(--bg-primary)",
        scrollMarginTop: "140px",
        borderBottom:    "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 5%  80%, rgba(21,35,54,0.8) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 95% 20%, rgba(28,47,68,0.5) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[130, 270, 410, 550, 690].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 60 L 60 110 L 110 110" fill="none"
            stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          <path d="M 1140 680 L 1140 630 L 1090 630" fill="none"
            stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl mt-8">

        {/* ── Section Header ─────────────────────────────── */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>

          {/* Section marker */}
          <div className="flex justify-center mb-5">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: "1px solid rgba(200,164,90,0.28)", borderRadius: "2px",
              padding: "5px 16px", background: "rgba(200,164,90,0.05)",
            }}>
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.62rem",
                letterSpacing: "0.25em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 600,
              }}>
                § 07 &nbsp;—&nbsp; Linguistic Proficiency
              </span>
            </div>
          </div>

          {/* Heading with globe icon */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width: "44px", height: "44px",
              border: "1px solid rgba(200,164,90,0.3)",
              borderRadius: "2px",
              background: "rgba(200,164,90,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Globe size={20} style={{ color: "var(--gold)", strokeWidth: 1.6 }} />
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 50%, #8a6e35 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.15,
            }}>
              {t("title")}
            </h2>
          </div>

          <p style={{
            color: "var(--cream-dim)", fontSize: "1rem",
            maxWidth: "540px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Ornament rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.55rem" }}>✦</span>
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </div>
        </div>

        {/* ── Languages Grid ─────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {languages.map((lang: any, index: number) => {
            /* Determine fill level 0–4 from level key */
            const levelKeys  = Object.keys(levels);
            const levelIndex = levelKeys.indexOf(lang.level);
            const fillCount  = levelIndex >= 0 ? levelIndex + 1 : 3;

            return (
              <div
                key={index}
                className="group"
                style={{
                  transition: "opacity 0.9s ease, transform 0.9s ease",
                  transitionDelay: `${index * 90}ms`,
                  opacity:   visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index] ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div
                  className="relative overflow-hidden h-full"
                  style={{
                    background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                    border: "1px solid rgba(200,164,90,0.12)",
                    borderTop: "2px solid rgba(200,164,90,0.22)",
                    borderRadius: "2px",
                    padding: "36px 28px",
                    transition: "border-color 0.4s, box-shadow 0.4s, transform 0.35s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor    = "rgba(200,164,90,0.4)";
                    el.style.borderTopColor = "var(--gold)";
                    el.style.boxShadow      = "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,164,90,0.12)";
                    el.style.transform      = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor    = "rgba(200,164,90,0.12)";
                    el.style.borderTopColor = "rgba(200,164,90,0.22)";
                    el.style.boxShadow      = "none";
                    el.style.transform      = "translateY(0)";
                  }}
                >
                  {/* Flag background — very dim */}
                  {lang.backward && (
                    <div
                      className="absolute inset-0 transition-opacity duration-500 opacity-[0.06] group-hover:opacity-[0.09]"
                      style={{
                        backgroundImage:    `url(${lang.backward})`,
                        backgroundSize:     "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}

                  {/* Dot-grid overlay */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.06) 1px, transparent 0)",
                    backgroundSize:  "32px 32px",
                  }} />

                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ borderTop: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" }} />
                  <div className="absolute bottom-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ borderBottom: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" }} />

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="-translate-x-full group-hover:translate-x-full transition-transform duration-1000 absolute inset-0"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.05), transparent)" }}
                    />
                  </div>

                  {/* ── Card content ────────────────────── */}
                  <div className="relative z-10 flex flex-col items-center text-center gap-5">

                    {/* Flag with gold ring on hover */}
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl"
                        style={{ background: "rgba(200,164,90,0.2)", transform: "scale(1.8)" }}
                      />
                      <span
                        className="relative block group-hover:scale-110 transition-transform duration-400"
                        style={{ fontSize: "3.8rem", lineHeight: 1 }}
                      >
                        {lang.flag}
                      </span>
                    </div>

                    {/* Language name */}
                    <div>
                      <h3
                        className="mb-1 group-hover:text-[var(--gold-light)] transition-colors duration-300"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.35rem",
                          fontWeight: 700,
                          color: "var(--cream)",
                        }}
                      >
                        {lang.name}
                      </h3>
                      <p style={{
                        color: "var(--slate)",
                        fontSize: "0.8rem",
                        fontFamily: "'Sora', sans-serif",
                        letterSpacing: "0.05em",
                      }}>
                        {lang.nativeName}
                      </p>
                    </div>

                    {/* Animated gold rule */}
                    <div
                      className="w-10 group-hover:w-20 transition-all duration-500"
                      style={{
                        height: "1.5px",
                        background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                      }}
                    />

                    {/* Proficiency dots — visual level indicator */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, di) => (
                        <div
                          key={di}
                          style={{
                            width:  "8px",
                            height: "8px",
                            borderRadius: "1px",
                            background:   di < fillCount ? "var(--gold)" : "rgba(200,164,90,0.15)",
                            border:       `1px solid ${di < fillCount ? "var(--gold)" : "rgba(200,164,90,0.2)"}`,
                            transition:   `background 0.4s ${di * 0.06}s, border-color 0.4s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Level badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "6px 18px",
                        border: "1px solid rgba(200,164,90,0.3)",
                        borderRadius: "2px",
                        background: "rgba(200,164,90,0.08)",
                        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                      }}
                      className="group-hover:!border-[rgba(200,164,90,0.55)] group-hover:!bg-[rgba(200,164,90,0.14)]"
                      style-hover="box-shadow: 0 0 16px rgba(200,164,90,0.2)"
                    >
                      <Award size={13} style={{ color: "var(--gold)", strokeWidth: 1.6 }} />
                      <span style={{
                        color: "var(--gold)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                      }}>
                        {levels[lang.level]}
                      </span>
                    </div>

                    {/* Index marker */}
                    <span style={{
                      position: "absolute",
                      top: "-2px",
                      right: "0px",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "rgba(200,164,90,0.2)",
                    }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}