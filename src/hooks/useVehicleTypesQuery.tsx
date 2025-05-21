import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useVehicleTypesQuery = () =>
  useQuery({
    queryFn: async () => {
      const result = await supabase.from("vehicle_types").select("*");

      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
    queryKey: ["vehicle_types"],
  });
