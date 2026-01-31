import { useState } from "react";
import { useShips } from "../hooks/useShips";
import ShipsList from "./shipsList";
import ShipDetail from "./shipDetail";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Starship } from "../config/types";

function ShipsContainer() {
  const { ships, loading, loadingMore, hasMore, error, loadMore } = useShips();
  const [selectedShip, setSelectedShip] = useState<Starship | null>(null);

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


  if (selectedShip) {
    return (
      <ShipDetail 
        ship={selectedShip} 
        onBack={() => setSelectedShip(null)} 
      />
    );
  }


  return (
    <ShipsList
      ships={ships}
      loadingMore={loadingMore}
      hasMore={hasMore}
      onLoadMore={loadMore}
      onSelectShip={setSelectedShip}
    />
  );
}

export default ShipsContainer;