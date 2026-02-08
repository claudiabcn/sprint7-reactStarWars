import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { IMAGE_BASE_URL } from "../../../config/appData";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage";
import { Button } from "../../../shared/ui/Button";

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}>
        <div className="mt-4">
          <Button onClick={() => navigate('/movies')} variant="primary">
            Back to Movies
          </Button>
        </div>
      </ErrorMessage>
    );
  }

  if (!movie) {
    return (
      <ErrorMessage message="Movie not found">
        <div className="mt-4">
          <Button onClick={() => navigate('/movies')} variant="primary">
            Back to Movies
          </Button>
        </div>
      </ErrorMessage>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <button 
        onClick={() => navigate('/movies')} 
        className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors font-semibold group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Movies
      </button>

      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-white/40 flex flex-col md:flex-row gap-10">
        
        <div className="w-full md:w-1/3 shrink-0">
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl border-4 border-white/50"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-purple-100 rounded-2xl flex items-center justify-center text-purple-300 italic">
              No poster found
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-black mb-4 py-2 leading-normal bg-gradient-to-r from-purple-700 via-pink-600 to-blue-700 bg-clip-text text-transparent">
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span className="bg-white/50 border border-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {movie.release_date}
            </span>
          </div>

          <div className="space-y-6 text-gray-800">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-purple-500 font-bold mb-1">Overview</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {movie.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-purple-100">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Original Title</h3>
                <p className="font-semibold text-purple-900">{movie.original_title}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Status</h3>
                <p className="font-semibold text-purple-900 font-mono uppercase tracking-tighter">Released</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;