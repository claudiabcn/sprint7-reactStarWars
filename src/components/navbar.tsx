import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    navigate('/', { replace: true });
    await logout();
  } catch (error) {
    console.error("Error logging out:", error);
  }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          MovieDB
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
              <Button
                onClick={handleLogout}
                variant="primary"
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