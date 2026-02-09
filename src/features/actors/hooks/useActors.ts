import { useState, useEffect, useCallback } from "react";
import { getPopularActors } from "../services/api";
import { Actor } from "../../../config/types";

export const useActors = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const fetchActors = useCallback(async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getPopularActors(page);
      
      setActors(prevActors => page === 1 ? data.results : [...prevActors, ...data.results]);
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error when loading actors';
      setError(errorMessage);
      setHasMore(false);
      console.error('Error fetching actors:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchActors(1);
  }, [fetchActors]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchActors(currentPage + 1);
    }
  }, [loadingMore, hasMore, currentPage, fetchActors]);

  return {
    actors,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
  };
};