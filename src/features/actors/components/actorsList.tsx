import { Actor } from "../../../config/types";
import { ActorCard } from "../../../shared/ui/ActorCard";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { useInfiniteScroll } from "../../../shared/hooks/useInfiniteScroll";

interface ActorsListProps {
  actors: Actor[];
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectActor: (actor: Actor) => void;
}

function ActorsList({ actors, loadingMore, hasMore, onLoadMore, onSelectActor }: ActorsListProps) {
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading: loadingMore,
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-5xl font-black mb-2 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent tracking-tighter">
        POPULAR ACTORS
      </h1>
      
      <div className="h-1.5 w-32 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {actors.map((actor, index) => {
          const isLast = index === actors.length - 1;
          
          return (
            <div key={actor.id} ref={isLast ? lastElementRef : null}>
              <ActorCard actor={actor} onClick={onSelectActor} />
            </div>
          );
        })}
      </div>

      {loadingMore && (
        <div className="py-12">
          <LoadingSpinner />
          <p className="text-center text-purple-600 mt-4">Loading more actors...</p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-purple-100 text-center">
        {!hasMore && actors.length > 0 && (
          <p className="text-gray-400 italic mb-2">No more actors to show.</p>
        )}
        <p className="text-sm font-bold text-purple-400 uppercase tracking-widest">
          {actors.length} Actors Loaded
        </p>
      </div>
    </div>
  );
}

export default ActorsList;