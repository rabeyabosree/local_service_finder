import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populerService } from "../../redux/reducers/serviceReducer";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LocateIcon } from "lucide-react";

function PopulerServices() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { populerServices = [] } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(populerService());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-8 py-12 bg-amber-50">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Popular Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {populerServices.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No services available
          </p>
        ) : (
          populerServices.map((service) => (
            <div
              key={service._id}
              onClick={() => navigate(`/service/${service._id}`)}
              className="bg-white my-6 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {/* IMAGE */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover rounded hover:scale-105 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">

                {/* TITLE */}
                <h3 className="text-md font-medium text-gray-800 line-clamp-1">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 line-clamp-2">
                  {service.description}
                </p>

                {/* LOCATION */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <LocateIcon size={14} />
                  <span>{service.location}</span>
                </div>

                {/* PROVIDER + RATING */}
                <div className="flex items-center justify-between pt-2">

                  <div className="flex items-center gap-2">
                    <img
                      src={service?.provider?.avatar}
                      className="w-6 h-6 rounded-full"
                      alt=""
                    />
                    <span className="text-xs text-gray-600 truncate max-w-[80px]">
                      {service?.provider?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <FaStar />
                    <span className="text-gray-700">
                      {service.averageRating || 0}
                    </span>
                  </div>
                </div>

                {/* PRICE + BUTTON */}
                <div className="flex items-center justify-between pt-3">

                  <span className="text-sm font-semibold text-green-600">
                    ৳{service.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/message", { state: { service } });
                    }}
                    className="text-xs px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Message
                  </button>

                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default PopulerServices;