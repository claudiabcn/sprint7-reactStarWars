import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
import MoviesContainer from "../pages/moviesContainerPage";
import MovieDetail from "../pages/movieDetailPage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import ProtectedRoute from "../guards/ProtectedRoute";

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