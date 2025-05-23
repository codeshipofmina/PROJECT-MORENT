// import RentButton from "./RentButton";
import React, { useEffect, useState } from "react";
import "../styles/vehicle_card.css";
import DetailButton from "./DetailButton";

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

export default function VehicleCard({
  vehicle,
  vehicleType,
}: VehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the vehicle is already in favorites on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoritesArray = JSON.parse(storedFavorites);
      setIsFavorite(favoritesArray.includes(vehicle.id));
    }
  }, [vehicle.id]);

  function handleFavoriteClick(): void {
    const storedFavorites = localStorage.getItem("favorites");
    let favoritesArray: string[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    if (favoritesArray.includes(vehicle.id)) {
      // Remove from favorites
      favoritesArray = favoritesArray.filter((favId) => favId !== vehicle.id);
      setIsFavorite(false);
    } else {
      // Add to favorites
      favoritesArray.push(vehicle.id);
      setIsFavorite(true);
    }

    // Save updated favorites back to localStorage
    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  return (
    <div>
      <div className="vehicle_card">
        <div className="vehicle_card_title">
          <h3>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p>{vehicleType.name ?? "Unknown"}</p>
          <>
            <div onClick={handleFavoriteClick} style={{ cursor: "pointer" }}>
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="var(--primarycolor)"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-heart-icon lucide-heart-filled"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-heart-icon"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              )}
            </div>
          </>
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
              <p>{vehicle.seats} Seats</p>
            </div>
            <div className="vehicle_card_horstpower">
              <p>
                {vehicle.horstpower} HorstPower
                <span className="vehicle_card_horst"> 🐎</span>
              </p>
            </div>
          </div>
        </div>

        <div className="vehicle_card_pricebooking">
          <div>
            <p>
              <span>€{vehicle.priceperday}</span> / day
            </p>
          </div>
          <div>
            <DetailButton
              id_vehicle={vehicle.id}
              onClick={() => console.log(`Renting vehicle: ${vehicle.id}`)} // Example additional logic
            />
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* //   <RentButton vehicleId={vehicle.id} /> */
}
