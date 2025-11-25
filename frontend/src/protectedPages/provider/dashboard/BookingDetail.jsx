import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { providerBooking } from "../../../redux/reducers/bookingReducer";

function BookingDetail() {
  const { id } = useParams(); // URL থেকে bookingId নিচ্ছি
  const dispatch = useDispatch();

  const { providerBookings: booking, loading, error } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (id) {
      dispatch(providerBooking({ bookingId: id }));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center mt-8">Loading booking details...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-8 text-red-600">
        Error: {error}
      </p>
    );
  }

  if (!booking || !booking._id) {
    return (
      <p className="text-center mt-8 text-gray-600">
        No booking details found.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Booking Details
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Service:</span>{" "}
          {booking.serviceName}
        </p>
        <p>
          <span className="font-semibold">Type:</span>{" "}
          {booking.serviceType}
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          ৳{booking.price}
        </p>
        <p>
          <span className="font-semibold">Payment:</span>{" "}
          {booking.paymentMethod}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {booking.status}
        </p>
        <p>
          <span className="font-semibold">Delivery Location:</span>{" "}
          {booking.deliveryLocation}
        </p>
        <p>
          <span className="font-semibold">Booked By:</span>{" "}
          {booking.userId?.name} ({booking.userId?.email})
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(booking.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default BookingDetail;

