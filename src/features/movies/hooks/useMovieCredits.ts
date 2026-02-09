import { useState, useEffect } from "react";
import { getMovieCredits } from "../services/api";
import { Actor } from "../../../config/types";

export const useMovieCredits = (movieId: string | undefined) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchCredits = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getMovieCredits(movieId);
        
        if (!isCancelled) {
          setActors(data.cast.slice(0, 10));
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Error loading actors';
          setError(errorMessage);
          console.error('Error fetching credits:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchCredits();

    return () => {
      isCancelled = true;
    };
  }, [movieId]);

  return { actors, loading, error };
};