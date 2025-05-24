import { useNavigate } from "react-router";
import "../styles/detail_button.css";

interface RentButtonProps {
  id_vehicle: string;
  onClick?: () => void;
}

const DetailButton = ({ id_vehicle, onClick }: RentButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
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
