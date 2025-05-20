
import CarCards from "../components/VehicleCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient.ts";
import HighlightProduct from "../components/HighlightProduct.tsx";

// pew pew pew 🔫 🔫 🔫

const HomePage = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("cars").select("*");
      console.log(result);
      if (result.error) {
        throw result.error;
      }
      return [
        {
          brand: "Audi",
          model: "A4",
          fuel: "Diesel",
          geartype: "Automatic",
          seats: 5,
          priceperday: 100,
          carimg: "https://example.com/audi-a4.jpg",
          vehicle_type_id: "sedan",
          id: "1",
          horstpower: 100,
          colors: "blau",
          year: 1999,
        },
        {
          brand: "Volkswagen",
          model: "T1",
          fuel: "Diesel",
          geartype: "Automatic",
          seats: 5,
          priceperday: 100,
          carimg: "https://example.com/audi-a4.jpg",
          vehicle_type_id: "sedan",
          id: "1",
          horstpower: 100,
          colors: "blau",
          year: 1999,
        },
      ];
      // return result.data;
    },

    queryKey: ["cars"],
  });
  console.log(data);
  return (
    <div>
      <HighlightProduct/>
      {data?.map((vehicle) => (
        <CarCards vehicle={vehicle} />
      ))}
    </div>
  );
};

export default HomePage;
