import React from "react";
import {
  FaWrench,
  FaBolt,
  FaChalkboardTeacher,
  FaUtensils,
  FaCarSide,
  FaPaintRoller,
  FaUserNurse,
  FaHome,
  FaTools,
  FaLaptopCode,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function PopularCategory() {

  // populer services category
  const services = [
    { name: "Plumber", icon: <FaWrench size={34} /> },
    { name: "Electrician", icon: <FaBolt size={34} /> },
    { name: "Tutor", icon: <FaChalkboardTeacher size={34} /> },
    { name: "Home Cook", icon: <FaUtensils size={34} /> },
    { name: "Car Mechanic", icon: <FaCarSide size={34} /> },
    { name: "Painter", icon: <FaPaintRoller size={34} /> },
    { name: "Nursing Care", icon: <FaUserNurse size={34} /> },
    { name: "House Cleaning", icon: <FaHome size={34} /> },
    { name: "AC Technician", icon: <FaTools size={34} /> },
    { name: "IT Support", icon: <FaLaptopCode size={34} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center py-12 px-5">
      <h1 className="text-violet-700 text-3xl font-bold mb-10 text-center">
        Popular Categories
      </h1>

      {/* category list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                      gap-6 w-full px-6">
        {services.map((service) => (
          <Link
            key={service.name}
            to={`/category/${service.name}`}
            className="flex flex-col items-center gap-3 
                       border border-gray-100 rounded-2xl w-full 
                       hover:shadow-xl hover:-translate-y-1 
                       active:scale-95 transition-all duration-200"
          >
            <span className="text-yellow-600 hover:transform-content scale-90">{service.icon}</span>
            <h3 className="text-gray-6s00 font-semibold text-base text-center">
              {service.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCategory;
