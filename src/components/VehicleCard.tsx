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
  bookNowButton?: React.ReactNode;
}

export default function VehicleCard({
  vehicle,
  vehicleType,
  bookNowButton,
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
        <div className="vehicle_card_header">
          <div className="vehicle_card_title">
            <h3>
              {vehicle.brand} {vehicle.model}
            </h3>
            <p>{vehicleType.name ?? "Unknown"}</p>
          </div>
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
          <div className="vehicle_card_image">
            <img
              src={vehicle.carimg ?? ""}
              alt={`${vehicle.brand} ${vehicle.model}`}
            />
          </div>
        </div>
        <div className="vehicle_card_details">
          <div>
            <div className="vehicle_card_info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide-fuel-icon"
              >
                <line x1="3" x2="15" y1="22" y2="22" />
                <line x1="4" x2="14" y1="9" y2="9" />
                <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
                <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
              </svg>
              <p>{vehicle.fuel}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide-gear-icon"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M12 2v2" />
                <path d="M12 22v-2" />
                <path d="m17 20.66-1-1.73" />
                <path d="M11 10.27 7 3.34" />
                <path d="m20.66 17-1.73-1" />
                <path d="m3.34 7 1.73 1" />
                <path d="M14 12h8" />
                <path d="M2 12h2" />
                <path d="m20.66 7-1.73 1" />
                <path d="m3.34 17 1.73-1" />
                <path d="m17 3.34-1 1.73" />
                <path d="m11 13.73-4 6.93" />
              </svg>
              <p>{vehicle.geartype}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide-seats-icon"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
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
            {/* Render the bookNowButton if provided, otherwise render the default DetailButton */}
            {bookNowButton || (
              <DetailButton
                id_vehicle={vehicle.id}
                onClick={() => console.log(`Renting vehicle: ${vehicle.id}`)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
