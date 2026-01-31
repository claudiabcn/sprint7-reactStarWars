import { useState, useEffect, useCallback } from "react";
import { getStarships } from "../services/api";
import { Starship } from "../config/types";

export const useShips = () => {
  const [ships, setShips] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    fetchShips(1);
  }, []);

  const fetchShips = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getStarships(page);
      
      setShips(prevShips => page === 1 ? data.results : [...prevShips, ...data.results]);
      setHasMore(data.next !== null);
      setCurrentPage(page);
      setError(null);  
    } catch (err) {
      setError('Error al cargar las naves'); 
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchShips(currentPage + 1);
    }
  }, [loadingMore, hasMore, currentPage]);

  return {
    ships,
    loading,
    loadingMore,
    hasMore,
    error,     
    loadMore,
  };
};