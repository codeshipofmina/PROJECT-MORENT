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
    horstpower: string;
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
        <div className="vehicle_card_title">
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
        <div className="vehicle_card_details">
          <div>
            <div className="vehicle_card_info">
              <p>{vehicle.fuel}</p>

              <p>{vehicle.geartype}</p>

              <p>
                {vehicle.horstpower} HorstPower
                <span className="vehicle_card_horst"> 🐎</span>
              </p>
            </div>
            <div className="vehicle_card_seats">
              <p>{vehicle.seats} Seats</p>
            </div>
          </div>
          <div className="vehicle_card_pricebooking">
            <div>
              <p>
                <span>€{vehicle.priceperday}</span> / day
              </p>
            </div>
            <div>
              {" "}
              <RentButton id_vehicle={vehicle.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
