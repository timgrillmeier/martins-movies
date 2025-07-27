"use client";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../utils/api";
import { useRouter } from "next/navigation";

interface MoviesListProps {
  initialData: any;
  initialQuery: string;
  initialPage: number;
}

export default function MoviesList({ initialData, initialQuery, initialPage }: MoviesListProps) {
  const [movies, setMovies] = useState(initialData?.results || []);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (page === initialPage && query === initialQuery) return;
    setLoading(true);
    const fetchData = async () => {
      let res;
      if (query) {
        res = await searchMovies({ query, page });
      } else {
        res = await getPopularMovies({ page });
      }
      setMovies(res?.results || []);
      setLoading(false);
    };
    fetchData();
    // Update URL for SPA navigation using pretty URLs
    let url = "/";
    if (query && page !== 1) {
      url = `/query/${encodeURIComponent(query)}/page/${page}`;
    } else if (query) {
      url = `/query/${encodeURIComponent(query)}`;
    } else if (page !== 1) {
      url = `/page/${page}`;
    }
    router.replace(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    // setQuery will trigger useEffect
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
