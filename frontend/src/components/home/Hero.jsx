import React, { useState } from "react";
import img from "../../assets/pexels-tim-douglas-6205456.jpg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

function Hero() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { services = [], loading, error } = useSelector(
    (state) => state.service || {}
  );

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      !query ||
      service.category.toLowerCase().includes(query.toLowerCase()) ||
      service.title.toLowerCase().includes(query.toLowerCase());

    const matchesLocation =
      !location ||
      service.location.toLowerCase().includes(location.toLowerCase());

    return matchesCategory && matchesLocation;
  });

  const handleSearch = () => {
    setShowResults(query || location ? true : false);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Overlay (no-click) */}
      <div className="absolute inset-0 bg-black/80 z-10 pointer-events-none" />

      {/* Main Content */}
      <section className="relative z-20 text-center text-white w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-snug">
          Find Local Services Near You
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 drop-shadow-md">
          Search trusted providers for your daily needs
        </p>

        {/* 🔍 Fully Responsive Search Bar */}
        <div
          className="
            w-full max-w-3xl 
            bg-white/30 backdrop-blur-md 
            rounded-2xl shadow-lg mx-auto mb-6
            flex flex-col sm:flex-row gap-2 sm:gap-0
            p-3 sm:p-0
          "
        >
          {/* Category */}
          <input
            type="text"
            placeholder="What e.g. plumber, electrician..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              flex-1 px-4 py-3 
              text-white placeholder-white outline-none
              rounded-xl sm:rounded-none
              text-sm sm:text-base
            "
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Where e.g. your city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="
              flex-1 px-4 py-3 
              text-white placeholder-white outline-none
              border-t sm:border-t-0 sm:border-l border-white/40
              rounded-xl sm:rounded-none
              text-sm sm:text-base
            "
          />

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="
              bg-green-500 hover:bg-green-400 transition
              px-5 sm:px-6 py-3 flex items-center justify-center
              rounded-xl sm:rounded-none
            "
          >
            <FaSearch className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="mt-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 max-h-[350px] overflow-y-auto text-left">
            {loading ? (
              <p className="text-yellow-200">Loading...</p>
            ) : error ? (
              <p className="text-red-300">Error: {error}</p>
            ) : filteredServices.length === 0 ? (
              <p className="text-gray-300">No matching services found.</p>
            ) : (
              <ul className="divide-y divide-white/20">
                {filteredServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-3 hover:bg-white/20 rounded-lg px-3 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-white">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {service.category} • {service.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">৳{service.price}</p>
                      <p className="text-xs text-gray-400">{service.provider?.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* CTA – Fixed Above Overlay */}
      <div className="absolute bottom-6 left-0 w-full text-center text-white border-t border-white/20 pt-4 z-30">
        <h2 className="text-lg font-medium text-gray-200 mb-2">
          Are you a Service Provider?
        </h2>

        <Link
          to="/register"
          className="
            inline-flex items-center justify-center gap-2 px-6 py-2 
            bg-yellow-400 text-black font-semibold rounded-full shadow-lg
            hover:bg-yellow-300 hover:scale-105 active:scale-95
            transition-transform
          "
        >
          Join Now
          <MdKeyboardArrowRight className="text-xl" />
        </Link>
      </div>
    </section>
  );
}

export default Hero;
