import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import { MapPin, Tag, User, Truck } from "lucide-react";

const RequestDonation = () => {
  const { donationId } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");

  const fetchDonationDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/browse/donations`,
        {
          headers: {
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      const allDonations = response.data;
      const found = allDonations.find(
        (item) => item.id.toString() === donationId
      );
      setDonation(found || null);
    } catch (err) {
      console.error("Failed to fetch donation details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please login to request a donation.");
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/create/${donationId}`,
        { paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Request sent successfully!");
      navigate("/my-order");
    } catch (error) {
      console.error("Failed to request donation:", error);
      alert(
        "Request failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  useEffect(() => {
    fetchDonationDetails();
  }, [donationId]);

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white">
        <Nav2 />
        <div className="px-4 py-10 max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-300">
              Loading donation details...
            </p>
          ) : !donation ? (
            <p className="text-center text-red-400 font-medium">
              Donation not found.
            </p>
          ) : (
            <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden">
              <img
                src={
                  donation.imageUrl ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                className="w-full h-64 object-cover"
                alt={donation.foodName}
              />
              <div className="p-6 space-y-4">
                <h2 className="text-3xl font-bold text-[#FF7401]">
                  {donation.foodName}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <Tag className="inline-block mr-1" size={16} />
                    <strong>Description:</strong> {donation.description}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p>
                    <Truck className="inline-block mr-1" size={16} />
                    <strong>Delivery Type:</strong> {donation.deliveryType}
                  </p>
                  <p>
                    <strong>Free:</strong> {donation.free ? "Yes" : "No"}
                  </p>
                  {!donation.free && (
                    <p>
                      <strong>Price:</strong> ₹{donation.price}
                    </p>
                  )}
                  <p>
                    <User className="inline-block mr-1" size={16} />
                    <strong>Donor:</strong> {donation.donorName}
                  </p>
                  <p>
                    <strong>Status:</strong> {donation.status}
                  </p>

                  <p>
                    <MapPin className="inline-block mr-1" size={16} />
                    <strong>Location:</strong> {donation.location}<a
                      href={`https://www.google.com/maps?q=${donation.geolocation}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block align-middle ml-2"
                      title="View on map"
                    >
                      <span className="font-bold text-[#FF7401]"><MapPin className="inline-block" size={15} /> View on Map </span>
                    </a>
                  </p>
                  <p>
                    <strong>Refrigerated:</strong>{" "}
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${donation.refrigerationAvailable === true
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                        }`}
                    >
                      {donation.refrigerationAvailable === true ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                {donation.status === "AVAILABLE" ? (
                  <div className="mt-6">
                    {/* You can enable this payment dropdown if required */}
                    {/* <div className="mb-4">
                      <label className="block text-lg font-semibold mb-1">
                        Select Payment Method:
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7401]"
                      >
                        <option value="CASH">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="CARD">Card</option>
                        <option value="NOT_APPLICABLE">Not Applicable</option>
                      </select>
                    </div> */}

                    <button
                      onClick={handleRequest}
                      className="w-full bg-[#FF7401] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Request This Donation
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    This donation is not available for request.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RequestDonation;
