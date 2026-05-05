import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authProfile } from "../../../redux/reducers/authReducer";
import { FiEdit2 } from "react-icons/fi"; // ✏️ Edit Icon
import EditCustomer from "./EditCustomer";

function CustomerDashboard({ onClose }) {
  const dispatch = useDispatch();
  const [editComponent, SetEditComponent] = useState(false)
  const { profileData, loading } = useSelector((state) => state.auth);

  // fetxh profile data 
  useEffect(() => {
    dispatch(authProfile());
  }, [dispatch]);

  // profile data check
  if (loading || !profileData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 text-center">
          <p className="text-lg font-semibold text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* dashboard content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>

          {/* edit profile icon */}
          <button
            onClick={() => SetEditComponent(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Edit Profile"
          >
            <FiEdit2 className="text-gray-700 text-xl" />
          </button>

        </div>
        {
          editComponent && <EditCustomer />
        }

        {/* profile secton */}
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={profileData.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
          />
          <h2 className="text-xl font-semibold">{profileData.name}</h2>
          <p className="text-gray-600">{profileData.email}</p>
        </div>

        {/* additional info */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">Location:</span>
            <span className="text-gray-600">
              {profileData.location || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-800">Joined:</span>
            <span className="text-gray-600">
              {new Date(profileData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* close btn*/}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
