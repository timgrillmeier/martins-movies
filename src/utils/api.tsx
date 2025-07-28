export async function getMovieGenres() {
    // Prepare API call
    const url = new URL(`${API_ROOT}/3/genre/movie/list`);

    const options: RequestInit = {
        method: 'GET',
        cache: 'no-cache',
        headers:  {
            Accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    // Make API call
    const res = await fetch(url.toString(), options);
    if (!res.ok) {
        console.error(`Issue fetching movie genres: ${res.status} ${res.statusText} - ${url.toString()}`);
        try {
            const errorBody = await res.text();
            console.error('Response body:', errorBody);
        } catch (e) {
            console.error(e);
        }
        return null;
    }
    return res.json();
}
const API_ROOT = process.env.TMDB_API_ROOT!
const ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN!
const API_KEY = process.env.TMDB_API_KEY!

export async function searchMovies({
    query = '',
    page = 1,
}: {
    query?: string
    page?: number
}) {
    // Sanitise inputs
    const sanitisedQuery = encodeURIComponent(query)
    const sanitisedPage = encodeURIComponent(page)

    // Prepare API call
    const url = new URL(`${API_ROOT}/3/search/movie`)
    url.searchParams.set('page', sanitisedPage)
    url.searchParams.set('query', sanitisedQuery)

    const options: RequestInit = {
        method: 'GET',
        cache: 'no-cache',
        headers:  {
            Accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }

    // Make API call and genres call in parallel
    const [res, genresRes] = await Promise.all([
        fetch(url.toString(), options),
        getMovieGenres()
    ]);

    let moviesJson = null;
    if (!res.ok) {
        console.error(`Issue fetching search results: ${res.status} ${res.statusText} - ${url.toString()}`);
        try {
            const errorBody = await res.text();
            console.error('Response body:', errorBody);
        } catch (e) {
           console.error(e);
        }
        return null;
    } else {
        moviesJson = await res.json();
    }

    // Patch genre names
    const genreMap = (genresRes?.genres || []).reduce((acc: Record<number, string>, g: any) => {
        acc[g.id] = g.name;
        return acc;
    }, {});
    if (Array.isArray(moviesJson?.results)) {
        moviesJson.results = moviesJson.results.map((movie: any) => {
            if (Array.isArray(movie.genre_ids)) {
                return {
                    ...movie,
                    _genre_names: movie.genre_ids.map((id: number) => genreMap[id]).filter(Boolean)
                };
            }
            return movie;
        });
    }
    return moviesJson;
}

export async function getPopularMovies({
    page = 1,
}: {
    page?: number
}) {
    // Sanitise inputs
    const sanitisedPage = encodeURIComponent(page)

    // Prepare API call
    const url = new URL(`${API_ROOT}/3/movie/popular`)
    url.searchParams.set('page',sanitisedPage)

    const options: RequestInit = {
        method: 'GET',
        cache: 'no-cache',
        headers:  {
            Accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }

    // Make API call and genres call in parallel
    const [res, genresRes] = await Promise.all([
        fetch(url.toString(), options),
        getMovieGenres()
    ]);

    let moviesJson = null;
    if (!res.ok) {
        console.error(`Issue fetching popular movies: ${res.status} ${res.statusText} - ${url.toString()}`);
        try {
            const errorBody = await res.text();
            console.error('Response body:', errorBody);
        } catch (e) {
            console.error(e);
        }
        return null;
    } else {
        moviesJson = await res.json();
    }

    // Patch genre names
    const genreMap = (genresRes?.genres || []).reduce((acc: Record<number, string>, g: any) => {
        acc[g.id] = g.name;
        return acc;
    }, {});
    if (Array.isArray(moviesJson?.results)) {
        moviesJson.results = moviesJson.results.map((movie: any) => {
            if (Array.isArray(movie.genre_ids)) {
                return {
                    ...movie,
                    _genre_names: movie.genre_ids.map((id: number) => genreMap[id]).filter(Boolean)
                };
            }
            return movie;
        });
    }
    return moviesJson;
}