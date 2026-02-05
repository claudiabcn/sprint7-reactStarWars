import { Movie, MoviesResponse } from "../../../config/types";
import { API_BASE_URL } from "../../../config/appData";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const getPopularMovies = async (
  page: number = 1,
): Promise<MoviesResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/movie/popular?page=${page}&language=en-EN`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}?language=en-EN`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};