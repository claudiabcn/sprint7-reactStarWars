import { useState, useEffect } from "react";
import { getStarships } from "../services/api";
import { Starship } from "../config/types";

function ShipsList() {
  const [ships, setShips] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getStarships()
      .then((data) => {
        setShips(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando naves...</div>;
  }

  return (
    <div>
      <h1>Listado de Naves</h1>
      <ul>
        {ships.map((ship, index) => (
          <li key={index}>
            <strong>Nombre:</strong> {ship.name} - <strong>Modelo:</strong>{" "}
            {ship.model}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShipsList;
