import React from "react";
import { useNavigate } from "react-router-dom";


import homefood from "../../assets/homefood.jpg";
import resturent from "../../assets/resturent.jpeg";
import packed from "../../assets/packed.jpg";
import fresh from "../../assets/fresh.png";
import healthy from "../../assets/healthy.png";
import special from "../../assets/special.png";


import newYorkImg from "../../assets/newyork.png";
import malaysiaImg from "../../assets/malaysia.png";
import pakistanImg from "../../assets/pakistan.png";
import kenyaImg from "../../assets/kenya.png";
import canadaImg from "../../assets/canada.png";
import indiaImg from "../../assets/india.png";

function HelpSection() {
  const navigate = useNavigate();
  const handleMealClick = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/BrowseDonations');
    } else {
      navigate('/signin');
    }
  };
  return (
    <div className="bg-transparent text-white py-10 px-5 flex flex-col items-center mt-20">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#FF7401]">
          Help where it matters most
        </h2>
        <p className="text-lg mt-2">
          Your Extra Food Can Be Someone’s Next Meal! — Don’t Waste, Just Share
        </p>
      </div>

      {/* Nearby Meals for Donation */}
      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-xl font-semibold text-[#FF7401] text-center">
          Nearby Meals for Donation
        </h3>
        <div className="flex flex-wrap justify-center gap-8 mt-5">
          {[
            { name: "Home-cooked Meals", img: homefood },
            { name: "Restaurant Surplus Food", img: resturent },
            { name: "Packed Meals", img: packed },
            { name: "Fresh Produce", img: fresh },
            { name: "Healthy Meals", img: healthy },
            { name: "Raw Foods", img: special },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-4 hover:ring-orange-400 transition"
                onClick={handleMealClick}
                title={sessionStorage.getItem('token') ? 'Browse Donations' : 'Login to Browse Donations'}
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="mt-2 text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hunger Hotspots Around You */}
      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-xl font-semibold text-[#FF7401] text-center">
          Hunger Hotspots Around You
        </h3>
        <div className="flex flex-wrap justify-center gap-8 mt-5">
          {[
            { name: "New York", img: newYorkImg},
            { name: "Malaysia", img: malaysiaImg },
            { name: "Pakistan", img: pakistanImg },
            { name: "Kenya", img: kenyaImg },
            { name: "Canada", img: canadaImg },
            { name: "India", img: indiaImg },
          ].map((location, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src={location.img} alt={location.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="mt-2 text-sm">{location.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HelpSection;
