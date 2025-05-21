import CarCards from "../components/VehicleCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient.ts";
import HighlightProduct from "../components/HighlightProduct.tsx";
import "../styles/homepage.css";

const HomePage = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("cars").select("*");
      console.log(result);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    queryKey: ["cars"],
  });

  console.log(data);

  return (
    <div>
      <HighlightProduct />
      {data?.map((vehicle) => (
        <div className="vehicle_card_container">
          <CarCards key={vehicle.id} vehicle={vehicle} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
