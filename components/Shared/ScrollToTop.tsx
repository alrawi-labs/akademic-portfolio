'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible,      setIsVisible]      = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY          = window.scrollY;
      const scrollHeight     = document.documentElement.scrollHeight;
      const clientHeight     = window.innerHeight;
      const scrollableHeight = scrollHeight - clientHeight;

      setIsVisible(scrollY > 500);
      setScrollProgress(
        scrollableHeight > 0
          ? Math.min((scrollY / scrollableHeight) * 100, 100)
          : 0
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /*
   * Square progress border using a single SVG <rect>.
   * perimeter = 4 * side. We animate strokeDashoffset along the rect.
   */
  const SIZE        = 60;   // svg viewport
  const STROKE      = 2;
  const INSET       = STROKE / 2 + 1;
  const SIDE        = SIZE - INSET * 2;
  const PERIMETER   = SIDE * 4;
  const dashOffset  = PERIMETER * (1 - scrollProgress / 100);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .scroll-top-enter { animation: slideUpIn 0.4s ease-out; }
      ` }} />

      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="scroll-top-enter fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
        >
          <div className="relative w-[46px] h-[46px]">

            {/* Square SVG progress ring — sits just outside the button */}
            <svg
              width={SIZE} height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute pointer-events-none"
              style={{
                top:  -(SIZE - 46) / 2,
                left: -(SIZE - 46) / 2,
                filter: "drop-shadow(0 0 4px rgba(200,164,90,0.35))",
              }}
            >
              {/* Track */}
              <rect
                x={INSET} y={INSET}
                width={SIDE} height={SIDE}
                fill="none"
                stroke="rgba(200,164,90,0.12)"
                strokeWidth={STROKE}
              />
              {/* Progress — starts from top-left, goes clockwise */}
              <rect
                x={INSET} y={INSET}
                width={SIDE} height={SIDE}
                fill="none"
                stroke="url(#goldSquare)"
                strokeWidth={STROKE}
                strokeDasharray={PERIMETER}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.25s ease" }}
                /* SVG default start point is top-right; shift to top-left */
                pathLength={PERIMETER}
              />
              <defs>
                <linearGradient id="goldSquare" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#e0c07a" />
                  <stop offset="50%"  stopColor="#c8a45a" />
                  <stop offset="100%" stopColor="#8a6e35" />
                </linearGradient>
              </defs>
            </svg>

            {/* Button face */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(145deg, var(--navy-surface, #0f1f32) 0%, var(--navy-mid, #0d1b2a) 100%)",
                border: "1px solid rgba(200,164,90,0.35)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.7)")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.35)")}
            >
              {/* % label on hover */}
              <span
                className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                style={{
                  color: "var(--gold-dim, #c8a45a)",
                  fontSize: "0.5rem",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {Math.round(scrollProgress)}%
              </span>

              <ArrowUp
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ color: "var(--gold, #c8a45a)", strokeWidth: 2 }}
              />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderTop: "1.5px solid var(--gold,#c8a45a)", borderLeft: "1.5px solid var(--gold,#c8a45a)" }} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderBottom: "1.5px solid var(--gold,#c8a45a)", borderRight: "1.5px solid var(--gold,#c8a45a)" }} />
            </div>
          </div>
        </button>
      )}
    </>
  );
}