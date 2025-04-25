import React from "react";

const SplashScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <h1 className="text-white text-4xl md:text-5xl font-extrabold animate-pulse drop-shadow-lg">
        Welcome to Automated Interview System
      </h1>
    </div>
  );
};

export default SplashScreen;
