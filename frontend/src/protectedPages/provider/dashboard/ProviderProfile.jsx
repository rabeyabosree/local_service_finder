import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authProfile } from "../../../redux/reducers/authReducer";

function ProviderProfile() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const dispatch = useDispatch();

 
// fetch procider profile
  useEffect(() => {
    const profileInfo = async () => {
      try {
        const res = await dispatch(authProfile()).unwrap();
        setProvider(res.user);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };
    profileInfo();
  }, [dispatch]);

  if (!provider) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={provider?.avatar || "/default-avatar.png"}
            alt={provider?.name || "Provider Avatar"}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {provider?.name}
            </h2>
            <p className="text-gray-600">{provider?.service
            }</p>
            <p className="text-yellow-500 mt-1">⭐ {provider?.rating} / 5</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{provider?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{provider?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{provider?.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Jobs:</span>
            <span>{provider?.totalJobs}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">{provider?.availability}</p>
        </div>

        <div className="mt-6 text-center sm:text-right">
          <button
            onClick={() => navigate("/dashboard/profile/edit")}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProviderProfile;
