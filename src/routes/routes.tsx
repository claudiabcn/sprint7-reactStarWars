import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../features/home/pages/homePage";
import MoviesContainer from "../features/movies/pages/moviesContainerPage";
import MovieDetail from "../features/movies/pages/movieDetailPage";
import LoginPage from "../features/auth/pages/loginPage";
import RegisterPage from "../features/auth/pages/registerPage";
import ProtectedRoute from "../features/auth/guards/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route 
        path="/movies" 
        element={
          <ProtectedRoute>
            <MoviesContainer />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/movies/:id" 
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;