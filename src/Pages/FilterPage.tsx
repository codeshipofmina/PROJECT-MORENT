import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import VehicleCard from "../components/VehicleCard";
import { Sidebar } from "../components/SideBar";
import "../styles/FilterPage.css";

const FilterPage = () => {
  const [filters, setFilters] = useState({
    vehicleTypeIds: [] as string[],
    seatCounts: [] as number[],
    maxPrice: 1000,
    pickupLocation: "",
  });

  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);

  const { data: allVehicles } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("cars").select("*");
      if (result.error) throw result.error;
      return result.data;
    },
    queryKey: ["cars"],
  });

  const { data: vehicleTypes } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("vehicle_types").select("*");
      if (result.error) throw result.error;
      return result.data;
    },
    queryKey: ["vehicle_types"],
  });

  const { data: carLocations } = useQuery({
    queryFn: async () => {
      const result = await supabase.from("car_locations").select("*");
      if (result.error) throw result.error;
      return result.data;
    },
    queryKey: ["car_locations"],
  });

  useEffect(() => {
    if (!allVehicles) return;

    let filtered = [...allVehicles];

    if (filters.vehicleTypeIds.length > 0) {
      filtered = filtered.filter((v) =>
        filters.vehicleTypeIds.includes(v.vehicle_type_id)
      );
    }

    if (filters.seatCounts.length > 0) {
      filtered = filtered.filter((v) => filters.seatCounts.includes(v.seats));
    }

    filtered = filtered.filter((v) => v.priceperday <= filters.maxPrice);

    if (filters.pickupLocation && carLocations) {
      const matchingCarIds = carLocations
        .filter((cl) => cl.location_id === filters.pickupLocation)
        .map((cl) => cl.car_id);

      filtered = filtered.filter((v) => matchingCarIds.includes(v.id));
    }

    setFilteredVehicles(filtered);
  }, [allVehicles, filters, carLocations]);

  return (
    <div className="page-layout">
      <Sidebar onFilterChange={setFilters} />

      <div className="vehicle_content">
        <div className="vehicle_card_container">
          {filteredVehicles.map((vehicle) => {
            const vehicleType = vehicleTypes?.find(
              (type) => type.id === vehicle.vehicle_type_id
            );
            return (
              <section key={vehicle.id}>
                <VehicleCard
                  vehicle={vehicle}
                  vehicleType={vehicleType || { id: "", name: "Unknown" }}
                />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
