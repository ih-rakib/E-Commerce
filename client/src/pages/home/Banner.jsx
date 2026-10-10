import { Link } from "react-router-dom";
import bannerImg from "../../assets/header1.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-10">
        <h4 className="uppercase">Up to 27% Discount on</h4>
        <h1>Galore</h1>
        <p>
          Discover fantastic deals on your favorite toys and games. Whether
          you're shopping for action figures, educational toys, or plush
          favorites, we have something for every child. Shop now to make
          playtime even more exciting with our great discounts!
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner image" className="" />
      </div>
    </div>
  );
};

export default Banner;
