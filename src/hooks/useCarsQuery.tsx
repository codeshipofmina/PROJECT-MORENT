import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useCarsQuery = () =>
  useQuery({
    queryFn: async () => {
      const result = await supabase.from("cars").select("*");

      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
    queryKey: ["cars"],
  });
