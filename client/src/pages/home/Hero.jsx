import { Link } from "react-router-dom";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import card4 from "../../assets/card4.png";
import card5 from "../../assets/card5.png";
import card6 from "../../assets/card6.png";

const cards = [
  { id: 1, image: card1, trend: "2025 trendy", title: "Orion" },
  { id: 2, image: card2, trend: "2025 trendy", title: "Helix" },
  { id: 3, image: card3, trend: "2025 trendy", title: "Tarantula" },
  { id: 4, image: card4, trend: "2025 trendy", title: "Milky Way" },
  { id: 5, image: card5, trend: "2025 trendy", title: "Triangulum" },
  { id: 6, image: card6, trend: "2025 trendy", title: "Butterfly" },
];

const Hero = () => {
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div key={card.id} className="hero__card">
          <img src={card.image} alt={`${card.title} promo`} loading="lazy" />
          <div className="hero__content">
            <p>{card.trend}</p>
            <h4>{card.title}</h4>
            <Link to="/shop">Discover More</Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
