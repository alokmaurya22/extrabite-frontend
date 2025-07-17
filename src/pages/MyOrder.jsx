// src/pages/MyOrder.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import { MapPin } from "lucide-react";

const MyOrder = () => {
  const [viewType, setViewType] = useState("requests");
  const [filter, setFilter] = useState("ALL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInputs, setOtpInputs] = useState({});
  const [pickupCodes, setPickupCodes] = useState({});
  const [ratings, setRatings] = useState({});
  const [submittingRating, setSubmittingRating] = useState({});
  const [ratedRequests, setRatedRequests] = useState({});
  const [countdownMap, setCountdownMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = sessionStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/my-sent-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.error("Error loading requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedRequests = async () => {
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
      setData(res.data);
    } catch (err) {
      console.error("Error loading received requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGivenRatings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/ratings/given`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      const ratedMap = {};
      res.data.forEach((r) => {
        ratedMap[r.donationRequestId] = r.rating;
      });
      setRatedRequests(ratedMap);
    } catch (err) {
      console.error("Error fetching given ratings:", err);
    }
  };

  const fetchData = () => {
    setLoading(true);
    if (viewType === "requests") fetchRequests();
    else fetchReceivedRequests();
  };

  useEffect(() => {
    fetchData();
    fetchGivenRatings();
  }, [viewType]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const updateCountdowns = () => {
      const now = Date.now();
      const newCountdowns = {};
      data.forEach((item) => {
        const expiry = getExpiryTime(item);
        if (expiry) {
          newCountdowns[item.id] = Math.max(
            Math.floor((expiry - now) / 1000),
            0
          );
        } else {
          newCountdowns[item.id] = null;
        }
      });
      setCountdownMap(newCountdowns);
    };
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const acceptRequest = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Request accepted. OTP sent to receiver.");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Failed to accept request.");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Request rejected.");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Failed to reject request.");
    }
  };

  const confirmPickup = async (id) => {
    const otp = otpInputs[id];
    if (!otp) return alert("Please enter OTP");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/confirm-pickup`,
        { pickupCode: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Pickup confirmed successfully!");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Failed to confirm pickup.");
    }
  };

  const getPickupCode = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/pickup-code`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setPickupCodes((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      console.log(err);
      alert("Failed to fetch OTP.");
    }
  };

  const handleRatingSubmit = async (id) => {
    const { rating, comment } = ratings[id] || {};
    if (!rating) return alert("Please select a star rating.");
    try {
      setSubmittingRating((prev) => ({ ...prev, [id]: true }));
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ratings/submit`,
        { donationRequestId: id, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Rating submitted successfully!");
      fetchGivenRatings();
    } catch (err) {
      console.log(err);
      alert("Failed to submit rating.");
    } finally {
      setSubmittingRating((prev) => ({ ...prev, [id]: false }));
    }
  };

  const statusGroups = {
    ONGOING: ["PENDING", "ACCEPTED", "AWAITING_PICKUP"],
    COMPLETED: ["COMPLETED"],
    CANCELLED: ["REJECTED", "CANCELLED"],
    ALL: [],
  };

  const filteredData = (
    filter === "ALL"
      ? data
      : data.filter((item) => statusGroups[filter].includes(item.status))
  ).sort(
    (a, b) =>
      new Date(b.createdAt || b.requestDate) -
      new Date(a.createdAt || a.requestDate)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page if filter or viewType changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, viewType]);

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 font-semibold";
      case "ACCEPTED":
        return "text-blue-600 font-semibold";
      case "AWAITING_PICKUP":
        return "text-purple-600 font-semibold";
      case "COMPLETED":
        return "text-green-600 font-semibold";
      case "REJECTED":
      case "CANCELLED":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCountdown = (seconds) => {
    if (!seconds || seconds <= 0) return "Expired";
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const getExpiryTime = (item) => {
    if (item.expiryDateTime) {
      return new Date(item.expiryDateTime).getTime();
    }
    if (item.foodType === "PRECOOKED" && item.createdAt) {
      return new Date(item.createdAt).getTime() + 4 * 60 * 60 * 1000;
    }
    if (item.createdAt) {
      return new Date(item.createdAt).getTime() + 24 * 60 * 60 * 1000;
    }
    return null;
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white">
        <Nav2 />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-[#FF7401] mb-10 text-center">
            My {viewType === "requests" ? "Requests" : "Donations"}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <select
              className="p-3 text-lg rounded-xl bg-white text-black"
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <option value="requests">Collected Food</option>
              <option value="donations">Donated Food</option>
              {/*<option value="myrequests2">Requested Food</option>*/}
            </select>
            <select
              className="p-3 text-lg rounded-xl bg-white text-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-300">Loading...</p>
          ) : filteredData.length === 0 ? (
            <p className="text-center text-gray-300">No data found.</p>
          ) : (
            <>
              <div className="space-y-6">
                {paginatedData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white text-black rounded-xl shadow-md p-5 flex flex-col md:flex-row justify-between"
                  >
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-[#FF7401] mb-2">
                        {item.foodName}
                      </h3>
                      {/*
                    <pre className="text-xs bg-gray-100 text-black p-2 rounded overflow-x-auto mb-2">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                    */}
                      <p
                        className={`text-sm mb-1 ${getStatusClass(item.status)}`}
                      >
                        <strong>Status:</strong> {item.status}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Received On:</strong>{" "}
                        {formatDate(item.requestDate)}
                      </p>
                      <p>
                        <strong>Free:</strong>{" "}
                        {item.isFree === true ||
                          item.isFree === "true" ||
                          item.price === 0 ||
                          item.price === "0"
                          ? "Yes"
                          : "No"}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Time left:</strong>{" "}
                        {countdownMap[item.id] !== undefined &&
                          countdownMap[item.id] !== null
                          ? formatCountdown(countdownMap[item.id])
                          : "N/A"}
                      </p>
                      <p className="text-sm mb-1">
                        <strong>
                          {viewType === "requests" ? "Donor" : "Receiver"}:
                        </strong>{" "}
                        {item.donorName || item.receiverName || "-"}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location}<a
                          href={`https://www.google.com/maps?q=${item.geolocation}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block align-middle ml-2"
                          title="View on map"
                        >
                          <span className="font-bold text-[#FF7401]"><MapPin className="inline-block" size={15} /> View on Map </span>
                        </a>
                      </p>

                      {viewType === "donations" && item.status === "PENDING" && (
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => acceptRequest(item.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => rejectRequest(item.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {viewType === "donations" &&
                        item.status === "AWAITING_PICKUP" && (
                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder="Enter OTP"
                              className="border p-2 rounded w-full mb-2"
                              value={otpInputs[item.id] || ""}
                              onChange={(e) =>
                                setOtpInputs((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              onClick={() => confirmPickup(item.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                              Confirm Pickup
                            </button>
                          </div>
                        )}

                      {viewType === "requests" &&
                        item.status === "AWAITING_PICKUP" && (
                          <div className="mt-4">
                            <button
                              onClick={() => getPickupCode(item.id)}
                              className="bg-purple-600 text-white px-4 py-2 rounded"
                            >
                              Show OTP & Contact Details
                            </button>
                            {pickupCodes[item.id] && (
                              <div className="mt-2">
                                <p className="text-lg font-bold text-green-600">
                                  Pickup OTP: {pickupCodes[item.id].pickupCode}
                                </p>
                                <p className="text-sm text-gray-800">
                                  Donor Contact:{" "}
                                  {pickupCodes[item.id].donorContactNumber}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                    </div>

                    {/* Rating or Map section */}
                    <div className="md:w-1/3 w-full border-l border-gray-300 pl-4 mt-4 md:mt-0">
                      {item.status === "COMPLETED" ? (
                        <>
                          <label className="block font-medium mb-1">Rating:</label>
                          {ratedRequests[item.id] ? (
                            <div className="flex gap-1 text-yellow-500 text-2xl">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}>
                                  {ratedRequests[item.id] >= star ? "★" : "☆"}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <div className="flex gap-1 text-yellow-500 text-2xl mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                      setRatings((prev) => ({
                                        ...prev,
                                        [item.id]: {
                                          ...(prev[item.id] || {}),
                                          rating: star,
                                        },
                                      }))
                                    }
                                  >
                                    {ratings[item.id]?.rating >= star ? "★" : "☆"}
                                  </button>
                                ))}
                              </div>
                              <textarea
                                className="p-2 border rounded mb-2"
                                placeholder="Leave a comment (optional)"
                                value={ratings[item.id]?.comment || ""}
                                onChange={(e) =>
                                  setRatings((prev) => ({
                                    ...prev,
                                    [item.id]: {
                                      ...(prev[item.id] || {}),
                                      comment: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <button
                                onClick={() => handleRatingSubmit(item.id)}
                                disabled={submittingRating[item.id]}
                                className="bg-orange-600 text-white px-4 py-2 rounded"
                              >
                                {submittingRating[item.id]
                                  ? "Submitting..."
                                  : "Submit Rating"}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <iframe
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=${item.geolocation}&output=embed`}
                            title="Google Map"
                          />
                          <p className="text-sm mt-2">
                            <strong>Location:</strong> {item.location}<a
                              href={`https://www.google.com/maps?q=${item.geolocation}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block align-middle ml-2"
                              title="View on map"
                            >
                              <span className="font-bold text-[#FF7401]"><MapPin className="inline-block" size={15} /> View on Map </span>
                            </a>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-black disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded ${page === currentPage
                      ? "bg-orange-500 text-white font-bold"
                      : "bg-gray-200 text-black"
                      }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-black disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div >
      <Footer />
    </>
  );
};

export default MyOrder;
