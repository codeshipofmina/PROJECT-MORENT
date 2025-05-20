import { useNavigate } from "react-router";
import "../styles/big_button.css";

interface BigButtonProps {
    children: React.ReactNode;
    to?: string; // optional für Navigation
    onClick?: () => void; // optional für eigene Aktion
}

const BigButton = ({ children, to, onClick }: BigButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); // eigene Logik
        } else if (to) {
            navigate(to); // navigieren
        }
    };return <button className="big_button" onClick={handleClick}>
            {children}
        </button>;
};

export default BigButton;
