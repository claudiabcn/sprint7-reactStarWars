import { useParams, useNavigate } from "react-router-dom";
import { useActorDetail } from "../hooks/useActorDetail";
import { IMAGE_BASE_URL } from "../../../config/appData";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage";
import { Button } from "../../../shared/ui/Button";

function ActorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { actor, loading, error } = useActorDetail(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}>
        <div className="mt-4">
          <Button onClick={() => navigate('/actors')} variant="primary">
            Back to Actors
          </Button>
        </div>
      </ErrorMessage>
    );
  }

  if (!actor) {
    return (
      <ErrorMessage message="Actor not found">
        <div className="mt-4">
          <Button onClick={() => navigate('/actors')} variant="primary">
            Back to Actors
          </Button>
        </div>
      </ErrorMessage>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <button 
        onClick={() => navigate('/actors')} 
        className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors font-semibold group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Actors
      </button>

      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-white/40 flex flex-col md:flex-row gap-10">
        
        <div className="w-full md:w-1/3 shrink-0">
          {actor.profile_path ? (
            <img
              src={`${IMAGE_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className="w-full rounded-2xl shadow-2xl border-4 border-white/50"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-purple-100 rounded-2xl flex items-center justify-center text-purple-300">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-black mb-4 py-2 leading-normal bg-gradient-to-r from-purple-700 via-pink-600 to-blue-700 bg-clip-text text-transparent">
            {actor.name}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {actor.known_for_department}
            </span>
            {actor.birthday && (
              <span className="bg-white/50 border border-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                Born: {actor.birthday}
              </span>
            )}
          </div>

          <div className="space-y-6 text-gray-800">
            {actor.biography && (
              <div>
                <h3 className="text-xs uppercase tracking-widest text-purple-500 font-bold mb-1">Biography</h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  {actor.biography}
                </p>
              </div>
            )}

            {actor.place_of_birth && (
              <div className="pt-6 border-t border-purple-100">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Place of Birth</h3>
                <p className="font-semibold text-purple-900">{actor.place_of_birth}</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Button onClick={() => navigate(`/actors/${id}/movies`)} variant="primary">
              View Movies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActorDetail;