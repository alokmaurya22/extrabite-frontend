import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';


function HelpSection2() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEndingSoonDonations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/browse/donations`, {
        headers: {
          'EXTRABITE-API-KEY': import.meta.env.VITE_API_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      const now = new Date();

      // Step 1: Filter AVAILABLE donations
      const availableOnly = data
        .filter((d) => d.status === "AVAILABLE")
        .map((item) => {
          let countdownTime = item.countdownTime;

          // Calculate countdown for PRECOOKED items (4-hour expiry rule)
          if (item.foodType !== "RAW" && item.createdAt) {
            const createdAt = new Date(item.createdAt);
            const expiryTime = new Date(createdAt.getTime() + 4 * 60 * 60 * 1000);
            countdownTime = Math.max(Math.floor((expiryTime - now) / 1000), 0);
          }

          return {
            ...item,
            countdownTime,
          };
        });

      // Step 2: Sort by countdownTime (shortest time first)
      const sorted = availableOnly
        .sort((a, b) => (a.countdownTime || Infinity) - (b.countdownTime || Infinity))
        .slice(0, 6); // Limit to 6 items

      setDonations(sorted);
    } catch (error) {
      console.error("Failed to fetch donations:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEndingSoonDonations();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const formatCountdown = (seconds) => {
    if (!seconds || seconds <= 0) return "Expired";
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="bg-transparent text-white py-10 px-5 flex flex-col items-center mt-20">
      <style>
        {`
          @media (max-width: 1023px) {
            .slick-prev, .slick-next {
              display: none !important;
            }
          }
        `}
      </style>
      {/* Section Title */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#FF7401]">
        Leftover Ingredients? Let's Cook Something Amazing!
      </h2>

      <p className="text-center text-gray-300 mt-2 sm:mt-3 text-sm sm:text-lg">
        Don’t let those extra items sit unused in your kitchen. Use our smart recipe generator to create something delicious with what you already have!
      </p>

      {/* Centered Button */}
      <div className="flex justify-center mt-6 mb-16">
        <Link
          to="/recipe-gen"
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          Generate a Recipe <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#FF7401]">Help Where it matters most</h2>
        <p className="text-lg mt-2">
          These meals are about to expire. Help someone before it's too late!
        </p>
      </div>

      <div className="mt-10 w-full max-w-6xl">
        {loading ? (
          <p className="text-center text-gray-300">Loading donations...</p>
        ) : donations.length === 0 ? (
          <p className="text-center text-gray-300">No donations ending soon.</p>
        ) : (
          <Slider {...settings}>
            {donations.map((item, index) => (
              <div key={index} className="px-3">
                <div className="bg-white text-black rounded-xl shadow-lg p-4 h-full flex flex-col items-center justify-between">
                  <img
                    src={item.imageUrl || "https://placehold.co/400x200?text=No+Image"}
                    alt={item.foodName}
                    className="rounded-md w-full h-40 object-cover mb-3"
                  />
                  <h4 className="text-lg font-bold text-[#FF7401]">{item.foodName}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm">Donor: {item.donorName}</p>
                  <p className="text-sm">Location: {item.location}</p>
                </div>
              </div>
            ))}
          </Slider>
        )}

        <div className="mt-6 text-center">
          <a
            href="/BrowseDonations"
            className="inline-block bg-[#FF7401] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Browse More
          </a>
        </div>
      </div>
    </div>
  );
}

export default HelpSection2;
