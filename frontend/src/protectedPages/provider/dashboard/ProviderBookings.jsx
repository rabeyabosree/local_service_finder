import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBookings, updateStatuss } from "../../../redux/reducers/bookingReducer";


function ProviderBookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { providerBookings = [], error } = useSelector((state) => state.booking)

  // fetch all bookigns
  useEffect(() => {
    dispatch(getAllBookings())
  }, [dispatch]);

  const [filter, setFilter] = useState("All");

  // status update
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateStatuss({ id, status: newStatus }))
  };

  // filerting booking by status
  const filteredBookings =
    filter === "All"
      ? providerBookings
      : providerBookings.filter((b) => b.status.toLowerCase() === filter.toLowerCase());

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        {/* header and filter*/}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold">Provider Bookings</h3>

          {/* filter dropdoem */}
          <div>
            <label htmlFor="filter" className="mr-2 text-sm font-medium">
              Filter:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* table */}
        <table className="min-w-full text-sm text-left">
          {/* table header */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          {/* table body */}
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{booking.userId.name}</td>
                  <td className="px-6 py-4">{booking.serviceName}</td>
                  <td className="px-6 py-4">{booking.time}</td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                      className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${booking.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : booking.status === "Accepted"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/dashboard/booking/${booking._id}`)}
                      className="px-3 py-1 rounded-lg bg-indigo-500 text-white text-xs hover:bg-indigo-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No bookings found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProviderBookings;
