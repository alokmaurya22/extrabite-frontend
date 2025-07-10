import React, { useState } from "react";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

function RequestForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    location: "",
    geolocation: "",
    requestedTime: "",
    requestExpiryTime: "",
    foodType: "",
    alternativeFood: "",
    numberOfPeople: 1,
    message: "",
    offerPrice: 0,
    foodDescription: "",
    paymentMethod: "CASH",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(
        `${API}/food-requests/create`,
        {
          ...form,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("✅ Food request submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("❌ Request failed:", err);
      alert("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {step === 1 ? "Request Food" : "Request Details"}
          </h1>
          <div className="w-full border-t-2 border-[#FF7401] mt-1"></div>
        </div>

        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
            {step === 1 && (
              <>
                <h2 className="text-center text-2xl font-bold text-[#FF7401] mb-6">Your Details</h2>
                <input name="fullName" value={form.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="contactNumber" value={form.contactNumber} onChange={handleChange} type="text" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="location" value={form.location} onChange={handleChange} type="text" placeholder="Pickup Location" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="geolocation" value={form.geolocation} onChange={handleChange} type="text" placeholder="Geolocation (lat,lng)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <label className="text-sm font-medium text-gray-700 block mb-1">Preferred Pickup Time</label>
                <input name="requestedTime" value={form.requestedTime} onChange={handleChange} type="datetime-local" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <label className="text-sm font-medium text-gray-700 block mb-1">Request Expiry Time</label>
                <input name="requestExpiryTime" value={form.requestExpiryTime} onChange={handleChange} type="datetime-local" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <button onClick={() => setStep(2)} className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Next &gt;&gt;
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-center text-2xl font-bold text-[#FF7401] mb-6">Request Details</h2>
                <input name="foodType" value={form.foodType} onChange={handleChange} type="text" placeholder="Food Type (e.g. Rice)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="alternativeFood" value={form.alternativeFood} onChange={handleChange} type="text" placeholder="Alternative Food (e.g. Chapati)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="numberOfPeople" value={form.numberOfPeople} onChange={handleChange} type="number" placeholder="Number of People" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <input name="offerPrice" value={form.offerPrice} onChange={handleChange} type="number" placeholder="Offer Price (0 if Free)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                <textarea name="foodDescription" value={form.foodDescription} onChange={handleChange} placeholder="Food Description (e.g. No peanuts)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" rows={2} />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message to Donor (optional)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" rows={2} />
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none">
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="NOT_APPLICABLE">Not Applicable</option>
                </select>
                <button disabled={loading} onClick={handleSubmit} className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RequestForm;
