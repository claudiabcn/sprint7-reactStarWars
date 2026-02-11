import { useParams, useNavigate } from "react-router-dom";
import { useActorMovies } from "../hooks/useActorMovies";
import { useActorDetail } from "../hooks/useActorDetail";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage";
import { Button } from "../../../shared/ui/Button";
import { HorizontalCard } from "../../../shared/ui/HorizontalCard";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function ActorMovies() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { actor } = useActorDetail(id);
  const { movies, loading, error } = useActorMovies(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}>
        <div className="mt-4">
          <Button onClick={() => navigate(`/actors/${id}`)} variant="primary">
            Back to Actor
          </Button>
        </div>
      </ErrorMessage>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <button 
        onClick={() => navigate(`/actors/${id}`)} 
        className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors font-semibold group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to {actor?.name}
      </button>

      <h1 className="text-5xl font-black mb-2 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent tracking-tighter">
        {actor?.name}'s Movies
      </h1>
      
      <div className="h-1.5 w-32 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"></div>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <HorizontalCard
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
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
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-purple-100 text-center">
        <p className="text-sm font-bold text-purple-400 uppercase tracking-widest">
          {movies.length} Movies
        </p>
      </div>
    </div>
  );
}

export default ActorMovies;