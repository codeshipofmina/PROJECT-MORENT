import "../styles/modal_booking_finished.css";
import { Link} from "react-router-dom";

const ModalBookingFinished = () => {
    // const navigate = useNavigate();

    const getRandomColor = () => {
        const colors = [
            "#ff7f59",
            "#01a5a5",
            "#ffa37a",
            "#ffc8a6",
            "#1ef5f5",
            "#136b6b",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };


    // const handleConfirm = () => {
    //     navigate("/");                      // Weiterleitung
    // };

    return (
        <div className="modal_booking_finished">
         

                <div className="modal-overlay">
                    <div className="confetti-wrapper">
                        {Array.from({ length: 60 }).map((_, i) => (
                            <div
                                key={i}
                                className="confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    backgroundColor: getRandomColor(),
                                    animationDelay: `${Math.random() * 2}s`,
                                    transform: `rotate(${
                                        Math.random() * 360
                                    }deg)`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="modal-content">
                        <h2>You did it! Your booking is locked in!</h2>
                        <h3>
                            Thanks a ton for choosing <span>Mørent!</span>
                        </h3>
                        <p>
                            🚗✨ <br />
                            We’re thrilled to be your ride buddy. <br />
                            Now go <span>check your emails ✉️</span> for all the
                            juicy details about picking up your shiny chariot.{" "}
                            <br />
                            🚗✨
                        </p>
                        {/* handleconfirm kann dann raus. und navigate */}
                        <Link to="/" className="close-button">
                            Awesøme
                        </Link>
                    </div>
                </div>
        </div>
    );
};

export default ModalBookingFinished;
