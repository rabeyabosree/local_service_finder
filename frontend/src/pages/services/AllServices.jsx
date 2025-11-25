import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllService } from "../../redux/reducers/serviceReducer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AllServices() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services = [], loading, error } = useSelector(
    (state) => state.service || {}
  );

  // Fetch all services
  useEffect(() => {
    dispatch(fetchAllService())
      .unwrap()
      .catch((err) => console.error("Failed to fetch services:", err));
  }, [dispatch]);

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            All <span className="text-green-600">Services</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Browse through all our available services. Find exactly what you need, with trusted providers near you.
          </p>
        </div>

        {/* Services Grid */}
        {!loading && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                onClick={() => navigate(`/service/${service._id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="h-48 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Service Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {service.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FaMapMarkerAlt className="mr-1 text-green-600" />
                    <span className="line-clamp-1">{service.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                    {service.description}
                  </p>
                  <div className="mt-3 text-green-600 font-semibold text-lg">
                    ৳{service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading / Error / Empty States */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading services...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-10">
            ❌ {error || "Failed to load services."}
          </div>
        )}

        {!loading && services.length === 0 && !error && (
          <div className="text-center text-gray-600 py-20">
            No services available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}

export default AllServices;
