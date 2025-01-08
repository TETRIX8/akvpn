import React, { useEffect, useState } from "react";

export const HorrorText = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="my-8 relative">
      <div 
        className={`
          text-lg md:text-xl text-red-600 font-horror
          transition-all duration-1000 transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          animate-pulse
        `}
        style={{
          textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.4)',
          animation: 'drip 2s ease-in-out forwards'
        }}
      >
        <style>
          {`
            @keyframes drip {
              0% {
                clip-path: inset(0 0 100% 0);
              }
              100% {
                clip-path: inset(0 0 0 0);
              }
            }
          `}
        </style>
        <p className="mb-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Все ключи являются демонстрацией работы нашего VPN
        </p>
        <p className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
          Для полного доступа приобретите VPN в нашем{' '}
          <a 
            href="https://t.me/akvpnn_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 underline decoration-wavy decoration-red-500/50 transition-colors"
          >
            Telegram боте
          </a>
        </p>
      </div>
      <div 
        className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-b from-red-600/20 to-transparent"
        style={{ filter: 'blur(4px)' }}
      />
    </div>
  );
};