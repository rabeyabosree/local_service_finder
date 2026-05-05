import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleService } from "../../redux/reducers/serviceReducer";
import { fetchTestimonials } from "../../redux/reducers/testimonalReducer";
import { createConversation } from "../../redux/reducers/chatReducer";
import AddTestimonals from "../../protectedPages/customer/review/AddTestimonals";


import {
  Star,
  MapPin,
  Clock,
  MessageCircle,
  CalendarCheck,
  User,
} from "lucide-react";
import { addBooking } from "../../redux/reducers/bookingReducer";

function SingleService() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { singleService, loading, error } = useSelector(
    (state) => state.service
  );

  const { testimonials = [] } = useSelector((state) => state.testimonals);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService(id));
      dispatch(fetchTestimonials(id));
    }
  }, [dispatch, id]);

  // avg rating
  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) /
      testimonials.length
      : 0;

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!singleService) return null;

  // naviaget message 
  const handleMessage = async () => {
    if (!user?._id) return alert("Please login first");

    const res = await dispatch(
      createConversation({
        customerId: user._id,
        providerId: singleService?.provider?._id,
      })
    );

    navigate("/message", {
      state: {
        service: singleService,
        conversation: res?.payload?.conversation,
      },
    });
  };

  // handle booking 
  const handleBooking = () => {
    const data = {
      serviceId: singleService._id,
      name: singleService.title,
      provider: singleService.provider,
      location: singleService.location,
      price: singleService.price,
      serviceType :singleService.title
    }

    dispatch(addBooking(data));
    navigate("/booking")

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-violet-50 py-10 px-4">

      <div className="max-w-4xl mx-auto space-y-10">

        {/*service*/}
        <div className="grid md:grid-cols-2 gap-8">

          {/* img */}
          <div className="bg-violet-50 rounded-2xl overflow-hidden">
            <img
              src={singleService?.image || "/no-image.png"}
              className="w-full h-72 object-cover"
              alt=""
            />
          </div>

          {/* info */}
          <div className="space-y-5">

            {/* provider */}
            <div className="flex items-center gap-3">
              <img
                src={singleService?.provider?.avatar || "/user.png"}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {singleService?.provider?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {singleService?.provider?.email}
                </p>
              </div>
            </div>

            {/* title */}
            <h1 className="text-xl font-semibold text-gray-800">
              {singleService?.title}
            </h1>

            <p className="text-sm text-violet-600 font-medium">
              {singleService?.category}
            </p>

            <p className="text-sm text-gray-600">
              {singleService?.description}
            </p>

            {/* details */}
            <div className="bg-yellow-50 p-3 rounded-lg text-sm text-gray-600 space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-500" />
                {singleService?.location}
              </p>

              <p className="flex items-center gap-2">
                <Clock size={16} className="text-yellow-500" />
                {singleService?.availability}
              </p>
            </div>

            {/*price and rating */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-lg font-bold text-violet-700">
                ৳{singleService?.price}
              </p>
            </div>

            {/* actions btn */}
            <div className="flex gap-3">
              <button
                onClick={handleBooking}
                className="flex-1 bg-violet-600 text-white py-2.5 rounded-lg text-sm hover:bg-violet-700 transition"
              >
                Book
              </button>

              <button
                onClick={handleMessage}
                className="flex-1 bg-yellow-400 text-white py-2.5 rounded-lg text-sm hover:bg-yellow-500 transition"
              >
                Message
              </button>
            </div>

          </div>
        </div>

        {/* review section */}
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Reviews
          </h3>

          <AddTestimonals id={id} />
        </div>

      </div>
    </div>
  );
}

export default SingleService;