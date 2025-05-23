import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/rental_location_form.css";
type Location = {
  id: string;
  city: string | null;
};

type RentalFormProps = {
  onChange: (data: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
  }) => void;
};

const RentalForm = ({ onChange }: RentalFormProps) => {
  const [locations, setLocations] = useState<Location[]>([]);

  const [pickup, setPickup] = useState({
    location: "",
    date: "",
    time: "",
  });

  const [dropoff, setDropoff] = useState({
    location: "",
    date: "",
    time: "",
  });

  // Fetch locations from Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) console.error("Locations could not be retrieved", error);
      else setLocations(data);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    onChange({
      pickupLocation: pickup.location,
      dropoffLocation: dropoff.location,
      pickupDate: pickup.date,
    });
  }, [pickup, dropoff, onChange]);

  const handleSwap = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  return (
    <div className="rental-form">
      <div className="form-box">
        <h4>Pickup</h4>
        <div>
          <label>Location:</label>
          <select
            value={pickup.location}
            onChange={(e) => setPickup({ ...pickup, location: e.target.value })}
          >
            <option value="">Please select</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={pickup.date}
            onChange={(e) => setPickup({ ...pickup, date: e.target.value })}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={pickup.time}
            onChange={(e) => setPickup({ ...pickup, time: e.target.value })}
          />
        </div>
      </div>

      <button className="swap-button" onClick={handleSwap}>
        🔁
      </button>

      <div className="form-box">
        <h4>Drop-Off</h4>
        <div>
          <label>Location:</label>
          <select
            value={dropoff.location}
            onChange={(e) =>
              setDropoff({ ...dropoff, location: e.target.value })
            }
          >
            <option value="">Please select</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={dropoff.date}
            onChange={(e) => setDropoff({ ...dropoff, date: e.target.value })}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={dropoff.time}
            onChange={(e) => setDropoff({ ...dropoff, time: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
