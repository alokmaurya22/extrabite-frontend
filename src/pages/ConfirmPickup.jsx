import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";

const ConfirmPickup = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleConfirm = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}/confirm-pickup`,
        { pickupCode: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Pickup confirmed successfully!");
      navigate("/received-requests");
    } catch (err) {
      console.error("Pickup confirmation failed:", err);
      alert("Invalid OTP or request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white">
        <Nav2 />
        <div className="max-w-md mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold text-[#FF7401] mb-6 text-center">
            Confirm Pickup
          </h1>
          <div className="bg-white rounded-xl text-black p-6 shadow-md">
            <label className="block mb-2 font-semibold">Enter OTP from Receiver</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-[#FF7401] text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              {loading ? "Confirming..." : "Confirm Pickup"}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ConfirmPickup;
