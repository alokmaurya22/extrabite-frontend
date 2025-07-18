import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { FiHome, FiLogIn, FiUserPlus, FiBarChart2, FiInfo } from "react-icons/fi";
import { Menu } from "lucide-react";
import logo from '../../assets/logo.png';
import Heading from "./Heading";

const NavLinks = [
  { name: "Home", path: "/home", icon: FiHome },
  { name: "Sign In", path: "/Signin", icon: FiLogIn },
  { name: "Sign Up", path: "/Signup", icon: FiUserPlus },
  { name: "Statistics", path: "/stats", icon: FiBarChart2 },
  { name: "About Us", path: "/about", icon: FiInfo },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <Heading />
      <nav className="sticky top-0 z-50 py-4 bg-[#051538] p-6 flex justify-between items-center w-full border-neutral-700/80 shadow-md backdrop-blur-md">
        <div className="container px-4 mx-auto relative flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img className="h-10 w-10 mr-2 cursor-pointer" src={logo} alt="logo" />
            <span className="text-orange-500 font-bold text-2xl">Extra Bite</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-10 font-semibold text-lg">
            {NavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`
                      flex items-center gap-2 transition-colors duration-200
                      ${isActive ? "text-orange-500" : "text-white"}
                    `}
                  >
                    {/* Animated Icon */}
                    <span
                      className={`
                        text-orange-500 text-xl
                        transition-transform duration-300
                        group-hover:animate-bounce
                        ${isActive ? "animate-bounce" : ""}
                      `}
                    >
                      <Icon />
                    </span>
                    {link.name}
                    {/* Animated underline */}
                    <span className={`
                      absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 group-hover:w-full
                      transition-all duration-300 ease-in
                      ${isActive ? "w-full" : ""}
                    `}></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-orange-500"
            onClick={toggleMobileMenu}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0a1122]/80 backdrop-blur-[6px] flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeMobileMenu}
          >
            <RxCross2 size={36} />
          </button>
          <ul className="w-full max-w-60 space-y-4">
            {NavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name} className="flex justify-center">
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`
                w-full flex items-center gap-3 px-4 py-2 rounded-xl
                font-semibold text-base
                bg-white/5 hover:bg-orange-500/10
                border border-orange-500
                shadow-md transition-all duration-200
                ${isActive ? "ring-2 ring-orange-500 bg-orange-500/10 text-orange-400" : ""}
                text-white hover:scale-105 active:scale-100
                backdrop-blur-[2px]
              `}
                  >
                    <span
                      className={`
                  text-orange-500 text-xl
                  transition-transform duration-300
                  group-hover:animate-bounce
                  ${isActive ? "animate-bounce" : ""}
                `}
                    >
                      <Icon />
                    </span>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}