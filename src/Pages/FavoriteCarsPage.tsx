// # WIP



import { useAuthContext } from "../contexts/auth-context";
import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useCarsQuery } from "../hooks/useCarsQuery";

const FavoriteCarsPage = () => {
  const { session } = useAuthContext();
  const { data, isError, isPending } = useCarsQuery();

  if (isPending) {
    return "Is loading...";
  }
  if (isError) {
    return "Leider kaputt.";
  }

  console.log("here");

  console.log(data);

  // const favoriteCars = data.filter(
  //   (cars) =>
  // );
  // message.recipient_id === session?.user.id

  return (
    <div>
      <h2>My Favorite Cars</h2>
      {/* car card where  favorites.user.id  = auth. */}
    </div>
  );
};

export default FavoriteCarsPage;

// export const useMessagesQuery = () => {
//   const { session } = useAuthContext();
//   return useQuery({
//     queryFn: async () => {
//       const result = await supabase.from("favorites").select("*").eq(session?.user.id, "user_id");
//       if (result.error) {
//         throw result.error;
//       }

//       // wir ergaenzen die messages durch die id des jeweils anderen users
//       const messagesWithOtherUserId = result.data.map((message) => ({
//         ...message,
//         otherUserId:
//           message.recipient_id === session?.user.id // * falls wir selbst der empfänger sind...
//             ? message.sender_id // * ist der sender unser gespraechspartner
//             : message.recipient_id, // * falls nicht, ist es der empfänger
//       }));
//       return messagesWithOtherUserId;
//     },
//     queryKey: ["messages"],
//   });
// };
