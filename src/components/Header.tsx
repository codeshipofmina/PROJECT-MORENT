import { useAuthContext } from "../contexts/auth-context";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "./VehicleCard";
import "../styles/header.css";
import ProfilImg from "../assets/img/profil.svg";
import FavouritesImg from "../assets/img/heart.svg";
import BookingsImg from "../assets/img/save.svg";

export default function Header() {
  const { signOut, session } = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // To get avatar_url
  useEffect(() => {
    const fetchAvatar = async () => {
      if (session?.user?.id) {
        const { data } = await supabase
          .from("users")
          .select("avatar_url")
          .eq("id", session.user.id)
          .single();
        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      }
    };
    fetchAvatar();
  }, [session]);

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
            {data.map((car) => (
              <VehicleCard
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
            ))}
          </section>
        )}

        <section className="header-icons">
          {!session ? (
            <Link to="/login">
              <img src={ProfilImg} alt="Login / Signup" />
            </Link>
          ) : (
            <div className="profile-wrapper">
              <Link
                to={"/:id_user/favorites"}
                onClick={() => setMenuOpen(false)}
              >
                <img src={FavouritesImg} alt="Favourites" />
              </Link>
              <Link
                to={"/:id_user/bookings"}
                onClick={() => setMenuOpen(false)}
              >
                <img src={BookingsImg} alt="Bookings" />
              </Link>
              <img
                src={avatarUrl || ProfilImg}
                alt="Profil"
                className="profile-avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/user/profile" onClick={() => setMenuOpen(false)}>
                    Mein Profil
                  </Link>

                  <button onClick={signOut}>Sign out</button>
                </div>
              )}
            </div>
          )}
        </section>
      </header>

      <header className="header-mobile">
        <Link to="/">
          <span className="logo">MøRENT</span>
        </Link>

        <section>
          {!session ? (
            <Link to="/login">Login / Signup</Link>
          ) : (
            <div className="profile-wrapper">
              <img
                src={avatarUrl || ProfilImg}
                alt="Profil"
                className="profile-avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link
                    to={`/user/${session.user.id}/bookings`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Bookings
                  </Link>
                  <Link
                    to={`/user/${session.user.id}/favorites`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Favourites
                  </Link>
                  <Link to="/user/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={signOut}>Sign out</button>
                </div>
              )}
            </div>
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
