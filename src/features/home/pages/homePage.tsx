import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/Button";
import MoviesBackground from "../../../shared/ui/MoviesBackground";
import { HOME_TEXTS } from "../../../config/appData";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MoviesBackground />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-2xl bg-pink-100/45 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-pink-200/30">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight pb-2">
            {HOME_TEXTS.title}
          </h1>

          <div className="h-1 w-64 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mx-auto mb-8 rounded-full"></div>

          <p className="text-xl text-gray-700 mb-8">
            {HOME_TEXTS.subtitle}
          </p>

          <Button onClick={() => navigate("/movies")} variant="primary">
            {HOME_TEXTS.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;