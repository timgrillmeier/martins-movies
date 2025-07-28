"use client";
import { useState, useEffect, useRef } from "react";
import { getPopularMovies, searchMovies } from "../utils/api";
import MovieTile from "./MovieTile";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

interface MoviesListProps {
  initialData: any;
  initialQuery: string;
  initialPage: number;
}

export default function MoviesList({ initialData, initialQuery, initialPage }: MoviesListProps) {
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
        res = await searchMovies({ query, page: 1 });
        router.replace(`/query/${encodeURIComponent(query)}`);
      } else {
        res = await getPopularMovies({ page: 1 });
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
        res = await searchMovies({ query, page });
        if (page !== 1) {
          router.replace(`/query/${encodeURIComponent(query)}/page/${page}`);
        } else {
          router.replace(`/query/${encodeURIComponent(query)}`);
        }
      } else {
        res = await getPopularMovies({ page });
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
              <a className="list" style={{ cursor: 'pointer' }}><i className="fa fa-align-justify"></i></a>
              <a className="grid active" style={{ cursor: 'pointer' }}><i className="fa fa-th"></i></a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="sort-by d-flex justify-content-end align-items-center">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="d-flex" style={{ marginRight: 16, width: 'auto' }}>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by keyword..."
                  className="form-control mr-2"
                  style={{ minWidth: 200, maxWidth: 300 }}
                />
                <button type="submit" className="btn btn-main btn-effect">Search</button>
              </form>
              {/* Sort by (static for now) */}
              <div className="sort-by-select">
                <select className="chosen-select-no-single">
                  <option>Default Order</option>
                  <option>Featured</option>
                  <option>Top Viewed</option>
                  <option>Top Rated</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* End of Filters */}

        {/* Start of Movie List */}
        <div className="row">
          {loading ? (
            <div className="col-12 text-center"><p>Loading...</p></div>
          ) : movies && movies.length > 0 ? (
            movies.map((movie: any, idx: number) => {
              // Map TMDB data to MovieTileProps
              const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image";
              const playUrl = movie.trailerUrl || "#";
              const title = movie.title || movie.name || "Untitled";
              const rating = movie.vote_average ? `${movie.vote_average}/10` : "N/A";
              const category = Array.isArray(movie.genre_ids) ? movie.genre_ids.join(", ") : "";
              const description = movie.overview || "No description available.";
              const detailsUrl = movie.detailsUrl || `https://www.themoviedb.org/movie/${movie.id}`;
              return (
                <MovieTile
                  key={movie.id || idx}
                  imageUrl={imageUrl}
                  playUrl={playUrl}
                  title={title}
                  rating={rating}
                  category={category}
                  description={description}
                  detailsUrl={detailsUrl}
                />
              );
            })
          ) : (
            <div className="col-12 text-center"><p>No movies found.</p></div>
          )}
        </div>
        {/* End of Movie List */}

        {/* Start of Pagination */}
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <Pagination
              currentPage={page}
              totalPages={initialData?.total_pages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        {/* End of Pagination */}
      </div>
    </main>
  );
}
