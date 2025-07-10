// src/pages/UserDirectory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import Nav2 from '../components/Header/Nav2';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [profileActive, setProfileActive] = useState(true);

  const fetchUsers = async () => {
    try {
      const params = {};
      if (role) params.role = role;
      if (location) params.location = location;
      if (profileActive !== null) params.profileActive = profileActive;

      const response = await axios.get(`${BASE_URL}/directory/users/search`, {
        params,
        headers: {
          'EXTRABITE-API-KEY': API_KEY,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to load user data.');
    }
  };

  // 🔁 Auto-fetch on filter changes
  useEffect(() => {
    fetchUsers();
  }, [role, location, profileActive]);

  return (
    <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
      <Nav2 />

      <div className="px-6 py-10 text-white flex-grow">
        <h1 className="text-2xl font-bold mb-6">User Directory</h1>

        <div className="bg-white p-4 rounded-lg shadow-md text-black flex flex-wrap gap-4 mb-8">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="DONOR">Donor</option>
            <option value="RECEIVER">Receiver</option>
            <option value="VOLUNTEER">Volunteer</option>
            <option value="ADMIN">Admin</option>
          </select>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="p-2 border border-gray-300 rounded-lg"
          />

          <select
            value={String(profileActive)}
            onChange={(e) => setProfileActive(e.target.value === 'true')}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow p-4 text-black"
            >
              <img
                src={user.userData?.displayPictureUrl || 'https://via.placeholder.com/100'}
                alt={user.fullName}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{user.fullName}</h2>
              <p className="text-center text-gray-600">{user.email}</p>
              <p className="text-center text-gray-600">📞 {user.contactNumber}</p>
              <p className="text-center text-gray-600">📍 {user.location}</p>
              <p className="text-center text-sm text-gray-500">Role: {user.role}</p>
              <p className="text-center text-sm text-gray-500">
                {user.profileActive ? '✅ Active' : '❌ Inactive'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDirectory;
