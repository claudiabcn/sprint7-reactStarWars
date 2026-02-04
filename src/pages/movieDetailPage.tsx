import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { IMAGE_BASE_URL } from "../config/appData";

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className="mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-xl border-2 border-purple-200">

        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          {movie.title}
        </h1>

        {movie.poster_path && (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-md mx-auto rounded-lg mb-6 shadow-lg"
          />
        )}

        <div className="space-y-3 text-gray-700">
          <p>
            <strong className="text-purple-600">Original Title:</strong>{" "}
            {movie.original_title}
          </p>
          <p>
            <strong className="text-purple-600">Release Date:</strong>{" "}
            {movie.release_date}
          </p>
          <p>
            <strong className="text-purple-600">Rating:</strong>{" "}
            {movie.vote_average.toFixed(1)}/10
          </p>
          <p>
            <strong className="text-purple-600">Overview:</strong>{" "}
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;