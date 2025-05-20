import "../styles/highlight_product.css"
import BigButton from "./BigButton"
import ferrariImg from "../assets/img/ferrari.png"
import lamborghiniImg from "../assets/img/lambo.png"

const HighlightProduct = () => {
  return (
    <section className="highlight_product">
      <article className="ferrari card">
        <div>
          <h2>The Best Platform<br />for Car Rental</h2>
          <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
          <BigButton to="/16d32f41-715b-4738-b306-8ebb138c8bc0">Rental Ferrari</BigButton>
        </div>
        <img src={ferrariImg} alt="Ferrari" />
      </article>
      
      <article className="lamborghini card">
        <div>
          <h2>The Best Platform<br />for Car Rental</h2>
          <p>Providing cheap car rental services and safe and comfortable facilities.</p>
          <BigButton to="/bef479b9-2d2b-4a29-822f-3036b8cf3828">Rantal Lamborghini</BigButton>
        </div>
        <img src={lamborghiniImg} alt="Lamborghini" />
      </article>
      
    </section>
  )
}

export default HighlightProduct
