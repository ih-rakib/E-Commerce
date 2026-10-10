import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/shop/CartModal";

import avatarImg from "../assets/avatar1.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // show user icon if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // dropdown: admin
  const adminDropdown = [
    { label: "Shop", path: "/shop" },
    { label: "Connect", path: "/contact" },
    {
      label: "Projects",
      path: "https://github.com/ih-rakib/Profile/blob/master/Projects/Readme.md",
    },
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Products", path: "/dashboard/manage-products" },
    { label: "Manage Orders", path: "/dashboard/manage-orders" },
    { label: "Manage Users", path: "/dashboard/users" },
    { label: "Add New Product", path: "/dashboard/add-new-product" },
  ];

  // dropdown: user
  const userDropdown = [
    { label: "Shop", path: "/shop" },
    { label: "Connect", path: "/contact" },
    {
      label: "Projects",
      path: "https://github.com/ih-rakib/Profile/blob/master/Projects/Readme.md",
    },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdown] : [...userDropdown];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  return (
    <header className="w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            {/* <Link to="/pages">Pages</Link> */}

            <a
              href="https://github.com/ih-rakib/Profile/blob/master/Projects/Readme.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pages
            </a>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">Galore</Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons">
          <span>
            <Link to="/search">
              <i className="ri-search-eye-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-bag-4-line"></i>
              <sup className="text-xs inline-block px-1.5 text-white rounded-full text-center bg-slate-600">
                {products.length}
              </sup>
            </button>
          </span>
          <span className="relative">
            {user ? (
              <>
                <img
                  onClick={handleDropdown}
                  src={user?.profileImg || avatarImg}
                  alt={user?.username}
                  className="size-6 rounded-full border cursor-pointer"
                ></img>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-52 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-3-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onCartClose={handleCartToggle}
        ></CartModal>
      )}
    </header>
  );
};

export default Navbar;
