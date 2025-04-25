// IntervieweeOTP.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntervieweeOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [interviewees, setInterviewees] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('interviewees');
    if (stored) {
      try {
        setInterviewees(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse interviewees from localStorage', e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpExists = interviewees.some((entry) => entry.otp === otp);

    if (!otpExists) {
      setError('Invalid OTP. Please check and try again.');
      return;
    }

    setError('');
    alert('OTP Verified! Starting Interview...');
    // Redirect to interview page or show interview component
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-200 via-cyan-100 to-indigo-200">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md border border-white/30"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-800 mb-6">
          Enter OTP to Begin Interview
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter AIS OTP (e.g., AISABCD)"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/70"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
          >
            Verify & Start Interview
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default IntervieweeOTP;