import { getPopularMovies, searchMovies } from "../utils/api";
import MoviesList from "../components/MoviesList";
import Banner from "../components/Banner";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const page = parseInt((searchParams.page as string) || "1", 10);
  const query = (params.query as string) || "";
  let initialData = null;

  if (query) {
    initialData = await searchMovies({ query, page });
  } else {
    initialData = await getPopularMovies({ page });
  }

  return (
    <>
      <Banner backgroundImageURL="/images/movie-night-banner-bg.jpg" title="Martin's Movies" />
      <MoviesList initialData={initialData} initialQuery={query} initialPage={page} />
    </>
  );
}