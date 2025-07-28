function formatRating(rating: string): string {
  const match = /([\d.]+)/.exec(rating);
  if (match) {
    const num = parseFloat(match[1]);
    if (!isNaN(num)) return num.toFixed(1);
  }
  return rating;
}
import React from "react";

interface MovieTileProps {
  imageUrl: string;
  playUrl: string;
  title: string;
  rating: string;
  category: string;
  description: string;
  detailsUrl: string;
}

const MovieTile: React.FC<MovieTileProps> = ({
  imageUrl,
  playUrl,
  title,
  rating,
  category,
  description,
  detailsUrl,
}) => (
  <div className="col-lg-4 col-md-6 col-sm-12">
    <div className="movie-box-3 mb30">
      <div className="listing-container">
        <div className="listing-image">
          <img
            src={
              imageUrl && imageUrl.trim() !== "" && !imageUrl.includes("via.placeholder.com")
                ? imageUrl
                : "/images/movie-tile-fallback.png"
            }
            alt=""
            style={{ height: 375, width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="listing-content">
          <div className="inner">
            <div className="play-btn">
              <a href={playUrl} className="play-video" style={{ cursor: "pointer" }}>
                <i className="fa fa-play"></i>
              </a>
            </div>
            <h2 className="title">{title}</h2>
            <div className="stars">
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <span>{formatRating(rating)}/10</span>
                    <span className="category">{category}</span>
                </div>
            </div>
            <p className="movie-tile-description">{description}</p>
            <a href={detailsUrl} className="btn btn-main btn-effect" style={{ cursor: "pointer" }}>
              details
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieTile;
