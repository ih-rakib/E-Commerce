import instaImg1 from "../assets/insta-1.jpg";
import instaImg2 from "../assets/insta-2.jpg";
import instaImg3 from "../assets/insta-3.jpg";
import instaImg4 from "../assets/insta-4.jpg";
import instaImg5 from "../assets/insta-5.jpg";
import instaImg6 from "../assets/insta-6.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            221B Baker Street, London
          </p>
          <p>
            <span>
              <i className="ri-mail-unread-line"></i>
            </span>
            support@example.com
          </p>
          <p>
            <span>
              <i className="ri-phone-line"></i>
            </span>
            +88 01234567
          </p>
        </div>

        <div className="footer__col">
          <h4>CONTENT</h4>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Work With Us</a>
          <a href="/">Explore Blogs</a>
          <a href="/">Terms & Conditions</a>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <a href="/">Help</a>
          <a href="/">Track Your Order</a>
          <a href="/">Categories</a>
          <a href="/">Artificial</a>
        </div>

        <div className="footer__col">
          <h4>PREVIEW</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="social image 1" />
            <img src={instaImg2} alt="social image 2" />
            <img src={instaImg3} alt="social image 3" />
            <img src={instaImg4} alt="social image 4" />
            <img src={instaImg5} alt="social image 5" />
            <img src={instaImg6} alt="social image 6" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        <span>Copyright @ Ikramul Hasan Rakib | All rights reserved</span>
      </div>
    </>
  );
};

export default Footer;
