import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CartModal from "../pages/shop/CartModal"

import avatarImg from "../assets/avatar1.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
    const products = useSelector((state) => state.cart.products)
    const selectedItems = useSelector((state) => state.cart.selectedItems)

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    }
    const handleCartClose = () => {
        setIsCartOpen(false);
    }

    // show user icon if logged in
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate();

    // dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    // Close dropdown on Escape + lock body scroll when cart open
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setIsDropdownOpen(false);
                setIsCartOpen(false);
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isCartOpen]);

    // dropdown: admin
    const adminDropdown = [
        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Manage Products", path: "/dashboard/manage-products" },
        { label: "All Orders", path: "/dashboard/manage-orders" },
        { label: "Add New Post", path: "/dashboard/add-new-post" },
    ]

    // dropdown: user
    const userDropdown = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Profile", path: "/dashboard/profile" },
        { label: "Payments", path: "/dashboard/payments" },
        { label: "Orders", path: "/dashboard/orders" },
    ]

    const dropdownMenus = user?.role === 'admin' ? [...adminDropdown] : [...userDropdown];

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            setIsDropdownOpen(false);
            navigate('/')
        } catch (error) {
            console.error("something went wrong", error)
        }
    }


    return (
        <header className="sticky top-0 z-40 bg-white shadow-sm">
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-2xl p-2 -ml-2"
                    onClick={() => setIsMobileMenuOpen((v) => !v)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                </button>

                <ul className="nav__links">
                    <li className="link"><Link to="/">Home</Link></li>
                    <li className="link"><Link to="/shop">Shop</Link></li>
                    <li className="link"><Link to="/search">Search</Link></li>
                </ul>

                {/* Logo */}
                <div className="nav__logo">
                    <Link to="/">ShopGalore</Link>
                </div>

                {/* nav icons */}
                <div className="nav__icons">
                    <span><Link to="/search" aria-label="Search products"><i className="ri-search-eye-line"></i></Link></span>
                    <span>
                        <button onClick={handleCartToggle} className="hover:text-primary relative" aria-label={`Open cart, ${selectedItems} items`}>
                            <i className="ri-shopping-bag-4-line"></i>
                            <sup className="text-xs inline-block px-1.5 text-white rounded-full text-center bg-slate-600">{selectedItems}</sup>
                        </button>
                    </span>
                    <span className="relative">
                        {
                            user ? (<>
                                <img onClick={handleDropdown} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDropdown(); } }} tabIndex={0} src={user?.profileImg || avatarImg}
                                    alt={`${user?.username || 'User'} profile`} className="size-6 rounded-full border cursor-pointer object-cover"></img>

                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-3 p-4 w-52 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                            <ul className="font-medium space-y-4 p-2">
                                                {
                                                    dropdownMenus.map((menu, index) => (
                                                        <li key={index}>
                                                            <Link onClick={() => setIsDropdownOpen(false)} className="dropdown-items" to={menu.path}>{menu.label}</Link>
                                                        </li>
                                                    ))
                                                }
                                                <li><button onClick={handleLogout} className="dropdown-items w-full text-left">Logout</button></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </>) : (
                                <Link to="/login" aria-label="Login">
                                    <i className="ri-user-3-line"></i>
                                </Link>
                            )
                        }
                    </span>
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <ul className="md:hidden px-6 pb-4 space-y-3 bg-white border-t">
                    <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1">Home</Link></li>
                    <li><Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-1">Shop</Link></li>
                    <li><Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="block py-1">Search</Link></li>
                </ul>
            )}

            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onCartClose={handleCartClose}></CartModal>
            }
        </header>
    )
}

export default Navbar
