import { Link } from "react-router";
import type { Database } from "../types/supabase";

interface VehicleCardProps {
  vehicle: Database["public"]["Tables"]["cars"]["Row"];
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div>
      <div>
        <h3>
          {vehicle.brand} {vehicle.model}
        </h3>
        <p>{vehicle.vehicle_type_id}</p>
      </div>
      <div>
        <div>
          <img
            src={vehicle.carimg ?? ""}
            alt={`${vehicle.brand} ${vehicle.model}`}
          />{" "}
        </div>
      </div>

      <div>
        <div>
          <span>{vehicle.fuel}</span>
        </div>
        <div>
          <span>{vehicle.geartype}</span>
        </div>
        <div>
          <span>{vehicle.seats}</span>
        </div>
      </div>

      <div>
        <div>
          <span>${vehicle.priceperday}</span>
          <span>/ day</span>
        </div>
        <Link to={`/cars/${vehicle.id}`}>Rent now</Link>
      </div>
    </div>
  );
}
