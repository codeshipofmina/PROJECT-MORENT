import "../styles/rental_summary.css";
import ApeImg from "../assets/img/Ape.png";

const RentalSummary = () => {
    return (
        <section className="rental-summary-container">
            <h2>Rental Summary</h2>
            <p>
                Prices may change depending on the length of the rental and the
                price of your rental car.
            </p>
            <div className="rental-summary">
                <img className="rental-summary-img" src={ApeImg} alt="Ape" />
                <div className="rental-summary-info">
                    <h2>SuperCode Ape</h2>
                    <div className="stars_rancing">
                        <p>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</p>
                        <p>2 Reviewer</p>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="price">
                <p>Price per Day</p>
                <p>$100</p>
            </div>
            <div className="tax">
                <p>Tax</p>
                <p>$0</p>
            </div>
        </section>
    );
};

export default RentalSummary;
