import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/reducers/authReducer';


function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // handle reset submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await dispatch(resetPassword({ email, newPassword }));
      navigate('/login');  // Password reset successful হলে Login পেজে নিয়ে যাবে
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-sm w-full bg-white p-8 rounded-2xl text-center'>
        <h1 className='text-2xl font-bold text-green-800 mb-2'>Reset Password</h1>
        <p className='text-gray-400 text-sm mb-6'>Enter your new password below</p>
        {/* set new password form */}
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='border border-green-300 py-2 px-4 rounded-2xl focus:outline-none focus:border-green-500'
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border border-green-300 py-2 px-4 rounded-2xl focus:outline-none focus:border-green-500'
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type="submit"
            className='bg-green-500 text-white px-4 py-2 w-full rounded-2xl hover:bg-green-600 transition'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
