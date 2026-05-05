import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authProfile, updateProfile } from "../../../redux/reducers/authReducer";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    phone: "",
    location: "",
    availability: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const dispatch = useDispatch();

  // fetch profile data and set into formdata
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await dispatch(authProfile()).unwrap();

        setFormData({
          name: res.user.name || "",
          email: res.user.email || "",
          service: res.user.service || "",
          phone: res.user.phone || "",
          location: res.user.location || "",
          availability: res.user.availability || "",
          avatar: res.user.avatar || "",
        });
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // file change
  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("service", formData.service);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      data.append("availability", formData.availability);
      if (avatarFile) data.append("avatar", avatarFile);

      const updated = await dispatch(updateProfile(data)).unwrap();

      // update formdata state
      setFormData({
        name: updated.user.name || "",
        email: updated.user.email || "",
        service: updated.user.service || "",
        phone: updated.user.phone || "",
        location: updated.user.location || "",
        availability: updated.user.availability || "",
        avatar: updated.user.avatar || "",
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Profile update failed.");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Edit Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mb-2 border border-gray-200"
          />
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="text-sm text-gray-600"
          />
        </div>
        {/* data changes form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            placeholder="Service Type"
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Availability"
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;



