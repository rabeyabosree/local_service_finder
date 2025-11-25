import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleService, editService } from "../../../redux/reducers/serviceReducer";

function ServiceEdit() {
  const [serviceData, setServiceData] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
    location: "",
    price: "",
    availability: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleService, loading, error } = useSelector((state) => state.service || {});

  // Pre-fill form state
  useEffect(() => {
    if (!singleService || singleService._id !== id) {
      dispatch(fetchSingleService(id))
        .unwrap()
        .then(res => {
          setServiceData({
            title: res.title || "",
            image: res.image || "",
            category: res.category || "",
            description: res.description || "",
            location: res.location || "",
            price: res.price || "",
            availability: res.availability || "",
          });
        })
        .catch(err => console.error(err));
    } else {
      setServiceData({
        title: singleService.title || "",
        image: singleService.image || "",
        category: singleService.category || "",
        description: singleService.description || "",
        location: singleService.location || "",
        price: singleService.price || "",
        availability: singleService.availability || "",
      });
    }
  }, [dispatch, id, singleService]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editService({ id, serviceData })).unwrap();
      alert("Service updated successfully!");
      navigate(`/dashboard/service/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update service.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
        <p className="mt-3 text-gray-600">Loading service...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
         {error || "Failed to load service."}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={serviceData.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={serviceData.image}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {serviceData.image && (
            <img
              src={serviceData.image}
              alt="Preview"
              className="mt-2 rounded-md w-full h-48 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={serviceData.category}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={serviceData.location}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={serviceData.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Availability (hours)</label>
            <input
              type="number"
              name="availability"
              value={serviceData.availability}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Update Service
        </button>
      </form>
    </div>
  );
}

export default ServiceEdit;
