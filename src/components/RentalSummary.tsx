import "../styles/rental_summary.css";
import ApeImg from "../assets/img/Ape.png";

const RentalSummary = () => {
  return (
    <section className="rental-summary-container">
      <h2>Rental Summary</h2>
      <p>Prices may change depending on the length of the rental and the
      price of your rental car.</p>
      <img className="rental-summary-img" src={ApeImg} alt="Ape" />
      <h3>SuperCode Ape</h3>
      <div>Stars</div>
      <p>2 Reviewer</p>
      <p>Price per Day</p>
      <p>$100</p>
      <p>Tax</p>
      <p>$0</p>
    </section>
  );
};

export default RentalSummary;
