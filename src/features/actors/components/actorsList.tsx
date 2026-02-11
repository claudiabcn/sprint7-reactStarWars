import { Actor } from "../../../config/types";
import { VerticalCard } from "../../../shared/ui/VerticalCard";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { useInfiniteScroll } from "../../../shared/hooks/useInfiniteScroll";
import { IMAGE_BASE_URL } from "../../../config/appData";

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
              <VerticalCard onClick={() => onSelectActor(actor)}>
                <div className="aspect-[2/3] bg-purple-100 overflow-hidden rounded-lg -m-4 mb-3">
                  {actor.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-300">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-purple-900 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
                  {actor.name}
                </h3>
                {actor.character && (
                  <p className="text-xs text-gray-500 truncate">
                    as {actor.character}
                  </p>
                )}
              </VerticalCard>
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