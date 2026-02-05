import { useState, useEffect, useCallback } from "react";
import { getPopularMovies } from "../services/api";
import { Movie } from "../../../config/types";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const fetchMovies = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getPopularMovies(page);
      
      setMovies(prevMovies => page === 1 ? data.results : [...prevMovies, ...data.results]);
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
      setError(null);  
    } catch (err) {
      setError('Error when loading movies'); 
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchMovies(currentPage + 1);
    }
  }, [loadingMore, hasMore, currentPage]);

  return {
    movies,
    loading,
    loadingMore,
    hasMore,
    error,     
    loadMore,
  };
};