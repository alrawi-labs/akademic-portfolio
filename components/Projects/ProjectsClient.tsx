"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Calendar, X, BookOpen, FileText } from "lucide-react";
import { localeMap } from "@/data/systemLanguages";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  date?: string;
  isFeatured?: boolean;
}

interface Translations {
  hero: { badge: string; title: string; subtitle: string; sectionCategory: string };
  search: { placeholder: string; filterButton: string; showingResults: string; project: string; projects: string };
  categories: { all: string; webDevelopment: string; mobileApp: string; design: string; aiMl: string; blockchain: string };
  noResults: { title: string; description: string; clearButton: string };
}

interface ProjectsClientProps {
  projects: Project[];
  translations: Translations;
  locale: string;
}

export default function ProjectsClient({ projects, translations, locale }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery,       setSearchQuery]       = useState("");
  const [filteredProjects,  setFilteredProjects]  = useState<Project[]>(projects);
  const [showFilters,       setShowFilters]        = useState(false);
  const [isVisible,         setIsVisible]          = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date       = new Date(dateString);
    const localeCode = localeMap[locale as keyof typeof localeMap] || "en-US";
    return date.toLocaleDateString(localeCode, { month: "long", year: "numeric" });
  };

  useEffect(() => {
    let filtered = projects;
    if (selectedCategory !== "all") {
      const categoryName = translations.categories[selectedCategory as keyof typeof translations.categories];
      filtered = filtered.filter((p) => p.category === categoryName);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery, projects, translations]);

  const categories = ["all", "webDevelopment", "mobileApp", "design", "aiMl", "blockchain"];

  /* Shared field style */
  const inputStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
    border: "1px solid rgba(200,164,90,0.2)",
    borderRadius: "2px",
    color: "var(--cream)",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "var(--bg-primary)", color: "var(--cream)" }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 45% at 0%   10%, rgba(21,35,54,0.9)  0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 40% at 100% 90%, rgba(28,47,68,0.55) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }}>
          {[120,240,360,480,600,720,840,960].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <line x1="80" y1="0" x2="80" y2="100%" stroke="rgba(200,164,90,0.2)" strokeWidth="0.5" />
          <path d="M 60 80 L 60 130 L 110 130"        fill="none" stroke="rgba(200,164,90,0.6)" strokeWidth="1.2" />
          <path d="M 1140 880 L 1140 830 L 1090 830"  fill="none" stroke="rgba(200,164,90,0.6)" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="relative z-10">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className={`container mx-auto max-w-3xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>

            {/* Section marker */}
            <div className="flex justify-center mb-6">
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
                  § {translations.hero.sectionCategory} &nbsp;—&nbsp; {translations.hero.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div style={{
                width: "44px", height: "44px",
                border: "1px solid rgba(200,164,90,0.3)", borderRadius: "2px",
                background: "rgba(200,164,90,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <FileText size={20} style={{ color: "var(--gold)", strokeWidth: 1.6 }} />
              </div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 800,
                background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 50%, #8a6e35 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.15,
              }}>
                {translations.hero.title}
              </h1>
            </div>

            <p style={{
              color: "var(--cream-dim)", fontSize: "1rem", lineHeight: 1.75,
              fontFamily: "'Sora', sans-serif", maxWidth: "520px", margin: "0 auto",
            }}>
              {translations.hero.subtitle}
            </p>

            <div className="flex items-center justify-center gap-3 mt-7">
              <span className="block h-px w-14" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
              <span style={{ color: "var(--gold-dim)", fontSize: "0.55rem" }}>✦</span>
              <span className="block h-px w-14" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
            </div>
          </div>
        </div>

        {/* ── Search + Filter bar ───────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-10">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--slate)" }} />
              <input
                type="text"
                placeholder={translations.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...inputStyle, width: "100%", padding: "11px 40px 11px 40px" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,164,90,0.5)";
                  e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(200,164,90,0.07)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,164,90,0.2)";
                  e.currentTarget.style.boxShadow   = "none";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "var(--slate)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--slate)")}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                padding: "10px 20px",
                border: "1px solid rgba(200,164,90,0.3)", borderRadius: "2px",
                background: showFilters ? "rgba(200,164,90,0.1)" : "transparent",
                color: "var(--gold)",
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <SlidersHorizontal size={13} />
              {translations.search.filterButton}
            </button>

            {/* Desktop category filters */}
            <div className="hidden lg:flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    border: selectedCategory === cat
                      ? "1px solid rgba(200,164,90,0.55)"
                      : "1px solid rgba(200,164,90,0.15)",
                    borderBottom: selectedCategory === cat
                      ? "2px solid var(--gold)"
                      : "1px solid rgba(200,164,90,0.15)",
                    borderRadius: "2px",
                    background: selectedCategory === cat ? "rgba(200,164,90,0.1)" : "transparent",
                    color: selectedCategory === cat ? "var(--gold)" : "var(--cream-dim)",
                    fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.35)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold-light)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.15)";
                      (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
                    }
                  }}
                >
                  {translations.categories[cat as keyof typeof translations.categories]}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filters dropdown */}
          {showFilters && (
            <div
              className="lg:hidden mt-3 flex flex-wrap gap-2 p-4"
              style={{
                border: "1px solid rgba(200,164,90,0.15)",
                borderTop: "2px solid rgba(200,164,90,0.3)",
                borderRadius: "2px",
                background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                  style={{
                    padding: "6px 14px",
                    border: selectedCategory === cat
                      ? "1px solid var(--gold)"
                      : "1px solid rgba(200,164,90,0.2)",
                    borderRadius: "2px",
                    background: selectedCategory === cat ? "rgba(200,164,90,0.12)" : "transparent",
                    color: selectedCategory === cat ? "var(--gold)" : "var(--cream-dim)",
                    fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  {translations.categories[cat as keyof typeof translations.categories]}
                </button>
              ))}
            </div>
          )}

          {/* Results count */}
          <div className="mt-5 flex items-center gap-3">
            <span className="block h-px w-6" style={{ background: "var(--gold)" }} />
            <span style={{
              color: "var(--slate)", fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "'Sora', sans-serif",
            }}>
              {translations.search.showingResults}{" "}
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>
                {filteredProjects.length}
              </span>{" "}
              {filteredProjects.length === 1
                ? translations.search.project
                : translations.search.projects}
            </span>
          </div>
        </div>

        {/* ── Projects Grid ─────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-24">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filteredProjects.map((project, i) => (
                <Link
                  href={`/${locale}/projects/${project.id}`}
                  key={project.id}
                  className="group block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms`,
                  }}
                >
                  <div
                    className="relative overflow-hidden h-full"
                    style={{
                      border: "1px solid rgba(200,164,90,0.12)",
                      borderTop: "2px solid rgba(200,164,90,0.25)",
                      borderRadius: "2px",
                      background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                      transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor    = "rgba(200,164,90,0.4)";
                      el.style.borderTopColor = "var(--gold)";
                      el.style.boxShadow      = "0 16px 48px rgba(0,0,0,0.4)";
                      el.style.transform      = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor    = "rgba(200,164,90,0.12)";
                      el.style.borderTopColor = "rgba(200,164,90,0.25)";
                      el.style.boxShadow      = "none";
                      el.style.transform      = "translateY(0)";
                    }}
                  >
                    {/* Dot-grid */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.04) 1px, transparent 0)",
                      backgroundSize: "28px 28px",
                    }} />

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderTop: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" }} />
                    <div className="absolute bottom-0 left-0 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderBottom: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" }} />

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={project.image} alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.2) 50%, transparent 100%)" }} />

                      {/* Category badge */}
                      <div
                        className="absolute top-3 left-3"
                        style={{
                          padding: "3px 10px",
                          background: "rgba(13,27,42,0.88)",
                          border: "1px solid rgba(200,164,90,0.3)",
                          borderRadius: "2px",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <span style={{
                          color: "var(--gold)", fontSize: "0.58rem",
                          fontWeight: 700, letterSpacing: "0.18em",
                          textTransform: "uppercase", fontFamily: "'Sora', sans-serif",
                        }}>
                          {project.category}
                        </span>
                      </div>

                      {/* Index stamp */}
                      <span className="absolute top-3 right-3" style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "rgba(200,164,90,0.5)", fontSize: "0.65rem", fontWeight: 700,
                      }}>
                        {String(filteredProjects.indexOf(project) + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-5">
                      {project.date && (
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar size={11} style={{ color: "var(--slate)" }} />
                          <span style={{
                            color: "var(--slate)", fontSize: "0.65rem",
                            fontFamily: "'Sora', sans-serif", letterSpacing: "0.08em",
                          }}>
                            {formatDate(project.date)}
                          </span>
                        </div>
                      )}

                      <h3
                        className="mb-1 group-hover:text-[var(--gold-light)] transition-colors duration-300"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.1rem", fontWeight: 700,
                          color: "var(--cream)", lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </h3>

                      {project.subtitle && (
                        <p style={{
                          color: "var(--gold-dim)", fontSize: "0.8rem",
                          fontFamily: "'Sora', sans-serif", marginBottom: "6px",
                        }}>
                          {project.subtitle}
                        </p>
                      )}

                      <p className="line-clamp-2 mb-4" style={{
                        color: "var(--cream-dim)", fontSize: "0.82rem",
                        fontFamily: "'Sora', sans-serif", lineHeight: 1.7,
                      }}>
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "2px 9px",
                              border: "1px solid rgba(200,164,90,0.18)",
                              borderRadius: "2px",
                              color: "var(--slate)",
                              fontSize: "0.6rem",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              fontFamily: "'Sora', sans-serif",
                              transition: "border-color 0.2s, color 0.2s",
                            }}
                            className="group-hover:!border-[rgba(200,164,90,0.35)] group-hover:!text-[var(--gold-dim)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom accent bar */}
                      <div className="mt-4 h-px overflow-hidden"
                        style={{ background: "rgba(200,164,90,0.08)" }}>
                        <div
                          className="h-full w-0 group-hover:w-1/2 transition-all duration-500"
                          style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* No results */
            <div className="text-center py-24">
              <div
                className="inline-flex items-center justify-center mb-6"
                style={{
                  width: "72px", height: "72px",
                  border: "1px solid rgba(200,164,90,0.25)", borderRadius: "2px",
                  background: "rgba(200,164,90,0.05)",
                }}
              >
                <Search size={28} style={{ color: "var(--gold-dim)" }} />
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "var(--cream)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px",
              }}>
                {translations.noResults.title}
              </h3>
              <p style={{
                color: "var(--cream-dim)", fontSize: "0.9rem",
                fontFamily: "'Sora', sans-serif", marginBottom: "24px",
              }}>
                {translations.noResults.description}
              </p>

              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  padding: "10px 24px",
                  background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)",
                  color: "var(--navy)", borderRadius: "2px",
                  fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(200,164,90,0.35)")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
              >
                <BookOpen size={13} />
                {translations.noResults.clearButton}
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      ` }} />
    </div>
  );
}