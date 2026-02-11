import { useState, useEffect, useCallback, useRef } from "react";
import { getPopularMovies } from "../services/api";
import { Movie } from "../../../config/types";

const CACHE_KEY = 'cached_movies';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const moviesLengthRef = useRef(movies.length);
  moviesLengthRef.current = movies.length;

  const fetchMovies = useCallback(async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getPopularMovies(page);
      
      setMovies(prevMovies => {
        const newMovies = page === 1 ? data.results : [...prevMovies, ...data.results];
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(newMovies));
        } catch (err) {
          console.log('Error saving to localStorage:', err);
        }
        return newMovies;
      });
      
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error when loading movies';
      

      if (errorMessage.includes('Network error') && moviesLengthRef.current > 0) {
        setHasMore(false);
        console.log('Sin internet, mostrando películas cargadas');
      } else {
        setError(errorMessage); 
        setHasMore(false);
        console.error('Error fetching movies:', err);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []); 

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchMovies(currentPage + 1);
    }
  }, [loadingMore, hasMore, currentPage, fetchMovies]);

  return {
    movies,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
  };
};