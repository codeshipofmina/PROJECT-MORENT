import { Link } from "react-router-dom";
import backImg from "../assets/img/back.png";
import visaImg from "../assets/img/Visa.png";
import paypalImg from "../assets/img/PayPal.png";
import bitcoinImg from "../assets/img/Bitcoin.png";
import safetyImg from "../assets/img/ic-security-safety.png";
import "../styles/payment_page.css";
import BigButton from "../components/BigButton";
import RentalSummary from "../components/RentalSummary";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PaymentPage = () => {
  const navigationState: {
    car_id?: string;
    car_price?: number;
    location_id?: string;
  } = useLocation().state ?? {};

  const theCar = navigationState.car_id;
  const theLocation = navigationState.location_id;
  const thePrice = navigationState.car_price;
  console.log(theCar);
  console.log(theLocation);
  console.log(thePrice);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [carDetails, setCarDetails] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [locations, setLocations] = useState<{ id: string; city: string }[]>(
    []
  );
  // const [reviewInfo, setReviewInfo] = useState<{
  //   count: number;
  //   average: number;
  // }>({ count: 0, average: 0 });

  const { car_id, car_price } = navigationState;

  useEffect(() => {
    const fetchCar = async () => {
      if (!car_id) return;
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", car_id)
        .single();
      if (data) setCarDetails(data);
      if (error) {
        console.error("Car could not be taken:", error.message);
      }
    };

    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        console.log("User ID:", user.id);

        // Pulling user data from the "users" table
        const { data: userData, error: userDataError } = await supabase
          .from("users")
          .select("full_name, phone, adress, city")
          .eq("id", user.id)
          .single();

        if (userData) {
          setName(userData.full_name || "");
          setPhone(userData.phone || "");
          setAddress(userData.adress || "");
          setCity(userData.city || "");
        } else {
          console.error(
            "Failed to retrieve user data:",
            userDataError?.message
          );
        }
      } else {
        console.error("Failed to get user session:", error?.message);
      }
    };

    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) {
        console.error("Cities could not be taken:", error.message);
      } else {
        setLocations(data);
      }
    };

    // const fetchReviews = async () => {
    //   if (!car_id) return;
    //   const { data, error } = await supabase
    //     .from("reviews")
    //     .select("rating")
    //     .eq("car_id", car_id);
    //   if (!error && data) {
    //     const count = data.length;
    //     const average =
    //       count > 0 ? data.reduce((acc, r) => acc + r.rating, 0) / count : 0;
    //     setReviewInfo({ count, average });
    //   }
    // };

    // fetchReviews();
    fetchLocations();
    fetchCar();
    fetchUser();
  }, [car_id]);

  const calculateTotalPrice = (): number => {
    try {
      if (!startDate || !startTime || !endDate || !endTime || !car_price)
        return 0;

      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

      const diffInMs = end.getTime() - start.getTime();

      if (diffInMs <= 0) return 0;

      const diffInMinutes = diffInMs / (1000 * 60);
      const pricePerMinute = car_price / (24 * 60);

      return Math.ceil(diffInMinutes * pricePerMinute);
    } catch (error) {
      console.error("Fee calculation error:", error);
      return 0;
    }
  };

  const handleSubmit = async () => {
    if (!car_id || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!userId) {
      alert("Please sign in.");
      return;
    }

    const { error: userUpsertError } = await supabase.from("users").upsert({
      id: userId,
      full_name: name,
      phone: phone,
      adress: address,
      city: city,
    });

    if (userUpsertError) {
      console.error("User info insert/update error:", userUpsertError.message);
      alert("User information could not be saved.");
      return;
    }

    const totalPrice = calculateTotalPrice();

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        car_id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        user_id: userId,
        status: "pending",
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking insert error:", bookingError.message);
      alert("An error occurred during the reservation.");
      return;
    }

    console.log("Booking ID:", booking.id);

    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: booking.id,
      payment_date: new Date().toISOString(),
      payment_method: paymentMethod,
      payment_status: "paid",
    });

    if (paymentError) {
      console.error("Payment insert error:", paymentError.message);
      alert("Payment information could not be saved.");
      return;
    }

    alert("Booking and payment successful!");
  };
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
                  <input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    placeholder="Town / City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
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
                      <select name="cities" id="cities">
                        <option disabled selected>
                          Location wählen
                        </option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.city}
                          </option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="drop_off">
                    <h3>Drop – Off</h3>
                    <div className="drop_off_input">
                      <select name="cities" id="cities">
                        <option disabled selected>
                          Location wählen
                        </option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.city}
                          </option>
                        ))}
                      </select>

                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
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
                {["Credit Card", "PayPal", "Bitcoin"].map((method) => (
                  <div className="payment_stripe" key={method}>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      {method}
                    </label>
                    <img
                      src={
                        method === "Credit Card"
                          ? visaImg
                          : method === "PayPal"
                          ? paypalImg
                          : bitcoinImg
                      }
                      alt={`${method} logo`}
                    />
                  </div>
                ))}
              </section>
            </div>

            <div className="container">
              {/* Confirmation */}
              <section>
                <h2>Confirmation</h2>
                <p>
                  We are getting to the end. Just a few clicks and your rental
                  is ready!
                </p>
                <div className="agreement">
                  <div className="agreement_stripe">
                    <label>
                      <input type="checkbox" /> I agree with sending marketing
                      and newsletter emails. No spam, promised!
                    </label>
                  </div>

                  <div className="agreement_stripe">
                    <label>
                      <input type="checkbox" /> I agree with our terms and
                      conditions and privacy policy.
                    </label>
                  </div>
                </div>
                <img src={safetyImg} alt="Security Logo" />
                <p className="secure-info">
                  All your data are safe. We are using the most advanced
                  security to provide you the best experience ever.
                </p>
              </section>
            </div>
          </form>
        </article>

        <div className="rental_summary">
          <RentalSummary car={carDetails} total={calculateTotalPrice() ?? 0} />
        </div>
      </div>
      <BigButton onClick={handleSubmit}>Rent now!</BigButton>
    </section>
  );
};

export default PaymentPage;
