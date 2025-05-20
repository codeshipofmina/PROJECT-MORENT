import "../styles/filter_button.css";
import filterImg from "../assets/img/filter.png";

const FilterButton = () => {
    return (
        <section className="filter_button_container">
            <article className="filter_button">
                <img src={filterImg} alt="Filter Icon" />
                <p className="filter_button_text">Filter</p>
            </article>
        </section>
    );
};

export default FilterButton;
