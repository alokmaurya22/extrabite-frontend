import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import Heading from "./Heading";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Heading />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-4 bg-transparent p-6 flex justify-between items-center w-full border-neutral-700/80 shadow-md backdrop-blur-md">
        <div className="container px-4 mx-auto relative">
          <div className="flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="">
                <img className="h-10 w-10 mr-2 cursor-pointer" src={logo} alt="logo" />
              </div>
              <Link to="/" className="text-lg font-semibold">
                <span className="text-orange-500 font-bold text-2xl">Extra Bite</span>
              </Link>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <button className="bg-[#FFFFFF] text-orange-500 px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-gray-200 active:bg-gray-300">
                <Link to="/Signin" className="text-lg font-semibold">Sign In</Link>
              </button>
              <button className="bg-[#FF7401] text-white px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-orange-600 active:bg-orange-700">
                <Link to="/Signup" className="text-lg font-semibold">Sign Up</Link>
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-gray-700 active:bg-gray-900">
                <Link to="/stats" className="text-lg font-semibold">Stats</Link>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex flex-col justify-center items-center z-50">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
            <X size={32} />
          </button>

          {/* Mobile Menu Buttons */}
          <button className="bg-[#FFFFFF] text-orange-500 px-3 py-2 rounded-md font-semibold text-lg mb-4 w-1/2 transition duration-300 hover:bg-gray-200 active:bg-gray-300">
            <Link to="/Signin" className="text-lg font-semibold">Sign In</Link>
          </button>
          <button className="bg-[#FF7401] text-white px-3 py-2 rounded-md font-semibold text-lg mb-4 w-1/2 transition duration-300 hover:bg-orange-600 active:bg-orange-700">
            <Link to="/Signup" className="text-lg font-semibold">Sign Up</Link>
          </button>
          <button className="bg-gray-800 text-white px-3 py-2 rounded-md font-semibold text-lg w-1/2 transition duration-300 hover:bg-gray-700 active:bg-gray-900">
            <Link to="/stats" className="text-lg font-semibold">Stats</Link>
          </button>
        </div>
      )}
    </>
  );
}

export default Nav;
