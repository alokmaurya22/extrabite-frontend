import { FaCalendarAlt } from "react-icons/fa";
import { FaHandHoldingHeart, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGeolocation from '../../util/useGeolocation';
import { useState, useEffect } from 'react';

function HeroSection() {
  const navigate = useNavigate();
  const { address, loading, triggerGeolocation, setUserTyped } = useGeolocation();
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [userTyped, setUserTypedState] = useState(false);

  // Autofill with geolocation address if empty and user hasn't typed
  useEffect(() => {
    if (!loading && address && !userTyped) {
      setLocation(address);
    }
  }, [address, loading, userTyped]);

  // Helper: Extract 6-digit pin code from address string
  function extractPinCode(addr) {
    const match = addr && addr.match(/\b\d{6}\b/);
    return match ? match[0] : null;
  }

  const handleInputChange = (e) => {
    setLocation(e.target.value);
    setErrorMsg('');
    setUserTypedState(true);
    setUserTyped(true);
  };

  const handleDetectLocation = () => {
    setUserTypedState(false);
    setUserTyped(false);
    triggerGeolocation();
  };

  const handleProtectedNavigation = (path) => {
    if (!extractPinCode(location)) {
      setErrorMsg('A valid 6-digit pin code is required in your address.');
      return;
    }
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate(path);
    } else {
      alert("Please login first.");
      navigate("/signin");
    }
  };

  return (
    <section className="md:pt-28 pt-20 pb-20 flex flex-col items-center text-center px-4 bg-transparent">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
        Save Food, Save Lives
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-300 max-w-2xl mt-4">
        Join our mission to reduce food waste and help those in need. Easily
        donate or request food in just a few clicks!
      </p>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <div className="relative w-80 sm:w-96">
          <input
            type="text"
            placeholder="Enter your location"
            value={userTyped ? location : (loading ? 'Detecting location...' : location)}
            onChange={handleInputChange}
            className={`px-4 py-3 pr-10 rounded-lg border focus:outline-none focus:ring-2 w-full bg-transparent text-white placeholder-gray-400 ${extractPinCode(location) ? 'border-gray-500 focus:ring-orange-500' : 'border-red-500 ring-red-500'}`}
            style={{ backgroundColor: "transparent" }}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-700 focus:outline-none"
            onClick={handleDetectLocation}
            title="Detect Location"
          >
            <FaLocationArrow size={22} />
          </button>
        </div>
        <button
          className="bg-[#FF7401] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          onClick={() => handleProtectedNavigation('/Home2')}
        >
          <span className="text-lg font-semibold">Get Started</span>
        </button>
      </div>

      {/* Error Messages */}
      {!extractPinCode(location) && !loading && (
        <div className="text-red-500 mt-2 text-sm">A valid 6-digit pin code is required in your address.</div>
      )}
      {errorMsg && <div className="text-red-500 mt-2 text-sm">{errorMsg}</div>}

      {/* Buttons Section */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 mt-8 justify-center w-full px-4">
        {/* Request Food */}
        <button
          onClick={() => handleProtectedNavigation("/BrowseDonations")}
          className="flex-1 min-w-[140px] max-w-[200px] flex items-center justify-center gap-2 border-2 border-dashed border-orange-500 px-4 py-3 rounded-lg text-[#FF7401] hover:bg-[#FF7401] hover:text-white transition"
        >
          <FaCalendarAlt />
          <span className="text-sm sm:text-base font-semibold">Request Food</span>
        </button>

        {/* Donate Food */}
        <button
          onClick={() => handleProtectedNavigation("/DonateForm")}
          className="flex-1 min-w-[140px] max-w-[200px] flex items-center justify-center gap-2 border-2 border-dashed border-orange-500 px-4 py-3 rounded-lg text-[#FF7401] hover:bg-[#FF7401] hover:text-white transition"
        >
          <FaHandHoldingHeart />
          <span className="text-sm sm:text-base font-semibold">Donate Food</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
