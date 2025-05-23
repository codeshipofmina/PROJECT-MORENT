import { useNavigate } from "react-router";
import "../styles/detail_button.css";

interface RentButtonProps {
  id_vehicle: string;
  onClick?: () => void; // Optional onClick handler for additional functionality
}

const DetailButton = ({ id_vehicle, onClick }: RentButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the additional onClick handler if provided
    }
    navigate(`/${id_vehicle}`); // Navigate to the vehicle detail page
  };

  return (
    <button className="detail_button" onClick={handleClick}>
      Møre Details
    </button>
  );
};

export default DetailButton;
