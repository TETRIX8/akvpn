
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
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/lovable-uploads/d30cc1ad-1163-4a42-b5fd-f609aa4d1cf1.png)',
          backgroundSize: 'cover',
          opacity: 0.3
        }} 
      />
      
      {/* Overlay with Ramadan Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-vpn-dark via-vpn-dark/90 to-vpn-dark opacity-90 bg-ramadan-pattern" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Title */}
        <div 
          className={`
            text-4xl md:text-6xl text-ramadan-gold font-horror mb-8
            transition-all duration-1000 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            animate-shimmer bg-gradient-to-r from-ramadan-gold via-yellow-300 to-ramadan-gold bg-[length:200%_100%]
          `}
          style={{
            textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4)'
          }}
        >
          AKVPN
        </div>

        {/* Ramadan Greetings */}
        <div 
          className={`
            text-xl md:text-3xl text-ramadan-gold mb-8
            transition-all duration-1000 transform delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{
            textShadow: '0 0 10px rgba(255, 215, 0, 0.6)'
          }}
        >
          <p className="mb-2">Рамадан Карим!</p>
          <p className="text-lg md:text-xl text-ramadan-emerald">
            Поздравляем Вас с благословенным месяцем Рамадан
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
              <div className="absolute inset-0 bg-ramadan-gold/30 rounded-full blur-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-ramadan-gold">
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
              <div className="absolute inset-0 bg-ramadan-emerald/30 rounded-full blur-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-ramadan-emerald">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-ramadan-gold/30">
          <div 
            className="h-full transition-all duration-300 ease-out animate-shimmer bg-gradient-to-r from-ramadan-gold via-yellow-300 to-ramadan-gold bg-[length:200%_100%]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <div 
          className={`
            mt-4 text-lg text-ramadan-gold font-horror
            animate-glow
          `}
          style={{
            textShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
          }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};
