import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useFavoritesQuery = ()=> useQuery({
    queryFn: async () => {
      const result = await supabase.from("favorites").select("*");

      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
    queryKey: ["favorites"],
  });