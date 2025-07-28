"use client";
import { useState, useEffect, useRef } from "react";
// import { getPopularMovies, searchMovies } from "../utils/api";
import MovieTile from "./MovieTile";
import MovieAccordion from "./MovieAccordion";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

interface MoviesListProps {
  initialData: any;
  initialQuery: string;
  initialPage: number;
}

export default function MoviesList({ initialData, initialQuery, initialPage }: MoviesListProps) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const SEARCH_THROTTLE_MS = 400;
  const ignoreNextPageEffect = useRef(false);
  const [movies, setMovies] = useState(initialData?.results || []);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState(initialQuery);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (query === lastQuery) return;

    // Clear previous timeout if set
    if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
    }

    searchTimeout.current = setTimeout(async () => {
      ignoreNextPageEffect.current = true;
      setPage(1);
      setLastQuery(query);
      setLoading(true);

      let res;
      if (query) {
        const resp = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=1`);
        res = await resp.json();
        router.replace(`/query/${encodeURIComponent(query)}`);
      } else {
        const resp = await fetch(`/api/popular?page=1`);
        res = await resp.json();
        router.replace("/");
      }
      setMovies(res?.results || []);
      setLoading(false);
    }, SEARCH_THROTTLE_MS);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [query]);

  useEffect(() => {
    if (ignoreNextPageEffect.current) { // Ignore the page update this time
        ignoreNextPageEffect.current = false; // Reset flag
        return; 
    }

    if (page === initialPage && query === initialQuery) return;
    setLoading(true);
    const fetchData = async () => {
      let res;
      if (query) {
        const resp = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}`);
        res = await resp.json();
        if (page !== 1) {
          router.replace(`/query/${encodeURIComponent(query)}/page/${page}`);
        } else {
          router.replace(`/query/${encodeURIComponent(query)}`);
        }
      } else {
        const resp = await fetch(`/api/popular?page=${page}`);
        res = await resp.json();
        if (page !== 1) {
          router.replace(`/page/${page}`);
        } else {
          router.replace("/");
        }
      }
      setMovies(res?.results || []);
      setLoading(false);
    };
    fetchData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <main className="bg-light ptb100">
      <div className="container">
        {/* Start of Filters */}
        <div className="row mb50">
          <div className="col-md-6">
            {/* Layout Switcher */}
            <div className="layout-switcher">
              <a
                className={`list${layout === 'list' ? ' active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setLayout('list')}
              >
                <i className="fa fa-align-justify"></i>
              </a>
              <a
                className={`grid${layout === 'grid' ? ' active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setLayout('grid')}
              >
                <i className="fa fa-th"></i>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="sort-by d-flex justify-content-end align-items-center">
              <form onSubmit={handleSearch} className="d-flex" style={{ marginRight: 16, width: 'auto' }}>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by keyword..."
                  className="form-control mr-2"
                  style={{ minWidth: 200, maxWidth: 300, width: '100%' }}
                />
                <button type="submit" className="btn btn-main btn-effect">
                  <i className="fa fa-search" style={{padding:0}}></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row">
          {loading ? (
            layout === 'grid' ? (
              <div className="loading-grid col-12">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="loading-tile"
                    style={{ animationDelay: `${(idx % 4) * 0.2}s` }}
                  />
                ))}
              </div>
            ) : (
              <div className="loading-list col-12">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="loading-row"
                    style={{ animationDelay: `${(idx % 3) * 0.2}s` }}
                  />
                ))}
              </div>
            )
          ) : movies && movies.length > 0 ? (
            layout === 'grid' ? (
              movies.map((movie: any, idx: number) => {
                const imageUrl = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image";
                const playUrl = movie.trailerUrl || "#";
                const title = movie.title || movie.name || "Untitled";
                const rating = movie.vote_average ? `${movie.vote_average}/10` : "N/A";
                const genreNames = Array.isArray(movie._genre_names) ? movie._genre_names : [];
                const description = movie.overview || "No description available.";
                const detailsUrl = movie.detailsUrl || `https://www.themoviedb.org/movie/${movie.id}`;
                return (
                    <MovieTile
                      imageUrl={imageUrl}
                      playUrl={playUrl}
                      title={title}
                      rating={rating}
                      category={genreNames.join(', ')}
                      description={description}
                      detailsUrl={detailsUrl}
                    />
                );
              })
            ) : (
              <div className="col-12">
                {movies.map((movie: any, idx: number) => {
                  const imageUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image";
                  const playUrl = movie.trailerUrl || "#";
                  const title = movie.title || movie.name || "Untitled";
                  const rating = movie.vote_average ? `${movie.vote_average}/10` : "N/A";
                  const genreNames = Array.isArray(movie._genre_names) ? movie._genre_names : [];
                  const description = movie.overview || "No description available.";
                  const detailsUrl = movie.detailsUrl || `https://www.themoviedb.org/movie/${movie.id}`;
                  return (
                    <div key={movie.id || idx} style={{ position: 'relative' }}>
                      <MovieAccordion
                        imageUrl={imageUrl}
                        playUrl={playUrl}
                        title={title}
                        rating={rating}
                        category={genreNames.join(', ')}
                        description={description}
                        detailsUrl={detailsUrl}
                      />
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="col-12 text-center"><p>No movies found.</p></div>
          )}
        </div>

        {!loading && (
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <Pagination
                currentPage={page}
                totalPages={initialData?.total_pages || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
