import "../styles/filter_button.css";
import filterImg from "../assets/img/filter.png";
import { useNavigate } from "react-router";

const FilterButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/filter");
    };
    return (
        <button className="filter_button" onClick={handleClick}>
            <img src={filterImg} alt="Filter Icon" />
            Filter
        </button>
    
        
        
    );
};

export default FilterButton;