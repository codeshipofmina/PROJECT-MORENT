import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/detailcarpage.css";

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

  //!  fake loading time
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

  return (
    <div className="detail_car_page">
      <div className="detail_car_card">
        <h1 className="detail_car_card_title">
          {carData.brand} {carData.model}
        </h1>

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
            <span>€{carData.priceperday}</span> / day
          </p>

          {/*WIP: add Location Selector here. "available locations or so". give selected location.id into state of the LINK */}
          <Link to="/booking" state={{ car_id: carData.id }}>

            to the booking{" "}
          </Link>
        </div>
      </div>

      <div className="reviews_container">
        <h2>Reviews</h2>
        {(carData.reviews ?? []).length > 0 ? (
          carData.reviews.map((review) => {
            const commentWithoutLastSentence = review.comment
              ? review.comment.replace(/\.?[^.]*$/, ".")
              : "";

            return (
              <div key={review.id} className="review">
                <p>Rating: {review.rating}/5</p>
                <p>{commentWithoutLastSentence}</p>
              </div>
            );
          })
        ) : (
          <p>No reviews available for this car.</p>
        )}
      </div>
    </div>
  );
};

export default DetailCarPage;
