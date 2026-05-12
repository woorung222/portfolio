"use client";

import { uiText } from "../data/i18n";
import { useLanguage } from "./LanguageProvider";

export default function ConstellationChart({
  constellation,
  compact = false,
  interactive = false,
  selectedStarId,
  onSelectStar
}) {
  const { language } = useLanguage();
  const t = uiText[language];

  return (
    <div className={`constellation-chart ${compact ? "compact" : ""} tone-${constellation.tone}`}>
      <div className="constellation-aura" aria-hidden="true" />
      <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {constellation.connections.map(([from, to]) => {
          const start = constellation.stars.find((star) => star.id === from);
          const end = constellation.stars.find((star) => star.id === to);
          return (
            <line
              key={`${from}-${to}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              className="line active"
            />
          );
        })}
      </svg>

      {constellation.stars.map((star, index) => {
        const className = [
          "constellation-star",
          `type-${star.type}`,
          index === 0 ? "primary" : "",
          selectedStarId === star.id ? "selected" : "",
          interactive ? "interactive" : ""
        ].filter(Boolean).join(" ");
        const content = (
          <>
            <span className="star-dot" aria-hidden="true" />
            <span className="star-label">{star.label}</span>
            {!compact ? <span className="star-kind">{t.starTypes[star.type]}</span> : null}
          </>
        );

        if (interactive) {
          return (
            <button
              key={star.id}
              type="button"
              className={className}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              onClick={() => onSelectStar?.(star)}
              aria-pressed={selectedStarId === star.id}
            >
              {content}
            </button>
          );
        }

        return (
          <div
            key={star.id}
            className={className}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
