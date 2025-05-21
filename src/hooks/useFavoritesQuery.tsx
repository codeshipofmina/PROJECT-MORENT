import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/auth-context";

export const useFavoritesQuery = ()=> useQuery({
    const { session } = useAuthContext();
    queryFn: async () => {
      const result = await supabase.from("favorites").select("*").eq("user_id", session.user.id);;

      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
    queryKey: ["favorites"],
  });



  //# snippet to use/edit -- exampleCode from kleinanzeigen

  import { useAuthContext } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Wir haben diesen Hook ausgelagert, damit er aus mehreren Komponenten heraus genutzt werden kann
export const useMessagesQuery = () => {
 
  return useQuery({
    queryFn: async () => {
      const result = await supabase.from("messages").select("*");
      if (result.error) {
        throw result.error;
      }

      // wir ergaenzen die messages durch die id des jeweils anderen users
      const messagesWithOtherUserId = result.data.map((message) => ({
        ...message,
        otherUserId:
          message.recipient_id === session?.user.id // * falls wir selbst der empfänger sind...
            ? message.sender_id // * ist der sender unser gespraechspartner
            : message.recipient_id, // * falls nicht, ist es der empfänger
      }));
      return messagesWithOtherUserId;
    },
    queryKey: ["messages"],
  });
};