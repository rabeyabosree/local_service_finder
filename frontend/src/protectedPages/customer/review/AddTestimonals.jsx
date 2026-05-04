import React, { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestimonals,
  fetchTestimonials,
  editTestimonals,
  deleteTestimonals,
} from "../../../redux/reducers/testimonalReducer";

function AddTestimonals({ id }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null); // editing testimonial id
  const dispatch = useDispatch();

  const { testimonials = [], loading, error } = useSelector(
    (state) => state.testimonals
  );

  useEffect(() => {
    if (id) dispatch(fetchTestimonials(id));
  }, [dispatch, id]);

  // Add or edit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) return;

    const testiData = { rating, comment, serviceId: id };

    try {
      if (editId) {
        await dispatch(editTestimonals({ id: editId, ...testiData })).unwrap();
        setEditId(null);
      } else {
        await dispatch(addTestimonals(testiData)).unwrap();
      }
      setRating(0);
      setComment("");
      dispatch(fetchTestimonials(id)); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete testimonial safely
  const handleDelete = useCallback(
    async (testimonialId) => {
      if (!testimonialId) return; // ensure id exists
      if (!window.confirm("Are you sure you want to delete this review?")) return;

      try {
        await dispatch(deleteTestimonals(testimonialId)).unwrap();
        dispatch(fetchTestimonials(id)); // refresh list
      } catch (err) {
        console.error("Delete error:", err);
      }
    },
    [dispatch, id]
  );

  // Start editing testimonial
  const handleEdit = (t) => {
    if (!t?._id) return;
    setEditId(t._id);
    setRating(t.rating);
    setComment(t.comment);
  };

  return (
    <div className="max-w-3xl mx-auto text-start">
      {/* Add/Edit Review Form */}
      <div className="mb-8  bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          {editId ? "Edit Your Review" : "Add Your Review"}
        </h3>
        <form onSubmit={handleReviewSubmit} className="space-y-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(currentRating)}
                  className="focus:outline-none"
                >
                  <FaStar
                    size={24}
                    className={
                      currentRating <= rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                </button>
              );
            })}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            rows="3"
            placeholder="Write your review..."
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : editId ? "Update Review" : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Show Reviews */}
      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          testimonials.map((t) => (
            <div key={t._id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center mb-1 gap-2">
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    size={16}
                    className={idx < t.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <img
                  src={t.userId?.avatar || ""}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="ml-2 text-gray-600 text-sm">
                  {t.userId?.name || "Guest"}
                </span>

                {/* Edit/Delete Buttons */}
                <button
                  type="button"
                  onClick={() => handleEdit(t)}
                  className="ml-auto text-gray-500 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(t._id)}
                  className="ml-2 text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700">{t.comment}</p>
            </div>
          ))
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default AddTestimonals; 