import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const CompanyDashboard = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [interviewees, setInterviewees] = useState([]);
  const [interviewee, setInterviewee] = useState({ name: '', email: '', selectedRole: '' });

  const handleAddRole = () => {
    if (role) {
      setRoles([...roles, { role, syllabus }]);
      setRole('');
      setSyllabus('');
    }
  };

  const generateOTP = (name, role) => {
    const firstName = name.trim().split(' ')[0];
    const randomChars = (str) =>
      str.length >= 2
        ? str.charAt(Math.floor(Math.random() * str.length)) +
          str.charAt(Math.floor(Math.random() * str.length))
        : 'XX';
    return `AIS${randomChars(firstName)}${randomChars(role)}`.toUpperCase();
  };

  const sendOTPEmail = (email, name, otp) => {
    const templateParams = {
      to_email: email,
      to_name: name,
      message: `Hello ${name}, your OTP for the interview is: ${otp}`
    };

    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
      });
  };

  const handleAddInterviewee = () => {
    const { name, email, selectedRole } = interviewee;
    if (name && email && selectedRole) {
      const otp = generateOTP(name, selectedRole);
      const newInterviewee = { name, email, role: selectedRole, otp };
      const updatedList = [...interviewees, newInterviewee];

      setInterviewees(updatedList);
      sendOTPEmail(email, name, otp);
      setInterviewee({ name: '', email: '', selectedRole: '' });

      localStorage.setItem('interviewees', JSON.stringify(updatedList));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSyllabus(reader.result); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-200 via-white to-blue-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Automated Interview System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Role Card */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">Add Role</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Role Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            className="w-full p-2 border rounded mb-2"
            onChange={handleFileUpload}
          />
          {syllabus && (
            <p className="text-sm text-green-700 mt-1">File uploaded successfully.</p>
          )}
          <button
            onClick={handleAddRole}
            className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600"
          >
            Add Role
          </button>
        </motion.div>

        {/* Add Interviewee Card */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">Add Interviewee</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Full Name"
            value={interviewee.name}
            onChange={(e) => setInterviewee({ ...interviewee, name: e.target.value })}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Email"
            value={interviewee.email}
            onChange={(e) => setInterviewee({ ...interviewee, email: e.target.value })}
          />
          <select
            className="w-full p-2 border rounded mb-2"
            value={interviewee.selectedRole}
            onChange={(e) => setInterviewee({ ...interviewee, selectedRole: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((r, idx) => (
              <option key={idx} value={r.role}>
                {r.role}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddInterviewee}
            className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600"
          >
            Add Interviewee
          </button>
          <ul className="mt-4 text-sm text-gray-700">
            {interviewees.map((inv, idx) => (
              <li key={idx} className="mt-1">
                {inv.name} ({inv.email}) - Role: {inv.role} - OTP:{' '}
                <span className="font-bold">{inv.otp}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* View Report Card */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">View Report</h2>
          <p className="text-gray-600">Analyze interview performance and results</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
