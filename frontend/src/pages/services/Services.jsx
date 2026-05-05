import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllService } from "../../redux/reducers/serviceReducer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services = [], loading, error } = useSelector(
    (state) => state.service || {}
  );
  // fetch all servics
  useEffect(() => {
    dispatch(fetchAllService())
      .unwrap()
      .catch((err) => console.error("Failed to fetch services:", err));
  }, [dispatch]);

  // slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Featured <span className="text-green-600">Services</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Explore our most popular local services near you, carefully selected
            for quality and reliability.
          </p>
        </div>

        {/* service slider */}
        {!loading && services.length > 0 && (
          <div className="mb-8">
            <Slider {...sliderSettings}>
              {services.slice(0, 6).map((service) => (
                <div key={service._id} className="px-2 sm:px-3">
                  <div
                    onClick={() => navigate(`/service/${service._id}`)}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col h-full"
                  >
                    {/* img */}
                    <div className="h-48 w-full bg-gray-200 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* info */}
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
                </div>
              ))}
            </Slider>

            {/* see more btn */}
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/services")}
                className="text-green-600 font-semibold hover:underline text-lg transition"
              >
                See More →
              </button>
            </div>
          </div>
        )}

        {/* loading and error*/}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading services...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-10">
            {error || "Failed to load services."}
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

export default Services;
