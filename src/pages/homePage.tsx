import { useNavigate } from "react-router-dom";

import { Button } from "../ui/Button";

function HomePage() {
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to MovieDB
        </h1>
        
        <div className="h-1 w-64 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mx-auto mb-8 rounded-full"></div>
        
        <p className="text-xl text-gray-700 mb-8">
          Discover the most popular movies from around the world
        </p>

        <Button onClick={() => navigate("/movies")} variant="primary">
          Explore Movies
        </Button>
      </div>
    </div>
  );
}
export default HomePage;
