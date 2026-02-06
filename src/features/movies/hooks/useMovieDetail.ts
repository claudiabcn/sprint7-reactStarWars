import { useState, useEffect } from "react";
import { getMovieById } from "../services/api";
import { Movie } from "../../../config/types";

export const useMovieDetail = (id: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null); 
        
        const data = await getMovieById(id);
        
        if (!isCancelled) {
          setMovie(data);
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Error when loading movie';
          setError(errorMessage);
          console.error('Error fetching movie:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovie();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { movie, loading, error };
};