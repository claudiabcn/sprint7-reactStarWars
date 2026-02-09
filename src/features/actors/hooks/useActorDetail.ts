import { useState, useEffect } from "react";
import { getActorById } from "../services/api";
import { ActorDetail } from "../../../config/types";

export const useActorDetail = (id: string | undefined) => {
  const [actor, setActor] = useState<ActorDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchActor = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getActorById(id);
        
        if (!isCancelled) {
          setActor(data);
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Error when loading actor';
          setError(errorMessage);
          console.error('Error fetching actor:', err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchActor();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { actor, loading, error };
};