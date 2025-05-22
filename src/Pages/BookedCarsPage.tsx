import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "../components/VehicleCard";

const BookingOverviewPage = () => {
  const {
    data: bookedCarData,
    isError,
    isPending,
  } = useQuery({
    queryFn: async () => {
      const bookedCarsRequest = supabase.from("bookings").select("*, cars(*)");

      const result = await bookedCarsRequest;

      if (result.data) {
        // * get startdate, enddate from the booking
        // const bookingDate = result.data.map((booking) => {
        //   const startDate = new Date(booking.start_date)
        //   const endDate = new Date(booking.end_date)
        // });
        return result.data.map((car) => car.cars);
      } else {
        throw result.error;
      }
    },
    queryKey: ["bookedCars"],
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>👾My Booked Cars</h2>
      {bookedCarData.map((car) => (
              <VehicleCard
                key={car.id}
                vehicle={car}
                vehicleType={{ id: "", name: "Unknown" }}
              />
            ))}
            {bookedCarData.length === 0 && <p>No booked cars yet.</p>}
    </div>
  );
};

export default BookingOverviewPage;
