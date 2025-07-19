import React from "react";
import { Link } from 'react-router-dom';
import SignUpImg from "../../assets/signup.png";
import RegisterImg from "../../assets/register.png";
import DonateImg from "../../assets/donate.png";
import ThankYouImg from "../../assets/thankyou.png";
import CollectImg from "../../assets/collect.png";
import DistributeImg from "../../assets/distribute.png";
import { ArrowRight } from 'lucide-react';
import DotImg from "../../assets/dot.png";
import ArrowImg from "../../assets/arrow.png";

const steps = [
  {
    title: "Become a Donor",
    description: "Be the reason someone sleeps with a full stomach.",
    steps: [
      { image: SignUpImg, label: "Sign up" },
      { image: RegisterImg, label: "Register as Donor" },
      { image: DonateImg, label: "Donate Food" },
      { image: ThankYouImg, label: "Thank you" },
    ],
  },
  {
    title: "Receive a Meal",
    description: "Bridging the gap between hunger and hope.",
    steps: [
      { image: SignUpImg, label: "Sign up" },
      { image: CollectImg, label: "Request Food" },
      { image: DistributeImg, label: "Collect Food" },
      { image: ThankYouImg, label: "Thank you" },
    ],
  },
];

// Step Component
const Step = ({ image, label }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-white p-2 rounded-full shadow-lg flex items-center justify-center w-12 h-12 sm:w-15 sm:h-15">
        <img src={image} alt={label} className="w-9 h-9 sm:w-13 sm:h-13" />
      </div>
      <span className="mt-2 text-white text-sm sm:text-base">{label}</span>
    </div>
  );
};

// Arrows and Dotted Line Component (Hide dots in mobile view)
const DottedLine = ({ isVertical }) => {
  return (
    <div
      className={`flex items-center justify-center ${isVertical ? "flex-col space-y-3" : "flex-row space-x-2"
        }`}
    >
      {/* Hide dots in mobile view */}
      <img
        src={DotImg}
        alt="Dots"
        className="hidden sm:block w-10 h-auto sm:w-16"
      />
      <img
        src={ArrowImg}
        alt="Arrow"
        className={`w-6 h-auto sm:w-8 ${isVertical ? "sm:rotate-0 rotate-90" : "sm:rotate-0 rotate-90"}`}
      /> {/* Width and height of arrow */}
      <img
        src={DotImg}
        alt="Dots"
        className="hidden sm:block w-10 h-auto sm:w-16"
      />
    </div>
  );
};

// Main Mission Section Component
const MissionSection = () => {
  return (
    <div className="text-white py-16 px-4">
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


      {/* Section Title */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#FF7401] pt-16">
        Way to fulfill our mission!
      </h2>
      <p className="text-center text-gray-300 mt-2 sm:mt-3 text-sm sm:text-lg">
        Take a step towards ending food wastage – Donate or request food effortlessly!
      </p>

      {/* Steps Section */}
      <div className="mt-8 sm:mt-10 space-y-16 sm:space-y-20">
        {steps.map((section, index) => (
          <div key={index} className="text-center">
            {/* Subheading */}
            <h3 className="text-lg sm:text-3xl font-bold text-[#FF7401]">
              {section.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-lg">
              {section.description}
            </p>

            {/* Step Process */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">{/* Gap between dots and arrow */}
              {section.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center">
                  {/* Step */}
                  <Step image={step.image} label={step.label} />

                  {/* Arrow (if not the last step) */}
                  {idx < section.steps.length - 1 && (
                    <DottedLine isVertical={false} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default MissionSection;
