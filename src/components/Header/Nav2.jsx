import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Home, BarChart2, ShoppingBag } from "lucide-react";
import logo from "../../assets/logo.png";
import Heading from "./Heading";

const NavLinks = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Statistics", path: "/stats", icon: BarChart2 },
  { name: "My Contributions", path: "/my-order", icon: ShoppingBag },
  { name: "Profile", path: "/profile", icon: User, isProfile: true },
  { name: "Logout", path: "/logout", icon: LogOut, isLogout: true },
];

function Nav2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  // For desktop/mobile, handle logout click
  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.isLogout) {
      handleLogout();
    }
  };

  return (
    <>
      <Heading />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-4 bg-[#051434] p-6 flex justify-between items-center w-full border-neutral-900/50 shadow-md backdrop-blur-md">
        <div className="container px-4 mx-auto flex justify-between items-center">
          {/* Logo and Title */}
          <Link to="/home2" className="flex items-center space-x-2">
            <img className="h-10 w-10 cursor-pointer" src={logo} alt="logo" />
            <span className="text-orange-500 font-bold text-2xl">Extra Bite</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-10 font-semibold text-lg">
            {NavLinks.map((link) => {
              const Icon = link.icon;
              // For logout, always inactive (no orange highlight)
              const isActive = !link.isLogout && location.pathname === link.path;
              return (
                <li key={link.name} className="relative group">
                  {link.isLogout ? (
                    <button
                      onClick={handleLogout}
                      className={`
                        flex items-center gap-2 transition-colors duration-200
                        text-white hover:text-orange-500
                        focus:outline-none
                      `}
                    >
                      <span
                        className={`
                          text-orange-500 text-xl
                          transition-transform duration-300
                          group-hover:animate-bounce
                        `}
                      >
                        <Icon size={22} />
                      </span>
                      {link.name}
                      {/* Underline on hover */}
                      <span className={`
                        absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 group-hover:w-full
                        transition-all duration-300 ease-in
                      `}></span>
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`
                        flex items-center gap-2 transition-colors duration-200
                        ${isActive ? "text-orange-500" : "text-white"}
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
                        <Icon size={22} />
                      </span>
                      {link.name}
                      {/* Animated underline */}
                      <span className={`
                        absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 group-hover:w-full
                        transition-all duration-300 ease-in
                        ${isActive ? "w-full" : ""}
                      `}></span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

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
        <div className="fixed inset-0 bg-[#0a1122]/80 backdrop-blur-[6px] flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={36} />
          </button>
          <ul className="w-full max-w-60 space-y-4">
            {NavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = !link.isLogout && location.pathname === link.path;
              return (
                <li key={link.name} className="flex justify-center">
                  {link.isLogout ? (
                    <button
                      onClick={() => handleNavClick(link)}
                      className={`
                  w-full flex items-center gap-3 px-6 py-2 rounded-xl
                  font-semibold text-base
                  bg-white/5 hover:bg-orange-500/10
                  border border-orange-500
                  shadow-md transition-all duration-200
                  ${isActive ? "ring-2 ring-orange-500 bg-orange-500/10" : ""}
                  text-white hover:scale-105 active:scale-100
                  backdrop-blur-[2px]
                `}
                    >
                      <span
                        className={`
                    text-orange-500 text-xl
                    transition-transform duration-300
                    group-hover:animate-bounce
                  `}
                      >
                        <Icon size={22} />
                      </span>
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => handleNavClick(link)}
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
                        <Icon size={22} />
                      </span>
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Nav2;