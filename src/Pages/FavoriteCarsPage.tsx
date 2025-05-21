// # WIP

// import { useAuthContext } from "../contexts/auth-context";
// import { supabase } from "../lib/supabaseClient";
// import { useQuery } from "@tanstack/react-query";
// import VehicleCard from "../components/VehicleCard";

const FavoriteCarsPage = () => {
  // const { session } = useAuthContext();

  // # rework the query. somethings not right with the joins (tablenames and columns)
  // const { data, isError, isPending } = useQuery({
  //   queryFn: async () => {
  //     const favoriteCarsRequest = supabase
  //       .from("cars")
  //       .select("*, favorites(user_id), users(*)")

  //     const result = await favoriteCarsRequest;

  //     if (result.data) {
  //       return result.data;
  //     } else {
  //       throw result.error;
  //     }
  //   },
  //   queryKey: ["favoriteCars"],
  // });

  // if (isError) {
  //   return <div>Something went wrong</div>;
  // }
  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  // const favoriteCars = data.filter((cars) =>
  //   cars.favorites?.some((favorite) => favorite.user_id === session?.user.id)
  // );
  // console.log("favoriteCars");
  // console.log(favoriteCars);

  return (
    <div>
      <h2>My Favorite Cars</h2>
      {/* {favoriteCars.map((car) => (
        <VehicleCard
          key={car.id}
          vehicle={car}
          vehicleType={{ id: "", name: "Unknown" }}
        />
      ))}
      {favoriteCars.length === 0 && <p>No favorite cars found.</p>} */}
    </div>
  );
};
export default FavoriteCarsPage;
