import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import axios from 'axios';

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    contactNumber: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'EXTRABITE-API-KEY': import.meta.env.VITE_API_KEY
        }
      });
      alert('Password reset successful!');
      navigate('/signin');
    } catch (err) {
      alert('Failed to reset password: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Forgot Password</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>
        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-center text-xl font-bold text-[#E87730] mb-6">Reset Your Password</h2>
            <div className="mx-7">
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="Email" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" required />
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                placeholder="Contact Number" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" required />
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange}
                placeholder="New Password" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" required />
              <button type="submit"
                className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ForgotPassword;
