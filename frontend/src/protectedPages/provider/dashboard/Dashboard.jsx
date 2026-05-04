import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import profile from "../../../assets/local.jpg"
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authProfile } from '../../../redux/reducers/authReducer';
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const dispatch = useDispatch();



  useEffect(() => {
    const profileInfo = async () => {
      try {
        const res = await dispatch(authProfile()).unwrap();
        setProvider(res.user);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };
    profileInfo();
  }, [dispatch]);

  // Bookings data object array
  const bookings = [
    {
      id: 1,
      customer: "Jack Jone",
      service: "Plumber",
      time: "6:00 - 12:00",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sarah Lee",
      service: "Electrician",
      time: "2:00 - 5:00",
      status: "Completed",
    },
    {
      id: 3,
      customer: "David Miller",
      service: "Carpenter",
      time: "10:00 - 2:00",
      status: "Pending",
    },
    {
      id: 4,
      customer: "Emma Watson",
      service: "Cleaner",
      time: "3:00 - 6:00",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-DustyRose min-h-screen">
      {/* Top Navbar-like Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10 ">
        <h1 className="text-xl font-bold text-gray-800">
          Service Provider Dashboard
        </h1>

        <div className="flex items-center gap-4" onClick={() => navigate("/dashboard/profile")}>
          <img
            src={provider?.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-700">{provider?.name}</h2>
          </div>
        </div>

        <button onClick={() => navigate("/message")} className='flex items-center gap-1'><span><MessageCircle /></span>Message</button>
      </div>

      <div className="p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MdWorkOutline className="text-2xl " />
              <p className="text-2xl font-bold text-gray-800">05</p>
            </div>
            <h3 className="text-gray-500 text-sm">Total Services</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiShoppingCart className="text-2xl " />
              <p className="text-2xl font-bold text-gray-800">03</p>
            </div>
            <h3 className="text-gray-500 text-sm">Pending Bookings</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TiTickOutline className="text-2xl " />
              <p className="text-2xl font-bold text-gray-800">20</p>
            </div>
            <h3 className="text-gray-500 text-sm">Completed Bookings</h3>
          </div>
        </div>

        {/* Rating and Earning */}
        <div className="bg-white px-16 py-4 rounded-xl shadow flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaStar className="text-yellow-500 text-2xl" />
            <div>
              <p className="text-xl font-bold text-gray-800">4.5 </p>
              <h3 className="text-gray-500 text-sm">Average Rating</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div>
              <h3 className="text-gray-500 text-sm">Earnings (This Month)</h3>
              <p className="text-xl font-bold text-gray-800">$1,250</p>
            </div>
          </div>
        </div>

        {/* Recent Booking Table */}
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{booking.customer}</td>
                  <td className="px-6 py-4">{booking.service}</td>
                  <td className="px-6 py-4">{booking.time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium 
        ${booking.status === "Pending"
                          ? "bg-amber-100 text-gray-600"
                          : booking.status === "Accepted"
                            ? "bg-blue-100 text-gray-600"
                            : booking.status === "Completed"
                              ? "bg-green-100 text-gray-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>


                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/dashboard/booking/${booking.id}`)}
                      className="px-3 py-1 rounded-lg bg-lavender text-white text-xs hover:bg-indigo-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard