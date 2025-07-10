import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const MyReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/my-received-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching received requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Request accepted. OTP sent to receiver.");
      fetchRequests();
    } catch (error) {
      alert("Failed to accept request.");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Request rejected.");
      fetchRequests();
    } catch (error) {
      alert("Failed to reject request.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white">
        <Nav2 />
        <div className="px-4 sm:px-10 pt-10">
          <h1 className="text-3xl font-bold text-[#FF7401] mb-6 text-center">
            My Received Requests
          </h1>

          {loading ? (
            <p className="text-center text-gray-300">Loading...</p>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-300">No received requests.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pb-24">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white text-black rounded-2xl p-5 shadow-md"
                >
                  <h2 className="text-xl font-semibold text-[#FF7401] mb-2">
                    {req.foodName}
                  </h2>
                  <p>Status: <strong>{req.status}</strong></p>
                  <p>Receiver: {req.receiverName}</p>
                  <p>Payment Method: {req.paymentMethod}</p>
                  <p>Request Date: {new Date(req.requestDate).toLocaleString()}</p>

                  {req.status === "PENDING" && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {req.status === "AWAITING_PICKUP" && (
                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/confirm-pickup/${req.id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                      >
                        Confirm Pickup via OTP
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyReceivedRequests;
