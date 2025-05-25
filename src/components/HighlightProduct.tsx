import "../styles/highlight_product.css";
import BigButton from "./BigButton";
import ferrariImg from "../assets/img/ferrari.png";
import lamborghiniImg from "../assets/img/lambo.png";

const HighlightProduct = () => {
    return (
        <section className="highlight_product">

            <article className="lamborghini card">
                <div>
                    <h2>
                        Møre Horstpower
                        <br />
                        møre Fun!
                    </h2>
                    <p>
                        Click the Lambo. It’s loud, fast, and shockingly
                        affordable. Big engine, bold look, low price. <br />
                        <span>Drive fast. Pay less.</span>
                    </p>
                    <BigButton to="/bef479b9-2d2b-4a29-822f-3036b8cf3828">
                        Rental Lamborghini
                    </BigButton>
                </div>
                <img src={lamborghiniImg} alt="Lamborghini" />
            </article>
            
            <article className="ferrari card">
                <div>
                    <h2>
                        Loud. Fast. <br />
                        Legendary.
                    </h2>
                    <p>
                        It’s not just a car - it’s a Ferrari. Feel the power,
                        hear the roar, live the dream. <br />
                        <span>Drive the legend. For less.</span>
                    </p>
                    <BigButton to="/16d32f41-715b-4738-b306-8ebb138c8bc0">
                        Rental Ferrari
                    </BigButton>
                </div>
                <img src={ferrariImg} alt="Ferrari" />
            </article>
        </section>
    );
};

export default HighlightProduct;
