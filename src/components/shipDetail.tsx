import { Starship } from "../config/types";
import { Card } from "../ui/Card";

interface ShipDetailProps {
  ship: Starship;
  onBack: () => void;
}

function ShipDetail({ ship, onBack }: ShipDetailProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        ← Volver al listado
      </button>

      <Card>
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
          {ship.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <DetailItem label="Modelo" value={ship.model} />
            <DetailItem label="Fabricante" value={ship.manufacturer} />
            <DetailItem label="Clase" value={ship.starship_class} />
            <DetailItem label="Coste" value={`${ship.cost_in_credits} créditos`} />
            <DetailItem label="Longitud" value={`${ship.length} metros`} />
            <DetailItem label="Velocidad máxima" value={ship.max_atmosphering_speed} />
          </div>

          <div className="space-y-4">
            <DetailItem label="Tripulación" value={ship.crew} />
            <DetailItem label="Pasajeros" value={ship.passengers} />
            <DetailItem label="Capacidad de carga" value={ship.cargo_capacity} />
            <DetailItem label="Consumibles" value={ship.consumables} />
            <DetailItem label="Hyperdrive" value={ship.hyperdrive_rating} />
            <DetailItem label="MGLT" value={ship.MGLT} />
          </div>
        </div>
      </Card>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-200 pb-2">
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <p className="text-lg text-gray-900">{value}</p>
    </div>
  );
}

export default ShipDetail;