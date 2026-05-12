"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAegisStarDetail } from "../data/aegisStarDetails";
import { getIsmsStarDetail } from "../data/ismsStarDetails";
import { localizeConstellation, localizeProject, uiText } from "../data/i18n";
import { getPentestStarDetail } from "../data/pentestStarDetails";
import { getProjectDetail } from "../data/projectDetails";
import ConstellationChart from "./ConstellationChart";
import { useLanguage } from "./LanguageProvider";

function getMediaTitle(project, t) {
  if (project.media?.video) return t.demoVideo;
  if (project.media?.status?.includes("readme")) return t.readmeImages;
  if (project.status === "execution-deferred") return t.executionPlanned;
  return t.mediaCandidates;
}

export default function ProjectDetailView({ project, constellation }) {
  const { language } = useLanguage();
  const t = uiText[language];
  const [selectedStarId, setSelectedStarId] = useState(constellation.stars[0].id);

  const localizedProject = useMemo(
    () => localizeProject(project, language),
    [project, language]
  );
  const localizedConstellation = useMemo(
    () => localizeConstellation(constellation, project.id, language),
    [constellation, project.id, language]
  );
  const projectDetail = useMemo(
    () => getProjectDetail(project.id, language),
    [project.id, language]
  );
  const selectedStar =
    localizedConstellation.stars.find((star) => star.id === selectedStarId) ??
    localizedConstellation.stars[0];
  const aegisStarDetail = useMemo(
    () =>
      project.id === "cloud-ev-security"
        ? getAegisStarDetail(selectedStar.id, language)
        : null,
    [project.id, selectedStar.id, language]
  );
  const pentestStarDetail = useMemo(
    () =>
      project.id === "pentest-web"
        ? getPentestStarDetail(selectedStar.id, language)
        : null,
    [project.id, selectedStar.id, language]
  );
  const ismsStarDetail = useMemo(
    () =>
      project.id === "isms-automation"
        ? getIsmsStarDetail(selectedStar.id, language)
        : null,
    [project.id, selectedStar.id, language]
  );
  const activeStarDetail =
    aegisStarDetail?.detail ?? pentestStarDetail?.detail ?? ismsStarDetail?.detail;
  const activeStarDetailMeta = aegisStarDetail ?? pentestStarDetail ?? ismsStarDetail;
  const hidesCaseAssets =
    project.id === "cloud-ev-security" ||
    project.id === "pentest-web" ||
    project.id === "isms-automation";

  return (
    <main className="portfolio-shell detail-shell">
      <section className="project-detail">
        <div className="detail-nav">
          <Link href="/">{t.backToConstellations}</Link>
          <a href={localizedProject.repoUrl} target="_blank" rel="noopener noreferrer">
            {t.github}
          </a>
        </div>

        <header className="detail-hero">
          <div>
            <p className="eyebrow">{localizedConstellation.motif}</p>
            <h1>{localizedProject.title}</h1>
            <p>{localizedProject.summary}</p>
          </div>
          <div className="detail-status">
            <span>{localizedProject.period}</span>
            <span>{t.status[localizedProject.status] ?? localizedProject.status}</span>
          </div>
        </header>

        <div className="detail-layout star-detail-layout">
          <section
            className="detail-constellation"
            aria-label={`${localizedProject.title} detailed constellation`}
          >
            <ConstellationChart
              constellation={localizedConstellation}
              interactive
              selectedStarId={selectedStar.id}
              onSelectStar={(star) => setSelectedStarId(star.id)}
            />
          </section>

          <aside className="detail-info star-insight" aria-live="polite">
            <p className="eyebrow">{t.starTypes[selectedStar.type]}</p>
            <h2>{selectedStar.label}</h2>
            <p>{activeStarDetail?.summary ?? selectedStar.description}</p>

            {activeStarDetail ? (
              <section className="star-role-note compact">
                <h3>{activeStarDetailMeta.labels.role}</h3>
                <p>{activeStarDetail.role}</p>
              </section>
            ) : (
              <>
                <section>
                  <h3>{t.evidenceCandidates}</h3>
                  <ul>
                    {selectedStar.evidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3>{t.codeCandidates}</h3>
                  <ul>
                    {selectedStar.code.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </aside>
        </div>

        {activeStarDetail ? (
          <section className="aegis-deep-dive" aria-live="polite">
            <div className="aegis-deep-heading">
              <div className="aegis-selected-label">
                <span>{activeStarDetailMeta.labels.selected}</span>
                <strong>{selectedStar.label}</strong>
                <em>{t.starTypes[selectedStar.type]}</em>
              </div>
              <h2>{activeStarDetailMeta.labels.detail}</h2>
              <p>{activeStarDetail.detail}</p>
            </div>

            {activeStarDetail.comparison?.length ? (
              <section className="aegis-comparison-section">
                <div className="aegis-comparison-grid">
                  {activeStarDetail.comparison.map((item) => (
                    <article key={item.title} className="aegis-comparison-card">
                      <h3>{item.title}</h3>
                      <ul>
                        {item.items.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {activeStarDetail.callouts ? (
              <section className="aegis-callout-section">
                <h3>{activeStarDetailMeta.labels.numberGuide}</h3>
                <ol className="aegis-callout-list">
                  {activeStarDetail.callouts.map((item) => (
                    <li key={`${item.number}-${item.title}`}>
                      <span>{item.number}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : activeStarDetail.metrics ? (
              <div className="aegis-metric-grid">
                {activeStarDetail.metrics.map((metric) => (
                  <article key={`${metric.value}-${metric.label}`} className="aegis-metric">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                    <em>{metric.note}</em>
                  </article>
                ))}
              </div>
            ) : null}

            {activeStarDetail.evidence.length ? (
              <section className="aegis-evidence-section">
                <h3>{activeStarDetailMeta.labels.evidence}</h3>
                <div className="aegis-evidence-grid">
                  {activeStarDetail.evidence.map((item) => (
                    <article
                      key={`${item.title}-${item.src}`}
                      className={`aegis-evidence-card${item.fit === "natural" ? " natural-image" : ""}`}
                    >
                      <img src={item.src} alt={item.alt ?? item.title} loading="lazy" />
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.caption}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="aegis-code-section">
              <h3>{activeStarDetailMeta.labels.code}</h3>
              <div className="aegis-code-grid">
                {activeStarDetail.code.map((item) => (
                  <article key={`${item.title}-${item.focus}`} className="aegis-code-card">
                    <div>
                      <strong>{item.title}</strong>
                      <code>{item.path}</code>
                    </div>
                    <dl>
                      <div>
                        <dt>{activeStarDetailMeta.labels.codeFocus}</dt>
                        <dd>{item.focus}</dd>
                      </div>
                      <div>
                        <dt>{activeStarDetailMeta.labels.codeRole}</dt>
                        <dd>{item.role}</dd>
                      </div>
                      <div>
                        <dt>{activeStarDetailMeta.labels.codeSummary}</dt>
                        <dd>{item.summary}</dd>
                      </div>
                      <div>
                        <dt>{activeStarDetailMeta.labels.codeExplanation}</dt>
                        <dd>{item.explanation}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          </section>
        ) : null}

        <section className={activeStarDetail ? "project-common-section" : "project-common-flow"}>
          {activeStarDetail ? (
            <div className="common-section-heading">
              <p className="eyebrow">Project Common</p>
              <h2>{activeStarDetailMeta.labels.common}</h2>
            </div>
          ) : null}

        <div className="detail-grid">
          <section className="detail-block">
            <h2>{t.projectOverview}</h2>
            <p>{localizedProject.problem}</p>
            <p className="role-text">{localizedProject.role}</p>
          </section>

          <section className="detail-block">
            <h2>{t.techStack}</h2>
            <div className="tech-list">
              {localizedProject.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-grid">
          <section className="detail-block">
            <h2>{t.highlights}</h2>
            <ul>
              {localizedProject.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="detail-block">
            <h2>{t.securityBackendPoints}</h2>
            <ul>
              {localizedProject.securityNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {projectDetail ? (
          <section className="case-panel">
            <div className="case-heading">
              <p className="eyebrow">{projectDetail.labels.section}</p>
              <h2>{localizedProject.title}</h2>
            </div>

            <div className="case-grid">
              <article className="case-card wide">
                <h3>{projectDetail.labels.goal}</h3>
                <p>{projectDetail.caseStudy.goal}</p>
              </article>
              <article className="case-card">
                <h3>{projectDetail.labels.role}</h3>
                <p>{projectDetail.caseStudy.role}</p>
              </article>
            </div>

            <section className="case-card case-list">
              <h3>{projectDetail.labels.points}</h3>
              <ul>
                {projectDetail.caseStudy.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>

            {projectDetail.representativeFindings ? (
              <section className="case-card findings-card">
                <h3>{projectDetail.labels.findings}</h3>
                <p>{projectDetail.representativeFindings.summary}</p>
                <div className="findings-table" role="table">
                  {projectDetail.representativeFindings.items.map((finding) => (
                    <article key={finding.name} className="finding-row" role="row">
                      <strong>{finding.name}</strong>
                      <span>{finding.impact}</span>
                      <span>{finding.remediation}</span>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {!hidesCaseAssets ? (
            <div className="case-grid three">
              <section className="case-card">
                <h3>{projectDetail.labels.evidence}</h3>
                <div className="evidence-list">
                  {projectDetail.evidenceAssets.map((asset) => (
                    <article
                      key={`${asset.title}-${asset.source ?? asset.src ?? asset.status}`}
                      className={`evidence-item${asset.src ? " has-image" : ""}`}
                    >
                      {asset.src ? (
                        <img
                          src={asset.src}
                          alt={asset.alt ?? asset.title}
                          loading="lazy"
                        />
                      ) : null}
                      <strong>{asset.title}</strong>
                      {asset.source ? <span>{asset.source}</span> : null}
                      <em>{asset.status}</em>
                    </article>
                  ))}
                </div>
              </section>

              <section className="case-card">
                <h3>{projectDetail.labels.code}</h3>
                <div className="code-highlight-list">
                  {projectDetail.codeHighlights.map((item) => (
                    <article key={`${item.title}-${item.path}`} className="code-highlight">
                      <strong>{item.title}</strong>
                      <code>{item.path}</code>
                      <span>{item.note}</span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="case-card disclosure-card">
                <h3>{projectDetail.labels.disclosure}</h3>
                <ul>
                  {projectDetail.safeDisclosureNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </section>
            </div>
            ) : null}
          </section>
        ) : null}

        <section className="media-panel detail-media">
          <div>
            <h2>{getMediaTitle(localizedProject, t)}</h2>
            <p>{localizedProject.media.candidates.join(" · ")}</p>
          </div>
          {localizedProject.media.video ? (
            <video controls preload="metadata" src={`/${localizedProject.media.video}`} />
          ) : (
            <div className="media-placeholder">
              <span>
                {localizedProject.status === "execution-deferred" ? t.environmentPending : t.readmeSlot}
              </span>
            </div>
          )}
        </section>

        {localizedProject.id === "pentest-web" ? (
          <section className="safety-note">
            <h2>{t.publicSafetyStandard}</h2>
            <p>{t.safetyNote}</p>
          </section>
        ) : null}
        </section>
      </section>
    </main>
  );
}
