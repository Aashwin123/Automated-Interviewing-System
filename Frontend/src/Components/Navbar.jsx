import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Company", href: "/company" },
  { name: "Interviewee", href: "/interviewee" },
  { name: "Mock Interview", href: "/mock-interview" },
  { name: "Login", href: "/login" },
  { name: "Signup", href: "/signup" },
  { name: "Logout", href: "/logout" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md text-gray-800 px-6 py-4 fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text"
        >
          Automated Interview System
        </motion.div>

        <div className="hidden md:flex space-x-6">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300 ease-in-out"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col space-y-4 mt-4 px-4"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition-all duration-300"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}