import { Actor, ActorsResponse, ActorDetail, ActorMovieCredits } from "../../../config/types";
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

export const getPopularActors = async (page: number = 1): Promise<ActorsResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/person/popular?page=${page}&language=en-EN`,
      { headers: getHeaders() }
    );

    return handleResponse<ActorsResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

export const getActorById = async (id: string): Promise<ActorDetail> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/person/${id}?language=en-EN`,
      { headers: getHeaders() }
    );

    return handleResponse<ActorDetail>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};

export const getActorMovieCredits = async (id: string): Promise<ActorMovieCredits> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/person/${id}/movie_credits?language=en-EN`,
      { headers: getHeaders() }
    );

    return handleResponse<ActorMovieCredits>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection');
    }
    throw error;
  }
};