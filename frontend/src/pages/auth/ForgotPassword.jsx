import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotpassword } from "../../redux/reducers/authReducer";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  // alerts state
  const { message, error, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle forgot submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotpassword({ email }));
      setEmail("");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Forgot Password
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Enter your registered email to receive the OTP
        </p>

        {/* alert mesgs */}
        {message && (
          <div className="mt-4 bg-green-100 text-green-700 text-sm px-4 py-2 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* get user auth email  */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* back to login btn */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-indigo-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
