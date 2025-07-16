import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import { MapPin } from "lucide-react";

const BrowseDonations = () => {
  const [donations, setDonations] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    foodName: "",
    location: "",
    foodType: "",
    sort: "EXPIRED_FIRST", // Default to Expired First
  });
  const [timerTick, setTimerTick] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 donations per page

  const navigate = useNavigate();
  const removalScheduledRef = useRef(new Set());

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/browse/donations`,
        {
          headers: {
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const now = new Date();

      const availableOnly = response.data
        .filter((d) => d.status === "AVAILABLE")
        .map((item) => {
          let countdownTime = item.countdownTime;

          if (item.foodType !== "RAW" && item.createdAt) {
            const createdAt = new Date(item.createdAt);
            const expiryTime = new Date(createdAt.getTime() + 4 * 60 * 60 * 1000);
            countdownTime = Math.max(Math.floor((expiryTime - now) / 1000), 0);
          }

          return {
            ...item,
            countdownTime,
          };
        })
        .sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)); // Sort by newest first

      setDonations(availableOnly);
      setAllResults(availableOnly);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = [...allResults];

    if (filters.foodName) {
      filtered = filtered.filter((item) =>
        item.foodName.toLowerCase().includes(filters.foodName.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.foodType) {
      filtered = filtered.filter((item) => item.foodType === filters.foodType);
    }

    // Calculate time left for sorting
    const getTimeLeft = (item) => {
      if (item.foodType === 'RAW' && item.expiryDateTime) {
        return Math.floor((new Date(item.expiryDateTime) - Date.now()) / 1000);
      } else if (item.foodType === 'PRECOOKED' && item.timer) {
        const created = new Date(item.createdDateTime).getTime();
        const now = Date.now();
        const passedTime = Math.floor((now - created) / 1000);
        return (item.countdownTime || 0) - passedTime;
      }
      return Infinity;
    };

    if (filters.sort === "EXPIRED_FIRST") {
      // Expired at top, then soonest-to-expire
      filtered.sort((a, b) => {
        const aLeft = getTimeLeft(a);
        const bLeft = getTimeLeft(b);
        if (aLeft <= 0 && bLeft > 0) return -1;
        if (aLeft > 0 && bLeft <= 0) return 1;
        return aLeft - bLeft;
      });
    } else if (filters.sort === "OLDEST_FIRST") {
      filtered.sort((a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime));
    } else if (filters.sort === "RECENT_FIRST") {
      filtered.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
    }
    setDonations(filtered);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [filters, allResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerTick(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const paginatedDonations = donations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // For each donation, if expired and not already scheduled, schedule removal
    paginatedDonations.forEach((item) => {
      let timerCountLeft = null;
      let apiUrl = null;
      if (item.foodType === 'RAW' && item.expiryDateTime) {
        timerCountLeft = Math.floor((new Date(item.expiryDateTime) - timerTick) / 1000);
        /* 
          if (timerCountLeft <= 0) {
            apiUrl = `${import.meta.env.VITE_API_BASE_URL}/donations/${item.id}/expire-by-expiry-time`;
          }
        */
      } else if (item.foodType === 'PRECOOKED' && item.timer) {
        const created = new Date(item.createdDateTime).getTime();
        const now = timerTick;
        const passedTime = Math.floor((now - created) / 1000); // seconds
        timerCountLeft = (item.countdownTime || 0) - passedTime;
        /*
          if (timerCountLeft <= 0) {
            apiUrl = `${import.meta.env.VITE_API_BASE_URL}/donations/${item.id}/reject-by-platform`;
          }
        */
      }
      if (apiUrl && !removalScheduledRef.current.has(item.id)) {
        removalScheduledRef.current.add(item.id);
        setTimeout(() => {
          axios.post(
            apiUrl,
            {},
            {
              headers: {
                "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
              },
            }
          ).catch((err) => {
            console.error("Failed to auto-remove expired donation", item.id, err);
          });
        }, 60000); // 1 minute = 60000 ms
      }
    });
  }, [paginatedDonations, timerTick]);

  const getFilterSummary = () => {
    const type = filters.foodType || "All";
    return `Showing: ${type} Donations`;
  };

  const formatCountdown = (seconds) => {
    if (!seconds || seconds <= 0) return "Expired";
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white font-sans">
        <Nav2 />
        <div className="px-4 sm:px-10 pt-10">
          <h1 className="text-3xl font-bold text-[#FF7401] mb-2 text-center">
            Available Donations
          </h1>

          <p className="text-sm text-center text-gray-300 mb-4">{getFilterSummary()}</p>

          <div className="bg-white rounded-xl p-6 mb-8 shadow-2xl max-w-5xl mx-auto text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Food Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.foodName}
                onChange={(e) => setFilters({ ...filters, foodName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <select
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.foodType}
                onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="PRECOOKED">Pre-cooked</option>
                <option value="RAW">Raw</option>
              </select>
              <select
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              >
                <option value="EXPIRED_FIRST">Expired First (Default)</option>
                <option value="OLDEST_FIRST">Oldest First</option>
                <option value="RECENT_FIRST">Recent First</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 pb-20">
            {loading ? (
              <p className="text-center col-span-full text-gray-300">Loading donations...</p>
            ) : donations.length === 0 ? (
              <p className="text-center col-span-full text-gray-300">No donations found.</p>
            ) : (
              paginatedDonations.map((item, index) => {
                // Calculate remaining time for countdown
                let timerCountLeft = null;
                let timerLabel = '';
                if (item.foodType === 'RAW' && item.expiryDateTime) {
                  // RAW: use expiryDateTime
                  timerCountLeft = Math.floor((new Date(item.expiryDateTime) - timerTick) / 1000);
                  timerLabel = 'Available for :';
                } else if (item.foodType === 'PRECOOKED' && item.timer) {
                  // PRECOOKED: use countdownTime logic
                  const created = new Date(item.createdDateTime).getTime();
                  const now = timerTick;
                  const passedTime = Math.floor((now - created) / 1000); // seconds
                  timerCountLeft = (item.countdownTime || 0) - passedTime;
                  timerLabel = 'Expiring in :';
                }
                // console.log(item);
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/request-donation/${item.id}`)}
                    className="bg-white text-black rounded-2xl shadow-xl p-5 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer relative"
                  >
                    {((item.foodType === 'RAW' && item.expiryDateTime) || (item.foodType === 'PRECOOKED' && item.timer)) && (
                      <div className="absolute top-4 right-3 z-10">
                        {timerCountLeft > 0 ? (
                          <span className="bg-gray-200 text-red-600 text-sm font-bold px-3 py-1 mx-2 my-4 rounded-full shadow">
                            {timerLabel} {formatCountdown(timerCountLeft)}
                          </span>
                        ) : (
                          <span className="bg-gray-200 text-red-600 text-sm font-bold px-3 py-1 mx-2 my-4 rounded-full shadow">
                            Expired
                          </span>
                        )}
                      </div>
                    )}
                    <img
                      src={item.imageUrl}
                      alt={item.foodName}
                      className="rounded-lg w-full h-40 object-cover mb-4"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-[#FF7401]">{item.foodName}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${item.foodType === "RAW"
                          ? "bg-green-200 text-green-800"
                          : "bg-blue-200 text-blue-800"
                          }`}
                      >
                        {item.foodType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{item.description}</p>
                    <p className="text-sm">
                      Quantity: <span className="font-semibold">{item.quantity}</span>
                    </p>
                    <p className="text-sm">
                      Free:{" "}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${item.isFree === true || item.price === 0 || item.price === null || item.price === undefined
                          ? "bg-green-200 text-green-800"
                          : "bg-blue-200 text-blue-800"
                          }`}
                      >
                        {item.isFree === true || item.price === 0 || item.price === null || item.price === undefined ? "Yes" : "No"}
                      </span>
                    </p>
                    {!item.isFree && item.price > 0 && (
                      <p className="text-sm">
                        Price: <span className="font-semibold">₹{item.price}</span>
                      </p>
                    )}
                    <p className="text-sm">
                      Location: <span className="font-semibold">{item.location}</span><a
                        href={`https://www.google.com/maps?q=${item.geolocation}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block align-middle ml-2"
                        title="View on map"
                      >
                        <span className="font-bold text-[#FF7401]"><MapPin className="inline-block" size={15} /> View on Map </span>
                      </a>
                    </p>
                    <p className="text-sm">
                      Delivery: <span className="font-semibold">{item.deliveryType}</span>
                    </p>
                    <p className="text-sm">
                      Donor: <span className="font-semibold">{item.donorName}</span>
                    </p>
                    <p className="text-sm">
                      Refrigerated:{" "}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${item.refrigerationAvailable === true
                          ? "bg-green-200 text-green-800"
                          : "bg-blue-200 text-blue-800"
                          }`}
                      >
                        {item.refrigerationAvailable === true ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                );
              })
            )}
          </div>
          {/* Pagination Controls */}
          {!loading && donations.length > itemsPerPage && (
            <div className="flex justify-center items-center space-x-2 my-6 flex-wrap overflow-x-auto max-w-full px-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded mb-2 ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
              >
                Previous
              </button>
              <div className="flex flex-row flex-wrap gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded mb-2 ${currentPage === i + 1 ? 'bg-orange-700 text-white' : 'bg-gray-200 text-black hover:bg-orange-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded mb-2 ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BrowseDonations;
