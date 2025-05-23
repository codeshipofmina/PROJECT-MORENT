import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import VehicleCard from "../components/VehicleCard";
import "../styles/detailcarpage.css";

const DetailCarPage = () => {
  const { id_vehicle } = useParams<{ id_vehicle: string }>();

  // Fetch car details with vehicleType
  const { data: car, isLoading: carLoading } = useQuery({
    queryKey: ["car", id_vehicle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*, vehicle_types(name)")
        .eq("id", id_vehicle ?? "")
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id_vehicle,
  });

  // Fetch location details using location_id
  const { data: location, isLoading: locationLoading } = useQuery({
    queryKey: ["location", car?.id],
    queryFn: async () => {
      if (!car?.id) return null;
      const { data, error } = await supabase
        .from("car_locations")
        .select("location_id, locations (city, address)")
        .eq("car_id", car.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!car?.id,
  });

  // Fetch reviews for the car
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id_vehicle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("car_id", id_vehicle ?? "");
      if (error) throw error;
      return data;
    },
  });

  // Fetch nearby cars in the same location
  const { data: nearbyCars, isLoading: nearbyCarsLoading } = useQuery({
    queryKey: ["nearbyCars", location?.location_id],
    queryFn: async () => {
      if (!location?.location_id) return [];
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", location.location_id)
        .neq("id", id_vehicle ?? "");
      if (error) throw error;
      return data;
    },
    enabled: !!location?.location_id,
  });

  if (carLoading || reviewsLoading || locationLoading || nearbyCarsLoading) {
    return (
      <div className="loading-skeleton">
        <div className="skeleton-logo">MØRENT</div>
      </div>
    );
  }
  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="detail_car_page">
      {/* Car Details */}
      <div className="detail_car_card">
        <h1 className="detail_car_card_title">
          {car.brand} {car.model}
        </h1>

        <p>{car.vehicle_types?.name ?? "Unknown"}</p>
        <p>{car.year}</p>
        {/* Vehicle Type */}
        <img
          className="detail_car_card img"
          src={car.carimg ?? ""}
          alt={`${car.brand} ${car.model}`}
        />
        <div className="detail_car_card_details">
          <p>Fuel: {car.fuel}</p>
          <p>Gear Type: {car.geartype}</p>

          <p>Seats: {car.seats}</p>
          <p>Horstpower: {car.horstpower} 🐎</p>
          <p>Color: {car.color}</p>
          <p>Usage: {car.consumption} L/100km</p>
          <p>
            Location: {location?.locations},{" "}
            {location?.address.city ?? "Unknown"}
          </p>
          <p>
            <span>€{car.priceperday}</span> / day
          </p>
          <Link to="/booking" state={{ car_id: car.id }}>
            to the booking{" "}
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews_container">
        <h2>Reviews</h2>
        {(reviews ?? []).length > 0 ? (
          (reviews ?? []).map((review) => {
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

      {/* Nearby Cars Section */}
      <div className="nearby_cars_container">
        <h2>Available Nearby</h2>
        <div className="vehicle_card_container">
          {(nearbyCars ?? []).length > 0 ? (
            (nearbyCars ?? []).map((nearbyCar) => (
              <VehicleCard
                key={nearbyCar.id}
                vehicle={nearbyCar}
                vehicleType={{ id: "", name: "Unknown" }}
              />
            ))
          ) : (
            <p>No nearby cars available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCarPage;
