import { useState, useEffect, useCallback, useRef } from "react";
import { getPopularActors } from "../services/api";
import { Actor } from "../../../config/types";

const CACHE_KEY = 'cached_actors';

export const useActors = () => {

  const [actors, setActors] = useState<Actor[]>(() => {
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

  const actorsLengthRef = useRef(actors.length);
  actorsLengthRef.current = actors.length;

  const fetchActors = useCallback(async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getPopularActors(page);
      
      setActors(prevActors => {
        const newActors = page === 1 ? data.results : [...prevActors, ...data.results];
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(newActors));
        } catch (err) {
          console.log('Error saving to localStorage:', err);
        }
        return newActors;
      });
      
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error when loading actors';
      
      if (errorMessage.includes('Network error') && actorsLengthRef.current > 0) {
        setHasMore(false);
        console.log('Sin internet, mostrando actores cargados');
      } else {
        setError(errorMessage);
        setHasMore(false);
        console.error('Error fetching actors:', err);
      }
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