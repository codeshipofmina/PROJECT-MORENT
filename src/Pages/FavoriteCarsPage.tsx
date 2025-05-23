import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import "../styles/favorite_cars_page.css";

const FavoriteCarsPage = () => {
  // State to manage favorite IDs
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorite IDs from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavoriteIds(JSON.parse(storedFavorites));
    }
  }, []);

  const {
    data: favoriteCars,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["favoriteCars", favoriteIds], // React Query will refetch when favoriteIds changes
    queryFn: async () => {
      if (favoriteIds.length === 0) return [];
      const { data, error } = await supabase
        .from("cars")
        .select(
          `
          *,
          vehicle_types(name)
        `
        )
        .in("id", favoriteIds);

      if (error) throw error;
      return data;
    },
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <article className="favorite_cars">
      <h2>🧡 My Favorite Cars</h2>
      <div className="favourite_cars_container">
        {favoriteCars?.map((car) => (
          <VehicleCard
            key={car.id}
            vehicle={car}
            vehicleType={{
              id: "unknown",
              name: car.vehicle_types?.name || "Unknown",
            }}
          />
        ))}
      </div>
      {favoriteCars?.length === 0 && <p>No favorite cars found.</p>}
    </article>
  );
};

export default FavoriteCarsPage;
