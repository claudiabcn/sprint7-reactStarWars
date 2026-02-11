import { Movie } from "../../../config/types";
import { HorizontalCard } from "../../../shared/ui/HorizontalCard";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { useInfiniteScroll } from "../../../shared/hooks/useInfiniteScroll";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MoviesListProps {
  movies: Movie[];
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectMovie: (movie: Movie) => void;
}

function MoviesList({ movies, loadingMore, hasMore, onLoadMore, onSelectMovie }: MoviesListProps) {
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading: loadingMore,
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-5xl font-black mb-2 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent tracking-tighter">
        POPULAR MOVIES
      </h1>
      
      <div className="h-1.5 w-32 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;
          
          return (
            <div key={movie.id} ref={isLast ? lastElementRef : null}>
              <HorizontalCard onClick={() => onSelectMovie(movie)}>
                {movie.poster_path && (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded shadow-md shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-purple-800 leading-tight line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs font-semibold uppercase">
                        Release
                      </span>
                      {movie.release_date}
                    </div>
                    <div>
                      <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                        ★ {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </HorizontalCard>
            </div>
          );
        })}
      </div>

      {loadingMore && (
        <div className="py-12">
          <LoadingSpinner />
          <p className="text-center text-purple-600 mt-4">Loading more movies...</p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-purple-100 text-center">
        {!hasMore && movies.length > 0 && (
          <p className="text-gray-400 italic mb-2">No more movies to show.</p>
        )}
        <p className="text-sm font-bold text-purple-400 uppercase tracking-widest">
          {movies.length} Movies Loaded
        </p>
      </div>
    </div>
  );
}

export default MoviesList;