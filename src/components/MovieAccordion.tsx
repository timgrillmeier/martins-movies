import React, { useState } from "react";

interface MovieAccordionProps {
  imageUrl: string;
  playUrl: string;
  title: string;
  rating: string;
  category: string;
  description: string;
  detailsUrl: string;
}

function formatRating(rating: string): string {
  const match = /([\d.]+)/.exec(rating);
  if (match) {
    const num = parseFloat(match[1]);
    if (!isNaN(num)) return num.toFixed(1);
  }
  return rating;
}

const MovieAccordion: React.FC<MovieAccordionProps> = ({
  imageUrl,
  playUrl,
  title,
  rating,
  category,
  description,
  detailsUrl,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <div className="accordion-header d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
          <img
            src={imageUrl && imageUrl.trim() !== "" && !imageUrl.includes("via.placeholder.com") ? imageUrl : "/images/movie-tile-fallback.png"}
            alt=""
            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, marginRight: 16 }}
          />
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between">
              <span className="movie-accordion-title" style={{ fontWeight: 600, fontSize: 18, maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
              <button className="btn btn-sm btn-secondary" style={{ marginLeft: 16 }}>{expanded ? "Collapse" : "Expand"}</button>
            </div>
            <div className="d-flex align-items-center mt-1" style={{ fontSize: 14 }}>
              <span style={{ color: "#a889f5", fontWeight: 700, marginRight: 8 }}>
                <i className="fa fa-star" style={{ color: "#a889f5", marginRight: 2 }}></i>{formatRating(rating)}/10
              </span>
              <span className="text-muted" style={{ fontSize: 13 }}>{category}</span>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="accordion-collapse show">
            <div className="accordion-body">
              <div className="d-flex mb-2">
                <a href={playUrl} className="btn btn-effect btn-sm" style={{ background: "#a889f5", color: "#fff", marginRight: 8 }}>Play</a>
                <a href={detailsUrl} className="btn btn-effect btn-sm" style={{ background: "#a889f5", color: "#fff" }}>Details</a>
              </div>
              <div style={{ fontSize: 15 }}>{description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieAccordion;
