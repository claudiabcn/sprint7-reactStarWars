import { Movie, MoviesResponse } from "../../../config/types";
import { API_BASE_URL } from "../../../config/appData";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const getHeaders = () => ({
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
});

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.status_message || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getPopularMovies = async (
  page: number = 1,
): Promise<MoviesResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/popular?page=${page}&language=en-EN`,
      { headers: getHeaders() }
    );

    return handleResponse<MoviesResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

export const getMovieById = async (id: string): Promise<Movie> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}?language=en-EN`,
      { headers: getHeaders() }
    );

    return handleResponse<Movie>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

export const getMovieCredits = async (id: string): Promise<MovieCredits> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/credits?language=en-EN`,
      { headers: getHeaders() }
    );

    return handleResponse<MovieCredits>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};