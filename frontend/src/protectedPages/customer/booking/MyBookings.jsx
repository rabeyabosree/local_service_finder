import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../../redux/reducers/bookingReducer";

function MyBookings({ onClose }) {
  const { bookings = [], error} = useSelector((state) => state.booking)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBookings())
  }, [dispatch]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Overlay Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} // বাইরে ক্লিক করলে বন্ধ হবে
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-lg p-6 overflow-y-auto z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Booking List */}
        {bookings.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            No bookings found.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.serviceName}{" "}
                    <span className="text-sm text-gray-500">
                      ({booking.serviceType})
                    </span>
                  </h3>
                  <p className="text-gray-600">
                    Total Price: ৳ {booking.price}
                  </p>
                  <p className="text-gray-600">
                    Location: {booking.deliveryLocation}
                  </p>
                  <p className="text-gray-600">
                    Payment: {booking.paymentMethod}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${booking.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;

