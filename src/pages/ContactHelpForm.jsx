import React from 'react';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import { FaEnvelope, FaUser, FaEdit } from "react-icons/fa";

function ContactHelpForm() {
  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav />

        {/* Page Title */}
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Contact & Help</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">
              Need Assistance?
            </h2>

            {/* Full Name */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Subject */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaEdit className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Subject"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Message */}
            <div className="mx-7">
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mx-7">
              <button className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Send Message
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ContactHelpForm;
