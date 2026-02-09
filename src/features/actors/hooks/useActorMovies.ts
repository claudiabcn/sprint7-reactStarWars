import { useState, useEffect } from "react";
import { getActorMovieCredits } from "../services/api";
import { Movie } from "../../../config/types";

export const useActorMovies = (id: string | undefined) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getActorMovieCredits(id);
        
        if (!isCancelled) {
          setMovies(data.cast.sort((a, b) => b.vote_average - a.vote_average));
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Error when loading movies';
          setError(errorMessage);
          console.error('Error fetching actor movies:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { movies, loading, error };
};