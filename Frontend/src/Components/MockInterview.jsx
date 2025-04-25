import React, { useState } from 'react';

const MockInterview = () => {
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Role:', role);
    console.log('Uploaded File:', file);
    alert(`Starting mock interview for role: ${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 px-4 py-8">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Mock Interview Setup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Which role are you preparing for?
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Analyst"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Attach syllabus (optional):
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Start Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default MockInterview;
