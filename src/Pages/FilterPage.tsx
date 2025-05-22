// # WIP

// import VehicleCard from "../components/VehicleCard";
// import { supabase } from "../lib/supabaseClient";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useVehicleTypesQuery } from "../hooks/useVehicleTypesQuery";

const FilterPage = () => {
  // const { signOut, session } = useAuthContext();
  //   const { data, isError, isPending } = useQuery({
  //     queryFn: async () => {
  //       const carRequest = supabase
  //         .from("cars")
  //         .select("*, vehicle_types(*), users(*)");

  //       const result = await carRequest;

  //       if (result.data) {
  //         return result.data;
  //       } else {
  //         throw result.error;
  //       }
  //     },
  //     queryKey: ["cars", "homepage", { searchText: searchText }],
  //   });

  return (
    <div>
      <section>
        <h1>Filter</h1>
        {/* <input
          className="searchbar"
          placeholder="Welche Automarke möchtest du fahren?"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        /> */}
      </section>{" "}
      <section className="filtered-cards-container">
        {/* <VehicleCard/> */}
      </section>
    </div>
  );
};

export default FilterPage;

//# Snippets to use/edit -- FilterLogic with Categories and CarCardProps (from early Header-Version1)

//* AuthContext used for Marking Cars as Favorites - only working or usable when user logged in.

// import { useAuthContext } from "../contexts/auth-context";
// import { Link } from "react-router";
// import { supabase } from "../lib/supabaseClient";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

//? offen nina: brauchen wir die vehicle card hier? oder rendern wir eine carGallery? or props?
// import VehicleCard from "./VehicleCard";

// export default function FilterPage() {
// const { signOut, session } = useAuthContext();
//   const [searchText, setSearchText] = useState("");

//   const { data, isError, isPending } = useQuery({
//     queryFn: async () => {
//       const carRequest = supabase
//         .from("cars")
//         .select("*, vehicle_types(*), users(*)");

//       if (searchText.length >= 2) {
//         carRequest.ilike("brand", `%${searchText}%` || "");
//       }

//       const result = await carRequest;

//       if (result.data) {
//         return result.data;
//       } else {
//         throw result.error;
//       }
//     },
//     queryKey: ["cars", "homepage", { searchText: searchText }],
//   });

//   return (
//     <>
//         <input
//           className="searchbar"
//           value={searchText}
//           placeholder="Welche Automarke möchtest du fahren?"
//           onChange={(e) => {
//             setSearchText(e.target.value);
//           }}
//         />

//         {isPending && "Is loading..."}
//         {isError && "Leider kaputt."}
//         {data && (
//           <section className="car-selection">
//             {data.map((car) => (
//           <VehicleCard
//             key={car.id}
//             brand={car.brand}
//             model={car.model}
//             type={car.vehicle_type_id}
//             id={car.id}
//             fuel={car.fuel}
//             imagePath={car.carimg}
//             geartype={car.geartype}
//             seats={car.seats}
//             price={car.priceperday}
//           />
//         ))}
//           </section>
//         )}
//
//
//     </>
//   );
// }

// use to give location and car_id into payment page and rental summary component

// <Link to="/" state={{name: "pedro", location: "{}"}} ></Link>

// import { useLocation } from "react-router";

// const HomePage = () => {
//   const location = useLocation();
//   console.log(location.state);