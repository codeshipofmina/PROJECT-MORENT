import { useNavigate } from "react-router";
import "../styles/rent_button.css";


interface RentButtonProps {
  id_vehicle: string;
}

const RentButton = ({ id_vehicle }: RentButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id_vehicle}`);
  };


    return <button className="rent_button" onClick={handleClick}>Rent now</button>;
};

export default RentButton;