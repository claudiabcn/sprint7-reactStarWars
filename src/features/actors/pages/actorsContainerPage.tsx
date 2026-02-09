import { useActors } from "../hooks/useActors";
import ActorsList from "../components/actorsList";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";

function ActorsContainer() {
  const { actors, loading, loadingMore, hasMore, error, loadMore } = useActors();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-purple-600 hover:text-purple-800 font-semibold"
        >
          Refresh page
        </button>
      </ErrorMessage>
    );
  }

  return (
    <ActorsList
      actors={actors}
      loadingMore={loadingMore}
      hasMore={hasMore}
      onLoadMore={loadMore}
      onSelectActor={(actor) => navigate(`/actors/${actor.id}`)}
    />
  );
}

export default ActorsContainer;