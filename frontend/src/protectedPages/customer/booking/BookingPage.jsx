import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookService } from "../../../redux/reducers/bookingReducer";

function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // service 
  const service = JSON.parse(localStorage.getItem("booking"));

  // user
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  // profile data
  const profileData = JSON.parse(localStorage.getItem("profileData"));
  const profileLocation = profileData?.location;

  // get profile from auth
  const handleGetProfileLocation = () => {
    setDeliveryLocation(profileLocation || "");
    setLocationConfirmed(true);
  };
  // set profile location
  const handleConfirmLocation = () => {
    if (deliveryLocation.trim()) {
      setLocationConfirmed(true);
    }
  };
  // handle place booking
  const handleConfirmBooking = async () => {
    const bookingData = {
      userId,
      serviceId: service.serviceId,
      serviceName: service.name,
      price: service.price,
      deliveryLocation: deliveryLocation,
      serviceType: service.serviceType
    };

    try {
      const res = await dispatch(bookService(bookingData)).unwrap();
      navigate("/success", { state: res });
    } catch (err) {
      console.log("Booking error:", err);
    }
  };

  if (!service) {
    return (
      <div className="text-center mt-20 text-gray-600">
        No booking data found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 space-y-8">

      <h2 className="text-2xl font-bold text-gray-800">
        Booking Details
      </h2>

      {/* booking form */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* service info*/}
        <div className="space-y-4">

          <h3 className="text-lg font-semibold">
            Service Summary
          </h3>

          <div className="flex justify-between text-sm">
            <span>Service</span>
            <span>{service.name}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span>৳ {service.price}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Location</span>
            <span>{service.location}</span>
          </div>

          {/* PROVIDER SECTION */}
          <div className="flex items-center gap-3 pt-4">

            <img
              src={service.provider?.avatar || "/user.png"}
              className="w-10 h-10 rounded-full object-cover"
              alt="provider"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">
                {service.provider?.name}
              </p>
              <p className="text-xs text-gray-500">
                {service.provider?.email}
              </p>
            </div>

          </div>

        </div>

        {/* location */}
        <div>

          <h3 className="text-lg font-semibold mb-2">
            Delivery Location
          </h3>

          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => {
              setDeliveryLocation(e.target.value);
              setLocationConfirmed(false);
            }}
            placeholder="Enter delivery location"
            className="w-full p-2 border rounded-md text-sm"
          />

          {deliveryLocation && !locationConfirmed && (
            <button
              onClick={handleConfirmLocation}
              className="w-full mt-3 bg-green-600 text-white py-2 rounded-md"
            >
              Confirm Location
            </button>
          )}

          <button
            onClick={handleGetProfileLocation}
            className="w-full mt-2 bg-violet-600 text-white py-2 rounded-md"
          >
            Use Profile Location
          </button>

        </div>
      </div>

      {/* confirm button */}
      <div className="flex justify-end">
        <button
          onClick={handleConfirmBooking}
          className="px-6 py-3 bg-black text-white rounded-md hover:opacity-80"
        >
          Confirm Booking
        </button>
      </div>

    </div>
  );
}

export default BookingPage;