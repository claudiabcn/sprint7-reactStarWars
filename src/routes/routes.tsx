import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
import MoviesContainer from "../pages/moviesContainerPage";
import MovieDetail from "../pages/movieDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesContainer />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;