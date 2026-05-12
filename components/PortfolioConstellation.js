"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getConstellation } from "../data/constellations";
import { localizeConstellation, localizeProject, uiText } from "../data/i18n";
import ConstellationChart from "./ConstellationChart";
import { useLanguage } from "./LanguageProvider";

export default function PortfolioConstellation({ projects }) {
  const { language } = useLanguage();
  const t = uiText[language];
  const [activeIndex, setActiveIndex] = useState(0);

  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, language)),
    [projects, language]
  );
  const activeProject = localizedProjects[activeIndex];
  const activeSourceProject = projects[activeIndex];
  const constellation = localizeConstellation(
    getConstellation(activeSourceProject.id),
    activeSourceProject.id,
    language
  );

  const previousProject = useMemo(
    () => localizedProjects[(activeIndex - 1 + localizedProjects.length) % localizedProjects.length],
    [activeIndex, localizedProjects]
  );
  const nextProject = useMemo(
    () => localizedProjects[(activeIndex + 1) % localizedProjects.length],
    [activeIndex, localizedProjects]
  );

  function move(direction) {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [projects.length]);

  return (
    <main className="portfolio-shell">
      <section className="constellation-stage" aria-label="Project constellation carousel">
        <div className="top-bar">
          <div>
            <p className="eyebrow">Security Backend Portfolio</p>
            <h1>{t.portfolioName}</h1>
          </div>
          <div className="quick-stats" aria-label={t.portfolioSummary}>
            <span>{projects.length} Project Constellations</span>
            <span>Backend</span>
            <span>Security</span>
          </div>
        </div>

        <div className="carousel-shell">
          <button
            type="button"
            className="nav-orbit previous"
            onClick={() => move(-1)}
            aria-label={`${t.previousConstellation}: ${previousProject.title}`}
          >
            <span>{t.previous}</span>
            <strong>{previousProject.title}</strong>
          </button>

          <article key={`${activeProject.id}-${language}`} className="constellation-card">
            <div className="carousel-index">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>

            <Link
              className="constellation-link"
              href={`/projects/${activeProject.id}`}
              aria-label={`${activeProject.title} ${t.detailPage}`}
            >
              <ConstellationChart constellation={constellation} />
            </Link>

            <div className="constellation-copy">
              <p className="eyebrow">{constellation.motif}</p>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.summary}</p>

              <div className="constellation-meta">
                <span>{activeProject.period}</span>
                <span>{activeProject.category.join(" / ")}</span>
                <span>{t.status[activeProject.status] ?? activeProject.status}</span>
              </div>

              <div className="constellation-actions">
                <Link href={`/projects/${activeProject.id}`}>{t.detailCta}</Link>
                <span>{t.moveHint}</span>
              </div>
            </div>
          </article>

          <button
            type="button"
            className="nav-orbit next"
            onClick={() => move(1)}
            aria-label={`${t.nextConstellation}: ${nextProject.title}`}
          >
            <span>{t.next}</span>
            <strong>{nextProject.title}</strong>
          </button>
        </div>

        <div className="constellation-dots" aria-label={t.quickNav}>
          {localizedProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`${project.title} ${t.selectConstellation}`}
              aria-pressed={index === activeIndex}
            >
              <span>{project.title}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
