import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../redux/reducers/authReducer";

function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

  // verifyy otp handler
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const enteredOtp = otp.join(""); // 6 digit OTP একসাথে করা
      const result = await dispatch(
        verifyOtp({ email, resetCode: enteredOtp })
      ).unwrap();

      console.log("OTP verified:", result);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);
    }
  };

  // input chamge
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputRef.current[index + 1].focus();
  };

  // backspace handler
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 max-w-md w-full rounded-2xl text-center shadow">
        <form onSubmit={handleVerify} className="flex flex-col">
          <h1 className="text-2xl font-semibold text-green-800 mb-3">
            OTP Verification
          </h1>
          <p className="text-md font-normal text-gray-400 mb-8">
            Enter the 6-digit OTP sent to your email
          </p>

          {/* input otp */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (inputRef.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                value={digit}
                className="h-12 w-12 border border-green-400 rounded-xl text-center text-lg focus:outline-none focus:border-green-500"
              />
            ))}
          </div>
          {/* verify otp btn */}
          <button
            type="submit"
            className="bg-green-500 text-white text-lg w-full px-6 py-2 rounded-2xl hover:bg-green-600 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
