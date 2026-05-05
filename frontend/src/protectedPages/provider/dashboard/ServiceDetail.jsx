import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleService,
} from "../../../redux/reducers/serviceReducer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ArrowLeft, User } from "lucide-react";

function ServiceDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { singleService, loading, error } = useSelector(
    (state) => state.service || {}
  );

  // fetch single service
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService(id)).catch((err) =>
        console.error("Failed to fetch service:", err)
      );
    }
  }, [dispatch, id]);

  // loading
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-yellow-50">
        <div className="animate-spin h-10 w-10 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
        <p className="mt-3 text-gray-600 text-sm">Loading service...</p>
      </div>
    );
  }

  //error
  if (error) {
    return (
      <div className="text-center text-red-500 py-20 bg-yellow-50">
        {error || "Failed to load service details"}
      </div>
    );
  }

  if (!singleService) {
    return (
      <div className="text-center text-gray-600 py-20 bg-yellow-50">
        Service not found
      </div>
    );
  }
  
  // provider role check
  const isProvider = user?._id === singleService.provider?._id;

  return (
    <section className="min-h-screen bg-yellow-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">

        {/* img */}
        <div className="h-80 w-full overflow-hidden">
          <img
            src={singleService.image}
            alt={singleService.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/*content */}
        <div className="p-6 space-y-4">

          {/*title*/}
          <h1 className="text-2xl font-semibold text-gray-800">
            {singleService.title}
          </h1>

          {/* location*/}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-yellow-500" />
            {singleService.location}
          </div>

          {/* description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {singleService.description}
          </p>

          {/* info  */}
          <div className="grid grid-cols-2 gap-4 text-sm bg-yellow-50 p-4 rounded-xl">

            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-semibold text-gray-800">
                ৳{singleService.price}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Availability</p>
              <p className="font-semibold text-gray-800">
                {singleService.availability} hrs
              </p>
            </div>

          </div>

          {/* proider */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User size={16} className="text-yellow-500" />
            <span>{singleService.provider?.name || "Unknown"}</span>
          </div>

          {/* actions */}
          <div className="flex justify-between pt-4">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-yellow-100 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={() =>
                navigate("/chat", { state: { service: singleService } })
              }
              className="text-sm px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white transition"
            >
              Message Provider
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;