import { Link } from "react-router";
import "../styles/Footer.css";
import morentLogo from "../assets/img/Morent_Logo.png";

const Footer = () => {
    return (
        <section className="footer">
            <article className="links">
                <div>
                    <a href="#start">
                        <img src={morentLogo} alt="Mørent Logo" />
                    </a>
                    <p>
                        Our vision is to provide convenience and help increase
                        your sales business.
                    </p>
                </div>
                <div>
                    <h4>About</h4>
                    <p><Link to="/team">How it works</Link></p>
                    <p>Featured</p>
                    <p>Partnership</p>
                    <p>Business Relation</p>
                </div>
                <div>
                    <h4>Community</h4>
                    <p>Events</p>
                    <p>Blog</p>
                    <p>Podcast</p>
                    <p>Invite a friend</p>
                </div>
                <div className="social">
                    <h4>Socials</h4>
                    <Link
                        to="https://github.com/OguzGeylaniYilmaz"
                        target="_blank"
                    >
                        Oguz
                    </Link>
                    <Link to="https://github.com/MonaEis" target="_blank">
                        Mona
                    </Link>
                    <Link
                        to="https://github.com/codeshipofmina"
                        target="_blank"
                    >
                        Mina
                    </Link>
                    <Link to="https://github.com/ninaraffaela" target="_blank">
                        Nina
                    </Link>
                </div>
            </article>
            <div className="line"></div>
            <article className="copyright">
                <p>© 2025 Mørent. All rights reserved.</p>
                <div className="policy">
                    <p>Privacy & Policy</p>
                    <p>Terms & Condition</p>
                </div>
            </article>
        </section>
    );
};

export default Footer;
