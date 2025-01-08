import React, { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-vpn-dark flex flex-col items-center justify-center z-50">
      {/* Horror Text */}
      <div 
        className={`
          text-4xl md:text-6xl text-red-600 font-horror mb-8
          transition-all duration-1000 transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{
          textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.4)'
        }}
      >
        AKVPN
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(220, 38, 38, 0.8)'
          }}
        />
      </div>

      {/* Loading Text */}
      <div 
        className={`
          mt-4 text-lg text-red-600 font-horror
          animate-pulse
        `}
        style={{
          textShadow: '0 0 5px rgba(220, 38, 38, 0.8)'
        }}
      >
        Loading...
      </div>
    </div>
  );
};