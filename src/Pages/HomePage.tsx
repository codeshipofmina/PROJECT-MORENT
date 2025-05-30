import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient.ts";
import HighlightProduct from "../components/HighlightProduct.tsx";
import "../styles/homepage.css";
import VehicleCard from "../components/VehicleCard.tsx";
import BigButton from "../components/BigButton.tsx";

const HomePage = () => {
  const [visibleCount, setVisibleCount] = useState(12); 

  const { data: vehicles } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("cars").select("*");
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    queryKey: ["cars"],
  });

  const { data: vehicleTypes } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("vehicle_types").select("*");
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    queryKey: ["vehicle_types"],
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); 
  };

  return (
    <div className="homepage-container">
      <HighlightProduct />
      <BigButton children="Find the Perfect Ride - Tailor Your Rental Search" className="go_to_filter_button" to="/filter" />
      <div className="vehicle_card_container">
        {vehicles?.slice(0, visibleCount).map((vehicle) => {
          const vehicleType = vehicleTypes?.find(
            (type) => type.id === vehicle.vehicle_type_id
          );
          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              vehicleType={vehicleType || { id: "", name: "Unknown" }}
            />
          );
        })}
      </div>
      {vehicles && visibleCount < vehicles.length && (
        <BigButton className="load-more-button" onClick={handleLoadMore}>
          Show møre
        </BigButton>
      )}
    </div>
  );
};

export default HomePage;



// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../lib/supabaseClient.ts";
// import HighlightProduct from "../components/HighlightProduct.tsx";
// import "../styles/homepage.css";
// import VehicleCard from "../components/VehicleCard.tsx";
// import BigButton from "../components/BigButton.tsx";

// const HomePage = () => {
  
//   const { data: vehicles } = useQuery({
//     queryFn: async () => {
//       const result = await supabase.from("cars").select("*");
//       if (result.error) {
//         throw result.error;
//       }
//       return result.data;
//     },
//     queryKey: ["cars"],
//   });

//   const { data: vehicleTypes } = useQuery({
//     queryFn: async () => {
//       const result = await supabase.from("vehicle_types").select("*");
//       if (result.error) {
//         throw result.error;
//       }
//       return result.data;
//     },
//     queryKey: ["vehicle_types"],
//   });

//   return (
//     <div className="homepage-container">
//       <HighlightProduct />
//       <BigButton children="Find the Perfect Ride - Tailor Your Rental Search" className="go_to_filter_button" to="/filter"></BigButton>
//       <div className="vehicle_card_container">
//         {vehicles?.map((vehicle) => {
//           const vehicleType = vehicleTypes?.find(
//             (type) => type.id === vehicle.vehicle_type_id
//           );
//           return (
//             <VehicleCard
//               key={vehicle.id}
//               vehicle={vehicle}
//               vehicleType={vehicleType || { id: "", name: "Unknown" }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


