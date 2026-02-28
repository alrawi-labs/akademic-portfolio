"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Volunteering() {
  const [isVisible, setIsVisible]         = useState(false);
  const [activeIndex, setActiveIndex]     = useState(0);
  const [visibleCards, setVisibleCards]   = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("volunteering");

  const volunteering: any[] = t.raw("volunteering");

  /* ── Intersection observer — section reveal ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          volunteering.forEach((_: any, i: number) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 200 + i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, volunteering.length]);

  return (
    <section
      ref={sectionRef}
      id="volunteering"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{
        background:      "var(--bg-primary)",
        scrollMarginTop: "140px",
        borderBottom:    "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 45% at 0% 30%,  rgba(21,35,54,0.85) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 40% at 100% 70%, rgba(28,47,68,0.55) 0%, transparent 65%)",
        }} />

        {/* Ruled lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[130, 270, 410, 550, 690, 830].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          {/* Corner brackets */}
          <path d="M 60 60 L 60 110 L 110 110"  fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          <path d="M 1140 780 L 1140 730 L 1090 730" fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          {/* Vertical accent */}
          <line x1="80" y1="0" x2="80" y2="100%" stroke="rgba(200,164,90,0.2)" strokeWidth="0.5" />
        </svg>

        {/* Watermark */}
        <svg
          width="100%" height="100%" viewBox="0 0 1200 800"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.025 }}
        >
          <text
            x="50%" y="52%"
            textAnchor="middle" dominantBaseline="middle"
            fontSize="200" fill="none"
            stroke="rgba(200,164,90,0.8)" strokeWidth="1"
            fontWeight="700"
            fontFamily="'Playfair Display', Georgia, serif"
            letterSpacing="0.08em"
          >
            VOL
          </text>
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* ── Section Header ───────────────────────── */}
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
                § 06 &nbsp;—&nbsp; {t("sectionCategory")}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width: "44px", height: "44px",
              border: "1px solid rgba(200,164,90,0.3)",
              borderRadius: "2px",
              background: "rgba(200,164,90,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Heart size={20} style={{ color: "var(--gold)", strokeWidth: 1.6 }} />
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


        {/* ── Active Card ──────────────────────────── */}
        {volunteering.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              display: activeIndex === index ? "block" : "none",
              opacity: visibleCards[index] ? 1 : 0,
              transform: visibleCards[index] ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">

              {/* ── Left: Image column ─────────────── */}
              <div className="lg:col-span-5">
                <div
                  className="group relative overflow-hidden"
                  style={{
                    borderRadius: "2px",
                    border: "1px solid rgba(200,164,90,0.2)",
                    borderTop: "2px solid rgba(200,164,90,0.4)",
                    aspectRatio: "4 / 3",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.role}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.2) 50%, transparent 100%)",
                    }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" }} />
                  <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" }} />

                  {/* Role badge pinned on image */}
                  <div
                    className="absolute bottom-4 left-4 right-4 px-4 py-3"
                    style={{
                      background: "rgba(13,27,42,0.9)",
                      border: "1px solid rgba(200,164,90,0.25)",
                      borderLeft: "3px solid var(--gold)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "2px",
                    }}
                  >
                    <p style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "var(--gold-light)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      marginBottom: "2px",
                    }}>
                      {item.role}
                    </p>
                    <p style={{
                      color: "var(--cream-dim)",
                      fontSize: "0.72rem",
                      fontFamily: "'Sora', sans-serif",
                      letterSpacing: "0.05em",
                    }}>
                      {item.organization}
                    </p>
                  </div>

                  {/* Index stamp */}
                  <div
                    className="absolute top-3 right-3"
                    style={{
                      padding: "3px 10px",
                      background: "rgba(13,27,42,0.85)",
                      border: "1px solid rgba(200,164,90,0.3)",
                      borderRadius: "2px",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "var(--gold-dim)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}>
                      {String(index + 1).padStart(2, "0")} / {String(volunteering.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Right: Content column ──────────── */}
              <div className="lg:col-span-7 space-y-6">

                {/* Meta row */}
                <div className="flex flex-wrap gap-3">
                  {/* Date pill */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "5px 14px",
                    border: "1px solid rgba(200,164,90,0.3)",
                    borderRadius: "2px",
                    background: "rgba(200,164,90,0.06)",
                  }}>
                    <Calendar size={12} style={{ color: "var(--gold)" }} />
                    <span style={{
                      color: "var(--gold)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Sora', sans-serif",
                    }}>
                      {item.date}
                    </span>
                  </div>

                  {/* Location pill */}
                  {item.location && (
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "5px 14px",
                      border: "1px solid rgba(200,164,90,0.15)",
                      borderRadius: "2px",
                      background: "transparent",
                    }}>
                      <MapPin size={12} style={{ color: "var(--slate)" }} />
                      <span style={{
                        color: "var(--slate)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        fontFamily: "'Sora', sans-serif",
                      }}>
                        {item.location}
                      </span>
                    </div>
                  )}
                </div>

                {/* Role heading */}
                <div className="space-y-3">
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 55%, #8a6e35 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.2,
                  }}>
                    {item.role}
                  </h3>

                  {/* Gold rule */}
                  <div className="flex items-center gap-3">
                    <span className="block h-px w-12"
                      style={{ background: "var(--gold)" }} />
                    <span style={{ color: "var(--gold-dim)", fontSize: "0.5rem" }}>✦</span>
                    <span className="block h-px flex-1 max-w-[80px]"
                      style={{ background: "linear-gradient(90deg, var(--gold-dim), transparent)" }} />
                  </div>

                  <p style={{
                    color: "var(--cream)",
                    fontSize: "1.1rem",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                  }}>
                    {item.organization}
                  </p>

                  {item.event && (
                    <p style={{
                      color: "var(--cream-dim)",
                      fontSize: "0.9rem",
                      fontFamily: "'Sora', sans-serif",
                    }}>
                      {item.event}
                    </p>
                  )}
                </div>

                {/* Description block */}
                <div
                  style={{
                    padding: "24px 28px",
                    background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                    border: "1px solid rgba(200,164,90,0.12)",
                    borderLeft: "3px solid rgba(200,164,90,0.5)",
                    borderRadius: "2px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Dot-grid */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.05) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                  }} />

                  {/* Opening quote mark */}
                  <span
                    className="relative z-10 block"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "rgba(200,164,90,0.25)",
                      fontSize: "3.5rem",
                      lineHeight: 0.8,
                      marginBottom: "8px",
                    }}
                  >
                    "
                  </span>

                  <p
                    className="relative z-10"
                    style={{
                      color: "var(--cream-dim)",
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeIndex === 0}
                    className="group flex items-center gap-2 transition-all duration-300"
                    style={{
                      padding: "8px 20px",
                      border: "1px solid rgba(200,164,90,0.25)",
                      borderRadius: "2px",
                      background: "transparent",
                      color: activeIndex === 0 ? "rgba(200,164,90,0.2)" : "var(--gold-dim)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Sora', sans-serif",
                      cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    <ChevronRight size={12} style={{ transform: "rotate(180deg)" }} />
                    {t("prevButton")}
                  </button>

                  {/* Progress dots */}
                  <div className="flex gap-2 flex-1 justify-center">
                    {volunteering.map((_: any, di: number) => (
                      <button
                        key={di}
                        onClick={() => setActiveIndex(di)}
                        style={{
                          width:  di === activeIndex ? "24px" : "8px",
                          height: "6px",
                          borderRadius: "1px",
                          background: di === activeIndex ? "var(--gold)" : "rgba(200,164,90,0.2)",
                          border: `1px solid ${di === activeIndex ? "var(--gold)" : "rgba(200,164,90,0.25)"}`,
                          transition: "all 0.4s ease",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveIndex((prev) => Math.min(volunteering.length - 1, prev + 1))}
                    disabled={activeIndex === volunteering.length - 1}
                    className="group flex items-center gap-2 transition-all duration-300"
                    style={{
                      padding: "8px 20px",
                      border: "1px solid rgba(200,164,90,0.25)",
                      borderRadius: "2px",
                      background: "transparent",
                      color: activeIndex === volunteering.length - 1
                        ? "rgba(200,164,90,0.2)"
                        : "var(--gold-dim)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Sora', sans-serif",
                      cursor: activeIndex === volunteering.length - 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    {t("nextButton")}
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ── All entries — compact list below ─────── */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <span className="block h-px flex-1"
              style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.3))" }} />
            <span style={{
              color: "var(--gold-dim)", fontSize: "0.6rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              fontFamily: "'Sora', sans-serif",
            }}>
              {t("allEntries")}
            </span>
            <span className="block h-px flex-1"
              style={{ background: "linear-gradient(90deg, rgba(200,164,90,0.3), transparent)" }} />
          </div>

          <div className="space-y-3">
            {volunteering.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="w-full group text-left"
                style={{
                  opacity: visibleCards[index] ? 1 : 0,
                  transform: visibleCards[index] ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    background: activeIndex === index
                      ? "linear-gradient(145deg, var(--navy-surface), var(--navy-mid))"
                      : "transparent",
                    border: "1px solid",
                    borderColor: activeIndex === index
                      ? "rgba(200,164,90,0.3)"
                      : "rgba(200,164,90,0.08)",
                    borderLeft: `3px solid ${activeIndex === index ? "var(--gold)" : "rgba(200,164,90,0.2)"}`,
                    borderRadius: "2px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeIndex !== index) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.25)";
                      (e.currentTarget as HTMLElement).style.background   = "rgba(200,164,90,0.03)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeIndex !== index) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.08)";
                      (e.currentTarget as HTMLElement).style.background   = "transparent";
                    }
                  }}
                >
                  {/* Index */}
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    color: activeIndex === index ? "var(--gold)" : "rgba(200,164,90,0.3)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    minWidth: "28px",
                    transition: "color 0.3s",
                  }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Vertical divider */}
                  <span className="block w-px h-8"
                    style={{ background: "rgba(200,164,90,0.2)" }} />

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: activeIndex === index ? "var(--gold-light)" : "var(--cream)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      marginBottom: "2px",
                      transition: "color 0.3s",
                    }}>
                      {item.role}
                    </p>
                    <p style={{
                      color: "var(--slate)",
                      fontSize: "0.72rem",
                      fontFamily: "'Sora', sans-serif",
                      letterSpacing: "0.05em",
                    }}>
                      {item.organization} · {item.date}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={14}
                    style={{
                      color: activeIndex === index ? "var(--gold)" : "rgba(200,164,90,0.25)",
                      flexShrink: 0,
                      transition: "color 0.3s, transform 0.3s",
                      transform: activeIndex === index ? "translateX(2px)" : "none",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}