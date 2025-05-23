import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/sidebar.css";

type FilterState = {
  vehicleTypeIds: string[];
  seatCounts: number[];
  maxPrice: number;
  pickupLocation: string;
};

type SidebarProps = {
  onFilterChange: (filters: FilterState) => void;
};

export const Sidebar = ({ onFilterChange }: SidebarProps) => {
  const [vehicleTypes, setVehicleTypes] = useState<
    { id: string; name: string | null }[]
  >([]);
  const [locations, setLocations] = useState<
    { id: string; city: string | null }[]
  >([]);

  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    []
  );
  const [selectedSeatCounts, setSelectedSeatCounts] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceLimit, setPriceLimit] = useState(1000);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: vt } = await supabase.from("vehicle_types").select("*");
      const { data: loc } = await supabase.from("locations").select("*");
      const { data: prices } = await supabase
        .from("cars")
        .select("priceperday")
        .order("priceperday", { ascending: false })
        .limit(1);

      if (vt) setVehicleTypes(vt);
      if (loc) setLocations(loc);
      if (prices && prices[0]) {
        const limit = Math.ceil(prices[0].priceperday);
        setPriceLimit(limit);
        setMaxPrice(limit);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    onFilterChange({
      vehicleTypeIds: selectedVehicleTypes,
      seatCounts: selectedSeatCounts,
      maxPrice,
      pickupLocation: selectedLocation,
    });
  }, [
    selectedVehicleTypes,
    selectedSeatCounts,
    maxPrice,
    selectedLocation,
    onFilterChange,
  ]);

  const handleVehicleTypeChange = (id: string) => {
    setSelectedVehicleTypes((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSeatCountChange = (count: number) => {
    setSelectedSeatCounts((prev) =>
      prev.includes(count) ? prev.filter((c) => c !== count) : [...prev, count]
    );
  };

  return (
    <div className="sidebar">
      <h3>Cities</h3>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">Select a City</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.city}
          </option>
        ))}
      </select>

      <h3>Vehicle Typle</h3>
      {vehicleTypes.map((type) => (
        <div key={type.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedVehicleTypes.includes(type.id)}
              onChange={() => handleVehicleTypeChange(type.id)}
            />
            {type.name}
          </label>
        </div>
      ))}

      <h3>Capacity</h3>
      {[2, 4, 5, 6, 7, 8].map((count) => (
        <div key={count}>
          <label>
            <input
              type="checkbox"
              checked={selectedSeatCounts.includes(count)}
              onChange={() => handleSeatCountChange(count)}
            />
            {count} Person
          </label>
        </div>
      ))}

      <h3>Price</h3>
      <input
        type="range"
        min="0"
        max={priceLimit}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <p>{maxPrice} ₺</p>
    </div>
  );
};
