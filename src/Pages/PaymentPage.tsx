import { Link } from "react-router-dom";
import backImg from "../assets/img/back.png";
import visaImg from "../assets/img/visa.png";
import paypalImg from "../assets/img/PayPal.png";
import bitcoinImg from "../assets/img/Bitcoin.png";
import safetyImg from "../assets/img/ic-security-safety.png";
import "../styles/payment_page.css";
import BigButton from "../components/BigButton";
import RentalSummary from "../components/RentalSummary";
import { useLocation } from "react-router";

const PaymentPage = () => {
   

    const navigationState: {car_id?: string, car_price?: number, location_id?: string, } = useLocation().state ?? {};

    const theCar = navigationState.car_id
    const theLocation = navigationState.location_id
    const thePrice = navigationState.car_price
    console.log(theCar);
    console.log(theLocation);
    console.log(thePrice);
    
    
    

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
                                <div className="billing_grid">
                                    <input placeholder="Your name" />
                                    <input placeholder="Phone number" />
                                    <input placeholder="Address" />
                                    <input placeholder="Town / City" />
                                </div>
                            </section>
                        </div>

                        <div className="container">
                            {/* Rental */}
                            <section>
                                <h2>Rental Info</h2>
                                <p>Please select your rental date</p>
                                <div className="rental-section">
                                    <div className="pick_up">
                                        <h3>Pick – Up</h3>
                                        <div className="pick_up_input">
                                            {/* LocationPicker-Select not needed here. only show what was chosen before.
                                            theLocation delivered by navigationState useLocation*/}
                                            <select name="cities" id="cities">
                                                <option disabled selected>
                                                    Location wählen
                                                </option>
                                                <option value="Bremen">
                                                    Bremen
                                                </option>
                                            </select>
                                            <input type="date" />
                                            <input type="time" />
                                        </div>
                                    </div>
                                    <div className="drop_off">
                                        <h3>Drop – Off</h3>
                                        <div className="drop_off_input">
                                            <select name="cities" id="cities">
                                                <option disabled selected>
                                                    Location wählen
                                                </option>
                                                <option value="Bremen">
                                                    Bremen
                                                </option>
                                            </select>
                                            {/* if more than one day is chosen - rerender the total price on the rental summary. 
                                            car PriceperDay is delivered by navigationState useLocation. thePrice. multiply thePrice for RentalSummary Card */}
                                            <input type="date" />
                                            <input type="time" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="container">
                            {/* Payment */}
                            <section>
                                <h2>Payment Method</h2>
                                <p>Please enter your payment method</p>
                                <div className="payment_stripe">
                                    <label>
                                        <input type="radio" name="payment" />{" "}
                                        Credit Card
                                    </label>
                                    <img src={visaImg} alt="Visa Logo" />
                                </div>
                                <div className="payment_stripe">
                                    <label>
                                        <input type="radio" name="payment" />{" "}
                                        PayPal
                                    </label>
                                    <img src={paypalImg} alt="Paypal Logo" />
                                </div>
                                <div className="payment_stripe">
                                    <label>
                                        <input type="radio" name="payment" />{" "}
                                        Bitcoin
                                    </label>
                                    <img src={bitcoinImg} alt="Bitcoin Logo" />
                                </div>
                            </section>
                        </div>

                        <div className="container">
                            {/* Confirmation */}
                            <section>
                                <h2>Confirmation</h2>
                                <p>
                                    We are getting to the end. Just a few clicks
                                    and your rental is ready!
                                </p>
                                <div className="agreement">
                                    <div className="agreement_stripe">
                                        <label>
                                            <input type="checkbox" /> I agree
                                            with sending marketing and
                                            newsletter emails. No spam,
                                            promised!
                                        </label>
                                    </div>

                                    <div className="agreement_stripe">
                                        <label>
                                            <input type="checkbox" /> I agree
                                            with our terms and conditions and
                                            privacy policy.
                                        </label>
                                    </div>
                                </div>
                                <img src={safetyImg} alt="Security Logo" />
                                <p className="secure-info">
                                    All your data are safe. We are using the
                                    most advanced security to provide you the
                                    best experience ever.
                                </p>
                            </section>
                        </div>
                    </form>
                </article>
                {/* Platzhalter */}
                {/* fetch from supabase  with theCar  */}
                <div className="rental_summary">
                    {/* <h2>Rental Summary</h2>
                    <p>Ich bin ein Platzhalter</p> */}
                    <RentalSummary />
                </div>
            </div>
            <BigButton onClick={() => {}}>Rent now!</BigButton>

            
        </section>
    );
};

export default PaymentPage;


// !  Location
// in LocationPicker die gewählte Stadt vorbelegen. 
// locationPicker on Payment Page no funktionality. just show chosen Location from DetailPage


// ! Rental summary
// * props für rental summary. 
// Navigation State liefert die car_id (theCar) und car_price (thePrice) soll in Rental Summary Componente weitergereicht werden
// if more then one day chosen - thePrice * amount of days - for Rental Summary Componente


// ! Handle big button
// * INSERT bookings Table
// car id, user_id, start date, end date, total price, 


// for later or Version 2.0
// * later INSERT into payment table
// take new created booking id from table bookings.
// bookings.id 
// 
