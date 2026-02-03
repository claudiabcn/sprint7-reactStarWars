import { useMovies } from "../hooks/useMovies";
import MoviesList from "../components/moviesList";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function MoviesContainer() {
  const { movies, loading, loadingMore, hasMore, error, loadMore } = useMovies();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400 text-xl bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block">{error}</p>
      </div>
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