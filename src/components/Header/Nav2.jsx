import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Heading from "./Heading";

function Nav2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <Heading />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-4 bg-transparent p-4 flex justify-between items-center w-full border-neutral-700/80 shadow-md backdrop-blur-md">
        <div className="container px-4 mx-auto flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img className="h-10 w-10 cursor-pointer" src={logo} alt="logo" />
            <Link to="/home2" className="text-lg font-semibold">
              <span className="text-orange-500 font-bold text-xl">Extra Bite</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/home2" className="text-orange-500 font-semibold text-lg">
              Home
            </Link>
            <Link to="/my-order" className="text-white font-semibold text-lg hover:text-orange-400 transition">
              My Orders
            </Link>
            <Link to="/stats" className="text-white font-semibold text-lg hover:text-orange-400 transition">
              Stats
            </Link>
            <Link to="/profile">
              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 transition font-semibold"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-orange-500"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={32} />
          </button>

          <Link
            to="/home2"
            className="text-orange-500 font-semibold text-xl mb-4"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/my-order"
            className="text-white text-xl font-medium mb-4"
            onClick={() => setMenuOpen(false)}
          >
            My Orders
          </Link>

          <Link
            to="/stats"
            className="text-white text-xl font-medium mb-4"
            onClick={() => setMenuOpen(false)}
          >
            Stats
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="mb-4"
          >
            <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="text-white bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition mt-4 flex items-center"
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Nav2;
