import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Nav2 from '../components/Header/Nav2';
import { getUserProfile, updateUserProfile } from '../util/api';
import { resetPassword } from '../util/api';
import { useNavigate, } from 'react-router-dom';

function EditProfile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    location: '',
    address: '',
    alternateContact: '',
    displayPictureUrl: '',
    profileActive: true,
  });
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    showOldPassword: false,
    showNewPassword: false,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile({
          fullName: data.fullName || '',
          email: data.email || '',
          contactNumber: data.contactNumber || '',
          location: data.location || '',
          address: data.userData?.address || '',
          alternateContact: data.userData?.alternateContact || '',
          displayPictureUrl: data.userData?.displayPictureUrl || '',
          profileActive: data.profileActive,
        });
      } catch (err) {
        console.error('❌ Failed to fetch profile:', err);
        alert('Failed to load profile. Please log in again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    setUploading(true);
    setUploadSuccess(false);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.secure_url) {
        setProfile((prev) => ({ ...prev, displayPictureUrl: data.secure_url }));
        console.log(data.secure_url);

        await updateUserProfile({
          ...profile,
          displayPictureUrl: data.secure_url,
        });

        setUploadSuccess(true);
      } else {
        console.error("Cloudinary upload error:", data);
        alert("Image upload failed. Check your Cloudinary preset.");
      }
    } catch (err) {
      console.error('❌ Image upload failed:', err);
      alert('Image upload failed. Please try again.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        fullName: profile.fullName,
        contactNumber: profile.contactNumber,
        location: profile.location,
        address: profile.address,
        alternateContact: profile.alternateContact,
        displayPictureUrl: profile.displayPictureUrl,
        profileActive: profile.profileActive,
      };

      await updateUserProfile(updateData);
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('❌ Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email: profile.email,
        contactNumber: profile.contactNumber,
        newPassword: passwordData.newPassword,
      };
      await resetPassword(body);
      alert('✅ Password updated successfully!');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        showOldPassword: false,
        showNewPassword: false,
      });
    } catch (err) {
      console.error('❌ Failed to change password:', err);
      alert('Failed to change password. Please try again.');
    }
  };

  //console.log("DP:",profile.displayPictureUrl);
  // console.log(profile);

  return (
    <>
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col justify-between">
        <Nav2 />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
              Edit Your Profile
            </h1>
            <a
              href="/dashboard"
              className="bg-[#FF7401] text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Go to Dashboard
            </a>
          </div>
          <div className="w-full border-t-2 border-[#E87730] mt-2"></div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-10 px-10 py-12">
          {/* Profile Preview */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3 text-center">
            <img
              src={profile.displayPictureUrl ? profile.displayPictureUrl : `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.email}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />

            <div className="relative inline-block">
              <label htmlFor="imageUpload" className="bg-[#FF7401] text-white px-4 py-2 rounded-lg cursor-pointer font-semibold hover:bg-orange-600 transition">
                Choose Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                id="imageUpload"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {uploading && <p className="text-xs mt-2 text-orange-500">Uploading...</p>}
            {uploadSuccess && <p className="text-green-600 mt-2 text-sm font-medium">✅ Profile picture updated!</p>}

            <h2 className="text-xl font-bold mt-4">{profile.fullName}</h2>
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-gray-500">📞 +91 {profile.contactNumber}</p>
            <p className="text-gray-500">📍 {profile.location}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-600">
                Profile Status :
              </span>
              <span className="text-sm text-gray-600 font-semibold">
                {profile.profileActive ? "Active" : "Deactivated"}
              </span>
              <span
                className={`inline-block ml-2 w-3 h-3 rounded-full ${profile.profileActive ? "bg-green-500" : "bg-red-500"
                  }`}
              />
            </div>
          </div>

          {/* Forms */}
          <div className="w-full md:w-2/3 flex flex-col lg:flex-row gap-6">
            {/* Update Details Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#E87730] mb-6 text-center">Update Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  readOnly
                  className="border border-gray-300 rounded-lg p-3 outline-none bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Phone Number"
                  value={profile.contactNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 outline-none"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={profile.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition mt-6"
              >
                Save Changes
              </button>
            </form>

            {/* Change Password Form */}
            <form onSubmit={handlePasswordSubmit} className="bg-white shadow-lg rounded-xl p-6 flex-1">
              <h2 className="text-xl font-bold text-[#E87730] mb-4 text-center">Change Password</h2>
              <div className="relative mb-4">
                <input
                  type={passwordData.showOldPassword ? 'text' : 'password'}
                  name="oldPassword"
                  placeholder="Old Password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="border border-gray-300 rounded-lg p-3 outline-none w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-sm text-gray-500"
                  onClick={() => toggleVisibility('showOldPassword')}
                >
                  {passwordData.showOldPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative mb-4">
                <input
                  type={passwordData.showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="border border-gray-300 rounded-lg p-3 outline-none w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-sm text-gray-500"
                  onClick={() => toggleVisibility('showNewPassword')}
                >
                  {passwordData.showNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <button
                type="submit"
                className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default EditProfile;