import { useShips } from "../hooks/useShips";
import ShipsList from "./shipsList";
import { LoadingSpinner } from "../ui/LoadingSpinner";

function ShipsContainer() {
  const { ships, loading, loadingMore, hasMore, error, loadMore } = useShips();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <ShipsList
      ships={ships}
      loadingMore={loadingMore}
      hasMore={hasMore}
      onLoadMore={loadMore}
    />
  );
}

export default ShipsContainer;