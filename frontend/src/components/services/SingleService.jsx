import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleService } from "../../redux/reducers/serviceReducer";
import AddTestimonals from "../../protectedPages/customer/review/AddTestimonals";
import { fetchTestimonials } from "../../redux/reducers/testimonalReducer";

function SingleService() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleService, loading, error } = useSelector(
    (state) => state.service
  );
  const { testimonials = [] } = useSelector(
    (state) => state.testimonals
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService(id));
      dispatch(fetchTestimonials(id)); // fetch testimonials for this service
    }
  }, [dispatch, id]);

  // Calculate average rating from testimonials
  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0;

  if (loading) return <div className="text-center py-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!singleService) return <div className="text-center py-20">No service found</div>;

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Image */}
          <div className="flex items-center justify-center bg-gradient-to-br from-violet-100 to-violet-200">
            <img
              src={singleService?.image}
              alt={singleService?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Info */}
          <div className="p-8">
            {/* Provider Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={singleService?.provider?.avatar}
                alt="provider"
                className="h-12 w-12 rounded-full object-cover border"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{singleService?.provider?.name}</h2>
                <p className="text-sm text-gray-500">{singleService?.provider?.email}</p>
              </div>
            </div>

            {/* Service Info */}
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{singleService?.title}</h1>
            <p className="text-violet-600 font-medium text-lg mb-4">{singleService?.category}</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{singleService?.description}</p>

            {/* Details */}
            <div className="space-y-2 text-gray-700 mb-6">
              <p>
                <span className="font-semibold">📍 Location:</span> {singleService?.location}
              </p>
              <p>
                <span className="font-semibold">🕓 Availability:</span> {singleService?.availability}
              </p>
            </div>

            {/* Rating + Price */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-violet-700">${singleService?.price}</p>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate("/booking", { state: singleService })}
              className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-violet-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="px-6 py-8 mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>
          <AddTestimonals id={id} />
        </div>
      </div>
    </div>
  );
}

export default SingleService;



