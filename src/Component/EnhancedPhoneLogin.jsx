import { useState, useRef, useEffect } from "react";

export default function EnhancedPhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle input change for OTP
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9a-zA-Z]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus(); // Focus next input
      }
    }
  };

  // Handle backspace in OTP input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Focus previous input
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      console.log("Verification code sent to:", countryCode + phoneNumber);
      setStep(2);
      setTimer(60);
    } else {
      console.log("Verifying OTP:", otp.join(""));
    }
  };

  // Resend OTP
  const handleResend = () => {
    console.log("Resending verification code to:", countryCode + phoneNumber);
    setTimer(60);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-xl w-full max-w-2xl py-8">
        <div className="p-6 px-12 border-b">
          <h2 className="text-4xl mb-2 font-bold text-center text-black">
            {step === 1 ? "Login" : "Verify OTP"}
          </h2>
          <p className="text-center text-gray-600">
            {step === 1
              ? "Enter your phone number to sign in"
              : `Enter the verification code sent to ${countryCode}${phoneNumber}`}
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="flex mt-1">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="block w-20 p-3 border border-gray-300 bg-white rounded-l-md focus:outline-none focus:ring-blue-600 focus:border-blue-500"
                  >
                    <option value="+91">+91</option>
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9798993013"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 text-lg p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-lg font-medium text-gray-700 text-center mb-2"
                ></label>
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      placeholder="X"
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      className="w-12 h-12 text-center text-black border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {step === 1 ? "Send Verification Code" : "Verify"}
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 text-center mt-2">
                Login with Gmail
              </button>
            </div>
          </form>
          {step === 2 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleResend}
                disabled={timer > 0}
                className="text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400"
              >
                Resend Code {timer > 0 && `(${timer}s)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
