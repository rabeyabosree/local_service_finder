import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authProfile, updateProfile } from "../../../redux/reducers/authReducer";

function EditCustomer() {
  const dispatch = useDispatch();
  const { profileData, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    phone: "",
    avatar: "",
  });

  // 🔹 Load current profile data into the form
  useEffect(() => {
    dispatch(authProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        location: profileData.location || "",
        bio: profileData.bio || "",
        phone: profileData.phone || "",
        avatar: profileData.avatar || "",
      });
    }
  }, [profileData]);

  // 🔸 Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📝 Submit Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      alert("✅ Profile updated successfully!");
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        // onClick={onClose}
      ></div>

      {/* Edit Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center border-b pb-3">
          ✏️ Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Preview Avatar */}
          {formData.avatar && (
            <div className="flex justify-center mt-2">
              <img
                src={formData.avatar}
                alt="avatar preview"
                className="w-20 h-20 rounded-full object-cover border"
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
            //   onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
