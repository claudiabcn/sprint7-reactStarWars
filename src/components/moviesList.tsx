import { Movie } from "../config/types";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

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
  const navigate = useNavigate();

  return (
   <div className="p-8">
      <h1 className="text-5xl font-bold mb-6 text-purple-600 text-center tracking-wider">
        POPULAR MOVIES
      </h1>
      
      <div className="h-1 w-48 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mx-auto mb-8 rounded-full"></div>
      
      <ul className="space-y-2 mb-6">
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;
          
          return (
            <li key={movie.id} ref={isLast ? lastElementRef : null}>
              <Card onClick={() => onSelectMovie(movie)}>
                <p className="text-purple-700">
                  <strong>Title:</strong> {movie.title}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
              </Card>
            </li>
          );
        })}
      </ul>

      {loadingMore && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          <p className="mt-2 text-purple-600">Loading more movies...</p>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-purple-600">
          There are no more movies to show
        </p>
      )}

      <p className="text-center text-purple-600">
        Showing {movies.length} movies
      </p>
    </div>
  );
}

export default MoviesList;