import { Movie } from "../../config/types";
import { Card } from "./Card";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card onClick={() => onClick?.(movie)}>
      <div className="flex gap-3">
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
      </div>
    </Card>
  );
}