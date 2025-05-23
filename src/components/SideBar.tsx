import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/sidebar.css";

type FilterState = {
  vehicleTypeIds: string[];
  seatCounts: number[];
  maxPrice: number;
};

type SidebarProps = {
  onFilterChange: (filters: FilterState) => void;
};

export const Sidebar = ({ onFilterChange }: SidebarProps) => {
  const [vehicleTypes, setVehicleTypes] = useState<
    { id: string; name: string | null }[]
  >([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    []
  );
  const [selectedSeatCounts, setSelectedSeatCounts] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceLimit, setPriceLimit] = useState(1000);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const { data, error } = await supabase.from("vehicle_types").select("*");
      if (error) console.error("Araç türleri alınamadı:", error);
      else setVehicleTypes(data);
    };
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    const fetchMaxPrice = async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("priceperday")
        .order("priceperday", { ascending: false })
        .limit(1);

      if (data && data[0]) {
        setPriceLimit(Math.ceil(Number(data[0].priceperday)));
        setMaxPrice(Math.ceil(Number(data[0].priceperday)));
      }
    };
    fetchMaxPrice();
  }, []);

  useEffect(() => {
    onFilterChange({
      vehicleTypeIds: selectedVehicleTypes,
      seatCounts: selectedSeatCounts,
      maxPrice,
    });
  }, [selectedVehicleTypes, selectedSeatCounts, maxPrice, onFilterChange]);

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
      <h3>Vehicle Type</h3>
      <ul>
        {vehicleTypes.map((type) => (
          <li key={type.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedVehicleTypes.includes(type.id)}
                onChange={() => handleVehicleTypeChange(type.id)}
              />
              {type.name}
            </label>
          </li>
        ))}
      </ul>

      <h3>Capacity</h3>
      <ul>
        {[2, 4, 5, 6, 7, 8].map((count) => (
          <li key={count}>
            <label>
              <input
                type="checkbox"
                checked={selectedSeatCounts.includes(count)}
                onChange={() => handleSeatCountChange(count)}
              />
              {count} Person
            </label>
          </li>
        ))}
      </ul>

      <h3>Price (Max: {priceLimit}€)</h3>
      <input
        type="range"
        min="0"
        max={priceLimit}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <p>{maxPrice} €</p>
    </div>
  );
};
