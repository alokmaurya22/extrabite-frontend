import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import { registerUser, wakeBackend } from '../util/api';
import { useLoading } from '../context/LoadingContext';

function Signup() {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    password: '',
    location: '',
    role: 'DONOR',
    fssaiLicenseNumber: '',
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasFssai, setHasFssai] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    wakeBackend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = { ...formData };
      if (!hasFssai || formData.role !== 'DONOR') {
        delete payload.fssaiLicenseNumber;
      }

      const res = await registerUser(payload);

      sessionStorage.setItem('token', res.accessToken);
      sessionStorage.setItem('role', res.role);

      setSuccess(res.message || 'Registration successful!');
      setTimeout(() => navigate('/home2'), 1200);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message?.includes('already') || err.response?.data?.message?.includes('exist')
          ? 'This email is already registered.'
          : err.response?.data?.message || err.message;

      setError('Registration failed: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Welcome To Extra Bite</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">Sign Up</h2>

            <div className="mx-7">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <span className="mr-2">🇮🇳</span>
              <span className="mr-2">+91</span>
              <input
                type="text"
                name="contactNumber"
                placeholder="Phone"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="mx-7">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="mx-7">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="mx-7">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="mx-7 mb-4">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 outline-none bg-white"
              >
                <option value="DONOR">Donor</option>
                <option value="RECEIVER">Receiver</option>
              </select>
            </div>

            {/* FSSAI Question for Donors */}
            {formData.role === 'DONOR' && (
              <div className="mx-7 mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Do you have an FSSAI License?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hasFssai"
                      value="yes"
                      checked={hasFssai === true}
                      onChange={() => setHasFssai(true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hasFssai"
                      value="no"
                      checked={hasFssai === false}
                      onChange={() => setHasFssai(false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            )}

            {/* FSSAI License Input Field */}
            {formData.role === 'DONOR' && hasFssai && (
              <div className="mx-7 mb-4">
                <input
                  type="text"
                  name="fssaiLicenseNumber"
                  placeholder="FSSAI License Number"
                  value={formData.fssaiLicenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                />
              </div>
            )}

            <div className="mx-7 mb-4 text-sm text-gray-700">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Terms and Conditions
                  </button>
                </span>
              </label>
            </div>

            <div className="mx-7">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold transition
                  ${isAgreed
                    ? 'bg-[#FF7401] text-white hover:bg-orange-600 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
                disabled={!isAgreed}
              >
                Sign Up
              </button>
            </div>

            {/* Error/Success Message */}
            {error && (
              <div className="mx-7 mt-3 text-red-600 text-sm text-center font-semibold">
                {error}
              </div>
            )}
            {success && (
              <div className="mx-7 mt-3 text-green-600 text-sm text-center font-semibold">
                {success}
              </div>
            )}

            <div className="mx-7 mt-4 text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link to="/signin" className="text-sm text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </form>

        {showTermsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
              <h3 className="text-lg font-bold mb-4 text-[#E87730]">Terms and Conditions</h3>
              <div className="text-sm text-gray-700 max-h-64 overflow-y-auto space-y-3">
                <p>1. Donors and receivers are solely responsible for the safety and quality of food items shared via the platform.</p>

                <p>2. ExtraBite acts only as a facilitator and does not verify the contents, hygiene, preparation, or freshness of the food.</p>

                <p>3. Users must ensure that all food provided is safe, unexpired, properly stored, and handled with care during the entire process.</p>

                <p>4. Pre-cooked food will be considered valid for up to <strong>4 hours</strong> if stored in refrigeration, or <strong>2 hours</strong> if not. After that time, it will be automatically removed from the platform to ensure safety.</p>

                <p>5. Donors must use <strong>clean packaging containers, pots, or bags</strong> while sharing food, and are expected to maintain general food hygiene.</p>

                <p>6. Any disputes, miscommunication, or issues arising out of a donation must be resolved directly between the donor and the receiver.</p>

                <p>7. ExtraBite takes no responsibility for any health impact, illness, contamination, or incident caused by donated food.</p>

                <p>8. Misuse of the platform, including sharing unsafe items or violating ethical standards, may lead to account suspension or permanent ban.</p>

                <p>9. By using ExtraBite, you agree to these terms, accept full responsibility for your actions, and acknowledge that the platform serves only as a connector between users.</p>

                <p className="text-center mt-2">
                  <a
                    href="https://drive.google.com/file/d/18ydl6Rhm6LroLDt46GnDDKVCM8Rc3f_N/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-200"
                  >
                    🔗 For More Details, Click Here
                  </a>
                </p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-4 py-2 bg-[#FF7401] text-white rounded hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

export default Signup;
