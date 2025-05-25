import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/detailcarpage.css";
import "../styles/booknow_button.css";
import { Link } from "react-router";
import backImg from "../assets/img/back.png";
import RentButton from "../components/RentButton";

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
    }, 2000);

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
      <div className="back">
        <img src={backImg} alt="Back Icon" />
        <Link to="/">Back</Link>
      </div>
      <div className="detail_car_card">
        <div className="car_img_wrapper">
          <img
            className="detail_car_card img"
            src={carData.carimg ?? ""}
            alt={`${carData.brand} ${carData.model}`}
          />{" "}
        </div>
        <div>
          {" "}
          <h1 className="detail_car_card_title">
            {carData.brand} {carData.model}
          </h1>
          {/* opt durchschnittliche bewertung aller reviews */}
          <div className="detail_car_card_details">
            <div className="detail_car_card_details_left">
              <div className="detail_item">
                <h4>Type:</h4>
                <p>{carData.vehicle_types?.name ?? "Unknown"}</p>
              </div>
              <div className="detail_item">
                <h4>Year:</h4>
                <p>{carData.year}</p>
              </div>
              <div className="detail_item">
                <h4>Fuel:</h4>
                <p>{carData.fuel}</p>
              </div>
              <div className="detail_item">
                <h4>Gear Type:</h4>
                <p>{carData.geartype}</p>
              </div>
              <div className="detail_item">
                <h4>Seats:</h4>
                <p>{carData.seats}</p>
              </div>
            </div>
            <div className="detail_car_card_details_right">
              <div className="detail_item">
                <h4>Horsepower:</h4>
                <p>{carData.horstpower} 🐎</p>
              </div>
              <div className="detail_item">
                <h4>Color:</h4>
                <p>{carData.color}</p>
              </div>
              <div className="detail_item">
                <h4>Usage:</h4>
                <p>{carData.consumption} L/100km</p>
              </div>
              <div className="detail_item">
                <h4>Locations:</h4>
                <p>
                  {carData.car_locations
                    ?.map((loc) => loc.locations.city)
                    .join(", ") || "Unknown"}
                </p>
              </div>
              <div className="detail_item">
                <h4>Price:</h4>
                <p>
                  <span>€{carData.priceperday}</span> / day
                </p>
              </div>
              <RentButton
                id_vehicle={carData.id}
                car_price={carData.priceperday}
              />
            </div>
          </div>
        </div>
        <div className="car_map car_map_wrapper">
          <img
            src={carData.car_map ?? ""}
            alt="Car Map"
            className="car_map_image"
          />
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
