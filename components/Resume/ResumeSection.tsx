"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

interface ResumeItem {
  year: string;
  title: string;
  company: string;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function ExperienceEducation() {
  const t = useTranslations("resume");
  const [isVisible,    setIsVisible]    = useState(false);
  const [activeTab,    setActiveTab]    = useState<"experience" | "education">("experience");
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: ResumeItem[] = t.raw("experience");
  const education:   ResumeItem[] = t.raw("education");
  const currentData = activeTab === "experience" ? experiences : education;

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          currentData.forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 500 + i * 180);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, currentData.length]);

  /* ── Tab switch re-animation ── */
  useEffect(() => {
    setVisibleItems([]);
    currentData.forEach((_, i) => {
      setTimeout(() => {
        setVisibleItems((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 160);
    });
  }, [activeTab]);

  /* ── Shared tab button style ── */
  const tabStyle = (active: boolean): React.CSSProperties => ({
    display:        "inline-flex",
    alignItems:     "center",
    gap:            "10px",
    padding:        "11px 28px",
    borderRadius:   "2px",
    fontWeight:     700,
    fontSize:       "0.7rem",
    letterSpacing:  "0.2em",
    textTransform:  "uppercase",
    fontFamily:     "'Sora', sans-serif",
    cursor:         "pointer",
    transition:     "all 0.35s",
    border:         active ? "1px solid transparent" : "1px solid rgba(200,164,90,0.28)",
    background:     active
      ? "linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)"
      : "rgba(200,164,90,0.04)",
    color:          active ? "var(--navy)" : "var(--cream-dim)",
    boxShadow:      active ? "0 0 24px rgba(200,164,90,0.3)" : "none",
  });

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{
        background:    "var(--bg-primary)",
        scrollMarginTop: "35px",
        borderTop:    "1px solid rgba(200,164,90,0.08)",
        borderBottom: "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 95% 15%, rgba(21,35,54,0.85) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 5%  85%, rgba(28,47,68,0.55) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[140, 280, 420, 560, 700, 840].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 60 L 60 110 L 110 110" fill="none"
            stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          <path d="M 1140 840 L 1140 790 L 1090 790" fill="none"
            stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-5xl">

        {/* ── Section Header ─────────────────────────────── */}
        <div className={`text-center mb-14 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>

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
                § 05 &nbsp;—&nbsp; {t("sectionCategory")}
              </span>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 50%, #8a6e35 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "14px",
          }}>
            {t("title")}
          </h2>

          <p style={{
            color: "var(--cream-dim)", fontSize: "1rem",
            maxWidth: "580px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.55rem" }}>✦</span>
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </div>
        </div>

        {/* ── Tab Buttons ────────────────────────────────── */}
        <div className={`flex justify-center gap-3 mb-14 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <button
            onClick={() => setActiveTab("experience")}
            style={tabStyle(activeTab === "experience")}
            onMouseEnter={(e) => {
              if (activeTab !== "experience") {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.55)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "experience") {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.28)";
                (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
              }
            }}
          >
            <Briefcase size={15} />
            {t("tabs.experience")}
          </button>

          <button
            onClick={() => setActiveTab("education")}
            style={tabStyle(activeTab === "education")}
            onMouseEnter={(e) => {
              if (activeTab !== "education") {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.55)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "education") {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.28)";
                (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
              }
            }}
          >
            <GraduationCap size={15} />
            {t("tabs.education")}
          </button>
        </div>

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="relative">

          {/* Vertical centre line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden lg:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(200,164,90,0.35) 15%, rgba(200,164,90,0.35) 85%, transparent 100%)",
            }}
          />

          <div className="space-y-8">
            {currentData.map((item: any, index: number) => (
              <div
                key={index}
                className="relative"
                style={{
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                  transitionDelay: `${index * 80}ms`,
                  opacity:   visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index] ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                }}
              >
                <div className={`flex flex-col lg:flex-row gap-8 items-start lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}>

                  {/* ── Card ─────────────────────────────── */}
                  <div className="flex-1 lg:w-[calc(50%-2rem)]">
                    <div
                      className="group relative overflow-hidden"
                      style={{
                        background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                        border: "1px solid rgba(200,164,90,0.12)",
                        borderTop: "2px solid rgba(200,164,90,0.2)",
                        borderRadius: "2px",
                        padding: "28px 28px 24px",
                        transition: "border-color 0.4s, box-shadow 0.4s, transform 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor    = "rgba(200,164,90,0.4)";
                        el.style.borderTopColor = "var(--gold)";
                        el.style.boxShadow      = "0 12px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,164,90,0.1)";
                        el.style.transform      = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor    = "rgba(200,164,90,0.12)";
                        el.style.borderTopColor = "rgba(200,164,90,0.2)";
                        el.style.boxShadow      = "none";
                        el.style.transform      = "translateY(0)";
                      }}
                    >
                      {/* Dot-grid pattern */}
                      <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.06) 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                      }} />

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ borderTop: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" }} />
                      <div className="absolute bottom-0 left-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ borderBottom: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" }} />

                      {/* Shine sweep */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.05), transparent)" }}
                        />
                      </div>

                      <div className={`relative z-10 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>

                        {/* Roman numeral + year row */}
                        <div className={`flex items-center gap-3 mb-4 ${
                          index % 2 === 0 ? "lg:flex-row-reverse lg:justify-start" : ""
                        }`}>
                          {/* Year pill */}
                          <span style={{
                            display: "inline-block",
                            padding: "3px 12px",
                            border: "1px solid rgba(200,164,90,0.35)",
                            borderRadius: "2px",
                            background: "rgba(200,164,90,0.08)",
                            color: "var(--gold)",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            fontFamily: "'Sora', sans-serif",
                          }}>
                            {item.year}
                          </span>

                          {/* Roman numeral */}
                          <span style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "rgba(200,164,90,0.3)",
                            lineHeight: 1,
                          }}>
                            {ROMAN[index]}
                          </span>
                        </div>

                        {/* Thin rule */}
                        <div className={`mb-3 h-px ${index % 2 === 0 ? "lg:ml-auto" : ""}`}
                          style={{
                            width: "100%",
                            background: `linear-gradient(${index % 2 === 0 ? "270deg" : "90deg"}, rgba(200,164,90,0.25), transparent)`,
                          }}
                        />

                        {/* Title */}
                        <h3
                          className="mb-2 group-hover:text-[var(--gold-light)] transition-colors duration-300"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "var(--cream)",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </h3>

                        {/* Company */}
                        <p style={{
                          color: "var(--slate)",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          fontFamily: "'Sora', sans-serif",
                        }}>
                          {item.company}
                        </p>

                        {/* Animated bottom rule */}
                        <div
                          className={`mt-5 h-px w-0 group-hover:w-full transition-all duration-700 ${
                            index % 2 === 0 ? "ml-auto" : ""
                          }`}
                          style={{ background: "linear-gradient(90deg, var(--gold-dim), var(--gold), transparent)" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Centre dot ───────────────────────── */}
                  <div className="hidden lg:flex items-center justify-center w-16 shrink-0">
                    <div
                      style={{
                        position: "relative",
                        width: "16px", height: "16px",
                        borderRadius: "2px",               /* square instead of circle */
                        background: "var(--gold)",
                        border: "3px solid var(--navy-mid)",
                        boxShadow: "0 0 12px rgba(200,164,90,0.5)",
                        transition: "transform 0.5s, opacity 0.5s",
                        transform:  visibleItems[index] ? "scale(1)"    : "scale(0)",
                        opacity:    visibleItems[index] ? 1             : 0,
                      }}
                    >
                      {/* Ping ring */}
                      <div style={{
                        position: "absolute",
                        inset: "-6px",
                        border: "1px solid rgba(200,164,90,0.3)",
                        borderRadius: "2px",
                        animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block flex-1 lg:w-[calc(50%-2rem)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Timeline end mark */}
          <div className="hidden lg:flex justify-center mt-8">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "4px 14px",
              border: "1px solid rgba(200,164,90,0.2)",
              borderRadius: "2px",
              background: "rgba(200,164,90,0.05)",
            }}>
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.58rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
              }}>
                {currentData.length} {activeTab === "experience" ? t("positionsCount") : t("degreesCount")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </section>
  );
}