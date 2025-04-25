import React, { useEffect } from 'react';

const Home = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-4xl md:text-6xl font-bold text-white animate-pulse text-center">
        Welcome to Automated Interview System
      </h1>
    </div>
  );
};

export default Home;

  