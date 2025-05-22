import { useAuthContext } from "../contexts/auth-context";
import { Link } from "react-router";
import "../styles/header.css";
import ProfilImg from "../assets/img/profil.svg";
import FavouritesImg from "../assets/img/heart.svg";
import BookingsImg from "../assets/img/save.svg";
import SignoutImg from "../assets/img/signout.png";

export default function Header() {
  const { signOut, session } = useAuthContext();

  return (
    <>
      <header className="header">
        <Link to="/">
          <span className="logo">🚗MØRENT</span>
        </Link>

        <section className="header-icons">
          {!session && (
            <Link to="/login">
              <img src={ProfilImg} alt="Login" />
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
              <Link to={"/:id_user/profile"}>
                <img src={ProfilImg} alt="profile" />
              </Link>
              <button onClick={signOut}>
                <img src={SignoutImg} alt="Sign out" />
              </button>
            </section>
          )}
        </section>
      </header>

    </>
  );
}
