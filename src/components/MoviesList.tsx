"use client";
import { useState, useEffect, useRef } from "react";
import { getPopularMovies, searchMovies } from "../utils/api";
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
    <div>
      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: 24 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by keyword..."
          style={{ padding: 8, width: 300 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {movies && movies.length > 0 ? (
              movies.map((movie: any, idx: number) => (
                <li key={movie.id || idx}>{movie.title || movie.name}</li>
              ))
            ) : (
              <li>No movies found.</li>
            )}
          </ul>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Prev</button>
            <span style={{ margin: "0 12px" }}>Page {page}</span>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
