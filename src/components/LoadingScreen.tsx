
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
      <div className="relative z-10">
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

        {/* Additional Text */}
        <div 
          className={`
            text-lg md:text-xl text-ramadan-emerald text-center mb-8
            transition-all duration-1000 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{
            textShadow: '0 0 5px rgba(80, 200, 120, 0.8)'
          }}
        >
          <p className="mb-4 animate-glow">Все ключи являются демонстрацией работы нашего VPN</p>
          <p>
            Для полного доступа приобретите VPN в нашем{' '}
            <a 
              href="https://t.me/akvpnn_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ramadan-purple hover:text-ramadan-gold underline decoration-wavy decoration-ramadan-purple/50 transition-colors duration-300"
            >
              Telegram боте
            </a>
          </p>
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
