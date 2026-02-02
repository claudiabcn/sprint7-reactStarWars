import { Starship } from "../config/types";

interface ShipDetailProps {
  ship: Starship;
  onBack: () => void;
}

function ShipDetail({ ship, onBack }: ShipDetailProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 px-6 py-3 bg-starwars-gray border-2 border-starwars-yellow text-starwars-yellow rounded-lg hover:bg-starwars-yellow hover:text-black transition-all font-bold"
      >
        ← Return
      </button>

      <div className="bg-starwars-gray border-2 border-starwars-yellow rounded-lg p-8 shadow-lg shadow-starwars-yellow/20">
        <h1 className="text-5xl font-bold mb-8 text-center text-starwars-yellow tracking-wider">
          {ship.name}
        </h1>
        
        <div className="h-1 w-64 bg-starwars-yellow mx-auto mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <DetailItem label="Model" value={ship.model} />
            <DetailItem label="Manufacturer" value={ship.manufacturer} />
            <DetailItem label="Class" value={ship.starship_class} />
            <DetailItem label="Cost" value={`${ship.cost_in_credits} credits`} />
            <DetailItem label="Length" value={`${ship.length} meters`} />
            <DetailItem label="Maximum atmosphering speed" value={ship.max_atmosphering_speed} />
          </div>

          <div className="space-y-4">
            <DetailItem label="Crew" value={ship.crew} />
            <DetailItem label="Pasengers" value={ship.passengers} />
            <DetailItem label="Capacity" value={ship.cargo_capacity} />
            <DetailItem label="Consumables" value={ship.consumables} />
            <DetailItem label="Hyperdrive" value={ship.hyperdrive_rating} />
            <DetailItem label="MGLT" value={ship.MGLT} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-starwars-yellow/30 pb-3">
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-lg text-starwars-yellow font-semibold">{value}</p>
    </div>
  );
}

export default ShipDetail;