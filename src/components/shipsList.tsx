import { Starship } from "../config/types";
import { Card } from "../ui/Card";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

interface ShipsListProps {
  ships: Starship[];
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectShip: (ship: Starship) => void;
}

function ShipsList({ ships, loadingMore, hasMore, onLoadMore, onSelectShip }: ShipsListProps) {
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading: loadingMore,
  });

  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold mb-6 text-starwars-yellow text-center tracking-wider">
        STARSHIPS
      </h1>
      <div className="h-1 w-48 bg-starwars-yellow mx-auto mb-8"></div>
      
      <ul className="space-y-2 mb-6">
        {ships.map((ship, index) => {
          const isLast = index === ships.length - 1;
          
          return (
            <li key={index} ref={isLast ? lastElementRef : null}>
              <Card onClick={() => onSelectShip(ship)}>
                <p className="text-starwars-yellow">
                  <strong>Name:</strong> {ship.name}
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Model:</strong> {ship.model}
                </p>
              </Card>
            </li>
          );
        })}
      </ul>

      {loadingMore && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-starwars-yellow"></div>
          <p className="mt-2 text-gray-400">Cargando más naves...</p>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-starwars-yellow">
          There are no more starships to show
        </p>
      )}

      <p className="text-center text-starwars-yellow">
        Showing {ships.length} starships
      </p>
    </div>
  );
}

export default ShipsList;