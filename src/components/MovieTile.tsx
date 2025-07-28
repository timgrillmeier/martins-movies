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
        {/* Movie List Image */}
        <div className="listing-image">
          <img
            src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "/images/movie-tile-fallback.webp"}
            alt=""
            style={{ height: 375, width: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Movie List Content */}
        <div className="listing-content">
          <div className="inner">
            {/* Play Button */}
            <div className="play-btn">
              <a href={playUrl} className="play-video" style={{ cursor: "pointer" }}>
                <i className="fa fa-play"></i>
              </a>
            </div>
            <h2 className="title">{title}</h2>
            {/* Rating */}
            <div className="stars">
              <div className="rating">
                <i className="fa fa-star"></i>
                <span>{rating}</span>
                <span className="category">{category}</span>
              </div>
            </div>
            <p>{description}</p>
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
