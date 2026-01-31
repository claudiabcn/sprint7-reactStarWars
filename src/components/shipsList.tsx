import { Starship } from "../config/types";
import { Card } from "../ui/Card";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

interface ShipsListProps {
  ships: Starship[];
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

function ShipsList({ ships, loadingMore, hasMore, onLoadMore }: ShipsListProps) {
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading: loadingMore,
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Listado de Naves</h1>
      
      <ul className="space-y-2 mb-6">
        {ships.map((ship, index) => {
          const isLast = index === ships.length - 1;
          
          return (
            <li key={index} ref={isLast ? lastElementRef : null}>
              <Card>
                <strong>Nombre:</strong> {ship.name} - <strong>Modelo:</strong> {ship.model}
              </Card>
            </li>
          );
        })}
      </ul>

      {loadingMore && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Cargando más naves...</p>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 py-4">
          No hay más naves para cargar
        </p>
      )}

      <p className="text-center text-gray-600 mt-4">
        Mostrando {ships.length} naves
      </p>
    </div>
  );
}

export default ShipsList;