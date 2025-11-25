import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function AddServices() {
    const [serviceData, setServiceData] = useState({
        title: "",
        image: null,
        category: "",
        description: "",
        location: "",
        price: "",
        availability: ""
    });

    const categories = ["Plumber", "Electrician", "Tutor", "Cleaner", "Other"];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setServiceData((prev) => ({ ...prev, image: file }));
    };

     const dispatch = useDispatch();
      // const { loading, error, message } = useSelector((state) => state.service);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 📝 FormData বানাও কারণ image পাঠাতে হবে
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
    
        try {
          const result = await dispatch(addService(formData)).unwrap();
          console.log("✅ Service Added:", result);
          alert(result.message);
    
          // Optional reset
          setServiceData({
            title: "",
            image: null,
            category: "",
            description: "",
            location: "",
            price: "",
            availability: ""
          });
    
        } catch (err) {
          console.error("❌ Failed to add service:", err);
          alert(err);
        }
      };

    return (
        <div className="h-screen bg-gray-50 flex justify-center items-center p-6">
            <div className="p-8 w-full max-w-2xl bg-white shadow rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Service
                </h2>

                <form className="space-y-5">
                    {/* Service Title */}
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

                    {/* Image Upload */}
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
                            <p className="text-sm text-gray-500 mt-1">
                                📎 Selected: {serviceData.image}
                            </p>
                        )}
                    </div>

                    {/* Category */}
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

                    {/* Description */}
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

                    {/* Location */}
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

                    {/* Availability */}
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

                    {/* Price */}
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

                    {/* Submit Button */}
                    <div className="text-end pt-2">
                        <button
                            type="submit"
                            //   disabled={loading}
                            className="px-6 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-500 transition disabled:opacity-50"
                        >
                            {/* {loading ? "Adding..." : "Add Service"} */}add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddServices