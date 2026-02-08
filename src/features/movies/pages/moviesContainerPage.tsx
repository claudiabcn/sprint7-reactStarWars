import { useMovies } from "../hooks/useMovies";
import MoviesList from "../components/moviesList";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";

function MoviesContainer() {
  const { movies, loading, loadingMore, hasMore, error, loadMore } = useMovies();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-purple-600 hover:text-purple-800 font-semibold"
        >
          Refresh page
        </button>
      </ErrorMessage>
    );
  }

  return (
    <MoviesList
      movies={movies}
      loadingMore={loadingMore}
      hasMore={hasMore}
      onLoadMore={loadMore}
      onSelectMovie={(movie) => navigate(`/movies/${movie.id}`)}
    />
  );
}

export default MoviesContainer;