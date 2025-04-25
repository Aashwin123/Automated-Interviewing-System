import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import Navbar from "./Components/Navbar";
import LogOut from "./Auth/LogOut";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Home from "./Components/Home";
import Company from "./Components/Company";
import Interviewee from "./Components/Interviewee";
import MockInterview from "./Components/MockInterview";

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(location.pathname === "/");

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 2000); // splash lasts 2s
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 transition-opacity duration-1000">
      <Navbar />
      <main className="p-6 text-center">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to AIS</h1>
                <p className="text-lg text-gray-700">
                  Your Automated Interview System starts here. Use the navbar to explore!
                </p>
              </>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/company" element={<Company />} />
          <Route path="/interviewee" element={<Interviewee />} />
          <Route path="/mock-interview" element={<MockInterview />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
