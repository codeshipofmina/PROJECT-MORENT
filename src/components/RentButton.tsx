import { useNavigate } from "react-router";
import "../styles/rent_button.css";

interface RentButtonProps {
  id_vehicle: string;
  car_price?: number; // Optional car price to pass to the booking page
  onClick?: () => void; // Optional onClick handler for additional functionality
}

const RentButton = ({ id_vehicle, car_price, onClick }: RentButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Navigate to the booking page and pass the car ID and price as state
    navigate("/booking", { state: { car_id: id_vehicle, car_price } });
  };

  return (
    <button className="rent_button" onClick={handleClick}>
      Rent Now
    </button>
  );
};

export default RentButton;
