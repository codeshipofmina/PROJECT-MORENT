// import { Link } from "react-router-dom";
import RentButton from "./RentButton";
import "../styles/vehicle_card.css";

interface VehicleCardProps {
  vehicle: {
    id: string;
    brand: string;
    model: string;
    vehicle_type_id: string;
    carimg: string | null;
    fuel: string;
    geartype: string;
    seats: number;
    priceperday: number;
  };
  vehicleType: {
    id: string;
    name: string | null;
  };
}

// { vehicle }: VehicleCardProps

export default function VehicleCard({
  vehicle,
  vehicleType,
}: VehicleCardProps) {
  return (
    <div>
      <div className="vehicle_card">
        <div>
          <h3>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p>{vehicleType.name ?? "Unknown"}</p>
        </div>
        <div>
          <div>
            <img
              src={vehicle.carimg ?? ""}
              alt={`${vehicle.brand} ${vehicle.model}`}
            />
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
            <span>€{vehicle.priceperday}</span>
            <span>/ day</span>
          </div>
          <RentButton id_vehicle={vehicle.id} />
        </div>
      </div>
    </div>
  );
}
