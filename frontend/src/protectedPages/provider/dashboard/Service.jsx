import React, { useEffect, useState } from "react";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteService,
  fetchProviderAllService
} from "../../../redux/reducers/serviceReducer";

function Service() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState(null); 

  // Redux state থেকে service data নিচ্ছি
  const { providerServics = [], loading, error } = useSelector(
    (state) => state.service || {}
  );

  console.log(providerServics)


  // Fetch all services on component mount
  useEffect(() => {
    dispatch(fetchProviderAllService())
      .unwrap()
      .catch((err) => console.error("Failed to fetch services:", err));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteService({ id }));
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Service Management
      </h1>

      {/* Add Service Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/dashboard/service/add")}
          className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-500 transition flex items-center gap-1"
        >
          <span className="text-xl">+</span> Add Service
        </button>
      </div>

      {/* Loading / Error State */}
      {loading && (
        <p className="text-gray-600 text-center mb-4">Loading services...</p>
      )}
      {error && (
        <p className="text-red-600 text-center mb-4">
          Error: {typeof error === "string" ? error : "Something went wrong"}
        </p>
      )}

      {/* Service Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3">Service</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {providerServics.length > 0 ? (
              providerServics.map((service) => (
                <tr
                  key={service._id}
                  onClick={() => navigate(`/dashboard/service/${service._id}`)}
                  className="bg-white shadow-sm rounded-lg hover:shadow-md transition cursor-pointer"
                >
                  <td className="px-6 py-3 font-medium">{service.title}</td>

                  <td className="px-4 py-3 text-gray-600 truncate max-w-xs">
                    {service.description}
                  </td>

                  <td className="px-4 py-3">৳{service.price}</td>

                  {/* Action Menu */}
                  <td className="relative p-3 text-center">
                    {/* 3-dot menu icon */}
                    <button
                      onClick={(e) => toggleMenu(e, service._id)}
                      className="text-violet-600 hover:text-violet-800 transition"
                    >
                      <CiMenuKebab size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === service._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10"
                      >
                        <button
                          onClick={() =>
                            navigate(`/dashboard/service/edit/${service._id}`)
                          }
                          className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
                        >
                          <CiEdit size={16} className="mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <AiOutlineDelete size={16} className="mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No services found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Service;
