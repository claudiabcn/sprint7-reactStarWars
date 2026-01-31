import { Starship } from '../config/types';

interface ShipDetailProps {
  ship: Starship;
  onBack: () => void;
}

function ShipDetail({ ship, onBack }: ShipDetailProps) {
  return (
    <div className="p-8">
      <button 
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Volver al listado
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">{ship.name}</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Modelo:</p>
            <p className="font-semibold">{ship.model}</p>
          </div>
          <div>
            <p className="text-gray-600">Fabricante:</p>
            <p className="font-semibold">{ship.manufacturer}</p>
          </div>
          <div>
            <p className="text-gray-600">Coste:</p>
            <p className="font-semibold">{ship.cost_in_credits} créditos</p>
          </div>
          <div>
            <p className="text-gray-600">Longitud:</p>
            <p className="font-semibold">{ship.length} metros</p>
          </div>
          <div>
            <p className="text-gray-600">Velocidad máxima:</p>
            <p className="font-semibold">{ship.max_atmosphering_speed}</p>
          </div>
          <div>
            <p className="text-gray-600">Tripulación:</p>
            <p className="font-semibold">{ship.crew}</p>
          </div>
          <div>
            <p className="text-gray-600">Pasajeros:</p>
            <p className="font-semibold">{ship.passengers}</p>
          </div>
          <div>
            <p className="text-gray-600">Capacidad de carga:</p>
            <p className="font-semibold">{ship.cargo_capacity}</p>
          </div>
          <div>
            <p className="text-gray-600">Consumibles:</p>
            <p className="font-semibold">{ship.consumables}</p>
          </div>
          <div>
            <p className="text-gray-600">Clasificación hyperdrive:</p>
            <p className="font-semibold">{ship.hyperdrive_rating}</p>
          </div>
          <div>
            <p className="text-gray-600">MGLT:</p>
            <p className="font-semibold">{ship.MGLT}</p>
          </div>
          <div>
            <p className="text-gray-600">Clase de nave:</p>
            <p className="font-semibold">{ship.starship_class}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipDetail;