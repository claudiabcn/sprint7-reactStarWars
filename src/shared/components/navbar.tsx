import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useNavbar } from "../hooks/useNavbar";

function Navbar() {
  const { user, isLoggingOut, handleLogout } = useNavbar();

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          MoviesWorld
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Home
          </Link>
          
          {user ? (
            <>
              <Link to="/movies" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Movies
              </Link>
              <Link to="/actors" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Actors
              </Link>
              <Button
                onClick={handleLogout}
                variant="primary"
                isLoading={isLoggingOut}
                disabled={isLoggingOut}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Log In
              </Link>
              <Link to="/register">
                <Button variant="primary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;