import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleService, deleteService } from "../../../redux/reducers/serviceReducer";
import { FaMapMarkerAlt } from "react-icons/fa";

function ServiceDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged-in user info from auth state
  const { user } = useSelector((state) => state.auth); // assume auth slice exists
  const { singleService, loading, error } = useSelector((state) => state.service || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService(id)).catch((err) =>
        console.error("Failed to fetch service:", err)
      );
    }
  }, [dispatch, id]);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
        <p className="mt-3 text-gray-600">Loading service details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-20">
        ❌ {error || "Failed to load service details."}
      </div>
    );
  }

  if (!singleService) {
    return (
      <div className="text-center text-gray-600 py-20">Service not found.</div>
    );
  }

  // Check if logged-in user is the provider
  const isProvider = user?._id === singleService.provider?._id;

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="h-80 bg-gray-200">
          <img
            src={singleService.image || "https://via.placeholder.com/800x500"}
            alt={singleService.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {singleService.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-green-600" />
            <span>{singleService.location}</span>
          </div>

          <p className="text-gray-700 mb-4">{singleService.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="font-semibold text-gray-800">Price:</span>{" "}
              ৳{singleService.price}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Availability:</span>{" "}
              {singleService.availability} hours
            </div>
          </div>

          {singleService.provider && (
            <div className="mb-4 text-gray-600">
              <span className="font-semibold text-gray-800">Provider:</span>{" "}
              {singleService.provider.name || "Unknown"}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-6 gap-3 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>

            
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;
