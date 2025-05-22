import { useAuthContext } from "../contexts/auth-context";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import "../styles/header.css";
import ProfilImg from "../assets/img/profil.svg";
import FavouritesImg from "../assets/img/heart.svg";
import BookingsImg from "../assets/img/save.svg";
import SignoutImg from "../assets/img/signout.png";

export default function Header() {
  const { signOut, session } = useAuthContext();
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


  return (
    <>
      <header className="header">
        <Link to="/">
          <span className="logo">🚗MØRENT</span>
        </Link>

        <section className="header-icons">
          {!session ? (
            <Link to="/login">
              <img src={ProfilImg} alt="Login" />
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
    </>
  );
}
