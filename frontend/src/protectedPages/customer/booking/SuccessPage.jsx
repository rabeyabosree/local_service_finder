import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MapPin, Package, DollarSign, Clock } from "lucide-react";

function SuccessPage() {
  const navigate = useNavigate();

  const { bookingInfo } = useSelector((state) => state.booking);

  const booking = bookingInfo;

  if (!booking) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No booking found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-violet-50 px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-6">

        {/* SUCCESS HEADER */}
        <div className="text-center space-y-2">

          <div className="flex justify-center">
            <CheckCircle className="text-green-500 w-14 h-14" />
          </div>

          <h2 className="text-2xl font-bold text-green-600">
            Booking Confirmed
          </h2>

          <p className="text-gray-500 text-sm">
            Your service request has been successfully placed
          </p>

        </div>

        {/* STATUS BADGE */}
        <div className="flex justify-center">
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
            {booking.status || "pending"}
          </span>
        </div>

        {/* DETAILS CARD */}
        <div className="space-y-3 text-sm text-gray-700">

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package size={16} /> Service
            </span>
            <span className="font-medium">{booking.serviceName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              Type
            </span>
            <span className="font-medium">{booking.serviceType}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign size={16} /> Price
            </span>
            <span className="font-semibold text-violet-700">
              ৳ {booking.price}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Location
            </span>
            <span>{booking.deliveryLocation}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock size={16} /> Time
            </span>
            <span>
              {new Date(booking.createdAt).toLocaleString()}
            </span>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-4">

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm hover:opacity-80 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 bg-violet-600 text-white py-2.5 rounded-lg text-sm hover:bg-violet-700 transition"
          >
            My Bookings
          </button>

        </div>

      </div>
    </div>
  );
}

export default SuccessPage;