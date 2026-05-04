import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import CustomerDashboard from "../../protectedPages/customer/profile/CustomerDashboard";
import MyBookings from "../../protectedPages/customer/booking/MyBookings";
import { logout } from "../../redux/reducers/authReducer";
import DropDownMenu from "./DropDownMenu";
import { MessageCircle } from 'lucide-react'

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role === "Provider" ? "Provider" : "Customer";
  const [isAuth] = useState(user ? role : null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [activeComponent, setActiveComponent] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const dropMenu = [
    { name: "Profile", component: "cutomerProfile" },
    { name: "Booking", component: "myBooking" },
    { name: "Logout" },
  ];

  const handleCloseModal = () => {
    setActiveComponent("");
    setDropDownMenu(false);
  };

  const logoutHandle = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] text-white transition-all duration-300">
      <div className="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-yellow-400">
            EasyFind<span className="text-aqua">.</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((nav) => (
            <Link
              key={nav.name}
              to={nav.path}
              className="text-sm font-medium hover:text-yellow-400 transition"
            >
              {nav.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Customer */}
          {isAuth === "Customer" && (
            <div className="relative">
              <button
                onClick={() => setDropDownMenu(!dropDownMenu)}
                className="hover:text-yellow-400 transition"
              >
                <HiOutlineUserCircle size={30} />
              </button>

              <DropDownMenu
                dropDownMenu={dropDownMenu}
                dropMenu={dropMenu}
                logoutHandle={logoutHandle}
                setActiveComponent={setActiveComponent}
                setDropDownMenu={setDropDownMenu}
              />
            </div>
          )}

          {/* Provider */}
          {isAuth === "Provider" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Dashboard
            </button>
          )}

          {/* Guest (No Auth) */}
          {!isAuth && (
            <button
              onClick={() => navigate("/login")}
              className="bg-violet-600 text-white px-6 py-2 rounded-full font-medium hover:bg-violet-500 transition"
            >
              Login
            </button>
          )}

          <button onClick={()=> navigate("/message")} className="flex items-center gap-1"> <span><MessageCircle/></span>Messages</button>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl md:hidden text-yellow-400"
          >
            {isOpen ? <IoMdClose /> : <MdOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`absolute left-0 w-full bg-black/95 backdrop-blur-md md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-6 text-center border-t border-white/10">
          {navLinks.map((nav) => (
            <Link
              key={nav.name}
              to={nav.path}
              onClick={() => setIsOpen(false)}
              className="text-lg text-white hover:text-yellow-400 transition"
            >
              {nav.name}
            </Link>
          ))}

          {/* Mobile Auth */}
          {isAuth === "Provider" && (
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsOpen(false);
              }}
              className="mt-2 bg-yellow-400 text-black py-2 rounded-full font-semibold"
            >
              Dashboard
            </button>
          )}

          {!isAuth && (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="mt-2 bg-violet-600 text-white py-2 rounded-full font-medium"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Overlay Components */}
      {activeComponent === "cutomerProfile" && (
        <CustomerDashboard onClose={handleCloseModal} />
      )}
      {activeComponent === "myBooking" && (
        <MyBookings onClose={handleCloseModal} />
      )}
    </header>
  );
}

export default Navbar;
