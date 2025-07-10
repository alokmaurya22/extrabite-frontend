import React from 'react';

function AvailableFoodSection() {
  return (
    <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] to-100% min-h-screen text-white py-12 px-6 md:px-20">
      <h1 className="text-3xl md:text-5xl text-center text-orange-500 font-semibold mb-4">
        Available Food for Donation
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
        Hunger ends where sharing begins. Browse donated food, pick it up, and make a difference today!
      </p>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        {/* Label and Icon */}
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <span>Search For Food</span>
          <span className="rotate-45 text-xl cursor-pointer">⤾</span>
        </div>

        {/* Input and Button */}
        <div className="flex w-full md:w-[600px] items-center gap-3">
          <input
            type="text"
            placeholder="Search Donated Foods"
            className="flex-grow rounded-lg px-4 py-2 text-black outline-none bg-white"
          />
          <button className="bg-[#FF7401] hover:bg-orange-600 text-white px-6 py-2 rounded-md">
            Search Now
          </button>
        </div>
      </div>

      <h2 className="text-orange-500 text-lg font-semibold mb-6">
        Available Foods For Donation
      </h2>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white text-black rounded-lg shadow p-4">
          <img src="https://i.imgur.com/9Vg3lG2.jpg" alt="Dosa" className="rounded-md mb-3" />
          <h3 className="font-semibold text-md">Ramachandra Parlour</h3>
          <p className="text-sm text-gray-600">south indian</p>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>⏱ 30 Mins</span>
            <span>⭐ 4.0</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white text-black rounded-lg shadow p-4">
          <img src="https://i.imgur.com/BLkgCrN.jpg" alt="Idli and Dosa" className="rounded-md mb-3" />
          <h3 className="font-semibold text-md">Uma Parlour – Pure Vegetarian</h3>
          <p className="text-sm text-gray-600">south indian</p>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>⏱ 20 Mins</span>
            <span>⭐ 3.2</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white text-black rounded-lg shadow p-4">
          <img src="https://i.imgur.com/JVY6dMV.jpg" alt="Paneer Tikka Rice Bowl" className="rounded-md mb-3" />
          <h3 className="font-semibold text-md">Paneer Tikka Rice Bowl</h3>
          <p className="text-sm text-gray-600">the good bowl</p>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>⏱ 20 Mins</span>
            <span>⭐ 3.2</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white text-black rounded-lg shadow p-4">
          <img src="https://i.imgur.com/OeW8IPY.jpg" alt="Aloo Paratha Meal" className="rounded-md mb-3" />
          <h3 className="font-semibold text-md">Aloo Paratha Curd Meal (2 Pcs)</h3>
          <p className="text-sm text-gray-600">lunch box</p>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>⏱ 25 Mins</span>
            <span>⭐ 3.2</span>
          </div>
        </div>
      </div>



    {/* Search Section 2 */}
      <div className="bg-[#FF7401] text-white mt-8 py-12 px-6 md:px-20">
        
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-1">
        {/* Label and Icon */}
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <span>Search For Donar</span>
          <span className="rotate-45 text-xl cursor-pointer">⤾</span>
        </div>

    
        {/* Input and Button */}
        <div className="flex w-full md:w-[600px] items-center gap-3">
          <input
            type="text"
            placeholder="Search Donated Foods"
            className="flex-grow rounded-lg px-4 py-2 text-black outline-none bg-white"
          />
          <button className="bg-black hover:bg-blue-950 text-white px-6 py-2 rounded-md">
            Search Now
          </button>
        </div>
      </div>
      </div>


          {/* Donors Around You Section */}
        <div className="text-center mt-20">
          <h2 className="text-start text-orange-500 text-lg font-semibold mb-6">Donors around you</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {/* Donor Card */}
            {[
              { name: "Donor 1", rating: 4, img: "https://i.imgur.com/lycRrzf.png" },
              { name: "Donor 2", rating: 3, img: "https://i.imgur.com/PLLP7qO.png" },
              { name: "Donor 3", rating: 5, img: "https://i.imgur.com/3ZON5Ow.png" },
              { name: "Donor 4", rating: 4, img: "https://i.imgur.com/LR4OAhE.png" },
              { name: "Donor 4", rating: 3, img: "https://i.imgur.com/LKXNudR.png" },
              { name: "Donor 5", rating: 2, img: "https://i.imgur.com/L1BZB3u.png" },
            ].map((donor, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={donor.img}
                  alt={donor.name}
                  className="w-28 h-28 rounded-full object-cover mb-2 border-4 border-white shadow-md"
                />
                <p className="text-white font-medium">{donor.name}</p>
                <div className="text-yellow-400 text-lg">
                  {Array(donor.rating).fill("★").join("")}
                </div>
              </div>
            ))}
          </div>
        </div>



    </div>
  );
}

export default AvailableFoodSection;
