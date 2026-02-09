import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useNavbar } from "../hooks/useNavbar";

function Navbar() {
  const { user, isLoggingOut, handleLogout } = useNavbar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">

          <Link to="/" className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            MoviesWorld
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex gap-6 items-center">
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

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/movies" 
                  className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Movies
                </Link>
                <Link 
                  to="/actors" 
                  className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Actors
                </Link>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  variant="primary"
                  isLoading={isLoggingOut}
                  disabled={isLoggingOut}
                  className="w-full"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-purple-600 font-medium transition px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;