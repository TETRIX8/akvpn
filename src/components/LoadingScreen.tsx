
import React, { useEffect, useState } from "react";
import { BackgroundAnimation } from "./BackgroundAnimation";

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
        return prev + 4; // Faster progress increment (from 2 to 4)
      });
    }, 80); // Shorter interval (from 100ms to 80ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-vpn-dark flex flex-col items-center justify-center z-50">
      {/* WebGL Animation Background - Faster animation speed */}
      <BackgroundAnimation className="absolute inset-0 z-0" animateText={true} textToAnimate="AKVPN" animationSpeed={1.8} />
      
      {/* Darker Overlay with Subdued Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-vpn-dark/90 via-spring-dark/70 to-vpn-dark/80 opacity-80 bg-spring-pattern z-10" />

      {/* Content */}
      <div className="relative z-20 text-center">
        {/* Hidden Title - Visual is handled by WebGL animation */}
        <div 
          className={`
            text-5xl md:text-7xl font-bold mb-8
            transition-all duration-1000 transform
            ${isVisible ? 'opacity-0' : 'opacity-0'}
          `}
        >
          AKVPN
        </div>

        {/* A-K Project text - More serious color scheme */}
        <div 
          className={`
            text-xl md:text-3xl text-white mb-8
            transition-all duration-1000 transform delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{
            textShadow: '0 0 5px rgba(0, 0, 0, 0.8)'
          }}
        >
          <p className="text-2xl md:text-4xl font-bold mb-2 text-white">A-K Project</p>
          <p className="text-lg md:text-xl text-white/70">
            Безопасность и приватность в сети
          </p>
        </div>

        {/* Decorative Elements - More subdued colors */}
        <div className="flex justify-center space-x-8 mb-10">
          <div 
            className={`
              w-16 h-16 md:w-20 md:h-20 opacity-60
              transition-all duration-1000 delay-500
              ${isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            <div className="w-full h-full relative animate-float">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white">
                  <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div 
            className={`
              w-16 h-16 md:w-20 md:h-20 opacity-60
              transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            <div className="w-full h-full relative animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Bar - More subtle gradient */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full transition-all duration-300 ease-out bg-gradient-to-r from-white/60 to-white/80"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <div 
          className="mt-4 text-lg text-white font-medium"
          style={{
            textShadow: '0 0 5px rgba(0, 0, 0, 0.8)'
          }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};
