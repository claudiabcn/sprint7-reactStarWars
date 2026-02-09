import { useEffect, useState } from "react";
import { Movie } from "../../config/types";
import { getPopularMovies } from "../../features/movies/services/api";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MoviesBackground() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {

        const pages = await Promise.all([
          getPopularMovies(1),
          getPopularMovies(2),
          getPopularMovies(3),
          getPopularMovies(4),
          getPopularMovies(5),
        ]);
        
        const allMovies = pages
          .flatMap(page => page.results)
          .filter(movie => movie.poster_path)
          .slice(0, 100);
        
        setMovies(allMovies);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };
    
    loadMovies();
  }, []);

  const backgroundImages = movies.length > 0 
    ? [...movies, ...movies].slice(0, 200)
    : [];

  return (
    <>
      <div className="absolute inset-0 grid grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-2 opacity-60">
        {backgroundImages.map((movie, index) => (
          <img
            key={index}
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt=""
            className="w-full aspect-[2/3] object-cover rounded"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-pink-100/60 to-blue-100/60"></div>
    </>
  );
}

export default MoviesBackground;