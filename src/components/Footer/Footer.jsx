import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';

function Footer() {
  return (
    <footer className="bg-[#E87730] text-white px-4 py-3 md:px-10 md:py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
        {/* Logo and Brand */}
        <div className="flex items-center mb-2 md:mb-0">
          <img className="h-8 w-8 mr-2" src={logo} alt="logo" />
          <span className="font-bold text-lg md:text-2xl tracking-wide">Extra Bite</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm md:text-lg">
          <Link
            to="/about"
            className="hover:text-black hover:underline underline-offset-4 transition font-semibold"
          >
            About Us
          </Link>
          <Link
            to="/our-team"
            className="hover:text-black hover:underline underline-offset-4 transition font-semibold"
          >
            Developers
          </Link>
          <Link
            to="/ContactHelpForm"
            className="hover:text-black hover:underline underline-offset-4 transition font-semibold"
          >
            Contact & Help
          </Link>
          <a
            href="https://drive.google.com/file/d/18ydl6Rhm6LroLDt46GnDDKVCM8Rc3f_N/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:underline underline-offset-4 transition font-semibold"
          >
            T&amp;C
          </a>
        </div>

        {/* Social + Meals Donated */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex space-x-3 mb-1">
            <a href="#" className="text-lg hover:text-black transition"><FaFacebookF /></a>
            <a href="#" className="text-lg hover:text-black transition"><FaInstagram /></a>
            <a href="#" className="text-lg hover:text-black transition"><FaTwitter /></a>
          </div>
          <div className="text-base md:text-lg text-black font-bold">
            Meals Donated: <span className="font-bold">34+</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;