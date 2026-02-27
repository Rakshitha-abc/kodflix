const API_KEY = "f4f34bc5193c9223116442a364117da6";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  genre_ids: number[];
}

interface TMDBResponse {
  results: Movie[];
}

const fetchTMDB = async (endpoint: string): Promise<Movie[]> => {
  const separator = endpoint.includes("?") ? "&" : "?";
  const res = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
};

export const requests = {
  trending: () => fetchTMDB("/trending/all/week"),
  topRated: () => fetchTMDB("/movie/top_rated"),
  actionMovies: () => fetchTMDB("/discover/movie?with_genres=28"),
  comedyMovies: () => fetchTMDB("/discover/movie?with_genres=35"),
  horrorMovies: () => fetchTMDB("/discover/movie?with_genres=27"),
  romanceMovies: () => fetchTMDB("/discover/movie?with_genres=10749"),
  documentaries: () => fetchTMDB("/discover/movie?with_genres=99"),
  netflixOriginals: () => fetchTMDB("/discover/tv?with_networks=213"),
};

// Fix: genres with discover need & not ?
const fetchDiscover = async (genreId: number): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`);
  if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
};

export const categories = {
  trending: { title: "Trending Now", fetch: () => fetchTMDB("/trending/all/week") },
  netflixOriginals: { title: "Netflix Originals", fetch: () => fetchTMDB("/discover/tv?with_networks=213") },
  topRated: { title: "Top Rated", fetch: () => fetchTMDB("/movie/top_rated") },
  action: { title: "Action Movies", fetch: () => fetchDiscover(28) },
  comedy: { title: "Comedy Movies", fetch: () => fetchDiscover(35) },
  horror: { title: "Horror Movies", fetch: () => fetchDiscover(27) },
  romance: { title: "Romance Movies", fetch: () => fetchDiscover(10749) },
  documentaries: { title: "Documentaries", fetch: () => fetchDiscover(99) },
};
