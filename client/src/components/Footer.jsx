import { Link } from "react-router-dom";
import instaImg1 from "../assets/insta-1.jpg"
import instaImg2 from "../assets/insta-2.jpg"
import instaImg3 from "../assets/insta-3.jpg"
import instaImg4 from "../assets/insta-4.jpg"
import instaImg5 from "../assets/insta-5.jpg"
import instaImg6 from "../assets/insta-6.jpg"

const instaImages = [
    { src: instaImg1, alt: "Customer Instagram post 1" },
    { src: instaImg2, alt: "Customer Instagram post 2" },
    { src: instaImg3, alt: "Customer Instagram post 3" },
    { src: instaImg4, alt: "Customer Instagram post 4" },
    { src: instaImg5, alt: "Customer Instagram post 5" },
    { src: instaImg6, alt: "Customer Instagram post 6" },
];

const Footer = () => {
    return (
        <>
            <footer className="section__container footer__container">
                <div className="footer__col">
                    <h4>CONTACT INFO</h4>
                    <p>
                        <span><i className="ri-map-pin-line"></i></span>
                        221B Baker Street, London
                    </p>
                    <p>
                        <span><i className="ri-mail-unread-line"></i></span>
                        support@example.com
                    </p>
                    <p>
                        <span><i className="ri-phone-line"></i></span>
                        +88 01234567
                    </p>
                </div>

                <nav className="footer__col" aria-label="Content">
                    <h4>CONTENT</h4>
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/shop">Trending</Link>
                    <Link to="/">Terms &amp; Conditions</Link>
                </nav>

                <nav className="footer__col" aria-label="Useful links">
                    <h4>USEFUL LINKS</h4>
                    <Link to="/search">Help</Link>
                    <Link to="/shop">Track Your Order</Link>
                    <Link to="/shop">Categories</Link>
                    <Link to="/shop">All Products</Link>
                </nav>

                <div className="footer__col">
                    <h4>GALLERY</h4>
                    <div className="instagram__grid">
                        {instaImages.map((img, i) => (
                            <img key={i} src={img.src} alt={img.alt} loading="lazy" width={200} height={200} />
                        ))}
                    </div>
                </div>
            </footer>

            <div className="footer__bar">
                <span>Copyright @ Rakib | All rights reserved</span>
            </div>
        </>
    )
}

export default Footer
