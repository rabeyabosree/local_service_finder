import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function ServicesByCategory() {
  const { service } = useParams();

  const services = [
    {
      id: 1,
      name: "Alamin",
      service: "Plumber",
      profile: "https://i.pravatar.cc/300?img=5",
      rating: 4,
      price: 388,
    },
    {
      id: 2,
      name: "Juha",
      service: "Electrician",
      profile: "https://i.pravatar.cc/300?img=4",
      rating: 3,
      price: 300,
    },
    {
      id: 3,
      name: "Nahor",
      service: "Tutor",
      profile: "https://i.pravatar.cc/300?img=3",
      rating: 5,
      price: 400,
    },
    {
      id: 4,
      name: "Tekka",
      service: "Tailor",
      profile: "https://i.pravatar.cc/300?img=2",
      rating: 2,
      price: 250,
    },
    {
      id: 5,
      name: "Shuvo",
      service: "Tutor",
      profile: "https://i.pravatar.cc/300?img=6",
      rating: 4,
      price: 420,
    },
  ];

  // filter by category
  const serviceByCategory = services.filter(
    (ser) => ser.service.toLowerCase() === service.toLowerCase()
  );

  if (serviceByCategory.length === 0) {
    return (
      <h2 className="text-center mt-10 text-gray-600 text-xl">
        No services found for "{service}"
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        {service} Services
      </h1>
      {/* service by category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serviceByCategory.map((ser) => (
          <div
            key={ser.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg hover:scale-105 transition"
          >
            <img
              src={ser.profile}
              alt={ser.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{ser.name}</h2>
            <p className="text-violet-600 text-sm mb-2">{ser.service}</p>

            {/* rating */}
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className={i < ser.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>

            <p className="font-bold text-gray-700 mb-4">${ser.price}</p>

            <Link
              to={`/service/${ser.id}`}
              className="block w-full text-center bg-violet-600 text-white py-2 rounded-lg font-semibold hover:bg-violet-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesByCategory;
