import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { bookService } from "../../../redux/reducers/bookingReducer";

function BookingPage() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state;

  const bookingInfo = useSelector((state) => state.booking.bookingInfo);
  console.log("Booking info:", bookingInfo);


  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user._id;

  // Location State
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("advanced");

  // Simulating profile location (login করলে আসবে)
  const profileData = JSON.parse(localStorage.getItem("profileData"));
  const profileLocation = profileData.location;




  if (!service) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-700">
          No booking data found.
        </h2>
      </div>
    );
  }

  const handleGetProfileLocation = () => {
    setDeliveryLocation(profileLocation);
    setLocationConfirmed(true);
  };

  const handleConfirmLocation = () => {
    if (deliveryLocation.trim() !== "") {
      setLocationConfirmed(true);
    }
  };

  const handleConfirmBooking = () => {
    const bookingData = {
      userId,
      serviceId: service._id,
      serviceName: service.title,
      serviceType: service.category,
      price: service.price,
      deliveryLocation,
      paymentMethod,
    };

    dispatch(bookService(bookingData)).unwrap()

    navigate("/success", { state: bookingInfo });
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Details</h2>

      {/* ============ ROW 1: Service Summary + Location ============ */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Service Summary */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Service Summary
          </h3>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Service:</span>
            <span>{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Type:</span>
            <span>{service.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Price:</span>
            <span>৳ {service.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Total:</span>
            <span className="font-bold text-gray-800">৳ {service.price}</span>
          </div>
        </div>

        {/* Location */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Delivery Location
          </h3>
          <input
            type="text"
            placeholder="Enter delivery location"
            value={deliveryLocation}
            onChange={(e) => {
              setDeliveryLocation(e.target.value);
              setLocationConfirmed(false);
            }}
            className="w-full border rounded px-3 py-2 mb-3 focus:ring focus:ring-violet-200 outline-none"
          />

          {deliveryLocation.trim() !== "" && !locationConfirmed && (
            <button
              type="button"
              onClick={handleConfirmLocation}
              className="w-full mb-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Confirm Location
            </button>
          )}

          <button
            type="button"
            onClick={handleGetProfileLocation}
            className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
          >
            Get Profile Location
          </button>
        </div>
      </div>

      {/* ================= Payment Method ================= */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Method
        </h3>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="advanced"
              checked={paymentMethod === "advanced"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-violet-600"
            />
            <span className="font-medium text-gray-700">
              Advanced (Online)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-violet-600"
            />
            <span className="font-medium text-gray-700">
              Cash on Delivery
            </span>
          </label>
        </div>

        {paymentMethod === "advanced" && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center cursor-pointer border rounded-md px-2 py-4 hover:scale-105 transition">
              <img
                src="https://download.logo.wine/logo/BKash/BKash-Logo.wine.png"
                alt="Bkash"
                className="h-8 object-contain"
              />
            </div>
            <div className="flex flex-col items-center cursor-pointer border rounded-md px-2 py-4 hover:scale-105 transition">
              <img
                src="https://seeklogo.com/images/N/nagad-logo-7A6852A5B9-seeklogo.com.png"
                alt="Nagad"
                className="h-8 object-contain"
              />
            </div>
            <div className="flex flex-col items-center cursor-pointer border rounded-md px-2 py-4 hover:scale-105 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/20/Rocket_logo.svg"
                alt="Rocket"
                className="h-8 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleConfirmBooking}
          className="px-8 py-3 bg-violet-600 text-white rounded-md font-semibold hover:bg-violet-500 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
