import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../../redux/reducers/serviceReducer";


function AddService() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service || {});
  
  // service data state
  const [serviceData, setServiceData] = useState({
    title: "",
    image: null,
    category: "",
    description: "",
    location: "",
    price: "",
    availability: "",
  });

  // categories
  const categories = ["Plumber", "Electrician", "Tutor", "Cleaner", "Other"];

  // handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  //  handle img upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServiceData((prev) => ({ ...prev, image: file }));
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form data
    const formData = new FormData();
    formData.append("title", serviceData.title);
    formData.append("category", serviceData.category);
    formData.append("description", serviceData.description);
    formData.append("location", serviceData.location);
    formData.append("price", serviceData.price);
    formData.append("availability", serviceData.availability);
    if (serviceData.image) {
      formData.append("image", serviceData.image);
    }

    // dispatch
    dispatch(addService(formData));
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="p-8 w-full max-w-2xl ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 ">
          {/* ttile */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              placeholder="Enter service title"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {/* img */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Service Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border px-3 py-2 rounded-md"
            />
            {serviceData.image && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={URL.createObjectURL(serviceData.image)}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="text-sm text-gray-600 truncate">
                  📎 {serviceData.image.name}
                </p>
              </div>
            )}
          </div>

          {/*category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Category
            </label>
            <select
              name="category"
              value={serviceData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/*description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              placeholder="Write short description..."
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            ></textarea>
          </div>

          {/* lcoation*/}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={serviceData.location}
              onChange={handleChange}
              placeholder="e.g. Dhanmondi, Dhaka"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {/* availabiity */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Availability (in hours)
            </label>
            <input
              type="number"
              name="availability"
              value={serviceData.availability}
              onChange={handleChange}
              placeholder="Enter time"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {/* price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Price (৳)
            </label>
            <input
              type="number"
              name="price"
              value={serviceData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {/* submit */}
          <div className="text-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-500 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Service"}
            </button>
          </div>

          {/* alert handling */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddService;


