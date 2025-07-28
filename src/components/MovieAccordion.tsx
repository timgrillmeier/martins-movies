import React, { useState } from "react";
import Image from "next/image";

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
    <div className="accordion mb-4" style={{ background: '#fff', width: '100%' }}>
      <div className="accordion-item" style={{ background: '#fff', border: 'none' }}>
        <div className="accordion-header d-flex align-items-center" style={{ cursor: "pointer", background: '#fff', border: 'none' }}>
          <Image
            src={imageUrl && imageUrl.trim() !== "" && !imageUrl.includes("via.placeholder.com") ? imageUrl : "/images/movie-tile-fallback.png"}
            alt={title}
            width={100}
            height={100}
            style={{ objectFit: "contain", borderRadius: 8, marginRight: 16 }}
            unoptimized={imageUrl?.startsWith("http")}
          />
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between">
              <span className="movie-accordion-title" style={{ fontWeight: 600, fontSize: 18, width: '100%', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
            </div>
            <div className="d-flex align-items-center mt-1">
              <span  className="text-muted">
                <span role="img" aria-label="star"><i style={{color: '#ffc741'}}className="fa fa-star"></i></span>
                {formatRating(rating)}/10
              </span>
              <span className="text-muted">{category}</span>
            </div>
            <div className="d-flex mt-3">
                <a href={playUrl} className="btn btn-main btn-effect btn-sm d-flex align-items-center mr-3">
                  <i className="fa fa-play mr-1"></i>Play
                </a>
                <a href={detailsUrl} className="btn btn-main btn-effect btn-sm mr-3">Details</a>
                <button 
                    className="btn btn-main btn-effect btn-sm"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? (
                    <i className="fa fa-chevron-up" style={{padding:0}}></i>
                    ) : (
                    <i className="fa fa-chevron-down" style={{padding:0}}></i>
                    )}
                </button>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="accordion-collapse show">
            <div className="accordion-body p-4">
              <div>{description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieAccordion;
