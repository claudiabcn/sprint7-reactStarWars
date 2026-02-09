import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { Movie } from "../../../config/types";
import { getPopularMovies } from "../../movies/services/api";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function HomePage() {
  const navigate = useNavigate();
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
        
        const allMovies = pages.flatMap(page => page.results).slice(0, 100);
        
        setMovies(allMovies);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };
    
    loadMovies();
  }, []);


  const backgroundImages = movies;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-2 opacity-60">
        {backgroundImages.map((movie, index) => (
          movie.poster_path && (
            <img
              key={index}
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt=""
              className="w-full aspect-[2/3] object-cover rounded"
            />
          )
        ))}
      </div>


      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-pink-100/60 to-blue-100/60"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-2xl bg-pink-100/45 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-pink-200/30">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight pb-2">
            Movies World
          </h1>
          
          <div className="h-1 w-64 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-700 mb-8">
            Dive into a world of cinema. Explore trending blockbusters, hidden gems, and timeless classics.
          </p>

          <Button onClick={() => navigate("/movies")} variant="primary">
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;