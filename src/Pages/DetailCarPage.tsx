import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/detailcarpage.css";
import VehicleCard from "../components/VehicleCard";
import "../styles/booknow_button.css";
import RentButton from "../components/RentButton";
import { Link } from "react-router";

const DetailCarPage = () => {
  const { id_vehicle } = useParams<{ id_vehicle: string }>();
  const [isFakeLoading, setIsFakeLoading] = useState(true);

  // Fetch all data in one query
  const { data: carData, isLoading: carLoading } = useQuery({
    queryKey: ["carData", id_vehicle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select(
          `
          *,
          vehicle_types(name),
          car_locations(location_id, locations(city)),
          reviews(*)
        `
        )
        .eq("id", id_vehicle ?? "")
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Simulate fake loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (carLoading || isFakeLoading) {
    return (
      <div className="loading-skeleton">
        <div className="skeleton-logo">MØRENT</div>
      </div>
    );
  }

  if (!carData) {
    return <div>Car not found</div>;
  }

  const renderStars = (rating: number) => {
    const maxStars = 5; // Maximum number of stars
    const filledStars = "★".repeat(rating); // Filled stars
    const emptyStars = "☆".repeat(maxStars - rating); // Empty stars
    return (
      <span className="stars">
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  const commentWithoutLastSentence = (comment: string) => {
    const sentences = comment.split(". ");
    if (sentences.length <= 1) return comment; // Return as is if there's no sentence to remove
    sentences.pop(); // Remove the last sentence
    return sentences.join(". ") + ".";
  };

  return (
    <div className="detail_car_page">
      <div className="detail_car_card">
        {/* img nach links. rechts eine map */}
        <h1 className="detail_car_card_title">
          {carData.brand} {carData.model}
        </h1>
{/* opt durchschnittliche bewertung aller reviews */}
        <p>{carData.vehicle_types?.name ?? "Unknown"}</p>
        <p>{carData.year}</p>
        <img
          className="detail_car_card img"
          src={carData.carimg ?? ""}
          alt={`${carData.brand} ${carData.model}`}
        />
        <div className="detail_car_card_details">
          <p>Fuel: {carData.fuel}</p>
          <p>Gear Type: {carData.geartype}</p>
          <p>Seats: {carData.seats}</p>
          <p>Horstpower: {carData.horstpower} 🐎</p>
          <p>Color: {carData.color}</p>
          <p>Usage: {carData.consumption} L/100km</p>
          <p>
            Locations:{" "}
            {carData.car_locations
              ?.map((loc) => loc.locations.city)
              .join(", ") || "Unknown"}
          </p>
          <p>
            {/* links der location picker */}
            {/* price nach rechts über rent now button */}
            <span>€{carData.priceperday}</span> / day
          </p>
          {/* CHOSE LOCATION.
          map through thiscars locations - option for every city.
          onClick or onSelect => add the location into the button-link-state below}
          {/* <select name="cities" id="cities">

            {carData.car_locations?.map((location) => {
              <option value={location.location_id}>
                {location.locations.city}
              </option>;
            })}
          </select> */}

          {/*WIP: add Location Selector here. "available locations or so". give selected location.id into state of the LINK */}
          <button>
            <Link
              to="/booking"
              // insert: location_id: select option value location id 
              state={{ car_id: carData.id, car_price: carData.priceperday}}
            >
              to the booking{" "}
            </Link>
          </button>
        </div>
      </div>
      <div className="reviews_container">
        <h2>Reviews</h2>
        {carData.reviews.length > 0 ? (
          carData.reviews.map((review) => (
            <div key={review.id} className="review">
              <p className="rating">{renderStars(review.rating)}</p>
              <p className="comment">
                {commentWithoutLastSentence(review.comment)}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available for this car.</p>
        )}
      </div>
    </div>
  );
};

export default DetailCarPage;


// <VehicleCard
//             vehicle={{
//               id: carData.id,
//               brand: carData.brand,
//               model: carData.model,
//               vehicle_type_id: carData.vehicle_type_id,
//               carimg: carData.carimg,
//               fuel: carData.fuel,
//               geartype: carData.geartype,
//               seats: carData.seats,
//               priceperday: carData.priceperday,
//               horstpower: carData.horstpower,
//             }}
//             vehicleType={{
//               id: carData.vehicle_type_id || "Unknown",
//               name: carData.vehicle_types?.name || "Unknown",
//             }}
//             bookNowButton={
//               <RentButton
//                 id_vehicle={carData.id}
//                 car_price={carData.priceperday}
//               />
//             }
//           />