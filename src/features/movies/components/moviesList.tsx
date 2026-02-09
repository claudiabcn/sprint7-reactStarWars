import { Movie } from "../../../config/types";
import { MovieCard } from "../../../shared/ui/MovieCard";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { useInfiniteScroll } from "../../../shared/hooks/useInfiniteScroll";

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
              <MovieCard movie={movie} onClick={onSelectMovie} />
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