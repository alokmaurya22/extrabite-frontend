import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import useGeolocation from "../util/useGeolocation";
import { useLoading } from "../context/LoadingContext";

const DonationForm = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { latitude, longitude, address, loading: locationLoading } = useGeolocation();

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    quantity: "",
    expiryDate: "", // separate date
    expiryTime: "", // separate time
    expiryDateTime: "", // keep for compatibility
    isFree: true,
    price: "",
    location: "",
    geolocation: "",
    deliveryType: "SELF_PICKUP",
    foodType: "PRECOOKED",
    refrigerationAvailable: false,
  });

  useEffect(() => {
    if (!locationLoading) {
      setFormData((prev) => ({
        ...prev,
        location: prev.location || address || "",
        geolocation: latitude && longitude ? `${latitude},${longitude}` : "",
      }));
    }
  }, [address, latitude, longitude, locationLoading]);

  const extractPinCode = (address) => {
    const match = address && address.match(/\b\d{6}\b/);
    return match ? match[0] : null;
  };

  // Helper to get min date for expiry (today)
  const getMinDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper to get current local date and time in ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
  const getLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;
    if (type === "checkbox") val = checked;
    if (name === "isFree") val = value === "true";
    if (name === "refrigerationAvailable") val = value === "true";
    if (name === "foodType") {
      setFormData((prev) => ({ ...prev, refrigerationAvailable: false }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: val,
      ...(name === "isFree" && { price: val ? "" : prev.price }),
    }));
    if (name === "location") setErrorMsg("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const uploadToCloudinary = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      form
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true); // Show global loading

    // Compose expiryDateTime from date and time (24hr)
    let expiryDateTime = "";
    if (formData.expiryDate && formData.expiryTime) {
      // Always set seconds to 00
      const [h, m] = formData.expiryTime.split(":");
      expiryDateTime = `${formData.expiryDate}T${h}:${m}:00`;
    }

    // Basic validation
    if (
      !formData.foodName ||
      !formData.description ||
      !formData.quantity ||
      !formData.expiryDate ||
      !formData.expiryTime ||
      !formData.location ||
      !formData.foodType
    ) {
      setErrorMsg("Please fill all required fields.");
      setLoading(false);
      return;
    }

    // Prevent expiry in the past
    if (expiryDateTime && new Date(expiryDateTime) < new Date()) {
      setErrorMsg("Expiry time cannot be in the past.");
      setLoading(false);
      return;
    }

    if (!extractPinCode(formData.location)) {
      setErrorMsg("A valid 6-digit pin code is required in the Pickup Address.");
      setLoading(false);
      return;
    }

    if (!formData.isFree && (!formData.price || parseFloat(formData.price) <= 0)) {
      setErrorMsg("Please enter a valid price greater than 0 for paid food.");
      setLoading(false);
      return;
    }

    if (
      formData.foodType === "PRECOOKED" &&
      typeof formData.refrigerationAvailable !== "boolean"
    ) {
      setErrorMsg("Please specify refrigeration availability for precooked food.");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Login required");
        navigate("/signin");
        return;
      }

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // Set createdDateTime to current local date and time in ISO 8601 format
      const createdDateTime = getLocalDateTime();

      const payload = {
        foodName: formData.foodName,
        description: formData.description,
        quantity: formData.quantity,
        expiryDateTime: expiryDateTime, // always 24hr format
        free: formData.isFree,
        price: formData.isFree ? 0 : parseFloat(formData.price),
        location: formData.location,
        geolocation: formData.geolocation,
        deliveryType: formData.deliveryType,
        foodType: formData.foodType,
        refrigerationAvailable:
          formData.foodType === "PRECOOKED" ? formData.refrigerationAvailable : undefined,
        imageUrl: imageUrl || undefined,
        createdDateTime: createdDateTime,
      };
      //console.log(payload);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/donations`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      });

      alert("Donation submitted successfully!");
      navigate("/home2");
    } catch (err) {
      console.error("Error submitting donation:", err.response?.data || err);
      alert("Donation failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false); // Hide global loading
    }
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />

        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Donate Food</h1>
          <div className="w-full border-t-2 border-[#FF7401] mt-1"></div>
        </div>

        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md"
          >
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
              Donor Detail
            </h2>

            {/* Food Name */}
            <div className="mx-7">
              <input
                name="foodName"
                type="text"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="Food Name"
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            {/* Image Upload */}
            <div className="mx-7 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload or Capture Food Image
              </label>
              <button
                type="button"
                onClick={handleImageButtonClick}
                className="w-full bg-[#FF7401] text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600"
              >
                Choose / Capture Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 rounded-md w-full max-h-52 object-cover"
                />
              )}
            </div>

            {/* Description */}
            <div className="mx-7">
              <input
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            {/* Quantity */}
            <div className="mx-7">
              <input
                name="quantity"
                type="text"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g., 2 plates)"
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            {/* Expiry Date & Time (with AM/PM) */}
            <div className="mx-7 mb-1">
              <label className="text-sm text-gray-700 font-medium">
                Select expiry date and time:
              </label>
            </div>
            <div className="mx-7 flex gap-2 mb-4">
              <input
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                min={getMinDate()}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 outline-none w-1/2"
              />
              <input
                name="expiryTime"
                type="time"
                value={formData.expiryTime}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 outline-none w-1/3"
                step="60"
              />
            </div>

            {/* Is Free */}
            <div className="mx-7 my-4">
              <label className="block mb-1">Is the food free?</label>
              <select
                name="isFree"
                value={formData.isFree}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value={true}>Yes (Free)</option>
                {/* <option value={false}>No (Paid)</option>*/}
              </select>
            </div>

            {/* Price */}
            {!formData.isFree && (
              <div className="mx-7">
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
                />
              </div>
            )}

            {/* Food Type */}
            <div className="mx-7 mb-4">
              <label className="block mb-1">Food Type</label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value="PRECOOKED">Pre-cooked</option>
                <option value="RAW">Raw</option>
              </select>
            </div>

            {/* Refrigeration */}
            {formData.foodType === "PRECOOKED" && (
              <div className="mx-7 mb-4">
                <label className="block mb-1">Refrigeration Available?</label>
                <select
                  name="refrigerationAvailable"
                  value={formData.refrigerationAvailable}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            )}

            {/* Location */}
            <div className="mx-7">
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Pickup Address"
                required
                className={`w-full border rounded-lg p-3 mb-4 outline-none ${extractPinCode(formData.location)
                  ? "border-gray-300"
                  : "border-red-500 ring-2 ring-red-500"
                  }`}
              />
            </div>

            {!extractPinCode(formData.location) && (
              <div className="text-red-600 mb-2 text-sm">
                A valid 6-digit pin code is required.
              </div>
            )}
            {errorMsg && (
              <div className="text-red-600 mb-2 text-sm">{errorMsg}</div>
            )}

            {/* Geolocation */}
            <div className="mx-7">
              <input
                name="geolocation"
                type="text"
                value={locationLoading ? "Detecting location..." : formData.geolocation}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            {/* Delivery Type */}
            <div className="mx-7 mb-4">
              <label className="block mb-1">Delivery Type</label>
              <select
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value="SELF_PICKUP">Self Pickup</option>
                {/*<option value="DELIVERY_PARTNER">Delivery Partner</option>*/}
                {/*<option value="ANY">Any</option>*/}
              </select>
            </div>

            {/* Submit */}
            <div className="mx-7 mt-6">
              <button
                type="submit"
                className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DonationForm;
