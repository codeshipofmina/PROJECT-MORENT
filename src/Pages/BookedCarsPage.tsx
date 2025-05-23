import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import type { Tables } from "../types/supabase";
import mapImg from "../assets/img/map_dusseldorf.png";
import "../styles/booked_cars_page.css";

type BookingWithCar = {
    booking: Tables<"bookings">;
    car: Tables<"cars">;
};

const BookingOverviewPage = () => {
    const {
        data: bookedCarData,
        isError,
        isPending,
    } = useQuery<BookingWithCar[]>({
        queryKey: ["bookedCars"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("bookings")
                .select("*, cars(*)");

            if (error || !data) throw error ?? new Error("No data");

            return data.map((booking) => ({
                booking,
                car: booking.cars as Tables<"cars">, // Typ-Sicherheit erzwingen
            }));
        },
    });

    if (isError) return <div>Etwas ist schiefgelaufen.</div>;
    if (isPending) return <div>Lade Buchungen...</div>;

    return (
        <article className="booked_cars">
            <h2>My Bookings</h2>

            {bookedCarData.length === 0 && <p>Du hast noch keine Buchungen.</p>}

            {bookedCarData.map(({ booking, car }) => (
                <>
                    <h4>{new Date(booking.start_date).toLocaleDateString()}</h4>
                    <section className="booked_cars_container" key={booking.id}>
                        <div className="booked_cars_info">
                            <img
                                src={car.carimg}
                                alt={`${car.brand} ${car.model}`}
                            />
                            <div className="booked_cars_text">
                                <h3>
                                    {car.brand} {car.model} ({car.year})
                                </h3>
                                <p>
                                    {new Date(
                                        booking.start_date
                                    ).toLocaleDateString()}{" "}
                                    –{" "}
                                    {new Date(
                                        booking.end_date
                                    ).toLocaleDateString()}
                                </p>
                                <h4>{booking.total_price} €</h4>
                            </div>
                        </div>

                        <div className="line"></div>

                        <div className="booked_cars_map">
                            <h3>Düsseldorf</h3>
                            <img src={mapImg} alt="Map" />
                        </div>
                    </section>
                </>
            ))}
        </article>
    );
};

export default BookingOverviewPage;

// import { supabase } from "../lib/supabaseClient";
// import { useQuery } from "@tanstack/react-query";
// import VehicleCard from "../components/VehicleCard";

// const BookingOverviewPage = () => {
//   const {
//     data: bookedCarData,
//     isError,
//     isPending,
//   } = useQuery({
//     queryFn: async () => {
//       const bookedCarsRequest = supabase.from("bookings").select("*, cars(*)");

//       const result = await bookedCarsRequest;

//       if (result.data) {
//         // * get startdate, enddate from the booking
//         // const bookingDate = result.data.map((booking) => {
//         //   const startDate = new Date(booking.start_date)
//         //   const endDate = new Date(booking.end_date)
//         // });
//         return result.data.map((car) => car.cars);
//       } else {
//         throw result.error;
//       }
//     },
//     queryKey: ["bookedCars"],
//   });

//   if (isError) {
//     return <div>Something went wrong</div>;
//   }
//   if (isPending) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div>
//       <h2>👾My Booked Cars</h2>
//       {bookedCarData.map((car) => (
//               <VehicleCard
//                 key={car.id}
//                 vehicle={car}
//                 vehicleType={{ id: "", name: "Unknown" }}
//               />
//             ))}
//             {bookedCarData.length === 0 && <p>No booked cars yet.</p>}
//     </div>
//   );
// };

// export default BookingOverviewPage;
