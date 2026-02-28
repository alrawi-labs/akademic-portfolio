'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing, type Locale } from '@/i18n/routing';
import { ChevronDown, Check } from 'lucide-react';
import { systemLanguages } from '@/data/systemLanguages';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale  = useLocale() as Locale;
  const router  = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const languageNames = Object.fromEntries(
    systemLanguages.map((lang) => [lang.code, lang.name])
  ) as Record<Locale, string>;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>

      {/* ── Trigger ───────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language selection"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '8px 16px',
          background: 'transparent',
          border: `1px solid ${isOpen ? 'rgba(200,164,90,0.55)' : 'rgba(200,164,90,0.22)'}`,
          borderRadius: '2px',
          color: isOpen ? 'var(--gold)' : 'var(--cream-dim)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: "'Sora', sans-serif",
          cursor: 'pointer',
          transition: 'all 0.3s',
          backdropFilter: 'blur(8px)',
          backgroundColor: isOpen ? 'rgba(200,164,90,0.06)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,164,90,0.55)';
          (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,164,90,0.22)';
            (e.currentTarget as HTMLElement).style.color = 'var(--cream-dim)';
          }
        }}
      >
        {/* Globe icon — hand-drawn feel */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.75 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>

        <span>{languageNames[locale]}</span>

        <ChevronDown
          size={11}
          style={{
            transition: 'transform 0.35s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--gold-dim)',
          }}
        />
      </button>

      {/* ── Dropdown ──────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          left: 0,
          minWidth: '168px',
          background: 'rgba(13,27,42,0.97)',
          border: '1px solid rgba(200,164,90,0.2)',
          borderTop: '2px solid var(--gold)',
          borderRadius: '2px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(18px)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s, transform 0.3s',
          zIndex: 70,
          overflow: 'hidden',
        }}
      >
        {(routing.locales as readonly Locale[]).map((lang, i) => {
          const isActive = locale === lang;
          return (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              style={{
                width: '100%',
                textAlign: 'start',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                background: isActive ? 'rgba(200,164,90,0.1)' : 'transparent',
                border: 'none',
                borderBottom:
                  i < routing.locales.length - 1
                    ? '1px solid rgba(200,164,90,0.07)'
                    : 'none',
                color: isActive ? 'var(--gold)' : 'var(--cream-dim)',
                fontSize: '0.68rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontFamily: "'Sora', sans-serif",
                cursor: 'pointer',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                  (e.currentTarget as HTMLElement).style.background =
                    'rgba(200,164,90,0.06)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--cream-dim)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <span>{languageNames[lang]}</span>

              {isActive ? (
                <Check
                  size={11}
                  style={{ color: 'var(--gold)', flexShrink: 0 }}
                />
              ) : (
                /* Right chevron placeholder for alignment */
                <span
                  style={{
                    width: '11px',
                    color: 'var(--gold-dim)',
                    fontSize: '0.7rem',
                    opacity: 0.5,
                  }}
                >
                  ›
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}