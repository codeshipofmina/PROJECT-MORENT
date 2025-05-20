import { useAuthContext } from "../contexts/auth-context";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import CarCards from "./CarCards";
import "../styles/header.css";
import ProfilImg from "../assets/img/profil.svg";
import FavouritesImg from "../assets/img/heart.svg";
import BookingsImg from "../assets/img/save.svg";

export default function Header() {
  const { signOut, session } = useAuthContext();
  const [searchText, setSearchText] = useState("");

  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const carRequest = supabase
        .from("cars")
        .select("*, categories(*), profiles(*)");

      if (searchText.length >= 2) {
        carRequest.ilike("brand", `%${searchText}%`);
      }

      const result = await carRequest;

      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
    queryKey: ["cars", "homepage", { searchText: searchText }],
  });

  return (
    <>
      <header className="header-web">
        <Link to="/">
          <span className="logo">🚗MØRENT</span>
        </Link>
        <input
          className="searchbar"
          value={searchText}
          placeholder="Welche Automarke möchtest du fahren?"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        {isPending && "Is loading..."}
        {isError && "Leider kaputt."}
        {data && (
          <section className="car-selection">
            {/* {data.map((car) => (
          <CarCards 
            key={car.id}
            brand={car.brand}
            model={car.model}
            type={car.vehicle_type_id}
            id={car.id}
            fuel={car.fuel}
            imagePath={car.carimg}
            geartype={car.geartype}
            seats={car.seats}
            price={car.priceperday}
          />
        ))} */}
          </section>
        )}

        <section className="header-icons">
          {!session && (
            <Link to="/login">
              <img src={ProfilImg} alt="Login / Signup" />
            </Link>
          )}
          {session && (
            <section>
              <Link to={"/:id_user/favorites"}>
                <img src={FavouritesImg} alt="Favoriten" />
              </Link>
              <Link to={"/:id_user/bookings"}>
                <img src={BookingsImg} alt="Bookings" />
              </Link>
              <button onClick={signOut}>
                <img src={ProfilImg} alt="Sign out" />
              </button>
            </section>
          )}
        </section>
      </header>

      <header className="header-mobile">
        <Link to="/">
          <span className="logo">MøRENT</span>
        </Link>

        <section>
          {!session && <Link to="/login">Login / Signup</Link>}
          {session && (
            <section>
              <Link to={"/:id_user/favorites"}>Favoriten</Link>
              <Link to={"/:id_user/bookings"}>Bookings</Link>
              {/* der signout button müsste eigentlich im aufklappmenü hinter dem profilbild stecken */}
              <button onClick={signOut}>Sign out</button>
            </section>
          )}
        </section>

        <input
          className="searchbar"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </header>
    </>
  );
}
