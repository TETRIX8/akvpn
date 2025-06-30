
import React, { useEffect, useState } from "react";

export const BloodWarning = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="my-8 relative px-4 md:px-0">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
          
          @keyframes blood-drip {
            0% {
              clip-path: inset(0 0 100% 0);
              filter: hue-rotate(0deg) saturate(1);
            }
            25% {
              clip-path: inset(0 0 75% 0);
              filter: hue-rotate(20deg) saturate(1.2);
            }
            50% {
              clip-path: inset(0 0 50% 0);
              filter: hue-rotate(-10deg) saturate(1.5);
            }
            75% {
              clip-path: inset(0 0 25% 0);
              filter: hue-rotate(15deg) saturate(1.3);
            }
            100% {
              clip-path: inset(0 0 0 0);
              filter: hue-rotate(0deg) saturate(1);
            }
          }

          @keyframes blood-pulse {
            0%, 100% {
              text-shadow: 
                0 0 5px #dc2626,
                0 0 10px #dc2626,
                0 0 15px #dc2626,
                0 0 20px #dc2626,
                0 0 35px #dc2626,
                0 0 40px #dc2626;
            }
            50% {
              text-shadow: 
                0 0 2px #dc2626,
                0 0 5px #dc2626,
                0 0 8px #dc2626,
                0 0 12px #dc2626,
                0 0 18px #dc2626,
                0 0 22px #dc2626;
            }
          }

          @keyframes blood-drop {
            0% {
              transform: translateY(-10px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(100px);
              opacity: 0;
            }
          }

          .blood-text {
            font-family: 'Creepster', cursive;
            animation: blood-drip 3s ease-in-out forwards, blood-pulse 2s ease-in-out infinite;
          }

          .blood-drop {
            position: absolute;
            width: 4px;
            height: 8px;
            background: linear-gradient(to bottom, #dc2626, #7f1d1d);
            border-radius: 0 0 50px 50px;
            animation: blood-drop 2s linear infinite;
          }

          .blood-drop:nth-child(1) { left: 20%; animation-delay: 0.5s; }
          .blood-drop:nth-child(2) { left: 40%; animation-delay: 1s; }
          .blood-drop:nth-child(3) { left: 60%; animation-delay: 1.5s; }
          .blood-drop:nth-child(4) { left: 80%; animation-delay: 2s; }
        `}
      </style>
      
      <div 
        className={`
          relative text-center p-6 rounded-lg border-2 border-red-600
          bg-gradient-to-br from-red-900/30 via-red-800/20 to-black/80
          backdrop-blur-sm
          transition-all duration-1000 transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        {/* Кровавые капли */}
        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
          <div className="blood-drop"></div>
          <div className="blood-drop"></div>
          <div className="blood-drop"></div>
          <div className="blood-drop"></div>
        </div>

        <div className="relative z-10">
          <div className="text-2xl md:text-4xl font-bold text-red-600 blood-text mb-4">
            ⚠️ ВНИМАНИЕ ⚠️
          </div>
          
          <div className="text-lg md:text-2xl text-red-500 font-bold blood-text mb-4">
            В РОССИЙСКОЙ ФЕДЕРАЦИИ
          </div>
          
          <div className="text-base md:text-xl text-red-400 font-semibold blood-text mb-4">
            ЗАПРЕЩЕНО РАСПРОСТРАНЕНИЕ
          </div>
          
          <div className="text-lg md:text-2xl text-red-500 font-bold blood-text mb-6">
            VPN СЕРВИСОВ
          </div>

          <div className="text-sm md:text-base text-red-300 italic">
            Данный сайт предоставлен исключительно в образовательных целях
          </div>
        </div>

        {/* Дополнительные эффекты крови */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 opacity-60"
          style={{
            background: 'linear-gradient(to top, rgba(220, 38, 38, 0.3), transparent)',
            filter: 'blur(2px)'
          }}
        />
      </div>
    </div>
  );
};
