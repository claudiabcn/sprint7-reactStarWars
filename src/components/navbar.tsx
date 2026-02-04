import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-2xl font-bold hover:text-purple-200 transition-colors">
            🎬 MovieDB
          </Link>
          
          <div className="flex gap-6">
            <Link 
              to="/" 
              className="text-white hover:text-purple-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="text-white hover:text-purple-200 transition-colors font-medium"
            >
              Movies
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;