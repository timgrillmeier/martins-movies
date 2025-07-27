import { getPopularMovies, searchMovies } from "../utils/api";
import MoviesList from "../components/MoviesList";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const page = parseInt((params.page as string) || "1", 10);
  const query = (params.query as string) || "";
  let initialData = null;

  if (query) {
    initialData = await searchMovies({ query, page });
  } else {
    initialData = await getPopularMovies({ page });
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Martin's Movies v2</h1>
      <MoviesList initialData={initialData} initialQuery={query} initialPage={page} />
    </div>
  );
}