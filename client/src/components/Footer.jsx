import { useState } from "react";
import { Link } from "react-router-dom";

const socials = [
    { label: "Facebook", href: "https://facebook.com", icon: "ri-facebook-fill" },
    { label: "Instagram", href: "https://instagram.com", icon: "ri-instagram-line" },
    { label: "X (Twitter)", href: "https://x.com", icon: "ri-twitter-x-line" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "ri-linkedin-fill" },
    { label: "YouTube", href: "https://youtube.com", icon: "ri-youtube-fill" },
];

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        setError("");
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }
        setSubscribed(true);
    };

    return (
        <>
            <footer className="footer__wrapper">
                <div className="section__container footer__container">
                    {/* Brand + socials */}
                    <div className="footer__col footer__brand">
                        <h4 className="footer__logo">ShopGalore</h4>
                        <p className="footer__tagline">
                            Quality toys, fashion and everyday essentials —
                            curated for you, delivered to your door.
                        </p>
                        <div className="footer__socials">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Follow us on ${s.label}`}
                                    className="footer__social-btn"
                                >
                                    <i className={s.icon} aria-hidden="true"></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4>GET IN TOUCH</h4>
                        <a href="https://maps.google.com/?q=221B+Baker+Street+London" target="_blank" rel="noreferrer" className="footer__contact">
                            <span aria-hidden="true"><i className="ri-map-pin-line"></i></span>
                            221B Baker Street, London
                        </a>
                        <a href="mailto:support@shopgalore.com" className="footer__contact">
                            <span aria-hidden="true"><i className="ri-mail-line"></i></span>
                            support@shopgalore.com
                        </a>
                        <a href="tel:+880123456789" className="footer__contact">
                            <span aria-hidden="true"><i className="ri-phone-line"></i></span>
                            +880 123 456 789
                        </a>
                        <p className="footer__hours">
                            <span aria-hidden="true"><i className="ri-time-line"></i></span>
                            Mon – Sat, 9:00 – 18:00
                        </p>
                    </div>

                    {/* Shop links */}
                    <nav className="footer__col" aria-label="Shop">
                        <h4>SHOP</h4>
                        <Link to="/">Home</Link>
                        <Link to="/shop">All Products</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/categories/toys">Toys</Link>
                        <Link to="/categories/dress">Fashion</Link>
                    </nav>

                    {/* Newsletter */}
                    <div className="footer__col">
                        <h4>STAY IN THE LOOP</h4>
                        <p className="footer__tagline">New arrivals and exclusive deals, once a week. No spam.</p>
                        {subscribed ? (
                            <p role="status" className="footer__success">
                                <i className="ri-checkbox-circle-fill" aria-hidden="true"></i>
                                You&apos;re on the list. Welcome aboard!
                            </p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="footer__newsletter" noValidate>
                                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="footer__input"
                                />
                                <button type="submit" className="btn footer__btn">
                                    Subscribe
                                </button>
                                {error && <span role="alert" className="footer__error">{error}</span>}
                            </form>
                        )}
                    </div>
                </div>

                <div className="footer__bar">
                    <span>© {new Date().getFullYear()} ShopGalore · All rights reserved</span>
                    <span className="footer__bar-links">
                        <Link to="/shop">Privacy</Link>
                        <span aria-hidden="true">·</span>
                        <Link to="/shop">Terms</Link>
                        <span aria-hidden="true">·</span>
                        <Link to="/search">Help</Link>
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer
