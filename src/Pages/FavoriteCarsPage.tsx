import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "../components/VehicleCard";
import "../styles/favorite_cars_page.css";

const FavoriteCarsPage = () => {
    const {
        data: favoriteCarData,
        isError,
        isPending,
    } = useQuery({
        queryFn: async () => {
            const favoriteCarsRequest = supabase
                .from("favorites")
                .select("cars(*)");

            const result = await favoriteCarsRequest;

            if (result.data) {
                return result.data.map((car) => car.cars);
            } else {
                throw result.error;
            }
        },
        queryKey: ["favoriteCars"],
    });

    if (isError) {
        return <div>Something went wrong</div>;
    }
    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <article className="favorite_cars">
            <h2>🧡 My Favorite Cars</h2>
            <div className="favourite_cars_container">
                {favoriteCarData.map((car) => (
                    <VehicleCard
                        key={car.id}
                        vehicle={car}
                        vehicleType={{ id: "", name: "Unknown" }}
                    />
                ))}
            </div>
            {favoriteCarData.length === 0 && <p>No favorite cars found.</p>}
        </article>
    );
};
export default FavoriteCarsPage;
