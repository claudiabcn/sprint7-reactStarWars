import { Routes, Route, Navigate } from "react-router-dom";
import MoviesContainer from "../pages/moviesContainerPage";
import MovieDetail from "../pages/movieDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies" />} />
      <Route path="/movies" element={<MoviesContainer />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default AppRoutes;