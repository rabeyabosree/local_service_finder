import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  if (!booking) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl text-gray-700">No booking found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 s space-y-6 text-center">
      <h2 className="text-2xl font-bold text-green-600">🎉 Booking Confirmed!</h2>
      <p className="text-gray-700">
        Your booking for <strong>{booking.serviceName}</strong> is confirmed.
      </p>

      <div className="text-left border-t pt-4 space-y-2">
        <p><strong>Service:</strong> {booking.serviceName}</p>
        <p><strong>Type:</strong> {booking.serviceType}</p>
        <p><strong>Total Price:</strong> ৳ {booking.price}</p>
        <p><strong>Delivery Location:</strong> {booking.deliveryLocation}</p>
        <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate("/my-bookings")}
          className="px-6 py-2 border border-violet-600 text-violet-600 rounded hover:bg-violet-50 transition"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
