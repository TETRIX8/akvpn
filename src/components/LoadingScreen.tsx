
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
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-spring-light flex flex-col items-center justify-center z-50">
      {/* WebGL Animation Background */}
      <BackgroundAnimation className="absolute inset-0 z-0" animateText={true} textToAnimate="AKVPN" />
      
      {/* Overlay with Spring Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-spring-light/80 via-spring-secondary/20 to-spring-accent/10 opacity-90 bg-spring-pattern z-10" />

      {/* Content */}
      <div className="relative z-20 text-center">
        {/* Hidden Title - Visual is handled by WebGL animation */}
        <div 
          className={`
            text-5xl md:text-7xl font-bold mb-8
            transition-all duration-1000 transform
            ${isVisible ? 'opacity-0' : 'opacity-0'}
            animate-shimmer spring-text
          `}
          style={{
            textShadow: '0 0 10px rgba(74, 222, 128, 0.4)'
          }}
        >
          AKVPN
        </div>

        {/* A-K Project text */}
        <div 
          className={`
            text-xl md:text-3xl text-spring-dark mb-8
            transition-all duration-1000 transform delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{
            textShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
          }}
        >
          <p className="text-2xl md:text-4xl font-bold mb-2 spring-text">A-K Project</p>
          <p className="text-lg md:text-xl text-spring-dark/80">
            Безопасность и приватность в сети
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-8 mb-10">
          <div 
            className={`
              w-16 h-16 md:w-20 md:h-20 opacity-80
              transition-all duration-1000 delay-500
              ${isVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            <div className="w-full h-full relative animate-float">
              <div className="absolute inset-0 bg-green-400/30 rounded-full blur-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-green-500">
                  <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div 
            className={`
              w-16 h-16 md:w-20 md:h-20 opacity-80
              transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            <div className="w-full h-full relative animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="absolute inset-0 bg-teal-400/30 rounded-full blur-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-teal-500">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden border border-green-300/30">
          <div 
            className="h-full transition-all duration-300 ease-out spring-gradient animate-shimmer"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <div 
          className={`
            mt-4 text-lg text-spring-dark font-medium
            animate-glow
          `}
          style={{
            textShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
          }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};
