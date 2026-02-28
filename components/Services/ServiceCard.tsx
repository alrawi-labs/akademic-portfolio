"use client";

import { useRef } from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  isVisible: boolean;
}

/* Roman numerals for first four cards */
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export default function ServiceCard({
  number,
  title,
  description,
  icon: Icon,
  index,
  isVisible,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Mouse-follow spotlight */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
        border: "1px solid rgba(200,164,90,0.12)",
        borderTop: "2px solid rgba(200,164,90,0.18)",
        borderRadius: "2px",
        padding: "36px 32px",
        transition: "border-color 0.4s, transform 0.3s, box-shadow 0.4s",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.45)";
        (e.currentTarget as HTMLElement).style.borderTopColor = "var(--gold)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 40px rgba(200,164,90,0.12), 0 4px 16px rgba(0,0,0,0.3)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.12)";
        (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(200,164,90,0.18)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = isVisible ? "translateY(0)" : "translateY(20px)";
      }}
    >
      {/* Mouse-follow spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx) var(--my), rgba(200,164,90,0.07), transparent 50%)",
        }}
      />

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.07) 1px, transparent 0)",
          backgroundSize: "36px 36px",
          opacity: 0.7,
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ borderTop: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ borderBottom: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" }}
      />

      {/* ── Card content ───────────────────────────────── */}
      <div className="relative z-10">

        {/* Icon row + Roman numeral */}
        <div className="flex items-start justify-between mb-6">

          {/* Icon container */}
          <div
            className="flex items-center justify-center transition-all duration-400 group-hover:scale-110"
            style={{
              width: "48px",
              height: "48px",
              border: "1px solid rgba(200,164,90,0.25)",
              borderRadius: "2px",
              background: "rgba(200,164,90,0.06)",
              transition: "background 0.4s, border-color 0.4s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(200,164,90,0.14)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(200,164,90,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.25)";
            }}
          >
            <Icon
              style={{
                width: "22px",
                height: "22px",
                color: "var(--gold)",
                strokeWidth: 1.6,
              }}
            />
          </div>

          {/* Roman numeral */}
          <div className="text-right">
            <span
              style={{
                display: "block",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "rgba(200,164,90,0.12)",
                lineHeight: 1,
                transition: "color 0.4s",
              }}
              className="group-hover:!text-[rgba(200,164,90,0.3)]"
            >
              {ROMAN[index] ?? number.toString().padStart(2, "0")}
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
                opacity: 0.5,
                marginTop: "2px",
              }}
            >
              {number.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Thin rule */}
        <div
          className="mb-4"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, rgba(200,164,90,0.25), transparent)",
            width: "100%",
          }}
        />

        {/* Title */}
        <h3
          className="mb-3 transition-colors duration-300"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--cream)",
            lineHeight: 1.35,
          }}
        >
          <span
            className="group-hover:text-[var(--gold-light)] transition-colors duration-300"
            style={{ display: "inline" }}
          >
            {title}
          </span>
        </h3>

        {/* Description */}
        <p
          style={{
            color: "rgba(184,176,160,0.65)",
            fontSize: "0.88rem",
            lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
            transition: "color 0.3s",
          }}
          className="group-hover:!text-[var(--cream-dim)]"
        >
          {description}
        </p>

        {/* Animated bottom rule */}
        <div
          className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700"
          style={{
            background:
              "linear-gradient(90deg, var(--gold-dim), var(--gold), transparent)",
          }}
        />
      </div>
    </div>
  );
}