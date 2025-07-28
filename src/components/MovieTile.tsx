

"use client";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";

function formatRating(rating: string): string {
  const match = /([\d.]+)/.exec(rating);
  if (match) {
    const num = parseFloat(match[1]);
    if (!isNaN(num)) return num.toFixed(1);
  }
  return rating;
}

type MovieTileProps = {
  imageUrl: string;
  playUrl: string;
  title: string;
  rating: string;
  category: string;
  description: string;
  detailsUrl: string;
  id?: number | string;
};


const WATCHED_COOKIE = "watchedMovies";

const MovieTile: React.FC<MovieTileProps> = ({
  imageUrl,
  playUrl,
  title,
  rating,
  category,
  description,
  detailsUrl,
  id,
}) => {
  const movieId = id ?? title;
  const [watched, setWatched] = useState<boolean | null>(null);

  useEffect(() => {
    if (!movieId) return;
    const cookie = Cookies.get(WATCHED_COOKIE);
    let watchedArr: (string | number)[] = [];
    if (cookie) {
      try {
        watchedArr = JSON.parse(cookie);
      } catch {}
    }
    setWatched(watchedArr.includes(movieId));
  }, [movieId]);

  const handleToggle = () => {
    const cookie = Cookies.get(WATCHED_COOKIE);
    let watchedArr: (string | number)[] = [];
    if (cookie) {
      try {
        watchedArr = JSON.parse(cookie);
      } catch {}
    }
    let newArr;
    if (watched) {
      newArr = watchedArr.filter((v) => v !== movieId);
    } else {
      newArr = [...watchedArr, movieId];
    }
    Cookies.set(WATCHED_COOKIE, JSON.stringify(newArr), { expires: 365 });
    setWatched(!watched);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="movie-box-3 mb30" style={{ position: "relative" }}>
        {watched !== null && (
          <div className={`watched-checkbox-container${watched ? ' checked' : ''}`}>
            <label className="watched-checkbox-label">
              <input
                type="checkbox"
                checked={watched}
                onChange={handleToggle}
                className="watched-checkbox-input"
              />
              {watched ? "Watched" : "Mark as watched"}
            </label>
          </div>
        )}
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
              <div className="stars d-flex flex-row align-items-top col-12">
                <div className="rating mr-2" style={{ minWidth: "60px" }}>
                  <i className="fa fa-star"></i>
                  <span className="mr-2">{formatRating(rating)}/10</span>
                </div>
                <div style={{ textAlign: "right", width: "100%", flexGrow: 1 }}>
                  <span className="category flex-grow-1">{category}</span>
                </div>
              </div>
              <p className="movie-tile-description">{description}</p>
              <a href={detailsUrl} target="_blank" className="btn btn-main btn-effect" style={{ cursor: "pointer" }}>
                details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTile;
