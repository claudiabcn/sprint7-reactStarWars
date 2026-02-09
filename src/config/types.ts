export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  known_for_department: string;
}

export interface ActorsResponse {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}

export interface MovieCredits {
  id: number;
  cast: Actor[];
}

export interface ActorDetail {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
}

export interface ActorMovieCredits {
  cast: Movie[];
}