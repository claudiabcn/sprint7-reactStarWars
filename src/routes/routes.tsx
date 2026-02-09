import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../features/home/pages/homePage";
import MoviesContainer from "../features/movies/pages/moviesContainerPage";
import MovieDetail from "../features/movies/pages/movieDetailPage";
import ActorsContainer from "../features/actors/pages/actorsContainerPage";
import ActorDetail from "../features/actors/pages/actorDetailPage";
import ActorMovies from "../features/actors/pages/actorMoviesPage";
import LoginPage from "../features/auth/pages/loginPage";
import RegisterPage from "../features/auth/pages/registerPage";
import ProtectedRoute from "../features/auth/guards/ProtectedRoute";
import Layout from "../shared/components/layout";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas SIN Layout (HomePage, Login, Register) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rutas CON Layout */}
      <Route 
        path="/movies" 
        element={
          <ProtectedRoute>
            <Layout>
              <MoviesContainer />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/movies/:id" 
        element={
          <ProtectedRoute>
            <Layout>
              <MovieDetail />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/actors" 
        element={
          <ProtectedRoute>
            <Layout>
              <ActorsContainer />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/actors/:id" 
        element={
          <ProtectedRoute>
            <Layout>
              <ActorDetail />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/actors/:id/movies" 
        element={
          <ProtectedRoute>
            <Layout>
              <ActorMovies />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;