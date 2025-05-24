import "../styles/rental_summary.css";
import defaultImg from "../assets/img/Ape.png";

interface RentalSummaryProps {
  car: {
    carimg: string;
    brand: string;
    model: string;
    priceperday: number;
    rating: number;
    reviewCount: number;
  } | null;
  total: number;
}

const RentalSummary = ({ car, total }: RentalSummaryProps) => {
  return (
    <section className="rental-summary-container">
      <h2>Rental Summary</h2>
      <p>
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
      <div className="rental-summary">
        <img
          className="rental-summary-img"
          src={car?.carimg || defaultImg}
          alt="Car preview"
        />
        <div className="rental-summary-info">
          <h2>{car ? `${car.brand} ${car.model}` : "Vehicle"}</h2>
          <div className="stars_rancing">
            <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
            <p>{car?.reviewCount} Reviews</p>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="price">
        <p>Price per Day</p>
        <p>${car?.priceperday ?? "-"}</p>
      </div>
      <div className="tax">
        <p>Tax</p>
        <p>$0</p>
      </div>
      <div className="total">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </section>
  );
};

export default RentalSummary;
