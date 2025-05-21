import { Link } from "react-router-dom";
import backImg from "../assets/img/back.png";
import "../styles/payment_page.css";

const PaymentPage = () => {
    return (
        <section className="payment_page">
            <div className="back">
                <img src={backImg} alt="Back Icon" />
                <Link to="/">Back</Link>
            </div>

            <div className="grid">
                <article className="payment">
                    <form>
                        <div className="container">
                            {/* Billing */}
                            <section>
                                <h2>Billing Info</h2>
                                <p>Please enter your billing info</p>
                                <div className="grid">
                                    <input placeholder="Your name" />
                                    <input placeholder="Phone number" />
                                    <input placeholder="Address" />
                                    <input placeholder="Town / City" />
                                </div>
                            </section>

                            {/* Rental */}
                            <section>
                                <h2>Rental Info</h2>
                                <p>Please select your rental date</p>
                                <div className="rental-section">
                                    <div>
                                        <h3>Pick – Up</h3>
                                        <input placeholder="Bremen" />
                                        <input type="date" />
                                        <input type="time" />
                                    </div>
                                    <div>
                                        <h3>Drop – Off</h3>
                                        <input placeholder="Bremen" />
                                        <input type="date" />
                                        <input type="time" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment */}
                            <section>
                                <h2>Payment Method</h2>
                                <p>Please enter your payment method</p>
                                <label>
                                    <input type="radio" name="payment" /> Credit
                                    Card
                                </label>
                                <label>
                                    <input type="radio" name="payment" /> PayPal
                                </label>
                                <label>
                                    <input type="radio" name="payment" />{" "}
                                    Bitcoin
                                </label>
                            </section>

                            {/* Confirmation */}
                            <section>
                                <h2>Confirmation</h2>
                                <p>
                                    We are getting to the end. Just a few clicks
                                    and your rental is ready!
                                </p>
                                <label>
                                    <input type="checkbox" /> I agree with
                                    sending marketing and newsletter emails. No
                                    spam, promised!
                                </label>
                                <label>
                                    <input type="checkbox" /> I agree with our
                                    terms and conditions and privacy policy.
                                </label>
                                <p className="secure-info">
                                    All your data are safe. We are using the
                                    most advanced security to provide you the
                                    best experience ever.
                                </p>
                            </section>
                        </div>
                    </form>
                </article>

                <article className="rental_summary">platzhalter</article>
            </div>
        </section>
    );
};

export default PaymentPage;
