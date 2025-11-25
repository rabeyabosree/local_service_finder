import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      img: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review: "Excellent service! Highly recommended.",
    },
    {
      id: 2,
      name: "Jane Smith",
      img: "https://i.pravatar.cc/150?img=2",
      rating: 4,
      review: "Quick response and professional work.",
    },
    {
      id: 3,
      name: "Michael Johnson",
      img: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      review: "Very knowledgeable and patient.",
    },
    {
      id: 4,
      name: "Sara Williams",
      img: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      review: "Amazing experience, will use again!",
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
      )
    );
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#5C7E8F] mb-12">
        What Our Clients Say
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
          >
            {/* Profile Image */}
            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4"
            />

            {/* Name */}
            <h2 className="text-lg sm:text-xl font-semibold mb-1">{t.name}</h2>

            {/* Rating */}
            <div className="flex justify-center gap-1 mb-3">{renderStars(t.rating)}</div>

            {/* Review */}
            <p className="text-gray-600 italic text-sm sm:text-base">"{t.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
