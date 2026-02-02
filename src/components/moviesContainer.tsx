import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MoviesList from "./moviesList";
import MovieDetail from "./movieDetail";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Movie } from "../config/types";

function MoviesContainer() {
  const { movies, loading, loadingMore, hasMore, error, loadMore } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

  if (selectedMovie) {
    return (
      <MovieDetail 
        movie={selectedMovie} 
        onBack={() => setSelectedMovie(null)} 
      />
    );
  }

  return (
    <MoviesList
      movies={movies}
      loadingMore={loadingMore}
      hasMore={hasMore}
      onLoadMore={loadMore}
      onSelectMovie={setSelectedMovie}
    />
  );
}

export default MoviesContainer;